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
  // window.templateComponents = parent.frames.templateComponents;
  
  // const tempTemplateComponents = {};
  // Object.keys(parent.frames.templateComponents).forEach((key, i) => {
  //   let content = parent.frames.templateComponents[key];
  //   if (content.includes('export default ')) {
  //     content = content.replace('export default ', '');
  //     content = Babel.transform(content, { presets: ['react'] }).code;
  //     // content = new Function ('something', content);
  //     // serverRendered = new Function ('dataObj', reactTemplateScriptStr + reactScriptStr);
  //     content = `(function () {\n${content}\n})();`;
  //     tempTemplateComponents[key] = content;
  //   }
  // });
  // // window.templateComponents = tempTemplateComponents;
  // const s = document.createElement('script');
  // s.innerHTML = 'window.templateComponents = ' + JSON.stringify(tempTemplateComponents);
  // document.body.appendChild(s);
  // console.log(window.templateComponents);
    
  // Add klar-pages-app script after Babel has transpiled the JSX code
  const script = document.createElement('script');
  script.src = 'http://localhost:4173/assets/index.717d46a8.js';
  script.type = 'module';
  script.crossOrigin = true;
  document.querySelector('head').appendChild(script);
}

window.addEventListener('DOMContentLoaded', (event) => {
  initSite();
});