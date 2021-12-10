export function hover(elem, overCallback, outCallback) {
  //实现hover事件
  var isHover = false; //判断是否悬浮在上方
  var preOvTime = new Date().getTime(); //上次悬浮时间
  function over(e) {
    var curOvTime = new Date().getTime();
    isHover = true; //处于over状态
    if (curOvTime - preOvTime > 10) {
      //时间间隔超过10毫秒，认为鼠标完成了mouseout事件
      overCallback(e, elem);
    }
    preOvTime = curOvTime;
  }
  function out(e) {
    var curOvTime = new Date().getTime();
    preOvTime = curOvTime;
    isHover = false;
    setTimeout(function () {
      if (!isHover) {
        outCallback(e, elem);
      }
    }, 10);
  }
  bind(elem, "mouseover", over);
  bind(elem, "mouseout", out);
}
export function bind(elem, ev, callback) {
  if (document.all) {
    elem.attachEvent("on" + ev, callback);
  } else {
    elem.addEventListener(ev, callback, false);
  }
}
export function unbind(elem, ev, callback) {
  if (typeof callback == "function") {
    if (document.all) {
      elem.detachEvent("on" + ev, callback);
    } else {
      elem.removeEventListener(ev, callback, false);
    }
  } else {
    if (document.all) {
      elem.detachEvent("on" + ev);
    } else {
      elem.removeEventListener(ev, false);
    }
  }
}

export function formatNumber(n) {
  n = n.toString();
  return n[1] ? n : "0" + n;
}

export function timeChange(mss) {
  let days = parseInt(mss / (1000 * 60 * 60 * 24));
  let hours = parseInt((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  hours = formatNumber(hours);
  let minutes = parseInt((mss % (1000 * 60 * 60)) / (1000 * 60));
  minutes = formatNumber(minutes);
  let seconds = parseInt((mss % (1000 * 60)) / 1000);
  seconds = formatNumber(seconds);
  return {
    days,
    hours,
    minutes,
    seconds,
  };
}

export function isMobile() {
  return navigator.userAgent.match(/(iPhone|iPod|Android|ios)/i);
}
