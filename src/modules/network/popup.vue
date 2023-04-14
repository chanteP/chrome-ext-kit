<template>
    <NCollapseItem title="接口">
        <template #header-extra>
            <NTag type="success" size="small"> 生效中 </NTag>
        </template>
        <PopupContent />
    </NCollapseItem>
</template>
<script lang="ts" setup>
import { onBeforeMount, onMounted, watch, ref } from 'vue';
import { NCollapseItem, NTag, NInput, NMenu, NSwitch } from 'naive-ui';
import { networkRuleHandler, type NetworkRule, type NetworkAPIRule } from './apiRule';
import PopupContent from './popup-content.vue';
</script>
<style scoped></style>
