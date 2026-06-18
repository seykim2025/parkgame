let i = module.exports = {};
let n = module;
var o = "https://www.7cgames.cn:8070/",
    a = {
        shareTitleList: ["两只猪的爱情故事，看完后泪流满面", "快滚，快滚！", "爱不爱我我都只是个球球", "这也太甜了吧！", "其实我想让你学习一下通关恋爱球球的秘诀"],
        shareImgDir: "resources/share/",
        shareImgType: ".jpg",
        moreGameIconDir: "more",
        appIdList: ["wxd5a257d6ee2b8f91", "wx515f44394eab5985", "wx08beeb18dc512c2f", "wxea245f85c9673414", "wxc4e628aa7caa2c07", "wx0af703a36035c60c", "wxf49b0a26d9405058", "wxac5820bc06a3a893", "wxd9589cd7117d0873"]
    };

function c(e) {
    return 0 === e ? -1 : Math.floor(Math.random() * e)
}

function s() {
    var e = this;
    e.isAndroid = cc.sys.os === cc.sys.OS_ANDROID, e.bannerAdisLoad = !1, e.videoAdisLoad = !1, e.videoAdCallback = null, e.createBannerAd(), e.createVideoAd(), e.appIdList = a.appIdList, e.moreGameQRCodeIdx = 0, e.moreGameIconList = [], e.moreGameQRCodeList = [], e.initMoreGame()
}
var r = s.prototype;
r.onShow = function() {}, r.onHide = function() {}, r.login = function() {
    return new Promise(function(e, t) {
        t({
            errcode: "PLATFORM_ERROR",
            message: "wx为undefined"
        }), wx.login({
            success: function(t) {
                e(t)
            },
            fail: function() {
                t({
                    errcode: "LOGIN_FAIL",
                    message: "login失败"
                })
            }
        })
    })
}, r.getOpenId = function() {
    var e = this;
    return new Promise(function(t, n) {
        n({
            errcode: "PLATFORM_ERROR",
            message: "wx为undefined"
        }), e.openId && t(), e.login().then(function(i) {
            i.code || n({
                errcode: "CODE_PARAM_ERROR",
                message: "code为null或undefined"
            }), wx.request({
                url: o + "getOpenId",
                data: {
                    gameName: "ball2",
                    appid: "wx0a909849d3a53f25",
                    secret: "1ad92b8df595f9ecd405ee122f7afe07",
                    js_code: i.code,
                    grant_type: "authorization_code"
                },
                header: {
                    "Content-Type": "application/json"
                },
                method: "POST",
                success: function(i) {
                    i.data.openid ? (e.openId = i.data.openid, t()) : n({
                        errcode: "OPENID_PARAM_ERROR",
                        message: "openId为null或undefined"
                    })
                },
                fail: function() {
                    n({
                        errcode: "GET_OPENID_FAIL",
                        message: "请求getOpenId失败"
                    })
                }
            })
        })
    })
}, r.getShareInfo = function() {
    var e = this;
    return new Promise(function(t, n) {
        e.shareTicket || n({
            errcode: "SHARETICKET_PARAM_ERROR",
            message: "shareTicket为null或undefined"
        }), e.openId || n({
            errcode: "OPENID_PARAM_ERROR",
            message: "openId为null或undefined"
        }), wx.getShareInfo({
            shareTicket: e.shareTicket,
            success: function(e) {
                t(e)
            },
            fail: function() {
                n({
                    errcode: "GET_SHARE_INFO_FAIL",
                    message: "getShareInfo失败"
                })
            }
        })
    })
}, r.getDecryptedData = function(e) {
    var t = this;
    return e = e || {}, new Promise(function(n, i) {
        t.openId || i({
            errcode: "OPENID_PARAM_ERROR",
            message: "openId为null或undefined"
        }), e.encryptedData || i({
            errcode: "SHARE_INFO_PARAM_ERROR",
            message: "encryptedData为null或undefined"
        }), e.iv || i({
            errcode: "SHARE_INFO_PARAM_ERROR",
            message: "iv为null或undefined"
        }), wx.request({
            url: o + "getDecryptedData",
            data: {
                openId: t.openId,
                encryptedData: e.encryptedData,
                iv: e.iv
            },
            header: {
                "Content-Type": "application/json"
            },
            method: "POST",
            success: function(e) {
                n(e)
            },
            fail: function() {
                i({
                    errcode: "GET_DECRYPTED_DATA_FAIL",
                    message: "请求getDecryptedData失败"
                })
            }
        })
    })
}, r.getOpenGid = function() {
    var e = this;
    return new Promise(function(t, n) {
        e.getOpenId().then(function() {
            return e.getShareInfo()
        }).then(function(t) {
            return e.getDecryptedData({
                openId: e.openId,
                encryptedData: t.encryptedData,
                iv: t.iv
            })
        }).then(function(e) {
            return t(e)
        })
    })
}, r.getUserInfo = function() {
    var e = this;
    return new Promise(function(t, n) {
        n({
            errcode: "PLATFORM_ERROR",
            message: "wx为undefined"
        }), e.userInfo && t(), wx.getSetting({
            success: function(i) {
                if (!i.authSetting["scope.userInfo"] && wx.createUserInfoButton) {
                    var o = wx.createUserInfoButton({
                        type: "text",
                        text: "",
                        style: {
                            left: 0,
                            top: 0,
                            width: 5e3,
                            height: 5e3,
                            lineHeight: 40,
                            backgroundColor: "",
                            color: "",
                            textAlign: "center",
                            fontSize: 16,
                            borderRadius: 4
                        }
                    });
                    o.onTap(function(n) {
                        o.hide(), e.userInfo = n.userInfo, t()
                    })
                } else wx.getUserInfo({
                    success: function(n) {
                        e.userInfo = n.userInfo, t()
                    },
                    fail: function() {
                        n({
                            errcode: "GET_USER_INFO_FAIL",
                            message: "获取userInfo失败"
                        })
                    }
                })
            },
            fail: function() {
                n({
                    errcode: "GET_SETTING_FAIL",
                    message: "获取Setting失败"
                })
            }
        })
    })
}, r.getServerUtc = function() {
    return new Promise(function(e, t) {
        wx.request({
            url: o + "getServerUtc",
            method: "POST",
            success: function(t) {
                e(t)
            },
            fail: function() {
                t({
                    errcode: "GET_OPENID_FAIL",
                    message: "请求getServerUtc失败"
                })
            }
        })
    })
}, r.shareAppMessage = function(t) {
    return t = t || {}, new Promise(function(n, i) {
        var o = !1,
            s = c(a.shareTitleList.length),
            r = t.str ? t.str : a.shareTitleList[s],
            l = t.url ? t.url : wxDownloader.REMOTE_SERVER_ROOT + "/" + cc.url.raw(a.shareImgDir + r + a.shareImgType),
            g = t.query ? t.query : "";
        wx.shareAppMessage({
            title: r,
            imageUrl: l,
            query: g,
            success: function(e) {
                console.log("success", e), n()
            },
            fail: function(e) {
                console.log("fail", e), i()
            },
            complete: function() {
                console.log("complete", e), o = !0
            }
        }), setTimeout(function() {
            o || n()
        }, 2e3)
    })
}, r.createBannerAd = function() {}, r.showBannerAd = function() {}, r.hideBannerAd = function() {}, r.createVideoAd = function() {}, r.showVideoAd = function() {}, r.submitScore = function(e) {
    isNaN(e) || wx.postMessage({
        messageType: 3,
        MAIN_MENU_NUM: "qr2",
        score: e
    })
}, r.updateFriendRank = function() {
    wx.postMessage({
        messageType: 1,
        MAIN_MENU_NUM: "qr2"
    })
}, r.initMoreGame = function() {
    var e = this;
    0 === e.moreGameIconList.length && cc.loader.loadResDir(a.moreGameIconDir, cc.SpriteFrame, function(t, n, i) {
        if (t) return console.log(t);
        e.moreGameIconList = n.sort(function(e, t) {
            return parseInt(e.name) - parseInt(t.name)
        })
    })
}, r.getMoreGameQRCodeData = function() {
    return new Promise(function(e, t) {
        wx.request({
            url: "https://www.7cgames.cn/GameRes/fangyipengDir/7CGamesBoxWX/QRCode/WXGamesCode.json",
            headers: {
                "Content-Type": "application/json"
            },
            success: function(t) {
                e(t)
            },
            fail: function(e) {
                t(e)
            }
        })
    })
}, r.navigateToMiniProgram = function(e) {}, r.previewImage = function() {}, n.exports = s