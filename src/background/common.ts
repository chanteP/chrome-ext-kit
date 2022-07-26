import { onRuntimeMessage, sendTabMessage } from '../utils';

// chrome.tabs.onUpdated.addListener((tab) => {
//     console.log('create tab', tab.id)
//     sendTabMessage(tab.id!, [tab.id!]);
// });

onRuntimeMessage('tabInfo', (data, sender, response) => {
    response(sender.tab?.id);
});

