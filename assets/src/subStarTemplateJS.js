let n = module.exports = {};
let t = module;
console.assert(true), cc.Class({
    extends: cc.Component,
    properties: {
        stageId: 0,
        startNum: 0,
        stageBtn: cc.Button,
        stageIdLab: cc.Label,
        stars: [cc.Sprite]
    },
    start: function() {},
    init: function(e) {
        var t = e.stageId + 1,
            n = this,
            i = e.startNum;
        if (e.startNum >= 0) {
            this.stageIdLab.string = t < 10 ? "0" + t : t;
            var o = "star";
            cc.loader.loadRes(o, cc.SpriteFrame, function(e, t) {
                if (e) cc.log("注意err:" + e.length + "errors");
                else
                    for (var o = 0; o < i; o++) n.stars[o].spriteFrame = t
            }), o = e.startNum > 0 ? "btn_stagePlayed" : "btn_stagePlaying", cc.loader.loadRes(o, cc.SpriteFrame, function(e, t) {
                e ? cc.log("Completed with" + e.length + "errors") : (n.stageBtn.normalSprite = t, n.stageBtn.pressedSprite = t, n.stageBtn.hoverSprite = t)
            })
        } else {
            o = "btn_stageLock";
            cc.loader.loadRes(o, cc.SpriteFrame, function(e, t) {
                e ? cc.log("Completed with" + e.length + "errors") : (n.stageBtn.normalSprite = t, n.stageBtn.pressedSprite = t, n.stageBtn.hoverSprite = t)
            });
            for (var a = 0; a < 3; ++a) this.stars[a].enabled = !1
        }
    }
})