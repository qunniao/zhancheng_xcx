
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    bb: {
      "flag": 1,
      "name": "自助报价"
    },
    list: [],
    isIPX: app.globalData.isIPX,
    lista: [{
      category: [{
        moduleList: []
      }]
    }],
    toView: '',
  },

  clickScroll: function (e) {
    var that = this;
    var id = e.currentTarget.dataset.id
    that.setData({
      toView: id,
    })
  },

  customized: function () {
    wx.navigateTo({
      url: '/pagesA/customized/customized',
    })
  },

  totalPrice: function () {
    if(this.data.chooseid == undefined){
      wx.showToast({
        title: '请选择自助报价功能',
        icon:'none'
      })
    } else {
      wx.navigateTo({
        url: '/pagesA/totalPrice/totalPrice?mid=' + this.data.chooseid + '&pid=' + this.data.bzdPid
      })
    }
  },

  checkboxChange: function (e) {
    var text = [];
    var id = [];
    var sid = e.currentTarget.dataset.id;
    for (var i = 0; i < e.detail.value.length; i++) {
      var aaa = e.detail.value[i].split(',');
      text = text.concat(aaa[0])
      id = id.concat(aaa[1])
    }
    this.setData({
      checkedNum: id.length,
      chooseid: id,
    });
    console.log(id)
  },


  onLoad: function (options) {
    //获取自助报价一级菜单
    var id = options.cid;
    console.log("id:"+id)
    var that = this;

    wx.request({
      url: app.api_url+'/module/category/'+id,
      data: {

      },
      success(res) {
        that.setData({
          list: res.data.data,
          lista: res.data.data,
          toView:"a"+res.data.data[0].id,
          bzdPid:options.cid
        })
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