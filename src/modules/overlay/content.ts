import { $, getCurrentTab, getSelected, onRuntimeMessage, sendRuntimeMessage } from '../../utils';
import type { CaptureImageData } from '../../types';
import { bindDragger } from '../../utils/dragger';

let coverImage: HTMLImageElement | null = null;
let currentTabId: number | null = null;

let state: CaptureImageData = {
    base64: '',
    enable: false,
    left: 0,
    top: 0,
    opacity: 0,
    scale: 1,
    equivalScale: 1,
};

function updatePosition(left: number, top: number) {
    state.left = left;
    state.top = top;
    sendRuntimeMessage('setOverlayCapture', [currentTabId!, state]);
}

function buildImage() {
    if (coverImage) {
        return coverImage;
    }

    const img = new Image();
    img.style.cssText = `
        position: fixed;
        display: block;
        top: 0;
        left: 0;
        z-index: 99999999;
        transform-origin: left top;
        pointer-events: none;
        opacity: .3;
    `;
    document.body.appendChild(img);
    bindEvent(img);

    coverImage = img;
    return coverImage;
}
function updateStyle() {
    const cover = coverImage;
    if (!cover) {
        return;
    }

    // console.log('state', state);

    cover.style.opacity = String(state.opacity ?? 0.5);
    cover.style.transform = `scale(${state.scale / state.equivalScale})`;
    cover.style.left = `${state.left / state.equivalScale}px`;
    cover.style.top = `${state.top / state.equivalScale}px`;

    cover.src = state.base64!;
}

function updateCoverImage(data?: CaptureImageData) {
    const { base64, enable, opacity, scale, left, top } = data ?? { enable: false };
    Object.assign(state, data);

    if (!coverImage && !enable) {
        return;
    }

    const cover = buildImage();

    // cover.style.pointerEvents = enable ? '' : 'none';
    cover.style.display = enable ? 'block' : 'none';

    if (!enable) {
        return;
    }

    updateStyle();
}

function bindEvent(node: HTMLElement) {
    bindDragger(
        node,
        () => node.getBoundingClientRect().left,
        () => node.getBoundingClientRect().top,
        (l, t) => {
            updatePosition(l, t);
            updateStyle();
        },
    );

    window.addEventListener('keydown', (e) => {
        const offset = e.altKey ? 10 : 1;
        switch (e.key) {
            case 'ArrowUp':
                e.preventDefault();
                state.top += offset;
                break;
            case 'ArrowDown':
                e.preventDefault();
                state.top -= offset;
                break;
            case 'ArrowRight':
                e.preventDefault();
                state.left += offset;
                break;
            case 'ArrowLeft':
                e.preventDefault();
                state.left -= offset;
                break;
            case "'":
                state.enable = !state.enable;
                updateCoverImage(state);
                break;
            default:
                return;
        }

        updatePosition(state.left, state.top);
        updateStyle();
    });
}

async function run(tabId: number) {
    currentTabId = tabId;

    sendRuntimeMessage('getOverlayCapture', [tabId], (data) => {
        // const { base64, enable } = data ?? {};
        // console.log('streamId', base64?.length, enable);
        updateCoverImage(data);
    });
}

sendRuntimeMessage('tabInfo', [], (tabId) => {
    run(tabId);
});

onRuntimeMessage('updateOverlayCapture', ([data]) => {
    // const { base64, enable } = data ?? {};
    // console.log('updateOverlayCapture', base64?.length, enable);
    updateCoverImage(data);
});
