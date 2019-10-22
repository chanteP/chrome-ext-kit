import { $, getSelected, scriptRules, insertTemplate, loadScript,setBodySize } from '../utils';

insertTemplate(`
  <!-- script -------------------------------------------------------------------------->
  <style>
    .content-box {
      margin: 4px 0 0;
    }

    [data-status="0"] button:nth-child(2),
    [data-status="0"] div[data-for] {
      display: none;
    }

    [data-status="1"] button:nth-child(1) {
      display: none;
    }
    #customScript.matched{
      background: #e7ffed;
    }
    #customScriptStyle:after{
      content: 'CSS';
    }
    #customScriptScript:after{
      content: 'JS';
    }
    .editor{
      position: relative;
      height: 140px;
    }
    .editor:after{
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      display: block;
      line-height: 140px;
      font-size: 54px;
      font-weight: 700;
      color: #cccccc2e;
      pointer-events: none;
      transition: opacity .2s ease;
    }
    .editor:hover:after{
      opacity: 0;
    }
    .customScriptDomain-tips:before{
      content: 'pattern';
      position: absolute;
      line-height: 30px;
      color: #bbb;
      margin: 0 6px;
    }
    #customScriptDomain{
      padding-left: 50px;
    }
  </style>
  <div class="content-box" data-status="0">
    <button class="btn" id="customScript">custom</button>
    <button class="btn" id="customScriptSave">save</button>
    <div data-for="customScript">
      <div class="customScriptDomain-tips">
        <textarea id="customScriptDomain" class="input" placeholder="preg." spellcheck="false" rows="1"></textarea>
      </div>
      <div id="customScriptStyle" class="editor input" placeholder="styles" spellcheck="false" rows="7"></div>
      <div id="customScriptScript" class="editor input" placeholder="scripts" spellcheck="false" rows="7"></div>
    </div>
  </div>
`);
(async _ => {
  const tab = await getSelected();
  const { domain, path, query, hash } = scriptRules.parseUrl(tab.url);
  let rule = (await scriptRules.match(domain + path + query + hash)) || {};

  await loadScript('../lib/ace/ace.js');
  await loadScript('../lib/ace/ext-language_tools.js');

  const styleEditor = initStyleEditor($('#customScriptStyle'));
  const scriptEditor = initScriptEditor($('#customScriptScript'));

  $('#customScriptDomain').value = rule.name || domain + path;
  styleEditor.setValue(rule.styles || '');
  scriptEditor.setValue(rule.scripts || '');

  rule.name && $('#customScript').classList.add('matched');
  $('#customScript').addEventListener('click', e => {
    e.currentTarget.parentNode.dataset.status = 1;
    setBodySize();
  });
  $('#customScriptSave').addEventListener('click', e => {
    const styleValue = styleEditor.getValue();
    const scriptValue = scriptEditor.getValue();
    // 如果preg不设置&没有原来的话那就删除
    if (rule.name && !$('#customScriptDomain').value) {
      scriptRules.remove(rule.name);
    }
    // 没有原来而且没有填内容的话就不保存
    else if (!rule.name && !styleValue && !scriptValue) {
    }
    // 保存
    else {
      scriptRules.set($('#customScriptDomain').value, {
        styles: styleValue,
        scripts: scriptValue
      });
    }
    e.currentTarget.parentNode.dataset.status = 0;
  });
})();

function initStyleEditor(inputNode) {
  ace.require('ace/ext/language_tools');
  var editor = ace.edit(inputNode);
  editor.setOptions({
    //      enableBasicAutocompletion: true,
    //      enableSnippets: true,
    enableLiveAutocompletion: true //只能补全
  });
  editor.setTheme('ace/theme/xcode'); //monokai模式是自动显示补全提示
  editor.getSession().setMode('ace/mode/css'); //语言
  return editor;
}
function initScriptEditor(inputNode) {
  ace.require('ace/ext/language_tools');
  var editor = ace.edit(inputNode);
  editor.setOptions({
    //      enableBasicAutocompletion: true,
    //      enableSnippets: true,
    enableLiveAutocompletion: true //只能补全
  });
  editor.setTheme('ace/theme/monokai'); //monokai模式是自动显示补全提示
  editor.getSession().setMode('ace/mode/javascript'); //语言
  return editor;
}
