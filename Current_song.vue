<template>
<div class="center">
    <header>
         <i class="el-icon-arrow-left" @click="back" style="font-size: 2rem"></i>
        <nav>
            <p>{{ Music_song.song_name}}</p>
         <span class="header_text">{{ Music_song.singer }}</span>
        </nav>
        <img src="./icon/音乐.png" alt="" class="nav_img">
        <!-- <span class="nav_span">分享</span> -->
    </header>
<!-- <div class="middle"> -->
    <div class="middle_img" id="middle_img">
        <img :src="IP+Music_song.song_img" alt="" class="song_img">
    <!-- </div> -->

    <audio :src="IP + Music_song.song_src" id="audio" autoplay ref="music"></audio>

</div>

        <!-- 相关操作 -->
    <footer>
     <!-- 选择 -->
    <div class="select">
            <i class="el-icon-star-off icon" style="font-size: 1.5rem"></i>
            <i class="el-icon-download icon" style="font-size: 1.5rem"></i>
            <i class="el-icon-tickets icon" style="font-size: 1.5rem"></i>
            <i class="el-icon-share icon" style="font-size: 1.5rem"></i>
    </div>
      <!-- 进度条 -->
     <el-row>

        <el-col :span="4" style="padding: 9px 0px 0px 10px;color:#909399;font-size: 13px">
        {{formatTime(music.currentTime)}}
      </el-col>

      <el-col :span="0">
       <el-popover
        placement="top-start"
        trigger="hover"> 
          <div style="text-align: center">
            <el-progress 
            color="#67C23A"
            type="circle" 
            :percentage="music.volume"></el-progress>
            <!-- <el-button 
            @click="changeVolume(-10)"
            icon="el-icon-minus" 
            circle></el-button> -->
            <!-- <el-button 
            @click="changeVolume(10)"
            icon="el-icon-plus" 
            circle></el-button> -->
          </div>
        </el-popover>
      </el-col>
      <el-col :span="16"  style="padding-left: 20px">
        <el-slider
        @change="changeTime"
        :format-tooltip="formatTime"
        :max="music.maxTime"
        v-model="music.currentTime" 
        style="width: 100%;"></el-slider>
      </el-col>

      <el-col :span="4" style="padding: 9px 0px 0px 10px;color:#909399;font-size: 13px">
        {{formatTime(music.maxTime)}}
      </el-col>
    </el-row>
      <div>
        <!-- 随机播放 -->
                   <el-button 
          slot="reference"
          :icon="isRandom?'el-icon-refresh':'el-icon-sort'" 
          @click="song_random"
          circle></el-button>
            <!-- 上一首 -->
           <el-button
          slot="reference"
          icon="el-icon-caret-left" 
          @click="prev_song"
          circle></el-button>
      <!-- 暂停或播放 --> 
         <img src="./icon/paly.png" alt="" class='paly_operation' v-if="isPaused"  @click="play">
         <img src="./icon/stop.png" alt="" class='paly_operation' v-else  @click="play">
           <!-- <el-button 
          @click="play"
          id="play"
          slot="reference"
          :icon="music.isPlay?'el-icon-refresh':'el-icon-caret-right'" 
          circle></el-button> -->
          <!-- 下一首 -->
                <el-button 
          slot="reference"
          icon="el-icon-caret-right" 
          @click="next_song"
          circle></el-button>
          <!-- 歌曲列表 -->
            <el-button 
          slot="reference"
          icon="el-icon-tickets"
          @click="showList" 
          circle></el-button>
       </div>
    </footer>
</div>
</template>

<script>
export default {
  name: "Current_song",
  data() {
    return {
      //当前歌单
      palyList: [],
      //当前歌曲
      Music_song: [],
      //当前歌曲的索引
      currentIndex: 0,
      //最近播放
      LatelyList: [],
      LatelyId: "",
      music: {
        isPlay: false,
        currentTime: 0,
        maxTime: 0,
        volume: 100 //进度条的百分比
      },
      //随机播放
      isRandom: false,
      isPaused: false
    };
  },
  methods: {
    //返回上一页
    back() {
      this.$router.go(-1);
    },
    //进度条控制
    listenMusic() {
      // 当前歌曲的总时长  this.$refs.music.duration
      //当前歌曲播放时间  this.$refs.music.currentTime
      if (!this.$refs.music) {
        return;
      }
      if (this.$refs.music.readyState) {
        this.music.maxTime = this.$refs.music.duration;
      }
      //将
      this.music.isPlay = !this.$refs.music.paused;
      this.music.currentTime = this.$refs.music.currentTime;
    },
    //控制播放-暂停
    play() {
      var middle_img = document.querySelector("#middle_img");
      if (this.$refs.music.paused) {
        this.isPaused = true;
        this.$refs.music.play();
        middle_img.style.WebkitAnimationPlayState = "running";
      } else {
        this.isPaused = false;
        this.$refs.music.pause();
        middle_img.style.WebkitAnimationPlayState = "paused";
      }
      this.music.isPlay = !this.$refs.music.paused;

      // this.nextTick(() => {
      //   document.getElementById("play").blur();
      // });
    },

    changeTime(time) {
      //滑动块的change事件
      this.$refs.music.currentTime = time;
    },
    //点击事件
    changeVolume(v) {
      this.music.volume += v;
      console.log(this.music.volume);
      if (this.music.volume > 100) {
        this.music.volume = 100;
      }
      if (this.music.volume < 0) {
        this.music.volume = 0;
      }
      this.$refs.music.volume = this.music.volume / 100;
      console.log(this.$refs.music.volume);
    },
    //计算当前播放时长（将当前歌曲播放时间作为参数传进来）
    formatTime(time) {
      let it = parseInt(time);
      let m = parseInt(it / 60);
      let s = parseInt(it % 60);
      return (
        (m < 10 ? "0" : "") +
        parseInt(it / 60) +
        ":" +
        (s < 10 ? "0" : "") +
        parseInt(it % 60)
      );
    },
    //上一首
    prev_song() {
      if (this.isRandom) {
        this.currentIndex = parseInt(Math.random() * this.palyList.length);
        this.Music_song = this.palyList[this.currentIndex];
        this.LatelyId = this.Music_song._id;
      } else {
        this.currentIndex = this.currentIndex - 1;
        this.Music_song = this.palyList[this.currentIndex];
        if (this.currentIndex == -1) {
          this.currentIndex = this.palyList.length - 1;
          this.Music_song = this.palyList[this.palyList.length - 1];
        }
        this.LatelyId = this.Music_song._id;
      }
    },
    //下一首
    next_song() {
      if (this.isRandom) {
        this.currentIndex = parseInt(Math.random() * this.palyList.length);
        this.Music_song = this.palyList[this.currentIndex];
        this.LatelyId = this.Music_song._id;
      } else {
        this.currentIndex = this.currentIndex + 1;
        this.Music_song = this.palyList[this.currentIndex];
        if (this.currentIndex == this.palyList.length) {
          this.currentIndex = 0;
          this.Music_song = this.palyList[this.currentIndex];
        }
        this.LatelyId = this.Music_song._id;
      }
    },
    //随机播放
    song_random() {
      this.isRandom = !this.isRandom;
      console.log(this.isRandom);
    },
    //显示歌单
    showList() {}
  },

  mounted() {
    this.$nextTick(() => {
      setInterval(this.listenMusic, 1000);
    });
  },
  computed: {
    //IP
    IP() {
      return this.$store.state.music.IP;
    }
  },
  //初始化当前选中歌曲
  created() {
    //将当前歌曲放入最近播放列表中
    this.LatelyId = this.$route.query.id;
    if (this.$store.state.music.new_music_form.length == 0) {
      this.palyList = this.$store.state.music.LatelyList;
      for (let i = 0; i < this.palyList.length; i++) {
        if (this.palyList[i].index == this.$route.query.id) {
          this.Music_song = this.palyList[i];
          this.currentIndex = i;
        }
      }
    } else {
      this.palyList = this.$store.state.music.new_music_form.song_list;
      for (let i = 0; i < this.palyList.length; i++) {
        if (this.palyList[i]._id == this.$route.query.id) {
          this.Music_song = this.palyList[i];
          this.currentIndex = i;
        }
      }
    }
  },
  //数据刷新后
  updated() {
    this.$store.dispatch({
      type: "addLatelyList",
      id: this.LatelyId
    });
    //当前歌曲播完后自动播放下一首
    // if(this.music.maxTime==this.music.currentTime){
    //      this.currentIndex = this.currentIndex + 1;
    //     this.Music_song = this.palyList[this.currentIndex];
    //   if (this.currentIndex == this.palyList.length) {
    //     this.currentIndex = 0;
    //     this.Music_song = this.palyList[this.currentIndex];
    //   }
    //   this.LatelyId = this.Music_song._id;
    // }
  }
};
</script>

<style scoped>
/* header{
  height: 20%
} */
.el-icon-arrow-left,
.nav_span {
  color: white;
}
.center {
  background: rgb(90, 85, 85);
  height: 100%;
}
header {
  display: flex;
  height: 20%;
  padding: 0.5rem;
}
.header_text {
  font-size: 0.6rem;
}
.icon {
  color: rgb(223, 219, 219);
  /* background:white; */
}
nav {
  flex-grow: 2;
  color: white;
  padding: 0.05rem;
}
nav > p {
  margin: 0;
  margin-bottom: 0.05rem;
}
.nav_img {
  width: 2rem;
  height: 2rem;
}
.select {
  display: flex;
  justify-content: space-around;
  margin-bottom: 0.5rem;
}
@-webkit-keyframes rotation {
  from {
    -webkit-transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(360deg);
  }
}
.middle_img {
  text-align: center;
  margin: 4rem 0 3rem;
  margin-left: calc(50% - 5.8rem);
  padding: 0.5rem;
  background: rgb(65, 61, 61);
  width: 11rem;
  height: 11rem;
  border-radius: 50%;
  animation: rotation 9s linear infinite;
}
.song_img {
  width: 11rem;
  height: 11rem;
  border-radius: 50%;
}
footer {
  /* position: fixed;
  bottom: 0;
  left:0;
  right:0; */
  color: white;
  margin-top: 6.2rem;
}
footer > div {
  display: flex;
  justify-content: space-around;
  padding: 0.54rem 0;
}
.center {
  overflow-x: hidden;
}
.el-icon-sort {
  transform: rotate3d(180deg);
}
.paly_operation {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  filter: invert(100%);
}
.el-button.is-circle {
  border-radius: 50%;
  padding: 0.5rem;
  width: 2rem;
  height: 2rem;
  margin-top: 0.2rem;
}
</style>