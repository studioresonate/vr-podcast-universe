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