<template>
  <div>
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
import vsrc12 from "./assets/source/13.mp4";
import vsrc11 from "./assets/source/11.mp4";
import vsrc10 from "./assets/source/10.mp4";
import vsrc2 from "./assets/source/20201217-233451-465-02.mp4";
export default {
  name: "App",
  data() {
    return {
      vsrc,
      vsrc2,
      list: [
        vsrc10,
        vsrc11,
        vsrc12,
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
    this.videoVr.setSrc(vsrc11);
    this.videoVr.setDefaultBulletText(["哈哈", "😄😄😄😄", "🚀🚀🚀🚀🚀🚀🚀"]);
    // x1, y1, r1, x2, y2, r2, x3, y3
    let p1 = { x: 10, y: 10, r: 3 };
    let p2 = { x: 20, y: 10, r: 10 };
    let p3 = { x: 30, y: 10, r: 10 };
    console.log(this.getPos(p1, p2, p3));
  },
  methods: {
    getPos(p1, p2, p3) {
      let { x: x1, y: y1, r: r1 } = p1;
      let { x: x2, y: y2, r: r2 } = p2;
      let { x: x3, y: y3, r: r3 } = p3;
      let pointA = this.sidePointCalculation(x1, y1, r1, x2, y2, r2, x3, y3);
      let pointB = this.sidePointCalculation(x2, y2, r2, x3, y3, r3, x1, y1);
      let pointC = this.sidePointCalculation(x1, y1, r1, x3, y3, r3, x2, y2);

      let Mx = parseFloat((pointA.x + pointB.x + pointC.x) / 3);
      let My = parseFloat((pointA.y + pointB.y + pointC.y) / 3);
      return { x: Mx, y: My };
    },
    sidePointCalculation(x1, y1, r1, x2, y2, r2, x3, y3) {
      //勾股定理  sqrt(X)是X开根号  pow（X,n）是X的n次方
      //取beacon1圆心A 与 beacon2圆心B的距离
      let AB = Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
      let rAB = r1 + r2;
      if (rAB > AB && r1 < AB && r2 < AB) {
        //两圆有相交点,两圆相交点为C、D。两圆与AB的相交点为E、F。o是EF的中点。
        let EF = rAB - AB;
        let Eo = EF * 0.5;
        let AE = r1 - EF;
        let Ao = AE + Eo;
        let AQ1 = Math.acos((x2 - x1) / AB);
        let AQ2 = Math.acos(Ao / r1);

        let BF = r2 - EF;
        let Bo = BF + Eo;
        //let BQ1 = acos(fabs(x1 - x2) / AB);
        let BQ2 = Math.acos(Bo / r2);

        //原点{0,0}在左上角的情况下
        let Cx = x1 + r1 * Math.cos(AQ1 + AQ2);
        var Cy = 0.0;
        var Dx = x2 - r2 * Math.cos(AQ1 + BQ2);
        var Dy = 0.0;
        if (x1 < x2) {
          Dx = x2 - r2 * Math.cos(AQ1 + BQ2);
          if (y1 < y2) {
            Cy = y1 + r1 * Math.sin(AQ1 + AQ2);
            Dy = y2 - r2 * Math.sin(AQ1 + BQ2);
          } else {
            Cy = y1 - r1 * Math.sin(AQ1 + AQ2);
            Dy = y2 + r2 * Math.sin(AQ1 + BQ2);
          }
        } else {
          Cy = y1 + r1 * Math.sin(AQ1 + AQ2);
          if (y1 < y2) {
            Dy = y2 - r2 * Math.sin(AQ1 + BQ2);
          } else {
            Dy = y2 + r2 * Math.sin(AQ1 + BQ2);
          }
        }

        let Cc = Math.sqrt(Math.pow(Cx - x3, 2) + Math.pow(Cy - y3, 2));
        let Dc = Math.sqrt(Math.pow(Dx - x3, 2) + Math.pow(Dy - y3, 2));

        return Cc < Dc ? { x: Cx, y: Cy } : { x: Dx, y: Dy }; // CGPoint(x: CGFloat(Cx), y: CGFloat(Cy)) : CGPoint(x: CGFloat(Dx), y: CGFloat(Dy))
      } else {
        //两圆无相交点
        return this.midpointCalculation(x1, y1, r1, x2, y2, r2);
      }
    },
    midpointCalculation(x1, y1, r1, x2, y2, r2) {
      let a = y1 - y2; //竖边
      let b = x1 - x2; //横边
      let rr = r1 + r2;
      let s = r1 / rr;

      let x = parseFloat(Math.abs(x1 - b * s)); //Double(abs(Float(x1 - (b * s))))
      let y = parseFloat(Math.abs(y1 - a * s)); // Double(abs(Float(y1 - (a * s))))

      return { x, y };
    },

    onNext() {
      this.index += 1;
      this.videoVr.setSrc(this.list[this.index % this.list.length]);
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
@media screen and (max-width: 480px) {
  .box {
    width: 100%;
    height: 300px;
    margin-top: 0px;
  }
}
/* .box {
  width: 100%;
  height: 300px;
} */
.btn_box {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  margin: 0 auto;
  margin-top: 40px;
}
button {
  width: 100px;
  display: block;
  margin-left: 20px;
}
</style>
