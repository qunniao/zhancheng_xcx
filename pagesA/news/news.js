// pagesA/news/news.js
var time = require('../../utils/util.js');
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bb:{
      "flag":1,
      "name":"新闻资讯"
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: app.api_url+'/news/list',
      method: 'get',
      data: {
        current: 1,
        size: 3
      },
      success(res) {
        var contenta = res.data.data.records
        for (var i = 0; i < contenta.length; i++) {
          contenta[i]['gmtCreate'] = time.formatTimeTwo(contenta[i].gmtCreate, 'Y-M-D')
          console.log("时间：" + contenta[i]['gmtCreate'])
        }
        that.setData({
          question: res.data.data.records
        })
      }
    })

  },

  goCase: function (event){
    console.log("id:" + event.currentTarget.dataset.id)
    wx.navigateTo({
      url: '/pagesA/newsDetails/newsDetails?id=' + event.currentTarget.dataset.id,
    })
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