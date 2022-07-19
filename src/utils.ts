type CommonCallback = (data: any) => void;

export function $<T extends HTMLElement>(selector: string): T {
    return document.querySelector(selector) as T;
}

export function sendToContent(message: string, callback: CommonCallback) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0]!.id!, message, function (response) {
            if (callback) callback(response);
        });
    });
}

export function contentOnMessage(callback: CommonCallback) {
    chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
        if (sender.tab) {
            return;
        }
        callback && callback(request);
    });
}

export function insertTemplate(template: string) {
    return $('#main')!.insertAdjacentHTML('beforeend', template);
}

export function setBodySize(size = 500) {
    if (size === 0) {
        size = 200;
    }
    $('#main').style.width = `${size}px`;
}

export async function loadScript(src: string) {
    return new Promise((res, rej) => {
        const s = document.createElement('script');
        s.src = src;
        s.onload = res;
        s.onerror = rej;
        document.body.appendChild(s);
    });
}

export async function getSelected(): Promise<chrome.tabs.Tab> {
    return new Promise<chrome.tabs.Tab>((res) => {
        chrome.tabs.getSelected(null, function (tab) {
            res(tab);
        });
    });
}

interface Rule {
    styles: string;
    scripts: string;
    enable: boolean;
    name: string;
}

class ScriptRule {
    /**
     * scriptRules : {ruleName : {name, styles, scripts}}
     */
    constructor() {}
    toPreg(ruleName: string) {
        return new RegExp(String.raw`^${ruleName}`);
    }
    parseUrl(url: string) {
        let [match, scheme, domain, path, query, hash] =
            /^([^\:]*\:\/\/)([^\/]*)([^\?\#]*)(\?[\s\S]*)?(\#[\s\S]*)?$/.exec(url) || [];
        return { scheme, domain, path, query, hash };
    }
    async getAllRules(): Promise<Record<string, Rule>> {
        return new Promise((res) => {
            chrome.storage.sync.get('scriptRules', (rs) => res((rs && rs.scriptRules) || {}));
        });
    }
    async set(ruleName: string, { styles, scripts, enable = true }: Rule) {
        if (!ruleName) {
            return;
        }
        let rules = await this.getAllRules();

        rules[ruleName] = { enable, styles, scripts, name: ruleName };
        chrome.storage.sync.set({ scriptRules: rules });
    }
    async get(ruleName: string) {
        let rules = await this.getAllRules();
        return rules[ruleName];
    }
    async remove(ruleName: string) {
        let rules = await this.getAllRules();
        delete rules[ruleName];
        chrome.storage.sync.set({ scriptRules: rules });
    }
    async match(url: string) {
        let rules = await this.getAllRules();
        let ruleList = Object.keys(rules);
        let match: string | null = null;
        ruleList.forEach((ruleName) => {
            let rule = rules[ruleName]!;
            // 匹配而且比之前match的更长
            if (this.toPreg(rule.name).test(url) && (!match || rule.name.length > rules[match]!.name.length)) {
                match = ruleName;
            }
        });
        return rules[match!];
    }
}
export const scriptRules = new ScriptRule();
