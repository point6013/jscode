/**spread2 = spread对象
*/
function before_save() {
    spread.suspendPaint();
    $('div.sheetInsertRow').hide();//隐藏插入行
    // var sheet = spread.getActiveSheet();
    var sheet1 = spread.getSheet(0);//获取sheet页
    var endRow = sheet1.getRowCount();//获取sheet页总行数
    var startRow = 1;
    var ColQ1 = 'D';
    var strFormula = '';
    // for (var x = 0; x <= 15; x++) {
    //     sheet.autoFitColumn(x);
    // 
    //H列列宽
    // sheet.setColumnWidth(7, 300);

    //隐藏Budg Code
    //将10进制转26进制
    var Convert26=function(num){
        var str="";
        while (num > 0){
            var m = num % 26;
            if (m == 0){
                m = 26;
            }
            str = String.fromCharCode(m + 64) + str;
            num = (num - m) / 26;
        }
        return str;
    }
    //将26进制转10进制
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
    sheet1.setColumnVisible(0,false);

    // // 隐藏 ABCD
    // sheet.setRowVisible(0, false, GC.Spread.Sheets.SheetArea.colHeader);
    // // 隐藏 1234
    // sheet.setColumnVisible(0, false, GC.Spread.Sheets.SheetArea.rowHeader);

    // // 隐藏上传按钮
    // $('#excel_upload').hide()

    // var rownum = 0;
    // function getNonEmptyRowIndex(sheet) {
    //     var rowCount = sheet.getRowCount(), colCount = sheet.getColumnCount();
    //     for (var i = rowCount - 1; i >= 0; i--) {
    //         if (sheet.getValue(i, 0) !== null && sheet.getValue(i, 0) !== undefined && sheet.getValue(i, 0) !== '') {
    //             return i;
    //         }
    //     }
    //     return -1;
    // }
    // rownum = getNonEmptyRowIndex(sheet);

    // var rno = rownum + 1



    // 拼接构造公式
    for (var i = 0; i < 12; i++){
        var col = Convert26(ConvertNum(ColQ1) + i);
        strFormula += col + (startRow+1) + ':' + col + endRow + '+';
    }
    debugger;
    // 去掉最后的+号
    strFormula = strFormula.substring(0,strFormula.length - 1);
    // 设置区域公式
    sheet1.setArrayFormula(1, 2, endRow-1, 1, 'IFERROR(IF('+strFormula+'=0,"",'+strFormula+'),"")');  
    
    debugger;

 spread.resumePaint();


}


