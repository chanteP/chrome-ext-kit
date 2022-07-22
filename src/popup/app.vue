<script setup lang="ts">
import { ref, watch } from 'vue';
import { NCollapse, NCollapseItem } from 'naive-ui';

import Qrcode from './qrcode.vue';
import Scripts from './scripts.vue';
import Overlay from './overlay.vue';
import { setBodySize } from '../utils';

const expanding = ref([]);

watch(
    () => expanding.value,
    () => {
        setBodySize(expanding.value.length ? 500 : 0);
    },
);
</script>

<template>
    <div class="main-box" :class="{ hidden: expanding.length }">
        <Qrcode />
    </div>
    <NCollapse class="fns-list" accordion v-model:expanded-names="expanding">
        <Scripts />
        <Overlay />
    </NCollapse>
</template>

<style>
/* global */
.flexbox {
    display: flex;
}
.flex {
    flex: 1;
}
.mt-4{
    margin-top: 4px;
}
.ml-4{
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
    margin: 16px 0;
}
</style>
