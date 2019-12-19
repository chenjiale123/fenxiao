// pages/address/address.js
const api = require('../../utils/api.js')
var util = require('../../utils/md5.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    salesNum: 1,
  },
  getPlus: function (e) {
     var that = this
    var salesNum = 1
    that.data.salesNum++
      that.setData({
        salesNum: that.data.salesNum
      })
    that.getTotalPrice()
  },
  // 购物车-
  getMain: function(e) {
    var that = this
    that.data.salesNum--

      // console.log(index)

      if (that.data.salesNum <= 0) {
        that.data.salesNum = 1
        // that.delItem(e)
      }

    that.setData({
      salesNum: that.data.salesNum
    })
    that.getTotalPrice()
  },
  getTotalPrice() {
    var salesNum = this.data.salesNum
    var pri = this.data.price
   

    var price = salesNum * pri
    var total = salesNum * pri+this.data.fare
    this.setData({
      price1: price.toFixed(2),
      countMoney: total.toFixed(2)
    })

  },
address:function(){
 wx.navigateTo({
   url: '/pages/add/add',
   success: function(res) {},
   fail: function(res) {},
   complete: function(res) {},
 })
},
buy:function(){
  var that=this
  that.setData({
    api: api.url
  })
  var userId = wx.getStorageSync('user').uid || ''
  var token = wx.getStorageSync('user').token || ''
   var shareid=this.data.share||0
  var xinxi = {
    uid: userId,
     token:token,
    goods_id: this.data.id,
    goods_name: this.data.name1,
    goods_image: this.data.img,
    goods_number: this.data.salesNum,
    name: this.data.name,
    phone: this.data.phone,
    area: this.data.province + '' + this.data.city + '' + this.data.area ,
    share_uid: shareid,
    address: this.data.address,
    order_no: this.data.order_no,
    order_price: this.data.price1,
    fare: this.data.fare
  }
  api._post('/api/order/addOrder', xinxi).then(res => {
    console.log(res)
    if (res.status == true) {
      wx.showToast({
        title: res.message,
        icon: 'none'
      })

      //支付接口
      api._post('/api/pay/wechat',{
       uid:userId,
        goods_name: that.data.name1,
        order_price: that.data.price1,
        order_no: that.data.order_no,
        openid:wx.getStorageSync('user').openid
      })
      .then(res=>{
         console.log(res)

        console.log(res.appId)
        var sting = "appId=" + res.appId + "&nonceStr=" + res.nonceStr + "&package=" + res.package + "&signType=MD5&timeStamp=" + String(res.timeStamp) + "&key=871040d4d478edbfe521a7741de728bb"
        wx.requestPayment({
          'appId': res.appId,
          'timeStamp': String(res.timeStamp),
          'nonceStr': res.nonceStr,
          'package': res.package,
          'signType': 'MD5',
          'paySign': util.hexMD5(sting).toUpperCase(),
          'success': function (res) {

            console.log(util.hexMD5(sting).toUpperCase())
            console.log(res)
            wx.navigateTo({
              url: '/pages/order/order',
              success: function(res) {},
              fail: function(res) {},
              complete: function(res) {},
            })
           
          },
          'fail': function (res) {
            console.log(util.hexMD5(sting).toUpperCase())
            console.log(res)
            wx.showToast({
              title: '您未支付请重新下单支付',
              icon:'none'

            })
            setTimeout(function(){
              wx.reLaunch({
                url: '../index/index',
              })

            },2000)
         

          },
          'complete': function (res) { }
        })





      })
        .catch(e => {
          console.log(e)
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
orderNo:function(){
  var that = this
  that.setData({
    api: api.url
  })
  var userId = wx.getStorageSync('user').uid || ''
  api._get('/api/order/getOrderNo?uid=' + userId)
  .then(res=>{
     console.log(res)
     this.setData({
       order_no: res.data.order_no
     })
  })
    .catch(e => {
      console.log(e)
    })
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    that.setData({
      api: api.url
    })
    var userId = wx.getStorageSync('user').uid || ''
    const app = getApp();
    let list2 = app.globalData.list2
    let share = app.globalData.share
    var all = list2.price + list2.fare
    this.setData({
      img: list2.img,
      price:list2.price,
      name1:list2.name1,
      fare: list2.fare,
      price1: list2.price,
      countMoney: list2.price,
      id: list2.id,
      share: share
    })
    console.log(this.data.id)
    this.orderNo()
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
        
          } else {
        

            that.setData({
              list: res.data.data[0],
              name: res.data.data[0].name,
              phone: res.data.data[0].phone,
              province: res.data.data[0].province,
              city: res.data.data[0].city,
              area: res.data.data[0].area,
              address: res.data.data[0].address,
              is_default: res.data.data[0].is_default,
              
            })
     
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
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    //  this.onLoad()
    var that=this
    const app = getApp();
    let list = app.globalData.list
    console.log(list)
    that.setData({

      name: list.name,
      phone: list.phone,
      province: list.province,
      city: list.city,
      area: list.area,
      address: list.address,
      is_default: list.is_default,

    })
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