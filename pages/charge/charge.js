// pages/charge/charge.js
const api = require('../../utils/api.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },
pay:function(e){
this.setData({
  pay1:e.detail.value
})
},
tixian:function(){
  var that = this
  that.setData({
    api: api.url
  })
  var userId = wx.getStorageSync('user').loginId || 1

  var xinxi = {
    uid: userId,
    amount: this.data.pay1
  }
  api._post('/api/user/withdraw', xinxi).then(res => {
    console.log(res)
    if (res.status == true) {
      wx.showToast({
        title: res.data,
        icon: 'none'
      })
    } else {
      wx.showToast({
        title: res.message,
        icon: 'none'
      })
    }

  }).catch(e => {
    console.log(e)
  })
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
 
     var money=options.money
    var wait = options.wait
     this.setData({
       money:money,
       wait: wait
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