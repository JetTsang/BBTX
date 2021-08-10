var e = getApp(), a = e.require("utils/util.js"), t = e.require("utils/api.js"), n = e.require("utils/enums.js"), r = e.require("utils/onfire.js"), i = null, d = a.makeArray(1, 24), s = [], o = [], u = null, l = [ [], [] ], p = {
    MinFreightMoney: 1
}, f = n.ErrandTypes[3], h = !1, c = !1;

Page({
    data: {
        isBusy: !1,
        dialogType: null,
        errandType: f,
        errandGenderLimit: n.ErrandGenderLimits[0],
        errandWeights: n.ErrandWeights,
        weightIndex: 0,
        weightValue: null,
        freights: [],
        freightIndex: 0,
        freightValue: null,
        feeInputFocus: !1,
        feeInputValue: 0,
        moneyValue: null,
        moneyInputValue: null,
        moneyInputFocus: !1,
        moneyPayable: p.MinFreightMoney,
        deliveryTimes: l,
        deliveryTimeIndex: [ 0, 0 ],
        deliveryTimeValue: {
            text: "即刻出发",
            value: null
        },
        expiredTimes: d,
        expiredIndex: d.length - 1,
        expiredValue: 24,
        remarkValue: null,
        remarkPlaceHolder: null,
        remarkInputFocus: !1,
        addresses: s,
        addressAdd: !1,
        couponValidCount: 0,
        couponValue: null,
        popupType: "none",
        acceptAgreement: !0,
        expiredTime: null,
        isSpecial: !1,
        model: p,
        cate_id : '',
    },

    onLoad: function(a) {
        this.setData({
          cate_id: a.cate_id
        });

        i = new Date();
        var t = e.getStorage("homeData");
        if (t.model && t.model.SettingInfo) {
            var n = t.model.SettingInfo, r = n.MinFreightMoney;
            r != p.MinFreightMoney && (p.MinFreightMoney = r);
            var d = !1;
            a.type && (d = (n.NormalDeliveryAllowOrderTypes | 2 * a.type) != n.NormalDeliveryAllowOrderTypes), 
            this.setData({
                moneyPayable: r,
                isSpecial: d
            });
        }
        u = a, a.remark && this.setData({
            remarkPlaceHolder: a.remark
        }), this.loadData(a),this.onErrandTypeChange(a);
    },
    onReady: function() {
        var a = this;
        e.callAuthorize(a, function() {
            c = !0, a.setData({
                remarkInputFocus: h && c && !u.type
            });
        });
    },
    onShow: function() {
        this.setData({
            isBusy: !1
        });
    },
    onHide: function() {
        wx.hideLoading();
    },
    onUnload: function() {
        r.un("selectAddress");
    },
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
    loadData: function() {
        var e = this, n = a.makeArray(1, 6);
        t.orderErrandPrepare(function(a){
            console.log(a.cates);
            h = !0, p = a, l = e.getPickerTimes(0, p.ErrandTimeRangeBegin || "8:00", p.ErrandTimeRangeEnd || "22:00"), 
            e.setData({
                model: p,
                freightValue: p.MinFreightMoney,//修复bug
                freights: n,
                remarkInputFocus: h && c && !u.type,
                deliveryTimes: l,
                errandType: a.cates
            }), e.updateMoneyPayable();
        });
    },
    updateMoneyPayable: function() {
        var e = this, t = e.data.freightValue || p.MinFreightMoney;
        e.data.couponInfo && (t = a.decimal.subtract(t, e.data.couponInfo.Money)), e.setData({
            moneyPayable: t > 0 ? t : 0
        });
    },
    onErrandTypeChange: function(e) {

        var t = this, r = u.type || f.Value, i = a.indexOfArray(n.ErrandTypes, function(e) {
            return r == e.Value;
        }), d = !1;


      console.log('==onErrandTypeChange==');
      console.log(t);

        if (s.splice(0, s.length), i == n.ErrandTypes.length - 1) d = !0, s.push({
            self: null,
            text: "地点在哪里",
            address: null
        }); else switch (i) {
          case 0:
            s.push({
              self: !1,
              text: "在哪里购买（必填）",
              address: null
            }), s.push({
              self: !0,
              text: "送到哪里去（必填）",
              address: p.AddressInfo
            });
            break;

          case 1:
            s.push({
              self: !1,
              text: "在哪里取物品（必填）",
              address: null
            }), s.push({
              self: !0,
              text: "送到哪里去（必填）",
              address: p.AddressInfo
            });
            break;

          case 2:
            s.push({
              self: !0,
              text: "在哪里取物品（必填）",
              address: p.AddressInfo
            }), s.push({
              self: !1,
              text: "送到哪里去（必填）",
              address: null
            });
            break;

          case 3:
            s.push({
              self: !0,
              text: "在哪里（必填）",
              address: p.AddressInfo
            }), s.push({
              self: !1,
              text: "到哪里去（必填）",
              address: null
            });
            break;

          case 4:
            s.push({
              self: !0,
              text: "在哪里（必填）",
              address: p.AddressInfo
            }), s.push({
              self: !1,
              text: "到哪里去（必填）",
              address: null
            });
            break;

          case 5:
            s.push({
              self: !0,
              text: "在哪里（必填）",
              address: p.AddressInfo
            }), s.push({
              self: !1,
              text: "到哪里去（必填）",
              address: null
            });
            break;

          case 6:
            s.push({
              self: !0,
              text: "在哪里（必填）",
              address: p.AddressInfo
            }), s.push({
              self: !1,
              text: "到哪里去（必填）",
              address: null
            });
            break;

          case 7:
            s.push({
              self: !0,
              text: "在哪里（必填）",
              address: p.AddressInfo
            }), s.push({
              self: !1,
              text: "到哪里去（必填）",
              address: null
            });
            break;

          case 1024:
            s.push({
              self: !0,
              text: "在哪里（必填）",
              address: p.AddressInfo
            }), s.push({
              self: !1,
              text: "到哪里去（必填）",
              address: null
            });

          default:
            s.push({
              self: !0,
              text: "在哪里（必填）",
              address: p.AddressInfo
            }), s.push({
              self: !1,
              text: "到哪里去（必填）",
              address: null
            });
        }

        console.log('=======n.ErrandTypes[i]==========');
        console.log(n.ErrandTypes);


        t.setData({
            addressAdd: d,
            addresses: s,

            errandType: n.ErrandTypes[i]
        });
    },
    onTypeTap: function(e) {

        console.log('userSaveFormId');

        t.userSaveFormId({
            formId: e.detail.formId
        });
        var a = this;
        wx.showActionSheet({
            itemList: n.getNames(n.ErrandTypes),
            success: function(e) {
                a.onErrandTypeChange({
                    type: n.ErrandTypes[e.tapIndex].Value
                });
            }
        });
    },
    onRemarkConfirm: function(e) {
        this.setData({
            remarkValue: e.detail.value
        });
    },
    onMoneyTap: function() {
        var e = this;
        setTimeout(function() {
            e.setData({
                popupType: "money",
                moneyInputValue: e.data.moneyValue || 0
            }), setTimeout(function() {
                e.setData({
                    moneyInputFocus: !0
                });
            }, 300);
        }, 300);
    },
    onMoneyInputBlur: function(e) {
        this.setData({
            moneyInputValue: e.detail.value && e.detail.value.length ? e.detail.value : 0
        });
    },
    onAddressTap: function(e) {

      
      console.log('onAddressTap');
      console.log(e);


        t.userSaveFormId({
            formId: e.detail.formId
        });


        var a = this, i = e.currentTarget.dataset.self, d = e.currentTarget.dataset.index, o = 0, u = [];
        !0 === i && (o = 1, u.push("user")), !1 === i && u.push("common,nearest"), r.un("selectAddress"), 
        r.on("selectAddress", function(e) {
            s[d].address = e, d == s.length - 1 && a.data.errandType.Value == n.ErrandTypes[n.ErrandTypes.length - 1].Value && s.push({
                self: null,
                text: "然后到哪里去",
                address: null
            }), a.setData({
                addresses: s
            });
        }), wx.navigateTo({
            url: "../../common/location/select?index=" + o + "&tabs=" + u.join(",")
        });
    },
    onAddressAddTap: function(e) {

        t.userSaveFormId({
          formId: e.detail.formId
        });

        var a = this, t = e.currentTarget.dataset.index;
        void 0 !== t && (t == s.length - 1 ? s.push({
            self: !1,
            text: "然后到哪里去",
            address: null
        }) : (0 == t && (s[t + 1].text = s[t].text), s.splice(t, 1)), a.setData({
            addresses: s
        }));
    },
    getPickerTimes: function(e, t, n) {
        var r = [ [], [] ];
        t = t || "00:00", n = n || "23:30", r[0].push({
            text: "今天",
            value: 0
        });
        for (v = 0; v < p.ErrandTimeRangeDays - 1; ++v) {
            var d = 0 == v ? "明天" : 1 == v ? "后天" : "";
            r[0].push({
                text: (d.length ? d + "（" : d) + a.formatDate(a.addDate(i, v + 1)) + (d.length ? "）" : d),
                value: v + 1
            });
        }
        var s = null;
        if (e) {
            var o = a.addDate(i, 1), l = parseInt(t.split(":")[0]), f = parseInt(t.split(":")[1]);
            s = new Date(o.getFullYear(), o.getMonth(), o.getDate(), l, f, 0);
        } else {
            s = a.addDate(i, 30 * (4 == u.type ? 1 : 2), "m"), r[1].push({
                text: "即刻出发",
                value: null
            });
            var h = 30 - s.getMinutes() % 30;
            s = a.addDate(a.addDate(s, h, "m"), -s.getSeconds(), "s");
        }
        for (var c = parseInt(n.split(":")[0]), g = parseInt(n.split(":")[1]), m = new Date(s.getFullYear(), s.getMonth(), s.getDate(), c, g, 0), y = s, v = 0; y < m; v++) y = a.addDate(s, 30 * v, "m"), 
        r[1].push({
            text: a.formatDate(y, "minute", "time"),
            value: y
        });
        return r;
    },
    onDeliveryTimeChange: function(e) {
        var a = this, t = e.detail.value[0], n = e.detail.value[1];
        l[0][t], l[1][e.detail.value[1]];
        a.setData({
            deliveryTimeValue: {
                text: (0 == t && 0 == n ? "" : l[0][t].text + " ") + l[1][n].text,
                value: l[1][n].value
            }
        });
    },
    onDeliveryTimeColumnChange: function(e) {
        if (0 == e.detail.column) {
            var a = this, t = a.getPickerTimes(e.detail.value, a.data.model.ErrandTimeRangeBegin || "8:00", a.data.model.ErrandTimeRangeEnd || "22:00");
            l.splice(0, l.length), l.push(t[0]), l.push(t[1]), a.setData({
                deliveryTimes: l
            });
        }
    },
    onWeightTap: function() {
        var e = this;
        e.setData({
            popupType: "weight",
            weightIndex: e.data.weightValue ? a.indexOfArray(n.ErrandWeights, function(a) {
                return a.Value == e.data.weightValue;
            }) : 0
        });
    },
    onExpiredTap: function() {
        var e = this;
        e.setData({
            popupType: "expired",
            weightIndex: e.data.weightValue ? a.indexOfArray(n.ErrandWeights, function(a) {
                return a.Value == e.data.weightValue;
            }) : 0
        });
    },
    onFreightTap: function() {
        var e = this;
        e.setData({
            popupType: "freight",
            freightIndex: e.data.freightValue ? e.data.freights.indexOf(e.data.freightValue) : 0,
            feeInputFocus: !(!e.data.freightValue || !e.data.freights.indexOf(e.data.freightValue)),
            feeInputValue: e.data.freightValue && e.data.freights.indexOf(e.data.freightValue) < 0 ? e.data.freightValue : 0
        });
    },
    onPopupCancel: function() {
        this.setData({
            popupType: "none"
        });
    },
    onPopupConfirm: function() {
        var e = this, t = e.data.popupType;
        setTimeout(function() {
            if ("money" == t) {
                if ("" == e.data.moneyInputValue) return void a.toast("请输入金额");
            } else if ("tip" == t && e.data.freightIndex < 0 && !e.data.feeInputValue) return void a.toast("请输入小费金额");
            e.setData({
                popupType: "none",
                feeInputFocus: !1,
                moneyInputFocus: !1
            }), setTimeout(function() {
                "money" == t ? e.setData({
                    moneyValue: parseInt(e.data.moneyInputValue)
                }) : "weight" == t ? e.setData({
                    weightValue: n.ErrandWeights[e.data.weightIndex].Value
                }) : "expired" == t ? e.setData({
                    expiredValue: d[e.data.expiredIndex]
                }) : "freight" == t && (e.setData({
                    freightValue: e.data.freightIndex < 0 ? e.data.feeInputValue < p.MinFreightMoney ? p.MinFreightMoney : Math.floor(e.data.feeInputValue) : e.data.freights[e.data.freightIndex]
                }), e.updateMoneyPayable());
            }, 200);
        }, 50);
    },
    onWeightSliderChange: function(e) {
        this.setData({
            weightIndex: e.detail.value
        });
    },
    onExpiredSliderChange: function(e) {
        this.setData({
            expiredIndex: e.detail.value
        });
    },
    onFeeItemTap: function(e) {
        var a = this, t = e.currentTarget.dataset.index;
        t >= 0 && a.data.freights[t] < p.MinFreightMoney || a.setData({
            freightIndex: t,
            feeInputFocus: t < 0
        });
    },
    onFeeInputBlur: function(e) {
        var a = this, t = e.detail.value;
        t && t.length && ((t = parseInt(t)) < p.MinFreightMoney && (t = p.MinFreightMoney), 
        a.setData({
            feeInputFocus: a.data.freights.indexOf(t) > 0,
            feeInputValue: a.data.freights.indexOf(t) < 0 ? t : 0
        }));
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
    onCouponTap: function() {
        var e = this;
        r.un("CouponSelect"), r.one("CouponSelect", function(t) {
            var n = 0;
            o.splice(0, o.length);
            for (var r in t) n = a.decimal.add(n, t[r].Money), o.push(t[r]);
            e.setData({
                couponValue: n
            });
        }), wx.navigateTo({
            url: "../../mine/coupon/index?list=true"
        }), r.fire("CouponLoad", e.data.model.Coupons);
    },
    onFormSubmit: function(i) {
        console.log('---onFormSubmit---');
      
        var d = this;
        console.log(d.data.errandType.Value);

        if (c) if (t.userSaveFormId({
            formId: i.detail.formId
        }), e.globalData.userInfo && e.globalData.userInfo.Mobile) {
            var s = {
                cate_id: d.data.cate_id,
                Type: n.OrderTypes[1].Value,
                Stype: d.data.errandType.Value,
                Money: d.data.moneyValue,
                MoneyFreight: d.data.freightValue || p.MinFreightMoney,
                LimitDelivererGender: d.data.errandGenderLimit.Value,
                OrderAddressList: [],
                CouponList: [],
                ExpectTime: d.data.deliveryTimeValue && d.data.deliveryTimeValue.value,
                ExpiredMinutes: 60 * d.data.expiredValue,
                Weight: d.data.weightValue,
                MoneyPayment: d.data.moneyPayable,
                Remark: d.data.remarkValue || ""
            };
            for (var u in d.data.addresses) {
                var l = d.data.addresses[u];
                l.address && s.OrderAddressList.push({
                    AddressId: l.address.Id || 0,
                    IsUserAddress: !!l.self,
                    Address: !l.self && l.address.Name ? l.address.Name : l.address.Linkman + "(" + l.address.Phone + ")",
                    Description: l.address.Address,
                    Longitude: l.address.Longitude,
                    Latitude: l.address.Latitude,
                    IsOutSide: l.address.IsOutSide
                });
            }
            for (var u in o) s.CouponIds.push(o[u].Id);
            s.Remark.length ? s.OrderAddressList.length==2 ? (d.setData({
                isBusy: !0
            }), t.orderCommit(s, function(e) {
                t.orderPayment({
                    id: e
                }, function(a) {
                    !0 === a ? (r.fire("refreshHomeOrders"), wx.navigateTo({
                        url: "../../order/_/info?createorder=true&id=" + e
                    })) : !1 === a ? wx.navigateTo({
                        url: "../../order/_/paycomplete?id=" + e
                    }) : wx.navigateTo({
                        url: "../../order/_/info?createorder=true&id=" + e
                    });
                }, function() {
                    wx.navigateTo({
                        url: "../../order/_/info?createorder=true&id=" + e
                    });
                });
            }, function() {
                d.setData({
                    isBusy: !1
                });
            })) : a.toast("请选择跑腿地址") : a.toast("请详细描述跑腿事宜的要求");
        } else wx.navigateTo({
            url: "../../mine/info/bindmobile"
        }); else e.callAuthorize(d, function() {
            c = !0;
        });
    },
    onExpressFeeLink: function() {
        var e = this;
        wx.navigateTo({
          url: "../../common/content/web?url=" + encodeURIComponent("/wap/news/detail?article_id=" + e.data.model.ExpressCostArticleId)
        });
    },
    onServiceContractLink: function() {
        var e = this;
      console.log(e.data.model);
        wx.navigateTo({
          url: "../../common/content/web?url=" + encodeURIComponent("/wap/news/detail?article_id=" + e.data.model.ErrandServiceArticleId)
        });
    }
});