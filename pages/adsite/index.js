// pages/adsite/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
     ad_id:"",
     ad_content:"",
     ad_height:0,
    ad_content2: "",
    ad_height2: 0,
    ad_content3: "",
    ad_height3: 0,
    ad_content4: "",
    ad_height4: 0,
     ad_content5: "",
    ad_height5: 0,
    ad_content6: "",
    ad_height6: 0,
    ad_content7: "",
    ad_height7: 0,
    ad_content8: "",
    ad_height8: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    console.log(this.data.ad_content);
    this.setData(
      {
        ad_id:options.id,
        ad_content:options.content,
        ad_height: parseInt(options.height),
        ad_content2: options.content2,
        ad_height2: parseInt(options.height2),
        ad_content3: options.content3,
        ad_height3: parseInt(options.height3),
        ad_content4: options.content4,
        ad_height4: parseInt(options.height4),
        ad_content5: options.content5,
        ad_height5: parseInt(options.height5),
        ad_content6: options.content6,
        ad_height6: parseInt(options.height6),
        ad_content7: options.content7,
        ad_height7: parseInt(options.height7),
        ad_content8: options.content8,
        ad_height8: parseInt(options.height8)

      }
    )
console.log(this.data.ad_content);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})