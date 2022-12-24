const initSite = function () {
  // Add klar-pages-app script after Babel has transpiled the JSX code
  const script = document.createElement('script');
  script.src = 'http://localhost:4173/assets/index.496f1fcc.js';
  script.type = 'module';
  script.crossOrigin = true;
  document.querySelector('head').appendChild(script);
}

window.addEventListener('DOMContentLoaded', (event) => {
  initSite();
});