window.addEventListener('load', () => {
  setTimeout(() => {
    document.querySelector('#loading').classList.add('loaded')
  }, 800);
})

// const scene = document.querySelector('a-scene');
// scene.addEventListener('loaded', () => {
//   setTimeout(() => {
//     document.querySelector('#loading').classList.add('loaded')
//   }, 800);
// });

const text = `
╔═╗╔╦╗╦ ╦╔╦╗╦╔═╗  ╦═╗╔═╗╔═╗╔═╗╔╗╔╔═╗╔╦╗╔═╗
╚═╗ ║ ║ ║ ║║║║ ║  ╠╦╝║╣ ╚═╗║ ║║║║╠═╣ ║ ║╣
╚═╝ ╩ ╚═╝═╩╝╩╚═╝  ╩╚═╚═╝╚═╝╚═╝╝╚╝╩ ╩ ╩ ╚═╝
https://studioresonate.com

`
  ;
const style = "color: #23d1ba";
console.log(`%c${text}`, style);

window.onload = function () {
  const loadTime = window.performance.timing.loadEventStart - window.performance.timing.navigationStart;
  console.log(`⚡ Huzzah! Page loaded in ${loadTime}ms`);
}