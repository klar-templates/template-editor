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
  // Add klar-pages-app script after Babel has transpiled the JSX code
  const script = document.createElement('script');
  script.src = 'http://localhost:4173/assets/index.717d46a8.js';
  script.type = 'module';
  script.crossOrigin = true;
  document.querySelector('head').appendChild(script);
}

window.addEventListener('DOMContentLoaded', async (event) => {
  const script = document.createElement('script');
  script.innerHTML = `tailwind.config = {
    corePlugins: {
      preflight: false,
    }
  }`;
  document.querySelector('head').appendChild(script);
  const req = await fetch('https://unpkg.com/@babel/standalone/babel.min.js');
  eval(await req.text());
  initSite();
});