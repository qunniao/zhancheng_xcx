// pagesA/confirm/confirm.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bb: {
      "flag": 1,
      "name": "确认订单"
    },
    productName:'',
    price:'',
    num:1,
    totalPrice:1,
    showModalStatus: false,
    shanpin:[],
    contact:'',
    phone:'',
    address:'',
    adisplay:'none',
    bdisplay:''
  },


  powerDrawer: function (e) {
    var currentStatu = e.currentTarget.dataset.statu;
    this.util(currentStatu)
  },
  util: function (currentStatu) {
    /* 动画部分 */
    // 第1步：创建动画实例 
    var animation = wx.createAnimation({
      duration: 200,  //动画时长
      timingFunction: "linear", //线性
      delay: 0  //0则不延迟
    });

    // 第2步：这个动画实例赋给当前的动画实例
    this.animation = animation;

    // 第3步：执行第一组动画：Y轴偏移240px后(盒子高度是240px)，停
    animation.translateY(240).step();

    // 第4步：导出动画对象赋给数据对象储存
    this.setData({
      animationData: animation.export()
    })

    // 第5步：设置定时器到指定时候后，执行第二组动画
    setTimeout(function () {
      // 执行第二组动画：Y轴不偏移，停
      animation.translateY(0).step()
      // 给数据对象储存的第一组动画，更替为执行完第二组动画的动画对象
      this.setData({
        animationData: animation
      })

      //关闭抽屉
      if (currentStatu == "close") {
        this.setData(
          {
            showModalStatus: false
          }
        );
      }
    }.bind(this), 200)

    // 显示抽屉
    if (currentStatu == "open") {
      this.setData(
        {
          showModalStatus: true
        }
      );
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var ppp = JSON.parse(wx.getStorageSync("wupin"))
    console.log("id:"+options.id)
    var orderNumber = options.orderNumber;
    var totalPrice = options.totalPrice
    that.setData({
      shanpin: ppp,
      orderNumber: orderNumber,
      totalPrice: totalPrice,
    })
    console.log(ppp)
    if(options.id == undefined){
      app._ajax(
        'get',
        '/userAddress/queryDefault',
        {
          uid: wx.getStorageSync("userUid")
        },
        (data) => {
          if (data.data == null) {
            that.setData({
              bdisplay: "block",
              adisplay: 'none'
            })
          } else {
            that.setData({
              bdisplay: "none",
              adisplay: 'flex',
              contact: data.data.contactName,
              phone: data.data.contactPhone,
              address: data.data.contactAddress
            })
          }
        }
      )
    } else {
      app._ajax(
        'get',
        '/userAddress/info/'+options.id,
        {
          uid: wx.getStorageSync("userUid")
        },
        (data) => {
          that.setData({
            bdisplay: "none",
            adisplay: 'flex',
            contact: data.data.contactName,
            phone: data.data.contactPhone,
            address: data.data.contactAddress
          })
        }
      )
    }
  },

  //跳转地址选择
  goAddress:function(){
    wx.navigateTo({
      url: '/pagesA/addressList/addressList',
    })
  },

  payment:function(options){
    var that = this;
    if (that.data.adisplay == 'none') {
      wx.showToast({
        title: '请选择收货地址',
        icon:'none'
      })
    } else {
      app._ajaxtoken(
        "post",
        "/orderInfo/wxPayOrder",
        {
          orderNumber: that.data.orderNumber
        },
        (data) => {
          //小程序发起微信支付
          wx.requestPayment({
            timeStamp: data.data.timeStamp,//记住，这边的timeStamp一定要是字符串类型的，不然会报错
            nonceStr: data.data.nonceStr,
            package: data.data.package,
            signType: 'MD5',
            paySign: data.data.sign,
            success: function (event) {
              // success
              console.log(event);
              wx.showToast({
                title: '支付成功',
                icon: 'success',
                duration: 2000
              });
              wx.removeStorageSync("wupin")
            },
            fail: function (error) {
              // fail
              console.log("支付失败")
              console.log(error)
            },
            complete: function () {
              // complete
              console.log("pay complete")
            }
          });
        },
        (msg) => {

        }
      )
    }
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