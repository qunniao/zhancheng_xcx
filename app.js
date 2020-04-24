//app.js
App({
  // //全局API地址
  api_url: 'https://back.zhanchengwlkj.com/zc_program_applet/v2',
  data: {
  },
  onLaunch: function () {
    var _this = this;

    _this.checkIsIPhoneX();
  },

  globalData: {
    isIPX:false
  },
  checkIsIPhoneX: function () {
    const self = this
    wx.getSystemInfo({
      success: function (res) {
        // 根据 model 进行判断
        if (res.model.search('iPhone X') != -1) {
          self.globalData.isIPX = true
        }
        // 或者根据 screenHeight 进行判断
        // if (res.screenHeight == 812) {
        //   self.globalData.isIPX = true
        // }
      }
    })
  },


  globalData: {
    userInfo: null,//头像和昵称
  },

  _ajax: function (type, url, data, success, fail, complete) {
    wx.showNavigationBarLoading();
    let app = this;
    data == "" ? data = {} : data;
    // data.userId = wx.getStorageSync('userId');
    wx.request({
      url: app.api_url + url,
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      method: type,
      data: data,
      success: function (res) {
        if (res.data.status === 0) {
          success && success(res.data);
        } else {
          fail && fail(res.data.msg);
        }
        return;
      },
      fail: function (res) {
        fail && fail("网络状况不佳,请稍后再试");
      },
      complete: function (res) {
        // wx.hideLoading();
        wx.hideNavigationBarLoading();
        complete && complete(res);
      }
    });
  },

  _ajaxtoken: function (type, url, data, success, fail, complete) {
    wx.showNavigationBarLoading();
    let app = this;
    data == "" ? data = {} : data;
    // data.userId = wx.getStorageSync('userId');
    wx.request({
      url: app.api_url + url,
      header: {
        'Content-Type': "application/x-www-form-urlencoded",
        'token': wx.getStorageSync("token")
      },
      method: type,
      data: data,
      success: function (res) {
        if (res.data.status === 0) {
          success && success(res.data);
        } else {
          fail && fail(res.data.msg);
        }
        return;
      },
      fail: function (res) {
        fail && fail("网络状况不佳,请稍后再试");
        
      },
      complete: function (res) {
        // wx.hideLoading();
        wx.hideNavigationBarLoading();
        complete && complete(res);
      }
    });
  },

  _ajaxjson: function (type, url, data, success, fail, complete) {
    wx.showNavigationBarLoading();
    let app = this;
    data == "" ? data = {} : data;
    // console.log(JSON.stringify(data));
    // data.userId = wx.getStorageSync('userId');
    wx.request({
      url: app.api_url + url,
      header: {
        'content-type': 'application/json',
      },
      dataType: "json",
      method: type,
      data: JSON.stringify(data),
      success: function (res) {
        if (res.statusCode === 200) {
          success && success(res.data);
        } else {
          fail && fail(res.data.msg);
        }
        return;
      },
      fail: function (res) {
        fail && fail("网络状况不佳,请稍后再试");
      },
      complete: function (res) {
        // wx.hideLoading();
        wx.hideNavigationBarLoading();
        complete && complete(res);
      }
    });
  },

  _ajaxjsontoken: function (type, url, data, success, fail, complete) {
    wx.showNavigationBarLoading();
    let app = this;
    data == "" ? data = {} : data;
    // console.log(JSON.stringify(data));
    // data.userId = wx.getStorageSync('userId');
    wx.request({
      url: app.api_url + url,
      header: {
        'content-type': 'application/json',
        'token': wx.getStorageSync("token")
      },
      dataType: "json",
      method: type,
      data: JSON.stringify(data),
      success: function (res) {
        if (res.statusCode === 200) {
          success && success(res.data);
        } else {
          fail && fail(res.data.msg);
        }
        return;
      },
      fail: function (res) {
        fail && fail("网络状况不佳,请稍后再试");
      },
      complete: function (res) {
        // wx.hideLoading();
        wx.hideNavigationBarLoading();
        complete && complete(res);
      }
    });
  },

  tipToast: function (type, msg, callback) {
    wx.showToast({
      title: msg,
      icon: type == 1 ? 'success' : 'none',
      success: function () {
        callback && (setTimeout(function () {
          callback();
        }, 2500));
      }
    });
  },

})