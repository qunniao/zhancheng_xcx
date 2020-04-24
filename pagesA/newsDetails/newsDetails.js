// pagesA/newsDetails/newsDetails.js
const app = getApp()
var time = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bb:{
      "flag":1,
      "name":'资讯详情'
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    app._ajax(
      'get',
      '/news/info/'+options.id,
      '',
      (data) => {
        console.log("成功了")
        that.setData({
          title:data.data.title,
          gmtCreate: time.formatTimeTwo(data.data.gmtCreate, 'Y-M-D'),
          content: data.data.content
        })
      }
    )
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