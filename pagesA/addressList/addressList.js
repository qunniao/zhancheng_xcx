// pagesA/addressList/addressList.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cc:{
      "flag":1,
      "name":'我的收货地址'
    },
    address:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    console.log(options.shanpin)
    //获取收获地址列表
    app._ajax(
      'get',
      '/userAddress/list',
      {
        current:1,
        size:20,
        uid:wx.getStorageSync("userUid")
      },
      (data) => {
        that.setData({
          address: data.data.records
        })
      }
    )
  },

  //跳转确认订单页面
  goConfirm:function(event){
    wx.navigateTo({
      url: '/pagesA/confirm/confirm?id='+event.currentTarget.dataset.id,
    })
  },

  //跳转添加地址页面
  goAddress:function(){
    wx.navigateTo({
      url: '/pagesA/address/address',
    })
  },

  //点击编辑
  edit: function (event){
    var id = event.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pagesA/address/address?type='+'edit&id='+id,
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