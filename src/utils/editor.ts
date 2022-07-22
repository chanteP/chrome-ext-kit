import ace, { type Ace } from 'ace-builds';

export function initEditor(el: HTMLElement, value?: string, options?: Partial<Ace.EditorOptions>){
    ace.edit(el, {
        // enableLiveAutocompletion: true,
        readOnly: false,
        value: value ?? '',
        useWorker: false,
        // minLines: this.minLines,
        // maxLines: this.maxLines,
        ...options,
      })
}