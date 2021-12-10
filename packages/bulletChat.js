const styleCss = {
  bulletChatDivStyle: `
        position:absolute;
        left:0;
        right:0;top:0;
        bottom:0;
        overflow:hidden;
        pointer-events: none;
    `,
};

function configer() {
  return {
    row: 5,
    speed: 0.3,
    colors: ["#4f4cc3", "yellow", "#4cc350", "#dd8120", "#ffffff"],
  };
}

export default class BulletChat {
  constructor(container) {
    this.configer = Object.assign({}, configer());
    this.container = container;
    this.requestAnimation = null;
    this.bulletChatDiv = null;
    this.nextTime = new Date().getTime();
    this.textArr = ["hello", "您哈"];

    this.textDomArr = [];
    this.init();
  }
  init() {
    this.createBulletChatContainer();
    this.createAnimate();

    this.createMatr(this.textArr, this.configer.row);
  }
  // 创建弹幕容器
  createBulletChatContainer() {
    this.bulletChatDiv = document.createElement("div");
    this.bulletChatDiv.setAttribute("data-name", "bulletChatDiv");
    this.bulletChatDiv.style = styleCss.bulletChatDivStyle;
    this.container.appendChild(this.bulletChatDiv);
  }
  //添加弹幕文字
  addBulletText(text) {
    let topPer = this.randomIndex(10, 25);
    let per = this.textDomArr.length % this.configer.row || 1;
    topPer = per * topPer + "px";
    this.createTextStyle(text, topPer, -400);
  }
  // 创建弹幕样式
  createTextStyle(text, top, randomRight) {
    const textDiv = document.createElement("div");
    textDiv.innerText = text;
    const textDivStyle = `
        position:absolute;
        width:${text.length * 20}px;
        font-size:13px;
        font-weight:500;
        color:${
          this.configer.colors[this.randomIndex(0, this.configer.colors.length)]
        };
        right:${randomRight}px;
        top:${top}
    `;

    textDiv.style = textDivStyle;
    textDiv.setAttribute("data-name", "textDiv");
    this.textDomArr.push({
      dom: textDiv,
      speed: this.randomIndex(0.2, 0.05, false),
      right: randomRight + "px",
    });
    this.bulletChatDiv.append(textDiv);
  }

  createAnimate() {
    const nowTime = new Date().getTime();
    let time = nowTime - this.nextTime;
    this.moveText(time);
    this.nextTime = new Date().getTime();
    // console.log(dis);
    // this.requestAnimation = window.requestAnimationFrame(() => {
    //   this.createAnimate();
    // });
  }

  moveText(time) {
    this.textDomArr.forEach((item) => {
      const dis = item.speed * time;

      let right = parseFloat(item.dom.style.right);
      if (right > this.container.offsetWidth + 100) {
        item.dom.style.right = item.right;
      } else {
        right += dis;
        item.dom.style.right = right + "px";
      }
    });
  }

  randomIndex(m, n, ty = 1) {
    if (ty) {
      return Math.floor(Math.random() * (m - n) + n);
    }
    return Math.random() * (m - n) + n;
  }

  createMatr(arr, row = 5) {
    let obj = {};
    let top = 10;
    let topPer = this.randomIndex(10, 15);
    arr.forEach((item, index) => {
      if (index % row == 0) {
        top = 10;
        topPer = this.randomIndex(10, 24);
      }
      top += (index % row) * topPer;
      let right = this.randomIndex(-10, -100);
      if (obj[index % row]) {
        right += obj[index % row];
      }
      obj[index % row] = right;
      this.createTextStyle(item, top + "px", right);
      console.log(top, right);
      console.log(obj);
    });
  }
}
