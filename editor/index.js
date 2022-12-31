function initTemplate(data, components, nunjucksBlocks, config) {
  const startpage = data.data.pages[0];
  const blocks = startpage.blocks;
  const block1 = blocks[0];
  const block2 = blocks[1];
  // blocks.push(block1)
  // console.log(data);
  // console.log(components);
  // console.log(nunjucksBlocks);
  // console.log(config);
  renderBlocks(data, components, nunjucksBlocks, config);
}

function renderBlocks(data, components, nunjucksBlocks, config) {
  window.template = {
    data: data,
    components: components,
    nunjucksBlocks: nunjucksBlocks,
    config: config
  };
  renderTemplateBlocks();
  // data.data.pages[0].blocks = [];
  // config.block_types.forEach((blockType, i) => {
  //   const dataDefault = config.data_defaults.blocks[blockType.name];
  //   const blockData = {...dataDefault, data: dataDefault, _id: `${blockType.name}-123456`,  _type: blockType.name};
  //   data.data.pages[0].blocks.splice(i, 0, blockData);
  // });

  // const blockType = config.block_types.find((b) => b.name === 'TemplateEditorHero');
  // const blockData = config.data_defaults.blocks['TemplateEditorHero'];
  // const blockType = config.block_types[0];
  // const blockData = config.data_defaults.blocks[Object.keys(config.data_defaults.blocks)[0]];
  // const b = {...blockData, data: blockData, _id: `${blockType.name}-123456`,  _type: blockType.name};
  // data.data.pages[0].blocks.splice(1, 0, b);

  // const blockType1 = config.block_types[2];
  // const blockData1 = config.data_defaults.blocks[Object.keys(config.data_defaults.blocks)[2]];
  // const b1 = {...blockData1, data: blockData1, _id: `${blockType1.name}-23456789`,  _type: blockType1.name};
  // data.data.pages[1].blocks.splice(1, 0, b1);
  // console.log(b)
  // data.data.pages[0].blocks = [];
  // data.data.pages[0].blocks.push(b);
  // data.data.pages[0].blocks.splice(1, 1);
  // data.navigate('/');
  // data.setData(data);
  // console.log(data)
  // console.log(blockType)
}

function renderTemplateBlocks() {
  const config = window.template.config;
  const data = window.template.data;
  const pageNumber = 0;
  data.data.pages[pageNumber].blocks = data.data.pages[pageNumber].blocks.splice(0, 1);
  config.block_types.forEach((blockType, i) => {
    const dataDefault = config.data_defaults.blocks[blockType.name];
    const blockData = {...dataDefault, data: dataDefault, _id: `${blockType.name}-123456`,  _type: blockType.name};
    data.data.pages[pageNumber].blocks.splice(i+1, 0, blockData);
  });
  // parent.frames[0].document.querySelector('body').style.display = 'none';
  // setTimeout(() => parent.frames[0].document.querySelector('body').removeAttribute('style'), 100);
  // setTimeout((() => console.log(parent.frames[0].document.getElementsByTagName('style')[0].innerHTML)), 2000);
}

function setInitTemplate() {
  const iframeWindow = frames[0];
  iframeWindow.initTemplate = function (siteData) {
    initTemplate(siteData, window.templateComponents, window.templateNunjucksBlocks, window.templateConfig);
  }
}

function setEvents() {
  const iframe = document.querySelector('.js-iframe');
  const desktop = document.querySelector('.js-desktop');
  const ipad = document.querySelector('.js-ipad');
  const mobile = document.querySelector('.js-mobile');
  const bpInputWidth = document.querySelector('#bp-input-width');
  const bpSelectWidth = document.querySelector('#bp-select-width');
  const btnDownloadBundle = document.querySelector('.js-download-bundle');

  function clearBreakpoints(notInputs) {
    iframe.classList.remove('desktop');
    iframe.classList.remove('ipad');
    iframe.classList.remove('mobile');
    desktop.classList.remove('active');
    ipad.classList.remove('active');
    mobile.classList.remove('active');
    iframe.removeAttribute('style');
    if (!notInputs) {
      bpInputWidth.value = '';
      bpSelectWidth.value = '';
    }
  }

  desktop.addEventListener('click', (e) => {if((window.innerWidth - 260) < 1024) {clearBreakpoints();removeEditorSetting('breakpoint');return;};if(iframe.classList.contains('desktop')) {clearBreakpoints();removeEditorSetting('breakpoint');} else {clearBreakpoints();iframe.classList.add('desktop');e.target.classList.add('active');setEditorSetting('breakpoint', 'desktop');}});
  ipad.addEventListener('click', (e) => {if((window.innerWidth - 260) < 768) {clearBreakpoints();removeEditorSetting('breakpoint');return;};if(iframe.classList.contains('ipad')) {clearBreakpoints();removeEditorSetting('breakpoint');} else {clearBreakpoints();iframe.classList.add('ipad');e.target.classList.add('active');setEditorSetting('breakpoint', 'ipad');}});
  mobile.addEventListener('click', (e) => {if((window.innerWidth - 260) < 375) {clearBreakpoints();removeEditorSetting('breakpoint');return;};if(iframe.classList.contains('mobile')) {clearBreakpoints();removeEditorSetting('breakpoint');} else {clearBreakpoints();iframe.classList.add('mobile');e.target.classList.add('active');setEditorSetting('breakpoint', 'mobile');}});

  bpInputWidth.addEventListener('keyup', (e) => {if(e.target.value < 200) {return};clearBreakpoints(true);const w = e.target.value;if (!isNaN(w)) {bpSelectWidth.value = '';iframe.style.width = w+'px';setEditorSetting('breakpoint', w);}});
  bpSelectWidth.addEventListener('change', (e) => {
    if((window.innerWidth - 260) < parseInt(e.target.value)) {return};
    clearBreakpoints(true);const w = e.target.value;if (!isNaN(w)) {bpInputWidth.value = '';iframe.style.width = w+'px';setEditorSetting('breakpoint', w);}});

  const selectWidthLookup = {
    '375': '375',
    '640': '640',
    '768': '768',
    '1024': '1024',
    '1280': '1280',
    '1536': '1536',
  }
  
  const breakpointValue = getEditorSetting('breakpoint');
  if (breakpointValue) {
    iframe.classList.add(breakpointValue);
    if (breakpointValue === 'desktop') {
      desktop.classList.add('active');
    } else if (breakpointValue === 'ipad') {
      ipad.classList.add('active');
    } else if (breakpointValue === 'mobile') {
      mobile.classList.add('active');
    } else {
      if (selectWidthLookup[breakpointValue]) {
        iframe.style.width = breakpointValue+'px';
        bpSelectWidth.value = breakpointValue;
      } else {
        iframe.style.width = breakpointValue+'px';
        bpInputWidth.value = breakpointValue;
      }
    }
  }

  btnDownloadBundle.addEventListener('click', (e) => downloadBundle(e));
}

async function downloadBundle(e) {
  // renderTemplateBlocks();
  try {
    const result = await downloadBundle1(e);
  } catch(e) {
    // console.log(e);
  }
}

async function downloadBundle1(e) {
  e.preventDefault();
  // await writeFile(e, 'Gabriel Lantz');
  // if (!window.Babel) {
  //   insertScript('head', 'https://unpkg.com/@babel/standalone/babel.min.js', function(){document.querySelector('.js-download-bundle').click()});
  //   return;
  // }
  const cssLink = document.querySelector('.js-download-css-bundle');
  let css = parent.frames[0].document.getElementsByTagName('style')[0].innerHTML;
  // css = 'data:text/plain;charset=utf-8,' + encodeURIComponent(css);
  // console.log(css);
  cssLink.href = css;
  // cssLink.target = '_blank';
  // let uniqueId = (new Date()).getTime();
  uniqueId = 'template';
  cssLink.download = 'index.' + uniqueId + '.css';
  // cssLink.click();
  // console.log(parent.frames[0].klarContext)

  const urls = window.template.config.block_types.map(b => {
    if (!b.template_engine) {
      const url = 'blocks/' + b.name + '.js';
      return url;
    }
    return null;
  })?.filter(x => x !== null);
  urls.push('blocks/index.js');
  console.log(urls)
  const requests = urls.map((url) => fetch(url));
  const responses = await Promise.all(requests); 
  const promises = responses.map((response) => response.text());
  let result = await Promise.all(promises);
  // console.log(requests);
  // console.log(responses);
  // console.log(promises);
  // console.log(result);
  result = result.map(t => t.replace('export default ', ''));
  // console.log(result);
  let content = result.join('');
  content = content.replace(/import (?:.|\n)*?;/gm, '');
  content = parent.frames[0].Babel.transform(content, { presets: ['react'] }).code;
  // content = content + '';
  content = `(function () {\n${content}\nwindow.templateComponents = templateComponents;\nwindow.templateNunjucksBlocks = ${JSON.stringify(window.templateNunjucksBlocks)};\n})();`;
  // content = new Blob([content], {type: 'text/plain'});
  // console.log(content);
  // content = 'data:text/plain;charset=utf-8,' + encodeURIComponent(content);
  // console.log(content)
  const jsLink = document.querySelector('.js-download-js-bundle');
  // jsLink.href = URL.createObjectURL(content);
  jsLink.href = content;
  // jsLink.target = '_blank';
  // uniqueId = (new Date()).getTime();
  uniqueId = 'template';
  jsLink.download = 'index.' + uniqueId + '.js';
  // jsLink.click();
  // URL.revokeObjectURL(jsLink.href);
  
  const supportsFileSystemAccess =
    'showSaveFilePicker' in window &&
    (() => {
      try {
        return window.self === window.top;
      } catch {
        return false;
      }
    })();
  // If the File System Access API is supported…
  if (supportsFileSystemAccess) {
    const options = {
      multiple: true,
      suggestedName: "index.template",
      types: [
        {
          accept: {
            "text/plain": [".js"],
          },
        }
      ],
    };
    
    const handle = await window.showSaveFilePicker(options);
    const writable = await handle.createWritable();
    
    await writable.write(content);
    await writable.close();

    options.types = [
      {
        accept: {
          "text/plain": [".css"],
        },
      },
    ];

    
    const handle1 = await window.showSaveFilePicker(options);
    const writable1 = await handle1.createWritable();
    
    await writable1.write(css);
    await writable1.close();
    
    return handle;
  } else {
    cssLink.click();
    jsLink.click();
  }
}

function insertScript(selector, src, callback) {
  const script = document.createElement('script');
  script.src = src;
  if (callback) {
    script.onload = callback;
  }
  document.querySelector(selector).appendChild(script);
}

function addHtml() {
  const adminHtml = `
    <div class="layout">
      <div class="sidebar-nav transition-[width] flex flex-col items-center w-16 h-full overflow-hidden text-neutral-500 bg-white rounded">
        <a class="flex items-center justify-center mt-3" href="#">
          <svg class="w-8 h-8 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z" />
          </svg>
        </a>
        <div class="flex flex-col items-center mt-3">
          <hr class="border-t border-gray-200 w-[62px]"></hr>
          <a class="flex items-center justify-center w-12 h-12 mt-2 rounded bg-gray-200" href="#">
            <svg class="w-6 h-6 stroke-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
          </a>
          <a class="flex items-center justify-center w-12 h-12 mt-2 rounded hover:bg-gray-200" href="#">
            <svg class="w-6 h-6 stroke-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </a>
          <a class="flex items-center justify-center w-12 h-12 mt-2 text-gray-500 hover:bg-gray-200 rounded" href="#">
            <svg class="w-6 h-6 stroke-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </a>
          <a class="flex items-center justify-center w-12 h-12 mt-2 rounded hover:bg-gray-200" href="#">
            <svg class="w-6 h-6 stroke-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
            </svg>
          </a>
        </div>
        <hr class="border-t border-gray-200 w-[62px] mt-2"></hr>
        <div class="flex flex-col items-center">
          <a class="flex items-center justify-center w-12 h-12 mt-2 rounded hover:bg-gray-200" href="#">
            <svg class="w-6 h-6 stroke-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </a>
          <a class="flex items-center justify-center w-12 h-12 mt-2 rounded hover:bg-gray-200" href="#">
            <svg class="w-6 h-6 stroke-current"  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
            </svg>
          </a>
          <a class="relative flex items-center justify-center w-12 h-12 mt-2 rounded hover:bg-gray-200" href="#">
            <svg class="w-6 h-6 stroke-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
            </svg>
            <span class="absolute top-0 left-0 w-2 h-2 mt-2 ml-2 bg-indigo-500 rounded-full"></span>
          </a>
        </div>
        <a class="flex items-center justify-center w-16 h-16 mt-auto bg-gray-200 hover:bg-gray-100" href="#">
          <svg class="w-6 h-6 stroke-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </a>
      </div>
      <aside class="sidebar p-4 relative">
        <h1 class="text-2xl font-semibold text-neutral-700">Edit blocks</h1>
        <div class="breakpoints mt-4">
          <div class="inline-flex" role="group">
            <button title="Width: 1024" type="button" class="js-desktop border rounded-l inline-block px-4 py-1.5 text-neutral-500 font-medium text-xs leading-tight transition duration-150 ease-in-out"><svg style="pointer-events:none;" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" />
            </svg>
            </button>
            <button title="Width: 768" type="button" class="js-ipad border border-x-0 inline-block px-4 py-1.5 text-neutral-500 font-medium text-xs leading-tight transition duration-150 ease-in-out"><svg style="pointer-events:none;" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5h3m-6.75 2.25h10.5a2.25 2.25 0 002.25-2.25v-15a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 4.5v15a2.25 2.25 0 002.25 2.25z" />
            </svg>
            </button>
            <button title="Width: 375" type="button" class="js-mobile border rounded-r inline-block px-4 py-1.5 text-neutral-500 font-medium text-xs leading-tight transition duration-150 ease-in-out"><svg style="pointer-events:none;" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
            </svg>
            </button>
          </div>
        </div>
        <div class="mt-4">
          <label for="bp-input-width" class="block text-sm font-medium text-gray-700">Width</label>
          <div class="relative mt-1 rounded-md shadow-sm">
            <input type="text" name="bp-input-width" id="bp-input-width" class="block w-full rounded-md border py-1 border-gray-300 pl-2 pr-12 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" placeholder="Enter a width" />
            <div class="absolute inset-y-0 right-0 flex items-center">
              <label for="bp-select-width" class="sr-only">Width</label>
              <select id="bp-select-width" name="bp-select-width" class="h-full rounded-md border-transparent bg-transparent py-0 pl-2 pr-1 mr-1 text-gray-500 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                <option></option>  
                <option>375</option>
                <option>640</option>
                <option>768</option>
                <option>1024</option>
                <option>1280</option>
                <option>1536</option>
              </select>
            </div>
          </div>
        </div>
        <div class="mt-4"><a href="#" class="js-download-css-bundle hidden">Download CSS</a><a href="#" class="js-download-js-bundle hidden">Download JS</a><a href="#" title="Build the CSS and JS-files and\nput them in the dist folder." class="js-download-bundle w-[228px] absolute left-4 bottom-4 border border-gray-200 hover:border-gray-300 text-gray-700 block text-center rounded-lg px-4 py-1.5 text-base font-semibold leading-7 shadow-sm hover:bg-primary-dark">Build Bundle</a></div>
      </aside>
      <main class="main bg-neutral-100">
        <iframe class="iframe js-iframe transition-[width] shadow-lg" src="${getEditorSetting('current-page') ? getEditorSetting('current-page') : '/'}"></iframe>
      </main>
    </div>
  `;
  document.body.append(new DOMParser().parseFromString(adminHtml, 'text/html').querySelector('.layout'));
}

function setHead() {
  document.title = 'Klar Template Editor'  
}

function getEditorSettings() {
  let editorSettings = localStorage.getItem('editor-settings');
  if (editorSettings) {
    editorSettings = JSON.parse(editorSettings);
  } else {
    editorSettings = {};
  }
  return editorSettings;
}
 
function getEditorSetting(key) {
  const editorSettings = getEditorSettings();
  return editorSettings[key];
}

function removeEditorSetting(key) {
  const editorSettings = getEditorSettings();
  delete editorSettings[key];
  localStorage.setItem('editor-settings', JSON.stringify(editorSettings));
}

function setEditorSetting(key, value) {
  const editorSettings = getEditorSettings();
  editorSettings[key] = value; 
  localStorage.setItem('editor-settings', JSON.stringify(editorSettings));
}

function setState() {

}

function startEditor(config, templateNunjucksBlocks, templateComponentsArr) {
  window.templateConfig = config;
  window.templateNunjucksBlocks = templateNunjucksBlocks;
  window.templateComponentsArr = templateComponentsArr;
  setHead();
  addHtml();
  setInitTemplate();
  setEvents();
  parent.frames[0].addEventListener('unload', (event) => {
    const pathname = parent.frames[0].location.pathname;
    if (pathname !== 'blank') {
      setEditorSetting('current-page', pathname);
    }
  });
}

fetch('../config.json')
  .then((response) => response.json())
  .then(async (config) => { 
    const urls = config.block_types.map(b => {
      if (b.template_engine) {
        const url = 'blocks/' + b.name + '.html';
        return url;
      } else {
        const url = 'blocks/' + b.name + '.js';
        return url;
      }
    })?.filter(x => x !== null);
    urls.push('blocks/index.js');
    // console.log(urls)
    const requests = urls.map((url) => fetch(url));
    const responses = await Promise.all(requests);
    const promises = responses.map((response) => response.text());
    let result = await Promise.all(promises);
    const templateNunjucksBlocks = {};
    const templateComponents = {};
    const templateComponentsArr = [];
    result.forEach((b, i) => {
      if (urls[i].includes('html')) {
        templateNunjucksBlocks[urls[i].replace('blocks/', '').replace('.html', '')] = b;
      } else {
        templateComponentsArr.push(b);
        templateComponents[urls[i].replace('blocks/', '').replace('.js', '')] = urls[i].replace('blocks/', '').replace('.js', '');
      }
    });
    startEditor(config, templateNunjucksBlocks, templateComponentsArr);
  });