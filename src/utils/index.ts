export * from './message';
export * from './dragger';
export * from './storage';

export function $<T extends HTMLElement>(selector: string): T {
    return document.querySelector(selector) as T;
}

export function debounce<A extends [], T extends (...args: A) => unknown>(fn: T, delay: number = 300) {
    let timer: number | undefined = undefined;
    return (...args: Parameters<T>) => {
        clearTimeout(timer);
        timer = window.setTimeout(() => fn(...args), delay);
    };
}

export function sleep(n = 0) {
    return new Promise<void>((res) => {
        setTimeout(res, n);
    });
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

export async function getTab(tabId: number) {
    return new Promise<chrome.tabs.Tab>((res, rej) => {
        chrome.tabs.get(tabId, (tab) => {
            res(tab);
        });
    });
}

export async function getAllTabs(): Promise<chrome.tabs.Tab[]> {
    return new Promise((res) => {
        chrome.tabs.query({}, (tabs) => {
            res(tabs);
        });
    });
}

export function download(fileName: string, url: string) {
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    a.click();
}

export async function readFile(file: File): Promise<string> {
    return new Promise<string>((res, rej) => {
        const fileReader = new FileReader();

        fileReader.readAsText(file);

        fileReader.onload = function () {
            const fileContent = fileReader.result;
            res(fileContent as string);
        };

        fileReader.onerror = rej;
    });
}
