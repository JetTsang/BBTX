var e = getApp(), a = e.require("utils/util.js"), t = e.require("utils/api.js"), n = e.require("utils/enums.js"), i = e.require("utils/onfire.js"), r = new Date(), o = a.makeArray(1, 24), d = [], s = null, u = [ [], [] ], l = {
    MinFreightMoney: 1
}, m = null, c = !1, p = !1;

Page({
    data: {
        isBusy: !1,
        dialogType: null,
        errandType: n.ErrandTypes[0],
        errandGenderLimit: n.ErrandGenderLimits[0],
        moneyPayable: l.MinFreightMoney,
        moneyPackage: 0,
        delivererIndex: 0,
        deliveryTimes: u,
        deliveryTimeIndex: [ 0, 0 ],
        deliveryTimeValue: {
            text: "即刻出发",
            value: null
        },
        address: null,
        carts: {},
        expiredTimes: o,
        expiredIndex: o.length - 1,
        expiredValue: 24,
        remarkValue: null,
        couponValidCount: 0,
        couponValue: null,
        popupType: "none",
        acceptAgreement: !0,
        expiredTime: null,
        model: l,
        cate_id: '',
    },
    onLoad: function(a){

        this.setData({
          cate_id: a.cate_id
        });

        s = a;
        var t = e.getStorage("homeData");
        if (t.model && t.model.SettingInfo) {
            var n = t.model.SettingInfo.MinFreightMoney;
            n != l.MinFreightMoney && (l.MinFreightMoney = n), this.setData({
                moneyPayable: n
            });
        }
        this.loadData(a);
    },
    onReady: function() {
        var a = this;
        e.callAuthorize(a, function() {
            p = !0;
        });
    },
    onShow: function() {
        i.un("commonInput"), e.getStorage("cart")[s.id] || wx.navigateBack(), this.setData({
            isBusy: !1
        });
    },
    onHide: function() {
        wx.hideLoading();
    },
    onUnload: function() {
        i.un("selectAddress");
    },
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {},
    onAuthorizeCallback: function(a) {
        var t = this;
        if (a.detail && a.detail.userInfo) {
            t.setData({
                dialogType: null
            });
            e.authorizeCallback(t, a.detail.userInfo);
        }
    },
    loadData: function(n) {
        var i = this, r = e.getStorage("cart")[n.id];
        i.setData({
            carts: r
        }), t.orderTakeoutPrepare({
            shopId: n.id,
            groupId: n.groupId || 0
        }, function(e) {
            c = !0, l = e, u = i.getPickerTimes(0, l.ErrandTimeRangeBegin || "8:00", l.ErrandTimeRangeEnd || "22:00");
            var t = 0;
            if (l.MoneyPackage && r.Items) {
                var n = 0;
                for (var o in r.Items) n += r.Items[o].Quantity;
                t = a.decimal.multiply(l.MoneyPackage, n);
            }
            l.AddressInfo && (l.AddressInfo.self = !0), i.setData({
                model: l,
                moneyPackage: t,
                address: l.AddressInfo,
                deliveryTimes: u
            }), i.updateMoneyPayable();
        });
    },
    updateMoneyPayable: function() {
        var e = this, t = l.MinFreightMoney;
        1 == e.data.delivererIndex && (t = a.decimal.add(t, e.data.model.DiffSpDevPrice)), 
        e.data.couponInfo && (t = a.decimal.subtract(t, e.data.couponInfo.Money));
        var n = 0;
        for (var i in e.data.carts.Items) {
            var r = e.data.carts.Items[i];
            t = a.decimal.add(t, a.decimal.multiply(r.Quantity, r.Price)), n += r.Quantity;
        }
        t = a.decimal.add(t, (l.MoneyPackage || 0) * n), e.setData({
            moneyPayable: t > 0 ? t : 0
        });
    },
    onAddressTap: function(e) {
        t.userSaveFormId({
            formId: e.detail.formId
        });
        var a = this, n = [ "user" ];
        i.un("selectAddress"), i.on("selectAddress", function(e) {
            a.setData({
                address: e
            });
        }), wx.navigateTo({
            url: "../../common/location/select?index=1&tabs=" + n.join(",")
        });
    },
    onDelivererChange: function(e) {
        var t = this, n = parseInt(e.detail.value);
        4 == t.data.errandType.Value && (n = 1, a.toast("目前代寄物品仅限平台专员配送")), t.setData({
            delivererIndex: n
        }), t.updateMoneyPayable();
    },
    getPickerTimes: function(e, t, n) {
        var i = [ [], [] ];
        t = t || "00:00", n = n || "23:30", i[0].push({
            text: "今天",
            value: 0
        });
        for (y = 0; y < l.ErrandTimeRangeDays - 1; ++y) {
            var o = 0 == y ? "明天" : 1 == y ? "后天" : "";
            i[0].push({
                text: (o.length ? o + "（" : o) + a.formatDate(a.addDate(r, y + 1)) + (o.length ? "）" : o),
                value: y + 1
            });
        }
        var d = null;
        if (e) {
            var s = a.addDate(r, 1), u = parseInt(t.split(":")[0]), m = parseInt(t.split(":")[1]);
            d = new Date(s.getFullYear(), s.getMonth(), s.getDate(), u, m, 0);
        } else {
            d = a.addDate(r, 30, "m"), i[1].push({
                text: "即刻出发",
                value: null
            });
            var c = 30 - d.getMinutes() % 30;
            d = a.addDate(a.addDate(d, c, "m"), -d.getSeconds(), "s");
        }
        for (var p = parseInt(n.split(":")[0]), f = parseInt(n.split(":")[1]), v = new Date(d.getFullYear(), d.getMonth(), d.getDate(), p, f, 0), g = d, y = 0; g < v; y++) g = a.addDate(d, 30 * y, "m"), 
        i[1].push({
            text: a.formatDate(g, "minute", "time"),
            value: g
        });
        return i;
    },
    onDeliveryTimeChange: function(e) {
        var a = this, t = e.detail.value[0], n = e.detail.value[1];
        u[0][t], u[1][e.detail.value[1]];
        a.setData({
            deliveryTimeValue: {
                text: (0 == t && 0 == n ? "" : u[0][t].text + " ") + u[1][n].text,
                value: u[1][n].value
            }
        });
    },
    onDeliveryTimeColumnChange: function(e) {
        if (0 == e.detail.column) {
            var a = this, t = a.getPickerTimes(e.detail.value, a.data.model.ErrandTimeRangeBegin || "8:00", a.data.model.ErrandTimeRangeEnd || "22:00");
            u.splice(0, u.length), u.push(t[0]), u.push(t[1]), a.setData({
                deliveryTimes: u
            });
        }
    },
    onExpiredTap: function() {
        this.setData({
            popupType: "expired"
        });
    },
    onPopupCancel: function() {
        this.setData({
            popupType: "none"
        });
    },
    onPopupConfirm: function() {
        var e = this, a = e.data.popupType;
        setTimeout(function() {
            e.setData({
                popupType: "none"
            }), setTimeout(function() {
                "expired" == a ? e.setData({
                    expiredValue: o[e.data.expiredIndex]
                }) : "remark" == a && e.setData({
                    remarkValue: m
                });
            }, 200);
        }, 50);
    },
    onExpiredSliderChange: function(e) {
        this.setData({
            expiredIndex: e.detail.value
        });
    },
    onLimitTap: function(e) {
        var a = this;
        wx.showActionSheet({
            itemList: n.getNames(n.ErrandGenderLimits),
            success: function(e) {
                a.setData({
                    errandGenderLimit: n.ErrandGenderLimits[e.tapIndex]
                });
            },
            fail: function(e) {
                console.log(e.errMsg);
            }
        });
    },
    onRemarkTap: function() {
        var e = this;
        i.on("commonInput", function(a) {
            e.setData({
                remarkValue: a
            });
        }), wx.navigateTo({
            url: "../../common/content/input?title=备注&placeholder=口味、偏好等要求&value=" + (e.data.remarkValue || "")
        });
    },
    onRemarkContentChanged: function(e) {
        m = e.detail.value;
    },
    onCouponTap: function() {
        var e = this;
        i.un("CouponSelect"), i.one("CouponSelect", function(t) {
            var n = 0;
            d.splice(0, d.length);
            for (var i in t) n = a.decimal.add(n, t[i].Money), d.push(t[i]);
            e.setData({
                couponValue: n
            });
        }), wx.navigateTo({
            url: "../../mine/coupon/index?list=true"
        }), i.fire("CouponLoad", e.data.model.Coupons);
    },
    onFormSubmit: function(r) {
        var o = this;
        if (p) if (t.userSaveFormId({
            formId: r.detail.formId
        }), e.globalData.userInfo && e.globalData.userInfo.Mobile) {
            var u = [], m = 0;
            for (var c in o.data.carts.Items) {
                var f = o.data.carts.Items[c];
                u.push({
                    CommodityId: f.Id,
                    Money: f.Money,
                    Price: f.Price,
                    Quantity: f.Quantity
                }), m = a.decimal.add(m, a.decimal.multiply(f.Price, f.Quantity));
            }
            var v = {
                cate_id: o.data.cate_id,
                Type: n.OrderTypes[0].Value,
                Money: m,
                MoneyFreight: l.MinFreightMoney,
                LimitDeliverer: o.data.delivererIndex + 1,
                LimitDelivererGender: o.data.errandGenderLimit.Value,
                ShopId: s.id,
                GroupId: s.groupId,
                Items: u,
                OrderAddressList: [ {
                    AddressId: o.data.address.Id,
                    Address: o.data.address.Linkman + "(" + o.data.address.Phone + ")",
                    Description: o.data.address.Address,
                    Longitude: o.data.address.Longitude,
                    Latitude: o.data.address.Latitude,
                    IsUserAddress: !!o.data.address.self,
                    IsOutSide: o.data.address.IsOutSide
                } ],
                CouponList: [],
                ExpectTime: o.data.deliveryTimeValue && o.data.deliveryTimeValue.value,
                ExpiredMinutes: 60 * o.data.expiredValue,
                MoneyPayment: o.data.moneyPayable,
                Remark: o.data.remarkValue || ""
            };
            for (var c in d) v.CouponIds.push(d[c].Id);
            if (v.OrderAddressList.length) {
                var g = function() {
                    var a = e.getStorage("cart");
                    delete a[s.id], a.save();
                };
                o.setData({
                    isBusy: !0
                }), t.orderCommit(v, function(e) {
                    t.orderPayment({
                        id: e
                    }, function(a) {
                        g(), !0 === a ? (i.fire("refreshHomeOrders"), wx.navigateTo({
                            url: "../../order/_/info?createorder=true&id=" + e
                        })) : !1 === a ? wx.navigateTo({
                            url: "../../order/_/paycomplete?id=" + e
                        }) : wx.navigateTo({
                            url: "../../order/_/info?createorder=true&id=" + e
                        });
                    }, function() {
                        g(), wx.navigateTo({
                            url: "../../order/_/info?createorder=true&id=" + e
                        });
                    });
                }, function() {
                    o.setData({
                        isBusy: !1
                    });
                });
            } else a.toast("请选择配送地址");
        } else wx.navigateTo({
            url: "../../mine/info/bindmobile"
        }); else e.callAuthorize(o, function() {
            p = !0;
        });
    },
    onServiceContractLink: function() {
        var e = this;
        wx.navigateTo({
            url: "../../common/content/web?url=" + encodeURIComponent("/article/info?id=" + e.data.model.ErrandServiceArticleId)
        });
    }
});