import { $, getSelected } from '../utils';
import { scriptRules } from '../utils/scriptRule';

(async (_) => {
    const { hostname: domain, pathname: path, search: query, hash } = location;
    let rule = await scriptRules.match(domain + path + query + hash);

    if (!rule || !rule.enable) {
        return;
    }

    window.addEventListener('load', function evalContentScript() {
        rule!.scripts && eval(rule!.scripts);
        rule!.styles && insertStyles(rule!.styles);
        window.removeEventListener('load', evalContentScript);
    });
})();

function insertStyles(styles: string) {
    // TODO 使用stylesheets添加
    const styleTag = document.createElement('style');
    styleTag.innerHTML = styles;
    document.body.appendChild(styleTag);
}
