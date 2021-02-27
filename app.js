/*
 * @Author: xxf
 * @Date: 2021-02-27 14:18:07
 * @LastEditTime: 2021-02-27 14:51:35
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \undefinedd:\Work\cocosProject\photo_compress\app.js
 */
let fileMonitor = require('./monitor')
let compress = require('./compress')

let init = function () {
    console.log("photo server start")
    fileMonitor.init(compress.compress, "C:\Server\static\upload")
    compress.init(fileMonitor.done, "C:\Server\static\upload", "C:\Server\static\uploadTemp")
}

init()

