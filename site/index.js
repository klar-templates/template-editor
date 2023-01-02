// function onError(err) {
//   console.error('Error registering service-worker:', err)
//   document.getElementById('root').innerText = err.toString()
// }
// if ('serviceWorker' in navigator) {
//   navigator.serviceWorker.register('/service-worker.js', {scope: '/'})
//     .then(registration => {
//       window.serviceWorkerRegistration = registration
//       // use `await window.serviceWorkerRegistration.unregister()` to unregister the service worker
//     })
//     .catch(onError)
// } else {
//   onError('Browser does not support service workers :-(')
// }

function setDarkmode() {
  if (!parent.frames.length > 0) {
    return;
  }
  const isDarkmode = parent.frames.getEditorSetting('darkmode');
  if (isDarkmode === 'true') {
    const htmlEl = document.documentElement;
    if (htmlEl) {
      htmlEl.classList.add('dark')
    }
  }
}

const initSite = function () {
  window.templateNunjucksBlocks = parent.frames.templateNunjucksBlocks;
  const templateComponentsArr = parent.frames.templateComponentsArr;
  if (templateComponentsArr) {
    const result = parent.frames.templateComponentsArr.map(t => t.replace('export default ', ''));
    let content = result.join('');
    content = content.replace(/import (?:.|\n)*?;/gm, '');
    content = Babel.transform(content, { presets: ['react'] }).code;
    // content = content + '';
    // content = `(function () {\n${content}\nwindow.templateNunjucksBlocks = ${JSON.stringify(window.templateNunjucksBlocks)};\n})();`;
    content = `(function () {\n${content}\nwindow.templateComponents = templateComponents;\n})();`;
    // console.log(window.templateComponents);
    // console.log(parent.frames.templateComponentsArr)
    // window.templateComponents = tempTemplateComponents;
    const s = document.createElement('script');
    s.innerHTML = content;
    document.body.appendChild(s);
    // console.log(window.templateNunjucksBlocks)
    // console.log(window.templateComponents)
    // console.log(content);
  }
  parent.frames.templateComponents = window.templateComponents;

  // <link href="http://localhost:4173/assets/index.7d5d8db6.css" rel="stylesheet" />
  // Add klar-pages-app style after Babel has transpiled the JSX code
  const style = document.createElement('link');
  style.href = 'http://localhost:4173/assets/index.f797de30.css';
  style.rel = 'stylesheet';
  document.querySelector('head').appendChild(style);
  // setTimeout(() => {document.querySelector('head').appendChild(style)}, 1000);
  
  // Add klar-pages-app script after Babel has transpiled the JSX code
  const script = document.createElement('script');
  script.src = 'http://localhost:4173/assets/index.a0f1c4d4.js';
  script.type = 'module';
  script.crossOrigin = true;
  document.querySelector('head').appendChild(script);
  // document.querySelector('body').style.display = 'none';
  // setTimeout(() => document.querySelector('body').removeAttribute('style'), 300);

  setDarkmode();
}

// window.addEventListener('DOMContentLoaded', async (event) => {
async function renderSite() {
  const script = document.createElement('script');
  script.innerHTML = `tailwind.config = {
    darkMode: 'class',
    corePlugins: {
      preflight: false,
    }
  }`;
  document.querySelector('head').appendChild(script);
  if (parent.frames.getEditorSetting) {
    const babelPackage = parent.frames.getEditorSetting('babel_package');
    if (babelPackage) {
      eval(babelPackage);
    } else {
      const req = await fetch('https://unpkg.com/@babel/standalone/babel.min.js');
      const res = await req.text();
      eval(res);
      parent.frames.setEditorSetting('babel_package', res);
    }
  }
  initSite();
}
renderSite();
// });