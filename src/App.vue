<template>
  <div id="app">
    <div ref="video_box" class="box"></div>
    <div class="btn_box">
      <button @click="onPlay('vr')">VR</button>
      <button @click="onPlay('v')">Video</button>
    </div>
  </div>
</template>

<script>
import VideoVr from "../packages/index.js";
// import VideoVr from "../lib";
// import vsrc from "./assets/source/2021_1111_143725_007_360.mp4";
// import vsrc from "./assets/source/2021_1111_143725_007_360.mp4";
// import vsrc from "./assets/source/12.mp4";
// import vsrc from "./assets/source/20201217-233451-465-02.mp4";
export default {
  name: "App",

  mounted() {
    this.videoVr = new VideoVr(this.$refs.video_box);
    this.videoVr.videoPlayer.setSrc(
      require("./assets/source/20201217-233451-465-02.mp4")
    );
    // videoVr.videoPlayer.setSrc(
    //   "https://apd-d75a81fb837fe46acc3295885598055b.v.smtcdns.com/om.tc.qq.com/Ae2PajFOvgvf7W8a0WvUesoIvZWHtdB43WLSMPF_Fv6o/uwMROfz2r5zIIaQXGdGnC2dfDmb_xYKxrIGz_bGUg2Lja6ru/x0635pooz7t.mp4?sdtfrom=v1010&guid=c5355e2ec04158fd02b7d8cf2ba935f8&vkey=7DEC2AAA174CA0CF0AA9B9B21F632FE34556A4161BF645A9550958BF25DC47E9124882A408BD5C2953CBF8CC77A75D044134736E2D3C81B7D2759E6130DB37445FFE4460E9D7AA4944AF565C59165CE2F15EC9BD876C330AC7A88927248194F9117C073C74CA00A0D202AE4F8D3683818B68C61443CC38A1C60F0BED351C488E2102BCEB28D990A5",
    //   1
    // );
    // videoVr.videoPlayer.setSrc(
    //   "https://video-qn.ibaotu.com/19/74/67/06y888piCMTE.mp4"
    // );
  },
  methods: {
    onPlay(t) {
      if (t === "vr") {
        this.videoVr.videoPlayer.setSrc(require("./assets/source/12.mp4"));
      } else {
        this.videoVr.videoPlayer.setSrc(
          "https://dpv.videocc.net/e785b2c81c/5/e785b2c81c9e018296671a1287e99615_1.mp4?pid=1638953239258X1503332",
          1
        );
      }
    },
  },
};
</script>

<style>
.box {
  width: 700px;
  height: 400px;
  margin: 0 auto;
  margin-top: 50px;
}
.btn_box {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200px;
  margin: 0 auto;
  margin-top: 40px;
}
button {
  margin-left: 20px;
}
</style>
