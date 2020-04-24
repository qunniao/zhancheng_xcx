// pagesA/offerDetails/offerDetails.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bb:{
      "flag":1,
      "name":'报价详情'
    },
    typeName:'',
    price:'',
    time:'',
    modules:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: app.api_url+'/orderModule/info',
      data:{
        id:options.id
      },
      success(res) {
        var mo = JSON.parse(res.data.data.module_json)
        if(res.data.data.total_price == undefined){
          res.data.data.total_price = 1000
        }
        that.setData({
          typeName: res.data.data.type_name,
          price: res.data.data.total_price,
          time: res.data.data.duration,
          modules: mo
        })
        console.log(mo)
      }
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