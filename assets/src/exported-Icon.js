let n = module.exports = {};
let t = module;
console.assert(true), cc.Class({
    extends: cc.Component,
    properties: {
        gameName: cc.Label,
        gameSprite: cc.Sprite
    },
    init: function(e) {
        this.appid = e.appid, this.gameName.string = e.name, this.gameSprite.spriteFrame = e.spriteFrame, this.qrcode = e.qrcode, this.btnCallback = e.btnCallback
    },
    setSpriteFrame: function(e) {
        this.gameSprite.spriteFrame = e
    },
    btn: function() {
        this.btnCallback && this.btnCallback({
            name: this.gameName.string,
            appid: this.appid,
            qrcode: this.qrcode
        })
    }
})