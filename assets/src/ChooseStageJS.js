let n = module.exports = {};
let t = module;
var i = require('GameDataManagerJS'),
    o = require('define');
cc.Class({
    extends: cc.Component,
    properties: {
        m_MaxUnlockedStageIdx: 0,
        m_StageCount: 0,
        m_PageCount: 0,
        m_Package: 0,
        m_PageStageCount: o.MaxCustomsPass,
        subStagePrefab: {
            default: null,
            type: cc.Prefab
        },
        subPackgePrefab: {
            default: null,
            type: cc.Prefab
        },
        contextScrollView: {
            default: null,
            type: cc.ScrollView
        },
        audioControl: {
            default: null
        }
    },
    onLoad: function() {
        var e = cc.find("Canvas").getComponent(cc.Canvas);
        cc.winSize.width / cc.winSize.height <= (750 / 1334).designScreen ? (e.fitHeight = !1, e.fitWidth = !0) : (e.fitHeight = !0, e.fitWidth = !1), e.alignWithScreen(), this.init(), this.audioControl = cc.find("AudioControlNode").getComponent("AudioSourceControl")
    },
    init: function() {
        this.m_Package = i.getInstance().getLatestPackage(), this.m_MaxUnlockedStageIdx = i.getInstance().getMaxUnlockedStage(this.m_Package), this.m_StageCount = i.getInstance().getStageCount(this.m_Package), this.m_PageCount = this.m_StageCount / this.m_PageStageCount, this.addStageBtn()
    },
    start: function() {},
    addStageBtn: function() {
        for (var e = {
                stageId: 0,
                startNum: 0
            }, t = 0; t < this.m_StageCount; ++t) {
            e.stageId = t, e.startNum = i.getInstance().getCompleteStars(this.m_Package, t), this.m_MaxUnlockedStageIdx == t && (e.startNum = 0);
            var n = cc.instantiate(this.subStagePrefab);
            this.contextScrollView.content.addChild(n), n.getComponent("subStarTemplateJS").init(e);
            var o = new cc.Component.EventHandler;
            o.target = this.node, o.component = "ChooseStageJS", o.handler = "enterGameSceneCallback", o.customEventData = e.stageId, n.getComponent(cc.Button).clickEvents.push(o)
        }
        this.contextScrollView.scrollToPercentVertical(1, .1)
    },
    enterGameSceneCallback: function(e, t) {
        this.playClick();
        e.target.getComponent(cc.Button);
        var n = t;
        n <= this.m_MaxUnlockedStageIdx ? (console.log(" enterGameSceneCallback  unlcok =", n), this.playClick(), i.getInstance().setGameCurLevelNum(n), cc.director.loadScene("game")) : console.log(" enterGameSceneCallback lock =", n)
    },
    saveScrollPos: function() {
        var e = this.contextScrollView.getContentPosition();
        i.getInstance().setStagePageScollPos(e)
    },
    _createPage: function() {},
    addSubPage: function() {},
    playClick: function() {
        this.audioControl && this.audioControl.playClick()
    }
})