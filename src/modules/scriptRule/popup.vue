<template>
    <NCollapseItem title="脚本" display-directive="show">
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
        <Editors ref="$editor" :style-string="styleString" :script-string="scriptString" />
    </NCollapseItem>
</template>
<script setup lang="ts">
import { computed, onBeforeMount, onMounted, Ref, ref, watch } from 'vue';
import { NCollapseItem, NButton, NInput, NIcon, NTag, NSwitch, NPopover } from 'naive-ui';

import SaveAltOutlined from '@vicons/material/SaveAltOutlined';

import Editors from './editors.vue';

import { getSelected } from '../../utils';
import { Rule, scriptRules } from './scriptRule';

const isMatch = ref(false);
const rule: Ref<Rule | undefined> = ref(undefined);
const name = ref('');
const validUrl = ref('');
const enable = ref(true);

const allRules: Ref<string> = ref('');
const allRulesPopupShow = ref(false);

const scriptString = ref('');
const styleString = ref('');

const $editor: Ref<{ getCodes: () => { script: string; style: string } } | null> = ref(null);

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

async function save() {
    const { script: scriptValue, style: styleValue } = $editor.value?.getCodes() ?? {};

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
    await scriptRules.set(name.value, {
        name: name.value,
        styles: styleValue ?? '',
        scripts: scriptValue ?? '',
        enable: enable.value,
    });

    resetStatus();
}

async function handleAllRulesPopupShow() {
    allRules.value = JSON.stringify(await scriptRules.getAllRules(), null, 4);
}

function saveAllRules() {
    scriptRules.setAllRules(JSON.parse(allRules.value || '{}'));
    allRulesPopupShow.value = false;
}

async function resetStatus() {
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
}

onBeforeMount(resetStatus);
</script>
<style scoped>
.switch {
    margin-top: 1px;
}

.rules-box {
    flex-direction: column;
    width: 400px;
    height: 400px;
}
</style>
