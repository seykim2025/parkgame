let n = module.exports = {};
let t = module;
var i = require('polyglot.min'),
    o = null;

function a(e) {
    return window.i18n.languages[e]
}

function c(e) {
    e && (o ? o.replace(e) : o = new i({
        phrases: e,
        allowMissing: !0
    }))
}
window.i18n || (window.i18n = {
    languages: {},
    curLang: ""
}), t.exports = {
    init: function(e) {
        if (e !== window.i18n.curLang) {
            var t = a(e) || {};
            window.i18n.curLang = e, c(t), this.inst = o
        }
    },
    t: function(e, t) {
        if (o) return o.t(e, t)
    },
    inst: o,
    updateSceneRenderers: function() {
        for (var e = cc.director.getScene().children, t = [], n = 0; n < e.length; ++n) {
            var i = e[n].getComponentsInChildren("LocalizedLabel");
            Array.prototype.push.apply(t, i)
        }
        for (var o = 0; o < t.length; ++o) {
            var a = t[o];
            a.node.active && a.updateLabel()
        }
        for (var c = [], s = 0; s < e.length; ++s) {
            var r = e[s].getComponentsInChildren("LocalizedSprite");
            Array.prototype.push.apply(c, r)
        }
        for (var l = 0; l < c.length; ++l) {
            var g = c[l];
            g.node.active && g.updateSprite(window.i18n.curLang)
        }
    }
}