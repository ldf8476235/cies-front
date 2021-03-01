/*
 * @Autor: wh
 * @Version: 1.0
 * @Date: 2021-02-26 16:17:55
 * @LastEditors: wh
 * @Description:
 * @LastEditTime: 2021-02-26 16:41:52
 */
export function drawArrow(ctx, fromX, fromY, toX, toY, theta, headlen, width, color) {
  console.log(ctx, fromX, fromY, toX, toY, theta, headlen, width, color)
  theta = typeof (theta) != 'undefined' ? theta : 30;
  headlen = typeof (theta) != 'undefined' ? headlen : 10;
  width = typeof (width) != 'undefined' ? width : 1;
  color = typeof (color) === 'string' ? color : '#000';

  // 计算各角度和对应的P2,P3坐标
  var angle = Math.atan2(fromY - toY, fromX - toX) * 180 / Math.PI;
  var angle1 = (angle + theta) * Math.PI / 180;
  var angle2 = (angle - theta) * Math.PI / 180;
  var topX = headlen * Math.cos(angle1);
  var topY = headlen * Math.sin(angle1);
  var botX = headlen * Math.cos(angle2);
  var botY = headlen * Math.sin(angle2);

  ctx.save();
  ctx.beginPath();

  var arrowX = fromX - topX;
  var arrowY = fromY - topY;

  ctx.moveTo(arrowX, arrowY);
  ctx.moveTo(fromX, fromY);
  ctx.lineTo(toX, toY);
  arrowX = toX + topX;
  arrowY = toY + topY;
  ctx.moveTo(arrowX, arrowY);
  ctx.lineTo(toX, toY);
  arrowX = toX + botX;
  arrowY = toY + botY;
  ctx.lineTo(arrowX, arrowY);
  ctx.strokeStyle = color;
  ctx.lineWidth = width;
  ctx.stroke();
  ctx.restore();
}
