// pagesA/collection/collection.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    collected: false,
    collection:[],
    bb: {
      "flag": 1,
      "name": "我的收藏"
    },
    isCollection:false,
    caseUrla:'../../res/imgs/shoucang.png',
    caseUrlb: '../../res/imgs/shoucang2.png',
    navData:[
      {
        current:1,
        text:"全部"
      },
      {
        current:2,
        text:"案例"
      }
    ],
    current:1
  },

  onCollectionTap:function(e){
    var that = this;
    app._ajax(
      'get',
      '/case/info',
      {
        cid:e.currentTarget.dataset.cid,
        uid:wx.getStorageSync("userUid")
      },
      (data) => {
        console.log(e.currentTarget.dataset.cid+"的收藏状态："+data.data.isCollection)
        if(data.data.isCollection == true){
          app._ajax(
            'post',
            '/caseLike/saveOrUpdate',
            {
              cid: e.currentTarget.dataset.cid,
              uid: wx.getStorageSync("userUid"),
              isCollection: 0
            },
            (data) => {
              wx.showToast({
                title: '取消收藏',
                icon: 'success'
              })
              this.onLoad();
            }
          )
        }else{
          app._ajax(
            'post',
            '/caseLike/saveOrUpdate',
            {
              cid: e.currentTarget.dataset.cid,
              uid: wx.getStorageSync("userUid"),
              isCollection: 1
            },
            (data) => {
              wx.showToast({
                title: '收藏成功',
                icon: 'success'
              })
              this.onLoad();
            }
          )
        }
        
      }
    )
  },

  //切换tabbar
  tabbar: function (e) {
    console.log("yes" + e.currentTarget.dataset.current)
    var that = this;
    this.setData({
      current: e.currentTarget.dataset.current,
    })
  },

  changeOil: function (e) {
    console.log(e);
    this.setData({
      num: e.target.dataset.num
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    app._ajax(
      'get',
      '/caseLike/list/'+wx.getStorageSync("userUid"),
      '',
      (data) => {
        that.setData({
          collection:data.data
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