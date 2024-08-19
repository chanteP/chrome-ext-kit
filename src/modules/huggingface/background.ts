import { onRuntimeMessage, sendTabMessage } from '../../utils';

import { HfInference } from '@huggingface/inference';

const HF_TOKEN = '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';
const inference = new HfInference(HF_TOKEN);

let lastResult: { api: keyof HfInference; params: any; result: any } | undefined = undefined;

onRuntimeMessage('queryHuggingFace', async (data, sender, response) => {
    const [api, params] = data;

    console.log(`send HuggingFace: ${api}`);

    const result = await inference[api](params);

    lastResult = {
        api,
        params,
        result,
    }

    response(lastResult);
});

onRuntimeMessage('getLastHuggingFaceData', async (data, sender, response) => {
    response(lastResult);
});

console.log('HuggingFace module loaded');
