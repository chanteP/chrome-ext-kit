import { getCurrentTab, getLocalStorage, matchUrlPattern, registerStorage, setLocalStorage } from '../../utils';

export const networkLifeCycle = ['response'] as const;
export type NetworkLifeCycle = (typeof networkLifeCycle)[number];

export interface NetworkAPIRule {
    enable: boolean;
    handlerFunctionScript: string;
}

export type NetworkAPIRuleUnit = {
    url: string;
} & Partial<Record<NetworkLifeCycle, NetworkAPIRule>>;

export interface NetworkRule {
    url: string;
    rules: Record<string, NetworkAPIRuleUnit>;
}

export interface NetworkRulesStorage {
    enable: boolean;
    rules: Record<string, NetworkRule>;
}

const storageKey = 'networkRules';

class NetworkRuleHandler {
    allRules?: Record<string, NetworkRule>;
    enable = false;

    async refresh() {
        const { enable, rules } = await getLocalStorage<NetworkRulesStorage>(storageKey, { enable: false, rules: {} });
        this.allRules = rules;
        this.enable = enable;
    }

    async allNetworkRules() {
        if (!this.allRules) {
            await this.refresh();
        }
        return this.allRules;
    }

    setEnable(bool: boolean) {
        this.enable = bool;
        this.save();
    }

    async getNetworkRule(url: string, checkEnable = false) {
        await this.allNetworkRules();
        // const rule = this.allRules?.[url];

        if (!this.allRules) {
            return;
        }
        const rule = matchUrlPattern(url, Object.values(this.allRules), (item) => item.url);
        if (rule && checkEnable) {
            if (Object.keys(rule.rules).length === 0) {
                return undefined;
            }
            if (
                Object.values(rule.rules).every((requestRule) => {
                    const isEmpty = networkLifeCycle.every((life) => {
                        return !requestRule[life]?.enable || !requestRule[life]?.handlerFunctionScript.trim();
                    });
                    return isEmpty;
                })
            ) {
                return undefined;
            }
        }
        return rule;
    }

    switchUrlName(rule: NetworkRule, urlPattern: string) {
        if (!this.allRules) {
            return;
        }

        delete this.allRules[rule.url];
        this.allRules[urlPattern] = rule;
        rule.url = urlPattern;
    }

    async ensureRule(url: string) {
        await this.allNetworkRules();

        let rule = await this.getNetworkRule(url);

        if (!rule) {
            rule = {
                url,
                rules: {},
            };
            this.allRules![url] = rule;
        }
        return rule;
    }

    getRequestUrlKey(requestUrl: string, baseUrl: string) {
        const parsedUrlObject = new URL(requestUrl, baseUrl);
        return `${parsedUrlObject.origin}${parsedUrlObject.pathname}`;
    }

    async configRuleRequest(
        url: string,
        requestUrl: string,
        requestRule: Partial<NetworkAPIRule>,
        state: NetworkLifeCycle,
    ) {
        const rule = await this.ensureRule(url);

        const parsedUrl = this.getRequestUrlKey(requestUrl, url);

        rule.rules[parsedUrl] = rule.rules[parsedUrl] ?? { url: requestUrl };
        const requestUrlRule = rule.rules[parsedUrl]!;
        requestUrlRule[state] = requestUrlRule[state] ?? { enable: true, handlerFunctionScript: '' };

        Object.assign(requestUrlRule[state]!, requestRule);

        this.save();
    }

    async save() {
        await setLocalStorage<NetworkRulesStorage>(storageKey, { enable: this.enable, rules: this.allRules ?? {} });
    }

    async forceSave(rules: string) {
        await setLocalStorage<NetworkRulesStorage>(storageKey, { enable: this.enable, rules: JSON.parse(rules) ?? {} });
    }
}

export const networkRuleHandler = new NetworkRuleHandler();

registerStorage(storageKey, {
    onExport: async () => {
        const data = await getLocalStorage<NetworkRulesStorage>(storageKey, { enable: false, rules: {} });
        return data;
    },
    onImport: async (data: NetworkRulesStorage) => {
        await setLocalStorage<NetworkRulesStorage>(storageKey, data);
    },
});
