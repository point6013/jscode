/*
 * @Author: Huang Meng
 * @Date: 2021-07-12 11:01:28
 * @LastEditTime: 2021-07-13 16:23:42
 * @LastEditors: your name
 * @Description: 
 1.根据表格中不同内容，更改所在行的颜色
 2.隐藏行号，隐藏列号
 3.替换特定位置的文本
 4.特定列的数据公式
 * @FilePath: \jscode\CapEx_Fin_rev_summary_by_product.js
 * 可以输入预定的版权声明、个性签名、空行等
 * 本次修改功能： 将第二个sheet的自定义js关闭, 原因是第一个js已经把第二个的功能实现
*/

function IT_Report() {
    spread.suspendPaint();
    suspendPaint_bysheet_0(0);
	suspendPaint_bysheet_1(1);
	spread.resumePaint();
}

function suspendPaint_bysheet_0(sheet_id){
	var sheet1 =spread.getSheet(sheet_id);
	//var sheet2 =spread.getSheet(1);
    //debugger;
    // sheet1.addSpan(0, 6, 2, 1);
    sheet1.getCell(0,8).backColor("rgb(239,239,239)");
    // var range = sheet1.getRange(0, 6, 2, 1, GC.Spread.Sheets.SheetArea.viewport);
    var range = new GC.Spread.Sheets.Range(0, 8, 2, 1);  // 该元素未使用0712审核
    // sheet1.autoMerge(range, GC.Spread.Sheets.AutoMerge.AutoMergeDirection.columnRow);
    sheet1.addSpan(0, 10, 3, 1);  // 合并Var%单元格，
    
    // A1文本替换
    sheet1.setValue(0,0,"Business Owner");  //将D1文本替换为TA Type
    
    // Total标题加粗
    sheet1.getCell(2, 6).font('bold normal 13px normal'); 
    sheet1.getCell(2, 9).font('bold normal 13px normal'); 
    
    // 隐藏上传按钮
    $('#excel_upload').hide()
    
    var endLine = sheet1.getRowCount();
    var endCol = sheet1.getColumnCount();
    for (var i = 1; i <= endLine; i++) {
        if (sheet1.getValue(i, 1) === "Total") {
            sheet1.getRange(i, 1, 1, endCol, GC.Spread.Sheets.SheetArea.viewport).font('bold normal 13px normal');
            sheet1.getRange(i, 1, 1, endCol).backColor("rgb(109,185,203)");
            sheet1.getRange(i, 1, 1, endCol).foreColor('white');
            sheet1.addSpan(i, 1, 1, 3);
            sheet1.setValue(i,1,"Subtotal by Biz Total");
            sheet1.getCell(i, 1).vAlign(GC.Spread.Sheets.VerticalAlign.center).hAlign(GC.Spread.Sheets.HorizontalAlign.center);
        }else if (sheet1.getValue(i, 3) === "Total") {
            //debugger;
            sheet1.getRange(i, 2, 1, endCol, GC.Spread.Sheets.SheetArea.viewport).font('bold normal 13px normal');
			sheet1.getRange(i, 2, 1, endCol).backColor("rgb(218,238,243)");
        }

    }
    sheet1.addSpan(endLine-1, 0, 1, 4);
    sheet1.setValue(endLine-1, 0,"Total");
    sheet1.getCell(endLine-1, 0).vAlign(GC.Spread.Sheets.VerticalAlign.center).hAlign(GC.Spread.Sheets.HorizontalAlign.center);
    sheet1.addSpan(endLine-3, 0, 1, 4);
    sheet1.setValue(endLine-3, 0,"Subtotal by Product");
    sheet1.getCell(endLine-3, 0).vAlign(GC.Spread.Sheets.VerticalAlign.center).hAlign(GC.Spread.Sheets.HorizontalAlign.center);
    sheet1.getRange(endLine-3, 0, 3, endCol, GC.Spread.Sheets.SheetArea.viewport).font('bold normal 13px normal');


    // 隐藏 ABCD
    sheet1.setRowVisible(0, false, GC.Spread.Sheets.SheetArea.colHeader);
    // 隐藏 1234
    sheet1.setColumnVisible(0, false, GC.Spread.Sheets.SheetArea.rowHeader);
    // 隐藏sheet名
    //spread.options.tabStripVisible = false;
    //spread.options.newTabVisible = false;
    
    // var%=(2021-2020)/2020
    var StartNum = 3;//初始行
    var StartNum1 = StartNum+1;
    //debugger;
    for (var i=4;i<= endLine;i++){
       sheet1.setFormula(i-1,10,'=IFERROR((J'+i+'-G'+i+')/G'+i+',"")') 
    }
    // sheet1.setArrayFormula(StartNum, 10, endLine-StartNum, 1, 'IFERROR((J' + StartNum1 + ':J' + endLine + '-G' + StartNum1 + ':G' + endLine + ')/G' + StartNum1 + ':G' + endLine + ',"")');
    sheet1.getRange(StartNum, 10, endLine-StartNum, 1, GC.Spread.Sheets.SheetArea.viewport).formatter("0.00%");  

}


function suspendPaint_bysheet_1(sheet_id){
	var sheet1 =spread.getSheet(sheet_id);
	//var sheet2 =spread.getSheet(1);
    //debugger;
    // sheet1.addSpan(0, 6, 2, 1);
    sheet1.getCell(0,8).backColor("rgb(239,239,239)");
    // var range = sheet1.getRange(0, 6, 2, 1, GC.Spread.Sheets.SheetArea.viewport);
    var range = new GC.Spread.Sheets.Range(0, 8, 2, 1);
    // sheet1.autoMerge(range, GC.Spread.Sheets.AutoMerge.AutoMergeDirection.columnRow);
    sheet1.addSpan(0, 10, 3, 1);  // 合并Var%单元格
    
    // A1文本替换
    sheet1.setValue(0,0,"Business Owner");  //将D1文本替换为TA Type
    
    // Total标题加粗
    sheet1.getCell(2, 6).font('bold normal 13px normal'); 
    sheet1.getCell(2, 9).font('bold normal 13px normal'); 
    
    // 隐藏上传按钮
    $('#excel_upload').hide()
    
    var endLine = sheet1.getRowCount();
    for (var i = 1; i <= endLine; i++) {
        if (sheet1.getValue(i, 2) === "Total ITBP") {
            sheet1.getRange(i, 2, 1, 8, GC.Spread.Sheets.SheetArea.viewport).font('bold normal 13px normal');
			sheet1.getRange(i, 4, 1, 8).backColor("rgb(218,238,243)");
        }
    }
    // 隐藏 ABCD
    sheet1.setRowVisible(0, false, GC.Spread.Sheets.SheetArea.colHeader);
    // 隐藏 1234
    sheet1.setColumnVisible(0, false, GC.Spread.Sheets.SheetArea.rowHeader);
    // 隐藏sheet名
    //spread.options.tabStripVisible = false;
    //spread.options.newTabVisible = false;
    
    // var%=(2021-2020)/2020
    var StartNum = 3;//初始行
    var StartNum1 = StartNum+1;
    //debugger;
    sheet1.setArrayFormula(StartNum, 10, endLine-StartNum, 1, 'IFERROR((J' + StartNum1 + ':J' + endLine + '-G' + StartNum1 + ':G' + endLine + ')/G' + StartNum1 + ':G' + endLine + ',"")');
    sheet1.getRange(StartNum, 10, endLine-StartNum, 1, GC.Spread.Sheets.SheetArea.viewport).formatter("0.00%");  



}