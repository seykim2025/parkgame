let n = module.exports = {};
let t = module;
console.assert(true), cc.Class({
    extends: cc.Component,
    properties: {
        id: 0,
        imageViewBtn: cc.Button,
        CompletionLabel: cc.Label
    },
    start: function() {},
    init: function(e) {
        var t;
        this.id = e.id, this.CompletionLabel.string = e.CompletionLabel;
        var n = this;
        t = e.imageViewPath, cc.loader.loadRes(t, cc.SpriteFrame, function(e, t) {
            e ? cc.log("Completed with " + e.length + " errors") : (console.log(" 加载完成！" + t._name + "  "), n.imageViewBtn.normalSprite = t, n.imageViewBtn.pressedSprite = t, n.imageViewBtn.hoverSprite = t)
        })
    }
})