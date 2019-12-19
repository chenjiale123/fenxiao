// pages/order/order.js
const api = require('../../utils/api.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
  form:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.setData({
      api: api.url
    })
    var userId = wx.getStorageSync('user').uid || ''



    wx.request({


      url: api.baseUrl + '/api/order/myOrder',
       data:{
          uid:userId
       },
      method: 'POST',
      header:{
        'Content-Type':'application/x-www-form-urlencoded'
      },
      success: function (res) {

       console.log(res)
        if (res.data.status == true) {
          console.log(res.data.data)
          that.setData({
            form:res.data.data
          })
     
        } else {
          wx.showToast({
            title: res.message,
            icon: 'none'
          })
        }
      },
      fail:function(res){
       console.log(res)
      }
    })


   
    // api._post('/api/order/myOrder',{
    //   uid:userId
    // }).then(res => {
    //   console.log(res)
     

    // }).catch(e => {
    //   console.log(e)
    // })
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