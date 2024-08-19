<script setup lang="ts">
import { onMounted, ref, type Ref, computed, watch } from 'vue';
import QRCode from 'qrcode';
import { NButton, NCollapseItem, NInput, NSelect, NSpace } from 'naive-ui';

import { $, getSelected, insertTemplate, sendRuntimeMessage, setBodySize } from '../../utils';
import type { HfInference } from '@huggingface/inference';


const apiKey = ref<keyof HfInference>();
const options = ['textToImage', 'translation'].map(k => ({ label: k, value: k }));
const inputs = ref<string>();

const loading = ref(false);

const result = ref<{ api: string; result: any }>();

function handleResult(data: {
    api: keyof HfInference;
    params?: any;
    result: any;
}) {
    result.value = data;

    switch (data?.api) {
        case 'textToImage': {
            result.value = {
                api: data.api,
                result: URL.createObjectURL(data.result),
            };
            return;
        }
        default:
            result.value = data;
    }
    loading.value = false;

}

function goApi() {
    if (!apiKey.value) {
        return;
    }
    loading.value = true;
    sendRuntimeMessage('queryHuggingFace', [apiKey.value, { inputs: inputs.value }], handleResult);
}

onMounted(() => {
    sendRuntimeMessage('getLastHuggingFaceData', [], handleResult)
})

</script>


<template>
    <NCollapseItem title="抱脸虫">
        <div>
            <NSelect v-model:value="apiKey" :options="options" />
            <NInput v-model:value="inputs" type="textarea" placeholder="inputs" />

            <NButton strong secondary type="primary" :loading="loading" @click="goApi">Go</NButton>
        </div>

        <div class="flexbox">
            <img v-if="result?.api === 'textToImage'" class="result" :src="result.result" />
            <div v-else class="result">{{ result?.result }}</div>
        </div>
    </NCollapseItem>
</template>

<style scoped>
.flexbox {
    flex-wrap: nowrap;
}

img {
    display: block;
    width: 100%;
}
</style>
