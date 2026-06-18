let n = module.exports = {};
let t = module;
var i = require('GameDataManagerJS'),
    o = (require('define'), require('ShareManagerJS'));
require('AdsManagerJS');
cc.Class({
    extends: cc.Component,
    properties: {
        m_dialog: cc.Node,
        m_dialog_bg: cc.Sprite,
        m_light_star: [cc.Sprite],
        m_next_btn: cc.Button,
        m_retry_btn: cc.Button,
        audioControl: {
            default: null
        }
    },
    onLoad: function() {
        var e = cc.find("Canvas").getComponent(cc.Canvas);
        cc.winSize.width / cc.winSize.height <= (750 / 1334) ? (e.fitHeight = !1, e.fitWidth = !0) : (e.fitHeight = !0, e.fitWidth = !1), this.audioControl = cc.find("AudioControlNode").getComponent("AudioSourceControl")
    },
    start: function() {},
    submitScoreButtonFunc: function(e) {
        cc.log("fail 提交得分 : " + e)
    },
    showDialog: function(e) {
        this.m_dialog.active = !0;
        for (var t = 0; t < e; t++) this.m_light_star[t].node.opacity = 255
    },
    clickNextBtn: function() {
        var e = i.getInstance().getGameCurLevelNum() + 1,
            t = i.getInstance().getLatestPackage();
        this.playClick(), e < i.getInstance().getStageCount(t) ? (i.getInstance().setGameCurLevelNum(e), cc.director.loadScene("game")) : cc.director.loadScene("ChooseStageScene")
    },
    clickRetryBtn: function() {
        this.playClick(), cc.director.loadScene("game")
    },
    clickShareBtn: function() {
        this.playClick(), o.getInstance().onShareGame("sharePic")
    },
    playClick: function() {
        this.audioControl && this.audioControl.playClick()
    }
})