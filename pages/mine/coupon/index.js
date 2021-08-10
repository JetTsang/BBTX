var i = getApp(), n = (i.require("utils/util.js"), i.require("utils/api.js")), t = i.require("utils/onfire.js"), e = [];

Page({
    data: {
        invalid: 0,
        model: e
    },
    onLoad: function(i) {
        this.setData({
            invalid: !!i.invalid
        }), i.invalid && wx.setNavigationBarTitle({
            title: "无效红包"
        }), this.loadData(i);
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {
        var i = [];
        for (var n in e) e[n].isSelected && i.push(e[n]);
        t.fire("CouponSelect", i), t.un("CouponLoad");
    },
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {},
    loadData: function(i) {
        var o = this, a = function(n) {
            for (var t in n) i.money && (n[t].invalid = i.money < n[t].MoneyLimit, !n[t].invalid && i.ids && i.ids.split(",").indexOf(n[t].Id) >= 0 && (n[t].isSelected = !0)), 
            e.push(n[t]);
            o.setData({
                model: e
            });
        };
        i.list ? t.one("CouponLoad", function(i) {
            a(i);
        }) : n.couponList({
            valid: !i.invalid
        }, function(i) {
            a(i);
        });
    },
    onItemTap: function(i) {
        var n = this, t = i.currentTarget.dataset.index;
        e[t].invalid || (e[t].isSelected = !e[t].isSelected, n.setData({
            model: e
        }));
    }
});