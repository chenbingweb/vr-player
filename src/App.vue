<template>
  <div id="app">
    <div ref="video_box" class="box"></div>
    <div class="btn_box">
      <button @click="onPlay('vr')">VR</button>
      <button @click="onPlay('v')">Video</button>
      <button @click="onPlayVideo(vsrc2, 'v')">视频一</button>
      <button @click="onPlayVideo(vsrc, 'vr')">视频二</button>
      <button @click="addBulletText">添加弹幕</button>
      <button @click="onDoPlay">播放▶️</button>
      <button @click="onPause">暂停⏸</button>
      <button @click="onDoPlaySrc">播放▶️一个连接</button>
      <button @click="onNext">下一个</button>
    </div>
  </div>
</template>

<script>
import VideoVr from "../packages/index.js";
// import VideoVr from "../lib";
// import vsrc from "./assets/source/2021_1111_143725_007_360.mp4";
// import vsrc from "./assets/source/2021_1111_143725_007_360.mp4";
import vsrc from "./assets/source/12.mp4";
import vsrc2 from "./assets/source/20201217-233451-465-02.mp4";
export default {
  name: "App",
  data() {
    return {
      vsrc,
      vsrc2,
      list: [
        "https://view.2amok.com/2019921/c6fc016a56441c95c8a537966914da55.mp4",
        "https://view.2amok.com/20191010/22bed2ddfcae38db643de670c300712f.mp4",
        "https://view.2amok.com/2019921/c6fc016a56441c95c8a537966914da55.mp4",
        "https://view.2amok.com/2019713/6fb2a05818bba59b4fc642b1eab8ef1b.mp4",
      ],
      index: 0,
    };
  },
  mounted() {
    this.videoVr = new VideoVr(this.$refs.video_box, {
      useBulletChat: true,
    });
    // this.videoVr.setSrc(require("./assets/source/12.mp4"));
    this.videoVr.setSrc(
      "https://view.2amok.com/20191010/22bed2ddfcae38db643de670c300712f.mp4"
    );
    this.videoVr.setDefaultBulletText(["哈哈", "😄😄😄😄", "🚀🚀🚀🚀🚀🚀🚀"]);
  },
  methods: {
    onNext() {
      this.index += 1;
      this.videoVr.setSrc(this.list[this.index % this.list.length], "V");
    },
    onDoPlaySrc() {
      this.videoVr.play(
        "https://dpv.videocc.net/e785b2c81c/5/e785b2c81c9e018296671a1287e99615_1.mp4?pid=1638953239258X1503332",
        "V"
      );
    },
    onDoPlay() {
      this.videoVr.play();
    },

    onPause() {
      this.videoVr.pause();
    },
    onPlayVideo(url, ty) {
      this.videoVr.setSrc(url, ty);
    },
    addBulletText() {
      this.videoVr.addBulletText(Math.random() * 1000);
    },
    onPlay(t) {
      if (t === "vr") {
        this.videoVr.setSrc(require("./assets/source/12.mp4"));
      } else {
        this.videoVr.setSrc(
          "https://dpv.videocc.net/e785b2c81c/5/e785b2c81c9e018296671a1287e99615_1.mp4?pid=1638953239258X1503332",
          1
        );
      }
    },
  },
};
</script>

<style>
html,
body {
  padding: 0;
  margin: 0;
}
.box {
  width: 700px;
  height: 400px;
  margin: 0 auto;
  margin-top: 50px;
}
/* .box {
  width: 100%;
  height: 300px;
} */
.btn_box {
  display: flex;
  justify-content: center;
  align-items: center;

  margin: 0 auto;
  margin-top: 40px;
}
button {
  width: 100px;
  display: block;
  margin-left: 20px;
}
</style>
