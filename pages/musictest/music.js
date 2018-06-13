// pages/musictest/music.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    IP:"http://172.20.10.3:3333",
    WIP:'http://172.20.10.3:7777',
    list:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.request({
      url: this.data.IP + '/song_form/find',
      data: {
        submitType: "findJoin",
        ref: ["song_list", '']
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        this.setData({
          list:res.data
        })
      }.bind(this)
    })
  },
//点击跳转
  formList: function(event){
    wx.navigateTo({
      url: '../form_list/form_list?item=' + JSON.stringify(event.currentTarget.dataset.item)
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