let n = module.exports = {};
let t = module;
console.assert(true), cc.Class({
    extends: cc.Component,
    properties: {
        idxList: {
            set: function(e) {
                this.setIdxList(e)
            },
            get: function() {
                return this.getIdxList()
            }
        }
    },
    onLoad: function() {
        this.icons = this.node.children[0].children, this.len = Math.min(G.WECHAT.appIdList.length, G.WECHAT.moreGameIconList.length)
    },
    start: function() {},
    onClick: function(e) {
        var t = this,
            n = e.target,
            i = this.idxList,
            o = n.getSiblingIndex(),
            a = i[o],
            c = G.WECHAT.appIdList[a % this.len];
        G.WECHAT.navigateToMiniProgram(c);
        var s = n.getComponent(cc.Button);
        s.interactable = !1;
        var r = this.getNextIdx(a),
            l = G.WECHAT.moreGameIconList[r % this.len];
        i[o] = r, cc.log("idxList:", i, " lastIdx:", a, " nextIdx:", r), this.idxList = i, this.scheduleOnce(function() {
            t.icons[o].getComponent(cc.Sprite).spriteFrame = l, s.interactable = !0
        }, 2)
    },
    getNextIdx: function(e) {
        for (; this.idxList.indexOf(e) > -1;) e++, e %= this.len;
        return e
    },
    setIdxList: function(e) {
        this._idxList = e, cc.sys.localStorage.setItem("idxList", JSON.stringify(e))
    },
    getIdxList: function() {
        if (this._idxList instanceof Array) return this._idxList;
        var e = JSON.parse(cc.sys.localStorage.getItem("idxList"));
        if (e) this._idxList = e;
        else {
            this._idxList = [];
            for (var t = 0, n = this.icons.length; t < n; t++) this._idxList.push(t)
        }
        return this._idxList
    }
})