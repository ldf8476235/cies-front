/*
 * @Autor: wh
 * @Version: 1.0
 * @Date: 2021-01-29 09:46:30
 * @LastEditors: wh
 * @Description:
 * @LastEditTime: 2021-02-05 15:04:28
 */
// 删除提示
export function delHint(_this) {
  return new Promise((reslove, reject) => {
    _this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      reslove('删除成功！')
    }).catch(() => {
      reject('已取消！')
    })
  })
}
// 提示信息 message
export function hintMsg(type, msg) {
  this.$message({
    type: type,
    message: msg
  })
}
// 数字验证

export function selfIsNaN(val) {
  return typeof val === 'number' && !isNaN(val)
}
