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
            <div class="request-list">
                <NInput
                    v-model:value="newRequestUrl"
                    type="text"
                    placeholder="requestUrl"
                    @keyup.enter="addNewRequestRule"
                />
                <NMenu
                    class="request-menu"
                    :options="requestMenuList"
                    v-model:value="currentRequest"
                    @select="selectRequest"
                />
            </div>
            <div class="editor-side">
                <template v-if="currentRequestRule">
                    <div class="rule-info">
                        <div class="request-url-show">{{ currentRequest }}</div>

                        <NSwitch class="switch" v-model:value="currentRequestEnable" size="large">
                            <template #checked>enable</template>
                            <template #unchecked>disabled</template>
                        </NSwitch>
                        <NButton @click="save">save</NButton>
                    </div>
                    <div ref="$scriptEditor" class="editor"></div>
                </template>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { onBeforeMount, onMounted, watch, ref } from 'vue';
import { NCollapseItem, NTag, NInput, NMenu, NSwitch, NButton } from 'naive-ui';
import { networkRuleHandler, type NetworkRule, type NetworkAPIRule } from './apiRule';

import { getSelected } from '../../utils';
import { initEditor } from '../../utils/editor';

import { computed } from '@vue/reactivity';

const currentUrl = ref<string>();
const currentUrlRule = ref<NetworkRule | undefined>();
const requestMenuList = ref<{ key: string; label: string }[]>([]);
const newRequestUrl = ref('');

const currentRequest = ref('');
const currentRequestRule = ref<NetworkAPIRule>();
const currentRequestEnable = ref(true);
const currentRequestFn = ref('');

const isMatch = computed(() => currentUrl.value === currentUrlRule.value?.url);

const $scriptEditor = ref<HTMLElement>();
const scriptEditor = ref<ReturnType<typeof initEditor>>();

async function init() {
    const tab = await getSelected();
    currentUrl.value = tab.url;
    await update();
}

async function update() {
    currentUrlRule.value = await networkRuleHandler.getNetworkRule(currentUrl.value ?? '');
    requestMenuList.value = Object.keys(currentUrlRule.value?.rules ?? {}).map((i) => ({ key: i, label: i }));
}

async function addNewRequestRule() {
    if (!currentUrl.value || !newRequestUrl.value) {
        return;
    }
    await networkRuleHandler.configRuleRequest(currentUrl.value, newRequestUrl.value, {});
    currentRequest.value = newRequestUrl.value;

    await update();
    newRequestUrl.value = '';
}
async function selectRequest() {
    await update();
    const selectedRequest = currentRequest.value;
    currentRequestRule.value = currentUrlRule.value?.rules[selectedRequest];

    currentRequestEnable.value = currentRequestRule.value?.enable ?? false;
    currentRequestFn.value = currentRequestRule.value?.handlerFunctionScript ?? '';

    scriptEditor.value?.setValue(currentRequestFn.value);
}

async function setConfig(options: Partial<NetworkAPIRule>) {
    await update();
    if (!currentRequest.value || !currentUrl.value) {
        return;
    }
    await networkRuleHandler.configRuleRequest(currentUrl.value, currentRequest.value, options);
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

watch(() => currentRequest.value, selectRequest);
watch(
    () => $scriptEditor.value,
    () => {
        if ($scriptEditor.value) {
            scriptEditor.value = initEditor($scriptEditor.value);

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
    display: flex;
    height: 300px;
    background: #ccc;
}
.request-list {
    width: 100px;
    height: 100%;
    overflow: auto;
    border-right: 1px solid #dedede;
}
.request-list .request-menu {
    --n-item-height: 20px !important;
}
:deep(.n-menu-item-content) {
    padding-left: 8px !important;
}

.editor-side {
    flex: 1;
    display: flex;
    flex-direction: column;
    height: 100%;
    position: relative;
}
.rule-info {
    display: flex;
    opacity: 0.5;
    z-index: 999;
}
.request-url-show {
    flex: 1;
}

.editor {
    flex: 1;
}
</style>
