
import templateConfig from '../config.json';
import Hero from "./hero";
import Team from "./team";

const templateComponents = {
  Hero: Hero,
  Team: Team,
};

window.templateComponents = templateComponents;
window.templateConfig = templateConfig;

if (parent.frames.initAdmin) {
  parent.frames.initAdmin();
} else {
  // Add klar-pages-app script after Babel has transpiled the JSX code
  const script = document.createElement('script');
  script.src = 'http://localhost:4173/assets/index.b5643cb4.js';
  script.type = 'module';
  script.crossOrigin = true;
  document.querySelector('head').appendChild(script);
}

// // Add klar-pages-app script after Babel has transpiled the JSX code
// const script = document.createElement('script');
// script.src = 'http://localhost:4173/assets/index.b5643cb4.js';
// script.type = 'module';
// script.crossOrigin = true;
// document.querySelector('head').appendChild(script);

// window.initTemplate = function (data) {
 
//   const startpage = data.data.pages[0];
//   const blocks = startpage.blocks;
//   const block1 = blocks[0];
//   const block2 = blocks[1];
//   // const b = {
//   //   _type: "hero1"
//   // }
//   // data.data.pages[0].blocks = [];
//   // data.data.pages[0].blocks.push({
//   //   _type: "hero1"
//   // });
//   // data.data.pages[0].blocks.push(b);
//   // data.data.pages[0].blocks.push(block2); 
//   // data.data.pages[0].blocks.push(block2);
//   // console.log(block2);
// }