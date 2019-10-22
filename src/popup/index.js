import 'babel-polyfill';

import Vue from 'vue';
import QrCode from './qrcode.vue';
import Scripts from './scripts.vue';

import { $ } from '../utils';

[QrCode, Scripts].forEach(Mod => {
  const d = document.createElement('div');
  $('#main').appendChild(d);
  new Vue({
    el: d,
    render: h => h(Mod)
  });
});
