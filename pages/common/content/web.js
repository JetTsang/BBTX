var o = getApp();

Page({
    data: {
        src: null
    },
    onLoad: function(e) {
        e.title && wx.setNavigationBarTitle({
            title: decodeURIComponent(e.title)
        });
        var n = decodeURIComponent(e.url);
        n.indexOf("://") < 0 && (n = o.globalData.siteUrl + n), 

          console.log(n);
        
        
        this.setData({
            src: n
        }), (e.headerForeColor || e.headerBgColor) && wx.setNavigationBarColor({
            frontColor: e.headerForeColor ? decodeURIComponent(e.headerForeColor) : "#ffffff",
            backgroundColor: e.headerBgColor ? decodeURIComponent(e.headerBgColor) : "#FBD40A",
            animation: {
                duration: 400,
                timingFunc: "easeIn"
            }
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {},
    onMessage: function(o) {
        "previewImage" == o.detail.cmd && wx.previewImage(o.detail.data);
    }
});