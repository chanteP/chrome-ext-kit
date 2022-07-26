import ace, { type Ace } from 'ace-builds';

// @ts-expect-error ace插件要全局，恶心，懒得看
window.ace = ace;
ace.config.set('basePath', './lib/ace/');

export function initEditor(el: HTMLElement, value?: string, options?: Partial<Ace.EditorOptions>) {
    if (!el) {
        console.error(`no el for editor!`);
        throw new Error(`no el for editor!`);
    }
    const editor = ace.edit(el, {
        placeholder: '',
        // enableLiveAutocompletion: true,
        readOnly: false,
        value: value ?? '',
        useWorker: false,
        wrap: false,

        printMargin: 10,
        minLines: 10,
        maxLines: 10,
        // minLines: this.minLines,
        // maxLines: this.maxLines,
        ...options,
    });

    return editor;
}
