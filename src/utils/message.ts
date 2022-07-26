import type { CaptureImageData } from '../types';

export interface MessageChannel {
    tabInfo: () => number;

    setOverlayCapture: (currentTabId: number, data?: CaptureImageData) => void;
    getOverlayCapture: (currentTabId: number) => CaptureImageData | undefined;
    updateOverlayCapture: (data?: CaptureImageData) => void;
}

export type MessageChannels = keyof MessageChannel;
export type MessageData<T extends MessageChannels> = Parameters<MessageChannel[T]>;
export type MessageResponse<T extends MessageChannels> = ReturnType<MessageChannel[T]>;

export interface DataStruct<T extends MessageChannels = MessageChannels> {
    channel: T;
    data: MessageData<T>;
}

export function onRuntimeMessage<T extends MessageChannels>(
    channel: T,
    callback: (
        data: MessageData<T>,
        messageSender: chrome.runtime.MessageSender,
        messageResponse: (res?: MessageResponse<T>) => void,
    ) => void,
) {
    chrome.runtime.onMessage.addListener(function (request: DataStruct, sender, response) {
        if (request.channel !== channel) {
            return true;
        }
        setTimeout(() => {
            callback(request.data as MessageData<T>, sender, response);
        }, 1);
        return true;
    });
}

export async function sendRuntimeMessage<T extends MessageChannels>(
    channel: T,
    data: MessageData<T>,
    onResponse?: (data: MessageResponse<T>) => void,
): Promise<MessageResponse<T>> {
    return new Promise<MessageResponse<T>>((res) => {
        if (onResponse) {
            chrome.runtime.sendMessage({ channel, data }, (data) => {
                onResponse(data);
                res(data);
            });
        } else {
            chrome.runtime.sendMessage({ channel, data });
        }
    });
}

export function sendTabMessage<T extends MessageChannels>(channel: T, tabId: number, data: MessageData<T>) {
    return chrome.tabs.sendMessage(tabId, { channel, data });
}
