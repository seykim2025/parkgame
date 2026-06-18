let TossManagerJS = cc.Class({
    extends: cc.Component,
    
    statics: {
        _instance: null,
        getInstance: function() {
            if (this._instance === null) {
                this._instance = new TossManagerJS();
            }
            return this._instance;
        }
    },
    
    ctor: function() {
        this.init();
    },
    
    init: function() {
        // TODO: 토스 SDK 초기화 로직 구현 (가이드 문서 참고)
        cc.log("Toss SDK Initialized (Placeholder)");
    },
    
    showRewardedAd: function(callback) {
        // TODO: 토스 보상형 광고 연동
        cc.log("Toss Rewarded Ad Shown");
        if (callback) callback();
    },
    
    submitScore: function(score) {
        // TODO: 토스 랭킹/점수 연동
        cc.log("Toss Score Submitted: " + score);
    }
});

module.exports = TossManagerJS;
