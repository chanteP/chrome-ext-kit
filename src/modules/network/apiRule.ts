import { getCurrentTab, getLocalStorage, setLocalStorage } from '../../utils';

export const networkLifeCycle = ['response'] as const;
export type NetworkLifeCycle = typeof networkLifeCycle[number];

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
        const rule = this.allRules?.[url];
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

    save() {
        setLocalStorage<NetworkRulesStorage>(storageKey, { enable: this.enable, rules: this.allRules ?? {} });
    }
}

export const networkRuleHandler = new NetworkRuleHandler();

globalThis.nnn = networkRuleHandler;
