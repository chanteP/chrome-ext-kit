<script setup lang="ts">
import { ref, watch } from 'vue';
import { NCollapse, NButton, NIcon, useMessage } from 'naive-ui';

import Qrcode from '../modules/qrCode/popup.vue';
import Scripts from '../modules/scriptRule/popup.vue';
import Overlay from '../modules/overlay/popup.vue';
// import Network from '../modules/network/popup.vue';

import { setBodySize, getStorageExportData, setStorageImportData, download, readFile } from '../utils';

import SaveAltOutlined from '@vicons/material/SaveAltOutlined';
import FileUploadOutlined from '@vicons/material/FileUploadOutlined';

const expanding = ref([]);
const message = useMessage();

async function downloadAllConfig() {
    const data = await getStorageExportData();
    download('chromeExtData.json', URL.createObjectURL(new Blob([data])));
}

async function importAllConfig(e: Event) {
    // @ts-expect-error
    const file = e.currentTarget?.files?.[0];
    if (!file) {
        console.warn('no file')
        return;
    }

    try {
        const data = await readFile(file);
        await setStorageImportData(data);
        message.success('导入成功');
    } catch (e) {
        message.error((e as Error).toString());
    }
}

watch(
    () => expanding.value,
    () => {
        setBodySize(!!expanding.value.length);
    },
);
</script>

<template>
    <div>
        <div class="main-box" :class="{ hidden: expanding.length }">
            <Qrcode />
        </div>
        <NCollapse class="fns-list" accordion v-model:expanded-names="expanding">
            <Scripts />
            <Overlay />
            <!-- <Network /> -->
        </NCollapse>
        <div class="fn-box">
            <NButton class="ml-4" strong secondary size="small" title="导入配置">
                <template #icon>
                    <label>
                        <input type="file" hidden @change="importAllConfig" accept=".json" />
                        <NIcon><FileUploadOutlined /></NIcon>
                    </label>
                </template>
            </NButton>

            <NButton class="ml-4" strong secondary size="small" @click="downloadAllConfig" title="导出所有配置">
                <template #icon>
                    <NIcon><SaveAltOutlined /></NIcon>
                </template>
            </NButton>
        </div>
    </div>
</template>

<style scoped>
.main-box {
    height: 200px;
    overflow: hidden;
    transition: height 200ms ease;
}
.main-box.hidden {
    height: 0;
}
.fns-list {
    margin: 8px 0;

    --n-item-margin: 8px 0 0 0 !important;
}
.fns-list:deep(.n-collapse-item .n-collapse-item__header) {
    padding: var(--n-item-margin);
}
.fn-box {
    text-align: right;
}
</style>
