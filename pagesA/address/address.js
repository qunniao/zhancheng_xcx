const app = getApp()
Page({
  data: {
    cc:{
      "flag":1,
      "name":'添加收获地址'
    },
    contact:'',
    phone:'',
    address:'',
    isDefaultAddress:true,
    display:"none",
    queding:'submit'
  },
  
  //获取联系人
  getContent: function (e) {
    this.setData({
      contact: e.detail.value
    })
  },

  //获取手机号
  getPhone: function (e) {
    this.setData({
      phone: e.detail.value
    })
  },

  //获取位置信息
  translate: function (e) {
    var that = this;
    wx.chooseLocation({
      success: function (res) {
        that.setData({
          address: res.name
        })
      }
    })
  },

  switchChange:function(e){
    if (e.detail.value == true) {
      this.setData({
        isDefaultAddress: 1
      })
    } else {
      this.setData({
        isDefaultAddress: 0
      })
    }
  },

  submit:function(){
    var that = this;
    if(that.data.contact == undefined){
      wx.showToast({
        title: '请输入联系人',
        icon:'none'
      })
      return false 
    }else if (!(/^1[34578]\d{9}$/.test(that.data.phone))) {
      wx.showToast({
        title: '手机号输入错误',
        icon: 'none'
      })
      return false
    }else if(that.data.phone == undefined){
      wx.showToast({
        title: '请输入手机号',
        icon: 'none'
      })
      return false
    } else if (that.data.address == '') {
      wx.showToast({
        title: '请选择收获地址',
        icon: 'none'
      })
      return false
    } else {
      app._ajax(
        'post',
        '/userAddress/save',
        {
          uid: wx.getStorageSync('userUid'),
          contactName: that.data.contact,
          contactPhone: that.data.phone,
          contactAddress: that.data.address,
          isDefaultAddress: that.data.isDefaultAddress
        },
        (data) => {
          if (data.status == 0) {
            wx.showToast({
              title: '地址添加成功',
            })
            wx.navigateTo({
              url: '/pagesA/addressList/addressList',
            })
          }
        }
      )
    }
  },

  //删除收货地址
  delete:function(){
    var that = this;
    wx.showModal({
      content: '确定要删除该地址吗？',
      success: function (res) {
        if (res.confirm) {
          app._ajax(
            'DELETE',
            '/userAddress/delete/'+that.data.id,
            '',
            (data) => {
              wx.showToast({
                title: '删除成功',
              })
              wx.navigateTo({
                url: '/pagesA/addressList/addressList',
              })
            }
          )
        } else {
          console.log('用户点击取消')
        }
      }
    })
  },

  xiugai:function(){
    var that = this;
    if (that.data.contact == '') {
      wx.showToast({
        title: '请输入联系人',
        icon: 'none'
      })
      return false
    } else if (!(/^1[34578]\d{9}$/.test(that.data.phone))) {
      wx.showToast({
        title: '手机号输入错误',
        icon: 'none'
      })
      return false
    } else if (that.data.phone == undefined) {
      wx.showToast({
        title: '请输入手机号',
        icon: 'none'
      })
      return false
    } else if (that.data.address == '') {
      wx.showToast({
        title: '请选择收获地址',
        icon: 'none'
      })
      return false
    } else {
      app._ajax(
        'post',
        '/userAddress/update',
        {
          id: that.data.id,
          uid: wx.getStorageSync("userUid"),
          contactName: that.data.contact,
          contactPhone: that.data.phone,
          contactAddress: that.data.address,
          isDefaultAddress: that.data.isDefaultAddress
        },
        (data) => {
          wx.showToast({
            title: '修改成功',
          })
          wx.navigateTo({
            url: '/pagesA/addressList/addressList',
          })
        }
      )
    }
  },

  onLoad: function (options) {
    console.log("type:" + options.id)
    var that = this;
    if(options.type == 'edit'){
      that.setData({
        display:'block',
        id:options.id,
        queding:'xiugai'
      })
    }
    app._ajax(
      'get',
      '/userAddress/info/'+that.data.id,
      '',
      (data) => {
        that.setData({
          contact: data.data.contactName,
          phone: data.data.contactPhone,
          address: data.data.contactAddress,
          isDefaultAddress: data.data.isDefaultAddress
        })
      }
    )
  },

  onReady: function () {
    
  },
})
