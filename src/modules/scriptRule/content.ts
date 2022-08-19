import { $, getSelected } from '../../utils';
import { scriptRules } from './scriptRule';

async function run() {
    const { hostname: domain, pathname: path, search: query, hash } = location;
    let rule = await scriptRules.match(domain + path + query + hash);

    if (!rule?.enable) {
        return;
    }

    document.addEventListener('DOMContentLoaded', function () {
        rule!.styles && insertStyles(rule!.styles);
    });

    window.addEventListener(
        'load',
        function evalContentScript() {
            // rule!.scripts && chrome.scripting.executeScript({ func: () => eval(rule!.scripts) });

            rule!.scripts && eval(rule!.scripts);
        },
        {
            once: true,
        },
    );
}

run();

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
