/*
 * @Author: your name
 * @Date: 2021-02-27 14:18:07
 * @LastEditTime: 2021-03-03 19:37:20
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \undefinedd:\Work\cocosProject\photo_compress\compress.js
 */
const tinify = require('tinify')
const fs = require('fs')
const path = require('path')
const imagemin = require('imagemin')
const images = require("images")


let completeFunc = null //完成压缩的钩子
let targetPath = "" //转换对象
let savePath = "" //文件保存路径
let quality = 100 //压缩图片质量
tinify.key = "BmzNGWfKFvHCT2nDhXSfFBDswWsXhMDR" //tiny压缩key

let init = function (func, target, tmpPath, imgQuality) {
    completeFunc = func
    targetPath = target // path.join(__dirname,target)
    savePath = tmpPath // path.join(__dirname, tmpPath)
    quality = imgQuality

    if (!fs.existsSync(savePath)) {
        fs.mkdir(savePath, function (err) {
            if (err) {
                console.log("创建缓冲文件夹出错：" + err)
                return
            }
            console.log('创建缓冲文件夹:' + savePath)
        })
    }
}

let compress = function (path) {
    let src = targetPath + "/" + path
    let des = savePath + "/" + path

    _compress(src, des)
}


let _compress = function (path, toPath) {
    try {
        images(path).save(path, {
            quality: quality
        })
        console.log("--压缩完成--:" + path)
        console.log("*")
        // completeFunc(path)
    } catch (err) {
        console.error(err)
        // completeFunc(path)
    }
}

module.exports = {
    init: init,
    compress: compress,
}