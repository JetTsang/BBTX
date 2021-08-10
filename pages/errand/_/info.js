var e = getApp(), o = (e.require("utils/util.js"), e.require("utils/api.js")), t = e.require("utils/enums.js"), n = e.require("utils/onfire.js"), i = !1, r = !1, a = !1, u = {}, s = {};

Page({
    data: {
        errandWeights: t.ErrandWeights,
        model: {}
    },
    onLoad: function(e) {
        u = e, this.loadData(e);
    },
    onReady: function() {
        var o = this;
        e.callAuthorize(o, function() {
            i = !0, r && !a && 1 == e.globalData.userInfo.Type && u.submit && (a = !0, setTimeout(o.onSubmit, 200));
        });
    },
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {},
    onAuthorizeCallback: function(o) {
        var t = this;
        o.detail && o.detail.userInfo && e.authorizeCallback(t, o.detail.userInfo);
    },
    loadData: function(t) {
        var d = this;
        o.orderAcceptInfo({
            id: t.id
        }, function(o) {
            r = !0, s = o, d.setData({
                model: s
            }), t && o.Status != t.status && n.fire("refreshHomeOrders"), i && !a && 1 == e.globalData.userInfo.Type && u.submit && (a = !0, 
            setTimeout(d.onSubmit, 200));
        });
    },
    onVerifiedTap: function() {
        0 == s.VerifiedStatus ? wx.navigateTo({
            url: "../../mine/info/auth"
        }) : wx.navigateTo({
            url: "../../common/result/fail?title=" + encodeURIComponent("认证审核失败") + "&button=" + encodeURIComponent("重新认证") + "&remark=" + encodeURIComponent(s.VerifyRemark)
        });
    },
    onSecretTap: function() {
        wx.showModal({
            title: "温馨提示 ",
            content: "已将此订单设为私密。除你本人与接单的小伙伴以外，其他用户看不到此订单。",
            showCancel: !1,
            confirmText: "我知道了"
        });
    },
    onOrderDetailTap: function() {
        wx.navigateTo({
            url: "../../order/_/info?id=" + s.Id
        });
    },
    onSubmit: function(e) {
        o.userSaveFormId({
            formId: e.detail.formId
        });
        var t = this;
        wx.showModal({
            title: "接单确认",
            confirmColor: "#FBD40A",
            content: "成功接单后，请不要轻易主动取消订单，特殊原因需要取消请与发起人联系。",
            success: function(e) {
                e.confirm && o.orderAccept({
                    id: u.id
                }, function() {
                    n.fire("refreshHomeOrders"), s.Status = 16, t.setData({
                        model: s
                    }), wx.navigateTo({
                        url: "../../order/_/info?id=" + u.id
                    });
                });
            }
        });
    }
});