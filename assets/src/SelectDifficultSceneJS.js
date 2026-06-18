let n = module.exports = {};
let t = module;
var i = require('GameDataManagerJS');
cc.Class({
    extends: cc.Component,
    properties: {
        pageNum: 0,
        stageDataArr: [],
        curPos: cc.Vec2,
        choosestage: cc.Node,
        count: {
            default: [],
            type: [cc.Node]
        },
        select: {
            default: [],
            type: [cc.Node]
        }
    },
    onLoad: function() {
        var e = cc.find("Canvas").getComponent(cc.Canvas);
        cc.winSize.width / cc.winSize.height <= (750 / 1334).designScreen ? (e.fitHeight = !1, e.fitWidth = !0) : (e.fitHeight = !0, e.fitWidth = !1), e.alignWithScreen(), this.audioControl = cc.find("AudioControlNode").getComponent("AudioSourceControl"), this.content = cc.find("Canvas/DifficultPageView/view/content"), console.log("找到了", this.content), this.initStageData();
        for (var t = 0; t < 4; t++) {
            var n = new cc.Component.EventHandler;
            if (n.target = this.node, n.component = "SelectDifficultSceneJS", n.handler = "enterGameStageCallback", n.customEventData = t, this.select[t].getComponent(cc.Button).clickEvents.push(n), cc.sys.isNative && cc.sys.platform == cc.sys.IPHONE) {
                var i = cc.view.getFrameSize();
                if (2436 == i.width && 1125 == i.height || 1125 == i.width && 2436 == i.height) {
                    var o = this.node.getComponent(cc.Canvas);
                    o.fitHeight = !0, o.fitWidth = !0
                }
            }
        }
    },
    initStageData: function() {
        for (var e = i.getInstance().getPackageCount(), t = 0; t < e; t++) {
            var n = i.getInstance().getMaxUnlockedStage(t),
                o = i.getInstance().getStageCount(t),
                a = {
                    passCount: 0,
                    stageCount: 0
                };
            a.passCount = n, a.stageCount = o, this.stageDataArr[t] = a, this.count[t].getComponent(cc.Label).string = a.passCount + "/" + a.stageCount
        }
    },
    addSubPage: function() {
        this.contextPageView.addPage(this._createPage())
    },
    _createPage: function() {
        var e = cc.instantiate(this.pageTeample);
        e.position = new cc.v2(0, 0);
        var t = this.pageNum,
            n = {
                imageViewPath: "",
                CompletionLabel: "",
                id: 0
            };
        n.imageViewPath = i.getInstance().getResName(["package_easy", "package_medium", "package_hard", "package_expert"][t]), n.CompletionLabel = this.stageDataArr[t].passCount + "/" + this.stageDataArr[t].stageCount;
        var o = new cc.Component.EventHandler;
        return o.target = this.node, o.component = "SelectDifficultSceneJS", o.handler = "enterGameStageCallback", o.customEventData = this.pageNum, e.getComponentInChildren(cc.Button).clickEvents.push(o), e.getComponent("subDifficultTemplateJS").init(n), ++this.pageNum, e
    },
    start: function() {},
    enterGameStageCallback: function(e, t) {
        i.getInstance().saveLatestPackage(t), cc.find("Canvas/choosestage/stageScrollView/view/content").removeAllChildren(), this.playClick();
        e.target.getComponent(cc.Button);
        this.playClick(), this.choosestage.active = !0, cc.find("Canvas/choosestage").getComponent("ChooseStageJS").init()
    },
    savePageviewPos: function() {
        i.getInstance().saveSelectLevelPos(this.curPos.x)
    },
    back_btnClick: function() {
        this.playClick(), this.savePageviewPos(), cc.director.loadScene("main")
    },
    playClick: function() {
        this.audioControl && this.audioControl.playClick()
    }
})