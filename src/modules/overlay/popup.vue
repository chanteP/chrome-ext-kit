<template>
    <NCollapseItem title="叠图">
        <template #header-extra>
            <NTag v-if="captureData && captureData.enable && captureData.base64" type="success" size="small">
                生效中
            </NTag>
        </template>
        <Overview v-if="ready" :captureData="captureData" />
    </NCollapseItem>
</template>
<script lang="ts" setup>
import { onBeforeMount, Ref, ref, createVNode, watch, computed, onMounted } from 'vue';
import { NCollapseItem, NSelect, NSwitch, NButton, NInput, NCheckbox, NTag } from 'naive-ui';

import { getSelected, sendRuntimeMessage } from '../../utils';
import Overview from './overview.vue';
import type { CaptureImageData } from '../../types';

const captureData: Ref<CaptureImageData | undefined> = ref(undefined);
const ready = ref(false);

onBeforeMount(async () => {
    const tab = await getSelected();

    sendRuntimeMessage('getOverlayCapture', [tab.id!], (captureTabData) => {
        captureData.value = captureTabData;
        ready.value = true;
    });
});
</script>
<style scoped></style>
