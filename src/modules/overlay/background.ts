import { onRuntimeMessage, sendTabMessage } from '../../utils';
import type { CaptureImageData } from '../../types';

// 存内存。关浏览器丢
const overlayMap: Map<number, CaptureImageData> = new Map();

console.log('capture background ready', overlayMap);

onRuntimeMessage('setOverlayCapture', (data, sender, response) => {
    let [currentTabId, captureData] = data;
    // console.log('setOverlayCapture', currentTabId);
    // 空的base64是 data:,
    if (!captureData?.base64 || captureData.base64.length < 10) {
        overlayMap.delete(currentTabId);
    } else {
        overlayMap.set(currentTabId, captureData);
        response();
    }
    // console.log('sendTabMessage updateOverlayCapture', currentTabId, overlayMap.get(currentTabId));
    if (new URL(sender.origin ?? '').protocol === 'chrome-extension:') {
        sendTabMessage('updateOverlayCapture', currentTabId, [overlayMap.get(currentTabId)]);
    }
});

onRuntimeMessage('getOverlayCapture', (data, sender, response) => {
    let [currentTabId] = data;
    const captureData = overlayMap.get(currentTabId);
    response(captureData);
});
