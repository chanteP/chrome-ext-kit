import { getTab, onRuntimeMessage, sendTabMessage } from '../../utils';
import type { CaptureImageData } from '../../types';
import { type NetworkLifeCycle, type NetworkRule, networkRuleHandler } from './apiRule';

interface CDPFetchParam {}

const watchingMap: WeakSet<chrome.tabs.Tab> = new WeakSet();

function getUrlRule(rule: NetworkRule | undefined, requestUrl: string, state: NetworkLifeCycle = 'response') {
    if (!rule?.rules[requestUrl]?.[state]?.enable) {
        return undefined;
    }
    return rule.rules[requestUrl]?.[state]?.handlerFunctionScript;
}

async function replaceResponse(requestParams, protoResponse, script: string) {
    return {
        code: undefined,
        response: undefined,
        headers: undefined,
    };
}

async function updateHttpWatcher(tab: chrome.tabs.Tab) {
    //
    if (!tab.url) {
        return;
    }

    if (watchingMap.has(tab)) {
        return;
    }

    let rules = await networkRuleHandler.getNetworkRule(tab.url);
    console.log('network rules', tab.id, tab.url, rules);
    if (!rules) {
        return;
    }

    watchingMap.add(tab);

    chrome.debugger.getTargets((targets) => {
        const target = targets.find((t) => t.tabId === tab.id);
        if (!target) {
            console.warn('no target found');
            return;
        }
        const debuggee = { targetId: target.id };

        chrome.debugger.attach(debuggee, '1.2', () => {
            chrome.debugger.sendCommand(debuggee, 'Network.enable', {});
            chrome.debugger.sendCommand(
                debuggee,
                'Fetch.enable',
                {
                    patterns: [{ requestStage: 'Response' }],
                },
                () => {
                    chrome.debugger.onEvent.addListener((source, method, params) => {
                        if (source.targetId === target.id && method === 'Fetch.requestPaused') {
                            const requestId = params.requestId;
                            const url = params.request.url;

                            const ruleScript = getUrlRule(rules, url, 'response');
                            if (!ruleScript) {
                                return;
                            }

                            console.log('handle request: ', url);

                            chrome.debugger.sendCommand(
                                debuggee,
                                'Fetch.getResponseBody',
                                {
                                    requestId,
                                },
                                async (response, ...rest) => {
                                    const { code, headers, body } = await replaceResponse(params, response, ruleScript);

                                    // console.log(url, rest);
                                    // rest;
                                    // const rs = response.base64Encoded ? atob(response.body) : response.body;
                                    // console.log('res: ', rs);
                                    // params;

                                    // // 修改响应的示例代码
                                    // const responseBody = 'Hello, World!';
                                    // const responseHeaders = [
                                    //     { name: 'Content-Type', value: 'text/plain' },
                                    //     { name: 'Access-Control-Allow-Origin', value: '*' },
                                    // ];

                                    // const value = response.base64Encoded ? btoa(rs) : rs;

                                    chrome.debugger.sendCommand(
                                        debuggee,
                                        'Fetch.fulfillRequest',
                                        {
                                            requestId: requestId,
                                            responseCode: code ?? params.responseStatusCode,
                                            responseHeaders: { ...params.responseHeaders, ...headers },
                                            body: body ?? response.body,
                                        },
                                        () => {
                                            console.log(`Request ${url} intercepted and modified.`);
                                        },
                                    );
                                },
                            );
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

// https://developer.chrome.com/docs/extensions/reference/webRequest/
chrome.tabs.onCreated.addListener((tab) => {
    updateHttpWatcher(tab);
});

chrome.tabs.onUpdated.addListener(async (tabId) => {
    const tab = await getTab(tabId);
    updateHttpWatcher(tab);
});
