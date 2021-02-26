/*
 * @Autor: wh
 * @Version: 1.0
 * @Date: 2020-12-04 14:44:54
 * @LastEditors: wh
 * @Description:
 * @LastEditTime: 2021-02-26 10:16:54
 */
/**
 * 将字符串复制到剪贴板。必须从事件处理程序(如单击)中调用。
 * 如果失败，可能返回false，但这并不总是可能的。浏览器支持Chrome 43+，Firefox 42+， Safari 10+， Edge和IE 10+。
 * IE:剪贴板功能可能被管理员禁用。默认情况下，在第一次使用剪贴板时(每次会话)会显示一个提示。
*/
export function copyToClipboard(text) {
  if (window.clipboardData && window.clipboardData.setData) {
    // IE特定的代码路径，以防止文本区显示，而对话框是可见的。
    return clipboardData.setData('Text', text);

  } else if (document.queryCommandSupported && document.queryCommandSupported('copy')) {
    var textarea = document.createElement('textarea');
    textarea.textContent = text;
    textarea.style.position = 'fixed'; // 在MS Edge中防止滚动到页面底部。
    document.body.appendChild(textarea);
    textarea.select();
    try {
      return document.execCommand('copy'); // 某些浏览器可能会抛出安全异常。
    } catch (ex) {
      console.warn('Copy to clipboard failed.', ex);
      return false;
    } finally {
      document.body.removeChild(textarea);
    }
  }
}

/* Image Pool */
export function ImagePool(size) {
  this.size = size
  this.images = []
  this.counter = 0
}

ImagePool.prototype.next = function() {
  if (this.images.length < this.size) {
    var image = new Image()
    this.images.push(image)
    return image
  } else {
    if (this.counter >= this.size) {
      // 重置不太可能但理论上可能的溢出。
      this.counter = 0
    }
  }

  return this.images[this.counter++ % this.size]
}

// 转换为blob数据
export function b64toBlob(b64Data, contentType, sliceSize) {
  contentType = contentType || '';
  sliceSize = sliceSize || 512;

  var byteCharacters = atob(b64Data);
  var byteArrays = [];

  for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    var slice = byteCharacters.slice(offset, offset + sliceSize);

    var byteNumbers = new Array(slice.length);
    for (var i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    var byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  return new Blob(byteArrays, {
    type: contentType
  });
}
// 图片url转化成base64码
// getBase64Image('http://wwww.test/test.png', 'coopCachetImg')
// 第一个参数是图片的URL地址，第二个是转换成base64地址后要赋值给的img标签
export function getBase64Image(url, ref) {
  var image = new Image()
  image.src = url
  image.setAttribute('crossOrigin', 'anonymous')// 解决跨域
  return new Promise((resolve, reject) => {
    image.onload = function() {
      var base64 = drawBase64Image(image)
      resolve(base64)
    }
  })

}
export function drawBase64Image(img) {
  console.log(img)
  var canvas = document.createElement('canvas')
  canvas.width = img.width
  canvas.height = img.height
  var ctx = canvas.getContext('2d')
  ctx.drawImage(img, 0, 0, img.width, img.height)
  var dataURL = canvas.toDataURL('image/png')
  return dataURL
}
