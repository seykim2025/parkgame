let n = module.exports = {};
let t = module;
var i = ["dataA0", "dataB0", "dataC0", "dataD0"],
    o = ["简单", "中等", "困难", "专家"],
    a = [{
        ch: "中文",
        en: "English"
    }, {
        ch: "载入进度",
        en: "Loading"
    }, {
        ch: "过关",
        en: "GOAL"
    }, {
        ch: "控制",
        en: "CONTROL"
    }, {
        ch: "纵向的汽车",
        en: "VERTICAL CARS"
    }, {
        ch: "横向的汽车",
        en: "HORIZONTAL CARS"
    }, {
        ch: "关卡",
        en: "PUZZLE"
    }, {
        ch: "简单",
        en: "EASY"
    }, {
        ch: "中等",
        en: "MEDIUM"
    }, {
        ch: "困难",
        en: "HARD"
    }, {
        ch: "专家",
        en: "EXPERT"
    }, {
        ch: "求助 遇到困难了 快来帮帮我",
        en: "asking for help"
    }, {
        ch: " 关卡 ",
        en: " LEVEL "
    }, {
        ch: "提示  x",
        en: "HINT  x"
    }, {
        ch: "撤回",
        en: "UNDO"
    }, {
        ch: "重试",
        en: "RETRY"
    }, {
        ch: "暂停",
        en: "PAUSE"
    }, {
        ch: "和好友一起闯关吧",
        en: "play with friends "
    }, {
        ch: "提示",
        en: "HINT"
    }],
    c = require('LevelDataJS'),
    s = require('subBlockStatusDataJS'),
    r = require('define'),
    l = cc.Class({
        properties: {
            m_subPackageDatas: [c]
        }
    }),
    g = cc.Class({
        properties: {
            icon_url: "",
            appid: ""
        }
    }),
    d = cc.Class({
        extends: cc.Component,
        properties: {
            gameName: "unBlock_",
            PACAKGE_COUNT: 4,
            MaxCustomsPass: r.MaxCustomsPass,
            m_curLevelNum: 0,
            curDate: 0,
            gamePlayScene_isReload: !1,
            gameBox_pos: 0,
            debugInfo: "debuginfo",
            m_PackageStageCount: [cc.Integer],
            m_PackageDatas: [l],
            m_gameBoxInfoList: [g]
        },
        ctor: function() {
            for (var e = 0; e < this.getPackageCount(); ++e) this.m_PackageStageCount[e] = 0, this.m_PackageDatas[e] = new l;
            this.curDate = new Date
        },
        statics: {
            _instance: null,
            getInstance: function() {
                return null === d._instance && (this._instance = new d), d._instance
            }
        },
        start: function() {},
        adapt: function(e) {
            var t = cc.view.getVisibleSize().height,
                n = cc.view.getVisibleSize().width;
            t / n > 1.9 ? (e.scale = .8, e.alignWithScreen()) : t / n < 1.4 && (e.scale = 1.05, e.alignWithScreen())
        },
        getPackageCount: function() {
            return this.PACAKGE_COUNT
        },
        getStageCount: function(e) {
            if (e >= 0 && e < this.getPackageCount()) {
                var t = this.m_PackageDatas[e].m_subPackageDatas.length;
                return t <= 0 && this.initPackageData(e), t > this.MaxCustomsPass ? this.MaxCustomsPass : t
            }
            return 0
        },
        getMaxUnlockedStage: function(e) {
            for (var t = 0, n = this.getStageCount(e), i = 0; i < n; i++)
                if (!this.isCompleted(e, i) && ++t == r.Default_Open) return i;
            return n - 0
        },
        addCompletedStageCount: function(e) {
            var t = this.getCompletedStageCount(e);
            if (t < this.getStageCount(e)) {
                t++;
                var n = this.gameName + "package_" + e.toString();
                cc.sys.localStorage.setItem(n, t)
            }
            return t
        },
        getCompletedStageCount: function(e) {
            var t = this.gameName + "package_" + e.toString(),
                n = cc.sys.localStorage.getItem(t);
            return null != n && 0 != n.length || (n = 0), parseInt(n)
        },
        getStageData: function(e, t) {
            if ((e > 10 && (e -= 10), e >= 0 && e < this.getPackageCount()) && (0 == this.m_PackageDatas[e].m_subPackageDatas.length && this.initPackageData(e), t >= 0 && t < this.m_PackageStageCount[e])) return this.m_PackageDatas[e].m_subPackageDatas[t];
            return null
        },
        saveGameState: function(e, t, n) {
            this.isCompleted(e, t) || this.addCompletedStageCount(e);
            var i = this.gameName + "package" + e + "stage" + t;
            cc.sys.localStorage.setItem(i, n)
        },
        getGameState: function(e, t) {
            var n = this.gameName + "package" + e + "stage" + t,
                i = cc.sys.localStorage.getItem(n);
            return null != i && 0 != i.length || (i = -1), parseInt(i)
        },
        addGoals: function() {
            var e = this.getGoals() + 1;
            r.goal = e;
            var t = this.gameName + "goals2";
            cc.sys.localStorage.setItem(t, e)
        },
        getGoals: function() {
            var e = this.gameName + "goals2",
                t = cc.sys.localStorage.getItem(e);
            return null != t && 0 != t.length || (t = 0), parseInt(t)
        },
        savegold: function(e) {
            cc.sys.localStorage.setItem("gold", e), console.log("当前金币", e)
        },
        getgold: function() {
            var e = cc.sys.localStorage.getItem("gold");
            return parseInt(e)
        },
        saveskinlock: function(e, t) {
            var n = "skin" + e;
            cc.sys.localStorage.setItem(n, t)
        },
        getskinlock: function(e) {
            var t = "skin" + e,
                n = cc.sys.localStorage.getItem(t);
            return parseInt(n)
        },
        savecarskin: function(e) {
            cc.sys.localStorage.setItem("carskin", e)
        },
        getcarskin: function() {
            var e = cc.sys.localStorage.getItem("carskin");
            return parseInt(e)
        },
        isCompleted: function(e, t) {
            return e >= 0 && e < this.getPackageCount() && t >= 0 && t < this.m_PackageStageCount[e] && this.getGameState(e, t) > 0
        },
        getCompleteStars: function(e, t) {
            return e >= 0 && e < this.getPackageCount() && t >= 0 && t < this.m_PackageStageCount[e] ? this.getGameState(e, t) : 0
        },
        getPackagesCompleteStars: function(e) {
            for (var t = 0, n = 0, i = 0; i < this.m_PackageStageCount[e]; ++i)(n = this.getCompleteStars(e, i)) > 0 && (t += n);
            return t
        },
        getGameCompleteStars: function() {
            for (var e = this.getPackageCount(), t = 0, n = 0, i = 0; i < e; ++i)(n = this.getPackagesCompleteStars(i)) > 0 && (t += n);
            return t
        },
        saveLatestPackage: function(e) {
            var t = this.gameName + "latestPackage";
            cc.sys.localStorage.setItem(t, e.toString())
        },
        getLatestPackage: function() {
            var e = this.gameName + "latestPackage",
                t = cc.sys.localStorage.getItem(e);
            return null != t && 0 != t.length || (t = 0), parseInt(t)
        },
        initPackageData: function(e) {
            var t = "stageData/" + i[e],
                n = cc.RawAsset;
            cc.loader.loadRes(t, n, function(e, t) {
                e ? console.log(" err=" + e) : d.getInstance().parePackageData(t.json)
            }), this.m_PackageStageCount[e] = this.MaxCustomsPass
        },
        parePackageData: function(e) {
            for (var t = e.StageId, n = 0; n < e.StageData.length; ++n) {
                e.StageData[n].level;
                this.m_PackageDatas[t].m_subPackageDatas[n] = new c, this.m_PackageDatas[t].m_subPackageDatas[n].minmove = e.StageData[n].minmove, this.m_PackageDatas[t].m_subPackageDatas[n].count = e.StageData[n].count;
                for (var i = 0; i < e.StageData[n].count; ++i) this.m_PackageDatas[t].m_subPackageDatas[n].m_BlockData[i] = new s, this.m_PackageDatas[t].m_subPackageDatas[n].m_BlockData[i].coordinate = e.StageData[n].subBlockStatusData[i].coordinate, this.m_PackageDatas[t].m_subPackageDatas[n].m_BlockData[i].state = e.StageData[n].subBlockStatusData[i].state
            }
            console.log(t + ", level.count=" + e.StageData.length)
        },
        getPackgeStr: function(e) {
            return e >= 0 && e < o.length ? o[e] : 0
        },
        setGameCurLevelNum: function(e) {
            this.m_curLevelNum = e
        },
        getGameCurLevelNum: function() {
            return this.m_curLevelNum
        },
        saveSelectLevelPos: function(e) {
            var t = this.gameName + "SelectLevelPos";
            cc.sys.localStorage.setItem(t, e.toString())
        },
        getSelectLevelPos: function() {
            var e = this.gameName + "SelectLevelPos",
                t = cc.sys.localStorage.getItem(e);
            return null != t && 0 != t.length || (t = 0), parseInt(t)
        },
        setStagePageScollPos: function(e) {
            var t = this.getLatestPackage(),
                n = this.gameName + "stagePageScollPosX" + t.toString();
            cc.sys.localStorage.setItem(n, e.x.toString()), n = this.gameName + "stagePageScollPosY" + t.toString(), cc.sys.localStorage.setItem(n, e.y.toString())
        },
        getStagePageScollPos: function() {
            var e = this.getLatestPackage(),
                t = this.gameName + "stagePageScollPosX" + e.toString(),
                n = cc.sys.localStorage.getItem(t);
            null != n && 0 != n.length || (n = 0), t = this.gameName + "stagePageScollPosY" + e.toString();
            var i = cc.sys.localStorage.getItem(t);
            return null != i && 0 != i.length || (i = 0), new cc.Vec2(parseInt(n), parseInt(i))
        },
        preLoadingdata: function() {
            for (var e = this.getPackageCount(), t = 0; t < e; t++) this.getCompletedStageCount(t), this.getMaxUnlockedStage(t)
        },
        getIsFistPlay: function() {
            return !(d.getInstance().getGoals() > 0)
        },
        getResName: function(e) {
            var t = "";
            return r.CUR_LANGUAGE_TYPE == r.LANGUAGE_CH ? t = "ch/" : r.CUR_LANGUAGE_TYPE == r.LANGUAGE_EN && (t = "en/"), t + e
        },
        getTextById: function(e) {
            if (e >= 0 && e < a.length) {
                var t = "";
                return r.CUR_LANGUAGE_TYPE == r.LANGUAGE_CH ? t = a[e].ch : r.CUR_LANGUAGE_TYPE == r.LANGUAGE_EN && (t = a[e].en), t
            }
        },
        setGamePlaySceneReload: function(e) {
            this.gamePlayScene_isReload = e
        },
        getGamePlaySceneReload: function() {
            return this.gamePlayScene_isReload
        },
        loadGameBoxWXInfo: function() {
            0
        },
        pushSubGameInfoToGameBoxList: function(e) {
            this.m_gameBoxInfoList.push(e)
        },
        clearAllGameInfoToGameBoxList: function(e) {
            this.m_gameBoxInfoList = []
        },
        randGetGameInfoByGameBoxList: function() {
            if (!(this.m_gameBoxInfoList.length <= 0)) return ++this.gameBox_pos, this.gameBox_pos = this.gameBox_pos % (this.m_gameBoxInfoList.length + 1), this.m_gameBoxInfoList[this.gameBox_pos].appid == r.APP_ID && (++this.gameBox_pos, this.gameBox_pos = this.gameBox_pos % (this.m_gameBoxInfoList.length + 1)), console.log(" return pos = " + this.gameBox_pos), this.m_gameBoxInfoList[this.gameBox_pos];
            this.loadGameBoxWXInfo()
        },
        LoadGameInfoByDataJson: function(e) {
            var t = JSON.parse(e),
                n = t.data.length;
            this.clearAllGameInfoToGameBoxList();
            for (var i = 0; i < n; ++i) {
                var o = new g;
                o.icon_url = t.data[i].navigatorIcon, o.appid = t.data[i].appid, o.icon_url && o.appid && this.m_gameBoxInfoList.push(o)
            }
            console.log(" LoadGamesListDataJson size =" + this.m_gameBoxInfoList.length)
        },
        setDebugInfo: function(e) {
            this.debugInfo = e
        },
        getDebugInfo: function() {
            return this.debugInfo
        },
        GetSendErrorMsgRequestStr: function(e) {
            var t = {
                gameName: this.gameName,
                msg: e,
                time: String(this.GetUtcStamp())
            };
            return JSON.stringify(t)
        },
        sendErrorMsg: function(e) {
            var t;
            t = "https://www.7cgames.cn:8070/sendErrorMsg";
            var n = cc.loader.getXMLHttpRequest();
            n.onreadystatechange = function() {
                4 === n.readyState && n.status >= 200 && n.status < 300 ? console.log(" readyState success: ") : console.log(" readyState error: " + n.readyState + "," + n.status);
                var e = n.responseText;
                console.log(" response: " + e)
            }, n.open("POST", t), n.setRequestHeader("content-type", "application/json;charset=UTF-8");
            var i = this.GetSendErrorMsgRequestStr(e);
            n.send(i)
        }
    });
t.exports = d