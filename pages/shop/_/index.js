var t = getApp(), a = t.require("utils/util.js"), e = t.require("utils/api.js"), o = {}, i = !0;

Page({
    data: {
        screenWidth: t.globalData.systemInfo.windowWidth,
        screenHeight: t.globalData.systemInfo.windowHeight,
        model: {},
        carts: {
            Items: [],
            Quantity: 0
        },
        items: [],
        moneyPayable: 0,
        modalType: "none",
        popupType: "none",
        shopIndex: 0,
        categoryIndex: 0,
        options: {},
        cate_id: '',
    },
    onLoad: function(t) {
      console.log("我是onload参数t");
      console.log(t);
        this.setData({
            options: t,
            cate_id: t.cate_id
        }), this.loadData(t);
    },
    onReady: function() {},
    onShow: function() {
        var a = this;
        if (i) i = !1; else {
            var e = a.data.model.Shops;
            if (e && e.length) {
                var o = e[a.data.shopIndex].Id;
                t.getStorage("cart")[o] || a.refreshCart(!1);
            }
        }
    },
    onHide: function() {
        "none" != this.data.modalType && this.setData({
            modalType: "none"
        });
    },
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {},
    loadData: function(t) {
        var a = this;
        e.shopIndex(t, function(t) {
            console.log("我应该不会执行");
           console.log(t);
            o = t, t.GroupInfo && (wx.setNavigationBarColor({
                frontColor: "#fff" == t.GroupInfo.NavForeColor ? "#ffffff" : "#000000",
                backgroundColor: t.GroupInfo.NavBackgroundColor || "#ffffff"
            }), wx.setNavigationBarTitle({
                title: t.GroupInfo.IsHideNavTitle ? "" : t.GroupInfo.Name
            })), t.Shops && t.Shops.length ? a.loadCategories(t, 0) : a.setData({
                modalType: "more"
            });
        });
    },
    loadCategories: function(i, r) {
      console.log("我跳过来了");
      console.log(this);
      console.log(i);
        var n = this, s = i.Shops[r].Id, d = t.getStorage("cart"), m = d[s] || {
            Items: [],
            Quantity: 0
        }, u = !1, l = 0;
      console.log("我回来了");
      console.log(d);
      console.log(m);
      console.log("就要跳到decimal.add");
        if (m && m.Items.length) for (var f in m.Items) {
          console.log("执行一次");
            var c = m.Items[f];
            for (var p in o.PopularCommodities) {
                var I = o.PopularCommodities[p];
                if (I.Id == c.Id) {
                    I.Quantity = c.Quantity, c.Price != I.Price && (c.OldPrice = c.Price, c.Price = I.Price, 
                    u = !0);
                    break;
                }
            }
           console.log("就要跳到decimal.add");
            l = a.decimal.add(l, a.decimal.multiply(c.Price, c.Quantity));
            for (var h in o.Categories) {
                var g = o.Categories[h];
                if (g.Id == c.CategoryId) {
                    g.Quantity = (g.Quantity || 0) + c.Quantity;
                    break;
                }
            }
        }
        console.log("我是n");
        console.log(i);
        console.log(m);
        n.setData({
            model: i,
            items: i.PopularCommodities,
            carts: m,
            moneyPayable: l
        }), i.Shops.length && o.Categories && o.Categories.length ? e.shopCommodityList({
            id: i.Shops[r].Id
        }, function(t) {
          console.log("我是shopCommodityList的返回值");
          console.log(t);
          console.log(o);
          
            var e = null, i = [], r = n.data.carts;
          console.log(r);
            for (var s in t) {
                var m = t[s];
                if (!e || e.Id != m.CategoryId) for (var l in o.Categories) {console.log("输出e");console.log(e);console.log("输出1");console.log(l); if ((e = o.Categories[l]).Id == m.CategoryId) break;}console.log("我是下面的");
                e.Commodities || (e.Commodities = []);
                for (var f in r.Items) if ((p = r.Items[f]).Id == m.Id) {
                    m.Quantity = p.Quantity, i.push(p.Id), p.Price != m.Price && (p.OldPrice = p.Price, 
                    p.Price = m.Price, u = !0);
                    break;
                }
                e.Commodities.push(m);
                console.log("e都加进去什么");
                console.log(e);
            }
            var c = 0;
            for (var f in r.Items) {
                var p = r.Items[f];
                p.IsSale = i.indexOf(p.Id) >= 0, c = a.decimal.add(c, a.decimal.multiply(p.Price, p.Quantity));
            }
            var I = 0 == n.data.categoryIndex ? o.PopularCommodities : o.Categories[n.data.categoryIndex - 1].category.Commodities;
            n.setData({
                model: o,
                items: I,
                moneyPayable: c,
                carts: r
            }), u && d && d.save();
        }) : u && d && d.save();
    },
    refreshCart: function(e, i) {
        var r = this, n = !1, s = r.data.carts;
        if (e) {
            s.Quantity += i;
            for (var d in s.Items) if ((u = s.Items[d]).Id == e.Id) {
                1 == u.Quantity && i < 0 ? s.Items.splice(d, 1) : u.Quantity = (u.Quantity || 0) + i, 
                n = !0;
                break;
            }
            if (!n && i > 0) {
                var m = a.clone(e);
                m.Quantity = 1, s.Items.push(m);
            }
        } else s = {
            Items: [],
            Quantity: 0
        };
        for (var d in o.PopularCommodities) {
            var u = o.PopularCommodities[d];
            if (e) {
                if (u.Id == e.Id) {
                    u.Quantity = (u.Quantity || 0) + i;
                    break;
                }
            } else u.Quantity = 0;
        }
        for (var d in o.Categories) {
            var l = o.Categories[d];
            if (e) {
                if (e.CategoryId == l.Id && (l.Quantity = (l.Quantity || 0) + i, l.Commodities)) for (var f in l.Commodities) if ((u = l.Commodities[f]).Id == e.Id) {
                    u.Quantity = (u.Quantity || 0) + i;
                    break;
                }
            } else if (l.Quantity = 0, l.Commodities) for (var f in l.Commodities) (u = l.Commodities[f]).Quantity = 0;
        }
        var c = 0 == r.data.categoryIndex ? o.PopularCommodities : o.Categories[r.data.categoryIndex - 1].Commodities, p = e ? a.decimal.add(r.data.moneyPayable, a.decimal.multiply(e.Price, i)) : 0;
        r.setData({
            carts: s,
            moneyPayable: p,
            model: o,
            items: c
        });
        var I = r.data.model.Shops;
        if (I && I.length) {
            var h = I[r.data.shopIndex].Id, g = t.getStorage("cart");
        
           
            s.Items.length ? g[h] = s : delete g[h], g.save();
        }
    },
    onShopItemTap: function(t) {
        var a = this, i = t.currentTarget.dataset.index;
        i != a.data.shopIndex && (this.setData({
            shopIndex: i,
            categoryIndex: 0
        }), e.shopCategories({
            id: o.Shops[i].Id
        }, function(t) {
            t.Shops = o.Shops, o.PopularCommodities = t.PopularCommodities, o.Categories = t.Categories, 
            a.loadCategories(t, i);
        }));
    },
    onMenuItemTap: function(t) {
        var a = this, e = t.currentTarget.dataset.index;
        if (0 == e) a.setData({
            categoryIndex: e,
            items: o.PopularCommodities
        }); else {
            var i = o.Categories[e - 1];
            i.Commodities ? a.setData({
                categoryIndex: e,
                items: i.Commodities
            }) : a.setData({
                categoryIndex: e,
                items: []
            });
        }
    },
    onListPlusTap: function(t) {
        var a = this, e = t.currentTarget.dataset.index, i = null;
        (i = 0 == a.data.categoryIndex ? o.PopularCommodities[e] : o.Categories[a.data.categoryIndex - 1].Commodities[e]).IsSale = !0, 
        this.refreshCart(i, 1);
    },
    onListMinusTap: function(t) {
        var a = this, e = t.currentTarget.dataset.index, i = null;
        i = 0 == a.data.categoryIndex ? o.PopularCommodities[e] : o.Categories[a.data.categoryIndex - 1].Commodities[e], 
        this.refreshCart(i, -1);
    },
    onCartPlusTap: function(t) {
        var a = this, e = t.currentTarget.dataset.index, o = a.data.carts.Items[e];
        this.refreshCart(o, 1);
    },
    onCartMinusTap: function(t) {
        var a = this, e = t.currentTarget.dataset.index, o = a.data.carts.Items[e];
        this.refreshCart(o, -1);
    },
    onCartTap: function() {
        this.setData({
            popupType: "cart"
        });
    },
    onCartClear: function() {
        this.refreshCart(!1);
    },
    onPopupCancel: function() {
        this.setData({
            popupType: "none"
        });
    },
    onFormSubmit: function(t) {
        e.userSaveFormId({
            formId: t.detail.formId
        });
        var a = this, o = a.data.model.Shops;
        if (o && o.length) {
            var i = o[a.data.shopIndex].Id;
            wx.navigateTo({
              url: "../commit/index?id=" + i + "&groupId=" + (a.data.options.groupId || 0) + "&cate_id=" + (a.data.options.cate_id || 0)
            });
        }
    },
    onMoreShopTap: function() {
        this.setData({
            modalType: "more"
        });
    },
    onModalConfirm: function() {
        this.setData({
            modalType: "none"
        });
    }
});