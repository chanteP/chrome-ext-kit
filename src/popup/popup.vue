<script setup lang="ts">
import { NCollapse, NMessageProvider, NButton, NIcon, useMessage } from 'naive-ui';

import PopupContent from './popup-content.vue';
</script>

<template>
    <NMessageProvider>
        <PopupContent></PopupContent>
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
<style scoped></style>
