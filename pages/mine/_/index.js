var e = getApp(), a = e.require("utils/util.js"), o = e.require("utils/api.js"), t = e.require("utils/onfire.js"), n = (e.require("utils/enums.js"), 
!1), i = {
    VerifyStatus: 2
};

Page({
    data: {
        model: i,
        userInfo: {},
        longTapAvatar: !1,
        canIUse: wx.canIUse("button.open-type.getUserInfo")
    },
    onLoad: function(e) {
        var a = this;
        a.loadData(), t.on("studentAuthApplied", function() {
            a.loadData();
        });
    },
    onReady: function() {
        n = !0;
    },
    onShow: function() {
        var a = this;
        a.setData({
            longTapAvatar: !1
        }), e.callAuthorize(a), n && a.loadData(), t.fire("hideIndexDialog");
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {},
    onAuthorizeCallback: function(a) {
        var o = this;
        a.detail && a.detail.userInfo && e.authorizeCallback(o, a.detail.userInfo);
    },
    loadData: function() {
        var e = this;
        o.homeMine(function(a) {
            e.setData({
                model: a
            });
        });
    },
    onAuthTap: function() {
        var e = this;
        wx.navigateTo({
            url: 0 == e.data.model.VerifyStatus ? "../info/auth" : 3 == e.data.model.VerifyStatus ? "../../common/result/fail?title=" + encodeURIComponent("认证审核失败") + "&button=" + encodeURIComponent("重新认证") + "&remark=" + encodeURIComponent(e.data.model.VerifyRemark) : "../info/student"
        });
    },
    onAvatarTap: function() {
        var e = this;
        e.data.longTapAvatar || wx.navigateTo({
            url: "../info/index?status=" + e.data.model.VerifyStatus
        }), e.setData({
            longTapAvatar: !1
        });
    },
    onAvatarLongTap: function() {
        if (e.globalData.userInfo && (4 | e.globalData.userInfo.Type) == e.globalData.userInfo.Type) {
            this.setData({
                longTapAvatar: !0
            });
            var a = "/sys/home?sessionId=" + e.globalData.userInfo.SessionId;
            wx.navigateTo({
                url: "../../common/content/web?headerForeColor=" + encodeURIComponent("#000000") + "&headerBgColor=" + encodeURIComponent("#fff") + "&title=" + encodeURIComponent("管理后台") + "&url=" + encodeURIComponent(a)
            });
        }
    },
    onServicePhoneTap: function() {
        var e = this;
        wx.makePhoneCall({
            phoneNumber: e.data.model.ServicePhone
        });
    },
    onServiceDescTap: function() {
        var e = this.data.model.ServiceDesc.match(/[\d]{5,}/);
        e && e.length && wx.showActionSheet({
            itemList: [ "复制" ],
            success: function() {
                wx.setClipboardData({
                    data: e[0],
                    success: function() {
                        a.toast("成功复制到剪贴板");
                    }
                });
            }
        });
    }
});