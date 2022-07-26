import { getLocalStorage, setLocalStorage } from '../../utils';

export interface Rule {
    styles: string;
    scripts: string;
    enable: boolean;
    name: string;
}

const storageKey = 'scriptRules';

class ScriptRule {
    saveType: 'local' | 'sync' = 'local';

    toPreg(ruleName: string) {
        return new RegExp(String.raw`^${ruleName}`);
    }
    async getAllRules(): Promise<Record<string, Rule>> {
        return getLocalStorage<Record<string, Rule>>(storageKey, {});
        // return new Promise((res) => {
        //     chrome.storage[this.saveType].get('scriptRules', (rs) => res(rs?.scriptRules ?? {}));
        // });
    }
    async setAllRules(rules: Record<string, Rule>) {
        setLocalStorage(storageKey, rules);
        // chrome.storage[this.saveType].set({
        //     scriptRules: rules,
        // });
    }
    async set(ruleName: string, { styles, scripts, enable = true }: Rule) {
        if (!ruleName) {
            return;
        }
        let rules = await this.getAllRules();

        rules[ruleName] = { enable, styles, scripts, name: ruleName };
        setLocalStorage(storageKey, rules);
        // chrome.storage[this.saveType].set({ scriptRules: rules });
    }
    async get(ruleName: string) {
        let rules = await this.getAllRules();
        return rules[ruleName];
    }
    async remove(ruleName: string) {
        let rules = await this.getAllRules();
        delete rules[ruleName];
        setLocalStorage(storageKey, rules);
        // chrome.storage[this.saveType].set({ scriptRules: rules });
    }
    async match(url: string) {
        let rules = await this.getAllRules();
        let ruleList = Object.keys(rules);
        let match: string | null = null;
        ruleList.forEach((ruleName) => {
            let rule = rules[ruleName]!;
            // 匹配而且比之前match的更长
            if (this.toPreg(rule.name).test(url) && (!match || rule.name.length > rules[match]!.name.length)) {
                match = ruleName;
            }
        });
        return rules[match!];
    }
}
export const scriptRules = new ScriptRule();
