let n = module.exports = {};
let t = module;
console.assert(true), cc.Class({
    extends: cc.Component,
    properties: {
        image: cc.Node,
        all: cc.Node
    },
    init: function(e) {
        this.manager = e, this.all.active = !1
    },
    change: function() {
        switch (this.callback = null, this.manager.state) {
            case "open":
                this.image.scaleX = -1, this.all.active = !0;
                break;
            case "close":
                this.image.scaleX = 1, this.all.active = !1
        }
    },
    event: function() {
        var e = this;
        switch (this.manager.state) {
            case "open":
                this.manager.hide({
                    callback: function() {
                        e.change()
                    }
                });
                break;
            case "close":
                this.manager.show({
                    callback: function() {
                        e.change()
                    }
                })
        }
    }
})