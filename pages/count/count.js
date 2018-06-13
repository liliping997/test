// pages/count/count.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      count:0
  },
// 点击-
  numup:function(){
    this.setData({
      count:this.data.count-1
    })
  },
  //点击+
  numadd:function(){
    // this.setData({
    //   count:this.data.count+1
    // })
    wx.request({
      url: 'http://172.20.10.3:7777/test', //仅为示例，并非真实的接口地址
      data: {
        x: '',
        y: ''
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      method:'post',
      success: function (res) {
        console.log(res.data)
      }
    })
  },
//测试后台直接访问
  ajax:function(){
    wx.request({
      url: 'http://172.20.10.3:3333/LatelyList/find', //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json' // 默认值
      },
      // method: 'post',
      success: function (res) {
        console.log(res.data)
      }
    })
  },






  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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