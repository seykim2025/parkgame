let n = module.exports = {};
let t = module;
var i = require('define'),
    o = cc.Class({
        extends: cc.Component,
        properties: {
            audio: {
                type: cc.AudioSource,
                default: null
            },
            audioClick: {
                type: cc.AudioSource,
                default: null
            },
            audioMove: {
                type: cc.AudioSource,
                default: null
            },
            audioComplete: {
                type: cc.AudioSource,
                default: null
            },
            data: 0
        },
        statics: {
            _instance: null,
            getInstance: function() {
                return null === o._instance && (this._instance = new o, console.log("AudioSourceControl _instance=this  !")), o._instance
            }
        },
        onLoad: function() {
            cc.game.addPersistRootNode(this.node), console.log("AudioSourceControl onLoad  ")
        },
        start: function() {},
        playAudio: function() {
            this.audio && 1 == i.music && this.audio.play()
        },
        playClick: function() {
            this.audioClick && 1 == i.music && this.audioClick.play()
        },
        playMove: function() {
            this.audioMove && 1 == i.music && this.audioMove.play()
        },
        playComplete: function() {
            this.audioComplete && 1 == i.music && this.audioComplete.play()
        }
    });
t.exports = o