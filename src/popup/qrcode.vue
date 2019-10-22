<template>
  <div class="flexbox">
    <img class="set-height" :src="src" @click="setBodySize" :alt="alt" />
    <textarea class="set-height input" v-model="canvasInput"></textarea>
  </div>
</template>
<script>
import QRCode from 'qrcode'
import { $, getSelected, insertTemplate, setBodySize } from '../utils'

export default {
  data() {
    return {
      src: '',
      alt: null,
      canvasInput: ''
    }
  },
  watch: {
    canvasInput() {
      this.buildQR()
    }
  },
  async created() {
    const tab = await getSelected()
    this.canvasInput = tab.url
  },
  mounted() {
    this.buildQR()
  },
  methods: {
    setBodySize() {
      setBodySize()
    },
    async buildQR() {
      this.src = await this.getQR(this.canvasInput).catch(e => (this.alt = e))
    },
    async getQR(text) {
      text = text || ''
      return new Promise((res, rej) => {
        const opts = {
          errorCorrectionLevel: 'L',
          type: 'image/jpeg',
          width: 250,
          margin: 0
        }
        QRCode.toDataURL(text, opts, function(err, url) {
          if (err) rej(err)
          res(url)
          this.alt = null
        })
      })
    }
  }
}
</script>
<style scoped>
.flexbox {
  display: flex;
  flex-wrap: nowrap;
}
.set-height {
  height: 200px;
}

img {
  display: block;
  width: 200px;
  flex-basis: 200px;
}
textarea {
  flex: 1;
  margin: 0;
  padding: 8px 10px;
  border-left: none;
  border-radius: 0 3px 3px 0;
  resize: none;
}
</style>
