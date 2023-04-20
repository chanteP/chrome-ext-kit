<script setup lang="ts">
import { onMounted, ref, type Ref, computed, watch, createVNode } from 'vue';
import { NCollapseItem, NSelect, NSwitch, NButton, NInput, NCheckbox, NTag } from 'naive-ui';
import type { SelectMixedOption } from 'naive-ui/es/select/src/interface';
import { getAllTabs, arrayGroupBy } from '../../utils';
import SelectorOption from './option.vue';

type TabOption = SelectMixedOption & {
    tab?: chrome.tabs.Tab;
};

const props = withDefaults(
    defineProps<{
        value?: chrome.tabs.Tab;
        onlyActived?: boolean;
        placeholder?: string;
        defaultTabId?: number;
    }>(),
    {
        onlyActived: false,
        placeholder: '选择标签页',
    },
);

const emit = defineEmits<{
    (e: 'update:value', value?: chrome.tabs.Tab): void;
    (e: 'change', value?: chrome.tabs.Tab): void;
}>();

const allTabs: Ref<chrome.tabs.Tab[]> = ref([]);
const selectorOptions: Ref<TabOption[]> = ref([]);
const tabId: Ref<number | undefined> = ref(undefined);

watch(
    () => props.value,
    () => {
        tabId.value = props.value?.id;
    },
    {
        immediate: true,
    },
);

watch(
    () => tabId.value,
    () => {
        const tab = allTabs.value.find((tab) => tab.id === tabId.value);
        emit('update:value', tab);
        emit('change', tab);
    },
);

async function initTabOptions() {
    const allTabsInfo = await getAllTabs();
    allTabs.value = allTabsInfo;

    const groupOptions = arrayGroupBy<chrome.tabs.Tab>(allTabsInfo, (tab) => tab.windowId);
    selectorOptions.value = groupOptions.map((windowGroup) => {
        const windowId = windowGroup[0]!.windowId;
        return {
            type: 'group',
            label: `窗口${windowId}`,
            key: windowId,
            children: windowGroup.map((tab) => {
                return {
                    tab,
                    label: tab.title,
                    value: tab.id,
                    key: tab.id,
                    disabled: props.onlyActived ? !tab.active : false,
                };
            }),
        };
    });
}

function setDefaultTab() {
    if (props.defaultTabId === undefined) {
        return;
    }
    const defaultTab = allTabs.value.find((tab) => tab.id === props.defaultTabId);
    if (defaultTab) {
        emit('update:value', defaultTab);
    }
}

function renderLabel(tabOptions: TabOption) {
    return createVNode(SelectorOption, {
        isGroup: tabOptions.type === 'group',
        label: tabOptions.label,
        tab: tabOptions.tab,
    });
}

onMounted(async () => {
    await initTabOptions();
    setDefaultTab();
});
</script>

<template>
    <NSelect
        class="selector"
        :options="selectorOptions"
        v-model:value="tabId"
        :virtual-scroll="false"
        :placeholder="props.placeholder"
        :render-label="renderLabel"
    />
</template>

<style scoped>
.selector {
    /* 防止flex下超出 */
    overflow: auto;
}
</style>
