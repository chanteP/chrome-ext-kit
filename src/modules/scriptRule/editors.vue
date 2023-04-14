<template>
    <div ref="$styleEditor" class="editor editor-style"></div>
    <div ref="$scriptEditor" class="editor editor-script"></div>
</template>
<script setup lang="ts">
import { computed, onBeforeMount, onMounted, Ref, ref, watch } from 'vue';
import { initEditor } from '../../utils/editor';

const props = withDefaults(
    defineProps<{
        scriptString: string;
        styleString: string;
    }>(),
    {
        scriptString: '',
        styleString: '',
    },
);

const $styleEditor: Ref<HTMLElement | null> = ref(null);
const $scriptEditor: Ref<HTMLElement | null> = ref(null);

const styleEditor: Ref<ReturnType<typeof initEditor> | null> = ref(null);
const scriptEditor: Ref<ReturnType<typeof initEditor> | null> = ref(null);

function initEditors() {
    styleEditor.value = initEditor($styleEditor.value!, props.styleString, {
        mode: 'ace/mode/css',
        theme: 'ace/theme/xcode',
    });
    scriptEditor.value = initEditor($scriptEditor.value!, props.scriptString, {
        mode: 'ace/mode/javascript',
        theme: 'ace/theme/monokai',
    });
}

onMounted(() => {
    initEditors();
});

defineExpose({
    getCodes() {
        debugger
        return {
            script: scriptEditor.value?.getValue() ?? '',
            style: styleEditor.value?.getValue() ?? '',
        };
    },
});
</script>
<style scoped>
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
