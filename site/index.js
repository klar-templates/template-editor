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
  window.templateConfig = parent.frames.templateConfig;
  window.templateJs = '(function () {' + parent.frames.templateJs + '})()';
  const templateComponentsArr = parent.frames.templateComponentsArr;
  if (templateComponentsArr) {
    const result = parent.frames.templateComponentsArr.map(t => t.replace('export default ', ''));
    let content = result.join('');
    content = content.replace(/import (?:.|\n)*?;/gm, '');
    content = Babel.transform(content, { presets: ['react'] }).code;
    // content = `(function () {\n${content}\nwindow.templateNunjucksBlocks = ${JSON.stringify(window.templateNunjucksBlocks)};\n})();`;
    content = `(function () {\n${content}\nwindow.templateComponents = templateComponents;\n})();`;
    const s = document.createElement('script');
    s.innerHTML = content;
    document.body.appendChild(s);
  }
  parent.frames.templateComponents = window.templateComponents;

  // Add template site style after Babel has transpiled the JSX code
  const s = document.createElement('style');
  s.innerHTML = parent.frames.templateCss;
  document.querySelector('head').appendChild(s);

  // Add klar-pages-app style after Babel has transpiled the JSX code
  // const style = document.createElement('link');
  // style.href = 'http://localhost:4173/assets/index.00de0542.css';
  // style.rel = 'stylesheet';
  // document.querySelector('head').prepend(style);
  
  // Add klar-pages-app script after Babel has transpiled the JSX code
  const script = document.createElement('script');
  script.src = 'http://localhost:4173/assets/index.c62eeecc.js';
  script.type = 'module';
  script.crossOrigin = true;
  document.querySelector('head').appendChild(script);
  // document.querySelector('body').style.display = 'none';
  // setTimeout(() => document.querySelector('body').removeAttribute('style'), 300);

  // setTimeout(() => loadTemplateScript(), 60);
  
  setDarkmode();
}

// window.addEventListener('DOMContentLoaded', async (event) => {
async function renderSite() {
  const script = document.createElement('script');
  script.innerHTML = `tailwind.config =
  {
    darkMode: 'class',
    corePlugins: {
      preflight: true,
    },
    theme: {
      extend: {
        fontFamily: {
          display: ['var(--font-display)', ...window.tailwind.defaultTheme.fontFamily.sans],
          body: ['var(--font-body)', ...window.tailwind.defaultTheme.fontFamily.sans],
          logo: ['var(--font-logo)', ...window.tailwind.defaultTheme.fontFamily.sans],
        },
        colors: {
          primary: {
            DEFAULT: 'rgb(var(--primary-500) / <alpha-value>)',
            50: 'rgb(var(--primary-50) / <alpha-value>)',
            100: 'rgb(var(--primary-100) / <alpha-value>)',
            200: 'rgb(var(--primary-200) / <alpha-value>)',
            300: 'rgb(var(--primary-300) / <alpha-value>)',
            400: 'rgb(var(--primary-400) / <alpha-value>)',
            500: 'rgb(var(--primary-500) / <alpha-value>)',
            600: 'rgb(var(--primary-600) / <alpha-value>)',
            700: 'rgb(var(--primary-700) / <alpha-value>)',
            800: 'rgb(var(--primary-800) / <alpha-value>)',
            900: 'rgb(var(--primary-900) / <alpha-value>)',
          },
          neutral: {
            DEFAULT: 'rgb(var(--neutral-500) / <alpha-value>)',
            50: 'rgb(var(--neutral-50) / <alpha-value>)',
            100: 'rgb(var(--neutral-100) / <alpha-value>)',
            200: 'rgb(var(--neutral-200) / <alpha-value>)',
            300: 'rgb(var(--neutral-300) / <alpha-value>)',
            400: 'rgb(var(--neutral-400) / <alpha-value>)',
            500: 'rgb(var(--neutral-500) / <alpha-value>)',
            600: 'rgb(var(--neutral-600) / <alpha-value>)',
            700: 'rgb(var(--neutral-700) / <alpha-value>)',
            800: 'rgb(var(--neutral-800) / <alpha-value>)',
            900: 'rgb(var(--neutral-900) / <alpha-value>)',
          },
        },
      },
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