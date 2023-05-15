<template>
    <div>
        <div class="flexbox">
            <NInput v-model:value="currentUrl" type="text" placeholder="url" :status="isMatch ? '' : 'error'" />
            <NButton class="flex ml-4" :type="isMatch ? 'primary' : 'error'" secondary block @click="saveUrl">
                save
            </NButton>
            <NPopover placement="left" trigger="click" @update:show="handleAllRulesPopupShow">
                <template #trigger>
                    <NButton class="ml-4" type="info" strong secondary>
                        <template #icon>
                            <NIcon><SaveAltOutlined /></NIcon>
                        </template>
                    </NButton>
                </template>
                <div class="rules-box flexbox">
                    <NButton type="info" block secondary @click="saveAllRules">saveAll</NButton>
                    <NInput class="mt-4 flex" v-model:value="allRules" type="textarea" placeholder="no rules" />
                </div>
            </NPopover>
        </div>
        <div class="request-box">
            <div class="request-info mt-4">
                <NSelect
                    v-model:value="currentRequest"
                    filterable
                    tag
                    :virtual-scroll="false"
                    :options="requestMenuList"
                    placeholder="选择/添加接口"
                />

                <template v-if="currentRequestRule">
                    <div class="rule-info">
                        <NPopover trigger="hover">
                            <template #trigger>
                                <NButton quaternary circle type="warning">
                                    <template #icon>
                                        <NIcon class="tips">
                                            <InfoOutlined />
                                        </NIcon>
                                    </template>
                                </NButton>
                            </template>
                            <div>
                                <div>使用须知</div>
                                <ol>
                                    <li>
                                        修改注入的response变量改变response，例如response.body.xxData = {a:1};
                                        <br />
                                        response: { code: number; body: returnValue; header:
                                        {name:string;value:string}[] }
                                    </li>
                                </ol>
                            </div>
                        </NPopover>
                        <NSelect
                            v-model:value="currentRequestPart"
                            size="small"
                            :virtual-scroll="false"
                            :options="requestLifeCycleOptions"
                        />
                        <NSwitch class="switch" v-model:value="currentRequestEnable" size="large" :round="false">
                            <template #checked>enable</template>
                            <template #unchecked>disabled</template>
                        </NSwitch>
                    </div>
                    <NButton class="flex" type="primary" block secondary @click="save">save</NButton>
                    <div ref="$scriptEditor" class="editor"></div>
                </template>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { onBeforeMount, onMounted, watch, ref, nextTick, computed } from 'vue';
import { NPopover, NIcon, NSelect, NInput, NMenu, NSwitch, NButton, useMessage } from 'naive-ui';

import {
    networkRuleHandler,
    type NetworkRule,
    type NetworkAPIRule,
    networkLifeCycle,
    type NetworkLifeCycle,
} from './apiRule';
import InfoOutlined from '@vicons/material/InfoOutlined';
import SaveAltOutlined from '@vicons/material/SaveAltOutlined';

import { getSelected, matchUrl, sleep } from '../../utils';
import { initEditor } from '../../utils/editor';

const tabUrl = ref<string>();
const currentUrl = ref<string>();
const currentUrlRule = ref<NetworkRule | undefined>();
const requestMenuList = ref<{ value: string; label: string }[]>([{ label: '123123', value: '3213123' }]);

const currentRequest = ref<string>();
const currentRequestRule = ref<NetworkAPIRule>();
const currentRequestEnable = ref(true);
const currentRequestFn = ref('');

const message = useMessage();

const isMatch = computed(() => tabUrl.value && matchUrl(tabUrl.value, currentUrl.value ?? ''));

const allRules = ref('');

const $scriptEditor = ref<HTMLElement>();
const scriptEditor = ref<ReturnType<typeof initEditor>>();

const requestLifeCycleOptions = ref(networkLifeCycle.map((l) => ({ label: l, value: l })));
const currentRequestPart = ref<NetworkLifeCycle>(networkLifeCycle[0]);

async function init() {
    const tab = await getSelected();
    currentUrl.value = tab.url;
    tabUrl.value = tab.url;
    await update();
}

// 刷新当前配置的状态，无脑刷
async function update() {
    currentUrlRule.value = await networkRuleHandler.getNetworkRule(currentUrl.value ?? '');
    currentUrl.value = currentUrlRule.value?.url ?? currentUrl.value;
    requestMenuList.value = Object.values(currentUrlRule.value?.rules ?? {})
        .map((d) => d.url)
        .map((url) => ({ value: url, label: url }));

    currentRequestPart.value = networkLifeCycle[0];
}

async function addNewRequestRule(url: string) {
    if (!currentUrlRule.value || !currentUrl.value || !url) {
        return;
    }

    await networkRuleHandler.configRuleRequest(currentUrl.value, url, {}, currentRequestPart.value);
    currentRequest.value = url;
    await sleep(500);
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

async function save() {
    if (!scriptEditor.value) {
        return;
    }
    const text = scriptEditor.value.getValue();

    await setConfig({
        handlerFunctionScript: text,
    });

    message.success('保存成功');
}

async function handleAllRulesPopupShow() {
    await networkRuleHandler.refresh();
    allRules.value = JSON.stringify(networkRuleHandler.allRules, null, 4);
}

async function saveAllRules() {
    await networkRuleHandler.forceSave(allRules.value);
    await update();
    message.success('保存成功');
}

async function saveUrl() {
    if (currentUrlRule.value) {
        networkRuleHandler.switchUrlName(currentUrlRule.value, currentUrl.value!);
        message.success('保存成功');
    }
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
}

.rule-info {
    display: flex;
    align-items: center;
}

.editor {
    flex: 1;
}

.rules-box {
    flex-direction: column;
    width: 400px;
    height: 300px;
}
</style>
