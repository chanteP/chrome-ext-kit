import { getTab, onRuntimeMessage, sendTabMessage, debounce } from '../../utils';
import type { CaptureImageData } from '../../types';
import { type NetworkLifeCycle, type NetworkRule, networkRuleHandler, NetworkAPIRule } from './apiRule';

type CDPFetchParam = chrome.webRequest.ResourceRequest & {
    request: any;
    responseStatusCode: number;
    responseHeaders: { name: string; value: string }[];
};
type CDPFetchResponse = {
    base64Encoded: boolean;
    body: string;
};

const watchingMap: Set<number> = new Set();

function getUrlRule(rule: NetworkRule | undefined, requestUrl: string, state: NetworkLifeCycle = 'response') {
    const checkKey = requestUrl.split('?')[0]!;
    // if(checkKey.includes('/detail')){debugger}
    if (!rule?.rules[checkKey]?.[state]?.enable) {
        return undefined;
    }
    return rule.rules[checkKey]?.[state];
}

function hasJSONHeader(headers: { name: string; value: string }[]) {
    return headers.some(
        (header) => header.name.toLowerCase() === 'content-type' && header.value.includes('application/json'),
    );
}

async function replaceResponse(requestParams: CDPFetchParam, protoResponse: CDPFetchResponse, script: string) {
    const isResponseJSON = hasJSONHeader(requestParams.responseHeaders);

    const response = {
        code: requestParams.responseStatusCode,
        body: protoResponse.base64Encoded ? atob(protoResponse.body) : protoResponse.body,
        headers: requestParams.responseHeaders,
    };

    if (isResponseJSON) {
        try {
            response.body = JSON.parse(response.body);
        } catch (e) {
            console.error(e);
        }
    }

    eval(script);

    if (isResponseJSON) {
        response.body = JSON.stringify(response.body);
    }

    if (protoResponse.base64Encoded && typeof response.body === 'string') {
        response.body = btoa(response.body);
    }

    return response;
}

let currentDebuggee: Parameters<typeof chrome.debugger.sendCommand>[0] | undefined = undefined;
let currentDebugTab: number | undefined = undefined;
let currentRules: NetworkRule | undefined = undefined;

async function hijackRequest(url: string, scriptRule: NetworkAPIRule, params: CDPFetchParam) {
    chrome.debugger.sendCommand(
        currentDebuggee!,
        'Fetch.getResponseBody',
        {
            requestId: params.requestId,
        },
        async (protoResponse, ...rest) => {
            const response = await replaceResponse(
                params,
                protoResponse as CDPFetchResponse,
                scriptRule.handlerFunctionScript,
            );

            chrome.debugger.sendCommand(
                currentDebuggee!,
                'Fetch.fulfillRequest',
                {
                    requestId: params.requestId,
                    responseCode: response.code,
                    responseHeaders: response.headers,
                    body: response.body,
                },
                () => {
                    console.log(`Request ${url} intercepted and modified.`);
                },
            );
        },
    );
}

async function hijackRule(tab: chrome.tabs.Tab) {
    chrome.debugger.getTargets((targets) => {
        const target = targets.find((t) => t.tabId === tab.id);
        if (!target) {
            console.warn('no target found');
            return;
        }
        currentDebuggee = { targetId: target.id };
        currentDebugTab = tab.id;

        chrome.debugger.attach(currentDebuggee, '1.2', () => {
            chrome.debugger.sendCommand(currentDebuggee!, 'Network.enable', {});
            chrome.debugger.sendCommand(
                currentDebuggee!,
                'Fetch.enable',
                {
                    patterns: [{ requestStage: 'Response' }],
                },
                () => {
                    chrome.debugger.onEvent.addListener((source, method, params) => {
                        if (source.targetId === target.id && method === 'Fetch.requestPaused') {
                            const requestParam = params as CDPFetchParam;
                            const requestId = requestParam.requestId;
                            const url = requestParam.request.url;

                            const requestRule = getUrlRule(currentRules, url, 'response');
                            if (!requestRule) {
                                chrome.debugger.sendCommand(currentDebuggee!, 'Fetch.continueRequest', {
                                    requestId,
                                });
                                return;
                            }

                            hijackRequest(url, requestRule, requestParam);
                        }
                        // else {
                        //     chrome.debugger.sendCommand({ tabId: tabId }, 'Fetch.continueRequest', {
                        //         requestId: params.requestId,
                        //     });
                        // }
                    });
                },
            );
        });
    });
}

function detachDebug() {
    if (currentDebuggee) {
        chrome.debugger.detach(currentDebuggee);
    }
    currentDebuggee = undefined;
    watchingMap.delete(currentDebugTab!);
    currentDebugTab = undefined;
}

async function updateHttpWatcher(tab: chrome.tabs.Tab) {
    networkRuleHandler.refresh();

    if (!networkRuleHandler.enable) {
        detachDebug();
        return;
    }
    if (!tab.url || !tab.id) {
        return;
    }

    let rules = await networkRuleHandler.getNetworkRule(tab.url, true);
    console.log('network rules', tab.id, tab.url, rules);
    if (!rules) {
        if (currentDebugTab === tab.id) {
            detachDebug();
        }
        return;
    }

    currentRules = rules;
    if (watchingMap.has(tab.id)) {
        return;
    }

    watchingMap.add(tab.id);

    hijackRule(tab);
}

const debounceUpdateHttpWatcher = debounce(updateHttpWatcher, 500);

// https://developer.chrome.com/docs/extensions/reference/webRequest/
chrome.tabs.onCreated.addListener((tab) => {
    debounceUpdateHttpWatcher(tab);
});

chrome.tabs.onUpdated.addListener(async (tabId) => {
    const tab = await getTab(tabId);
    debounceUpdateHttpWatcher(tab);
});
chrome.tabs.onRemoved.addListener(async (tabId) => {
    if (tabId === currentDebugTab) {
        detachDebug();
    }
});

networkRuleHandler.refresh();
