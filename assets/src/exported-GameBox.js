let n = module.exports = {};
let t = module;
var i = require('WeChatFileSystemManager'),
    o = "NewGameBox";
cc.Class({
    extends: cc.Component,
    properties: {
        itemBox: cc.Node,
        gamePrefab: cc.Prefab,
        gamePrefabScript: "",
        canvas: cc.Node,
        waiting: cc.Node,
        layer: cc.Node,
        version: cc.Label,
        btn: cc.Node
    },
    init: function(e) {
        this.miniGameList = {}, this.miniGameList.wxd5a257d6ee2b8f91 = !0, this.miniGameList.wx515f44394eab5985 = !0, this.miniGameList.wxf49b0a26d9405058 = !0, this.miniGameList.wxea245f85c9673414 = !0, this.miniGameList.wx08beeb18dc512c2f = !0, this.miniGameList.wxc4e628aa7caa2c07 = !0, this.miniGameList.wxd9589cd7117d0873 = !0, this.miniGameList.wx0af703a36035c60c = !0, this.miniGameList.wx6616ae605010e605 = !0, this.miniGameList.wxac5820bc06a3a893 = !0;
        var t = cc.sys.localStorage.getItem(o);
        null != t && 0 != t.length || cc.sys.localStorage.setItem(o, JSON.stringify({})), this.startP = cc.v2(.5 * -cc.winSize.width - 220, 50), this.endP = cc.v2(.5 * this.canvas.width - .5 * cc.winSize.width, 50), this.canvas.position = this.startP, this.version.string = "V 1.0.1", this.state = "close", this.btn = this.btn.getComponent("exported-Button"), this.btn.init(this), this.initItemBox(), this.initJson(e)
    },
    initItemBox: function() {
        var e = cc.winSize;
        e.width / e.height >= 2.1 && (console.log("x"), this.itemBox.getComponent("cc.Widget").left = 120)
    },
    initJson: function(e) {
        var t = this,
            n = "https://www.7cgames.cn/transfer.php?url=https://www.7cgames.cn/GameRes/7CGamesBoxWX/NewGameBox/7cgamesBoxData.json?" + e;
        cc.loader.load(n, function(e, n) {
            e ? console.log(e) : t.addList(n)
        })
    },
    addList: function(e) {
        this.serverString = e, this.loadString = cc.sys.localStorage.getItem(o), this.newlist = {}, this.initList(), this.UpdateLocal()
    },
    UpdateLocal: function() {
        var e = this;
        console.log("整体更新本地");
        var t = JSON.parse(this.serverString),
            n = JSON.parse(cc.sys.localStorage.getItem(o)),
            i = Object.keys(n);
        console.log("本地个数：", i.length), console.log("服务器个数：", t.data.length), i.forEach(function(t) {
            e.newlist[t] ? (e.newlist[t].logo != n[t].logo && (console.log("删除成功: " + n[t].title + ",logo"), console.log("删除成功: " + n[t].logo)), e.newlist[t].qrcode != n[t].qrcode && (console.log("删除成功: " + n[t].title + ",qrcode"), console.log("删除成功: " + n[t].qrcode))) : (console.log("不存在"), console.log("删除旧的" + n[t].title + "本地文件"), console.log("删除成功: " + n[t].title + "全部文件"))
        }), console.log("整体更新完成"), cc.sys.localStorage.setItem(o, JSON.stringify(this.newlist))
    },
    initList: function() {
        var e = this,
            t = this,
            n = JSON.parse(this.serverString).data,
            i = n.length,
            o = !1;
        for (var a = function(i) {
                var a = n[i];
                if (o && !e.miniGameList[a.appid]) return "continue";
                var c = cc.instantiate(t.gamePrefab);
                c.getComponent(t.gamePrefabScript).init({
                    width: .2 * cc.winSize.width,
                    name: a.title,
                    appid: a.appid,
                    spriteFrame: null,
                    style: a.style,
                    qrcode: a.qrcode,
                    btnCallback: t.btnCallback.bind(t)
                }), c.parent = t.itemBox, "http://192.168.0.108/transfer.php?url=", s = "http://192.168.0.108/transfer.php?url=" + a.logo, r = {
                    url: s + "?ass",
                    type: "png"
                }, console.log(r), cc.loader.load(r, function(e, n) {
                    var i = new cc.SpriteFrame(n);
                    c.getComponent(t.gamePrefabScript).setSpriteFrame(i)
                }), e.newlist[a.appid] = {
                    desc: a.desc,
                    title: a.title,
                    logo: a.logo,
                    qrcode: a.qrcode
                }
            }, c = 0; c < i; c++) {
            var s, r;
            a(c)
        }
    },
    btnCallback: function(e) {
        console.log(e);
        e.appid, e.qrcode
    },
    showQR: function(e) {
        i.getFile({
            url: e.qrcode,
            success: function(e) {
                wx.previewImage({
                    urls: [e],
                    success: function() {
                        console.log("wei xin previewImage success....")
                    }
                })
            },
            fail: function() {
                console.log("加载图片失败")
            }
        })
    },
    show: function(e) {
        var t = this,
            n = cc.callFunc(function() {
                t.state = "move"
            }, this),
            i = cc.moveTo(.3, t.endP),
            o = cc.callFunc(function() {
                t.state = "open", e.callback && e.callback(), e.appid && (t.newlist[e.appid] ? (this.layer.getComponent("exported-Layer").init({
                    appid: e.appid,
                    title: t.newlist[e.appid].title,
                    desc: t.newlist[e.appid].desc,
                    qrcode: t.newlist[e.appid].qrcode,
                    callback: t.btnCallback.bind(t)
                }), this.layer.active = !0) : console.log("不存在"))
            }, this),
            a = cc.sequence(n, i, o);
        "close" == this.state && this.canvas.runAction(a)
    },
    hide: function(e) {
        var t = cc.callFunc(function() {
                this.state = "move"
            }, this),
            n = cc.moveTo(.3, this.startP),
            i = cc.callFunc(function() {
                this.state = "close", e.callback && e.callback()
            }, this),
            o = cc.sequence(t, n, i);
        "open" == this.state && this.canvas.runAction(o)
    },
    readBtn: function() {
        var e = JSON.parse(cc.sys.localStorage.getItem(o));
        if ("null" != e) {
            var t = Object.keys(e);
            console.log(t)
        } else console.log("空")
    },
    clearLocsl: function() {
        cc.sys.localStorage.setItem(o, JSON.stringify({}))
    },
    removeAllFile: function() {
        cc.sys.localStorage.setItem(o, JSON.stringify({}))
    }
})