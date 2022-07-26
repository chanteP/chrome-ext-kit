<template>
    <div class="flexbox">
        <img :src="src" @click="setBodySize(true)" :alt="alt" />
        <NInput v-model:value="canvasInput" class="flex qr-input" type="textarea" placeholder="url" />
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref, type Ref, computed, watch } from 'vue';
import QRCode from 'qrcode';
import { NInput } from 'naive-ui';

import { $, getSelected, insertTemplate, setBodySize } from '../../utils';

const src = ref('');
const alt = ref('');
const canvasInput = ref('');

async function buildQR() {
    src.value = await getQR(canvasInput.value).catch((e) => (alt.value = e));
}
async function getQR(text: string): Promise<string> {
    text = text || '';
    return new Promise<string>((res, rej) => {
        QRCode.toDataURL(
            text,
            {
                errorCorrectionLevel: 'L',
                type: 'image/jpeg',
                width: 250,
                margin: 0,
            },
            function (err, url) {
                if (err) rej(err);
                res(url);
                alt.value = '';
            },
        );
    });
}

watch(
    () => canvasInput.value,
    () => {
        buildQR();
    },
);

getSelected().then((tab) => {
    canvasInput.value = tab.url ?? '';
});
</script>

<style scoped>
.flexbox {
    flex-wrap: nowrap;
}
.qr-input {
    flex: 1;
    margin-left: 4px;
    height: 200px;
    resize: none;
}

img {
    display: block;
    width: 200px;
    flex-basis: 200px;
}
</style>
