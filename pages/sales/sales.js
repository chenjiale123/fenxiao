// pages/sales/sales.js
const api = require('../../utils/api.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
   
  },
charge:function(){
wx.navigateTo({
  url: '/pages/charge/charge?money=' + this.data.balance + '&wait=' + this. data.withdraw,
  success: function(res) {},
  fail: function(res) {},
  complete: function(res) {},
})
},
detail:function(){
  var that = this
  var userId = wx.getStorageSync('user').uid || ''
  var token = wx.getStorageSync('user').token || ''
  wx.request({


    url: api.baseUrl + '/api/user/myBalance',
    data: {
      uid: userId

    },
    method: 'POST',
    header: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    success: function (res) {

      console.log(res)
      if (res.data.status == true) {
   that.setData({
     list:res.data.data.lists
   })


      } else {
        wx.showToast({
          title: res.message,
          icon: 'none'
        })
      }
    },
    fail: function (res) {
      console.log(res)
    }
  })
},
money:function(){
  var that=this
  var userId = wx.getStorageSync('user').uid || ''
  var token = wx.getStorageSync('user').token || ''
  wx.request({


    url: api.baseUrl + '/api/user/index',
    data: {
      uid: userId,
      token:token
    },
    method: 'POST',
    header: {
      'Content-Type': 'application/x-www-form-urlencoded',
  
    },
    success: function (res) {

      console.log(res)
      if (res.data.status == true) {
        that.setData({
          balance: res.data.data.balance,
          yesday: res.data.data.yesterday_profit,
          withdraw: res.data.data.withdraw
        })
     

      } else {
        wx.showToast({
          title: res.message,
          icon: 'none'
        })
      }
    
    },
    fail: function (res) {
      console.log(res)
    }
  })
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  this.money()
  this.detail()
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