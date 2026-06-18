let n = module.exports = {};
let t = module;
var i = require('define'),
    o = cc.Class({
        extends: cc.Component,
        properties: {
            m_VisibleRect: cc.Rect,
            m_GridironSize: cc.Size,
            m_GridSize: cc.Size,
            m_AdMobHeight: 0,
            m_GridironHPadding: 0
        },
        start: function() {},
        statics: {
            _instance: null,
            getInstance: function() {
                return null === o._instance && (this._instance = new o), o._instance
            }
        },
        ctor: function() {
            var e = cc.view.getVisibleSize(),
                t = cc.view.getVisibleOrigin();
            cc.log("--------width-------\x3e", e.width), this.m_AdMobHeight = 0, this.m_GridironHPadding = 8, cc.log("---------m_GridironHPadding------\x3e", this.m_GridironHPadding), this.m_VisibleRect = new cc.Rect(t.x, t.y, e.width, e.height), this.m_GridironSize = new cc.Size(i.GRIDIRON_WIDTH, i.GRIDIRON_WIDTH)
        },
        getVisibleRect: function() {
            return this.m_VisibleRect
        },
        getGridironSize: function() {
            return this.m_GridironSize
        },
        getGridSize: function() {
            return this.m_GridSize
        },
        setGridSize: function(e) {
            this.m_GridSize = e
        },
        getAdMobHeight: function() {
            return this.m_AdMobHeight
        },
        getHorizontalGridironPadding: function() {
            return this.m_GridironHPadding
        }
    });
t.exports = o