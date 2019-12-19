// pages/mine/mine.js

const api = require('../../utils/api.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
   login:false,
   login1:true
  },
  pow:function(){
     this.setData({
       login:true
     })
  },
  order:function(){
    var userId = wx.getStorageSync('user').uid || ""
    if (userId == "") {
      this.setData({
        login: true
      })
    } else {
   wx.navigateTo({
     url: '/pages/order/order',
     success: function(res) {},
     fail: function(res) {},
     complete: function(res) {},
   })
    }
  },
  xinxi: function () {
    var userId = wx.getStorageSync('user').uid || ""
    if (userId == "") {
      this.setData({
        login: true
      })
    } else {
      wx.navigateTo({
        url: '/pages/person/person',
        success: function (res) { },
        fail: function (res) { },
        complete: function (res) { },
      })
    }
  },
  sales: function () {
    var userId = wx.getStorageSync('user').uid || ""
    if (userId == "") {
      this.setData({
        login: true
      })
    } else {
    wx.navigateTo({
      url: '/pages/sales/sales',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
    }
  },
  add: function () {
    var userId = wx.getStorageSync('user').uid || ""
    if (userId == "") {
      this.setData({
        login: true
      })
    } else {
    wx.navigateTo({
      url: '/pages/add/add',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
    }
  },
  getUserInfo(res) {
    var that = this
    let info = res;

    if (info.detail.userInfo) {

      console.log("点击了同意授权");
      wx.login({
        success: function (res) {
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
              success: function (res) {

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
                  success: function (res) {
                    console.log(res)
                    if (res.data.code==200){
                      wx.showToast({
                        title: '登录成功',
                      })
                    that.setData({
                      login1:false
                    })
                      wx.setStorageSync('user', res.data.data)
                      console.log(res.data.data.token)

                      that.onLoad()
                    } else if (res.data.code == 207){
                      wx.showToast({
                        title: '该账户已被冻结',
                      })
                    }
                  
                  },
                  fail: function (res) {
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

xinxi:function(){
  var userId = wx.getStorageSync('user').uid || ""
  if (userId == "") {
    this.setData({
      login: true
    })
  } else {
  wx.navigateTo({
    url: '/pages/person/person',
    success: function(res) {},
    fail: function(res) {},
    complete: function(res) {},
  })
  }
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    this.setData({
      api: api.url
    })

    var userId = wx.getStorageSync('user').uid
    // console.log(userId)
    if(userId){
      this.setData({
       login1:false,
        nick_name: wx.getStorageSync('user').nick_name,
        avatar: wx.getStorageSync('user').avatar,
        openid: wx.getStorageSync('user').uid
      })
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
   this.onLoad()
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