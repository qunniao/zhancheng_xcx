// pagesA/moreShop/moreShop.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bb: {
      "flag":1,
      "name": "app开发"
    },
    rightList: [],
    fenlei:[],
    images:'../../res/imgs/top.png',
    images1: '../../res/imgs/top.png',
    size:0
  },

  sort1: function (options) {
    var arry_length = this.data.rightList;
    if (this.data.images1 == "../../res/imgs/top.png") {
      for (var i = 0; i < arry_length.length; i++) {
        for (var j = 0; j < arry_length.length - i - 1; j++) {
          if (arry_length[j].salesNum < arry_length[j + 1].salesNum) {
            var c = arry_length[j];
            arry_length[j] = arry_length[j + 1];
            arry_length[j + 1] = c;
          }
        }
      }
      this.setData({
        rightList: arry_length,
        images1: "../../res/imgs/top (2).png"
      })
    } else {
      for (var i = 0; i < arry_length.length; i++) {
        for (var j = 0; j < arry_length.length - i - 1; j++) {
          if (arry_length[j].salesNum > arry_length[j + 1].salesNum) {
            var c = arry_length[j];
            arry_length[j] = arry_length[j + 1];
            arry_length[j + 1] = c;
          }
        }
      }
      this.setData({
        rightList: arry_length,
        images1: "../../res/imgs/top.png"
      })
    }
  },

  sort: function (options) {
    if(this.data.size==undefined){
      this.data.size = wx.getStorageSync("pid")
    }
    if (this.data.images == "../../res/imgs/top.png") {
      this.setData({
        images: "../../res/imgs/top (2).png"
      })
      app._ajax(
        "get",
        "/product/productList",
        {
          pid: this.data.size,
          desc:"desc",
          page: 1
        },
        (data) => {
          this.setData(
            {
              rightList: data.data
            }
          )
        },
        (msg) => {

        }
      )
    } else {
      this.setData({
        images: "../../res/imgs/top.png"
      })
      app._ajax(
        "get",
        "/product/productList",
        {
          pid: this.data.size,
          desc:'dec',
          page: 1
        },
        (data) => {
          this.setData(
            {
              rightList: data.data
            }
          )
        },
        (msg) => {

        }
      )
    }
  },

  changeFl: function (e) {
    this.setData({
      size: e.target.dataset.size
    })
    if(this.data.size==0){
      this.data.size = wx.getStorageSync("pid")
    }
    app._ajax(
      'get',
      '/product/productList',
      {
        page:1,
        desc:'des',
        pid:this.data.size
      },
      (data)=>{
        this.setData({
          rightList:data.data
        })
      }
    )
  },

  goDetails: function () {
    wx.navigateTo({
      url: '/pagesA/details/details',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let pid = options.pid;
    wx.setStorageSync('pid', pid);
    if(pid==18){
      this.setData({
        bb:{
          "flag":1,
          "name":"app开发"
        }
      })
    } else if (pid == 19) {
      this.setData({
        bb: {
          "flag": 1,
          "name": "微信小程序"
        }
      })
    } else if (pid == 20) {
      this.setData({
        bb: {
          "flag": 1,
          "name": "pc/H5网站"
        }
      })
    } else if (pid == 21) {
      this.setData({
        bb: {
          "flag": 1,
          "name": "其他"
        }
      })
    }
    app._ajax(
      "get",
      "/product/productList",
      {
        desc:1,
        page:1,
        pid: pid
      },
      (data) => {
        this.setData(
          {
            rightList: data.data
          }
        )
      },
      (msg) => {

      }
    )
    //获取产品二级类目
    app._ajax(
      "get",
      "/productType/secondType",
      {
        pid: pid
      },
      (data) => {
        this.setData(
          {
            fenlei: data.data
          }
        )
      },
      (msg) => {

      }
    )
  },

  goDetails: function (event) {
    var postad = event.currentTarget.dataset.postad   //获取传递的值
    wx.navigateTo({
      url: '/pagesA/details/details?pid=' + postad,
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