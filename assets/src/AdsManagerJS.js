let n = module.exports = {};
let t = module;
var i = require('define'),
    o = require('GameDataManagerJS'),
    a = null,
    c = null,
    s = cc.Class({
        extends: cc.Component,
        properties: {
            preloadedInterstitial: null,
            preloadedRewardedVideo: null
        },
        start: function() {},
        statics: {
            _instance: null,
            getInstance: function() {
                return null === s._instance && (this._instance = new s), s._instance
            }
        },
        ctor: function() {
            this.init()
        },
        init: function() {
            return this.preloadInterstitial(), this.preloadRewarded(), this.preloadBannerAD(), this.closeRewardedAD(), 10
        },
        preloadInterstitial: function() {
            if ("undefined" != typeof FBInstant) {
                var e = FBInstant.getSupportedAPIs();
                e.includes("getInterstitialAdAsync") && e.includes("getRewardedVideoAsync") ? FBInstant.getInterstitialAdAsync(faceBookInterstitialId).then(function(e) {
                    return o.getInstance().setDebugInfo(" preloadedInterstitial.loadAsync(); "), (a = e).loadAsync()
                }).then(function() {
                    console.log("Interstitial preloaded"), o.getInstance().setDebugInfo("Interstitial preloaded  => " + a)
                }).catch(function(e) {
                    console.error("Interstitial failed to preload: " + e.message), o.getInstance().setDebugInfo("Interstitial failed to preload: " + e.message)
                }) : (console.log("Ads not supported in this session"), o.getInstance().setDebugInfo("Ads not supported in this session"))
            }
        },
        showInterstitial: function() {
            1 == i.DEBUG_NO_ADS ? (console.log("Interstitial ad finished successfully"), o.getInstance().setDebugInfo("Interstitial ad finished successfully"), this.rewardedInterstitialAdsCallback()) : "undefined" != typeof FBInstant && (null != a ? (a.showAsync().then(function() {
                console.log("Interstitial ad finished successfully"), o.getInstance().setDebugInfo("Interstitial ad finished successfully"), s.getInstance().rewardedInterstitialAdsCallback()
            }).catch(function(e) {
                console.error(e.message), o.getInstance().setDebugInfo(e.message)
            }), s.getInstance().scheduleOnce(function() {
                o.getInstance().setDebugInfo(" scheduleOnce => preloadInterstitial "), s.getInstance().preloadInterstitial()
            }, 2)) : o.getInstance().setDebugInfo(" error  g_preloadedInterstitial => " + a))
        },
        rewardedInterstitialAdsCallback: function() {
            o.getInstance().setDebugInfo("Reward    InterstitialAds"), console.log("Reward    InterstitialAds")
        },
        preloadRewarded: function() {
            if ("undefined" != typeof FBInstant) {
                var e = FBInstant.getSupportedAPIs();
                e.includes("getInterstitialAdAsync") && e.includes("getRewardedVideoAsync") && FBInstant.getRewardedVideoAsync(faceBookRewardedVideoId).then(function(e) {
                    return c = e, o.getInstance().setDebugInfo(" preloadedRewardedVideo.loadAsync(); "), c.loadAsync()
                }).then(function() {
                    console.log("Rewarded video preloaded"), o.getInstance().setDebugInfo("Rewarded video preloaded => " + c)
                }).catch(function(e) {
                    console.error("Rewarded video failed to preload: " + e.message), o.getInstance().setDebugInfo("Rewarded video failed to preload: " + e.message)
                })
            } else console.log("Ads not supported in this session"), o.getInstance().setDebugInfo("Ads not supported in this session")
        },
        showRewardedVideo: function() {
            1 == i.DEBUG_NO_ADS ? (console.log("Rewarded video watched successfully"), this.rewardedVideoAdsCallback()) : "undefined" != typeof FBInstant ? null != c ? (c.showAsync().then(function() {
                console.log("Rewarded video watched successfully"), o.getInstance().setDebugInfo("Rewarded video watched successfully"), s.getInstance().rewardedVideoAdsCallback()
            }).catch(function(e) {
                console.error(e.message), o.getInstance().setDebugInfo(e.message)
            }), s.getInstance().scheduleOnce(function() {
                o.getInstance().setDebugInfo(" scheduleOnce => preloadRewarded "), s.getInstance().preloadRewarded()
            }, 2)) : o.getInstance().setDebugInfo(" error  g_preloadedRewardedVideo =>  " + c) : console.log("Ads not supported in this session")
        },
        showRewardedGold: function() {
            1 == i.DEBUG_NO_ADS ? (console.log("Rewarded video watched successfully"), this.rewardedVideoAdsCallback()) : "undefined" != typeof FBInstant ? null != c ? (c.showAsync().then(function() {
                console.log("Rewarded video watched successfully"), o.getInstance().setDebugInfo("Rewarded video watched successfully"), s.getInstance().rewardedGoldAdsCallback()
            }).catch(function(e) {
                console.error(e.message), o.getInstance().setDebugInfo(e.message)
            }), s.getInstance().scheduleOnce(function() {
                o.getInstance().setDebugInfo(" scheduleOnce => preloadRewarded "), s.getInstance().preloadRewarded()
            }, 2)) : o.getInstance().setDebugInfo(" error  g_preloadedRewardedVideo =>  " + c) : console.log("Ads not supported in this session")
        },
        showmainRewardedGold: function() {
            1 == i.DEBUG_NO_ADS ? (console.log("Rewarded video watched successfully"), this.rewardedVideoAdsCallback()) : "undefined" != typeof FBInstant ? null != c ? (c.showAsync().then(function() {
                console.log("Rewarded video watched successfully"), o.getInstance().setDebugInfo("Rewarded video watched successfully"), s.getInstance().rewardedmainGoldAdsCallback()
            }).catch(function(e) {
                console.error(e.message), o.getInstance().setDebugInfo(e.message)
            }), s.getInstance().scheduleOnce(function() {
                o.getInstance().setDebugInfo(" scheduleOnce => preloadRewarded "), s.getInstance().preloadRewarded()
            }, 2)) : o.getInstance().setDebugInfo(" error  g_preloadedRewardedVideo =>  " + c) : console.log("Ads not supported in this session")
        },
        closeRewardedAD: function() {
            cc.log("关闭 Rewarded 的回调函数")
        },
        rewardedVideoAdsCallback: function() {
            console.log("Reward    rewardedVideoAds"), o.getInstance().setDebugInfo("Reward    rewardedVideoAds"), cc.find("Canvas/game").getComponent("gameplay").videohint_btnCallback()
        },
        rewardedGoldAdsCallback: function() {
            console.log("Reward    rewardedVideoAds"), o.getInstance().setDebugInfo("Reward    rewardedVideoAds"), cc.find("Canvas/game").getComponent("gameplay").gold_btnCallback()
        },
        rewardedmainGoldAdsCallback: function() {
            console.log("Reward    rewardedVideoAds"), o.getInstance().setDebugInfo("Reward    rewardedVideoAds"), cc.find("Canvas").getComponent("main").gold_btnCallback()
        },
        preloadBannerAD: function() {
            "undefined" != typeof FBInstant || console.log("preloadBannerAD 不支持平台 banner")
        },
        showBannerAD: function() {
            "undefined" != typeof FBInstant || console.log("showBannerAD 不支持平台 banner")
        },
        hideBannerAD: function() {
            "undefined" != typeof FBInstant || console.log("hideBannerAD 不支持平台 banner")
        }
    });
t.exports = s