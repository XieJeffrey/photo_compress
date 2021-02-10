const tinify=require('tinify')
const  fs=require('fs')
const path = require('path')

let completeFunc=null//完成压缩的钩子
let targetPath=""//转换对象
let savePath=""//文件保存路径
tinify.key="BmzNGWfKFvHCT2nDhXSfFBDswWsXhMDR"//tiny压缩key

let init=function(func,target,tmpPath){
    completeFunc=func
    targetPath=path.join(__dirname,target)
    savePath=path.join(__dirname,tmpPath)

    if(!fs.existsSync(savePath)){
        fs.mkdir(savePath,function (err){
            if(err) {
                console.log("创建缓冲文件夹出错：" + err)
                return
            }
            console.log('创建缓冲文件夹:'+savePath)
        })
    }
}

let compress=function (path){
    let src=targetPath+"/"+path
    let des=savePath+"/"+path

    setTimeout(function (){_compress(src,des)},1000)
}

let _compress=function (path,toPath){
    let source= tinify.fromFile(path)
    source.toFile(toPath,function (err){
        if(err){
            console.error(err)
            return
        }
        console.log('--文件压缩成功,准备复制--:'+path)
        fs.copyFile(toPath,path,function (err){
            if(err) {
                console.log("copyFile:" + err)
                return
            }
            completeFunc(path)
            console.log("--复制完成--:"+path)
            fs.unlinkSync(toPath)
        })
    })
}

module.exports={
    init:init,
    compress:compress,
}