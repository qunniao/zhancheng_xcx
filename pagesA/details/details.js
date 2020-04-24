// pagesA/details/details.js
const app = getApp()
const promisify = require('../../utils/util')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    twoshow: false,
    isIPX: app.globalData.isIPX,
    bb:{
      "flag":1,
      "name":'产品详情'
    },
    productName:'',
    shuliang:10000,
    marketPrice:'',
    detail:'',
    price:'',
    realprice:'',
    priceUnit:'',
    name:'',
    content:'',
    gongqi:'',
    value:'',
    access_token:'',
    bnrUrl: [],
    isIPX: app.globalData.isIPX,
    num: 1,
    // 使用data数据对象设置样式名
    minusStatus: 'disabled',
    showModalStatus: false,
    taocan:[],
    imgUrl:'',
    leixing:[],
    firstLevel:[{
      productGuigeValueList:[]
    }],
    sku: [],
    funlist: [],
    funvalue: ['', '', ''],
    ischeck1: [],//变动的sku
    ischeck2: [],
    ischeck3: [],
    skudata: [],
    savenowskulist1: [],
    savenowskulist2: [],
    savenowskulist3: []
  },

  last: function(e){
    let pages = getCurrentPages();
    let prevPage = pages[pages.length - 2];
    prevPage.setData({
      message: e.currentTarget.dataset.msg,
    })
    wx.navigateBack({
      delta: 1,
    })
  },


  //获取分享给好友的图片
  getuserpica: function () {
    var _this = this;
    console.log('价格：' + _this.data.price)
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
          src: _this.data.spUrl.trim(),
          success: function (res) {
            _this.setData({
              realpath: res.path
            })
            ctx.drawImage('../../res/imgs/iiiii.jpg')
            ctx.setFillStyle("red")
            ctx.font = 'normal 20px sans-serif';
            ctx.fillText("￥", 20 * rpx, 40 * rpx)
            ctx.setFillStyle("red")
            ctx.font = 'normal 24px sans-serif';
            ctx.fillText(_this.data.price, 45 * rpx, 40 * rpx)
            ctx.setFillStyle("#808080")
            ctx.font = 'normal 18px sans-serif';
            ctx.fillText("￥" + _this.data.marketPrice, 110 * rpx, 40 * rpx)
            ctx.drawImage(_this.data.realpath, 75 * rpx, 60 * rpx, 224 * rpx, 208 * rpx)
            //绘制图片
            ctx.draw(false, () => {
              wx.canvasToTempFilePath({
                canvasId: 'shareCanvasa',
                fileType: 'png',
                success: (res) => {
                  var tempFilePath = res.tempFilePath;
                  _this.setData({
                    imagePath: tempFilePath,
                    maskHidden: false
                  });
                  console.log("绘制的图片" + _this.data.imagePath)
                },
                fail: (res) => {
                  console.log(res)
                }
              }, this)
            })
          },
          error(res) {
            console.log("shibaile")
          }
        })
      },
      fail(res) {
        console.log("失败")
      }
    })
  },

  share: function (e) {
    var currentStatu = e.currentTarget.dataset.statu;
    this.qwe(currentStatu)
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

  powerDrawer: function (e) {
    var currentStatu = e.currentTarget.dataset.statu;
    this.util(currentStatu)
  },
  util: function (currentStatu) {
    /* 动画部分 */
    // 第1步：创建动画实例 
    var animation = wx.createAnimation({
      duration: 300,  //动画时长
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
    }.bind(this), 300)

    // 显示抽屉
    if (currentStatu == "open") {
      this.setData(
        {
          showModalStatus: true
        }
      );
    }
  },

  meal: function (e) {
    var currentStatu = e.currentTarget.dataset.statu;
    this.asd(currentStatu)
  },

  asd: function (currentStatu) {
    /* 动画部分 */
    // 第1步：创建动画实例 
    var animation = wx.createAnimation({
      duration: 300,  //动画时长
      timingFunction: "linear", //线性
      delay: 0  //0则不延迟
    });

    // 第2步：这个动画实例赋给当前的动画实例
    this.animation = animation;

    // 第3步：执行第一组动画：Y轴偏移240px后(盒子高度是240px)，停
    animation.translateY(240).step();

    // 第4步：导出动画对象赋给数据对象储存
    this.setData({
      mealData: animation.export()
    })

    // 第5步：设置定时器到指定时候后，执行第二组动画
    setTimeout(function () {
      // 执行第二组动画：Y轴不偏移，停
      animation.translateY(0).step()
      // 给数据对象储存的第一组动画，更替为执行完第二组动画的动画对象
      this.setData({
        mealData: animation
      })

      //关闭抽屉
      if (currentStatu == "close") {
        this.setData(
          {
            showMealStatus: false
          }
        );
      }

    }.bind(this), 300)

    // 显示抽屉
    if (currentStatu == "open") {
      this.setData(
        {
          showMealStatus: true
        }
      );
    }

  },

  qwe: function (currentStatu) {
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
      shareData: animation.export()
    })

    // 第5步：设置定时器到指定时候后，执行第二组动画
    setTimeout(function () {
      // 执行第二组动画：Y轴不偏移，停
      animation.translateY(0).step()
      // 给数据对象储存的第一组动画，更替为执行完第二组动画的动画对象
      this.setData({
        shareData: animation
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

  change: function (e) {
    let _this = this;
    _this.setData({
      index1: e.target.dataset.index1
    })
    _this.setData({
      index2: e.target.dataset.index2
    })
    _this.setData({
      index3: e.target.dataset.index3
    })

    // 获取当前选择层级
    let changedata = e.currentTarget.dataset;
    // 选择层级的顺序
    let datalist = _this.data.funlist;
    // 已选择层级的值
    let datalistvalue = _this.data.funvalue
    // sku数据
    let skudatas = _this.data.skudata
    // 可选择的选项
    let isarronelist = _this.data.ischeck1
    let isarrtwolist = _this.data.ischeck2
    let isarrthreelist = _this.data.ischeck3
    // 初始化数组
    let savaisarrone = []
    let savaisarrtwo = []
    let savaisarrthree = []
    //  选择时先将所有按钮默认未不可选 
    for (let j = 0; j < isarronelist.length; j++) {
      isarronelist[j].ischeck = false
    }
    for (let j = 0; j < isarrtwolist.length; j++) {
      isarrtwolist[j].ischeck = false
    }
    for (let j = 0; j < isarrthreelist.length; j++) {
      isarrthreelist[j].ischeck = false
    }

    // 判断修改选择层级顺序和修改层级选择的值
    if (datalist.indexOf(changedata.type) == -1) {
      datalist.push(changedata.type)
      datalistvalue[changedata.type - 1] = changedata.names
      _this.setData({
        datalistvalue: datalistvalue
      })
    } else {
      for (let i = 0; i < datalist.length; i++) {
        if (datalist[i] == changedata.type) {
          if (datalistvalue[changedata.type - 1] == changedata.names) {
            datalist.splice(i, 1)
            datalistvalue[changedata.type - 1] = ''
          } else {
            datalistvalue[changedata.type - 1] = changedata.names
          }
        }
      }
    }
    // sku都未选择时，数据初始化
    if (datalist.length == 0) {
      let sku = skudatas
      let arrone = []
      let arrtwo = []
      let arrthree = []

      let isarrone = []
      let isarrtwo = []
      let isarrthree = []
      for (let i = 0; i < sku.length; i++) {
        if (sku[i].sp1 != null) {
          if (arrone.indexOf(sku[i].sp1) == -1) {
            arrone.push(sku[i].sp1)
          }
        }
        if (sku[i].sp2 != null) {
          if (arrtwo.indexOf(sku[i].sp2) == -1) {
            arrtwo.push(sku[i].sp2)
          }
        }
        if (sku[i].sp3 != null) {
          if (arrthree.indexOf(sku[i].sp3) == -1) {
            arrthree.push(sku[i].sp3)
          }
        }
      }
      for (let j = 0; j < arrone.length; j++) {
        isarrone.push({
          name: arrone[j],
          ischeck: false
        })
      }
      for (let j = 0; j < arrtwo.length; j++) {

        isarrtwo.push({
          name: arrtwo[j],
          ischeck: false
        })
      }
      for (let j = 0; j < arrthree.length; j++) {
        isarrthree.push({
          name: arrthree[j],
          ischeck: false
        })
      }
      console.log(sku)
      console.log(isarrtwo)
      for (let i = 0; i < sku.length; i++) {
        for (let j = 0; j < isarrone.length; j++) {
          if (sku[i].sp1 == isarrone[j] && sku[i].num > 0) {
            isarrone[j].ischeck = true
          }
        }
        for (let j = 0; j < isarrtwo.length; j++) {
          if (sku[i].sp2 == isarrtwo[j] && sku[i].num > 0) {
            isarrtwo[j].ischeck = true
          }
        }
        for (let j = 0; j < isarrthree.length; j++) {
          if (sku[i].sp3 == isarrthree[j] && sku[i].num > 0) {
            isarrthree[j].ischeck = true
          }
        }
      }
      savaisarrone = isarrone
      savaisarrtwo = isarrtwo
      savaisarrthree = isarrthree
    }
    // sku状态判断
    if (datalistvalue[0] == '') {
      if (datalistvalue[1] == '') {
        if (datalistvalue[2] == '') {
          // 初始状态
          isarronelist = savaisarrone
          isarrtwolist = savaisarrtwo
          isarrthreelist = savaisarrthree
        } else {
          // 前两层未选择 第三层选择
          for (let i = 0; i < skudatas.length; i++) {
            if (datalistvalue[2] == skudatas[i].sp3 && skudatas[i].num > 0) {
              for (let j = 0; j < isarronelist.length; j++) {
                if (skudatas[i].sp1 == isarronelist[j].name) {
                  isarronelist[j].ischeck = true
                }
              }
              for (let j = 0; j < isarrtwolist.length; j++) {
                if (skudatas[i].sp2 == isarrtwolist[j].name) {
                  isarrtwolist[j].ischeck = true
                }
              }
              for (let j = 0; j < isarrthreelist.length; j++) {
                if (skudatas[i].sp3 == isarrthreelist[j].name) {
                  isarrthreelist[j].ischeck = true
                }
              }
            }
          }
        }
      } else {
        if (datalistvalue[2] == '') {
          // 第二层选择 其余层未选择
          for (let i = 0; i < skudatas.length; i++) {
            if (datalistvalue[1] == skudatas[i].sp2 && skudatas[i].num > 0) {
              for (let j = 0; j < isarronelist.length; j++) {
                if (skudatas[i].sp1 == isarronelist[j].name) {
                  isarronelist[j].ischeck = true
                }
              }
              for (let j = 0; j < isarrtwolist.length; j++) {
                if (skudatas[i].sp2 == isarrtwolist[j].name) {
                  isarrtwolist[j].ischeck = true
                }
              }
              for (let j = 0; j < isarrthreelist.length; j++) {
                if (skudatas[i].sp3 == isarrthreelist[j].name) {
                  isarrthreelist[j].ischeck = true
                }
              }
            }
          }
        } else {
          // 第一三层选择 第二层未选择
          for (let i = 0; i < skudatas.length; i++) {
            if (datalistvalue[2] == skudatas[i].sp3 && skudatas[i].num > 0 && datalistvalue[1] == skudatas[i].sp2) {
              for (let j = 0; j < isarronelist.length; j++) {
                if (skudatas[i].sp1 == isarronelist[j].name) {
                  isarronelist[j].ischeck = true
                }
              }
              for (let j = 0; j < isarrtwolist.length; j++) {
                if (skudatas[i].sp2 == isarrtwolist[j].name) {
                  isarrtwolist[j].ischeck = true
                }
              }
              for (let j = 0; j < isarrthreelist.length; j++) {
                if (skudatas[i].sp3 == isarrthreelist[j].name) {
                  isarrthreelist[j].ischeck = true
                }
              }
            }
          }
        }
      }
    } else {
      if (datalistvalue[1] == '') {
        if (datalistvalue[2] == '') {
          // 第一层选择 第二三层未选择
          for (let i = 0; i < skudatas.length; i++) {
            if (datalistvalue[0] == skudatas[i].sp1 && skudatas[i].num > 0) {
              for (let j = 0; j < isarronelist.length; j++) {
                if (skudatas[i].sp1 == isarronelist[j].name) {
                  isarronelist[j].ischeck = true
                }
              }
              for (let j = 0; j < isarrtwolist.length; j++) {
                if (skudatas[i].sp2 == isarrtwolist[j].name) {
                  isarrtwolist[j].ischeck = true
                }
              }
              for (let j = 0; j < isarrthreelist.length; j++) {
                if (skudatas[i].sp3 == isarrthreelist[j].name) {
                  isarrthreelist[j].ischeck = true
                }
              }
            }
          }
        } else {
          // 第一三层选择 第二层未选择
          for (let i = 0; i < skudatas.length; i++) {
            if (datalistvalue[2] == skudatas[i].sp3 && skudatas[i].num > 0 && datalistvalue[0] == skudatas[i].sp1) {
              for (let j = 0; j < isarronelist.length; j++) {
                if (skudatas[i].sp1 == isarronelist[j].name) {
                  isarronelist[j].ischeck = true
                }
              }
              for (let j = 0; j < isarrtwolist.length; j++) {
                if (skudatas[i].sp2 == isarrtwolist[j].name) {
                  isarrtwolist[j].ischeck = true
                }
              }
              for (let j = 0; j < isarrthreelist.length; j++) {
                if (skudatas[i].sp3 == isarrthreelist[j].name) {
                  isarrthreelist[j].ischeck = true
                }
              }
            }
          }
        }

      } else {
        if (datalistvalue[2] == '') {
          // 第一二层选择 第三层未选择
          for (let i = 0; i < skudatas.length; i++) {
            if (datalistvalue[1] == skudatas[i].sp2 && skudatas[i].num > 0 && datalistvalue[0] == skudatas[i].sp1) {
              for (let j = 0; j < isarronelist.length; j++) {
                if (skudatas[i].sp1 == isarronelist[j].name) {
                  isarronelist[j].ischeck = true
                }
              }
              for (let j = 0; j < isarrtwolist.length; j++) {
                if (skudatas[i].sp2 == isarrtwolist[j].name) {
                  isarrtwolist[j].ischeck = true
                }
              }
              for (let j = 0; j < isarrthreelist.length; j++) {
                if (skudatas[i].sp3 == isarrthreelist[j].name) {
                  isarrthreelist[j].ischeck = true
                }
              }
            }
          }
        } else {
          // 一二三层都选择
          for (let i = 0; i < skudatas.length; i++) {
            if (datalistvalue[1] == skudatas[i].sp2 && datalistvalue[2] == skudatas[i].sp3 && skudatas[i].num > 0 && datalistvalue[0] == skudatas[i].sp1) {
              this.setData({
                skuid: skudatas[i].skuId,
                realprice: skudatas[i].price,
                shuliang: skudatas[i].num,
                skuprice: skudatas[i].price
              })
              for (let j = 0; j < isarronelist.length; j++) {
                if (skudatas[i].sp1 == isarronelist[j].name) {
                  isarronelist[j].ischeck = true
                }
              }
              for (let j = 0; j < isarrtwolist.length; j++) {
                if (skudatas[i].sp2 == isarrtwolist[j].name) {
                  isarrtwolist[j].ischeck = true
                }
              }
              for (let j = 0; j < isarrthreelist.length; j++) {
                if (skudatas[i].sp3 == isarrthreelist[j].name) {
                  isarrthreelist[j].ischeck = true
                }
              }
            }
          }
        }
      }
    }
    _this.setData({
      funlist: datalist,
      ischeck1: isarronelist,
      ischeck2: isarrtwolist,
      ischeck3: isarrthreelist,
    })
  },


  changeOil: function (e) {
    this.setData({
      size: e.target.dataset.size
    })
  },

  /* 点击减号 */
  bindMinus: function () {
    var num = this.data.num;
    // 如果大于1时，才可以减
    if (num > 1) {
      num--;
    }
    // 只有大于一件的时候，才能normal状态，否则disable状态
    var minusStatus = num <= 1 ? 'disabled' : 'normal';
    // 将数值与状态写回
    this.setData({
      num: num,
      minusStatus: minusStatus
    });
  },
  /* 点击加号 */
  bindPlus: function () {
    var num = this.data.num;
    // 不作过多考虑自增1
    num++;
    // 只有大于一件的时候，才能normal状态，否则disable状态
    var minusStatus = num < 1 ? 'disabled' : 'normal';
    // 将数值与状态写回
    this.setData({
      num: num,
      minusStatus: minusStatus
    });
  },
  /* 输入框事件 */
  bindManual: function (e) {
    var num = e.detail.value;
    // 将数值与状态写回
    this.setData({
      num: num
    });
  },

  /**
   * 预览图片
   */
  previewImg: function (e) {
    var index = e.currentTarget.dataset.index;
    var apUrl = this.data.apUrl;
    wx.previewImage({
      current: apUrl[index],     //当前图片地址
      urls: apUrl,               //所有要预览的图片的地址集合 数组形式
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },

  //跳转购物车页面
  goShop:function(){
    wx.navigateTo({
      url: '/pagesA/shop/shop',
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var pid = options.pid;
    var that = this;
    var appid = 'wxb7693df10a4aab63';
    var sec = '60adeeecfb32df01511851de32d53a2e';
    var scene = decodeURIComponent(options.scene)

    wx.request({
      url: app.api_url+'/product/getSku/'+pid,
      method: 'get',
      success(res) {
        var sku = res.data.data.sku;
        // 处理数据
        // sku参数名称数组
        let arrone = []//第一层名称
        let arrtwo = []//第二层名称
        let arrthree = []//第三层名称
        // 处理过的显示在页面上的数组
        let isarrone = []//第一层
        let isarrtwo = []//第二层
        let isarrthree = []//第三层
        for (let i = 0; i < sku.length; i++) {
          if (sku[i].sp1 != null) {
            if (arrone.indexOf(sku[i].sp1) == -1) {
              arrone.push(sku[i].sp1)
            }
          }
          if (sku[i].sp2 != null) {
            if (arrtwo.indexOf(sku[i].sp2) == -1) {
              arrtwo.push(sku[i].sp2)
            }
          }
          if (sku[i].sp3 != null) {
            if (arrthree.indexOf(sku[i].sp3) == -1) {
              arrthree.push(sku[i].sp3)
            }
          }
        }
        for (let j = 0; j < arrone.length; j++) {
          isarrone.push({
            name: arrone[j],
            ischeck: false
          })
        }
        for (let j = 0; j < arrtwo.length; j++) {

          isarrtwo.push({
            name: arrtwo[j],
            ischeck: false
          })
        }
        for (let j = 0; j < arrthree.length; j++) {
          isarrthree.push({
            name: arrthree[j],
            ischeck: false
          })
        }
        console.log(isarrtwo)
        console.log(sku)
        for (let i = 0; i < sku.length; i++) {
          for (let j = 0; j < isarrone.length; j++) {
            if (sku[i].sp1 == isarrone[j].name && sku[i].num != 0) {
              isarrone[j].ischeck = true
            }
          }
          for (let j = 0; j < isarrtwo.length; j++) {
            if (sku[i].sp2 == isarrtwo[j].name && sku[i].num != 0) {
              console.log('执行了')
              isarrtwo[j].ischeck = true
            }
          }
          for (let j = 0; j < isarrthree.length; j++) {
            if (sku[i].sp3 == isarrthree[j].name && sku[i].num != 0) {
              isarrthree[j].ischeck = true
            }
          }
        }
        that.setData({
          ischeck1: isarrone,
          ischeck2: isarrtwo,
          ischeck3: isarrthree,
          skudata: sku,
          title1: res.data.data.productGuigeNameList[0].gName,
          title2: res.data.data.productGuigeNameList[1].gName,
          title3: res.data.data.productGuigeNameList[2].gName,
        })
      }
    })

    wx.request({
      //换取access_token 接口
      url: 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=' + appid + '&secret=' + sec,
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res);
        wx: wx.request({
          //获得二维码数据接口
          url: 'https://api.weixin.qq.com/wxa/getwxacodeunlimit?access_token=' + res.data.access_token,
          data: {
            "scene": '000',
            'path': 'pagesA/details/details?pid=' + wx.getStorageSync("spPid"),
          },
          header: {
            'content-type': 'application/json'
          },
          method: 'POST',
          responseType: 'arraybuffer',
          success: function (res) {
            var src = wx.arrayBufferToBase64(res.data)
            that.setData({
              src
            })
          }

        })
      }
    })
    wx.setStorageSync('spPid', pid)
    app._ajax(
      "get",
      "/product/productInfo",
      {
        pid:pid
      },
      (data) => {
        var qwe = []
        for (var i in data.data.images) {
          var caseUrl = data.data.images[i].url
          qwe.push(caseUrl)
          var newArry = caseUrl.split(",");
        }
        this.setData(
          {
            spUrl:data.data.images[0].url,
            apUrl: qwe,
            bnrUrl:data.data.images,
            productName: data.data.product.productName,
            marketPrice: data.data.product.marketPrice,
            price: data.data.product.price,
            realprice: data.data.product.price,
            priceUnit: data.data.product.priceUnit,
            detail: data.data.detail,
            newscontent: data.data.detail[0].content.replace(/\<img/gi, '<img style="max-width:100%;height:auto"')
          }
        )
      },
      (msg) => {

      }
    )


    //获取产品参数
    app._ajax(
      "get",
      "/product/getParam/"+pid,
      '',
      (data) => {
        this.setData(
          {
            leixing:data.data
          }
        )
      },
      (msg) => {
        
      }
    )
  },

  //添加购物车
  addCar: function (){
    if (this.data.datalistvalue == undefined) {
      wx.showToast({
        title: '请选择参数',
        icon: 'none'
      })
    } else {
      app._ajaxtoken(
        "post",
        "/orderCart",
        {
          skuId: this.data.skuid,
          spuId: wx.getStorageSync("spPid"),
          productNum: this.data.num
        },
        (data) => {
          wx.showToast({
            title: '添加成功',
          });
          console.log("skuid:"+this.data.skuid)
          this.setData(
            {
              showMealStatus: false
            }
          );
        },
        (msg) => {

        }
      )
    }
  },

  //获取订单
  purchase:function(){
    console.log(this.data.datalistvalue[1])
    if (this.data.datalistvalue == undefined) {
      wx.showToast({
        title: '请选择参数',
        icon: 'none'
      })
    } else if (this.data.datalistvalue[1] == '' && this.data.datalistvalue[2] == '') {
      wx.showToast({
        title: '请完善套餐',
        icon: 'none'
      })
    } else {
      var json = [];
      var shopItem = [];
      var skuid = { "skuid": this.data.skuid, "num": this.data.num };
      var details = { "name": this.data.productName, "tupian": this.data.spUrl, "num": this.data.num, "money": this.data.skuprice, "totalPrice": this.data.num * this.data.skuprice };
      json.push(skuid);
      shopItem.push(details);
      var de = JSON.stringify(shopItem)
      wx.setStorageSync('wupin', JSON.stringify(shopItem))
      app._ajaxjsontoken(
        "post",
        "/orderInfo",
        {
          skuInfo: json
        },
        (data) => {
          wx.navigateTo({
            url: '/pagesA/confirm/confirm?orderNumber=' + data.data + '&shop=' + wx.getStorageSync("wupin") + '&totalPrice=' + this.data.num * this.data.skuprice,
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

  onShareAppMessage: function (res) {
    if (res.from === 'button') {
    }
    console.log("分享的图片：" + this.data.imagePath)
    return {
      title: this.data.productName,
      path: 'pagesA/details/details?pid' + wx.getStorageSync("spPid"),
      imageUrl: this.data.imagePath,
      success: function (res) {

      }
    }
  },

  //获取保存的图片
  getuserpic: function () {
    wx.getUserInfo({
      success: res => {
        let rpx = 1;
        wx.getSystemInfo({
          success(res) {
            rpx = res.windowWidth / 375;
          },
        })
        const wxGetImageInfo = promisify.promisify(wx.getImageInfo)
        var that = this;

        let image = this.data.spUrl
        wx.getImageInfo({ // 或者用wx.downloadFile
          src: image,
          success: res => {
            let tempPath = res.path
            // 开始绘制canvas
            ctx.drawImage(tempPath, 0 * rpx, 70 * rpx, 372 * rpx, 250 * rpx)
            var fsm = wx.getFileSystemManager()
            var FILE_BASE_NAME = 'tmp_base64src'
            var format = 'png'
            var buffer = wx.base64ToArrayBuffer(this.data.src)
            var filePath = `${wx.env.USER_DATA_PATH}/www.${format}`
            fsm.writeFile({ //写文件
              filePath,
              data: buffer,
              encoding: 'binary',
              success(res) {
                wx.getImageInfo({ //读取图片
                  src: filePath,
                  success: function (res) {
                    ctx.drawImage(res.path, 210 * rpx, 370 * rpx, 100 * rpx, 100 * rpx) //画图
                    ctx.draw()
                  },
                  error(res) {
                    console.log("shibaile")
                  }
                })
              }
            })
          }
        })

        var timestamp = Date.parse(new Date());
        var date = new Date(timestamp);
        //获取年份  
        var Y = date.getFullYear();
        //获取月份  
        var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
        //获取当日日期 
        var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
        const ctx = wx.createCanvasContext('shareCanvas')
        ctx.drawImage("../../res/imgs/iiiii.jpg")
        ctx.drawImage("../../res/imgs/anli (2).png", 60 * rpx, 20 * rpx, 40 * rpx, 35*rpx)
        ctx.setFillStyle('#333')
        ctx.font = 'normal bold 18px sans-serif';
        ctx.fillText('湛程网络科技有限公司', 110 * rpx, 45 * rpx)
        ctx.setFillStyle('#F6363C')
        ctx.font = 'normal bold 24px sans-serif';
        ctx.fillText("￥ " + this.data.price, 20 * rpx, 360 * rpx)
        ctx.setFillStyle('#C0C0C0')
        ctx.font = 'normal 16px sans-serif';
        ctx.beginPath()
        ctx.moveTo(120 * rpx, 354 * rpx)
        ctx.lineTo(180 * rpx, 354 * rpx)
        ctx.fillText("￥" + this.data.marketPrice, 120 * rpx, 360 * rpx)
        ctx.font = 'normal bold 20px sans-serif';
        ctx.fillText("“", 20 * rpx, 400 * rpx)
        ctx.setFillStyle('#333333')
        ctx.font = 'normal 24px sans-serif';
        ctx.fillText(this.data.productName, 20 * rpx, 420 * rpx)
        ctx.setFillStyle('#C0C0C0')
        ctx.font = 'normal 15px sans-serif';
        ctx.fillText(Y + '/' + M + '/' + D, 20 * rpx, 490 * rpx)
        ctx.fillText("长按识别小程序",210*rpx,490*rpx)
        ctx.stroke()
      }
    })
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