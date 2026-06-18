let n = module.exports = {};
let t = module;
//电子邮件puhalskijsemen@gmail.com
//源码网站 开vpn全局模式打开 http://web3incubators.com/
//电报https://t.me/gamecode999
console.assert(true), t.exports = {
    init: function(e, t) {
        this.fileSystemManager = wx.getFileSystemManager(), this.rootPath = "" + wx.env.USER_DATA_PATH, this.urlRoot = e, this.gameName = t, console.log(this.gameName)
    },
    getFileName: function(e) {
        for (var t = e.substring(e.indexOf(this.urlRoot), e.length); - 1 != t.indexOf("/");) {
            var n = t.indexOf("/");
            t = t.substring(0, n) + "-" + t.substring(n + 1, t.length)
        }
        return t
    },
    getFile: function(e) {
        var t = this.getFileName(e.url),
            n = this.rootPath + "/" + t,
            i = this;
        this.fileSystemManager.stat({
            path: n,
            success: function(i) {
                i.stats.isDirectory(), i.stats.isFile() && (console.log("这是文件： " + t), e.success(n))
            },
            fail: function(o) {
                console.log(t + "文件不存在，下载"), console.log(e.url + "?" + i.gameName), wx.downloadFile({
                    url: e.url + "?" + i.gameName,
                    success: function(t) {
                        console.log("下载成功"), wx.saveFile({
                            tempFilePath: t.tempFilePath,
                            filePath: n,
                            success: function(t) {
                                console.log("保存到本地"), e.success(n)
                            },
                            fail: function(t) {
                                console.log(t), e.fail()
                            }
                        })
                    },
                    fail: function(t) {
                        console.log(t), e.fail()
                    }
                })
            }
        })
    },
    removeFile: function(e) {
        var t = this.getFileName(e.url),
            n = this.rootPath + "/" + t,
            i = this;
        this.fileSystemManager.stat({
            path: n,
            success: function(t) {
                i.fileSystemManager.unlink({
                    filePath: n,
                    success: function() {
                        e.success()
                    },
                    fail: function(e) {
                        console.log(e)
                    }
                })
            },
            fail: function(t) {
                console.log("本地不存在"), e.success()
            }
        })
    },
    showFile: function() {
        this.fileSystemManager.readdir({
            dirPath: "" + wx.env.USER_DATA_PATH,
            success: function(e) {
                console.log(e)
            },
            fail: function() {}
        })
    }
}