import { hover } from "./tool";
import {
  circleStyle,
  processBarStyle,
  divRateStyle,
  parentStyle,
  boxStyle,
  itemStyle,
  vrBoxStyle,
  vdBoxStyle,
  loadingIconStyle,
  voiceOpenStyle,
  voiceCloseStyle,
  loopOpenStyle,
  loopCloseStyle,
  voiceBoxStyle,
  voiceBarStyle,
  voiceBarCircleStyle,
  fullScreanStyle,
  outFullScreanStyle,
  fullStyle,
} from "./playerCss";
// 视频倍率功能
export function createPlayerMagnification(video, dom) {
  const divRate = document.createElement("div");
  divRate.setAttribute("data-name", "divRate");
  divRate.style = divRateStyle;
  const parent = document.createElement("div");
  parent.setAttribute("data-name", "parent");
  parent.style = parentStyle;
  const box = document.createElement("div");
  parent.appendChild(divRate);
  box.style = boxStyle;
  [0.5, 1, 1.2, 1.5, 2].reverse().forEach((child, index) => {
    const item = document.createElement("div");
    let style = itemStyle;
    if (index === 0) {
      style += "border-top-left-radius:4px;border-top-right-radius:4px";
    }
    if (index === 4) {
      style += "border-bottom-left-radius:4px;border-bottom-right-radius:4px";
    }
    item.style = style;

    hover(
      item,
      () => {
        item.style.color = "rgb(102, 153, 0)";
      },
      () => {
        item.style.color = "#fff";
      }
    );
    item.onclick = () => {
      divRate.innerText = item.innerText;
      video.playbackRate = parseFloat(item.innerText);
      item.style.color = "rgb(102, 153, 0)";
    };
    item.innerText = child + "x";
    box.appendChild(item);
  });
  divRate.innerText = "1x";

  hover(
    parent,
    () => {
      divRate.style.backgroundColor = "rgb(102, 153, 0)";
      box.style.display = "flex";
      setTimeout(() => {
        box.style.opacity = 1;
      });
    },
    () => {
      console.log("hoverOut");
      divRate.style.backgroundColor = "transparent";
      box.style.opacity = 0;
      setTimeout(() => {
        box.style.display = "none";
      }, 200);
    }
  );
  parent.appendChild(box);
  dom.appendChild(parent);
  console.log(video);
}
// 创建进度条合作
export function createProcessBar(video, dom) {
  const processBar = document.createElement("div");
  processBar.setAttribute("data-name", "processBar");
  processBar.style = processBarStyle;
  processBar.onmousedown = (e) => {
    let { offsetX } = e;
    let per = offsetX / processBar.offsetWidth;
    video.currentTime = video.duration * per;
  };
  dom.appendChild(processBar);
  return processBar;
}
// 鼠标拖动快进快退
let start = 0;
let flag = false;
let width = 0;
export function createPlayCicle(video, playerProcessBar, processBox, player) {
  const circle = document.createElement("div");
  console.log(video);
  circle.style = circleStyle;
  playerProcessBar.append(circle);
  hover(
    processBox,
    () => {
      circle.style.opacity = 1;
    },
    () => {
      circle.style.opacity = 0;
    }
  );
  circle.onmousedown = (e) => {
    console.log(e);
    let { clientX } = e;
    player.circleMove = true;
    flag = true;
    start = clientX;

    width = parseFloat(playerProcessBar.offsetWidth);
  };
  document.onmousemove = (e) => {
    let { clientX } = e;
    if (flag == false) return;
    playerProcessBar.style.width = width + clientX - start + "px";
  };
  document.onmouseup = () => {
    player.circleMove = false;
    if (flag) {
      const per =
        parseFloat(playerProcessBar.offsetWidth) / processBox.offsetWidth;
      video.currentTime = video.duration * per;
    }

    flag = false;
  };
}

// VR视频和普通视频切换
export function changeVRAndVD(video, dom, object3D) {
  const vrBox = document.createElement("div");
  vrBox.setAttribute("data-name", "vrBox");
  if (object3D.playType === "vr") {
    vrBox.style = vdBoxStyle;
  } else {
    vrBox.style = vrBoxStyle;
  }

  dom.appendChild(vrBox);
  vrBox.onclick = () => {
    if (object3D.playTypeName === "vr") {
      object3D.playTypeName = "vd";
      vrBox.style = vrBoxStyle;
    } else {
      object3D.playTypeName = "vr";
      vrBox.style = vdBoxStyle;
    }
    console.log(object3D);
  };
  return vrBox;
}

// 视频加载动画
export function loading(dom) {
  const loadingIcon = document.createElement("div");
  loadingIcon.setAttribute("data-name", "loadingIcon");
  dom.appendChild(loadingIcon);
  loadingIcon.style = loadingIconStyle;
  return {
    hide: () => {
      loadingIcon.style.opacity = 0;
    },
    show: () => {
      loadingIcon.style.opacity = 1;
    },
  };
}

// 声音开关
export function createVoice(video, dom) {
  const voiceIcon = document.createElement("div");
  voiceIcon.setAttribute("data-name", "voiceIcon");
  voiceIcon.setAttribute("class", "voiceIcon");
  voiceIcon.style = voiceOpenStyle;
  dom.appendChild(voiceIcon);

  if (video.muted) {
    voiceIcon.style = voiceCloseStyle;
  } else {
    voiceIcon.style = voiceOpenStyle;
  }
  voiceIcon.onclick = () => {
    const voiceBar = document.querySelector("div.voiceBar");
    if (video.muted) {
      video.muted = false;
      if (voiceBar) {
        voiceBar.style.width = "100%";
      }

      voiceIcon.style = voiceOpenStyle;
    } else {
      video.muted = true;
      if (voiceBar) {
        voiceBar.style.width = 0;
      }

      voiceIcon.style = voiceCloseStyle;
    }
  };
}

// 是否循环
export function createLoop(video, dom) {
  const loopIcon = document.createElement("div");
  loopIcon.setAttribute("data-name", "loopIcon");

  loopIcon.style = loopOpenStyle;
  dom.appendChild(loopIcon);
  if (video.loop) {
    loopIcon.style = loopOpenStyle;
  } else {
    loopIcon.style = loopCloseStyle;
  }
  loopIcon.onclick = () => {
    if (video.loop) {
      video.loop = false;
      loopIcon.style = loopCloseStyle;
    } else {
      video.loop = true;
      loopIcon.style = loopOpenStyle;
    }
  };
}
let voiceWidth = 0;
let voiceStart = 0;
let voiceFlag = false;
// 创建声音大小调节方法
export function createVoiceBar(video, dom) {
  const voiceBox = document.createElement("div");
  voiceBox.style = voiceBoxStyle;
  voiceBox.setAttribute("data-name", "voiceBox");
  const voiceBar = document.createElement("div");
  voiceBar.style = voiceBarStyle;
  voiceBar.setAttribute("data-name", "voiceBar");
  voiceBar.setAttribute("class", "voiceBar");
  voiceBox.appendChild(voiceBar);
  const voiceBarCircle = document.createElement("div");
  voiceBarCircle.setAttribute("data-name", "voiceBarCircle");
  voiceBarCircle.style = voiceBarCircleStyle;
  voiceBar.appendChild(voiceBarCircle);
  dom.appendChild(voiceBox);
  if (video.muted) {
    voiceBar.style.width = 0;
  } else {
    voiceBar.style.width = "100%";
  }

  voiceBarCircle.onmousedown = (e) => {
    console.log(e);
    let { clientX } = e;
    voiceStart = clientX;
    voiceFlag = true;
    voiceWidth = parseFloat(voiceBar.offsetWidth);
  };
  voiceBarCircle.onmousemove = (e) => {
    if (voiceFlag === false) {
      return;
    }
    let { clientX } = e;
    let add = clientX - voiceStart;
    let len = voiceWidth - add;
    let totalLen = parseFloat(voiceBox.style.width);
    console.log(len);
    if (len < totalLen && len > 0) {
      voiceBar.style.width = len + "px";
      let per = len / totalLen;
      video.volume = per;
      console.log(per);
      if (per < 0.04) {
        const voiceIcon = document.querySelector("div.voiceIcon");
        voiceIcon.style = voiceCloseStyle;
        video.muted = true;
      } else {
        const voiceIcon = document.querySelector("div.voiceIcon");
        voiceIcon.style = voiceOpenStyle;
        video.muted = false;
      }
    }
  };
  voiceBarCircle.onmouseup = () => {
    voiceFlag = false;
  };
  voiceBarCircle.onmouseout = () => {
    voiceFlag = false;
    console.log("onmouseout");
  };
  voiceBox.onclick = (e) => {
    let totalLen = parseFloat(voiceBox.style.width);

    let per = e.offsetX / totalLen;
    video.volume = 1 - per;
    console.log(per);
    voiceBar.style.width = (1 - per) * 100 + "%";

    if (per < 0.04) {
      const voiceIcon = document.querySelector("div.voiceIcon");
      voiceIcon.style = voiceCloseStyle;
      video.muted = true;
    } else {
      const voiceIcon = document.querySelector("div.voiceIcon");
      voiceIcon.style = voiceOpenStyle;
      video.muted = false;
    }
  };
}
let fullFlag = false;
let originStyle = "position:relative;overflow:hidden;";
// 全屏 和取消全屏
export function fullScrean(dom, container) {
  const fullScrean = document.createElement("div");
  fullScrean.setAttribute("data-name", "fullScrean");
  fullScrean.style = fullScreanStyle;
  dom.appendChild(fullScrean);
  fullScrean.onclick = () => {
    if (!fullFlag) {
      fullFlag = true;
      fullScrean.style = outFullScreanStyle;
      container.style = fullStyle;
    } else {
      fullFlag = false;
      container.style = originStyle;
      fullScrean.style = fullScreanStyle;
    }
  };
}
