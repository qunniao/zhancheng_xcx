// pagesA/caseDetails/caseDetails.js
const app =  getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bb:{
      "flag":1,
      "name":'案例详情'
    },
    bnrUrl:[],
    price:'',
    title:'',
    likeNum:'',
    watchNum:'',
    caseAttrs:[],
    newscontent:'',
    showModalStatus: false,
    isCollected: false,
    isIPX: app.globalData.isIPX,
    isLike:false,
    aaa:[],
    mobileDetail:[]
  },

  //添加和取消收藏
  handleCollection() {
    var that = this;
    if (that.data.isCollected == false){
      var collection = 1
    }else{
      var collection = 0
    }
    app._ajax(
      'post',
      '/caseLike/saveOrUpdate',
      {
        uid:wx.getStorageSync('userUid'),
        cid: that.data.cid,
        isCollection: collection
      },
      (data) => {
        let isCollected = !that.data.isCollected
        that.setData({
          isCollected
        })
        wx.showToast({
          title: isCollected ? '收藏成功' : '取消收藏',
          icon: 'success'
        })
      }
    )
  },

  //案例点赞和取消点赞
  handleLike:function(){
    var that = this;
    if(that.data.isLike == true){
       var isLike = 0
    }else{
      var isLike = 1
    }
    app._ajax(
      'post',
      '/caseLike/like',
      {
        cid:that.data.cid,
        uid:wx.getStorageSync("userUid"),
        isLike: isLike
      },
      (data) => {
        let isLike = !that.data.isLike
        that.setData({
          isLike,
        })
        if(isLike == true){
          that.setData({
            likeNum: that.data.likeNum + 1
          })
        } else if (isLike == false){
          that.setData({
            likeNum: that.data.likeNum - 1
          })
        }
        wx.showToast({
          title: isLike ? '点赞成功' : '取消点赞',
          icon: 'success'
        })
      }
    )
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
    console.log("cid:"+options.cid)
    var that = this;
    that.setData({
      cid: options.cid
    })
    app._ajax(
      'get',
      '/case/info',
      {
        cid: options.cid,
        uid: wx.getStorageSync("userUid")
      },
      (data) => {
        var caseUrl = data.data.cover
        var newArry = caseUrl.split(",");
        var a = data.data.mobileDetail.split(',')
        console.log(a)
        var caseDe = []
        var casnshu = { 'url': a }
        caseDe.push(casnshu)
        that.setData({
          bnrUrl: newArry,
          price: data.data.price,
          title:data.data.name,
          likeNum: data.data.likeNum,
          watchNum: data.data.watchNum,
          caseAttrs: data.data.caseAttrs,
          mobileDetail: caseDe[0].url
        })
        console.log(that.data.bnrUrl)
        if (data.data.isCollection == true){
          that.setData({
            isCollected: true
          })
        }else{
          that.setData({
            isCollected: false
          })
        }
      }
    )
  },

  //预览图片
  previewImg: function (e) {
    console.log(this.data.bnrUrl);
    var index = e.currentTarget.dataset.index;
    var bnrUrl = this.data.bnrUrl;
    wx.previewImage({
      current: bnrUrl[index],     //当前图片地址
      urls: bnrUrl,               //所有要预览的图片的地址集合 数组形式
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },

  previewImga:function(e){
    console.log(e.currentTarget.dataset.index)
    var index = e.currentTarget.dataset.index;
    var mobileDetail = this.data.mobileDetail;
    wx.previewImage({
      current: mobileDetail[index],     //当前图片地址
      urls: mobileDetail,               //所有要预览的图片的地址集合 数组形式
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
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