<template>
    <NCollapseItem title="overlay">
        <!-- <template #arrow>
            <NIcon :color="'#ccc'" size="small"><PlusRound /> </NIcon>
        </template> -->

        <div class="content-box" :data-enable="enable">
            <div>
                <NInput v-model:value="currentUrl" />
                <NCheckbox v-model:checked="enable">作为输入</NCheckbox>
            </div>
            <div>
                <NCheckbox>输出到页面</NCheckbox>
            </div>
        </div>
    </NCollapseItem>
</template>
<script lang="ts" setup>
import { onBeforeMount, ref } from 'vue';
import { NCollapseItem, NButton, NInput, NCheckbox } from 'naive-ui';

import { coverRules, getSelected } from '../utils';

const status = ref(false);
const enable = ref(false);

const currentUrl = ref('');

const overUrl = ref('');

onBeforeMount(async () => {
    const tab = await getSelected();
    currentUrl.value = tab.url!;
    const rules = await coverRules.getStatus();
    enable.value = rules.input === currentUrl.value;
});
</script>
<style scoped>
.content-box {
    margin: 4px 0 0;
}
</style>
