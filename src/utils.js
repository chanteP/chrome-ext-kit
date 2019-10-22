export function $(selector) {
  return document.querySelector(selector);
}

export function sendToContent(message, callback) {
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, message, function(response) {
      if (callback) callback(response);
    });
  });
}

export function contentOnMessage(callback) {
  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (sender.tab) {
      return;
    }
    callback && callback(request);
  });
}

export function insertTemplate(template) {
  return $('#main').insertAdjacentHTML('beforeEnd', template);
}

export function setBodySize(size = 500){
  if(size === 0){size = 200;}
  $('#main').style.width = `${size}px`;
}

export async function loadScript(src) {
  return new Promise((res, rej) => {
    const s = document.createElement('script');
    s.src = src;
    s.onload = res;
    s.onerror = rej;
    document.body.appendChild(s);
  });
}

export async function getSelected() {
  return new Promise(res => {
    chrome.tabs.getSelected(null, function(tab) {
      res(tab);
    });
  });
}

class ScriptRule {
  /**
   * scriptRules : {ruleName : {name, styles, scripts}}
   */
  constructor() {}
  toPreg(ruleName) {
    return new RegExp(String.raw`^${ruleName}`);
  }
  parseUrl(url) {
    let [match, scheme, domain, path, query, hash] =
      /^([\w]*\:\/\/)([^\/]*)([^\?\#]*)(\?[\s\S]*)?(\#[\s\S]*)?$/.exec(url) || [];
    return { scheme, domain, path, query, hash };
  }
  async getAllRules() {
    return new Promise(res => {
      chrome.storage.sync.get('scriptRules', rs => res((rs && rs.scriptRules) || []));
    });
  }
  async set(ruleName, { styles, scripts }) {
    if (!ruleName) {
      return;
    }
    let rules = await this.getAllRules();
    rules[ruleName] = { styles, scripts, name: ruleName };
    chrome.storage.sync.set({ scriptRules: rules });
  }
  async get(ruleName) {
    let rules = await this.getAllRules();
    return rules[ruleName];
  }
  async remove(ruleName) {
    let rules = await this.getAllRules();
    delete rules[ruleName];
    chrome.storage.sync.set({ scriptRules: rules });
  }
  async match(url) {
    let rules = await this.getAllRules();
    let ruleList = Object.keys(rules);
    let match = null;
    ruleList.forEach(ruleName => {
      let rule = rules[ruleName];
      // 匹配而且比之前match的更长
      if (this.toPreg(rule.name).test(url) && (!match || rule.name.length > rules[match].name.length)) {
        match = ruleName;
      }
    });
    return rules[match];
  }
}
export const scriptRules = new ScriptRule();
