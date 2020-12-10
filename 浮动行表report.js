function a() {
    spread.suspendPaint();
    $('div.sheetInsertRow').hide();//隐藏插入行
    var sheet = spread.getActiveSheet();


    //隐藏Budg Code
    // sheet.setColumnVisible(18,false);

    // // 隐藏 ABCD
    // sheet.setRowVisible(0, false, GC.Spread.Sheets.SheetArea.colHeader);
    // // 隐藏 1234
    // sheet.setColumnVisible(0, false, GC.Spread.Sheets.SheetArea.rowHeader);

    // // 隐藏上传按钮
    $('#excel_upload').hide()

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
    }
    debugger;

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


    var colI2 ='A'


    // for (var i =9; i<=22;i++){
    //     var col =Convert26(ConvertNum(colI2)+i);
    //     strFormula+='SUM('+col +2+":"+col+")"
    //     debugger;
    // }

    //     debugger;

        // 最后一行添加Total
        sheet.setValue(rno, 0, "Total")
        sheet.getCell(rno, 0).font('bold normal 13px normal')
        for (var i = 9; i <= 22; i++) {
            var strFormula ='';
            var col =Convert26(ConvertNum(colI2)+i);
            strFormula+='SUM('+col +2+":"+col+rno+")"
            sheet.setFormula(rno, i, strFormula);
            debugger;
            sheet.getCell(rno, i).font('bold normal 13px normal')
        }

    for (var x = 0; x <= 24; x++) {
        sheet.autoFitColumn(x);
    }

        sheet.setColumnWidth(3, 150);

        spread.resumePaint();
    }
    

