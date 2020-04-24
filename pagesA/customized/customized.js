// pagesA/customized/customized.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bb: {
      "bg_color":'#307BF6',
      "color":'#fff',
      "flag": 1,
      "name": "定制功能"
    },
    contact:'',
    contactPhone:'',
    content:''
  },

  contactInput:function(e){
    this.setData({
      contact:e.detail.value
    })
  },

  contactPhoneInput: function (e) {
    this.setData({
      contactPhone: e.detail.value
    })
  },

  contentInput: function (e) {
    this.setData({
      content: e.detail.value
    })
  },

  submit:function(e){
    setTimeout(() => {
      var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
      if (this.data.content == null || this.data.content == "") {
        this.setData(
          { popErrorMsg: "请输入您的需求" }
        );
        this.ohShitfadeOut();
        return;
      } else if (this.data.contact == null || this.data.contact == "") {
        this.setData(
          { popErrorMsg: "请输入联系人" }
        );
        this.ohShitfadeOut();
        return;
      } else if (this.data.contactPhone == null || this.data.contactPhone == "") {
        this.setData(
          { popErrorMsg: "请输入联系电话" }
        );
        this.ohShitfadeOut();
        return;
      } else if (!(/^1[34578]\d{9}$/.test(this.data.contactPhone))) {
        this.setData(
          { popErrorMsg: "请输入正确的联系电话" }
        );
        this.ohShitfadeOut();
        return;
      }else {
        app._ajaxtoken(
          "post",
          "/feelback",
          {
            contacts: this.data.contact,
            phone: this.data.contactPhone,
            content: this.data.content
          },
          (data) => {
            wx.showToast({
              title: '提交成功',
              icon: 'success',
              duration: 2000
            })

          },
          (msg) => {
            console.log(32432)
          },
        )
      }
    }, 100)
  },

  ohShitfadeOut() {
    var fadeOutTimeout = setTimeout(() => {
      this.setData({ popErrorMsg: '' });
      clearTimeout(fadeOutTimeout);
    }, 3000);
  },
  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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