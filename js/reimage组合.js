function AfterLoad() {
spread.suspendPaint();
var sheet =spread.getActiveSheet();

var ConvertNum = function (str) {
    var n = 0;
    var s = str.match(/./g);//求出字符数组
    var j = 0;
    for (var i = str.length - 1, j = 1; i >= 0; i--, j *= 26) {
        var c = s[i].toUpperCase();
        if (c < 'A' || c > 'Z') {
            return 0;
        }
        n += (c.charCodeAt(0) - 64) * j;
    }
    return n;
}

num1 = ConvertNum("I");
num2 = ConvertNum("U");
num3 = ConvertNum("W");
num4 = ConvertNum("AH");
num5 = ConvertNum("AJ");
num6 = ConvertNum("AX");

num7 = ConvertNum("AZ");
num8 = ConvertNum("BM");


try{
    sheet.columnOutlines.ungroupRange(num1, num2);  //取消列分组初始化
    sheet.columnOutlines.group(num1, num2);  //C-H列区域分组
        sheet.columnOutlines.ungroupRange(num3, num4);  //取消列分组初始化
    sheet.columnOutlines.group(num3, num4);  //C-H列区域分组
        sheet.columnOutlines.ungroupRange(num5, num6);  //取消列分组初始化
    sheet.columnOutlines.group(num5, num6);  //C-H列区域分组
        sheet.columnOutlines.ungroupRange(num7, num8);  //取消列分组初始化
    sheet.columnOutlines.group(num7, num8);  //C-H列区域分组
    sheet.columnOutlines.direction(GC.Spread.Sheets.Outlines.OutlineDirection.backward)  //按钮位置放于左侧
    sheet.columnOutlines.expand(0, false);  //列上的区域分组默认收起    
}catch(e){
   sheet.invalidateLayout();
   sheet.repaint();  //当前sheet重新绘制
}

spread.resumePaint();
}