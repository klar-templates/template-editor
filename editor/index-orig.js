initAdmin = function () {
  const iframeWindow = frames[0];
  const iframeDocument = frames[0].document;
  // Add klar-pages-app script after Babel has transpiled the JSX code
  const script = iframeDocument.createElement('script');
  script.src = 'http://localhost:4173/assets/index.b5643cb4.js';
  script.type = 'module';
  script.crossOrigin = true;
  iframeDocument.querySelector('head').appendChild(script);

  iframeWindow.initTemplate = function (data) {
    const startpage = data.data.pages[0];
    const blocks = startpage.blocks;
    const block1 = blocks[0];
    const block2 = blocks[1];
  }
}

const iframe = document.querySelector('.js-iframe');
const desktop = document.querySelector('.js-desktop');
const ipad = document.querySelector('.js-ipad');
const mobile = document.querySelector('.js-mobile');

function clearBreakpoints() {
  iframe.classList.remove('desktop');
  iframe.classList.remove('ipad');
  iframe.classList.remove('mobile');
  desktop.classList.remove('active');
  ipad.classList.remove('active');
  mobile.classList.remove('active');
}

desktop.addEventListener('click', (e) => {if((window.innerWidth - 260) < 1280) {clearBreakpoints();return};if(iframe.classList.contains('desktop')) {clearBreakpoints();} else {clearBreakpoints();iframe.classList.add('desktop');e.target.classList.add('active');}});
ipad.addEventListener('click', (e) => {if((window.innerWidth - 260) < 1024) {clearBreakpoints();return};if(iframe.classList.contains('ipad')) {clearBreakpoints();} else {clearBreakpoints();iframe.classList.add('ipad');e.target.classList.add('active');}});
mobile.addEventListener('click', (e) => {if((window.innerWidth - 260) < 768) {clearBreakpoints();return};if(iframe.classList.contains('mobile')) {clearBreakpoints();} else {clearBreakpoints();iframe.classList.add('mobile');e.target.classList.add('active');}});