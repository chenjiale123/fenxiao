//index.js
//获取应用实例
const api = require('../../utils/api.js')

const app = getApp()

Page({
  data: {
    hidden: true,
    videoContext: '',
    flag: false,
    login: false,
    show: true
  },
  play: function() {
    this.setData({
      hidden: false
    })

    var videoContextCurrent = wx.createVideoContext('myVideo')
    this.setData({
      flag: !this.data.flag
    })
    console.log(this.data.flag)
    if (this.data.flag == false) {
      videoContextCurrent.stop()

    } else {
      videoContextCurrent.play()
    }


  },
  now: function() {
    this.setData({
      login: true
    })
  },
  address: function() {
    var userId = wx.getStorageSync('user').uid || ""
    if (userId == "") {
      this.setData({
        login: true
      })
    } else {
      wx.navigateTo({
        url: '/pages/address/address',
        success: function(res) {},
        fail: function(res) {},
        complete: function(res) {},
      })
    }
  },
  getUserInfo(res) {
    var that = this
    let info = res;

    if (info.detail.userInfo) {

      console.log("点击了同意授权");
      wx.login({
        success: function(res) {
          console.log(res.code)
          if (res.code) {
            that.setData({
              login: false,

              name: info.detail.userInfo.nickName,
              icon: info.detail.userInfo.avatarUrl,
              encry: info.detail.encryptedData,
              iv: info.detail.iv
            })


            wx.request({


              url: api.baseUrl + '/api/index/getOpenId',
              data: {


                code: res.code,

              },
              method: 'GET',
              success: function(res) {

                console.log(res.data)
                console.log(res.data)
                var res = JSON.parse(res.data.data)
                console.log(res)
                that.setData({
                  openid: res.openid,
                  key1: res.session_key
                })
                wx.request({
                  url: api.baseUrl + '/api/index/wechatLogin',
                  data: {
                    openid: that.data.openid,
                    nick_name: that.data.name,
                    avatar: that.data.icon

                  },
                  method: 'POST',
                  header: {
                    'content-type': 'application/x-www-form-urlencoded'
                  },
                  success: function(res) {
                    console.log(res)
                    if (res.data.code == 200) {
                      wx.showToast({
                        title: '登录成功',
                      })
                      that.setData({
                        login1: false
                      })
                      wx.setStorageSync('user', res.data.data)
                      console.log(res.data.data.token)

                      that.onLoad()
                    } else if (res.data.code == 207) {
                      wx.showToast({
                        title: '该账户已被冻结',
                      })
                    }

                  },
                  fail: function(res) {
                    console.log(res)

                  }
                })

              }
            })




          } else {
            console.log("授权失败");
          }
        },
      })

    } else {
      console.log("点击了拒绝授权");
    }
  },
  //事件处理函数

  onLoad: function(options) {
    var that = this
    that.setData({
      api: api.url
    })

    var userId = wx.getStorageSync('user').uid || ''
    var token = wx.getStorageSync('user').token || ''
    if (userId == "") {
      that.setData({
        show: true
      })
    } else {
      that.setData({
        show: false
      })
    }
    console.log(that.data.show)
    if (options.share_uid) {
      const app = getApp();

      app.globalData.share = options.share_uid
    }




    api._post('/api/goods/index', {
      uid: userId,
      token: token
    }).then(res => {
      console.log(res)


      if (res.status == true) {
        that.setData({
          describe: res.data.describe,
          id: res.data.id,
          images: res.data.thumb_img,
          name1: res.data.name,
          origin_price: res.data.origin_price,
          price: res.data.price,
          video_url: res.data.video_url,
          img: res.data.images



        })
        const app = getApp();

        app.globalData.list2 = {
          img: res.data.thumb_img,
          price: res.data.price,
          name1: res.data.name,
          fare: 0,
          id: res.data.id
        }


      }



    }).catch(e => {
      console.log(e)
    })
  },

  onShareAppMessage: function(res) {
    var userId = wx.getStorageSync('user').uid || ''
    var is_buy = wx.getStorageSync('user').is_buy || ''
    if (res.from === 'button') {

      if (userId == "") {
        // wx.showToast({
        //   title: '请先授权登录',
        //   icon:'none'
        // })
        this.setData({
          login: true

        })
      } else if (is_buy == 0) {

        wx.showToast({
          title: '你未购买转发将不会产生佣金',
          icon: 'none',
          duration: 2500



        })


        return {
          title: '转发',
          path: '/pages/index/index?share_uid=' + userId,
          success: function(res) {}
        }

      } else if (is_buy == 1) {

        return {
          title: '转发',
          path: '/pages/index/index?share_uid=' + userId,
          success: function(res) {}
        }
      }
    } else {
      if (userId == "") {
        // wx.showToast({
        //   title: '请先授权登录',
        //   icon:'none'
        // })
        this.setData({
          login: true,

        })
      } else if (is_buy == 0){
        wx.showToast({
          title: '你未购买转发将不会产生佣金',
          icon: 'none',
          duration: 2500



        })
        return {
          title: '转发',
          path: '/pages/index/index?share_uid=' + userId,
          success: function(res) {}
        }
      } else if (is_buy == 1) {

        return {
          title: '转发',
          path: '/pages/index/index?share_uid=' + userId,
          success: function (res) { }
        }
      }
    }

  }

})