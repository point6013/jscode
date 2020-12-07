function a() {
    spread.suspendPaint();
    $('div.sheetInsertRow').hide();//隐藏插入行
    var sheet = spread.getActiveSheet();

    for (var x = 0; x <= 15; x++) {
        sheet.autoFitColumn(x);
    }

    //H列列宽
    // sheet.setColumnWidth(7, 300);

    //隐藏Budg Code
    // sheet.setColumnVisible(18,false);

    // // 隐藏 ABCD
    // sheet.setRowVisible(0, false, GC.Spread.Sheets.SheetArea.colHeader);
    // // 隐藏 1234
    // sheet.setColumnVisible(0, false, GC.Spread.Sheets.SheetArea.rowHeader);

    // // 隐藏上传按钮
    // $('#excel_upload').hide()

    var rownum = 0;
    function getNonEmptyRowIndex(sheet) {
        var rowCount = sheet.getRowCount(), colCount = sheet.getColumnCount();
        for (var i = rowCount - 1; i >= 0; i--) {
            if (sheet.getValue(i, 0) !== null && sheet.getValue(i, 0) !== undefined && sheet.getValue(i, 0) !== '') {
                return i;
            }
        }
        return -1;
    }
    rownum = getNonEmptyRowIndex(sheet);

    var rno = rownum + 1

    var Convert26 = function (num) {
        var str = "";
        while (num > 0) {
            var m = num % 26;
            if (m == 0) {
                m = 26;
            }
            str = String.fromCharCode(m + 64) + str;
            num = (num - m) / 26;
        }
        return str;


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


    var colI2 =''
    var strFormula ='';

    for (var i =9; i<=22;i++){
        var col =Convert26(ConvertNum(colI2)+i);
        strFormula+='SUM('+col +2+":"+col+")"
        debugger;
    }



        // 最后一行添加Total
        sheet.setValue(rno, 0, "Total")
        sheet.getCell(rno, 0).font('bold normal 13px normal')
        for (var i = 9; i <= 23; i++) {
            sheet.setFormula(rno, i, 'SUM(I' + 2 + ':I' + rno + ')');
            sheet.getCell(rno, i).font('bold normal 13px normal')
        }

        // // 改变Status描述
        // var endLine = rownum
        // for (var i = 0; i <= endLine; i++) {
        //     if (sheet.getValue(i, 0) === "1") {
        //         sheet.setValue(i, 0,"To be Submitted");
        //     } else if (sheet.getValue(i, 0) === "2"){
        //         sheet.setValue(i, 0,"Submitted");
        //     } else if (sheet.getValue(i, 0) === "3"){
        //         sheet.setValue(i, 0,"Controller Pass");
        //     } else if (sheet.getValue(i, 0) === "4"){
        //         sheet.setValue(i, 0,"Controller Head Pass");
        //     } else if (sheet.getValue(i, 0) === "5"){
        //         sheet.setValue(i, 0,"IT Fin BP Pass");
        //     } else if (sheet.getValue(i, 0) === "6"){
        //         sheet.setValue(i, 0,"CapEx Fin Pass");
        //     } 

        // }

        spread.resumePaint();
    }
