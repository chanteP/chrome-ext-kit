import { $ } from './tools';
// tabs =====================================================

export async function getSelected(): Promise<chrome.tabs.Tab> {
    return new Promise<chrome.tabs.Tab>((res) => {
        // chrome.tabs.getSelected(function (tab) {
        //     res(tab);
        // });

        chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
            res(tabs[0]!);
        });
    });
}

export async function getCurrentTab() {
    // return chrome.tabs.getCurrent();

    return new Promise<chrome.tabs.Tab>((res) => {
        // chrome.tabs.getSelected(function (tab) {
        //     res(tab);
        // });

        chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
            res(tabs[0]!);
        });
    });
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

// popup ========================================================

export const popupMaxWidth = 500;
export const popupMaxHeight = 600;
export const popupMinWidth = 200;

export function setBodySize(maxWidth: boolean, maxHeight?: boolean) {
    $('#main').style.width = `${maxWidth ? popupMaxWidth : popupMinWidth}px`;
    if (typeof maxHeight === 'boolean') {
        $('#main').style.height = maxHeight ? `${popupMaxHeight}px` : '';
    }
}

// env ========================================================

export enum ExecEnv {
    Background = 0,
    Popup = 1,
    Content = 2,
}

function getCurrentEnv(): ExecEnv {
    if (!chrome.extension.getBackgroundPage) {
        return ExecEnv.Content;
    }
    if (chrome.extension.getBackgroundPage() === window) {
        return ExecEnv.Background;
    }
    return ExecEnv.Popup;
}

export const currentEnv = getCurrentEnv();

export function evalScriptInTab(tabId: number, script?: string, varObj: Record<string, unknown> = {}) {
    const varNames: string[] = [];
    const varData: unknown[] = [];

    Object.entries(varObj).forEach(([name, data]) => {
        varNames.push(name);
        varData.push(data);
    });

    chrome.scripting.executeScript({
        target: { tabId },
        args: [script, varNames, varData],
        func: (script?: string, varNames: string[] = [], varData: unknown[] = []) => {
            console.log('eeee=====', script, varNames, varData);

            return Function(...varNames, `"use strict";${script}`)(...varData);
        },
    });
}
