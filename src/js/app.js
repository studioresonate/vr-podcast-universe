window.document.body.insertAdjacentHTML('afterbegin', `
<div id="loading"><span>Loading</span></div>
`)

window.addEventListener('load', () => {
  const loadTime = window.performance.timing.loadEventStart - window.performance.timing.navigationStart;
  console.log(`⚡ Huzzah! Page loaded in ${loadTime}ms`);
  setTimeout(() => {
    document.querySelector('#loading').classList.add('loaded')
  }, 800);
})


const text = `
╔═╗╔╦╗╦ ╦╔╦╗╦╔═╗  ╦═╗╔═╗╔═╗╔═╗╔╗╔╔═╗╔╦╗╔═╗
╚═╗ ║ ║ ║ ║║║║ ║  ╠╦╝║╣ ╚═╗║ ║║║║╠═╣ ║ ║╣
╚═╝ ╩ ╚═╝═╩╝╩╚═╝  ╩╚═╚═╝╚═╝╚═╝╝╚╝╩ ╩ ╩ ╚═╝
https://studioresonate.com

`
  ;
const style = "color: #23d1ba";
console.log(`%c${text}`, style);
