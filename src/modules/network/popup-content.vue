<template>
    <div>
        <NInput
            v-model:value="currentUrl"
            type="text"
            placeholder="url"
            disabled
            :status="isMatch ? undefined : 'error'"
        />
        <div class="request-box">
            <div class="request-info">
                <NSelect
                    v-model:value="currentRequest"
                    filterable
                    tag
                    :virtual-scroll="false"
                    :options="requestMenuList"
                />

                <template v-if="currentRequestRule">
                    <div class="rule-info">
                        <NSelect
                            v-model:value="currentRequestPart"
                            :virtual-scroll="false"
                            :options="requestLifeCycleOptions"
                        />
                        <NSwitch class="switch" v-model:value="currentRequestEnable" size="large" :round="false">
                            <template #checked>enable</template>
                            <template #unchecked>disabled</template>
                        </NSwitch>
                        <NButton type="primary" @click="save">save</NButton>
                    </div>
                    <div ref="$scriptEditor" class="editor"></div>
                </template>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { onBeforeMount, onMounted, watch, ref, nextTick } from 'vue';
import { NCollapseItem, NTag, NSelect, NInput, NMenu, NSwitch, NButton } from 'naive-ui';
import {
    networkRuleHandler,
    type NetworkRule,
    type NetworkAPIRule,
    networkLifeCycle,
    type NetworkLifeCycle,
} from './apiRule';

import { getSelected } from '../../utils';
import { initEditor } from '../../utils/editor';

import { computed } from '@vue/reactivity';
import { sleep } from 'seemly';

const currentUrl = ref<string>();
const currentUrlRule = ref<NetworkRule | undefined>();
const requestMenuList = ref<{ value: string; label: string }[]>([{ label: '123123', value: '3213123' }]);

const currentRequest = ref<string>();
const currentRequestRule = ref<NetworkAPIRule>();
const currentRequestEnable = ref(true);
const currentRequestFn = ref('');

const isMatch = computed(() => currentUrl.value === currentUrlRule.value?.url);

const $scriptEditor = ref<HTMLElement>();
const scriptEditor = ref<ReturnType<typeof initEditor>>();

const requestLifeCycleOptions = ref(networkLifeCycle.map((l) => ({ label: l, value: l })));
const currentRequestPart = ref<NetworkLifeCycle>(networkLifeCycle[0]);

async function init() {
    const tab = await getSelected();
    currentUrl.value = tab.url;
    await update();
}

// 刷新当前配置的状态，无脑刷
async function update() {
    currentUrlRule.value = await networkRuleHandler.getNetworkRule(currentUrl.value ?? '');
    requestMenuList.value = Object.values(currentUrlRule.value?.rules ?? {})
        .map((d) => d.url)
        .map((url) => ({ value: url, label: url }));

    currentRequestPart.value = networkLifeCycle[0];

    console.log(requestMenuList.value);
}

async function addNewRequestRule(url: string) {
    if (!currentUrlRule.value || !currentUrl.value || !url) {
        return;
    }

    await networkRuleHandler.configRuleRequest(currentUrl.value, url, {}, currentRequestPart.value);
    currentRequest.value = url;
    await nextTick();
}

// 重置内容状态
async function selectRequest(value?: string) {
    if (!value) {
        return;
    }
    const requestUrlKey = networkRuleHandler.getRequestUrlKey(value, currentUrl.value!);
    if (!currentUrlRule.value?.rules[requestUrlKey]) {
        await addNewRequestRule(value);
        // 加完会出现重复menu，罪都在naive-ui
    }

    await update();
    currentRequestRule.value = currentUrlRule.value?.rules[requestUrlKey]?.[currentRequestPart.value];

    currentRequestEnable.value = currentRequestRule.value?.enable ?? false;
    currentRequestFn.value = currentRequestRule.value?.handlerFunctionScript ?? '';

    scriptEditor.value?.setValue(currentRequestFn.value);
}

async function setConfig(options: Partial<NetworkAPIRule>) {
    await update();
    if (!currentRequest.value || !currentUrl.value) {
        return;
    }
    await networkRuleHandler.configRuleRequest(
        currentUrl.value,
        currentRequest.value,
        options,
        currentRequestPart.value,
    );
}

function save() {
    if (!scriptEditor.value) {
        return;
    }
    const text = scriptEditor.value.getValue();

    setConfig({
        handlerFunctionScript: text,
    });
}

watch(
    () => currentRequest.value,
    () => {
        selectRequest(currentRequest.value);
    },
);
watch(
    () => currentRequestPart.value,
    () => {
        selectRequest(currentRequest.value);
    },
);
watch(
    () => $scriptEditor.value,
    () => {
        if ($scriptEditor.value) {
            scriptEditor.value = initEditor($scriptEditor.value!, '', {
                mode: 'ace/mode/javascript',
                theme: 'ace/theme/monokai',
                maxLines: Infinity,
            });
            scriptEditor.value.setValue(currentRequestFn.value);
        }
    },
);
watch(
    () => currentRequestEnable.value,
    () => {
        setConfig({
            enable: currentRequestEnable.value,
        });
    },
);

onMounted(init);
</script>
<style scoped>
.request-box {
    min-height: 200px;
    background: #ccc;
}

.rule-info {
    display: flex;
}

.editor {
    flex: 1;
}
</style>
