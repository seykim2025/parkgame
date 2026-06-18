let n = module.exports = {};
let t = module;
var i = require('define'),
    o = (require('AdsManagerJS'), require('ShareManagerJS')),
    a = require('GameDataManagerJS');
cc.Class({
    extends: cc.Component,
    properties: {
        background: cc.Sprite,
        title_bg: cc.Sprite,
        gold_btn: cc.Button,
        audio_btn: cc.Button,
        share_btn: cc.Button,
        moregame_btn: cc.Button,
        begin_btn: cc.Button,
        rank_btn: cc.Button,
        skin_btn: cc.Button,
        rankNode: cc.Node,
        skinNode: cc.Node,
        gold_lab: cc.Label,
        gameBox: cc.Node
    },
    onLoad: function() {
        var e = this,
            t = cc.find("Canvas").getComponent(cc.Canvas);
        cc.winSize.width / cc.winSize.height <= (750 / 1334) ? (t.fitHeight = !1, t.fitWidth = !0) : (t.fitHeight = !0, t.fitWidth = !1), 
        var n = cc.view.getDesignResolutionSize(),
            o = cc.director.getWinSize(),
            c = (o.width, n.width, o.height, n.height, cc.view.getVisibleSize()),
            s = c.width / c.height,
            r = s - 750 / 1334;
        if (console.log("  k= " + 750 / 1334 + " kWH= " + s), r > 0);
        else {
            var l = this.begin_btn.node.getPosition();
            l.y -= 400 * -r, this.begin_btn.node.setPosition(l), console.log("begin_btn - " + 400 * -r)
        }
        if (cc.sys.platform == cc.sys.IPHONE) {
            var g = cc.view.getFrameSize();
            if (2436 == g.width && 1125 == g.height || 1125 == g.width && 2436 == g.height) {
                var d = this.node.getComponent(cc.Canvas);
                d.fitHeight = !0, d.fitWidth = !0
            }
        }
        this.audioControl = cc.find("AudioControlNode").getComponent("AudioSourceControl"), this.mute = cc.find("AudioControlNode/AudioRes/audio").getComponent(cc.AudioSource);
        var u = a.getInstance().getcarskin();
        i.carskin = u;
        var h = a.getInstance().getgold();
        i.money = h, this.gold_lab.string = i.money, this.node.on("updatemoney", function() {
            e.updatemoney()
        })
    },
    updatemoney: function() {
        this.gold_lab.string = i.money
    },
    start: function() {
        if(this.gameBox) this.gameBox.active = false; if(this.moregame_btn) this.moregame_btn.node.active = false; this.rankNode.active = !1, this.skinNode.active = !1, this.playAudio();
        var e = a.getInstance().getGameCompleteStars();
        this.submitScoreButtonFunc(e)
    },
    submitScoreButtonFunc: function(e) {
        console.log(" main  提交 : " + e + " key= " + i.RankKey), console.log("不支持 提交得分 : " + e)
    },
    update: function(e) {},
    gold_btnClick: function() {
        this.playClick(), i.money += 50, a.getInstance().savegold(i.money), this.node.emit("updatemoney")
    },
    gold_btnCallback: function() {
        i.money += 50, a.getInstance().savegold(i.money), this.node.emit("updatemoney")
    },
    audio_btnClick: function() {
        if (this.playClick(), 1 == i.music) {
            i.music = !1, this.mute.volume = 0;
            var e = this,
                t = "mute";
            cc.loader.loadRes(t, cc.SpriteFrame, function(t, n) {
                e.audio_btn.normalSprite = n, e.audio_btn.pressedSprite = n, e.audio_btn.hoverSprite = n
            })
        } else {
            i.music = !0, this.mute.volume = 1;
            e = this, t = "music";
            cc.loader.loadRes(t, cc.SpriteFrame, function(t, n) {
                t ? cc.log("Completed with " + t.length + " errors") : (e.audio_btn.normalSprite = n, e.audio_btn.pressedSprite = n, e.audio_btn.hoverSprite = n)
            })
        }
    },
    other_btnClick: function() {
        this.playClick()
    },
    moregame_btnClick: function() {
        this.playClick()
    },
    begin_btnClick: function() {
        this.playClick(), cc.director.loadScene("ChooseStageScene")
    },
    share_btnClick: function() {
        this.playClick(), this.main = cc.find("Canvas/main");
        a.getInstance().getTextById(17);
        o.getInstance().onShareGame("sharePic")
    },
    rank_btnClick: function() {
        this.playClick(), this.main = cc.find("Canvas/main"), this.main.active = !1, this.rank = cc.find("Canvas/rankNode"), this.rank.active = !0
    },
    skin_btnClick: function() {
        this.main = cc.find("Canvas/main"), this.main.active = !1, this.skin = cc.find("Canvas/skinNode"), this.skin.active = !0, this.playClick()
    },
    back_btnClick: function() {
        cc.director.loadScene("main"), this.playClick()
    },
    playClick: function() {
        this.audioControl && this.audioControl.playClick()
    },
    playAudio: function() {
        this.audioControl && this.audioControl.playAudio()
    }
})