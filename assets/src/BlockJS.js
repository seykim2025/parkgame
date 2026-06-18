let n = module.exports = {};
let t = module;
var i;

function o(e, t, n) {
    return t in e ? Object.defineProperty(e, t, {
        value: n,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = n, e
}
var a = require('define'),
    c = require('MyLayoutManagerJS'),
    s = [
        ["car0_0-", "car0_1-", "car1", "car0_2-", "car0_3-"],
        ["car1_0-", "car1_1-", "car2", "car1_2-", "car1_3-"],
        ["car2_0-", "car2_1-", "car3", "car2_2-", "car2_3-"],
        ["car3_0-", "car3_1-", "car4", "car3_2-", "car3_3-"],
        ["car2_0-", "car2_1-", "car5", "car2_2-", "car2_3-"],
        ["car2_0-", "car2_1-", "car6", "car2_2-", "car2_3-"],
        ["car0_0-", "car0_1-", "car7", "car0_2-", "car0_3-"],
        ["car1_0-", "car1_1-", "car8", "car1_2-", "car1_3-"],
        ["car2_0-", "car2_1-", "car9", "car2_2-", "car2_3-"],
        ["car3_0-", "car3_1-", "car10", "car3_2-", "car3_3-"],
        ["car2_0-", "car2_1-", "car11", "car2_2-", "car2_3-"],
        ["car2_0-", "car2_1-", "car12", "car2_2-", "car2_3-"]
    ],
    r = cc.Class({
        extends: cc.Component,
        properties: (i = {
            m_Tile: 0,
            m_Orientation: 0,
            m_Length: 2,
            m_Id: 0
        }, o(i, "m_Orientation", 0), o(i, "m_TouchBeganPos", cc.Vec2), o(i, "m_TouchBeganGPos", cc.Vec2), o(i, "m_GPosition", cc.Vec2), o(i, "m_LastGPosition", cc.Vec2), o(i, "m_Scale", cc.Vec2), o(i, "m_State", a.kBlockState_Ungrabbed), i),
        statics: {
            s_CurrentTouchedBlock: null,
            getCurrentTouchedBlock: function() {
                return this.s_CurrentTouchedBlock
            },
            clearCurrentTouchedBlock: function() {
                this.s_CurrentTouchedBlock = null
            }
        },
        ctor: function() {
            this.m_GPosition = new cc.Vec2(-1, -1)
        },
        getGPosition: function() {
            return new cc.Vec2(this.m_GPosition)
        },
        getLastGPosition: function() {
            return new cc.Vec2(this.m_LastGPosition)
        },
        getTouchBeganGPosition: function() {
            return new cc.Vec2(this.m_TouchBeganGPos)
        },
        getTouchBeganPosition: function() {
            return new cc.Vec2(this.m_TouchBeganPos)
        },
        getOrientation: function() {
            return this.m_Orientation
        },
        getLength: function() {
            return this.m_Length
        },
        init: function(e) {
            this.m_GPosition = new cc.Vec2(-1, -1), this.initWithOrientationAndLength(e.orientation, e.length, e.panda)
        },
        initWithOrientationAndLength: function(e, t, n) {
            var i;
            if (e == a.kOrientation_Horizontal ? this.m_Tile = 2 == t ? n ? 2 : 0 : 3 == t ? 3 : -1 : this.m_Tile = 2 == t ? n ? -1 : 1 : 3 == t ? 4 : -1, i = 2 == this.m_Tile ? s[a.getcarskin() - 1][this.m_Tile] + "" : s[0][this.m_Tile] + "0", this.m_Tile >= 0) {
                var o = cc.url.raw("resources/" + i),
                    r = this.getComponent(cc.Sprite);
                cc.log("***sp", r);
                var l = this;
                o = i, cc.loader.loadRes(o, cc.SpriteFrame, function(e, t) {
                    l.getComponent(cc.Sprite).spriteFrame = t
                }), this.m_Orientation = e, this.m_Length = t;
                var g = new cc.Vec2(0, 0);
                r.node.setAnchorPoint(g);
                c.getInstance().getGridSize().width;
                return this.m_Scale = new cc.Vec2(c.getInstance().getGridSize().width / 91, c.getInstance().getGridSize().height / 91), r.node.setScale(this.m_Scale), !0
            }
            return !1
        },
        getPosition: function() {
            new cc.Vec2;
            return this.getComponent(cc.Sprite).node.getPosition()
        },
        getAbsolutePosition: function() {
            var e = new cc.Vec2;
            e = this.getComponent(cc.Sprite).node.getPosition();
            var t = cc.view.getVisibleSize(),
                n = cc.view.getVisibleOrigin(),
                i = cc.find("Canvas/gameplay/gameCenterNode"),
                o = new cc.Vec2(i.getPosition()),
                a = new cc.Vec2;
            a.x = o.x + (t.width + n.x) / 2, a.y = o.y + (t.height + n.y) / 2;
            var c = new cc.Vec2;
            return c.x = a.x + e.x, c.y = a.y + e.y, c
        },
        setPosition: function(e) {
            var t = cc.view.getVisibleSize(),
                n = cc.view.getVisibleOrigin(),
                i = new cc.Vec2,
                o = cc.find("Canvas/gameplay/gameCenterNode"),
                c = new cc.Vec2(o.getPosition());
            i.x = c.x + (t.width + n.x) / 2, i.y = c.y + (t.height + n.y) / 2, i.x = e.x - i.x, i.y = e.y - i.y, this.getComponent(cc.Sprite).node.setPosition(i), a.DEBUG_MODE && a.DEBUG_SHOW_POS && console.log("car setPosition= " + e + ",相对Pos=" + i)
        },
        setGPosition: function(e) {
            this.m_LastGPosition = this.m_GPosition, this.m_GPosition = e
        },
        getContentSize: function() {
            return this.getComponent(cc.Sprite).node.getContentSize()
        },
        getScaleY: function() {
            return this.m_Scale.y
        },
        getScaleX: function() {
            return this.m_Scale.x
        },
        setId: function(e) {
            this.m_Id = e
        },
        getId: function() {
            return this.m_Id
        },
        onLoad: function() {
            this.add_touch_listeners()
        },
        start: function() {},
        setOnBlockListener: function(e) {
            this.m_OnBlockListener = e
        },
        add_touch_listeners: function() {
            var e = this.getComponent(cc.Sprite).node;
            e.on(cc.Node.EventType.TOUCH_START, function(e) {
                if (r.s_CurrentTouchedBlock) return !1;
                var t = this.getComponent("BlockJS");
                if (t.m_State != a.kBlockState_Ungrabbed) return !1;
                if (r.s_CurrentTouchedBlock = t, t.m_OnBlockListener) {
                    if (t.m_OnBlockListener.onDragged(t, e) && (t.m_State = a.kBlockState_Grabbed, t.m_TouchBeganPos = t.getAbsolutePosition(), t.m_TouchBeganGPos = t.m_LastGPosition, a.DEBUG_MODE && a.DEBUG_SHOW_POS)) {
                        var n = t.getAbsolutePosition();
                        console.log("  car " + t.getId() + " AbsolutePosition=" + parseInt(n.x) + "," + parseInt(n.y))
                    }
                } else if (t.m_State = a.kBlockState_Grabbed, t.m_TouchBeganPos = t.getAbsolutePosition(), a.DEBUG_MODE && a.DEBUG_SHOW_POS) {
                    n = t.getAbsolutePosition();
                    console.log("  car " + t.getId() + " AbsolutePosition=" + parseInt(n.x) + "," + parseInt(n.y))
                }
            }, this.node), e.on(cc.Node.EventType.TOUCH_MOVE, function(e) {
                var t = this.getComponent("BlockJS");
                r.s_CurrentTouchedBlock == t && t.m_State == a.kBlockState_Grabbed && t.m_OnBlockListener && t.m_OnBlockListener.onMove(t, e)
            }, this.node), e.on(cc.Node.EventType.TOUCH_END, function(e) {
                var t = this.getComponent("BlockJS");
                r.s_CurrentTouchedBlock == t && (t.m_State == a.kBlockState_Grabbed && (t.m_State = a.kBlockState_Ungrabbed, t.m_OnBlockListener && t.m_OnBlockListener.onDrop(t, e)), r.s_CurrentTouchedBlock = null)
            }, this.node), e.on(cc.Node.EventType.TOUCH_CANCEL, function(e) {
                var t = this.getComponent("BlockJS");
                r.s_CurrentTouchedBlock == t && (t.m_State == a.kBlockState_Grabbed && (t.m_State = a.kBlockState_Ungrabbed, t.m_OnBlockListener && t.m_OnBlockListener.onDrop(t, e)), r.s_CurrentTouchedBlock = null)
            }, this.node)
        }
    });
t.exports = r