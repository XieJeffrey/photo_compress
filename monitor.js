let fs = require('fs')
let md5 = require('md5')
let path = require('path');

let notifyFunc = null
let fileMap = {} //完成压缩的文件列表
let monitorPath = "" //监听目录
let cfgPath = "" //配置目录
let initFileNum = 0 //第一次运行时需要压缩的图片数量

let init = function (func, target) {
    notifyFunc = func
    monitorPath = target
    cfgPath = path.join(__dirname, 'imgCfg.json')
    readCfg()
}

let readCfg = function () {
    fs.exists(cfgPath, function (exists) {
        if (!exists) {
            fileMap = {}
            let fooStr = JSON.stringify((fileMap))
            fs.writeFile(cfgPath, fooStr, function (err) {
                if (err) {
                    console.error(err)
                    return
                }
                console.log("--初始化本地配置--")
                firstRead()
            })
        } else {
            //读取json文件
            fs.readFile(cfgPath, 'utf-8', function (err, data) {
                if (err) {
                    console.log("---配置文件读取失败---")
                } else {
                    console.log(data)
                    fileMap = JSON.parse(data)
                    start()
                }
            })
        }
    })
}

let firstRead = function () {
    console.log("开始进行第一次压缩")
    fs.readdir(monitorPath, function (err, paths) {
        if (err) {
            console.log("fsRead:" + err)
            return
        }

        for (let i = 0; i < paths.length; i++) {
            let ext = path.extname(paths[i])
            if (ext == ".jpg") {
                if (!fileMap[paths[i]]) {
                    console.log('压缩文件：' + paths[i])
                    if (notifyFunc)
                        notifyFunc(paths[i])
                }
            }
        }
        start()
    })
}

let start = function () {
    console.log("正在监听：" + monitorPath)
    fs.watch(monitorPath, (event, filename) => {
        if (filename) {
            let fooUrl = path.join(monitorPath, filename)
            if (fs.existsSync(fooUrl)) {
                if (!fileMap[filename]) {
                    if (notifyFunc)
                        notifyFunc(filename)

                    console.log('$发现新文件：' + filename)
                }
            }

        }
    })
}

let done = function (filename) {
    if (cacheMap[filename]) {
        cacheMap[filename] = null
    }

    fileMap[filename] = true
    let fooStr = JSON.stringify(fileMap)
    fs.writeFile(cfgPath, fooStr, function (err) {
        if (err) {
            console.log("保存配置表出错:" + err)
            return
        }
    })

    console.log("剩余数量：" + initFileNum)
    if (initFileNum != 0) {
        initFileNum--
        if (initFileNum == 0)
            start()
    }
}

module.exports = {
    init: init,
    done: done,
}