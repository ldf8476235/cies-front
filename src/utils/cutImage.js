/*
 * @Autor: wh
 * @Version: 1.0
 * @Date: 2021-02-18 15:26:45
 * @LastEditors: wh
 * @Description:
 * @LastEditTime: 2021-02-23 14:48:09
 */
let canvasWidth, canvasHeight
// 鼠标按下函数
export function mouseDown(opt) {
  const x = opt.event.pageX
  const y = opt.event.pageY
  let width = 0;
  let height = 0;
  const startX = opt.event.offsetX
  const startY = opt.event.offsetY
  const bgCanvas = opt.canvas
  const screen = opt.screen
  canvasWidth = bgCanvas.width;
  canvasHeight = bgCanvas.height;
  opt._this.$nextTick(() => {
    const divEle = document.getElementById(opt.id)
    document.onmousemove = function(e) {
      e.preventDefault()
      e.stopPropagation()
      width = e.pageX - x
      height = e.pageY - y
      divEle.style.left = startX + 'px';
      divEle.style.top = startY + 'px';
      // 拖拽矩形框放大边界检测
      if (width >= (canvasWidth - startX)) {
        divEle.style.width = (canvasWidth - startX) + 'px';
      } else {
        divEle.style.width = width + 'px';
      }
      if (height >= (canvasHeight - startY)) {
        divEle.style.height = (canvasHeight - startY) + 'px';
      } else {
        divEle.style.height = height + 'px';
      }
    }
    document.onmouseup = function(e) {
      e.stopPropagation();
      e.preventDefault();
      document.onmousemove = null
      opt.domArr.splice(2)
      drawImg(divEle, bgCanvas, screen, startX, startY, opt)
      drag(divEle, bgCanvas, screen, opt)
      flexible(divEle, bgCanvas, opt)
      document.onmousemove = null
      document.onmouseup = null
    }
  })

}
// base64转化blob
function dataURLtoBlob(dataurl) {
  var arr = dataurl.split(',');
  var mime = arr[0].match(/:(.*?);/)[1];
  var bstr = atob(arr[1]);
  var n = bstr.length;
  var u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
}
// 拖拽函数
function drag(divEle, bgCanvas, screen, opt) {
  let twidth = 0;
  let theight = 0;
  let endx = parseInt(divEle.style.top)
  let endy = parseInt(divEle.style.left)
  divEle.onmousedown = function(e) {
    if (e.target.className === 'desc_1') return
    e.stopPropagation();
    e.preventDefault();
    const event = e || window.event;
    const _target = event.target
    const sb_bkx = event.clientX - _target.offsetLeft;
    const sb_bky = event.clientY - _target.offsetTop;

    twidth = parseInt(_target.style.width)
    theight = parseInt(_target.style.height)
    if (event.preventDefault) {
      event.preventDefault();
    } else {
      event.returnValue = false;
    }
    document.onmousemove = function(ev) {
      e.stopPropagation();
      e.preventDefault();
      const event = ev || window.event;
      endx = event.clientX - sb_bkx;
      endy = event.clientY - sb_bky;
      // 拖拽边界检测
      if (endx <= 0) {
        _target.style.left = 0 + 'px';
      } else if (endx + twidth >= screen.offsetWidth) {
        _target.style.left = (screen.offsetWidth - twidth - 4) + 'px';
      } else {
        _target.style.left = endx + 'px';
      }
      if (endy <= 0) {
        _target.style.top = 0 + 'px';
      } else if (endy + theight >= screen.offsetHeight) {
        _target.style.top = (screen.offsetHeight - theight - 4) + 'px';
      } else {
        _target.style.top = endy + 'px';
      }
    }
    document.onmouseup = function(e) {
      e.stopPropagation();
      e.preventDefault();
      drawImg(divEle, bgCanvas, screen, parseInt(_target.style.left), parseInt(_target.style.top), opt)
      flexible(divEle, bgCanvas, opt)
      document.onmousemove = null;
      divEle.onmouseup = null
    }
  }
}
// 拉伸缩放函数
function flexible(divEle, bgCanvas, opt) {
  let twidth = parseInt(divEle.style.width);
  let theight = parseInt(divEle.style.height);
  canvasWidth = bgCanvas.width;
  canvasHeight = bgCanvas.height;
  const dLeft = parseInt(divEle.style.left);
  const dTop = parseInt(divEle.style.top);
  let arrows = ''
  const dateArrows = new Date().getTime();
  const idArrows = 'newDiv' + dateArrows + parseInt(Math.random() * 10);
  const arr = divEle.getElementsByTagName('div')
  if (arr.length > 0) {
    divEle.removeChild(arr[0])
  }
  arrows = document.createElement('div')
  arrows.setAttribute('class', 'arrows')
  arrows.setAttribute('id', idArrows)
  arrows.style.position = 'absolute'
  arrows.style.cursor = 'nw-resize'
  arrows.style.left = twidth - 9 + 'px'
  arrows.style.top = theight - 9 + 'px'
  arrows.style.width = 10 + 'px'
  arrows.style.height = 10 + 'px'
  divEle.appendChild(arrows)
  arrows.onmousedown = function(e) {
    const x = e.pageX - e.target.offsetLeft - 10
    const y = e.pageY - e.target.offsetTop - 10
    e.stopPropagation();
    e.preventDefault();
    document.onmousemove = function(e) {
      e.stopPropagation();
      e.preventDefault();
      twidth = e.pageX - x
      theight = e.pageY - y
      // 矩形框最小收缩区域
      if (twidth <= 10) {
        twidth = 10
        theight = e.pageY - y
      }
      if (theight <= 10) {
        twidth = e.pageX - x
        theight = 10
      }
      if (twidth <= 10 && theight <= 10) {
        twidth = 10
        theight = 10
      }
      // 拖拽放大边界检测
      if (twidth >= (canvasWidth - dLeft)) {
        divEle.style.width = (canvasWidth - dLeft) + 'px';
        arrows.style.left = (canvasWidth - dLeft - 9) + 'px';
      } else {
        divEle.style.width = twidth + 'px';
        arrows.style.left = twidth - 9 + 'px'
      }

      if (theight >= (canvasHeight - dTop)) {
        divEle.style.height = (canvasHeight - dTop) + 'px';
        arrows.style.top = (canvasHeight - dTop - 9) + 'px'
      } else {
        divEle.style.height = theight + 'px';
        arrows.style.top = theight - 9 + 'px'
      }

    }
    document.onmouseup = function(e) {
      e.stopPropagation();
      e.preventDefault();
      drawImg(divEle, bgCanvas, opt.screen, parseInt(divEle.style.left), parseInt(divEle.style.top), opt)
      document.onmousemove = null
      document.onmouseup = null
      divEle.onmouseup = null
      arrows.onmouseup = null
    }
  }
}
// canvas绘制
function drawImg(divEle, bgCanvas, screen, startX, startY, opt) {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  const rateX = canvasWidth / screen.offsetWidth
  const rateY = canvasHeight / screen.offsetHeight

  const w = parseInt(divEle.style.width)
  const h = parseInt(divEle.style.height)
  canvas.width = w
  canvas.height = h
  console.log(startX, startY)
  const x = Math.floor(startX / screen.offsetWidth * opt.screenSize.width)
  const y = Math.floor(startY / screen.offsetHeight * opt.screenSize.height)
  const w1 = Math.floor(w / screen.offsetWidth * opt.screenSize.width)
  const h1 = Math.floor(h / screen.offsetHeight * opt.screenSize.height)
  const area = [x, y, x + w1, y + h1]
  if (opt._this.btnType === 'verifyScope') {
    opt._this.verifyInfo.outline_area = area
    return
  }
  ctx.drawImage(
    bgCanvas,
    startX * rateX,
    startY * rateY,
    w * rateX,
    h * rateY,
    0,
    0,
    w,
    h)
  console.log(x, y, w1, h1)
  const data = {
    inline_area: area,
    ip: opt._this.deviceUrl
  }
  const img = opt._this.$refs.img
  console.log(canvas.toDataURL())
  // img.src = canvas.toDataURL()
  const base64 = encode(JSON.stringify(data))
  const url = `/api/v1/algorithm?data=${base64}`
  opt._this.$axios.get(url).then(res => {
    opt._this.verifyInfo.base64 = res.image_code
    img.src = 'data:image/png;base64,' + res.image_code
    console.log(res.image_code)
    opt._this.verifyInfo.image_uid = res.image_uid
  })
  opt._this.verifyInfo.inline_area = [x, y, x + w1, y + h1]
}

// 字符串转base64
function encode(str) {
  // 对字符串进行编码
  // var encode = encodeURI(str);
  // 对编码的字符串转化base64
  var base64 = btoa(str);
  return base64;
}
