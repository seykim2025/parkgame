let n = module.exports = {};
let t = module;
require('define'), require('AdsManagerJS'), require('GameDataManagerJS');
cc.Class({
    extends: cc.Component,
    name: "RankJS",
    properties: {
        rankingScrollView: cc.Sprite,
        mainNode: cc.Node
    },
    onLoad: function() {
        var e = cc.find("Canvas").getComponent(cc.Canvas);
        if (cc.winSize.width / cc.winSize.height <= (750 / 1334).designScreen ? (e.fitHeight = !1, e.fitWidth = !0) : (e.fitHeight = !0, e.fitWidth = !1), e.alignWithScreen(), cc.sys.isNative && cc.sys.platform == cc.sys.IPHONE) {
            var t = cc.view.getFrameSize();
            if (2436 == t.width && 1125 == t.height || 1125 == t.width && 2436 == t.height) {
                var n = this.node.getComponent(cc.Canvas);
                n.fitHeight = !0, n.fitWidth = !0
            }
        }
    },
    start: function() {},
    friendButtonFunc: function(e) {
        0
    },
    update: function(e) {
        this._updateSubDomainCanvas()
    },
    _updateSubDomainCanvas: function() {
        if (this.tex && void 0 != window.sharedCanvas && wx.getOpenDataContext) {
            var e = wx.getOpenDataContext().canvas;
            this.tex.initWithElement(e), this.tex.handleLoadedTexture(), this.rankingScrollView.spriteFrame = new cc.SpriteFrame(this.tex)
        }
    }
})