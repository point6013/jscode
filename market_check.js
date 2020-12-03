function a(){
    spread.suspendPaint();
    var sheet =spread.getSheet(1);
    
    var rowCount = sheet.getRowCount();
    
    var startRow =4 ;
    endrow=17
    for(i=0;i<=2;i++){
    strFormula=''
    strFormula += 'L' + (startRow) + ':' + 'L' + endrow +'*'+'M'+startRow+':'+'M'+endrow;
    sheet.setArrayFormula(3, 13, rowCount-3, 1, 'IFERROR(IF('+strFormula+'=0,"",'+strFormula+'),"")');
    startRow+=15
    endrow+=15
    }
    debugger;

    // // 设置区域公式
      
    // sheet.setArrayFormula(1, 19, rowCount-1, 1, 'IFERROR(IF('+strFormula1+'=0,"",'+strFormula1+'),"")'); 
    var l1 = ['IoT','NP#','RAM']
    var arr = sheet.getArray(1, 0, rowCount-1, 2);
    arr.forEach((e, i) => {
        if (e[0]) {
            {
                if (e[1]='TotalChina'){
                sheet.getCell(i+1, 11).backColor("White"); //  区域底色变白
                sheet.getCell(i+1, 12).backColor("White"); //  区域底色变白
                sheet.getCell(i+1, 13).backColor("White"); //  区域底色变白
                sheet.getCell(i+1, 11).locked(true);  //区域锁定
                sheet.getCell(i+1, 12).locked(true);  //区域锁定
                sheet.getCell(i+1, 13).locked(true);  //区域锁定}
                }
                if (l1.includes(e[0])&&e[1]!='TotalChina'){
                    // strFormula2=''
                    // strFormula2 += 'L' + i  +'*'+'M'+i;
                // sheet.getCell(i+1, 11).backColor("White"); //  区域底色变白
                // sheet.getCell(i+1, 12).backColor("White"); //  区域底色变白
                sheet.getCell(i+1, 13).backColor("White"); //  区域底色变白
                // sheet.getCell(i+1, 11).locked(true);  //区域锁定
                // sheet.getCell(i+1, 12).locked(true);  //区域锁定
                sheet.getCell(i+1, 13).locked(true);  //区域锁定}

                // sheet.setFormula(i-1,13,'IFERROR(IF('+strFormula2+'=0,"",'+strFormula2+'),"")')
                }
                if (!l1.includes(e[0])&&e[1]!='TotalChina'){
                    // strFormula2=''
                    // strFormula2 += 'L' + i  +'*'+'M'+i;
                    sheet.getCell(i+1, 11).backColor("White"); //  区域底色变白
                    sheet.getCell(i+1, 12).backColor("White"); //  区域底色变白
                    // sheet.getCell(i, 13).backColor("White"); //  区域底色变白
                    sheet.getCell(i+1, 11).locked(true);  //区域锁定
                    sheet.getCell(i+1, 12).locked(true);  //区域锁定
                    // sheet.getCell(i, 13).locked(true);  //区域锁定}
                    // sheet.setFormula(i,13,'IFERROR(IF('+strFormula2+'=0,"",'+strFormula2+'),"")')
    
                    }


            }  
        }
    }
    )
    
    
    // var endLine = sheet.getRowCount();  // 结束行号
    // var startLine = 3
    // var endCol = sheet.getColumnCount()
    // sheet.setArrayFormula(3, 8, endLine-3, 1, 'IFERROR(E4:E'+ endLine + '-H4:H' + endLine+',0)');  //i列=E列-H列
    // sheet.setArrayFormula(3, 10, endLine-3, 1, 'IFERROR(IF((B4:B'+ endLine + ')="TotalChina",IF((J4:J'+ endLine + ')="","",J4:J'+ endLine + '-H4:H' + endLine+'),""),"")');  //K列=j列-h列
    // var arr_market = sheet.getArray(3, 1, endLine-3, 1);
    // var arr_ranges = [new GC.Spread.Sheets.Range(3, 10, endLine-3, 1)];
    // arr_market.forEach((v,i)=>{
    //     if(v[0] && v[0]=='TotalChina'){
    //         arr_ranges.push(new GC.Spread.Sheets.Range(i+3, 8, 1, 1))
    //     }
    // })
    // var iconSetRule = new GC.Spread.Sheets.ConditionalFormatting.IconSetRule();
    // iconSetRule.ranges(arr_ranges);
    // // iconSetRule.ranges([new GC.Spread.Sheets.Range(3, 10, endLine-3, 1)]);
    // iconSetRule.iconSetType(GC.Spread.Sheets.ConditionalFormatting.IconSetType.threeTrafficLightsUnrimmed);
    // var iconCriteria = iconSetRule.iconCriteria();
    // iconCriteria[0] = new GC.Spread.Sheets.ConditionalFormatting.IconCriterion(true, GC.Spread.Sheets.ConditionalFormatting.IconValueType.number, 0);
    // iconCriteria[1] = new GC.Spread.Sheets.ConditionalFormatting.IconCriterion(true, GC.Spread.Sheets.ConditionalFormatting.IconValueType.number, 0);
    // iconSetRule.reverseIconOrder(false);
    // iconSetRule.showIconOnly(false);
    // sheet.conditionalFormats.clearRule();
    // sheet.conditionalFormats.addRule(iconSetRule);
    // for (var i = startLine; i <= endLine; i++) {
    //     if (sheet.getValue(i, 1) === "TotalChina") {
    //         sheet.getRange(i, 1, 1, endCol, GC.Spread.Sheets.SheetArea.viewport).font('bold normal 12px normal');
    //     }
    // }
    // sheet.setValue(0,8,"Var");  //将I1文本替换为TA Type
    // sheet.setValue(0,10,"Var");  //将K1文本替换为TA Type
    // var endLine = sheet.getRowCount();
    // // Office PC & Others起始结束行
    // var OCOStartLine;
    // var OCOEndLine;
    // for (var i = 3; i <= endLine; i++) {
    //     if(sheet.getValue(i, 0) == "Office PC & Others"){
    //         if(!OCOStartLine){
    //             OCOStartLine = i;
    //         }else if(i == endLine || sheet.getValue(i+1, 0) != "Office PC & Others"){
    //             OCOEndLine = i;
    //         }
    //     }else if(sheet.getValue(i, 1) == "TotalChina") {
    //         sheet.setFormula(i,6,'IFERROR(IF(H'+(i+1)+'/F'+(i+1)+'=0,"",H'+(i+1)+'/F'+(i+1)+'),"")')
    //     }else{   
    //         sheet.setFormula(i,7,'IFERROR(IF(F'+(i+1)+'*G'+(i+1)+'=0,"",F'+(i+1)+'*G'+(i+1)+'),"")')
    //     }
    // }
    // var Range = sheet.getRange(OCOStartLine, 5, OCOEndLine-OCOStartLine, 1, GC.Spread.Sheets.SheetArea.viewport);
    // Range.backColor("White");  //区域填充色为白色
    // Range.locked(true);  //区域锁定
    // var Range = sheet.getRange(OCOStartLine, 7, OCOEndLine-OCOStartLine, 1, GC.Spread.Sheets.SheetArea.viewport);
    // Range.backColor("rgb(255,243,201)");  
    // Range.locked(false);  
    
    //     //隐藏第i列至最后一列的所有无数据列
    // for (var i = 9;i<endCol;i++){
    //     HideNullCol(sheet,startLine,endLine,i);
    // }
    
    spread.resumePaint();
}
