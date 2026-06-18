let n = module.exports = {};
let t = module;
console.assert(true), cc.Class({
    extends: cc.Component,
    properties: {
        iconImageArray: {
            default: [],
            type: cc.SpriteFrame
        },
        gameBox: cc.Node
    },
    onLoad: function() {
        this.initIconArray()
    },
    initIconArray: function() {
        var e = this;
        this.iconArray = [], ["wxd5a257d6ee2b8f91", "wx515f44394eab5985", "wxf49b0a26d9405058", "wxea245f85c9673414", "wx08beeb18dc512c2f", "wxc4e628aa7caa2c07", "wxd9589cd7117d0873", "wx0af703a36035c60c", "wx6616ae605010e605"].forEach(function(t, n) {
            var i = {
                appid: t,
                spriteFrame: e.iconImageArray[n]
            };
            e.iconArray.push(i)
        })
    },
    start: function() {
        this.startID = 0, this.target = this.node.getComponent("cc.Sprite");
        var e = cc.spawn(cc.scaleTo(1.5, 1.1), cc.rotateTo(1.5, -30)),
            t = cc.spawn(cc.scaleTo(1.5, .9), cc.rotateTo(1.5, 30)),
            n = cc.sequence(e, t, cc.callFunc(function() {
                this.iconArray.length > 0 && (this.startID++, this.startID = this.startID % this.iconArray.length, this.target.spriteFrame = this.iconArray[this.startID].spriteFrame)
            }, this));
        this.node.runAction(cc.repeatForever(n))
    },
    btn: function() {
        if (this.iconArray.length > 0) {
            var e = this.iconArray[this.startID].appid;
            console.log("zdk" + e), this.gameBox && this.gameBox.getComponent("exported-GameBoxInterface").show(e)
        }
    }
})