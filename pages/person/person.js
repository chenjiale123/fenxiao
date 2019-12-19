// pages/person/person.js
const api = require('../../utils/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name2:'',
    phone2:'',
    card2:''
  },
  name1:function(e){
   this.setData({
     name2:e.detail.value
   })
  },
  phone1: function (e) {
    this.setData({
      phone2: e.detail.value
    })
  },
  card1: function (e) {
    this.setData({
      card2: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var userId = wx.getStorageSync('user').uid || ''

    that.setData({
      api: api.url
    })
    api._post('/api/user/index', {
      uid: userId
     
    }).then(res => {
      console.log(res)


      if (res.status == true) {
         
         this.setData({
           username:res.data.username,
           userphone: res.data.phone,
           usercard:res.data.bank_no
         })
      


      }



    }).catch(e => {
      console.log(e)
    })
  },
  sure:function(){
   
    var userName = this.data.name2;
    var mobile = this.data.phone2;
    var idcard = this.data.card2;

    var name = /^[u4E00-u9FA5]+$/;
    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
    var cd = /^[0-9]{16,19}$/;
    console.log(userName)
    if (userName == '') {
      wx.showToast({
        title: '请输入用户名',
        icon:'none'
    
      })

      return false
    } else if (mobile == '') {
      wx.showToast({
        title: '手机号不能为空',
        icon: 'none'

      })

      return false
    }
  else if(idcard==""){
      wx.showToast({
        title: '银行卡号不能为空',
        icon: 'none'

      })

      return false
    }
   else if (!myreg.test(mobile)) {
      wx.showToast({
        title: '手机号有误！',
        icon: 'none',
        duration: 1500
      })
      return false;
    } else if (!cd.test(idcard)){
      wx.showToast({
        title: '银行卡号有误！',
        icon: 'none',
        duration: 1500
      })
      return false;
    }else {
    var that=this
      var userId = wx.getStorageSync('user').uid || ''

    that.setData({
      api: api.url
    })

    wx.request({


      url: api.baseUrl + '/api/user/editInfo',
      data: {
        uid: userId,
        username: that.data.name2,
        phone:that.data.phone2,
        bank_no:that.data.card2

      },
      method: 'POST',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {

        console.log(res)
        if (res.status == true) {
          wx.showToast({
            title: res.data.data,
            icon: 'none'
          })

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
  onShareAppMessage: function () {

  }
})