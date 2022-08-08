// 开发者可以暴露自定义 API 供后加载脚本使用

// preload.js 中使用 nodejs
const { readFileSync } = require('fs')

window.readConfig = function () {
  const data = readFileSync('./config.json')
  return data
}

window.utools = utools


// index.html 后加载的内容可以使用 window.readConfig() 方法，但不能使用 Node.js 特性
console.log(window.readConfig()) // 正常执行
console.log(readFileSync('./config.json')) // 报错
