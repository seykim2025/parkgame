let n = module.exports = {};
let t = module;
console.assert(true), cc.Class({
    extends: cc.Component,
    properties: {
        moreGameSprite: cc.Sprite
    },//电子邮件puhalskijsemen@gmail.com
//源码网站 开vpn全局模式打开 http://web3incubators.com/
//电报https://t.me/gamecode999
    onLoad: function() {
        this.timer = 0, this.count = 0, this.len = G.WECHAT.appIdList.length
    },
    start: function() {
        this.node.runAction(cc.repeatForever(cc.sequence(cc.rotateTo(.9, 15), cc.rotateTo(.9, -15)))), this.moreGameSprite.spriteFrame = G.WECHAT.moreGameIconList[this.count % this.len]
    },
    update: function(e) {
        0 !== this.len && (this.timer += e, this.timer > 3 && (this.timer = 0, this.count++, this.moreGameSprite.spriteFrame = G.WECHAT.moreGameIconList[this.count % this.len]))
    },
    toMore: function() {
        G.AudioManager.play_btn();
        var e = G.WECHAT.appIdList[this.count % this.len];
        G.WECHAT.navigateToMiniProgram(e)
    }
})