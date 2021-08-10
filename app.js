 App({
    onLaunch: function(e) {
        var t = require("utils/onfire.js"), a = this;
        a.login(), wx.getSystemInfo({
            success: function(e) {
                a.globalData.systemInfo = e;
            }
        }), wx.getLocation({
            success: function(e) {
                a.globalData.locationInfo = e, t.fire("location", e);
            }
        });
    },
    onShow: function() {
        
        var e = require("utils/onfire.js"), t = getCurrentPages();
        t.length && t[t.length - 1].route.indexOf("errand/_/index") >= 0 && e.fire("refreshHomeOrders");
    },
    id: "wx5e995d4fe55d71df",
   baiduMapAK: "Mt6GbfGhB7GDW0pKMog9XMq9tQYZYM6i",
    globalData: {
      siteUrl: "https://bbtx.jianpuzhan.com",
        isDebugger: !1,
        disableLoading: !1,
        userInfo: null,
        locationInfo: null,
        schoolInfo: null,
        settingInfo: null,
        systemInfo: {}
    },
    pageSize: 10,
    require: require,
    getSettings: function() {
        return this.getStorage("settings");
    },
    getStorage: function(e) {
        var t = wx.getStorageSync(e) || {};
        return t.save = function() {
            var t = {};
            for (var a in this) "save" != a && (t[a] = this[a]);
            wx.setStorageSync(e, t);
        }, t;
    },
    login: function() {
        var e = this, t = (require("utils/util.js"), require("utils/api.js")), a = require("utils/onfire.js"), n = function(n) {
            t.loginWechat({
                code: n || "",
                referrerId: ""
            }, function(t) {
                var n = e.getSettings();
                n.SessionId = t.SessionId, n.UserType = t.Type, n.session_key = t.session_key,n.save(), e.globalData.userInfo = t, 
                a.fire("login", t);
            }, function(t) {
                
            });
        };
        wx.login({
            success: function(e) {
                n(e.code);
            }
        });
    },
    authorizeCallback: function(e, t) {
        var a = this, n = require("utils/util.js"), r = require("utils/api.js"), i = {
            AvatarUrl: t.avatarUrl,
            NickName: t.nickName,
            Gender: t.gender
        };
        return a.globalData.userInfo || (a.globalData.userInfo = {}), a.globalData.userInfo.AvatarUrl == i.AvatarUrl && a.globalData.userInfo.NickName == i.NickName && a.globalData.userInfo.Gender == i.Gender || r.updateWechatInfo({
            NickName: i.NickName,
            AvatarUrl: i.AvatarUrl,
            Gender: i.Gender
        }), n.extend(a.globalData.userInfo, i), e.data.userInfo ? e.setData({
            dialogType: null,
            userInfo: i
        }) : e.setData({
            dialogType: null
        }), i;
    },
    callAuthorize: function(e, t) {
        var a = this, n = a.globalData.userInfo;
        n && (n.NickName || n.AvatarUrl) && e.setData({
            dialogType: null
        });
        var r = function() {
            wx.getUserInfo({
                success: function(n) {
                    var r = a.authorizeCallback(e, n.userInfo);
                    t && t(r);
                }
            });
        };
        wx.getSetting({
            success: function(t) {
               console.log("执行了getset");
                t.authSetting["scope.userInfo"] ? r() : e.setData({
                    dialogType: "authorize"
                });
            }
        });
    }
});