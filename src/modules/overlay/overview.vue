<script setup lang="ts">
import { onMounted, ref, type Ref, computed, watch, onBeforeUnmount } from 'vue';
import { NSlider, NInputNumber, NSwitch, NButton, NSpace, NCheckbox, NTag } from 'naive-ui';

import TabSelector from '../../components/allTabsSelector/tabSelector.vue';

import { bindDragger, getCurrentTab, getSelected, popupMaxWidth, loadImage, sendRuntimeMessage } from '../../utils';
import type { CaptureImageData } from '../../types';
import { getCaptureMediaData } from './capture';

const props = defineProps<{
    captureData?: CaptureImageData;
}>();

const emit = defineEmits<{
    (e: 'update:captureData', captureData?: CaptureImageData): void;
}>();

const base64 = ref(props.captureData?.base64);

const enable: Ref<boolean> = ref(props.captureData?.enable ?? false);

const top = ref(props.captureData?.top ?? 0);
const left = ref(props.captureData?.left ?? 0);

const scale = ref(props.captureData?.scale ?? 1);
// const scale = ref(props.captureData?.scale ?? 1 / window.devicePixelRatio);
const opacity = ref(props.captureData?.opacity ?? 0.3);

// 内部使用
const $canvas: Ref<HTMLCanvasElement | null> = ref(null);
const $float: Ref<HTMLElement | null> = ref(null);

const currentTabWidth = ref(1);
const currentTabHeight = ref(1);

const sourceWidth = ref(0);
const sourceHeight = ref(0);

// 蓝色框等效尺寸，用这个比调整scale更直观一点
const equivalScale = ref(props.captureData?.equivalScale ?? 1);
const equivalWidth = ref(0);

// 画布 / 来源 的比例
const visualScale = computed(() =>
    sourceWidth.value ? popupMaxWidth / (sourceWidth.value * scale.value) : 1,
);

const currentTab: Ref<chrome.tabs.Tab | undefined> = ref(undefined);
const sourceTab: Ref<chrome.tabs.Tab | undefined> = ref(undefined);

let ctx: CanvasRenderingContext2D | null = null;

const floatStyle = computed(() => {
    const transformLeft = -left.value * visualScale.value;
    const transformTop = -top.value * visualScale.value;
    // 很尴尬，因为展开动画，开始的时候canvas是200。但是我又不想处理onresize
    // const displayWidth = ($canvas.value?.clientWidth ?? popupMaxWidth) * visualScale.value;
    const displayWidth = currentTabWidth.value * visualScale.value * equivalScale.value;
    const displayHeight = currentTabHeight.value * visualScale.value * equivalScale.value;

    return {
        transform: `translate(${transformLeft}px, ${transformTop}px)`,
        width: `${displayWidth}px`,
        height: `${displayHeight}px`,
    };
});

// 初始化、绑定事件 ------------------------------------------------------------------------------------
function initCanvas() {
    ctx = $canvas.value!.getContext('2d');
}
function controller(e: KeyboardEvent) {
    const offset = e.altKey ? 10 : 1;
    switch (e.key) {
        case 'ArrowUp':
            e.preventDefault();
            top.value += offset;
            break;
        case 'ArrowDown':
            e.preventDefault();
            top.value -= offset;
            break;
        case 'ArrowRight':
            e.preventDefault();
            left.value -= offset;
            break;
        case 'ArrowLeft':
            e.preventDefault();
            left.value += offset;
            break;
        default:
            return;
    }
}
function bindDragEvent() {
    bindDragger(
        $float.value!,
        () => $float.value!.getBoundingClientRect().left - $canvas.value!.getBoundingClientRect().left,
        () => $float.value!.getBoundingClientRect().top - $canvas.value!.getBoundingClientRect().top,
        (l, t) => {
            left.value = -l / visualScale.value;
            top.value = -t / visualScale.value;
        },
    );
    window.addEventListener('keyup', controller);
}

function initTabSize() {
    currentTabWidth.value = currentTab.value?.width ?? 100;
    currentTabHeight.value = currentTab.value?.height ?? 100;

    equivalWidth.value = Math.round(currentTabWidth.value * equivalScale.value);
}
// 绘制相关 ------------------------------------------------------------------------------------
function draw(source: CanvasImageSource, width: number, height: number) {
    if (!ctx || !$canvas.value) {
        return;
    }
    $canvas.value.width = width;
    $canvas.value.height = height;

    ctx.drawImage(source, 0, 0);
}

async function syncImage(base64?: string) {
    if (!base64) {
        return;
    }
    const img = await loadImage(base64);
    sourceWidth.value = img.naturalWidth;
    sourceHeight.value = img.naturalHeight;
    draw(img, img.naturalWidth, img.naturalHeight);
}

async function captureTab() {
    if (!sourceTab.value) {
        return;
    }
    const data = await getCaptureMediaData(sourceTab.value);
    base64.value = data.dataUrl;
    enable.value = true;
    syncImage(data.dataUrl);
}

function resetPosition() {
    scale.value = 1;
    top.value = 0;
    left.value = 0;
}

// 同步
async function cacheImageData() {
    if (!currentTab.value) {
        return;
    }
    const syncData = base64.value
        ? {
              tabId: sourceTab.value?.id,
              base64: base64.value,
              enable: enable.value,
              left: left.value,
              top: top.value,
              scale: scale.value,
              equivalScale: equivalScale.value,
              opacity: opacity.value,
          }
        : undefined;
    sendRuntimeMessage('setOverlayCapture', [currentTab.value.id!, syncData]);
    emit('update:captureData', syncData);
}

watch(() => base64.value, syncImage, {
    immediate: true,
});

watch(
    () => equivalWidth.value,
    () => {
        equivalScale.value = equivalWidth.value / currentTabWidth.value;
    },
);

watch(
    () => [sourceTab.value, base64.value, enable.value, top.value, left.value, scale.value, opacity.value],
    () => {
        cacheImageData();
    },
);

watch(() => $canvas.value, initCanvas);
watch(() => $float.value, bindDragEvent);

onMounted(async () => {
    currentTab.value = await getSelected();
    initTabSize();
});
onBeforeUnmount(() => {
    window.removeEventListener('keyup', controller);
});
</script>

<template>
    <div class="flexbox">
        <TabSelector
            class="flex"
            only-actived
            :defaultTabId="props.captureData?.tabId"
            v-model:value="sourceTab"
            @change="captureTab"
        />
        <NButton v-if="sourceTab" class="ml-4" @click="captureTab">刷新图片</NButton>
    </div>

    <div class="capture-view flex mt-4">
        <canvas class="capture-stream" ref="$canvas" :data-width="sourceWidth" :data-height="sourceHeight"></canvas>

        <div
            ref="$float"
            class="float"
            :style="floatStyle"
            :data-width="currentTabWidth"
            :data-height="currentTabHeight"
        ></div>

        <div class="tool l t">
            <NButton @click="resetPosition" size="small">重置位置</NButton>
        </div>
        <div class="tool r t">
            <NSwitch class="switch" v-model:value="enable" size="large" :disabled="false" :round="false">
                <template #checked>on</template>
                <template #unchecked>off</template>
            </NSwitch>
        </div>
        <div class="tool r b">
            <NInputNumber
                v-if="currentTab"
                title="等效宽度"
                class="ml-4 input-number"
                v-model:value="equivalWidth"
                :step="1"
                size="small"
            />
        </div>
        <div class="tool l b info">
            <div>scale{{ scale.toFixed(4) }}x</div>
            <div>equivalScale{{ equivalScale.toFixed(4) }}x</div>
            <div>visualScale{{ visualScale.toFixed(4) }}x</div>
            <div>current:{{ currentTabWidth }}x{{ currentTabHeight }}</div>
            <div>source:{{ sourceWidth }}x{{ sourceHeight }}</div>
            <div>x:{{ Math.round(left) }} y:{{ Math.round(top) }}</div>
        </div>
    </div>

    <div class="">
        <div class="suit flexbox">
            <div class="label">scale</div>
            <NSlider class="ml-4 input-slide flex" v-model:value="scale" :step="0.01" :max="10" :min="0.1" />
            <NInputNumber class="ml-4 input-number" v-model:value="scale" :step="0.1" size="small" />
        </div>
        <div class="suit flexbox">
            <div class="label">opacity</div>
            <NSlider class="ml-4 input-slide flex" v-model:value="opacity" :step="0.01" :max="1" :min="0" />
            <NInputNumber class="ml-4 input-number" v-model:value="opacity" :step="0.1" size="small" />
        </div>
    </div>
</template>

<style scoped>
.capture-view {
    position: relative;
    background: #333;
    min-height: 250px;
    overflow: hidden;
    user-select: none;
}

.capture-stream {
    display: block;
    width: 100%;
}
.tool {
    position: absolute;
    opacity: 0.8;
    background: #fff;
    transition: opacity 200ms linear;
}
.tool:hover {
    opacity: 1;
}

.tool.l {
    left: 0;
}
.tool.t {
    top: 0;
}
.tool.r {
    right: 0;
}
.tool.b {
    bottom: 0;
}
.tool.info {
    position: absolute;
    font-size: 8px;
    color: #fff;
    text-shadow: rgba(0, 0, 0, 0.8) 0 0 1px;
    background: none;
    pointer-events: none;
}
.suit {
    margin: 2px 0;
    padding: 2px 0;
    vertical-align: middle;
}
.suit + .suit {
    border-top: 1px solid #ccc;
}
.suit .label {
    width: 6em;
}
.input-number {
    width: 6em;
}
.float {
    position: absolute;
    top: 0;
    left: 0;
    background: rgba(0, 0, 255, 0.5);
    cursor: grab;
}
</style>
