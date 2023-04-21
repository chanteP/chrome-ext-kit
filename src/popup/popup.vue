<script setup lang="ts">
import { ref, watch } from 'vue';
import { NCollapse, NMessageProvider } from 'naive-ui';

import Qrcode from '../modules/qrCode/popup.vue';
import Scripts from '../modules/scriptRule/popup.vue';
import Overlay from '../modules/overlay/popup.vue';
import Network from '../modules/network/popup.vue';
import { setBodySize } from '../utils/index';

const expanding = ref([]);

watch(
    () => expanding.value,
    () => {
        setBodySize(!!expanding.value.length);
    },
);
</script>

<template>
    <NMessageProvider>
        <div class="main-box" :class="{ hidden: expanding.length }">
            <Qrcode />
        </div>
        <NCollapse class="fns-list" accordion v-model:expanded-names="expanding">
            <Scripts />
            <Overlay />
            <Network />
        </NCollapse>
    </NMessageProvider>
</template>

<style>
/* global */
.flexbox {
    display: flex;
}
.flex {
    flex: 1;
}
.mt-4 {
    margin-top: 4px;
}
.ml-4 {
    margin-left: 4px;
}
</style>
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
</style>
