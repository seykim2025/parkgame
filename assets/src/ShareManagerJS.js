let n = module.exports = {};
let t = module;
var i = cc.Class({
    extends: cc.Component,
    properties: {
        head_url: "",
        nick_name: "",
        id: 0,
        info: ""
    },
    statics: {
        _instance: null,
        show_count: 0,
        getInstance: function() {
            return null === i._instance && (this._instance = new i), i._instance
        }
    },
    ctor: function() {
        this.init()
    },
    start: function() {},
    init: function() {
        if ("undefined" != typeof FBInstant) {
            this.nick_name = FBInstant.player.getName(), this.id = FBInstant.player.getID(), this.head_url = FBInstant.player.getPhoto();
            var e = {
                contextID: FBInstant.context.getID(),
                contextType: FBInstant.context.getType(),
                locale: FBInstant.getLocale(),
                platform: FBInstant.getPlatform(),
                sdkVersion: FBInstant.getSDKVersion()
            };
            this.info = "Context ID: " + e.contextID + "\nContext Type: " + e.contextType + "\nLocale: " + e.locale + "\nPlatform: " + e.platform + "\nSDKVersion: " + e.sdkVersion
        } else 0
    },
    onShareGame: function() {
        var e, t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "";
        "undefined" != typeof FBInstant ? (e = t.length > 1 ? t : this.nick_name + " is asking for your help!", FBInstant.shareAsync({
            intent: "SHARE",
            image: this.getImgBase64(),
            text: e,
            data: {
                myReplayData: "..."
            }
        }).then(function() {
            console.log("continue with the game.")
        })) : console.log("不支持平台")
    },
    getImgBase64: function() {
        if ("undefined" != typeof FBInstant) {
            var e = cc.find("Canvas/sharePicSprite"),
                t = new cc.RenderTexture(800, 400);
            t.begin(), e._sgNode.visit(), t.end();
            var n = document.createElement("canvas"),
                i = n.getContext("2d");
            if (n.width = 800, n.height = 400, cc._renderType === cc.game.RENDER_TYPE_CANVAS) {
                var o = t.getSprite().getTexture().getHtmlElementObj();
                i.drawImage(o, 0, 0)
            } else if (cc._renderType === cc.game.RENDER_TYPE_WEBGL) {
                var a = gl.createFramebuffer();
                gl.bindFramebuffer(gl.FRAMEBUFFER, a);
                var c = t.getSprite().getTexture()._glID;
                gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, c, 0);
                var s = new Uint8Array(128e4);
                gl.readPixels(0, 0, 800, 400, gl.RGBA, gl.UNSIGNED_BYTE, s), gl.bindFramebuffer(gl.FRAMEBUFFER, null);
                for (var r = 0; r < 400; r++) {
                    var l = 399 - r,
                        g = new Uint8ClampedArray(s.buffer, 800 * l * 4, 3200),
                        d = new ImageData(g, 800, 1);
                    i.putImageData(d, 0, r)
                }
            }
            return n.toDataURL("image/png")
        }
    },
    NavigateTo7cGameBox: function() {
        0
    }
});
t.exports = i