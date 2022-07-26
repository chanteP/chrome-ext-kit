export * from './message';
export * from './dragger';

export function $<T extends HTMLElement>(selector: string): T {
    return document.querySelector(selector) as T;
}

export async function loadImage(src: string): Promise<HTMLImageElement> {
    return new Promise<HTMLImageElement>((res, rej) => {
        const img = new Image();
        img.onload = () => {
            res(img);
        };
        img.onerror = rej;
        img.src = src;
    });
}

export function arrayGroupBy<T>(array: T[], condition: (item: T) => unknown): T[][] {
    const map = new Map();
    array.forEach((item) => {
        const value = condition(item);
        if (!map.has(value)) {
            map.set(value, []);
        }
        map.get(value).push(item);
    });
    return [...map.values()];
}

export function insertTemplate(template: string) {
    return $('#main')!.insertAdjacentHTML('beforeend', template);
}

export const popupMaxWidth = 500;
export const popupMaxHeight = 600;
export const popupMinWidth = 200;

export function setBodySize(maxWidth: boolean, maxHeight?: boolean) {
    $('#main').style.width = `${maxWidth ? popupMaxWidth : popupMinWidth}px`;
    if (typeof maxHeight === 'boolean') {
        $('#main').style.height = maxHeight ? `${popupMaxHeight}px` : '';
    }
}

// message =====================================================
// export function sendToContent(message: string, callback: CommonCallback) {
//     chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
//         chrome.tabs.sendMessage(tabs[0]!.id!, message, function (response) {
//             if (callback) callback(response);
//         });
//     });
// }

// export function contentOnMessage(callback: CommonCallback) {
//     chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
//         if (sender.tab) {
//             return;
//         }
//         callback && callback(request);
//     });
// }

// export async function loadScript(src: string) {
//     return new Promise((res, rej) => {
//         const s = document.createElement('script');
//         s.src = src;
//         s.onload = res;
//         s.onerror = rej;
//         document.body.appendChild(s);
//     });
// }

// tabs =====================================================

export async function getSelected(): Promise<chrome.tabs.Tab> {
    return new Promise<chrome.tabs.Tab>((res) => {
        chrome.tabs.getSelected(function (tab) {
            res(tab);
        });
    });
}

export async function getCurrentTab() {
    return chrome.tabs.getCurrent();
}

export async function getAllTabs(): Promise<chrome.tabs.Tab[]> {
    return new Promise((res) => {
        chrome.tabs.query({}, (tabs) => {
            res(tabs);
        });
    });
}

// storage =============
export function getLocalStorage<T>(name: string, defaultValue?: T): Promise<T> {
    return new Promise((res) => {
        chrome.storage.local.get(name, (rs) => res(rs?.[name] ?? defaultValue));
    });
}

export async function setLocalStorage<T>(name: string, value: T) {
    await chrome.storage.local.set({ [name]: value });
}
