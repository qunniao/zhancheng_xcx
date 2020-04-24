const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    bb:{
      "flag":1,
      "name":'创建名片'
    },
    name:'',
    personImage: '',
    address: '',
    introText: '',
    message:[],
    uploadUrl:''
  },

  // 切换头像
  changeAvatar: function () {
    const _this = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePath = res.tempFilePaths[0];
        _this.setData({
          personImage: tempFilePath
        })
        wx.uploadFile({
          url: app.api_url+'/banner/addFile', //图片上传至开发服务器接口
          filePath: tempFilePath,
          name: 'files',
          formData: {},
          success(res) {
            console.log("图片上传成功" + res.data)
            const data = res.data;
            var citystr = JSON.parse(res.data)
            _this.setData({
              uploadUrl: citystr.data[0]
            })
          },
          fail(){
            console.log("失败了")
          }
        })
      }
    })
  },

  getLocation() {
    var that = this;
    wx.chooseLocation({
      success: function (res) {
        that.setData({
          address: res.address,
          addressLongitude: res.longitude,
          addressLatitude: res.latitude
        })
      },
      fail: function (err) {
        console.log(err)
      }
    })
  },

  gerenjianjie: function () {
    wx.navigateTo({
      url: '/pagesA/textarea/textarea?introText=' + this.data.introText,
    })
  },

  username: function (e) {
    this.setData({
      username: e.detail.value
    })
  },

  wechat: function (e) {
    this.setData({
      wechat: e.detail.value
    })
  },

  phone: function (e) {
    this.setData({
      phone: e.detail.value
    })
  },

  email: function (e) {
    this.setData({
      email: e.detail.value
    })
  },

  occupation: function (e) {
    this.setData({
      occupation: e.detail.value
    })
  },

  company: function (e) {
    this.setData({
      company: e.detail.value
    })
  },

  submit: function () {
    console.log(this.data.introText)
    let str = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/
    if(this.data.username==undefined){
      wx.showToast({
        title: '请输入姓名',
        icon:"none"
      })
      console.log(this.data.username)
      return false;
    }else if (this.data.wechat == undefined) {
      wx.showToast({
        title: '请输入微信',
        icon: "none"
      })
      return false;
    }else if (this.data.phone == undefined) {
      wx.showToast({
        title: '请输入联系电话',
        icon: "none"
      })
      return false;
    } else if (!(/^1[34578]\d{9}$/.test(this.data.phone))){
      wx.showToast({
        title: '请输入正确的联系电话',
        icon: "none"
      })
      return false;
    }else if (this.data.email == undefined) {
      wx.showToast({
        title: '请输入邮箱',
        icon: "none"
      })
      return false;
    } else if (!str.test(this.data.email)){
      wx.showToast({
        title: '请输入正确的邮箱',
        icon: "none"
      })
      return false
    } else if (this.data.occupation == undefined) {
      wx.showToast({
        title: '请输入您的职业',
        icon: "none"
      })
      return false;
    } else if (this.data.company == undefined) {
      wx.showToast({
        title: '请输入公司名称',
        icon: "none"
      })
      return false;
    }else if (this.data.address == "null") {
      wx.showToast({
        title: '请选择地址',
        icon: "none"
      })
      return false;
    }else if (this.data.introText == undefined) {
      wx.showToast({
        title: '请输入个人简介',
        icon: "none"
      })
    }else if(this.data.type == 'save'){
      app._ajaxtoken(
        "post",
        "/userCard",
        {
          cover: this.data.uploadUrl,
          name: this.data.username,
          wechat: this.data.wechat,
          phone: this.data.phone,
          email: this.data.email,
          companyPosition: this.data.occupation,
          companyName: this.data.company,
          address: this.data.address,
          introText: this.data.introText,
          addressLongitude: this.data.addressLongitude,
          addressLatitude: this.data.addressLatitude
        },
        (data) => {
          wx.showToast({
            title: '名片创建成功',
          })
          wx.navigateTo({
            url: '/pages/index/index?bzUid=' + wx.getStorageSync("userUid"),
          })
        },
        (msg) => {
          console.log("名片创建失败")
        }
      )
    }else if(this.data.type == 'update'){
      
      if (this.data.uploadUrl==''){
        this.data.uploadUrl = this.data.personImage
      }
      app._ajaxtoken(
        'post',
        '/userCard/update',
        {
          cid:this.data.cid,
          cover: this.data.uploadUrl,
          name: this.data.username,
          wechat: this.data.wechat,
          phone: this.data.phone,
          email: this.data.email,
          companyPosition: this.data.occupation,
          companyName: this.data.company,
          address: this.data.address,
          introText: this.data.introText,
          addressLongitude: this.data.addressLongitude,
          addressLatitude: this.data.addressLatitude
        },
        (data) => {
          wx.showToast({
            title: '名片修改成功',
          })
          wx.navigateTo({
            url: '/pages/index/index?bzUid=' + wx.getStorageSync("userUid"),
          })
        }
      )
    }
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      type: options.type,
    })
    app._ajaxtoken(
      'get',
      '/userCard',
      {
        uid:wx.getStorageSync('userUid')
      },
      (data) => {
        that.setData({
          personImage: data.data.userInfo.cover,
          username: data.data.userInfo.name,
          wechat: data.data.userInfo.wechat,
          phone:data.data.userInfo.phone,
          email: data.data.userInfo.email,
          occupation: data.data.userInfo.companyPosition,
          company: data.data.userInfo.companyName,
          address: data.data.userInfo.address,
          introText: data.data.userInfo.introText,
          cid:data.data.userInfo.cid,
          addressLatitude: data.data.userInfo.addressLatitude,
          addressLongitude: data.data.userInfo.addressLongitude
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