<script setup lang="ts">
import { onMounted, ref, type Ref, computed } from 'vue';

const props = withDefaults(
    defineProps<{
        isGroup: boolean;
        label?: string;
        tab?: chrome.tabs.Tab;
    }>(),
    {},
);
</script>

<template>
    <div v-if="isGroup" class="option">
        {{ props.label }}
    </div>
    <div v-else class="option">
        {{ props.tab?.title }}
        <span class="sub">{{ props.tab?.url }}</span>
    </div>
</template>

<style scoped>
.option {
    white-space: nowrap;
}
.sub {
    opacity: 0.4;
}
</style>
