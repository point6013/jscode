/**spread2 = spread对象
*/function IT_Report(){
    spread.suspendPaint();
    var sheet =spread.getSheet(0);
    var sheet1 =spread.getSheet(1);
    // 隐藏 ABCD
    sheet.setRowVisible(0, false, GC.Spread.Sheets.SheetArea.colHeader);
    // 隐藏 1234
    sheet.setColumnVisible(0, false, GC.Spread.Sheets.SheetArea.rowHeader);
    // // 隐藏sheet名
    // spread.options.tabStripVisible = false;
    // spread.options.newTabVisible = false;
    var year = $("[dc='Year']").val();
    last_year = year-1
    
    var arg1= last_year+' Projection'
    var arg2 = year+' Plan'
    debugger;
    sheet.setValue(2, 1, arg1); //将I1文本替换为TA Type
    sheet.setValue(2, 2, arg2); //将I1文本替换为TA Type
    sheet1.setValue(2, 1, arg1); //将I1文本替换为TA Type
    sheet1.setValue(2, 2, arg2); //将I1文本替换为TA Type
    spread.resumePaint();
    
}