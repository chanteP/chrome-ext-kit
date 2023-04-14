import { getCurrentTab, getLocalStorage, setLocalStorage } from '../../utils';

export interface NetworkAPIRule {
    enable: boolean;
    handlerFunctionScript: string;
}

export interface NetworkRule {
    url: string;
    rules: Record<string, NetworkAPIRule>;
}

const storageKey = 'networkRules';

class NetworkRuleHandler {
    allRules?: NetworkRule[];

    async allNetworkRules() {
        if (this.allRules) {
            return this.allRules;
        }
        return (this.allRules = await getLocalStorage<NetworkRule[]>(storageKey, []));
    }

    async getNetworkRule(url: string) {
        await this.allNetworkRules();
        return this.allRules?.find((rule) => rule.url === url);
    }

    async hasTabUrl(url: string) {
        await this.allNetworkRules();
        return this.allRules?.find((n) => n.url === url);
    }

    async ensureRule(url: string) {
        await this.allNetworkRules();

        let rule = await this.getNetworkRule(url);

        if (!rule) {
            rule = {
                url,
                rules: {},
            };
            this.allRules?.push(rule);
        }
        return rule;
    }

    async configRuleRequest(url: string, requestUrl: string, requestRule: Partial<NetworkAPIRule>) {
        const rule = await this.ensureRule(url);

        rule.rules[requestUrl] = rule.rules[requestUrl] ?? { enable: true, handlerFunctionScript: '' };

        Object.assign(rule.rules[requestUrl]!, requestRule);

        setLocalStorage(storageKey, this.allRules);
    }
}

export const networkRuleHandler = new NetworkRuleHandler();
