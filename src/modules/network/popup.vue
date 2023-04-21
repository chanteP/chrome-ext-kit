<template>
    <NCollapseItem title="接口">
        <template #header-extra>
            <NSwitch class="switch" v-model:value="globalEnable" size="medium" :round="false" @click.native.stop.prevent>
            </NSwitch>
        </template>
        <PopupContent />
    </NCollapseItem>
</template>
<script lang="ts" setup>
import { onBeforeMount, onMounted, watch, ref } from 'vue';
import { NCollapseItem, NTag, NInput, NMenu, NSwitch } from 'naive-ui';
import { networkRuleHandler, type NetworkRule, type NetworkAPIRule } from './apiRule';
import PopupContent from './popup-content.vue';

const globalEnable = ref(false);

async function init() {
    await networkRuleHandler.refresh();
    globalEnable.value = networkRuleHandler.enable;
}

watch(
    () => globalEnable.value,
    () => {
        networkRuleHandler.setEnable(globalEnable.value);
    },
);

onMounted(init);
</script>
<style scoped></style>
