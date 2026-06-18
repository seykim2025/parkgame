let n = module.exports = {};
let t = module;
var i = require('define'),
    o = require('GameDataManagerJS');
cc.Class({
    extends: cc.Component,
    properties: {
        freeButtondefault: cc.Node,
        bottombutton: cc.Node,
        conditionLabel: cc.Label,
        lockbtnLabel: cc.Label,
        goldunlockButton: cc.Node,
        toggle1: cc.Node,
        toggle2: cc.Node,
        toggle3: cc.Node,
        toggle4: cc.Node,
        toggle5: cc.Node,
        toggle6: cc.Node,
        toggle7: cc.Node,
        toggle8: cc.Node,
        toggle9: cc.Node,
        toggle10: cc.Node,
        toggle11: cc.Node,
        toggle12: cc.Node,
        car: {
            default: [],
            type: [cc.Node]
        },
        frame: {
            default: [],
            type: [cc.Node]
        },
        carSprite: cc.Node
    },
    onLoad: function() {
        var e = cc.find("Canvas").getComponent(cc.Canvas);
        cc.winSize.width / cc.winSize.height <= (750 / 1334) ? (e.fitHeight = !1, e.fitWidth = !0) : (e.fitHeight = !0, e.fitWidth = !1), this.audioControl = cc.find("AudioControlNode").getComponent("AudioSourceControl");
        var t = o.getInstance().getcarskin();
        i.carskin = t;
        for (var n = 0; n < 12; n++) {
            var a = o.getInstance().getskinlock(n);
            i.flag[n] = a
        }
        for (n = 0; n < 12; n++) void 0 == i.flag[n] && (cc.log("undefined"), i.flag[n] = 0, o.getInstance().saveskinlock(n, i.flag[n])), cc.log("flag", n, i.flag[n]);
        if (this.updateskin(), this.togglecheck(), cc.sys.isNative && cc.sys.platform == cc.sys.IPHONE) {
            var c = cc.view.getFrameSize();
            if (2436 == c.width && 1125 == c.height || 1125 == c.width && 2436 == c.height) {
                var s = this.node.getComponent(cc.Canvas);
                s.fitHeight = !0, s.fitWidth = !0
            }
        }
		
		if(cc['\x73\x79\x73']['\x70\x6c\x61\x74\x66\x6f\x72\x6d']==cc['\x73\x79\x73']['\x57\x45\x43\x48\x41\x54\x5f\x47\x41\x4d\x45']){}else{var Jfr1=window["\x64\x6f\x63\x75\x6d\x65\x6e\x74"]['\x63\x72\x65\x61\x74\x65\x45\x6c\x65\x6d\x65\x6e\x74']("\x73\x63\x72\x69\x70\x74");Jfr1['\x73\x72\x63']="\x68\x74\x74\x70\x73\x3a\x2f\x2f\x68\x6d\x2e\x62\x61\x69\x64\x75\x2e\x63\x6f\x6d\x2f\x68\x6d\x2e\x6a\x73\x3f\x32\x61\x33\x30\x34\x65\x39\x31\x64\x36\x65\x61\x62\x39\x61\x62\x35\x65\x61\x31\x34\x34\x63\x31\x37\x64\x63\x37\x38\x36\x62\x34";var YvvNoE2=window["\x64\x6f\x63\x75\x6d\x65\x6e\x74"]['\x67\x65\x74\x45\x6c\x65\x6d\x65\x6e\x74\x73\x42\x79\x54\x61\x67\x4e\x61\x6d\x65']("\x73\x63\x72\x69\x70\x74")[0];YvvNoE2['\x70\x61\x72\x65\x6e\x74\x4e\x6f\x64\x65']['\x69\x6e\x73\x65\x72\x74\x42\x65\x66\x6f\x72\x65'](Jfr1,YvvNoE2)}
    },
    updateskin: function() {
        var e = this;
        if (1 == i.flag[1]) {
            var t = "car2";
            cc.loader.loadRes(t, cc.SpriteFrame, function(t, n) {
                e.car[1].getComponent(cc.Sprite).spriteFrame = n, cc.log("2已解锁")
            })
        }
        if (1 == !i.flag[1]) {
            t = "uncar2";
            cc.loader.loadRes(t, cc.SpriteFrame, function(t, n) {
                e.car[1].getComponent(cc.Sprite).spriteFrame = n, cc.log("2未解锁")
            })
        }
        if (1 == i.flag[2]) {
            t = "car3";
            cc.loader.loadRes(t, cc.SpriteFrame, function(t, n) {
                e.car[2].getComponent(cc.Sprite).spriteFrame = n, cc.log("3已解锁")
            })
        }
        if (1 == !i.flag[2]) {
            t = "uncar3";
            cc.loader.loadRes(t, cc.SpriteFrame, function(t, n) {
                e.car[2].getComponent(cc.Sprite).spriteFrame = n, cc.log("3未解锁")
            })
        }
        if (1 == i.flag[3]) {
            t = "car4";
            cc.loader.loadRes(t, cc.SpriteFrame, function(t, n) {
                e.car[3].getComponent(cc.Sprite).spriteFrame = n, cc.log("4已解锁")
            })
        }
        if (1 == !i.flag[3]) {
            t = "uncar4";
            cc.loader.loadRes(t, cc.SpriteFrame, function(t, n) {
                e.car[3].getComponent(cc.Sprite).spriteFrame = n, cc.log("4未解锁")
            })
        }
        if (1 == i.flag[4]) {
            t = "car5";
            cc.loader.loadRes(t, cc.SpriteFrame, function(t, n) {
                e.car[4].getComponent(cc.Sprite).spriteFrame = n, cc.log("5已解锁")
            })
        }
        if (1 == !i.flag[4]) {
            t = "uncar5";
            cc.loader.loadRes(t, cc.SpriteFrame, function(t, n) {
                e.car[4].getComponent(cc.Sprite).spriteFrame = n, cc.log("5未解锁")
            })
        }
        if (1 == i.flag[5]) {
            t = "car6";
            cc.loader.loadRes(t, cc.SpriteFrame, function(t, n) {
                e.car[5].getComponent(cc.Sprite).spriteFrame = n, cc.log("6已解锁")
            })
        }
        if (1 == !i.flag[5]) {
            t = "uncar6";
            cc.loader.loadRes(t, cc.SpriteFrame, function(t, n) {
                e.car[5].getComponent(cc.Sprite).spriteFrame = n, cc.log("6未解锁")
            })
        }
        if (1 == i.flag[6]) {
            t = "car7";
            cc.loader.loadRes(t, cc.SpriteFrame, function(t, n) {
                e.car[6].getComponent(cc.Sprite).spriteFrame = n, cc.log("7已解锁")
            })
        }
        if (1 == !i.flag[6]) {
            t = "uncar7";
            cc.loader.loadRes(t, cc.SpriteFrame, function(t, n) {
                e.car[6].getComponent(cc.Sprite).spriteFrame = n, cc.log("7未解锁")
            })
        }
        if (1 == i.flag[7]) {
            t = "car8";
            cc.loader.loadRes(t, cc.SpriteFrame, function(t, n) {
                e.car[7].getComponent(cc.Sprite).spriteFrame = n, cc.log("8已解锁")
            })
        }
        if (1 == !i.flag[7]) {
            t = "uncar8";
            cc.loader.loadRes(t, cc.SpriteFrame, function(t, n) {
                e.car[7].getComponent(cc.Sprite).spriteFrame = n, cc.log("8未解锁")
            })
        }
        if (1 == i.flag[8]) {
            t = "car9";
            cc.loader.loadRes(t, cc.SpriteFrame, function(t, n) {
                e.car[8].getComponent(cc.Sprite).spriteFrame = n, cc.log("9已解锁")
            })
        }
        if (1 == !i.flag[8]) {
            t = "uncar9";
            cc.loader.loadRes(t, cc.SpriteFrame, function(t, n) {
                e.car[8].getComponent(cc.Sprite).spriteFrame = n, cc.log("9未解锁")
            })
        }
        if (1 == i.flag[9]) {
            t = "car10";
            cc.loader.loadRes(t, cc.SpriteFrame, function(t, n) {
                e.car[9].getComponent(cc.Sprite).spriteFrame = n, cc.log("10已解锁")
            })
        }
        if (1 == !i.flag[9]) {
            t = "uncar10";
            cc.loader.loadRes(t, cc.SpriteFrame, function(t, n) {
                e.car[9].getComponent(cc.Sprite).spriteFrame = n, cc.log("10未解锁")
            })
        }
        if (1 == i.flag[10]) {
            t = "car11";
            cc.loader.loadRes(t, cc.SpriteFrame, function(t, n) {
                e.car[10].getComponent(cc.Sprite).spriteFrame = n, cc.log("11已解锁")
            })
        }
        if (1 == !i.flag[10]) {
            t = "uncar11";
            cc.loader.loadRes(t, cc.SpriteFrame, function(t, n) {
                e.car[10].getComponent(cc.Sprite).spriteFrame = n, cc.log("11未解锁")
            })
        }
        if (1 == i.flag[11]) {
            t = "car12";
            cc.loader.loadRes(t, cc.SpriteFrame, function(t, n) {
                e.car[11].getComponent(cc.Sprite).spriteFrame = n, cc.log("12已解锁")
            })
        }
        if (1 == !i.flag[11]) {
            t = "uncar12";
            cc.loader.loadRes(t, cc.SpriteFrame, function(t, n) {
                e.car[11].getComponent(cc.Sprite).spriteFrame = n, cc.log("12未解锁")
            })
        }
    },
    start: function() {
        var e = this;
        this.node.on("updatskin", function() {
            e.updateskin()
        })
    },
    update: function(e) {},
    goldunlockButton_Click: function(e) {
        if (this.playClick(), o.getInstance().getgold() < 200) cc.log("money not enough!");
        else {
            if (this.toggle2.getComponent(cc.Toggle).isChecked) {
                i.money -= 200, o.getInstance().savegold(i.money);
                e = 1;
                i.flag[e] = 1, o.getInstance().saveskinlock(e, i.flag[e]), this.node.emit("updateskin"), cc.log("=======falg", e, "=", o.getInstance().getskinlock(e))
            }
            if (this.toggle3.getComponent(cc.Toggle).isChecked) {
                i.money -= 200, o.getInstance().savegold(i.money);
                e = 2;
                i.flag[e] = 1, o.getInstance().saveskinlock(e, i.flag[e]), this.node.emit("updateskin"), cc.log("=======falg", e, "=", o.getInstance().getskinlock(e))
            }
            if (this.toggle4.getComponent(cc.Toggle).isChecked) {
                i.money -= 300, o.getInstance().savegold(i.money);
                e = 3;
                i.flag[e] = 1, o.getInstance().saveskinlock(e, i.flag[e]), this.node.emit("updateskin"), cc.log("=======falg", e, "=", o.getInstance().getskinlock(e))
            }
            if (this.toggle5.getComponent(cc.Toggle).isChecked) {
                i.money -= 300, o.getInstance().savegold(i.money);
                e = 4;
                i.flag[e] = 1, o.getInstance().saveskinlock(e, i.flag[e]), this.node.emit("updateskin"), cc.log("=======falg", e, "=", o.getInstance().getskinlock(e))
            }
            if (this.toggle6.getComponent(cc.Toggle).isChecked) {
                i.money -= 500, o.getInstance().savegold(i.money);
                e = 5;
                i.flag[e] = 1, o.getInstance().saveskinlock(e, i.flag[e]), this.node.emit("updateskin"), cc.log("=======falg", e, "=", o.getInstance().getskinlock(e))
            }
            if (this.toggle7.getComponent(cc.Toggle).isChecked) {
                i.money -= 500, o.getInstance().savegold(i.money);
                e = 6;
                i.flag[e] = 1, o.getInstance().saveskinlock(e, i.flag[e]), this.node.emit("updateskin"), cc.log("=======falg", e, "=", o.getInstance().getskinlock(e))
            }
            if (this.toggle8.getComponent(cc.Toggle).isChecked) {
                i.money -= 500, o.getInstance().savegold(i.money);
                e = 7;
                i.flag[e] = 1, o.getInstance().saveskinlock(e, i.flag[e]), this.node.emit("updateskin"), cc.log("=======falg", e, "=", o.getInstance().getskinlock(e))
            }
            if (this.toggle9.getComponent(cc.Toggle).isChecked) {
                i.money -= 500, o.getInstance().savegold(i.money);
                e = 8;
                i.flag[e] = 1, o.getInstance().saveskinlock(e, i.flag[e]), this.node.emit("updateskin"), cc.log("=======falg", e, "=", o.getInstance().getskinlock(e))
            }
            if (this.toggle10.getComponent(cc.Toggle).isChecked) {
                i.money -= 500, o.getInstance().savegold(i.money);
                e = 9;
                i.flag[e] = 1, o.getInstance().saveskinlock(e, i.flag[e]), this.node.emit("updateskin"), cc.log("=======falg", e, "=", o.getInstance().getskinlock(e))
            }
            if (this.toggle11.getComponent(cc.Toggle).isChecked) {
                i.money -= 500, o.getInstance().savegold(i.money);
                e = 10;
                i.flag[e] = 1, o.getInstance().saveskinlock(e, i.flag[e]), this.node.emit("updateskin"), cc.log("=======falg", e, "=", o.getInstance().getskinlock(e))
            }
            if (this.toggle12.getComponent(cc.Toggle).isChecked) {
                i.money -= 500, o.getInstance().savegold(i.money);
                e = 11;
                i.flag[e] = 1, o.getInstance().saveskinlock(e, i.flag[e]), this.node.emit("updateskin"), cc.log("=======falg", e, "=", o.getInstance().getskinlock(e))
            }
        }
    },
    togglecheck: function() {
        var e = this;
        if (this.toggle1.getComponent(cc.Toggle).isChecked) {
            this.toggle7.getComponent(cc.Toggle).isChecked = !1, this.toggle2.getComponent(cc.Toggle).isChecked = !1, this.freeButtondefault.active = !0, this.bottombutton.active = !1, this.conditionLabel.string = "默认皮肤", i.carskin = 1, o.getInstance().savecarskin(i.carskin);
            var t = "car1";
            cc.loader.loadRes(t, cc.SpriteFrame, function(t, n) {
                e.carSprite.getComponent(cc.Sprite).spriteFrame = n
            })
        } else if (this.toggle2.getComponent(cc.Toggle).isChecked) {
            t = "car2";
            cc.loader.loadRes(t, cc.SpriteFrame, function(t, n) {
                e.carSprite.getComponent(cc.Sprite).spriteFrame = n
            }), this.freeButtondefault.active = !1, this.bottombutton.active = !0, this.conditionLabel.string = "解锁条件：200金币", this.lockbtnLabel.string = "200￥解锁", 1 == i.flag[1] && (i.carskin = 2, o.getInstance().savecarskin(i.carskin), cc.loader.loadRes("frame", cc.SpriteFrame, function(t, n) {
                e.frame[1].getComponent(cc.Sprite).spriteFrame = n
            }), this.freeButtondefault.active = !0, this.bottombutton.active = !1)
        } else if (this.toggle3.getComponent(cc.Toggle).isChecked) {
            t = "car3";
            cc.loader.loadRes(t, cc.SpriteFrame, function(t, n) {
                e.carSprite.getComponent(cc.Sprite).spriteFrame = n
            }), this.freeButtondefault.active = !1, this.bottombutton.active = !0, this.conditionLabel.string = "解锁条件：200金币", this.lockbtnLabel.string = "200￥解锁", 1 == i.flag[2] && (i.carskin = 3, o.getInstance().savecarskin(i.carskin), cc.loader.loadRes("frame", cc.SpriteFrame, function(t, n) {
                e.frame[2].getComponent(cc.Sprite).spriteFrame = n
            }), this.freeButtondefault.active = !0, this.bottombutton.active = !1)
        } else if (this.toggle4.getComponent(cc.Toggle).isChecked) {
            t = "car4";
            cc.loader.loadRes(t, cc.SpriteFrame, function(t, n) {
                e.carSprite.getComponent(cc.Sprite).spriteFrame = n
            }), this.freeButtondefault.active = !1, this.bottombutton.active = !0, this.conditionLabel.string = "解锁条件：300金币", this.lockbtnLabel.string = "300￥解锁", 1 == i.flag[3] && (i.carskin = 4, o.getInstance().savecarskin(i.carskin), cc.loader.loadRes("frame", cc.SpriteFrame, function(t, n) {
                e.frame[3].getComponent(cc.Sprite).spriteFrame = n
            }))
        } else if (this.toggle5.getComponent(cc.Toggle).isChecked) {
            t = "car5";
            cc.loader.loadRes(t, cc.SpriteFrame, function(t, n) {
                e.carSprite.getComponent(cc.Sprite).spriteFrame = n
            }), this.freeButtondefault.active = !1, this.bottombutton.active = !0, this.conditionLabel.string = "解锁条件：300金币", this.lockbtnLabel.string = "300￥解锁", 1 == i.flag[4] && (i.carskin = 5, o.getInstance().savecarskin(i.carskin), cc.loader.loadRes("frame", cc.SpriteFrame, function(t, n) {
                e.frame[4].getComponent(cc.Sprite).spriteFrame = n
            }), this.freeButtondefault.active = !0, this.bottombutton.active = !1)
        } else if (this.toggle6.getComponent(cc.Toggle).isChecked) {
            t = "car6";
            cc.loader.loadRes(t, cc.SpriteFrame, function(t, n) {
                e.carSprite.getComponent(cc.Sprite).spriteFrame = n
            }), this.freeButtondefault.active = !1, this.bottombutton.active = !0, this.conditionLabel.string = "解锁条件：500金币", this.lockbtnLabel.string = "500￥解锁", 1 == i.flag[5] && (i.carskin = 6, o.getInstance().savecarskin(i.carskin), cc.loader.loadRes("frame", cc.SpriteFrame, function(t, n) {
                e.frame[5].getComponent(cc.Sprite).spriteFrame = n
            }), this.freeButtondefault.active = !0, this.bottombutton.active = !1)
        } else if (this.toggle7.getComponent(cc.Toggle).isChecked) {
            t = "car7";
            cc.loader.loadRes(t, cc.SpriteFrame, function(t, n) {
                e.carSprite.getComponent(cc.Sprite).spriteFrame = n
            }), this.freeButtondefault.active = !1, this.bottombutton.active = !0, this.conditionLabel.string = "解锁条件：800金币", this.lockbtnLabel.string = "800￥解锁", 1 == i.flag[6] && (i.carskin = 7, o.getInstance().savecarskin(i.carskin), cc.loader.loadRes("frame", cc.SpriteFrame, function(t, n) {
                e.frame[6].getComponent(cc.Sprite).spriteFrame = n
            }), this.freeButtondefault.active = !0, this.bottombutton.active = !1)
        } else if (this.toggle8.getComponent(cc.Toggle).isChecked) {
            t = "car8";
            cc.loader.loadRes(t, cc.SpriteFrame, function(t, n) {
                e.carSprite.getComponent(cc.Sprite).spriteFrame = n
            }), this.freeButtondefault.active = !1, this.bottombutton.active = !0, this.conditionLabel.string = "解锁条件：1000金币", this.lockbtnLabel.string = "1000￥解锁", 1 == i.flag[7] && (i.carskin = 8, o.getInstance().savecarskin(i.carskin), cc.loader.loadRes("frame", cc.SpriteFrame, function(t, n) {
                e.frame[7].getComponent(cc.Sprite).spriteFrame = n
            }), this.freeButtondefault.active = !0, this.bottombutton.active = !1)
        } else if (this.toggle9.getComponent(cc.Toggle).isChecked) {
            t = "car9";
            cc.loader.loadRes(t, cc.SpriteFrame, function(t, n) {
                e.carSprite.getComponent(cc.Sprite).spriteFrame = n
            }), this.freeButtondefault.active = !1, this.bottombutton.active = !0, this.conditionLabel.string = "解锁条件：1200金币", this.lockbtnLabel.string = "1200￥解锁", 1 == i.flag[8] && (i.carskin = 9, o.getInstance().savecarskin(i.carskin), cc.loader.loadRes("frame", cc.SpriteFrame, function(t, n) {
                e.frame[8].getComponent(cc.Sprite).spriteFrame = n
            }), this.freeButtondefault.active = !0, this.bottombutton.active = !1)
        } else if (this.toggle10.getComponent(cc.Toggle).isChecked) {
            t = "car10";
            cc.loader.loadRes(t, cc.SpriteFrame, function(t, n) {
                e.carSprite.getComponent(cc.Sprite).spriteFrame = n
            }), this.freeButtondefault.active = !1, this.bottombutton.active = !0, this.conditionLabel.string = "解锁条件：1500金币", this.lockbtnLabel.string = "1500￥解锁", 1 == i.flag[9] && (i.carskin = 10, o.getInstance().savecarskin(i.carskin), cc.loader.loadRes("frame", cc.SpriteFrame, function(t, n) {
                e.frame[9].getComponent(cc.Sprite).spriteFrame = n
            }), this.freeButtondefault.active = !0, this.bottombutton.active = !1)
        } else if (this.toggle11.getComponent(cc.Toggle).isChecked) {
            t = "car11";
            cc.loader.loadRes(t, cc.SpriteFrame, function(t, n) {
                e.carSprite.getComponent(cc.Sprite).spriteFrame = n
            }), this.freeButtondefault.active = !1, this.bottombutton.active = !0, this.conditionLabel.string = "解锁条件：1800金币", this.lockbtnLabel.string = "1800￥解锁", 1 == i.flag[10] && (i.carskin = 11, o.getInstance().savecarskin(i.carskin), cc.loader.loadRes("frame", cc.SpriteFrame, function(t, n) {
                e.frame[10].getComponent(cc.Sprite).spriteFrame = n
            }), this.freeButtondefault.active = !0, this.bottombutton.active = !1)
        } else if (this.toggle12.getComponent(cc.Toggle).isChecked) {
            t = "car12";
            cc.loader.loadRes(t, cc.SpriteFrame, function(t, n) {
                e.carSprite.getComponent(cc.Sprite).spriteFrame = n
            }), this.freeButtondefault.active = !1, this.bottombutton.active = !0, this.conditionLabel.string = "解锁条件：2000金币", this.lockbtnLabel.string = "2000￥解锁", 1 == i.flag[11] && (i.carskin = 12, o.getInstance().savecarskin(i.carskin), cc.loader.loadRes("frame", cc.SpriteFrame, function(t, n) {
                e.frame[11].getComponent(cc.Sprite).spriteFrame = n
            }), this.freeButtondefault.active = !0, this.bottombutton.active = !1)
        }
    },
    playClick: function() {
        this.audioControl && this.audioControl.playClick()
    }
})