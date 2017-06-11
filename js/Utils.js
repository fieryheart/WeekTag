// 消除单位
function removeUnit(string) {
  var rst = 0;
  // 为像素单位
  if(string.includes('px')){
    rst = parseInt(string)
  }

  return rst
}
