// import { loadImage } from '../../utils';

interface CaptureMediaData {
    dataUrl: string;
    width: number;
    height: number;
}

async function getDataUrlFromTab(tab: chrome.tabs.Tab): Promise<string> {
    return new Promise((res) => {
        chrome.tabs.captureVisibleTab(tab.windowId, (dataUrl) => {
            res(dataUrl);
        });
    });
}

export async function getCaptureMediaData(tab: chrome.tabs.Tab): Promise<CaptureMediaData> {
    const dataUrl = await getDataUrlFromTab(tab);
    // const image = await loadImage(dataUrl);
    return {
        dataUrl,
        width: tab.width ?? 0,
        height: tab.height ?? 0,
    };
}

// 用chooseDesktopMedia 持续capture tab绘制到video作为输入源。但是没法获取目标tab尺寸，先放着说不定有用------------------------------------------------------------------------------
// function getStream() {
//     // chrome.desktopCapture.chooseDesktopMedia(['tab'], tab, (streamId, options) => {
//     chrome.desktopCapture.chooseDesktopMedia(['tab'], (streamId, options) => {
//         console.log('stram option', options);
//         getCaptureStream(streamId).then((returnedStream) => {
//             if (!$videoView.value) {
//                 throw new Error('video element is not ready');
//             }
//             onCapture.value = true;

//             $videoView.value!.srcObject = returnedStream;
//             $videoView.value?.play();

//             setTimeout(() => {
//                 syncVideoCanvas();
//             }, 100);
//         });
//     });
// }

// function getCaptureStream(streamId: string) {
//     return navigator.mediaDevices.getUserMedia({
//         video: {
//             mandatory: {
//                 chromeMediaSource: 'desktop',
//                 chromeMediaSourceId: streamId,
//             },
//         },
//     });
// }
