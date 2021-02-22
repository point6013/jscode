/**spread2 = spread对象
*/
function IT_project(){
    spread.suspendPaint();
    var sheet =spread.getSheet(0);
    var strFormula = '';
    var strFormula1 = '';
    var strFormula2 = '';
    //G列列宽
    // 修改为5，6 
    sheet.setColumnWidth(5, 250);
    //H列列宽
    sheet.setColumnWidth(6, 200);
    sheet.setColumnVisible(25,false);
    // sheet.setColumnVisible(11,false);  //隐藏Budg Code
    
    $('#excel_upload').hide()  // 隐藏上传按钮
    

    
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
    // 获取非空行数
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
    
    
    
    
    
    //下拉值列表级联
    var rowCount = sheet.getRowCount();
    var startRow = 1;
    var ColQ1 = 'N';
    // 修改公式的的初始列
    var col = ConvertNum(ColQ1)
    strFormula += Convert26(col+2) + (startRow+1) + ':' + Convert26(col+2) + rowCount + '+'+ Convert26(col+3)+(startRow+1)+':'+Convert26(col+3)+rowCount;
    strFormula1 += Convert26(col+4) + (startRow+1) + ':' + Convert26(col+4) + rno + '-'+ Convert26(col)+(startRow+1)+':'+Convert26(col)+rno;
    strFormula2 += Convert26(col+4) + (startRow+1) + ':' + Convert26(col+4) + rno + '-'+ Convert26(col-1)+(startRow+1)+':'+Convert26(col-2)+rno;
    // strFormula1 += 'P' + (startRow+1) + ':' + 'P' + rowCount + '-'+'Q'+(startRow+1)+':'+'Q'+rowCount;
    // strFormula2 += 'S' + (startRow+1) + ':' + 'S' + rowCount + '-'+'N'+(startRow+1)+':'+'N'+rowCount;
    debugger;

    // 设置区域公式
    // sheet.setArrayFormula(1, col+3, rowCount-1, 1, 'IFERROR(IF('+strFormula+'=0,"",'+strFormula+'),"")'); 
    sheet.setArrayFormula(1, col+5, rno-1, 1, 'IFERROR(IF('+strFormula1+'=0,"",'+strFormula1+'),"")'); 
    sheet.setArrayFormula(1, col+4, rno-1, 1, 'IFERROR(IF('+strFormula2+'=0,"",'+strFormula2+'),"")'); 
    
    

    // 
    var colI2 ='A'
    sheet.setValue(rno, 0, "Total")
    sheet.getCell(rno, 0).font('bold normal 13px normal')
    for (var i = ConvertNum("L"); i <= ConvertNum("T"); i++) {
        var strFormula ='';
        var col =Convert26(i);
        strFormula+='SUM('+col +2+":"+col+rno+")"
        sheet.setFormula(rno, i-1, strFormula);
        debugger;
        sheet.getCell(rno, i-1).font('bold normal 13px normal')
    }
    
    
    
    
    
    
    
    
    sheet.bind(GC.Spread.Sheets.Events.ValueChanged,function(e,info){
            // 如果是A列改变了值
            if( info.col===0  ){
                //则改变B列的对应行的值
                setLValue(sheet,info.row);
            }
		}
	);
    
    // 遍历行数,初始化完sheet即加载规则
    for( var i=1;i<rowCount;i++ ){
        setLValue(sheet,i);
    }
    var viewFlag = getRequest().viewFlag
    if (viewFlag){
        var endLine = sheet.getRowCount();  // 结束行号
        var endCol = sheet.getColumnCount();  // 结束列号
        var cell = sheet.getRange(1, 0, endLine-1, endCol, GC.Spread.Sheets.SheetArea.viewport);
        cell.backColor("White");  //区域填充色为白色
        cell.locked(true);  //区域锁定
        $('a[name=save]').attr("style","display:none;");
    }
    
    spread.resumePaint();
}

// function beforeSave(){
//     debugger
//     spread.suspendPaint();
//     var sheet =spread.getSheet(0);
//     // 非空行
//     var rownum = getNonEmptyRowIndex(sheet);
//     var arr = sheet.getArray(1, 9, rownum, 1);
//     arr.forEach(row => {
//         if (!row[0]) {
//             $.jGrowl('', {
//                 header: "请填写完整Business Impact",
//                 theme: 'alert-styled-left bg-danger',
//             })
//             return false
//         }
//     }) 
//     spread.resumePaint();
// }


// function getNonEmptyRowIndex(sheet){
//     let rowCount = sheet.getRowCount();
//     let colCount = sheet.getColumnCount();

//     for(var i = 1; i <= rowCount; i++){
//         let arr = sheet.getArray(i, 0, 1, colCount);
//         let flag = false;
//         for (var j=0;j<arr.length;j++){
//             if (arr[j][0]){
//                 flag = true;
//                 break
//             }
//         }
//         if (!flag){
//             return i-1
//         }
//     }
//     return -1;
// }
// B列重置值方法
function setLValue(sheet,rowNum){
    // 获取A列对应行的值
    var gValue =  sheet.getValue(rowNum,0)
    var newArr =[]
    console.log( gValue,'gValue' )
     if( gValue=="BSC" ){
        newArr = [{
            subject_value:"Christina Zhang",
            description:"Christina Zhang",
        }]
    } else if ( gValue=="BE" ){ 
        newArr = [{
            subject_value:"Edison Yan",
            description:"Edison Yan",
        },{
            subject_value:"Emily Pang",
            description:"Emily Pang",
        },{
            subject_value:"Larry Lee",
            description:"Larry Lee",
        },{
            subject_value:"Qing Tian",
            description:"Qing Tian",
        },{
            subject_value:"Tato Jiang",
            description:"Tato Jiang",
        },{
            subject_value:"Xi Yang",
            description:"Xi Yang",
        }]
    } else if ( gValue=="CA" ){ 
        newArr = [{
            subject_value:"Cherry Zhao",
            description:"Cherry Zhao",
        },{
            subject_value:"Coco Li",
            description:"Coco Li",
        },{
            subject_value:"Yunfei Xu",
            description:"Yunfei Xu",
        },{
            subject_value:"Zy Zhang",
            description:"Zy Zhang",
        }]
    } else if ( gValue=="CBI" ){ 
        newArr = [{
            subject_value:"Andy Chen",
            description:"Andy Chen",
        },{
            subject_value:"Jay Yuan",
            description:"Jay Yuan",
        },{
            subject_value:"Kevin Shao",
            description:"Kevin Shao",
        },{
            subject_value:"Leann Shi",
            description:"Leann Shi",
        },{
            subject_value:"Mina Yu",
            description:"Mina Yu",
        },{
            subject_value:"Sean Xiao",
            description:"Sean Xiao",
        },{
            subject_value:"Thomas Wu",
            description:"Thomas Wu",
        }]
    } else if ( gValue=="CTC" ){ 
        newArr = [{
            subject_value:"Michael Liu",
            description:"Michael Liu",
        }]
    } else if ( gValue=="Dev" ){ 
        newArr = [{
            subject_value:"Alexander Zhang",
            description:"Alexander Zhang",
        },{
            subject_value:"Alice Li",
            description:"Alice Li",
        },{
            subject_value:"Bob Li",
            description:"Bob Li",
        },{
            subject_value:"Chen Li",
            description:"Chen Li",
        },{
            subject_value:"Doni Ma",
            description:"Doni Ma",
        },{
            subject_value:"Echo Liang",
            description:"Echo Liang",
        },{
            subject_value:"Fei Wang",
            description:"Fei Wang",
        },{
            subject_value:"Jacky Zha",
            description:"Jacky Zha",
        },{
            subject_value:"Jae Chen",
            description:"Jae Chen",
        },{
            subject_value:"Lei Yuan",
            description:"Lei Yuan",
        },{
            subject_value:"Liu Ni",
            description:"Liu Ni",
        },{
            subject_value:"Regan Li",
            description:"Regan Li",
        },{
            subject_value:"Sabrina Huang",
            description:"Sabrina Huang",
        },{
            subject_value:"Susan Hui",
            description:"Susan Hui",
        },{
            subject_value:"Tapu Qiu",
            description:"Tapu Qiu",
        },{
            subject_value:"Wei Huang",
            description:"Wei Huang",
        },{
            subject_value:"Xiaofang Hu",
            description:"Xiaofang Hu",
        }]
    } else if ( gValue=="Finance" ){ 
        newArr = [{
            subject_value:"Aaron Huang",
            description:"Aaron Huang",
        },{
            subject_value:"Alan Wang",
            description:"Alan Wang",
        },{
            subject_value:"Benny Wang",
            description:"Benny Wang",
        },{
            subject_value:"Cindy Guo",
            description:"Cindy Guo",
        },{
            subject_value:"Daniel Du",
            description:"Daniel Du",
        },{
            subject_value:"David Chen",
            description:"David Chen",
        },{
            subject_value:"Gustave Yang",
            description:"Gustave Yang",
        },{
            subject_value:"Helen Tian",
            description:"Helen Tian",
        },{
            subject_value:"Liping Mo",
            description:"Liping Mo",
        },{
            subject_value:"Mary Xu",
            description:"Mary Xu",
        },{
            subject_value:"Miao Xiao",
            description:"Miao Xiao",
        },{
            subject_value:"Zhixuan Wu",
            description:"Zhixuan Wu",
        }]
    } else if ( gValue=="Franchise" ){ 
        newArr = [{
            subject_value:"David Yip",
            description:"David Yip",
        },{
            subject_value:"Elva Sun",
            description:"Elva Sun",
        },{
            subject_value:"Hongb Xiao",
            description:"Hongb Xiao",
        },{
            subject_value:"James Qu",
            description:"James Qu",
        },{
            subject_value:"Lily Zhou",
            description:"Lily Zhou",
        },{
            subject_value:"Peter Pan",
            description:"Peter Pan",
        },{
            subject_value:"Raymond Ye",
            description:"Raymond Ye",
        }]
    } else if ( gValue=="HR" ){ 
        newArr = [{
            subject_value:"August Xie",
            description:"August Xie",
        },{
            subject_value:"Blank Wu",
            description:"Blank Wu",
        },{
            subject_value:"Chris Xu",
            description:"Chris Xu",
        },{
            subject_value:"Maggie Jiang",
            description:"Maggie Jiang",
        },{
            subject_value:"Sally Chen",
            description:"Sally Chen",
        },{
            subject_value:"Tammy Lin",
            description:"Tammy Lin",
        },{
            subject_value:"Teresa Wang",
            description:"Teresa Wang",
        },{
            subject_value:"Vincent Wei",
            description:"Vincent Wei",
        },{
            subject_value:"Wendy Wang",
            description:"Wendy Wang",
        }]
    } else if ( gValue=="HU" ){ 
        newArr = [{
            subject_value:"Amy Wang",
            description:"Amy Wang",
        },{
            subject_value:"Byron Mei",
            description:"Byron Mei",
        },{
            subject_value:"Denise Wang",
            description:"Denise Wang",
        },{
            subject_value:"Lily Li",
            description:"Lily Li",
        }]
    } else if ( gValue=="IT" ){ 
        newArr = [{
            subject_value:"Annie Ye",
            description:"Annie Ye",
        },{
            subject_value:"Charles Cai",
            description:"Charles Cai",
        },{
            subject_value:"Julia Ju",
            description:"Julia Ju",
        },{
            subject_value:"Jun Ni",
            description:"Jun Ni",
        },{
            subject_value:"Kevin Guo",
            description:"Kevin Guo",
        },{
            subject_value:"Ning Sun",
            description:"Ning Sun",
        },{
            subject_value:"Quentin Xu",
            description:"Quentin Xu",
        },{
            subject_value:"Ray Zhao",
            description:"Ray Zhao",
        },{
            subject_value:"Saipeng Ye",
            description:"Saipeng Ye",
        },{
            subject_value:"Shihong Chen",
            description:"Shihong Chen",
        },{
            subject_value:"Spark Wang",
            description:"Spark Wang",
        },{
            subject_value:"Taylor Li",
            description:"Taylor Li",
        },{
            subject_value:"Tony Tang",
            description:"Tony Tang",
        },{
            subject_value:"Ying Mei",
            description:"Ying Mei",
        }]
    } else if ( gValue=="Legal" ){ 
        newArr = [{
            subject_value:"Adela Yu",
            description:"Adela Yu",
        },{
            subject_value:"Alex Gao",
            description:"Alex Gao",
        },{
            subject_value:"Ally Peng",
            description:"Ally Peng",
        },{
            subject_value:"Byrd Zou",
            description:"Byrd Zou",
        },{
            subject_value:"Julia Xu",
            description:"Julia Xu",
        },{
            subject_value:"Keju Zheng",
            description:"Keju Zheng",
        },{
            subject_value:"Richard Wang",
            description:"Richard Wang",
        }]
    } else if ( gValue=="Menu" ){ 
        newArr = [{
            subject_value:"Amy Yu",
            description:"Amy Yu",
        },{
            subject_value:"Simon Yue",
            description:"Simon Yue",
        }]
    } else if ( gValue=="MKT&Digital" ){ 
        newArr = [{
            subject_value:"Andy Xue",
            description:"Andy Xue",
        },{
            subject_value:"Angela Ren",
            description:"Angela Ren",
        },{
            subject_value:"Bingo Wang",
            description:"Bingo Wang",
        },{
            subject_value:"Christine Xu",
            description:"Christine Xu",
        },{
            subject_value:"Di Wen",
            description:"Di Wen",
        },{
            subject_value:"Eliza Jiang",
            description:"Eliza Jiang",
        },{
            subject_value:"Ian Li",
            description:"Ian Li",
        },{
            subject_value:"Joanne Xie",
            description:"Joanne Xie",
        },{
            subject_value:"Kaili Ma",
            description:"Kaili Ma",
        },{
            subject_value:"Nile Wang",
            description:"Nile Wang",
        },{
            subject_value:"Ruth Feng",
            description:"Ruth Feng",
        }]
    } else if ( gValue=="Operation" ){ 
        newArr = [{
            subject_value:"Chen Ling",
            description:"Chen Ling",
        },{
            subject_value:"Grace Zhou",
            description:"Grace Zhou",
        },{
            subject_value:"Melody Ma",
            description:"Melody Ma",
        },{
            subject_value:"Taikoong Chang",
            description:"Taikoong Chang",
        },{
            subject_value:"Xun Song",
            description:"Xun Song",
        },{
            subject_value:"Yan Li",
            description:"Yan Li",
        }]
    } else if ( gValue=="PR" ){ 
        newArr = [{
            subject_value:"Ella Yu",
            description:"Ella Yu",
        },{
            subject_value:"Jane Mai",
            description:"Jane Mai",
        },{
            subject_value:"Regina Hui",
            description:"Regina Hui",
        },{
            subject_value:"Ryan Jin",
            description:"Ryan Jin",
        }]
    } else if ( gValue=="SupplyChain" ){ 
        newArr = [{
            subject_value:"Andy Li",
            description:"Andy Li",
        },{
            subject_value:"Audrey Cheung",
            description:"Audrey Cheung",
        },{
            subject_value:"Danny Zhang",
            description:"Danny Zhang",
        },{
            subject_value:"Hua Wang",
            description:"Hua Wang",
        },{
            subject_value:"Isabella Lin",
            description:"Isabella Lin",
        },{
            subject_value:"Lily Quan",
            description:"Lily Quan",
        },{
            subject_value:"Shelly Fu",
            description:"Shelly Fu",
        },{
            subject_value:"Shen David",
            description:"Shen David",
        },{
            subject_value:"William Shi",
            description:"William Shi",
        },{
            subject_value:"Ying Mou",
            description:"Ying Mou",
        }]
    }
    // 设置B列单元格的值
    sheet.getCell(rowNum,2).cellType(new SmartListCellType(newArr));
}