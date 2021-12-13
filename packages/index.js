import * as THREE from "three";
import CameraControls from "camera-controls";
import Player from "./player";
import BulletChat from "./bulletChat.js";
function initConfig() {
  return {
    VRMinZoom: 0.01, // VR 最小放大
    VRMaxZoom: 0.01,
    VRMaxDistance: 0.01,
    VDMinZoom: 0.8,
    VDMaxZoom: 1,
    loop: true,
    muted: true,
    autoplay: true,
    playType: "VR", // 默认为VR播放
    bgColor: "#0000000", //0xaaaaaa
    useBulletChat: false,
    bulletChatRow: 5, // 弹幕默认行数
    bulletChatColors: ["#4f4cc3", "yellow", "#4cc350", "#dd8120", "#ffffff"], // 大幕默认颜色列表
  };
}

export default class VideoVr {
  constructor(container, config) {
    this.configer = Object.assign({}, initConfig(), config);
    this.bulletChat = new BulletChat(container, {
      row: this.configer.bulletChatRow,
      colors: this.configer.bulletChatColors,
    });
    this.playType = this.configer.playType;

    this.container = container;

    this.clock = new THREE.Clock();
    CameraControls.install({ THREE: THREE });
    this.videoPlayer = new Player(this.container, this);

    this.init();
  }
  get playTypeName() {
    return this.playType;
  }
  set playTypeName(val) {
    this.changeCamera(val);
    this.playType = val;
  }
  // 初始化
  init() {
    const canvas = document.createElement("canvas");
    this.canvas = canvas;
    canvas.style =
      "width:100%;height:100%;postion:absolute;left:0;right:0;background:#000";
    this.renderer = new THREE.WebGLRenderer({ canvas: canvas });
    this.renderer.setClearColor(this.configer.bgColor);
    this.container.appendChild(canvas);
    this.scene = new THREE.Scene();
    // this.createEvent();
  }
  // 创建视频盒子
  createVidoBox(video, type) {
    // if (this.skyBox) {
    //   this.scene.remove(this.skyBox);
    //   this.skyBox = null;
    // }
    const texture = new THREE.VideoTexture(video);
    this.material = new THREE.MeshBasicMaterial();
    this.material.map = texture;
    this.changeCamera(type);
    // if (type === "vr") {
    //   this.changeCamera(type);
    //   this.skyBox = new THREE.Mesh(
    //     new THREE.SphereBufferGeometry(30, 30, 30),
    //     material
    //   );
    //   this.skyBox.position.set(0, 0, 0);
    //   this.skyBox.geometry.scale(-1, 1, 1);
    // } else {
    //   this.changeCamera(type);
    //   // 4：3
    //   const width = this.canvas.clientWidth;
    //   const height = (width * 9) / 16;
    //   this.skyBox = new THREE.Mesh(
    //     new THREE.PlaneGeometry(width, height),
    //     material
    //   );
    //   this.skyBox.position.set(0, 0, 0);
    // }

    // this.scene.add(this.skyBox);
  }
  makeCamera(fov = 40) {
    const aspect = 2;
    const near = 0.1;
    const far = 1000;
    return new THREE.PerspectiveCamera(fov, aspect, near, far);
  }
  makeOrthographicCamera() {
    var width = this.canvas.clientWidth; //窗口宽度
    var height = this.canvas.clientHeight; //窗口高度
    var k = width / height; //窗口宽高比

    let [left, right, top, bottom, near, far] = [
      -width / 2,
      width / 2,
      width / k / 2,
      -width / k / 2,
      0,
      1000,
    ];
    return new THREE.OrthographicCamera(left, right, top, bottom, near, far);
  }
  resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      renderer.setSize(width, height, false);
    }
    return needResize;
  }
  render(renderer, scene) {
    const that = this;

    return function inner() {
      if (that.bulletChat && that.configer.useBulletChat) {
        that.bulletChat.createAnimate();
      }

      const camera = that.camera;
      const delta = that.clock.getDelta();
      let hasControlsUpdated = null;
      if (that.cameraControls) {
        hasControlsUpdated = that.cameraControls.update(delta);
      }

      if (that.resizeRendererToDisplaySize(renderer)) {
        const canvas = renderer.domElement;

        // const camera = cameraInfo.cam;
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
      }
      if (hasControlsUpdated) {
        renderer.render(scene, camera);
      } else {
        renderer.render(scene, camera);
      }
      requestAnimationFrame(inner);
    };
  }
  changeCamera(type) {
    console.log("tty");
    this.playType = type;
    if (this.skyBox) {
      this.scene.remove(this.skyBox);
      this.skyBox = null;
    }
    if (type === "vr") {
      this.skyBox = new THREE.Mesh(
        new THREE.SphereBufferGeometry(30, 32, 32, 0, Math.PI * 2),
        this.material
      );
      this.skyBox.position.set(0, 0, 0);
      this.skyBox.geometry.scale(-1, 1, 1);
    } else {
      // 4：3
      const width = this.canvas.clientWidth;
      const height = (width * 9) / 16;
      this.skyBox = new THREE.Mesh(
        new THREE.PlaneGeometry(width, height),
        this.material
      );
      this.skyBox.position.set(0, 0, 0);
    }

    if (type === "vr") {
      this.camera = this.makeCamera();
      this.camera.position.set(0, 0, 0.1).multiplyScalar(1);
      this.cameraControls = new CameraControls(
        this.camera,
        this.renderer.domElement
      );
      this.cameraControls.minZoom = this.configer.VRMinZoom;
      this.cameraControls.maxZoom = this.configer.VRMaxZoom;
      this.cameraControls.maxDistance = this.configer.VRMaxDistance;
    } else {
      this.camera = this.makeOrthographicCamera();
      this.camera.position.set(0, 0, 0);
      this.cameraControls = new CameraControls(
        this.camera,
        this.renderer.domElement
      );
      this.cameraControls.minZoom = this.configer.VDMinZoom;
      this.cameraControls.maxZoom = this.configer.VDMaxZoom;
      // this.camera.updateProjectionMatrix();
    }
    this.scene.add(this.skyBox);

    // this.createVidoBox(this.videoPlayer.video);

    this.render(this.renderer, this.scene)();
  }
  addBulletText(text) {
    this.bulletChat.addBulletText(text);
  }
  createEvent() {
    window.addEventListener(
      "deviceorientation",
      (event) => {
        var alpha = event.alpha; //绕Z轴旋转时，水平旋转时，数值为0度到360度。
        var beta = event.beta; //绕X轴旋转时，手机横向旋转时，数值为-180度到180度
        var gamma = event.gamma; //绕Y轴旋转时，手机竖向旋转时，数值为-90度到90度
        //手机不同，旋转数值会有差异
        console.log(alpha);
        console.log(beta);
        console.log(gamma);
        if (this.cameraControls) {
          this.cameraControls.rotateTo(
            (alpha * Math.PI) / 180,
            (beta * Math.PI) / 180,
            (gamma * Math.PI) / 180
          );
        }
      },
      false
    );
  }
  // 设置视频播放地址
  setSrc(src, type = "vr") {
    this.videoPlayer.setSrc(src, type);
  }
  // 设置默认弹幕数据
  setDefaultBulletText(textArray) {
    this.bulletChat.setDefaultBulletText(textArray);
  }
  // 视频播放
  play(src = "", type = "vr") {
    console.log(src);
    if (src) {
      this.videoPlayer.setSrc(src, type);
    }
    this.videoPlayer.video.play();
  }
  // 视频暂停
  pause() {
    this.videoPlayer.video.pause();
  }
}
