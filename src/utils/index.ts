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

export function setBodySize(size?: number) {
    if (!size) {
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
        chrome.tabs.getSelected(function (tab) {
            res(tab);
        });
    });
}

export interface CoverRuleInfo {
    input: string;
}
class CoverRule {
    async getStatus(): Promise<CoverRuleInfo> {
        return new Promise<CoverRuleInfo>((res) => {
            chrome.storage.local.get('coverRules', (rs) => res(rs?.coverRules ?? {}));
        });
    }
    setStatus(url: string | null) {
        chrome.storage.local.set({
            coverRules: {
                input: url,
            },
        });
    }
}
export const coverRules = new CoverRule();

export function capturePage() {
    chrome.tabCapture.capture({}, () => {});
}
