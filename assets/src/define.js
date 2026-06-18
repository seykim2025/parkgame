let n = module.exports = {};
let t = module;
console.assert(true), t.exports = {
    avatarUrl: "",
    nickName: "xx",
    AvatarUrl: "",
    kVersion_number: "1.0.6",
    APP_ID: "   ",
    goal: 0,
    money: 100,
    flag: [0],
    carskin: 1,
    kOrientation_Horizontal: 0,
    kOrientation_Vertical: 1,
    kBlockState_Grabbed: 2,
    kBlockState_Ungrabbed: 3,
    GRIDIRON_WIDTH: 6,
    Default_Hints: 3,
    Default_Open: 1,
    MaxCustomsPass: 100,
    RankKey: "gameRank",
    kDirection_Left: 1,
    kDirection_Down: 2,
    kDirection_Right: 3,
    kDirection_Up: 4,
    GameMode_Relax: 10,
    kChangeOtherIconTime: 5,
    designSize: new cc.Vec2(750, 1334),
    kMoveActionTag: 3233828913,
    kBlinkActionTag: 3233820753,
    DEBUG_MODE: !1,
    DEBUG_SCROLL_POS: !1,
    DEBUG_SHOW_POS: !1,
    DEBUG_SHOW_MAP: !1,
    DEBUG_HINTS: !1,
    DEBUG_NO_ADS: !1,
    DEBUG_TEST_ADS: !1,
    LANGUAGE_EN: 1,
    LANGUAGE_CH: 0,
    CUR_LANGUAGE_TYPE: 0,
    music: !0,
    getgold: function() {
        var e = cc.sys.localStorage.getItem("gold");
        return parseInt(e)
    },
    getcarskin: function() {
        var e = cc.sys.localStorage.getItem("carskin");
        return parseInt(e)
    }
}