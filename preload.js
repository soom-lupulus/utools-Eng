// 开发者可以暴露自定义 API 供后加载脚本使用

// preload.js 中使用 nodejs
const { readFileSync } = require('fs')
const path = require("path")

window.readConfig = function () {
    const url = path.resolve(__dirname, "spider", "data", "data.json")
    console.log(url);
    const data = readFileSync(url)
    return JSON.parse(data.toString())
}

window.utools = utools


// index.html 后加载的内容可以使用 window.readConfig() 方法，但不能使用 Node.js 特性
