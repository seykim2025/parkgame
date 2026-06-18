let n = module.exports = {};
let t = module;
var i = require('GameDataManagerJS'),
    o = require('define'),
    a = 0,
    c = !1,
    s = !1;
cc.Class({
    extends: cc.Component,
    properties: {
        wxlog_btn: cc.Node,
        loadingBar: {
            type: cc.ProgressBar,
            default: null
        },
        loadinglab: cc.Sprite,
        loadingpercent: cc.Label,
        titlebg: cc.Sprite,
        audioControl: {
            default: null
        }
    },
    onLoad: function() {
        var e = cc.find("Canvas").getComponent(cc.Canvas);
        if (cc.winSize.width / cc.winSize.height <= (750 / 1334).designScreen ? (e.fitHeight = !1, e.fitWidth = !0) : (e.fitHeight = !0, e.fitWidth = !1), e.alignWithScreen(), console.log("授权成功！"), s = !0, this.wxlog_btn.active = !1, this.loadingBar.node.active = !0, this.loadinglab.node.active = !0, this.loadingpercent.node.active = !0, i.getInstance().preLoadingdata(), o.getgold() || (i.getInstance().savegold(o.money), cc.log("首次加载游戏获取到当前金币(应为100)", i.getInstance().getgold())), o.getcarskin() || (cc.log("第一次保存皮肤"), i.getInstance().savecarskin(o.carskin)), cc.sys.isNative && cc.sys.platform == cc.sys.IPHONE) {
            console.log("***iPhoneX**");
            var t = cc.view.getFrameSize();
            if (2436 == t.width && 1125 == t.height || 1125 == t.width && 2436 == t.height) {
                var n = this.node.getComponent(cc.Canvas);
                n.fitHeight = !0, n.fitWidth = !0
            }
        }
    },
    getInfo: function() {
        return new Promise(function(e, t) {
            e()
        })
    },
    start: function() {
        cc.director.preloadScene("main", cc.log("预加载main")), console.log("    cc.winSize =" + cc.winSize), console.log("    cc.view.getVisibleSize() =" + cc.view.getVisibleSize()), console.log("    cc.view.getFrameSize() =" + cc.view.getFrameSize()), console.log("    cc.view.getDesignResolutionSize() =" + cc.view.getDesignResolutionSize());
        var e = cc.view.getDesignResolutionSize(),
            t = cc.winSize,
            n = t.width / e.width,
            i = t.height / e.height;
        console.log("    nodeX=   " + n + "  nodeY=" + i)
    },
    update: function(e) {
        this.updateload(e)
    },
    updateload: function(e) {
        s && (this.loadingBar.progress >= 1 && 0 == c && (c = !0, this.onLoadComplete()), a += e, this.loadingBar.progress = a / 3 > 1 ? 1 : a / 3, this.loadingpercent.string = Math.floor(100 * this.loadingBar.progress) + "%")
    },
    onLoadComplete: function() {
        cc.director.loadScene("main")
    }
})