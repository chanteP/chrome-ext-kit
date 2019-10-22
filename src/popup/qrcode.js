import QRCode from 'qrcode';
import { $, getSelected, insertTemplate, setBodySize} from '../utils';

insertTemplate(`
  <!-- qrcode -------------------------------------------------------------------------->
  <style>
    .flexbox{
      display: flex;
      flex-wrap: nowrap;
    }
    #canvas,
    #canvasInput{
      height: 200px;
    }

    #canvas {
      display: block;
      width: 200px;
    }
    #canvasInput{
      flex: 1;
      margin: 0;
      padding: 8px 10px;
      border-left: none;
      border-radius: 0 3px 3px 0;
      resize: none;
    }
  </style>
  <div class="flexbox">
    <img id="canvas" />
    <textarea id="canvasInput" class="input"></textarea>
  </div>
`);

(async _ => {
  const tab = await getSelected();
  // show QRCode
  const canvas = $('#canvas');

  $('#canvas').addEventListener('click', _ => setBodySize());
  $('#canvasInput').addEventListener('input', buildQR);
  $('#canvasInput').value = tab.url;

  buildQR();

  async function buildQR(){
    canvas.src = await getQR($('#canvasInput').value || '').catch(e => (canvas.alt = e));
  }
})();

async function getQR(text) {
  return new Promise((res, rej) => {
    const opts = {
      errorCorrectionLevel: 'L',
      type: 'image/jpeg',
      width: 250,
      margin: 0
    };
    QRCode.toDataURL(text, opts, function(err, url) {
      if (err) rej(err);
      res(url);
    });
  });
}



function fuckBaidu() {
  const selectors = [
    'body /deep/ span[data-tuiguang]',
    'body /deep/ span.ec_tuiguang_pplink',
    'body /deep/ span.ec-tuiguang'
  ];
  const container = document.querySelector('#content_left') || document.querySelector('#results');
  [].forEach.call(document.querySelectorAll(selectors.join(',')), span => {
    let node = span;
    while (node) {
      if (
        (node.classList && node.classList.contains('result') && node.classList.contains('c-container')) ||
        node.parentNode === container
      ) {
        node.style.cssText += 'display:none !important;;height:0 !important;overflow:hidden;';
        break;
      }
      node = node.parentNode;
    }
  });
}
fuckBaidu();
setInterval(fuckBaidu, 1500);