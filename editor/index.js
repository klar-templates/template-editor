function initTemplate(data, components, config) {
  const startpage = data.data.pages[0];
  const blocks = startpage.blocks;
  const block1 = blocks[0];
  const block2 = blocks[1];
  // blocks.push(block1)
  // console.log(data);
  // console.log(components);
  // console.log(config);
  renderBlocks(data, components, config);
}

function renderBlocks(data, components, config) {
  const blockType = config.block_types.find((b) => b.name === 'TemplateEditorHero');
  const blockData = config.data_defaults.blocks['TemplateEditorHero'];
  const b = {...blockData, _id: `${blockType.name}-123456`,  _type: blockType.name}
  // data.data.pages[0].blocks = [];
  // data.data.pages[0].blocks.push(b);
  data.data.pages[1].blocks.splice(1, 0, b);
  // data.navigate('/');
  // data.setData(data);
  // console.log(data)
  // console.log(blockType)
}

function setInitTemplate() {
  const iframeWindow = frames[0];
  iframeWindow.initTemplate = function (siteData) {
    fetch('../config.json')
      .then((response) => response.json())
      .then((data) => { 
        window.templateConfig = data;
        initTemplate(siteData, iframeWindow.templateComponents, data);
      });
    }
}

function setEvents() {
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

  desktop.addEventListener('click', (e) => {if((window.innerWidth - 260) < 1280) {clearBreakpoints();removeEditorSetting('breakpoint');return};if(iframe.classList.contains('desktop')) {clearBreakpoints();removeEditorSetting('breakpoint');} else {clearBreakpoints();iframe.classList.add('desktop');e.target.classList.add('active');setEditorSetting('breakpoint', 'desktop');}});
  ipad.addEventListener('click', (e) => {if((window.innerWidth - 260) < 1024) {clearBreakpoints();removeEditorSetting('breakpoint');return};if(iframe.classList.contains('ipad')) {clearBreakpoints();removeEditorSetting('breakpoint');} else {clearBreakpoints();iframe.classList.add('ipad');e.target.classList.add('active');setEditorSetting('breakpoint', 'ipad');}});
  mobile.addEventListener('click', (e) => {if((window.innerWidth - 260) < 768) {clearBreakpoints();removeEditorSetting('breakpoint');return};if(iframe.classList.contains('mobile')) {clearBreakpoints();removeEditorSetting('breakpoint');} else {clearBreakpoints();iframe.classList.add('mobile');e.target.classList.add('active');setEditorSetting('breakpoint', 'mobile');}});

  const breakpointValue = getEditorSetting('breakpoint');
  if (breakpointValue) {
    iframe.classList.add(breakpointValue);
    if (breakpointValue === 'desktop') {
      desktop.classList.add('active');
    } else if (breakpointValue === 'ipad') {
      ipad.classList.add('active');
    } else if (breakpointValue === 'mobile') {
      mobile.classList.add('active');
    }
  }
}

function addHtml() {
  const adminHtml = `
    <div class="layout">
      <aside class="sidebar p-4">
        <h1 class="text-2xl font-semibold text-neutral-700">Edit blocks</h1>
        <div class="breakpoints mt-4">
          <div class="inline-flex" role="group">
            <button title="Width: 1280" type="button" class="js-desktop border rounded-l inline-block px-4 py-1.5 text-neutral-500 font-medium text-xs leading-tight transition duration-150 ease-in-out"><svg style="pointer-events:none;" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" />
            </svg>
            </button>
            <button title="Width: 1024" type="button" class="js-ipad border border-x-0 inline-block px-4 py-1.5 text-neutral-500 font-medium text-xs leading-tight transition duration-150 ease-in-out"><svg style="pointer-events:none;" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5h3m-6.75 2.25h10.5a2.25 2.25 0 002.25-2.25v-15a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 4.5v15a2.25 2.25 0 002.25 2.25z" />
            </svg>
            </button>
            <button title="Width: 768" type="button" class="js-mobile border rounded-r inline-block px-4 py-1.5 text-neutral-500 font-medium text-xs leading-tight transition duration-150 ease-in-out"><svg style="pointer-events:none;" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
            </svg>
            </button>
          </div>
        </div>
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

setHead();
addHtml();
setInitTemplate();
setEvents();

// parent.frames[0].addEventListener('load', (event) => {
//   initEditor();
// }); 

parent.frames[0].addEventListener('unload', (event) => {
  const pathname = parent.frames[0].location.pathname;
  if (pathname !== 'blank') {
    setEditorSetting('current-page', pathname);
  }
});