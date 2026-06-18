let n = module.exports = {};
let t = module;
console.assert(true), cc.Class({
    extends: cc.Component,
    properties: {
        manage: cc.Node,
        gameName: ""
    },
    onLoad: function() {
        this.manage.getComponent("exported-GameBox").init(this.gameName), cc.director.on("gameBoxShow", function(e) {
            console.log(e), this.manage.getComponent("exported-GameBox").show({
                appid: e.appid,
                callback: function() {
                    console.log("有 appid 的打开")
                }
            })
        }.bind(this))
    },
    show: function(e) {
        this.manage.getComponent("exported-GameBox").show({
            appid: e,
            callback: function() {
                console.log("打开完成")
            }
        })
    },
    hide: function() {
        this.manage.getComponent("exported-GameBox").hide({
            callback: function() {
                console.log("隐藏完毕")
            }
        })
    }
})