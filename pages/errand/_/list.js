var e = getApp(), t = (e.require("utils/util.js"), e.require("utils/api.js")), a = e.require("utils/enums.js"), n = 0, r = -1, o = [];

Page({
    data: {
        errandTypes: a.ErrandTypes,
        typeIndex: r,
        lastPage: !1,
        model: o
    },
    onLoad: function(e) {
        var t = [];
        t.push({
            Name: "外卖跑腿",
            Value: 2048
        });

        console.log(a.ErrandTypes);

        for (var n in a.ErrandTypes) t.push(a.ErrandTypes[n]);
        this.setData({
            errandTypes: t
        }), this.loadData(e);
    },


    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        n = 0, this.loadData(null, wx.stopPullDownRefresh, wx.stopPullDownRefresh);
    },
    onReachBottom: function() {
        this.data.lastPage || this.loadData({
            pageIndex: ++n
        });
    },
    onShareAppMessage: function() {},
    loadData: function(a, n, r) {
        var s = this;
        t.orderErrandList(a, function(t) {
          if (a && a.pageIndex) for (var r in t) o.push(t[r]); else o = t.list;
            s.setData({
                lastPage: t.length < e.pageSize,
                model: o,
                errandTypes: t.cates
            }), n && n();
        }, function() {
            r && r();
        });
    },
    onCategoryItemTap: function(e) {
        var t = this;
        r = e.currentTarget.dataset.index;
        var a = t.data.errandTypes, n = r < 0 ? 0 : a[r].Value;
        this.loadData({
            stype: n
        }), t.setData({
            typeIndex: r
        });
    },
    onItemTap: function(e) {
        var t = e.currentTarget.dataset.index, a = o[t];
        a.IsSecret && 0 == a.Remark.replace(/(私密订单|\*)/g, "").length ? wx.showModal({
            title: "温馨提示 ",
            content: "已将此订单设为私密，你无法查看此订单信息。",
            showCancel: !1,
            confirmText: "我知道了"
        }) : wx.navigateTo({
            url: (a.DelivererUserId > 0 ? "../../order/_/info?id=" : "info?id=") + a.Id + "&status=" + a.Status
        });
    },
    onItemSubmitTap: function(e) {
        var t = e.currentTarget.dataset.index, a = o[t];
        a.IsSecret && 0 == a.Remark.replace(/(私密订单|\*)/g, "").length ? wx.showModal({
            title: "温馨提示 ",
            content: "已将此订单设为私密，你无法查看此订单信息。",
            showCancel: !1,
            confirmText: "我知道了"
        }) : wx.navigateTo({
            url: "info?id=" + a.Id + (2 != a.Status || a.IsForbiddenAccept ? "" : "&submit=true")
        });
    }
});