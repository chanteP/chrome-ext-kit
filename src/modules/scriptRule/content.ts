import { $, evalScript, evalScriptInTab, getCurrentTab, sendRuntimeMessage } from '../../utils';
import { scriptRules } from './scriptRule';

async function run(tabId: number) {
    const { hostname: domain, port, pathname: path, search: query, hash } = location;
    let rule = await scriptRules.match(`${domain}${port ? `:${port}` : ''}${path}${query}${hash}`);

    if (!rule?.enable) {
        return;
    }

    // const tab = await getCurrentTab();

    document.addEventListener('DOMContentLoaded', function () {
        rule!.styles && insertStyles(rule!.styles);
    });

    // rule!.scripts && sendRuntimeMessage('execScript', [rule!.scripts]);

    window.addEventListener(
        'load',
        async function evalContentScript() {
            // rule!.scripts && chrome.scripting.executeScript({ func: () => eval(rule!.scripts) });
            // rule!.scripts && sendRuntimeMessage('execScript', [rule!.scripts]);
            rule!.scripts && evalScript(rule!.scripts);
            // insertScript(rule!.scripts);
        },
        {
            once: true,
        },
    );
}

sendRuntimeMessage('tabInfo', [], (tabId) => {
    run(tabId);
});

function insertStyles(styles: string) {
    // TODO 使用stylesheets添加
    const styleTag = document.createElement('style');
    styleTag.dataset.insertStyles = '1';
    styleTag.innerHTML = styles;
    document.body.appendChild(styleTag);
}

function insertScript(code: string) {
    const elem = document.createElement('script');
    elem.textContent = code;
    document.head.appendChild(elem);
}
