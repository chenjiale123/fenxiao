// pages/add/add.js
const api = require('../../utils/api.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  add: function() {
    wx.navigateTo({
      url: '/pages/addressAdd/addressAdd',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  edit: function(e) {
    var that = this
    console.log(e)

    console.log(e.currentTarget.dataset.id)
    var li = e.currentTarget.dataset.id
    console.log(that.data.list[li])
    wx.navigateTo({
      url: '/pages/addressEdit/addressEdit?name=' + that.data.list[li].name + '&phone=' + that.data.list[li].phone + '&province=' + that.data.list[li].province + '&city=' + that.data.list[li].city + '&area=' + that.data.list[li].area +'&detail=' + that.data.list[li].address + '&moren=' + that.data.list[li].is_default + '&id=' + that.data.list[li].id,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  del: function(e) {
    var that = this
    that.setData({
      api: api.url
    })
    var userId = wx.getStorageSync('user').uid || ''
    var token = wx.getStorageSync('user').token || ''

    api._post('/api/address/remove', {
      uid: userId,
      id: e.currentTarget.dataset.id 
    }).then(res => {
      console.log(res)


      if (res.status == true) {
         this.onLoad()
      }



    }).catch(e => {
      console.log(e)
    })
  },
  radio: function(e) {
    console.log(e.currentTarget.dataset.id)
    this.setData({
      index1: e.currentTarget.dataset.id
    })

  },
  radioChange(e) {
    console.log(e.detail.value)
    var that = this

    that.setData({
      list1: that.data.list[e.detail.value]

    })
    console.log(this.data.list1)
    const app = getApp();

    app.globalData.list = this.data.list1
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    that.setData({
      api: api.url
    })
    var userId = wx.getStorageSync('user').uid || ''
    var token = wx.getStorageSync('user').token ||''
    console.log(token)
    wx.request({
      url: api.baseUrl + '/api/address/lists',
      data: {
        uid: userId
 
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res)
        if (res.data.status == true) {

          if (res.data.data == "") {
            wx.showToast({
              title: '请先添加收货地址',
              icon: "none"
            })
            that.setData({
              list: res.data.data

            })
          } else {
            res.data.data[0].checked = "true"

            that.setData({
              list: res.data.data

            })
            that.setData({
              list1: that.data.list[0]
              
            })
            console.log(that.data.list1)
            const app = getApp();

            app.globalData.list = that.data.list1
          }
        } else {
          wx.showToast({
            title: res.data.message,
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
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
   this.onLoad()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})