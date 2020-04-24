// pages/recharge.js
const app = getApp()
const promisify = require('../../utils/util')
var time = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    disableScroll: true,
    showModalStatus: false,
    twoshow: false,
    isIPX: app.globalData.isIPX,
    current: 0,//当前页码
    isShow: false,
    url: "../../res/imgs/dz.png",
    iShow: true,
    headcount: '',
    category: [],
    firstCase: [],
    secondCase: [{
      caseAttrs:[]
    }],
    question:[],
    word: '',
    cover: '',
    name: '',
    companyName: '',
    companyPosition: '',
    phone: '',
    wechat: '',
    email: '',
    address: '',
    introText: '',
    likeNum:0,
    browse:'',
    browseUrl:[4],
    cardId:'',
    cardDisplay:'',
    dd:{
      "name":'湛程网络科技'
    },
    navDatass: [
      {
        text: '../../res/imgs/team1_Jc.jpg'
      }, {
        text: '../../res/imgs/bangonghuangjing_Jc.jpg'
      }, {
        text: '../../res/imgs/team2_Jc.jpg'
      }, {
        text: '../../res/imgs/bangonghuanjing_Jc.jpg'
      }
    ],
    navData: [
      {
        text: "名片",  //文本
        current: 0,
        iconPath: '../../res/imgs/mingpian.png',
        selectedIconPath: '../../res/imgs/mingpian2.png',
      },
      {
        text: "报价",  //文本
        current: 1,
        iconPath: '../../res/imgs/baojia.png',
        selectedIconPath: '../../res/imgs/baojia1.png',
      },
      {
        text: "官网",  //文本
        current: 2,
        iconPath: '../../res/imgs/shop.png',
        selectedIconPath: '../../res/imgs/shangcheng5.png',
      },
      {
        text: "案例",  //文本
        current: 3,
        iconPath: '../../res/imgs/anli.png',
        selectedIconPath: '../../res/imgs/anli2.png',
      },
      {
        text: "我",  //文本
        current: 4,    //是否是当前页，0不是  1是
        iconPath: '../../res/imgs/me.png',
        selectedIconPath: '../../res/imgs/wo.png',
      },
    ],
    appList: [],
    wxList: [],
    mobileList: [],
    pcList: [],
    anliList: [{
      attrName:[]
    }],
    size:0,
    num:0,
    tabData: [
      {
        text: "",
        img: '../../res/imgs/cardPhone.png',
      },
      {
        text: '',
        img: '../../res/imgs/cardWechat.png',
      },
      {
        text: "",
        img: '../../res/imgs/cardEmail.png',
      },
      {
        text: "",
        img: '../../res/imgs/cardAddress.png',
      }
    ],
    youDisplay:'',
    bjData: [
      {
        text: '需求整理',
        img: '../../res/imgs/xuqiuzhengli2.png',
      },
      {
        text: '自助报价',
        img: '../../res/imgs/zizhubaojia2.png',
      },
      {
        text: '确定需求',
        img: '../../res/imgs/quedingxuqiu2.png',
      },
      {
        text: '签署合同',
        img: '../../res/imgs/qianshuhetong.png',
      },
      {
        text: '原型设计',
        img: '../../res/imgs/yuanxingsheji.png',
      },
      {
        text: 'IT开发',
        img: '../../res/imgs/itkaifa.png',
      },
      {
        text: '在线测试验收',
        img: '../../res/imgs/zaixianceshiyanshou.png',
      },
      {
        text: '上线运营维护',
        img: '../../res/imgs/shangxianyunyingweihu.png',
      }
    ],
    hiddenName: true,
    currentTab: 0,
    navScrollLeft: 0,
    bb: {
      "name": "自助报价"
    },
    cc: {
      "name": "案例"
    },
    imgUrls: [],
    indicatorDots: false,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    circular: true,
    msgList: [],
    businessCards:'',
    dianji:'businessCards',
    urlCas:'',
    opo:[],
    firstType:[],
    userInfo:''
  },

  switchNav: function (e) {
    let _this =this ;
    this.setData({
      idx: e.currentTarget.dataset.idx,
    })

    if (e.currentTarget.dataset.idx == 0) {
      wx.makePhoneCall({
        phoneNumber: this.data.phone,
      })
    } else if (e.currentTarget.dataset.idx == 3) {
      wx.getLocation({
        type: 'gcj02', //返回可以用于wx.openLocation的经纬度
        success: function (res) {
          wx.openLocation({
            latitude: _this.data.addressLatitude,
            longitude: _this.data.addressLongitude,
            name: _this.data.companyName,
            address: _this.data.address
          })
        }
      })
    } else {
      wx.setClipboardData({
        data: e.currentTarget.dataset.text,
        success: function (res) {
          wx.getClipboardData({
            success: function (res) {
              if (e.currentTarget.dataset.idx == 1) {
                wx.showToast({
                  title: '已复制微信号'
                })
              } else if (e.currentTarget.dataset.idx == 2) {
                wx.showToast({
                  title: '已复制邮箱'
                })
              }
            }
          })
        }
      })
    }
  },

  guanwangdibu:function(){
    wx.makePhoneCall({
      phoneNumber: '400-992-5090',
    })
  },

  gongsidizhi:function(){
    var _this = this;
    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success: function (res) {
        wx.openLocation({
          longitude: 120.1252130000, 
          latitude: 30.2787670000,
          name: _this.data.companyName,
          address: _this.data.address
        })
      }
    })
  },

  addPhone: function () {
    let that = this;
    // 添加到手机通讯录
    wx.addPhoneContact({
      firstName:that.data.name,
      mobilePhoneNumber: that.data.phone,//联系人手机号
      weChatNumber:that.data.wechat,
      email:that.data.email,
      organization:that.data.companyName,
      title:that.data.companyPosition,
      workAddressStreet:that.data.address
    })
  },

  close_tap: function () {
    this.setData({
      isShow: true
    })
  },

  open_tap: function () {
    this.setData({
      isShow: false
    })
  },

  changeIndicatorDots: function (e) {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
  },
  changeAutoplay: function (e) {
    this.setData({
      autoplay: !this.data.autoplay
    })
  },
  intervalChange: function (e) {
    this.setData({
      interval: e.detail.value
    })
  },
  durationChange: function (e) {
    this.setData({
      duration: e.detail.value
    })
  },

  getuserpica: function () {
    var _this = this;
    wx.getUserInfo({
      success: res => {
        let rpx = 1;
        wx.getSystemInfo({
          success(res) {
            rpx = res.windowWidth / 375;
          },
        })
        const wxGetImageInfo = promisify.promisify(wx.getImageInfo)
        const ctx = wx.createCanvasContext('shareCanvasa')
        wx.getImageInfo({ //读取图片
          src: _this.data.cover.trim(),
          success: function (res) {
            _this.setData({
              realpath: res.path
            })
            ctx.save()
            ctx.beginPath()
            ctx.drawImage(_this.data.realpath, 0, 0, 414 * rpx, 399 * rpx)
            _this.roundRect(ctx, 60 * rpx, 100 * rpx, 260 * rpx, 120 * rpx, 10)
            ctx.setFillStyle('rgba(255,255,255,0.9)')
            ctx.fillRect(60 * rpx, 100 * rpx, 314 * rpx, 120 * rpx)
            ctx.setFillStyle("#333")
            ctx.font = 'normal 28px sans-serif';
            ctx.fillText(_this.data.name, 75 * rpx, 150 * rpx)
            ctx.setFillStyle('#333')
            ctx.font = 'normal 18px sans-serif';
            ctx.fillText(_this.data.companyName, 100 * rpx, 195 * rpx)
            ctx.drawImage('../../res/imgs/zc.png', 75 * rpx, 179 * rpx, 18 * rpx, 20 * rpx)
            ctx.restore()

            ctx.save()
            ctx.beginPath()
            ctx.arc(270 * rpx, 145 * rpx, 35 * rpx, 0, Math.PI * 2, false);
            ctx.clip();
            ctx.drawImage(_this.data.realpath, 235 * rpx, 110 * rpx, 70 * rpx, 70 * rpx)
            ctx.restore();

            _this.roundRect(ctx, 132 * rpx, 250 * rpx, 114 * rpx, 35 * rpx, 5)
            ctx.setFillStyle('#fff')
            ctx.fillRect(132 * rpx, 250 * rpx, 114 * rpx, 35 * rpx)
            ctx.restore()
            ctx.setFillStyle('#333')
            ctx.font = 'normal 18px sans-serif';
            ctx.fillText('立即查看', 157 * rpx, 273 * rpx)
            //绘制图片
            ctx.draw(false,()=>{
              wx.canvasToTempFilePath({
                canvasId: 'shareCanvasa',
                fileType: 'png',
                success:(res) => {
                  var tempFilePath = res.tempFilePath;
                  _this.setData({
                    imagePath: tempFilePath,
                    maskHidden: false
                  });
                },
                fail:(res) => {
                }
              }, this)
            })
          },
          error(res) {
            
          }
        })
      },
      fail(res) {
        
      }
    })
  },
  roundRect(ctx, x, y, w, h, r) {
    // 开始绘制
    ctx.beginPath()
    // 因为边缘描边存在锯齿，最好指定使用 transparent 填充
    ctx.setFillStyle('transparent')
    // ctx.setStrokeStyle('transparent')
    // 绘制左上角圆弧
    ctx.arc(x + r, y + r, r, Math.PI, Math.PI * 1.5)

    // 绘制border-top
    ctx.moveTo(x + r, y)
    ctx.lineTo(x + w - r, y)
    ctx.lineTo(x + w, y + r)
    // 绘制右上角圆弧
    ctx.arc(x + w - r, y + r, r, Math.PI * 1.5, Math.PI * 2)

    // 绘制border-right
    ctx.lineTo(x + w, y + h - r)
    ctx.lineTo(x + w - r, y + h)
    // 绘制右下角圆弧
    ctx.arc(x + w - r, y + h - r, r, 0, Math.PI * 0.5)

    // 绘制border-bottom
    ctx.lineTo(x + r, y + h)
    ctx.lineTo(x, y + h - r)
    // 绘制左下角圆弧
    ctx.arc(x + r, y + h - r, r, Math.PI * 0.5, Math.PI)

    // 绘制border-left
    ctx.lineTo(x, y + r)
    ctx.lineTo(x + r, y)

    ctx.fill()
    // ctx.stroke()
    ctx.closePath()
    // 剪切
    ctx.clip()
  },

  sharepyq: function (e) {
    var currentStatu = e.currentTarget.dataset.statu;
    this.util(currentStatu)
    this.getuserpica()
    this.setData({
      asd: true
    })
  },
  ewhidena: function () {
    this.setData({
      asd: false
    })
  },

  /**
    * 生命周期函数--监听页面加载
  */
  onLoad: function (options) {
    var that = this;
    if (options.bzUid == undefined){
      options.bzUid = ''
    }
    console.log("这是：" + options.bzUid)
    //获取推荐名片
    app._ajax(
      "get",
      "/userCard",
      {
        uid: options.bzUid
      },
      (data) => {
        var phoneUn = "tabData[0].text";
        var wechatUn = "tabData[1].text";
        var emailUn = "tabData[2].text";
        var addressUn = "tabData[3].text"
        that.setData({
          cardId: data.data.userInfo.cid,
          companyName: data.data.userInfo.companyName,
          cover: data.data.userInfo.cover,
          name: data.data.userInfo.name,
          introText: data.data.userInfo.introText.replace(/↵/g, '\n'),
          likeNum: data.data.likeNum,
          browse: data.data.browseNum,
          browseUrl: data.data.browseInfo,
          companyPosition: data.data.userInfo.companyPosition,
          [phoneUn]: data.data.userInfo.phone,
          phone: data.data.userInfo.phone,
          address: data.data.userInfo.address,
          wechat: data.data.userInfo.wechat,
          [wechatUn]: data.data.userInfo.wechat,
          [emailUn]: data.data.userInfo.email,
          email: data.data.userInfo.email,
          [addressUn]: data.data.userInfo.address,
          sui: data.data.userInfo.uid,
          addressLatitude: data.data.userInfo.addressLatitude,
          addressLongitude: data.data.userInfo.addressLongitude
        })
        if(data.data.likeNum == null){
          that.data.likeNum = 0
        }
      },
      (msg) => {

      }
    )
    //获取二维码
    var appid = 'wxb7693df10a4aab63';
    var sec = '60adeeecfb32df01511851de32d53a2e';
    var scene = decodeURIComponent(options.scene)
    if (wx.getStorageSync("nice") == ''){
      that.setData({
        isShow: false
      })
    } else if (wx.getStorageSync("nice") == true){
      that.setData({
        isShow: true
      })
    } else if (wx.getStorageSync("nice") == false) {
      that.setData({
        isShow: false
      })
    }

    wx.request({
      //换取access_token 接口
      url: 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=' + appid + '&secret=' + sec,
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        wx: wx.request({
          //获得二维码数据接口
          url: 'https://api.weixin.qq.com/wxa/getwxacodeunlimit?access_token=' + res.data.access_token,
          data: {
            "scene": '000',
            'path': 'pagesA/index/index',//必填 具体的小程序页面，但不能携带参数，参数在scene中携带
          },
          header: {
            'content-type': 'application/json'
          },
          method: 'POST',
          // dataType: 'json',
          responseType: 'arraybuffer',//将原本按文本解析修改为arraybuffer
          success: function (res) {
            var src = wx.arrayBufferToBase64(res.data)
            that.setData({
              src
            })
          }

        })
      }
    })
    // 判断是否已经授权
    wx.getSetting({
      success: (res) => {
        if (res.authSetting['scope.userInfo']) {//授权了，可以获取用户信息了
          app._ajax(
            'get',
            '/userCard',
            {
              uid: wx.getStorageSync('userUid')
            },
            (res) => {
              that.setData({
                cardDisplay: 'none',
                businessCards: '查看我的名片',
                dianji: 'chakan',
                youDisplay: 'block'
              })
            },
            (meg) => {
              that.setData({
                cardDisplay: 'block',
                businessCards: '创建我的名片',
                dianji: 'businessCards',
                youDisplay: 'none'
              })
            }
          )
        } else {//未授权，跳到授权页面
          that.setData({
            userInfo: false,
            cardDisplay: 'block',
            businessCards: '创建我的名片',
            dianji: 'businessCards',
            youDisplay: 'none'
          })

        }
      }
    });
    wx.removeStorageSync("checkedNum");
    wx.removeStorageSync("checkedNum1");
    wx.removeStorageSync("checkedNum2");
    wx.removeStorageSync("checkedNum3")
    that.qingqiu();

    //获取商城轮播图
    app._ajax(
      'get',
      '/banner',
      {
        type:0
      },
      (data) => {
        that.setData({
          imgUrls: data.data
        })
      }
    )

    //获取新闻资讯
    // app._ajax(
    //   'get',
    //   '/news/list',
    //   {
    //     current:1,
    //     size:3
    //   },
    //   (data) => {
    //     console.log(data.data)
    //   }
    // )
    wx.request({
      url: app.api_url+'/news/list',
      method:'get',
      data:{
        current:1,
        size:3
      },
      success(res){
        var contenta = res.data.data.records
        for (var i = 0; i < contenta.length; i++) {
          contenta[i]['gmtCreate'] = time.formatTimeTwo(contenta[i].gmtCreate, 'Y-M-D')
        }
        that.setData({
          question: res.data.data.records
        })
      }
    })

    /**
     * 获取用户信息
     */
    // wx.getUserInfo({
    //   success: function (res) {
    //     var avatarUrl = 'userInfo.avatarUrl';
    //     var nickName = 'userInfo.nickName';
    //     that.setData({
    //       [avatarUrl]: res.userInfo.avatarUrl,
    //       [nickName]: res.userInfo.nickName,
    //     })
    //   }
    // })
    wx.setNavigationBarTitle({
      title: '个人名片',
    })

    this.list = [{
      'hasChange': false
    }]

    this.setData({
      list: this.list,
      wxh: options.bzUid
    })
  },

  bindGetUserInfo: function (e) {
    if (e.detail.userInfo) {
      //用户按了允许授权按钮
      var that = this;
      // 获取到用户的信息了，打印到控制台上看下
      //授权成功后,通过改变 isHide 的值，让实现页面显示出来，把授权页面隐藏起来
      that.setData({
        isHide: false,
        userInfo:true
      });
      wx.login({
        success: function (res_login) {
          if(res_login.code){
            wx.getUserInfo({
              success:function(res){
                wx.request({
                  url: app.api_url+'/user/wxLogin',
                  header: { 'Content-Type': 'application/x-www-form-urlencoded' },
                  method: 'POST',
                  data: {
                    code: res_login.code,
                    encryptedData: res.encryptedData,
                    iv: res.iv
                  },
                  success:res=>{
                    wx.setStorageSync("token", res.data.data.token);
                    app._ajaxtoken(
                      'get',
                      '/user',
                      '',
                      (res) => {
                        wx.setStorageSync('userUid', res.data.uid)
                        app._ajax(
                          'get',
                          '/userCard',
                          {
                            uid: wx.getStorageSync('userUid')
                          },
                          (res) => {
                            that.setData({
                              cardDisplay: 'none',
                              businessCards: '查看我的名片',
                              dianji: 'chakan',
                              youDisplay: 'block'
                            })
                          },
                          (meg) => {
                            that.setData({
                              cardDisplay: 'block',
                              businessCards: '创建我的名片',
                              dianji: 'businessCards',
                              youDisplay: 'none'
                            })
                          }
                        )
                      }
                    )
                  }
                })
              }
            })
          }
        }
      })
    } else {
      //用户按了拒绝按钮
      wx.showModal({
        title: '警告',
        content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
        showCancel: false,
        confirmText: '返回授权',
        success: function (res) {
          // 用户没有授权成功，不需要改变 isHide 的值
          if (res.confirm) {
            console.log('用户点击了“返回授权”');
          }
        }
      });
    }
  },

  praiseThis: function (e) {
    if(this.data.userInfo == false){
      wx.showToast({
        title: '请先登录',
        icon:"none"
      })
      return false
    }else{
      app._ajaxtoken(
        'post',
        '/cardHistory',
        {
          cardId: this.data.cardId
        },
        (data) => {
          if (data.status == 0) {
            wx.showToast({
              title: '点赞成功',
            })
            this.setData({
              likeNum: this.data.likeNum + 1,
              isShow: true
            })
            wx.setStorageSync("nice", isShow)
          }
        },
        (msg) => {
          wx.showToast({
            title: '已经点赞过了',
            icon: 'none'
          })
        }
      )
    }
  },
  //切换tabbar
  tabbar: function (e) {
    var _this = this;
    this.setData({
      current: e.currentTarget.dataset.current,
    })
  },

  changeOil: function (e) {
    this.setData({
      num: e.target.dataset.num
    })
    //获取案例标签
    app._ajax(
      "get",
      "/caseLabel",
      { pid: this.data.num },
      (data) => {
        this.setData(
          {
            secondCase: data.data
          }
        )
      },
      (msg) => {

      }
    )
    //根据一级分类查询案例
    if(this.data.num == 0){
      this.data.num = ''
    }
    app._ajax(
      "get",
      "/case/list",
      {
         tid: this.data.num ,
         current:1,
         size:20
      },
      (data) => {
        this.setData({
          anliList: data.data.records
        })
        for (var i in this.data.anliList) {
          var a = this.data.anliList[i].attrName.split(",")
        }
      },
      (msg) => {

      }
    )
  },

  changeFl: function (e) {
    var pidd = e.target.dataset.size
    if (e.target.dataset.size==0){
      pidd = this.data.num
      if(this.data.num == 0){
        pidd = ''
      }
    }
    this.setData({
      size: e.target.dataset.size
    })
    //根据二级分类查询案例
    app._ajax(
      "get",
      "/case/list",
      {
        current:1,
        size: 10,
        tid: pidd
      },
      (data) => {
        this.setData(
          {
            anliList: data.data.records
          }
        )
      },
      (msg) => {

      }
    )
  },

  //跳转更多新闻资讯页面
  gonews:function(){
    wx.navigateTo({
      url: '/pagesA/news/news',
    })
  },

  //跳转案例详情
  goCaseDetails:function(e){
    wx.navigateTo({
      url: '/pagesA/caseDetails/caseDetails?cid='+e.currentTarget.dataset.cid,
    })
  },

  //跳转创建名片页面
  businessCards:function(){
    if(this.data.userInfo == true){
      wx.navigateTo({
        url: '/pagesA/businessCards/businessCards?type=' + 'save',
      })
    } else {
      wx.showToast({
        title: '请先登录',
        icon:'none'
      })
    }
  },

  //跳转修改我的名片页面
  updateMycard: function () {
    var json = [];
    var message = { 'cover': this.data.covera, 'name': this.data.namea, 'wechat': this.data.wechata, 'phone': this.data.phonea, "email": this.data.emaila, 'companyPosition': this.data.companyPositiona, 'companyName': this.data.companyNamea, 'address': this.data.addressa, 'introText': this.data.introTexta }
    json.push(message);
    var de = JSON.stringify(json)
    wx.navigateTo({
      url: '/pagesA/businessCards/businessCards?json=' + de + '&type=' + 'update',
    })
  },

  //跳转查看我的名片页面
  chakan: function () {
    var _this = this;
    app._ajax(
      "get",
      "/userCard",
      {
        uid:wx.getStorageSync("userUid")
      },
      (data) => {
        var phoneUn = "tabData[0].text";
        var wechatUn = "tabData[1].text";
        var emailUn = "tabData[2].text";
        var addressUn = "tabData[3].text"
        if (data.data.userInfo.introText==null){
          data.data.userInfo.introText = '这家伙很懒，什么都没留下'
        }
        _this.setData({
          current:0,
          cardId: data.data.userInfo.cid,
          companyName: data.data.userInfo.companyName,
          cover: data.data.userInfo.cover,
          name: data.data.userInfo.name,
          introText: data.data.userInfo.introText,
          likeNum: data.data.likeNum,
          browse: data.data.browseNum,
          browseUrl: data.data.browseInfo,
          companyPosition: data.data.userInfo.companyPosition,
          [phoneUn]: data.data.userInfo.phone,
          phone: data.data.userInfo.phone,
          address: data.data.userInfo.address,
          wechat: data.data.userInfo.wechat,
          [wechatUn]: data.data.userInfo.wechat,
          [emailUn]: data.data.userInfo.email,
          email: data.data.userInfo.email,
          [addressUn]: data.data.userInfo.address,
          sui: data.data.userInfo.uid,
          addressLatitude: data.data.userInfo.addressLatitude,
          addressLongitude: data.data.userInfo.addressLongitude
        })
        if (data.data.likeNum == null) {
          that.data.likeNum = 0
        }
      },
      (msg) => {

      }
    )
  },

  //跳转收货地址页面
  goAddress:function(){
    wx.navigateTo({
      url: '/pagesA/addressList/addressList',
    })
  },

  goDetails: function (event) {
    var postad = event.currentTarget.dataset.postad   //获取传递的值
    wx.navigateTo({
      url: '/pagesA/details/details?pid=' + postad,
    })
  },

  goWebsite: function () {
    this.setData({
      current:2
    })
  },

  //跳转报价详情页
  goNewOffer:function(){
    wx.navigateTo({
      url: '/pagesA/newOffer/newOffer',
    })
  },

  goQuotation: function (event) {
    var postid = event.currentTarget.dataset.postid   //获取传递的值
    wx.navigateTo({
      url: '/pagesA/quotation/quotation?cid=' + postid,
    })
  },

  goSearch: function () {
    wx.navigateTo({
      url: '/pagesA/search/search',
    })
  },

  goMoreShop: function (event) {
    wx.navigateTo({
      url: '/pagesA/moreShop/moreShop?pid=' +18,
    })
  },

  goMoreShop1: function () {
    wx.navigateTo({
      url: '/pagesA/moreShop/moreShop?pid=' + 19,
    })
  },

  goMoreShop2: function () {
    wx.navigateTo({
      url: '/pagesA/moreShop/moreShop?pid=' + 20,
    })
  },

  goMoreShop3: function () {
    wx.navigateTo({
      url: '/pagesA/moreShop/moreShop?pid=' + 21,
    })
  },

  goCoupon: function () {
    wx.navigateTo({
      url: '/pagesA/coupon/coupon',
    })
  },

  goquestion: function () {
    wx.navigateTo({
      url: '/pagesA/puestion/question',
    })
  },

  //跳转新闻资讯详情
  goquestiona: function (event){
    wx.navigateTo({
      url: '/pagesA/newsDetails/newsDetails?id=' + event.currentTarget.dataset.id,
    })
  },

  goCollection: function () {
    wx.navigateTo({
      url: '/pagesA/collection/collection',
    })
  },


  // 请求示范
  qingqiu: function () {
    //获取商城首页商品
    app._ajax(
      "get",
      "/product/productIndex",
      '',
      (data) => {
        this.setData({
          appList:data.data.list[0].goods,
          wxList: data.data.list[1].goods,
          mobileList: data.data.list[2].goods,
          pcList: data.data.list[3].goods
        })
      },
      (msg) => {

      }
    )
    //获取商品一级分类
    app._ajax(
      "get",
      "/productType/firstType",
      '',
      (data) => {
        this.setData(
          {
            firstType:data.data
          }
        )
      },
      (msg) => {

      }
    )
    //获取报价人数
    app._ajax(
      "get",
      "/orderModule",
      '',
      (data) => {
        this.setData(
          {
            headcount: data.data.headcount,
            msgList: data.data.info
          }
        )
      },
      (msg) => {

      }
    )
    //自助报价
    app._ajax(
      "get",
      "/category",
      '',
      (data) => {
        this.setData(
          {
            category: data.data
          }
        )
      },
      (msg) => {

      }
    )
    //获取案例标签
    app._ajax(
      "get",
      "/caseLabel",
      '',
      (data) => {
        this.setData(
          {
            firstCase: data.data
          }
        )
      },
      (msg) => {

      }
    )
    //获取二级案例标签
    app._ajax(
      "get",
      "/caseLabel",
      { pid:'' },
      (data) => {
        this.setData(
          {
            secondCase: data.data
          }
        )
      },
      (msg) => {

      }
    )
    //获取案例列表
    app._ajax(
      "get",
      "/case/list",
      {
         tid: '' ,
         current:1,
         size:20
      },
      (data) => {
        this.setData({
          anliList: data.data.records
        })
        for (var i in this.data.anliList) {
          var a = this.data.anliList[i].attrName.split(",")
        }
      },
      (msg) => {

      }
    )
  },

  search: function (e) {
    this.setData({
      word: e.detail.value
    })
  },

  bindconfirm: function (e) {
    //根据name搜索案例
    if(this.data.size==0){
      this.data.size=''
    }
    app._ajax(
      "get",
      "/case/list",
      {
        current: 1,
        size:20,
        word: this.data.word
      },
      (data) => {
        this.setData(
          {
            anliList: data.data.records
          }
        )
      },
      (msg) => {

      }
    )
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
            showShareStatus: false
          }
        );
      }
    }.bind(this), 200)

    // 显示抽屉
    if (currentStatu == "open") {
      this.setData(
        {
          showShareStatus: true
        }
      );
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
    wx.showToast({
      title: '加载中....',
      icon: 'loading'
    })
    if(this.data.current != 3){
      this.qingqiu()
    }
    //模拟加载
    setTimeout(function () {
      wx.hideNavigationBarLoading()//完成停止加载
      wx.stopPullDownRefresh()//停止下拉刷新
    }, 1500);
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
    }
    return {
      title: '您好！我是' + this.data.name + ',这是我的微信名片，请您惠存！',
      path: '/pages/index/index?bzUid='+this.data.sui,
      imageUrl: this.data.cover,
      success: function (res) {
        
      }
    }
  },

  getuserpic: function () {
    var _this = this;
    wx.getUserInfo({
      success: res => {
        let rpx = 1;
        wx.getSystemInfo({
          success(res) {
            rpx = res.windowWidth / 375;
          },
        })
        const wxGetImageInfo = promisify.promisify(wx.getImageInfo)
        var fsm = wx.getFileSystemManager()
        var FILE_BASE_NAME = 'tmp_base64src'
        var format = 'png'
        var buffer = wx.base64ToArrayBuffer(_this.data.src)
        var filePath = `${wx.env.USER_DATA_PATH}/www.${format}`
        fsm.writeFile({ //写文件
          filePath,
          data: buffer,
          encoding: 'binary',
          success(res) {
            wx.getImageInfo({ //读取图片
              src: filePath,
              success: function (res) {
                ctx.drawImage(res.path, 240 * rpx, 425 * rpx, 70 * rpx, 70 * rpx) //画图
              },
              error(res) {
                console.log("shibaile")
              }
            })
            wx.getImageInfo({ //读取图片
              src: _this.data.cover.trim(),
              success: function (res) {
                _this.setData({
                  realpath: res.path
                })
                ctx.drawImage(_this.data.realpath, 0, 0, 375 * rpx, 350 * rpx) //画图
                ctx.draw()
              },
              error(res) {
                console.log("shibaile")
              }
            })
          }
        })
        if (_this.data.phone==null){
          _this.data.phone = '暂无'
        }
        if (_this.data.wechat == null) {
          _this.data.wechat = '暂无'
        }
        if (_this.data.address == null) {
          _this.data.address = '暂无'
        }
        const ctx = wx.createCanvasContext('shareCanvas')
        ctx.drawImage("../../res/imgs/iiiii.jpg")
        ctx.setFillStyle("#333")
        ctx.font = 'normal bold 16rpx sans-serif'
        ctx.fillText(_this.data.companyName, 20 * rpx, 375 * rpx)
        ctx.setFillStyle("#333")
        ctx.font = 'normal bold 16px sans-serif';
        ctx.fillText(_this.data.name, 20 * rpx, 400 * rpx)
        ctx.setFillStyle("#808080")
        ctx.font = 'normal bold 12px sans-serif';
        ctx.fillText(_this.data.companyPosition,80*rpx,400*rpx)
        ctx.font = 'normal bold 12px sans-serif';
        ctx.setFillStyle('#808080')
        ctx.drawImage('../../res/imgs/cardPhone.png',20*rpx,438*rpx,15*rpx,15*rpx)
        ctx.fillText(_this.data.phone,40*rpx,450*rpx)
        ctx.drawImage('../../res/imgs/cardWechat.png',20*rpx,458*rpx,15*rpx,15*rpx)
        ctx.fillText(_this.data.wechat,40*rpx,470*rpx)
        ctx.drawImage('../../res/imgs/cardAddress.png',20*rpx,478*rpx,15*rpx,15*rpx)
          _this.drawText(ctx, _this.data.address, 40 * rpx, 490 * rpx, 10 * rpx, 170 * rpx)
        ctx.fillText("长按识别小程序",235*rpx,510*rpx)
        ctx.stroke()

      },
      fail(res){
        console.log("失败")
      }
    })
  },
  drawText: function (ctx, str, leftWidth, initHeight, titleHeight, canvasWidth) {
    var lineWidth = 0;
    var lastSubStrIndex = 0; //每次开始截取的字符串的索引
    for (let i = 0; i < str.length; i++) {
      lineWidth += ctx.measureText(str[i]).width;
      if (lineWidth > canvasWidth) {
        ctx.fillText(str.substring(lastSubStrIndex, i), leftWidth, initHeight); //绘制截取部分
        initHeight += 16; //16为字体的高度
        lineWidth = 0;
        lastSubStrIndex = i;
        titleHeight += 50;
      }
      if (i == str.length - 1) { //绘制剩余部分
        ctx.fillText(str.substring(lastSubStrIndex, i + 1), leftWidth, initHeight);
      }
    }
    // 标题border-bottom 线距顶部距离
    titleHeight = titleHeight + 10;
    return titleHeight
  },

  ewshow: function () {
    this.getuserpic()
    this.setData({
      twoshow: true,
      showShareStatus: false
    })
  },
  ewhiden: function () {
    this.setData({
      twoshow: false
    })
  },
  save: function () {
    let _this = this;
    _this.setData({
      hiddenName: !this.data.hiddenName,
    })
    const wxCanvasToTempFilePath = promisify.promisify(wx.canvasToTempFilePath)
    const wxSaveImageToPhotosAlbum = promisify.promisify(wx.saveImageToPhotosAlbum)
    wxCanvasToTempFilePath({
      canvasId: 'shareCanvas'
    }, this).then(res => {
      wx.saveImageToPhotosAlbum({
        filePath: res.tempFilePath,
        success: function (data) {
          wx.hideLoading()
          wx.showModal({
            title: '提示',
            content: '您的推广二维码已存入手机相册，赶快分享给好友吧',
            showCancel: false,
          })
          _this.setData({
            twoshow: false
          })
        },
        fail: function (err) {
          if (err.errMsg === "saveImageToPhotosAlbum:fail:auth denied" || err.errMsg === "saveImageToPhotosAlbum:fail auth deny") {
            // 这边微信做过调整，必须要在按钮中触发，因此需要在弹框回调中进行调用
            wx.showModal({
              title: '提示',
              content: '需要您授权保存相册',
              showCancel: false,
              success: modalSuccess => {
                wx.openSetting({
                  success(settingdata) {
                    console.log("settingdata", settingdata)
                    if (settingdata.authSetting['scope.writePhotosAlbum']) {
                      wx.showModal({
                        title: '提示',
                        content: '获取权限成功,再次点击图片即可保存',
                        showCancel: false,
                      })
                    } else {
                      wx.showModal({
                        title: '提示',
                        content: '获取权限失败，将无法保存到相册哦~',
                        showCancel: false,
                      })
                    }
                  },
                  fail(failData) {
                    console.log("failData", failData)
                  },
                  complete(finishData) {
                    console.log("finishData", finishData)
                  }
                })
              }
            })
          }
        },
        complete(res) {
          wx.hideLoading()
        }
      })
    }).then(res => {
      // wx.showToast({
      //   title: '已保存到相册'
      // })
      // this.setData({
      //   twoshow: false
      // })
    })
  },
})