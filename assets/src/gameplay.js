let n = module.exports = {};
let t = module;
var i = require('define'),
    o = require('BlockJS'),
    a = require('GameDataManagerJS'),
    c = require('MyLayoutManagerJS'),
    s = (require('ShareManagerJS'), require('AdsManagerJS'), cc.Class({
        properties: {
            position: 0,
            move: 0,
            prev: 0,
            index: 0
        },
        statics: {
            count: 0
        },
        ctor: function(e, t, n) {
            this.position = e, this.move = t, this.prev = n, this.index = s.count++
        }
    }));
cc.Class({
    extends: cc.Component,
    properties: {
        m_Gridiron: [0],
        m_pPanda: cc.Node,
        m_pBlocks: [cc.Node],
        m_History: [0],
        m_GridironSize: 0,
        m_GameScaleY: 1,
        m_GridSize: cc.Size,
        curDate: 0,
        m_MinSteps: 1,
        m_Package: 0,
        m_stage: 0,
        m_HintBlockDestCoordinate: 0,
        m_CurrentHintIndex: -1,
        m_lastHints: 0,
        m_HintMode: !1,
        m_SolutionMoves: [0],
        m_pHintBlock: {
            default: null,
            type: cc.Block
        },
        bg_sprite: cc.Sprite,
        menu_btn: cc.Button,
        back_menu_btn: cc.Button,
        stage_btn: cc.Button,
        main_btn: cc.Button,
        sub_gameTitle: cc.Sprite,
        stageIdLab: cc.Label,
        stageTitleLab: cc.Label,
        gold_btn: cc.Button,
        time: cc.node,
        timeLab: cc.Label,
        gamepass: cc.Node,
        gameCenter: cc.Node,
        gameBtnNode: cc.Node,
        m_pHint: cc.Button,
        m_pVideoHint: cc.Button,
        m_pRetry: cc.Button,
        m_pGuideHintDest: cc.Sprite,
        m_pGuideHintPointer: cc.Sprite,
        audio: {
            type: cc.AudioSource,
            default: null
        },
        audioClick: {
            type: cc.AudioSource,
            default: null
        },
        audioMove: {
            type: cc.AudioSource,
            default: null
        },
        audioComplete: {
            type: cc.AudioSource,
            default: null
        },
        audioControl: {
            default: null
        },
        m_kOffsetScale: 1,
        m_DraggedMinX: 0,
        m_DraggedMaxX: 0,
        m_DraggedMinY: 0,
        m_DraggedMaxY: 0,
        gold_lab: cc.Label
    },
    onLoad: function() {
        var e = this;
        this.curDate = new Date, this.audioControl = cc.find("AudioControlNode").getComponent("AudioSourceControl"), this.init(), this.node.on("updatemoney", function() {
            e.updatemoney()
        })
    },
    init: function() {
        for (var e = 0; e < 8; ++e) this.m_Gridiron[e] = 0;
        this.gold_lab.string = i.money, this.m_Package = a.getInstance().getLatestPackage(), this.m_stage = a.getInstance().getGameCurLevelNum(), this.stageIdLab.string = a.getInstance().getTextById(12) + (this.m_stage + 1), this.m_GridironSize = c.getInstance().getGridironSize();
        var t = c.getInstance().getVisibleRect(),
            n = (t.origin, t.size, t.size.width, t.size.height, t.size.height / t.size.width),
            o = (t.size.height, n / (1334 / 750)),
            s = this.gameCenter.width - 2 * c.getInstance().getHorizontalGridironPadding(),
            r = s;
        if (console.log("=====kOffsetHW", o), o < .75) {
            var l = 1.3;
            this.m_kOffsetScale = o * l, s *= this.m_kOffsetScale, r *= this.m_kOffsetScale, this.gameCenter.setScale(this.m_kOffsetScale)
        } else if (o < .9) {
            l = 1.1;
            this.m_kOffsetScale = o * l, s *= this.m_kOffsetScale, r *= this.m_kOffsetScale, this.gameCenter.setScale(this.m_kOffsetScale)
        } else if (o < .95) {
            l = 1.04;
            this.m_kOffsetScale = o * l, s *= this.m_kOffsetScale, r *= this.m_kOffsetScale, this.gameCenter.setScale(this.m_kOffsetScale)
        }
        this.m_GridironSize.width = this.m_GridironSize.height = i.GRIDIRON_WIDTH, this.m_GridSize.width = s / this.m_GridironSize.width, this.m_GridSize.height = r / this.m_GridironSize.height, c.getInstance().setGridSize(this.m_GridSize);
        var g = t.origin.x + .5 * t.size.width + this.gameCenter.getPosition().x - .5 * s,
            d = t.origin.y + .5 * t.size.height + this.gameCenter.getPosition().y - .5 * r - 10;
        this.m_GameRect = new cc.Rect(g, d, s, r);
        var u = a.getInstance().getStageData(this.m_Package, this.m_stage);
        this.m_MinSteps = u.minmove;
        for (e = 0; e < u.m_BlockData.length; e++) {
            var h = u.m_BlockData[e].coordinate,
                m = u.m_BlockData[e].state;
            this.addBlock((240 & h) >> 4, 15 & h, 32 & m ? i.kOrientation_Horizontal : i.kOrientation_Vertical, 15 & m, 0 != (16 & m))
        }
        if (cc.sys.isNative && cc.sys.platform == cc.sys.IPHONE) {
            var p = cc.view.getFrameSize();
            if (2436 == p.width && 1125 == p.height || 1125 == p.width && 2436 == p.height) {
                var f = this.node.getComponent(cc.Canvas);
                f.fitHeight = !0, f.fitWidth = !0
            }
        }
    },
    addBlock: function(e, t, n, o, a) {
        var c = 0;
        n == i.kOrientation_Horizontal ? t = this.m_GridironSize.height - 1 - t : n == i.kOrientation_Vertical && (t = this.m_GridironSize.height - o - t), c <= 0 && (c = this.m_pBlocks.length + 1);
        var s = new cc.Node("Sprite");
        s.addComponent(cc.Sprite), cc.find("Canvas/gameplay/gameCenterNode").addChild(s);
        var r = s.addComponent("BlockJS"),
            l = {
                orientation: 0,
                length: 0,
                panda: !0
            };
        l.orientation = n, l.length = o, l.panda = a, s.getComponent("BlockJS").init(l), s.getComponent("BlockJS").setId(c);
        var g = new cc.Vec2(e, t);
        return !this.isOccupiedBlock(r, g) && (this.m_pBlocks.push(s), s.getComponent("BlockJS").setOnBlockListener(this), s.getComponent("BlockJS").setPosition(this.getPosition(g)), s.getComponent("BlockJS").setGPosition(g), this.updateGridiron(), a && (this.m_pPanda = s.getComponent("BlockJS")), !0)
    },
    isOccupiedPos: function(e, t) {
        return !(e >= 0 && t >= 0 && e < this.m_GridironSize.width && t < this.m_GridironSize.height) || 0 != (this.m_Gridiron[t] & 1 << e)
    },
    isOccupiedGpos: function(e) {
        return this.isOccupiedPos(e.x, e.y)
    },
    isOccupiedBlock: function(e, t) {
        var n = e.getOrientation();
        if (n == i.kOrientation_Horizontal) {
            for (var o = new cc.Vec2(t.x, t.y), a = 0; a < e.getLength(); a++, o.x++)
                if (this.isOccupiedGpos(o)) return !0
        } else if (n == i.kOrientation_Vertical)
            for (o = new cc.Vec2(t.x, t.y), a = 0; a < e.getLength(); a++, o.y++)
                if (this.isOccupiedGpos(o)) return !0;
        return !1
    },
    updateGridiron: function() {
        for (var e = 0; e < this.m_Gridiron.length; e++) this.m_Gridiron[e] = 0;
        for (e = 0; e < this.m_pBlocks.length; e++) {
            var t = this.m_pBlocks[e].getComponent("BlockJS"),
                n = t.getOrientation(),
                o = t.getGPosition();
            if (o.x >= 0 && o.y >= 0)
                if (n == i.kOrientation_Horizontal)
                    for (var a = 0; a < t.getLength(); a++) this.m_Gridiron[parseInt(o.y)] |= 1 << parseInt(o.x + a);
                else if (n == i.kOrientation_Vertical)
                for (a = 0; a < t.getLength(); a++) this.m_Gridiron[parseInt(o.y + a)] |= 1 << parseInt(o.x)
        }
        if (i.DEBUG_MODE && i.DEBUG_SHOW_MAP) {
            console.log("*************begin to print*************\n");
            var c = new Array;
            for (e = this.m_GridironSize.height - 1; e >= 0; e--) {
                for (a = 0; a < this.m_GridironSize.width; a++) c[a] = this.m_Gridiron[e] & 1 << a ? "x" : ".";
                c[parseInt(this.m_GridironSize.width)] = 0;
                var s = new Array;
                for (a = 0; a < this.m_GridironSize.width; a++) s += c[a];
                console.log(e + " " + s)
            }
            console.log("*************end print*************\n")
        }
    },
    getPosition: function(e) {
        return new cc.Vec2(this.m_GameRect.origin.x + e.x * this.m_GridSize.width, this.m_GameRect.origin.y + e.y * this.m_GridSize.height)
    },
    getGPosition: function(e) {
        var t = (e.x - this.m_GameRect.origin.x) / this.m_GridSize.width;
        t = parseInt(t + (t > 0 ? .5 : -.5)), t = Math.min(Math.max(0, t), this.m_GridironSize.width - 1);
        var n = (e.y - this.m_GameRect.origin.y) / this.m_GridSize.height;
        return n = parseInt(n + (n > 0 ? .5 : -.5)), n = Math.min(Math.max(0, n), this.m_GridironSize.height - 1), new cc.Vec2(t, n)
    },
    onDragged: function(e, t) {
        if (this.m_pHintBlock && this.m_pHintBlock != e) return !1;
        var n = e.getGPosition(),
            o = e.getOrientation();
        if (o == i.kOrientation_Horizontal) {
            for (var a = n.x, c = n.x; !this.isOccupiedPos(a - 1, n.y);) a--;
            for (; !this.isOccupiedPos(c + e.getLength(), n.y);) c++;
            this.m_DraggedMinX = this.m_GameRect.origin.x + a * this.m_GridSize.width, this.m_DraggedMaxX = this.m_GameRect.origin.x + c * this.m_GridSize.width, this.m_DraggedMinY = this.m_DraggedMaxY = e.getAbsolutePosition().y
        } else if (o == i.kOrientation_Vertical) {
            for (var s = n.y, r = n.y; !this.isOccupiedPos(n.x, s - 1);) s--;
            for (; !this.isOccupiedPos(n.x, r + e.getLength());) r++;
            this.m_DraggedMinX = this.m_DraggedMaxX = e.getAbsolutePosition().x, this.m_DraggedMinY = this.m_GameRect.origin.y + s * this.m_GridSize.height, this.m_DraggedMaxY = this.m_GameRect.origin.y + r * this.m_GridSize.height
        }
        var l = new cc.Vec2(-1, -1);
        if (e.setGPosition(l), this.updateGridiron(), i.DEBUG_MODE && i.DEBUG_SHOW_POS) {
            var g = t.getTouches()[0].getLocation();
            console.log("  car " + e.getId() + " start=" + g.x + "," + g.y), console.log(" game onDragged =")
        }
        return !0
    },
    onMove: function(e, t) {
        var n = t.getTouches(),
            a = n[0],
            c = n[0].getLocation(),
            s = new cc.Vec2,
            r = new cc.Vec2;
        if (r.x = e.getTouchBeganPosition().x + a.getLocation().x - a.getStartLocation().x, r.y = e.getTouchBeganPosition().y + a.getLocation().y - a.getStartLocation().y, s = new cc.Vec2(Math.min(Math.max(this.m_DraggedMinX, r.x), this.m_DraggedMaxX), Math.min(Math.max(this.m_DraggedMinY, r.y), this.m_DraggedMaxY)), e.setPosition(s), i.DEBUG_MODE && i.DEBUG_SHOW_POS && (console.log(" game onMove ="), console.log("  car " + e.getId() + " move=" + c.x + "," + c.y)), c.x > e.getAbsolutePosition().x && c.x < e.getAbsolutePosition().x + 1.3 * e.getContentSize().width && c.y > e.getAbsolutePosition().y && c.y < e.getAbsolutePosition().y + 1.3 * e.getContentSize().height);
        else {
            if (console.log("  超出矩形范围  " + c.x + " ，" + c.y), o.s_CurrentTouchedBlock != e) return;
            e.m_State == i.kBlockState_Grabbed && (e.m_State = i.kBlockState_Ungrabbed, e.m_OnBlockListener && this.onDrop(e, t)), o.s_CurrentTouchedBlock = null
        }
    },
    onDrop: function(e, t) {
        this.setBlockPosition(e, e.getAbsolutePosition());
        var n = new cc.Vec2;
        if (n.x = e.getGPosition().x - e.getTouchBeganGPosition().x, n.y = e.getGPosition().y - e.getTouchBeganGPosition().y, n.x || n.y) {
            var o = e.getId() << 24 | (e.getOrientation() == i.kOrientation_Horizontal ? parseInt(n.x + 10) : parseInt(n.y + 10)) << 16 | this.m_CurrentHintIndex + 1;
            this.m_History.unshift(o);
            this.m_History.length;
            if (i.DEBUG_MODE && (console.log(" getId=  " + e.getId() + " x= " + n.x + " y= " + n.y + " m_CurrentHintIndex=" + this.m_CurrentHintIndex), console.log(" temp=  " + o)), this.m_pHintBlock && this.m_pHintBlock == e)(this.m_pHintBlock.getOrientation() == i.kOrientation_Horizontal ? this.m_pHintBlock.getGPosition().x : this.m_pHintBlock.getGPosition().y) == this.m_HintBlockDestCoordinate ? this.showHint(this.m_CurrentHintIndex + 1) : this.updateHint()
        }
        if (this.playMove(), this.m_pPanda && e == this.m_pPanda && this.checkComplete() && (this.playComplete(), this.onGameComplete()), i.DEBUG_MODE && i.DEBUG_SHOW_POS) {
            console.log(" game onDrop =");
            var a = t.getTouches()[0].getLocation();
            console.log("  car " + e.getId() + " end=" + a.x + "," + a.y)
        }
    },
    setBlockPosition: function(e, t) {
        i.DEBUG_MODE && i.DEBUG_SHOW_POS && console.log("  setBlockPosition= " + parseInt(t.x) + "," + parseInt(t.y));
        var n = this.getGPosition(t);
        this.isOccupiedBlock(e, n) ? e.setPosition(this.getPosition(e.getLastGPosition())) : (e.setPosition(this.getPosition(n)), e.setGPosition(n), this.updateGridiron())
    },
    checkComplete: function() {
        return !(!this.m_pPanda || this.m_pPanda.getGPosition().x + this.m_pPanda.getLength() != this.m_GridironSize.width)
    },
    onGameComplete: function() {
        this.m_HintMode && (this.m_pGuideHintPointer.node.stopActionByTag(i.kMoveActionTag), this.m_pGuideHintDest.node.stopAllActions(), this.m_pGuideHintDest.node.active = !1, this.m_pGuideHintPointer.node.active = !1, this.m_HintMode = !1), i.money += 5, a.getInstance().savegold(i.money), this.node.emit("updatemoney");
        var e = a.getInstance().getGameState(this.m_Package, this.m_stage),
            t = this.m_History.length;
        if (i.GameMode_Relax == i.GameMode_Relax) {
            var n = t <= this.m_MinSteps + 3 ? 3 : t <= this.m_MinSteps + 10 ? 2 : 1,
                o = e;
            i.DEBUG_MODE && console.log("winStarNum = " + n), n > o && a.getInstance().saveGameState(this.m_Package, this.m_stage, n)
        }
        this.showCompleteView(n), a.getInstance().addGoals(), i.DEBUG_MODE && console.log("play counts = " + i.goals)
    },
    showCompleteView: function(e) {
        this.playComplete(), cc.find("Canvas/DialogGamePass").getComponent("DialogGamePassJS").showDialog(e), console.log("popGamePassDialog ")
    },
    start: function() {
        1 == a.getInstance().getIsFistPlay() && (cc.log("第一次玩"), 0 == a.getInstance().getGamePlaySceneReload() ? (a.getInstance().setGamePlaySceneReload(!0), cc.director.loadScene("game")) : this.scheduleOnce(function() {
            this.startFindSolution()
        }, .5))
    },
    startFindSolution: function() {
        var e = new Array,
            t = new Set;
        this.m_SolutionMoves = new Array;
        for (var n = this.m_GridironSize.width, o = this.m_GridironSize.height, a = 0, c = 0, r = this.m_pBlocks.length, l = 0, g = 1, d = !1, u = 0; u < r; u++, g *= n) {
            l += ((S = this.m_pBlocks[u].getComponent("BlockJS")).getOrientation() == i.kOrientation_Horizontal ? parseInt(S.getGPosition().x) : parseInt(S.getGPosition().y)) * g
        }
        var h = new s(l, 0, null);
        e.push(h), t.add(l);
        for (var m = new Array; a < e.length;) {
            for (var p = (P = e[a++]).move > 0 ? P.move / 1e3 : -1, f = 0; f < n * o; f++) m[f] = 0;
            g = 1;
            for (u = 0; u < r; u++, g *= n) {
                var S = this.m_pBlocks[u].getComponent("BlockJS"),
                    _ = parseInt(P.position % (g * n) / g);
                if (S.getOrientation() == i.kOrientation_Horizontal)
                    for (var v = S.getGPosition().y * n, k = _; k <= _ + S.getLength() - 1; k++) m[v + k] = S.getId();
                else
                    for (k = _; k <= _ + S.getLength() - 1; k++) m[parseInt(S.getGPosition().x + k * n)] = S.getId()
            }
            g = 1;
            for (u = 0; u < r; u++, g *= n) {
                var C, I;
                if ((S = this.m_pBlocks[u].getComponent("BlockJS")).getId() != p)
                    if (S.getOrientation() == i.kOrientation_Horizontal ? (C = parseInt(P.position % (g * n) / g), I = parseInt(S.getGPosition().y)) : (C = parseInt(S.getGPosition().x), I = parseInt(P.position % (g * n) / g)), S.getOrientation() == i.kOrientation_Horizontal) {
                        v = I * n + C;
                        for (var b = 0, y = 1; C + y + S.getLength() - 1 < n && 0 == m[v + y + S.getLength() - 1]; y++) {
                            S.getLength(), m[v + y + S.getLength() - 1];
                            var w = P.position + g * y;
                            if (0 == t.has(w)) {
                                var x = new s(w, this.encodeMove(S.getId(), i.kDirection_Right, C + y), P);
                                e.push(x), t.add(w), b = y
                            }
                        }
                        if (this.m_pPanda && S == this.m_pPanda && C + b + S.getLength() == n) {
                            c = e.length - 1, d = !0;
                            break
                        }
                        for (y = -1; C + y >= 0 && 0 == m[v + y]; y--) {
                            w = P.position + g * y;
                            if (0 == t.has(w)) {
                                x = new s(w, this.encodeMove(S.getId(), i.kDirection_Left, C + y), P);
                                e.push(x), t.add(w)
                            }
                        }
                    } else {
                        for (v = I * n + C, y = 1; I + y + S.getLength() - 1 < o && 0 == m[v + (y + S.getLength() - 1) * n]; y++) {
                            w = P.position + g * y;
                            if (0 == t.has(w)) {
                                x = new s(w, this.encodeMove(S.getId(), i.kDirection_Up, I + y), P);
                                e.push(x), t.add(w)
                            }
                        }
                        for (y = -1; I + y >= 0 && 0 == m[v + y * n]; y--) {
                            w = P.position + g * y;
                            if (0 == t.has(w)) {
                                x = new s(w, this.encodeMove(S.getId(), i.kDirection_Down, I + y), P);
                                e.push(x), t.add(w)
                            }
                        }
                    }
            }
            if (1 == d) break
        }
        var G = new Array;
        if (c >= 0) {
            for (var P = e[c]; P;) 0 != P.move && (G.push(P.move), this.m_SolutionMoves.unshift(P.move)), P = P.prev;
            G.length;
            for (f = 0; f < this.m_SolutionMoves.length; ++f);
            this.m_SolutionMoves.length > 0 && this.scheduleOnce(function() {
                this.startShowHints()
            }, 0)
        }
    },
    encodeMove: function(e, t, n) {
        return 1e3 * e + 100 * t + n
    },
    updatemoney: function() {
        this.gold_lab.string = i.money
    },
    startShowHints: function(e) {
        this.showHint(0)
    },
    showHint: function(e) {
        if (e < 0) return this.m_HintMode = !1, this.m_pGuideHintDest && (this.m_pGuideHintDest.node.active = !1, this.m_pGuideHintPointer = null), this.m_pGuideHintPointer && (this.m_pGuideHintPointer.node.active = !1, this.m_pGuideHintPointer = null), this.m_SolutionMoves.clear(), this.m_HintBlockDestCoordinate = 0, void(this.m_CurrentHintIndex = e);
        if (this.m_HintMode = !0, e < parseInt(this.m_SolutionMoves.length))
            for (var t = this.m_SolutionMoves[e], n = parseInt(t / 1e3), o = parseInt(t % 100), a = 0; a < this.m_pBlocks.length; a++) {
                var s = this.m_pBlocks[a].getComponent("BlockJS");
                if (s.getId() == n) {
                    if (this.m_pHintBlock = s, this.m_HintBlockDestCoordinate = o, this.m_CurrentHintIndex = e, this.m_pGuideHintPointer.node.active = !0, this.m_pGuideHintDest.node.active = !0, null == this.m_pGuideHintPointer.spriteFrame) {
                        var r = new cc.blink(1, 1);
                        r.setTag(i.kBlinkActionTag), this.m_pGuideHintDest.node.runAction(new cc.repeatForever(r)), this.m_pGuideHintPointer.node.setScale(1, c.getInstance().getVisibleRect().size.height / i.designSize.height);
                        var l = this;
                        cc.loader.loadRes("playGamePic/hint_pointer", cc.SpriteFrame, function(e, t) {
                            l.m_pGuideHintPointer.spriteFrame = t
                        })
                    }
                    this.updateHint();
                    break
                }
            }
    },
    getHintDestFrameName: function(e, t) {
        return e == i.kOrientation_Horizontal ? 2 == t ? "bk_hint_dest2h" : "bk_hint_dest3h" : 2 == t ? "bk_hint_dest2v" : "bk_hint_dest3v"
    },
    updateHint: function() {
        var e = parseInt(this.m_pHintBlock.getOrientation() == i.kOrientation_Horizontal ? this.m_HintBlockDestCoordinate - this.m_pHintBlock.getGPosition().x : this.m_HintBlockDestCoordinate - this.m_pHintBlock.getGPosition().y),
            t = this.m_pHintBlock.getGPosition(),
            n = 0;
        this.m_pHintBlock.getOrientation() == i.kOrientation_Horizontal ? (t.x += e, n = e > 0 ? 0 : 180) : (t.y += e, n = e > 0 ? 270 : 90);
        var o = cc.view.getVisibleSize();
        this.m_pGuideHintDest.node.stopActionByTag(i.kBlinkActionTag);
        var a = cc.hide();
        this.m_pGuideHintDest.node.runAction(a);
        var s = this.getPosition(t),
            r = new cc.Vec2(this.m_pHintBlock.getContentSize().width * this.m_pHintBlock.getScaleX() / 2, this.m_pHintBlock.getContentSize().height * this.m_pHintBlock.getScaleY() / 2),
            l = "playGamePic/" + this.getHintDestFrameName(this.m_pHintBlock.getOrientation(), this.m_pHintBlock.getLength()),
            g = this;
        cc.loader.loadRes(l, cc.SpriteFrame, function(e, t) {
            g.m_pGuideHintDest.spriteFrame = t
        });
        var d = new cc.Vec2(c.getInstance().getGridSize().width / 95, c.getInstance().getGridSize().height / 95);
        this.m_pGuideHintDest.node.setScale(d), this.m_pGuideHintDest.node.setPosition(new cc.Vec2(s.x + r.x - .5 * o.width, s.y + r.y - .5 * o.height));
        var u = cc.show();
        this.m_pGuideHintDest.node.runAction(u);
        var h = new cc.blink(1, 1);
        h.setTag(i.kBlinkActionTag), this.m_pGuideHintDest.node.runAction(new cc.repeatForever(h));
        var m = new cc.Vec2(this.m_pHintBlock.getAbsolutePosition().x + r.x - .5 * o.width, this.m_pHintBlock.getAbsolutePosition().y + r.y - .5 * o.height);
        this.m_pGuideHintPointer.node.runAction(u.clone()), this.m_pGuideHintPointer.node.setPosition(m), this.m_pGuideHintPointer.node.setRotation(n), this.m_pGuideHintPointer.node.stopActionByTag(i.kMoveActionTag), this.m_pGuideHintPointer.node.opacity = 255;
        var p = new cc.moveTo(.7, this.m_pGuideHintDest.node.getPosition()),
            f = new cc.fadeOut(.5),
            S = new cc.fadeIn(0),
            _ = new cc.moveTo(0, this.m_pGuideHintPointer.node.getPosition()),
            v = new cc.repeatForever(cc.sequence(p, f, S, _));
        v.setTag(i.kMoveActionTag), this.m_pGuideHintPointer.node.runAction(v)
    },
    getHintCallback: function() {
        this.playClick(), o.getCurrentTouchedBlock() || this.m_HintMode || !a.getInstance().getgold() > 0 || (this.scheduleOnce(function() {
            this.startFindSolution()
        }, 0), i.money -= 50, a.getInstance().savegold(i.money), this.node.emit("updatemoney"))
    },
    gold_btnClick: function() {
        this.playClick(), i.money += 50, a.getInstance().savegold(i.money), this.node.emit("updatemoney")
    },
    gold_btnCallback: function() {
        i.money += 50, a.getInstance().savegold(i.money), this.node.emit("updatemoney")
    },
    videohint_btnClick: function() {
        this.playClick(), this.scheduleOnce(function() {
            this.startFindSolution()
        }, 0)
    },
    videohint_btnCallback: function() {
        this.scheduleOnce(function() {
            this.startFindSolution()
        }, 0)
    },
    add_touch_listeners: function() {
        var e = cc.find("Canvas");
        e.on(cc.Node.EventType.TOUCH_START, function(e) {
            var t = e.getTouches()[0].getLocation();
            console.log("  touch  start=" + t.x + "," + t.y)
        }, this.node), e.on(cc.Node.EventType.TOUCH_MOVE, function(e) {
            var t = e.getTouches()[0].getLocation();
            console.log("  touch  move=" + t.x + "," + t.y)
        }, this.node), e.on(cc.Node.EventType.TOUCH_END, function(e) {
            var t = e.getTouches()[0].getLocation();
            console.log("  touch  end=" + t.x + "," + t.y)
        }, this.node)
    },
    update: function(e) {
        var t = parseInt(this.getPassTime()),
            n = 0,
            i = 0;
        t < 60 ? (t = t > 9 ? t : "0" + t, this.timeLab.getComponent(cc.Label).string = "00:" + t) : t >= 60 & t < 3600 ? (n = parseInt(t / 60), t = (t = parseInt(t % 60)) > 9 ? t : "0" + t, n = n > 9 ? n : "0" + n, this.timeLab.getComponent(cc.Label).string = n + ":" + t) : t >= 3600 && (i = parseInt(t / 3600), n = parseInt(t % 3600 / 60), t = (t = parseInt(t % 3600 % 60)) > 9 ? t : "0" + t, n = n > 9 ? n : "0" + n, i = i > 9 ? i : "0" + i, this.timeLab.getComponent(cc.Label).string = i + ":" + n + ":" + t)
    },
    getNowTime: function() {
        var e = new Date;
        return cc.log(e), e.getTime()
    },
    getPassTime: function() {
        return (new Date - this.curDate) / 1e3
    },
    menu_btnClick: function() {
        this.playClick(), this.menu_btn.node.active = !1, this.back_menu_btn.node.active = !0, this.main_btn.node.active = !0, this.stage_btn.node.active = !0, this.sub_gameTitle.node.active = !1
    },
    back_menu_btnClick: function() {
        this.playClick(), this.menu_btn.node.active = !0, this.sub_gameTitle.node.active = !0, this.back_menu_btn.node.active = !1, this.main_btn.node.active = !1, this.stage_btn.node.active = !1
    },
    stage_btnClick: function() {
        this.playClick(), cc.director.loadScene("ChooseStageScene")
    },
    main_btnClick: function() {
        this.playClick(), cc.director.loadScene("main")
    },
    retryCallback: function() {
        this.playClick(), cc.director.loadScene("game")
    },
    playClick: function() {
        this.audioControl && this.audioControl.playClick()
    },
    playMove: function() {
        this.audioControl && this.audioControl.playMove()
    },
    playComplete: function() {
        this.audioControl && this.audioControl.playComplete()
    }
})