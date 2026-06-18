let n = module.exports = {};
let t = module;
cc.Class({
    extends: cc.Component,
    properties: {
        iconImageArray: {
            default: [],
            type: cc.SpriteFrame
        },
        currentMiniGameList: [],
        nextIndex: 0,
        moreGameList: [],
        settimeout: null,
        childIndex: -1
    },
    start: function() {
        this.initData(), this.initYouLike()
    },
    initData: function() {
        this.miniGameList = ["wxd5a257d6ee2b8f91", "wx515f44394eab5985", "wxf49b0a26d9405058", "wxea245f85c9673414", "wx08beeb18dc512c2f", "wxc4e628aa7caa2c07", "wxd9589cd7117d0873", "wx0af703a36035c60c", "wx6616ae605010e605"];
        var e = cc.sys.localStorage.getItem("localMiniGameList_test15");
        if (e) {
            var t = JSON.parse(e);
            this.currentMiniGameList = t
        } else this.currentMiniGameList = [0, 1, 2, 3];
        var n = cc.sys.localStorage.getItem("localNextIndex_test15");
        this.nextIndex = n ? parseInt(n) : 4
    },
    initYouLike: function() {
        for (var e = this, t = 0; t < this.node.childrenCount; t++) {
            var n = this.node.children[t];
            n.getComponent(cc.Sprite).spriteFrame = this.iconImageArray[this.currentMiniGameList[t]], n.hasEventListener("touchstart") || n.on("touchstart", function() {
                e.childIndex = this.getSiblingIndex(), e.settimeout && clearTimeout(e.settimeout), e.settimeout = setTimeout(e.setTimeoutFun.bind(e), 2e3)
            }, n)
        }
    },
    setTimeoutFun: function() {
        this.currentIndex = this.nextIndex % this.miniGameList.length;
        for (var e = 0; e < this.currentMiniGameList.length; e++) this.currentMiniGameList.indexOf(this.currentIndex) >= 0 && (this.nextIndex++, this.currentIndex = this.nextIndex % this.miniGameList.length);
        this.currentMiniGameList[this.childIndex] = this.currentIndex, this.initYouLike(), cc.sys.localStorage.setItem("localMiniGameList_test15", JSON.stringify(this.currentMiniGameList)), cc.sys.localStorage.setItem("localNextIndex_test15", this.nextIndex.toString())
    }
})