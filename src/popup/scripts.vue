<template>
    <NCollapseItem title="脚本">
        <template #header-extra>
            <NTag v-if="!isMatch" size="small"> 无适用 </NTag>
            <NTag v-else-if="rule!.enable" type="success" size="small"> 适用中 </NTag>
            <NTag v-else type="warning" size="small"> 禁用中 </NTag>
        </template>
        <div class="flexbox">
            <NButton class="flex" :type="!nameError ? 'primary' : 'error'" block secondary @click="save">save</NButton>

            <NPopover
                placement="bottom"
                trigger="click"
                v-model:show="allRulesPopupShow"
                @update:show="handleAllRulesPopupShow"
            >
                <template #trigger>
                    <NButton class="ml-4" type="info" strong secondary @click="copyConfig">
                        <template #icon>
                            <NIcon><SaveAltOutlined /></NIcon>
                        </template>
                    </NButton>
                </template>
                <NButton type="info" block secondary @click="saveAllRules">saveAll</NButton>
                <NInput class="mt-4" v-model:value="allRules" type="textarea" placeholder="no rules" />
            </NPopover>
        </div>
        <div class="flexbox mt-4">
            <NInput
                v-model:value="name"
                class="flex"
                size="small"
                :status="nameError ? 'error' : 'success'"
                placeholder="preg."
                spellcheck="false"
                rows="1"
            >
            </NInput>
            <NSwitch class="switch ml-4" v-model:value="enable" size="large" :round="false">
                <template #checked>on</template>
                <template #unchecked>off</template>
            </NSwitch>
        </div>
        <v-ace-editor
            ref="$styleEditor"
            class="editor editor-style"
            v-model:value="styleString"
            lang="css"
            theme="xcode"
        />
        <v-ace-editor
            ref="$scriptEditor"
            class="editor editor-script"
            v-model:value="scriptString"
            lang="javascript"
            theme="monokai"
        />
    </NCollapseItem>
</template>
<script setup lang="ts">
import { computed, onBeforeMount, Ref, ref, watch } from 'vue';
import { NCollapseItem, NButton, NInput, NIcon, NTag, NSwitch, NPopover } from 'naive-ui';

import SaveAltOutlined from '@vicons/material/SaveAltOutlined';

import { getSelected, loadScript, setBodySize } from '../utils';
import { Rule, scriptRules } from '../utils/scriptRule';
import { initEditor } from '../utils/editor';

const isMatch = ref(false);
const rule: Ref<Rule | undefined> = ref(undefined);
const name = ref('');
const validUrl = ref('');
const enable = ref(true);

const allRules: Ref<string> = ref('');
const allRulesPopupShow = ref(false);

const scriptString = ref('');
const styleString = ref('');

const $styleEditor: Ref<HTMLElement | null> = ref(null);
const $scriptEditor: Ref<HTMLElement | null> = ref(null);

const nameError = computed(() => {
    let valid = true;
    try {
        valid = scriptRules.toPreg(name.value).test(validUrl.value);
    } catch (e) {
        console.error(e);
        valid = false;
    }
    return name.value && !valid;
});

function initEditors() {
    initEditor($styleEditor.value!, styleString.value, {
        mode: 'ace/mode/css',
        theme: 'ace/theme/xcode',
    });
    initEditor($scriptEditor.value!, scriptString.value, {
        mode: 'ace/mode/javascript',
        theme: 'ace/theme/monokai',
    });
}

function save() {
    const styleValue = styleString.value;
    const scriptValue = scriptString.value;

    // 如果preg不设置&没有原来的话那就删除
    if (rule.value?.name && !name.value) {
        scriptRules.remove(rule.value.name);
        isMatch.value = false;
        return;
    }
    // 没有原来而且没有填内容的话就不保存
    if (!isMatch.value && !styleValue && !scriptValue) {
        return;
    }
    // // 如果规则不匹配当前页，不保存
    // if (!scriptRules.toPreg(name.value).test(validUrl.value)) {
    //     return;
    // }
    // 保存
    scriptRules.set(name.value, {
        name: name.value,
        styles: styleValue,
        scripts: scriptValue,
        enable: enable.value,
    });
}

async function copyConfig() {}

async function handleAllRulesPopupShow() {
    allRules.value = JSON.stringify(await scriptRules.getAllRules(), null, 4);
}

function saveAllRules() {
    scriptRules.setAllRules(JSON.parse(allRules.value || '{}'));
    allRulesPopupShow.value = false;
}

onBeforeMount(async () => {
    const tab = await getSelected();
    const { host: domain, pathname: path, search: query, hash } = new URL(tab.url!);

    validUrl.value = domain! + path + query + hash;

    rule.value = await scriptRules.match(validUrl.value);
    // 删除逻辑是删掉name，所以要过滤
    isMatch.value = !!rule.value?.name;

    name.value = isMatch.value ? rule.value!.name : domain! + path;
    enable.value = !!rule.value?.enable ?? true;
    styleString.value = rule.value?.styles ?? '';
    scriptString.value = rule.value?.scripts ?? '';

    initEditors();
});
</script>
<style scoped>
.switch {
    margin-top: 1px;
}

.editor-style:after {
    content: 'CSS';
}
.editor-script:after {
    content: 'JS';
}
.editor {
    position: relative;
    height: 140px;
}
.editor:after {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    display: block;
    line-height: 140px;
    font-size: 54px;
    font-weight: 700;
    color: #cccccc2e;
    pointer-events: none;
    transition: opacity 0.2s ease;
}
.editor:hover:after {
    opacity: 0;
}
</style>
