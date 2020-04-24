// pagesA/totalPrice/totalPrice.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bb: {
      "flag": 1,
      "name": "报价结果"
    },
    cpList:[
      {
        title:'商城APP模板开发',
        price:2999,
        volume:13
      },
      {
        title: '商城APP模板开发',
        price: 2999,
        volume: 13
      },
      {
        title: '商城APP模板开发',
        price: 2999,
        volume: 13
      },
      {
        title: '商城APP模板开发',
        price: 2999,
        volume: 13
      }
    ],
    time:'',
    price:'',
    typeName:'',
    modules:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("pid:"+options.pid);
    var that = this;
    app._ajaxtoken(
      "post",
      "/module/total",
      { 
        mid:options.mid,
        pid: options.pid
      },
      (data) => {
        that.setData({
          typeName: data.data.category.typeName,
          price:data.data.price,
          time:data.data.time,
          modules: data.data.modules
        })
      },
      (msg) => {
        
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