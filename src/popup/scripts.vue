<template>
  <div class="content-box" :data-match="isMatch" :data-enable="enable">
    <button v-show="!status" class="btn custom" @click="setStatus(1)">custom</button>
    <div v-show="!!status">
      <button class="btn" :class="{err: nameError}" @click="save">save</button>
      <div data-for="customScript">
        <div class="domain-tips">
          <textarea v-model="name" class="input domain" :class="{err: nameError}" placeholder="preg." spellcheck="false" rows="1"></textarea>
          <input class="checkbox-enable" type="checkbox" :checked="enable" @change="setEnable" />
        </div>
        <div ref="styleEditor" class="editor editor-style input"></div>
        <div ref="scriptEditor" class="editor editor-script input"></div>
      </div>
    </div>
  </div>
</template>
<script>
import { getSelected, scriptRules, loadScript, setBodySize } from '../utils'

export default {
  data() {
    return {
      isMatch: false,
      name: null,
      status: 0,
      enable: true
    }
  },
  watch: {
    status() {
      setBodySize(this.status ? 500 : 0)
    }
  },
  computed: {
    nameError() {
      let valid = true;
      try{
        valid = scriptRules.toPreg(this.name).test(this.validUrl);
      }catch(e){
        console.error(e);
        valid = false;
      }
      return this.name && !valid;
    }
  },
  async created() {
    const tab = await getSelected()
    const { domain, path, query, hash } = scriptRules.parseUrl(tab.url)
    this.validUrl = domain + path + query + hash
    this.rule = (await scriptRules.match(this.validUrl)) || {}
    this.isMatch = this.rule.name
    this.name = this.rule.name || domain + path
    this.enable = this.rule.name ? !!this.rule.enable : true

    await this.initEditor(this.rule)
  },
  mounted() {},
  methods: {
    async initEditor(rule) {
      await loadScript('../lib/ace/ace.js')
      await loadScript('../lib/ace/ext-language_tools.js')

      this.styleEditor = this.initStyleEditor()
      this.scriptEditor = this.initScriptEditor()

      this.styleEditor.setValue(rule.styles || '')
      this.scriptEditor.setValue(rule.scripts || '')
    },
    setStatus(value) {
      this.status = value
    },
    setEnable(e) {
      this.enable = e.target.checked
    },
    save() {
      const styleValue = this.styleEditor.getValue()
      const scriptValue = this.scriptEditor.getValue()
      // 如果preg不设置&没有原来的话那就删除
      if (this.rule.name && !this.name) {
        scriptRules.remove(this.rule.name)
        this.rule = {}
        this.isMatch = false
      }
      // 没有原来而且没有填内容的话就不保存
      else if (!this.rule.name && !styleValue && !scriptValue) {
        return
      }
      // 保存
      else {
        if (!scriptRules.toPreg(this.name).test(this.validUrl)) {
          return
        }
        scriptRules.set(this.name, {
          styles: styleValue,
          scripts: scriptValue,
          enable: this.enable
        })
      }
      this.status = 0
    },

    initStyleEditor() {
      const inputNode = this.$refs.styleEditor
      ace.require('ace/ext/language_tools')
      var editor = ace.edit(inputNode)
      editor.setOptions({
        enableLiveAutocompletion: true //只能补全
      })
      editor.setTheme('ace/theme/xcode') //monokai模式是自动显示补全提示
      editor.getSession().setMode('ace/mode/css') //语言
      return editor
    },
    initScriptEditor() {
      const inputNode = this.$refs.scriptEditor
      ace.require('ace/ext/language_tools')
      var editor = ace.edit(inputNode)
      editor.setOptions({
        enableLiveAutocompletion: true //只能补全
      })
      editor.setTheme('ace/theme/monokai') //monokai模式是自动显示补全提示
      editor.getSession().setMode('ace/mode/javascript') //语言
      return editor
    }
  }
}
</script>
<style scoped>
.content-box {
  margin: 4px 0 0;
}

.content-box[data-match] .btn.custom {
  background: #e7ffed;
}
.content-box:not([data-enable]) {
  filter: brightness(0.95);
}
.editor-style:after {
  content: 'CSS';
}
.editor-script:after {
  content: 'JS';
}
.editor {
  position: relative;
  height: 140px;
}
.editor:after {
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
  transition: opacity 0.2s ease;
}
.editor:hover:after {
  opacity: 0;
}
.domain-tips {
  position: relative;
}
.domain-tips:before {
  content: 'pattern';
  position: absolute;
  line-height: 30px;
  color: #bbb;
  margin: 0 6px;
}
.checkbox-enable {
  position: absolute;
  right: 0;
  top: 5px;
  width: auto;
  transform: scale(1.5);
}
.input.domain {
  padding-left: 50px;
  width: calc(100% - 25px);
}
.input.err {
  border-color: #ff6232;
}
</style>
