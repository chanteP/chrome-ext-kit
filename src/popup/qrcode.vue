<script setup lang="ts">
import { onMounted, ref, type Ref, computed, watch } from 'vue';
import QRCode from 'qrcode';
import { $, getSelected, insertTemplate, setBodySize } from '../utils';

const src = ref('');
const alt = ref('');
const canvasInput = ref('');

async function buildQR() {
    src.value = await getQR(canvasInput.value).catch((e) => (alt.value = e));
}
async function getQR(text): Promise<string> {
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

<template>
    <div class="flexbox">
        <img class="set-height" :src="src" @click="setBodySize(500)" :alt="alt" />
        <textarea class="set-height input" v-model="canvasInput"></textarea>
    </div>
</template>

<style scoped>
.flexbox {
    display: flex;
    flex-wrap: nowrap;
}
.set-height {
    height: 200px;
}

img {
    display: block;
    width: 200px;
    flex-basis: 200px;
}
textarea {
    flex: 1;
    margin: 0;
    padding: 8px 10px;
    border-left: none;
    border-radius: 0 3px 3px 0;
    resize: none;
}
</style>
