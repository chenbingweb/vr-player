import { timeChange, isMobile, hover } from "./tool";
import {
  createPlayerMagnification,
  createProcessBar,
  createPlayCicle,
  changeVRAndVD,
  loading,
  createVoice,
  createLoop,
  createVoiceBar,
  fullScrean,
} from "./playerStyle";
import {
  playBtnStyle,
  playBtnBoxStyle,
  controlBoxStyle,
  processBoxStyle,
  loadingBarStyle,
  playerProcessBarStyle,
  playIconPlayStyle,
  playIconPauseStyle,
  leftDivboxStyle,
  rightDivBoxStyle,
  vrBoxStyle,
  vdBoxStyle,
} from "./playerCss";
export default class Player {
  constructor(container, object3D) {
    this.loadingBar = null; // loading 进程
    this.playerProcessBar = null; // 播放进度
    this.timeShow = null; // 播放时间
    this.playIcon = null;
    this.vrBoxBtn = null;

    this.circleMove = false;
    this.object3D = object3D;
    this.video = document.createElement("video");
    this.video.loop = object3D.configer.loop;

    this.video.muted = object3D.configer.muted;
    this.video.autoplay = object3D.configer.autoplay;
    this.video.setAttribute("x5-video-player-type", "h5");
    this.video.setAttribute("playsinline", true);
    this.video.setAttribute("webkit-playsinline", true);
    this.container = container;
    this.container.style = "position:relative;overflow:hidden";
    // this.createPlayStyle();
    // 创建video 控制器
    this.createControl();
    // video 事件
    this.initVideoEvent();
    this.loading = loading(this.container);
    return this;
  }
  // 创建播放器
  createPlayStyle() {
    const playBtn = document.createElement("div");
    playBtn.setAttribute("data-name", "playBtn");
    playBtn.style = playBtnStyle;
    this.container.appendChild(playBtn);
    playBtn.onclick = () => {
      this.video.play();
      this.video.muted = false;
    };
  }

  createControl() {
    const playBtnBox = document.createElement("div");
    this.playBtnBox = playBtnBox;
    playBtnBox.setAttribute("data-name", "playBtnBox");
    playBtnBox.style = playBtnBoxStyle;
    this.container.appendChild(playBtnBox);
    const controlBox = document.createElement("div");
    controlBox.setAttribute("data-name", "controlBox");
    controlBox.style = controlBoxStyle;
    playBtnBox.appendChild(controlBox);
    this.createProcessBar(playBtnBox);
    this.createPlayAndTime(controlBox);
  }
  // 创建进度条
  createProcessBar(playBtnBox) {
    const processBox = document.createElement("div");
    this.processBox = processBox;
    processBox.setAttribute("data-name", "processBox");
    processBox.style = processBoxStyle;
    playBtnBox.appendChild(processBox);
    createProcessBar(this.video, processBox);
    // 加载进度
    this.loadingBar = document.createElement("div");
    this.loadingBar.setAttribute("data-name", "loadingBar");
    this.loadingBar.style = loadingBarStyle;
    processBox.append(this.loadingBar);
    // 播放进度
    this.playerProcessBar = document.createElement("div");
    this.playerProcessBar.setAttribute("data-name", "playerProcessBar");
    this.playerProcessBar.style = playerProcessBarStyle;
    processBox.append(this.playerProcessBar);
    createPlayCicle(this.video, this.playerProcessBar, this.processBox, this);
  }

  setSrc(src, type = "vr") {
    const video = this.video;

    video.setAttribute("crossOrigin", "Anonymous");
    this.video.src = src;
    this.object3D.createVidoBox(video, type);
    this.object3D.playType = type;
    this.vrBoxBtn.style = type == "vr" ? vdBoxStyle : vrBoxStyle;
  }

  initVideoEvent() {
    const that = this;
    this.video.addEventListener(
      "timeupdate",
      function (e) {
        that.loading.hide();
        const duration = Math.ceil(this.duration);
        var timeDisplay;
        //用秒数来显示当前播放进度
        timeDisplay = Math.floor(this.currentTime);
        // console.log(that.circleMove);
        if (that.circleMove === false) {
          that.playerProcessBar.style.width = `${
            (timeDisplay / duration) * 100
          }%`;
        }

        that.loadProcess(e);
        that.showPlayTime(timeDisplay);
      },
      false
    );
    this.video.addEventListener(
      "play",
      () => {
        this.playIcon.style = playIconPauseStyle;
      },
      false
    );
    this.video.addEventListener(
      "pause",
      () => {
        console.log("视频暂停播放");
        this.playIcon.style = playIconPlayStyle;
      },
      false
    );
    this.video.addEventListener(
      "ended",
      () => {
        console.log("视频播放结束");
        this.playIcon.style = playIconPlayStyle;
      },
      false
    );
    this.video.addEventListener(
      "canplay",
      () => {
        this.loading.hide();
      },
      false
    );
    this.video.addEventListener(
      "canplaythrough",
      () => {
        this.loading.hide();
      },
      false
    );
    this.video.addEventListener(
      "loadedmetadata",
      () => {
        this.loading.hide();
        this.showPlayTime(0);
        console.log("loadedmetadata");
      },
      false
    );
    this.video.addEventListener(
      "waiting",
      () => {
        this.loading.show();
        console.log("loading");
      },
      false
    );
    hover(
      this.object3D.container,
      () => {
        if (this.timmer) {
          clearTimeout(this.timmer);
          this.timmer = null;
        }
        this.playBtnBox.style.bottom = "0px";
        console.log(1);
      },
      () => {
        console.log(2);
        this.timmer = setTimeout(() => {
          this.playBtnBox.style.bottom = "-60px";
        }, 2000);
      }
    );
  }
  //下载进度提示
  loadProcess(e) {
    let time = 0;
    if (parseInt(e.target.currentTime) !== Number(time)) {
      time = parseInt(e.target.currentTime);
      const timeRanges = this.video.buffered;

      // 获取已缓存的时间  timeRanges.end(timeRanges.length - 1)
      let p =
        parseInt(
          ((timeRanges.end(timeRanges.length - 1) * 100) /
            this.video.duration) *
            100
        ) / 100;
      this.loadingBar.style.width = `${p}%`;
      // console.log(p);
    }
  }
  // 创建播放和时间显示
  createPlayAndTime(controlBox) {
    // 左侧控制
    const leftDivbox = document.createElement("div");
    leftDivbox.setAttribute("data-name", "leftDivbox");
    leftDivbox.style = leftDivboxStyle;
    const playIcon = document.createElement("div");
    playIcon.setAttribute("data-name", "playIcon");
    this.playIcon = playIcon;
    leftDivbox.appendChild(playIcon);
    playIcon.style = playIconPlayStyle;
    controlBox.append(leftDivbox);
    this.timeShow = document.createElement("div");
    this.timeShow.innerText = "00:00:00/00:00:00";

    this.timeShow.setAttribute(
      "style",
      `
      font-size:14px;
      color:#fff;
      `
    );
    leftDivbox.append(this.timeShow);
    playIcon.onclick = () => {
      console.log(this.video);
      if (this.video.paused) {
        playIcon.style = playIconPauseStyle;
        this.video.play();
      } else {
        this.video.pause();
        playIcon.style = playIconPlayStyle;
      }
    };
    // 右侧控制
    const rightDivBox = document.createElement("div");
    rightDivBox.setAttribute("data-name", "rightDivBox");
    rightDivBox.style = rightDivBoxStyle;
    if (!isMobile()) {
      createVoiceBar(this.video, rightDivBox);
    }

    createVoice(this.video, rightDivBox);
    createLoop(this.video, rightDivBox);

    // 创建播放倍率
    createPlayerMagnification(this.video, rightDivBox);
    // vr 视频切换
    this.vrBoxBtn = changeVRAndVD(this.video, rightDivBox, this.object3D);
    fullScrean(rightDivBox, this.object3D.container);
    controlBox.append(rightDivBox);
  }
  // 显示播放时间
  showPlayTime(timeDisplay) {
    const duration = Math.ceil(this.video.duration);
    const { hours, minutes, seconds } = timeChange(duration * 1000);
    const {
      hours: playhours,
      minutes: playminutes,
      seconds: playseconds,
    } = timeChange(timeDisplay * 1000);
    this.timeShow.innerText = `${playhours}:${playminutes}:${playseconds}/${hours}:${minutes}:${seconds}`;
  }
}
