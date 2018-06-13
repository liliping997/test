// pages/song/song.js
const backgroundAudioManager = wx.getBackgroundAudioManager()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    WIP: 'http://172.20.10.3:7777',
    song_list:[],
    song:[],
    newIndex:0
  },
//上一首
  upSong(){
    this.setData({
      newIndex: this.data.newIndex - 1
    })
    if (this.data.newIndex== -1){
      this.setData({
        newIndex: this.data.song_list.length-1
      })
    }
    this.paly(this.data.song_list, this.data.newIndex, this.data.WIP)
  },
//下一首
  downSong(){
    this.setData({
      newIndex: this.data.newIndex + 1
    })
    if (this.data.newIndex == this.data.song_list.length) {
      this.setData({
        newIndex: 0
      })
    }
    this.paly(this.data.song_list, this.data.newIndex, this.data.WIP)
  },
  //
  paly(song_list,newIndex, WIP){
      backgroundAudioManager.title = song_list[newIndex].song_name
      backgroundAudioManager.epname = song_list[newIndex].song_name
      backgroundAudioManager.singer = song_list[newIndex].singer
      backgroundAudioManager.coverImgUrl = WIP + song_list[newIndex].song_img
      backgroundAudioManager.src = WIP + song_list[newIndex].song_src
    },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var list = JSON.parse(options.list)
    for (let i = 0; i < list.dataset.item.length;i++){
      if (list.id == list.dataset.item[i]._id){
          this.setData({
            song_list: list.dataset.item,
            newIndex:i
          })
          this.paly(this.data.song_list, this.data.newIndex, this.data.WIP)
        }
      };
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