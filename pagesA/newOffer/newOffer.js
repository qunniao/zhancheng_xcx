// pagesA/newOffer/newOffer.js
const app = getApp()
var time = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bb:{
      "flag":1,
      "name":'最新报价'
    },
    offer:[],
    time:'',
    current:1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    app._ajax(
      'get',
      '/orderModule',
      {
        current:1,
        size:20
      },
      (data)=>{
        var content = data.data.info;
        for(var i = 0; i < content.length; i++){
          content[i]['gmtCreate'] = time.formatTimeTwo(content[i].gmtCreate, 'Y/M/D h:m:s')
        }
        that.setData({
          offer: data.data.info
        })
      }
    )
  },

  //跳转报价详情页
  goOfferDetails:function(event){
    wx.navigateTo({
      url: '/pagesA/offerDetails/offerDetails?id=' + event.currentTarget.dataset.id,
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
    wx.showNavigationBarLoading() //在标题栏中显示加载
    this.onLoad();
    wx.hideNavigationBarLoading() //完成停止加载
    wx.stopPullDownRefresh() //停止下拉刷新
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that = this;
    var current = that.data.current + 1;
    that.setData({
      current:current
    });
    // 显示加载图标
    wx.showLoading({
      title: '玩命加载中',
    })
    app._ajax(
      'get',
      '/orderModule',
      {
        current:current,
        size:20
      },
      (data) => {
        wx.hideLoading();
        that.setData({
          offer:that.data.offer.concat(data.data.info)
        })
      }
    )
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})