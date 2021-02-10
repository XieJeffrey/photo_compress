let fileMonitor=require('./monitor')
let compress=require('./compress')

let init=function (){
    console.log("photo server start")
    fileMonitor.init(compress.compress,"/test_floder")
    compress.init(fileMonitor.done,"/test_floder","temp")
}

init()

