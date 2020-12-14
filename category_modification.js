function e(){
    spread.suspendPaint();
    var sheet =spread.getActiveSheet();
    var rowCount = sheet.getRowCount();
    var colCount = sheet.getColumnCount();
    sheet.setColumnVisible(17,false);  //隐藏Budg Code
    // 隐藏插入行按钮
    $('.breadcrumb-elements-item.dropdown-toggle').eq(0).hide()
    //隐藏上传
    $('a#excel_upload').hide();
    
    //A列列宽
    sheet.setColumnWidth(0, 130);
    
    var rownum = 0;
    function getNonEmptyRowIndex(sheet){
    
    for(var i = rowCount - 1; i >= 0; i--){
      if(sheet.getValue(i, 0) !== null && sheet.getValue(i, 0) !==undefined && sheet.getValue(i, 0) !== ''){
       return i;
      }
     }
     return -1;
    }
    rownum = getNonEmptyRowIndex(sheet);
    
    // 改变Status
    var endLine = rownum
    for (var i = 1; i <= endLine; i++) {
        if (sheet.getValue(i, 0) === "1") {
            sheet.setValue(i, 0,"To be Submitted");
        } else if (sheet.getValue(i, 0) === "2"){
            sheet.setValue(i, 0,"Submitted");
        } else if (sheet.getValue(i, 0) === "3"){
            sheet.setValue(i, 0,"Controller Pass");
        } else if (sheet.getValue(i, 0) === "4"){
            sheet.setValue(i, 0,"Controller Head Pass");
        } else if (sheet.getValue(i, 0) === "5"){
            sheet.setValue(i, 0,"IT Fin BP Pass");
        } else if (sheet.getValue(i, 0) === "6"){
            sheet.setValue(i, 0,"CapEx Fin Pass");
        } 
       
    }
    
    //下拉值列表级联
    const firstSheet = spread.getSheet(0);
    firstSheet.bind(GC.Spread.Sheets.Events.ValueChanged,function(e,info){
            // 如果是E列改变了值
            if( info.col==3  ){
                //则改变O列的对应行的值
                setLValue(firstSheet,info.row)
               // 如果是O列改变了
            }else if( info.col==12 ){
                setMValue(firstSheet,info.row)
            }
		}
	)
    
    // 遍历行数,初始化完sheet即加载规则
    for( var i=0;i<rowCount;i++ ){
        setLValue(sheet,i);
        setMValue( sheet,i )
    }
    
    spread.resumePaint();
}

// O列重置值方法
function setLValue(sheet,rowNum){
    // 获取E列对应行的值
    var gValue =  sheet.getValue(rowNum,3)
    var newArr =[]
    console.log( gValue,'gValue' )
     if( gValue=="OpEx" ){
        newArr = [{
            subject_value:"Office G&A",
            description:"Office G&A",
        },{
            subject_value:"Store M&R",
            description:"Store M&R",
        },{
            subject_value:"Promotion",
            description:"Promotion",
        },{
            subject_value:"AD Fee",
            description:"AD Fee",
        },{
            subject_value:"Utility",
            description:"Utility",
        }]
    }else{ 
        newArr = [{
            subject_value:"Store Deployment",
            description:"Store Deployment",
        },{
            subject_value:"Office CapEx",
            description:"Office CapEx",
        }]
    }
    // 设置O列单元格的值
    sheet.getCell(rowNum,12).cellType(new SmartListCellType(newArr))
    
    // 改变P列的值      
    setMValue( sheet,rowNum )
}

// P列重置值方法
function setMValue( sheet,rowNum ){
    // 获取O列对应行的值
    debugger
    var lValue =  sheet.getValue(rowNum,12)
    // 获取E列对应行的值
    var gValue =  sheet.getValue(rowNum,3)
    var newArr =[]
    if( lValue=="Store Deployment" && gValue=="CapEx"  ){
        // 获取Product Name列的值
        var cValue = sheet.getValue(rowNum,2)
        sheet.setValue(rowNum,15,cValue)
        newArr = [ {
            subject_value:cValue,
            description:cValue,
        }]
        // 设置P列对应单元格下拉值
        sheet.getCell(rowNum,13).cellType(new SmartListCellType(newArr))
    }else if( lValue=="Office CapEx" && gValue=="CapEx" ){
        newArr = [ {
            subject_value:"Office PC & Others",
            description:"Office PC & Others",
        },{
            subject_value:"Hogan Data Center",
            description:"Hogan Data Center",
        },{
            subject_value:"Enterprise Application",
            description:"Enterprise Application",
        },{
            subject_value:"Restaurant related",
            description:"Restaurant related",
        },{
            subject_value:"Data COE",
            description:"Data COE",
        },{
            subject_value:"Digitalization",
            description:"Digitalization",
        },{
            subject_value:"R&D",
            description:"R&D",
        }]
        // 设置P列对应单元格下拉值
        sheet.getCell(rowNum,13).cellType(new SmartListCellType(newArr))
    } else if( lValue=="Office G&A" && gValue=="OpEx" ){
        newArr = [ {
            subject_value:"Misc Professional Service",
            description:"Misc Professional Service",
        },{
            subject_value:"Office M&R",
            description:"Office M&R",
        },{
            subject_value:"Telephone & Telegraf",
            description:"Telephone & Telegraf",
        } ]
        // 设置P列对应单元格下拉值
        sheet.getCell(rowNum,13).cellType(new SmartListCellType(newArr))
    } else if( lValue=="Store M&R" && gValue=="OpEx" ){
        newArr = [ {
            subject_value:"MCCL - MDS",
            description:"MCCL - MDS",
        },{
            subject_value:"MCCL - nonMDS",
            description:"MCCL - nonMDS",
        },{
            subject_value:"nonMCCL-800",
            description:"nonMCCL-800",
        },{
            subject_value:"nonMCCL-TSI",
            description:"nonMCCL-TSI",
        } ]
        // 设置P列对应单元格下拉值
        sheet.getCell(rowNum,13).cellType(new SmartListCellType(newArr))
    } else if( lValue=="Promotion" && gValue=="OpEx" ){
        newArr = [ {
            subject_value:"Promotion Expense",
            description:"Promotion Expense",
        } ]
        // 设置P列对应单元格下拉值
        sheet.getCell(rowNum,13).cellType(new SmartListCellType(newArr))
    } else if( lValue=="AD Fee" && gValue=="OpEx" ){
        newArr = [ {
            subject_value:"Digitalization.",
            description:"Digitalization.",
        } ]
        // 设置P列对应单元格下拉值
        sheet.getCell(rowNum,13).cellType(new SmartListCellType(newArr))
    } else if( lValue=="Utility" && gValue=="OpEx" ){
        newArr = [ {
            subject_value:"Wifi",
            description:"Wifi",
        },{
            subject_value:"Bandwidth",
            description:"Bandwidth",
        } ]
        // 设置P列对应单元格下拉值
        sheet.getCell(rowNum,13).cellType(new SmartListCellType(newArr))
    }
}

function b(){
    var sheet =spread.getActiveSheet();
    // 定义浮动行表endLine
    var endLine = 0;
    function getNonEmptyRowIndex(sheet){
    var rowCount = sheet.getRowCount(), colCount = sheet.getColumnCount();
    for(var i = rowCount - 1; i >= 0; i--){
        if(sheet.getValue(i, 0) !== null && sheet.getValue(i, 0) !==undefined && sheet.getValue(i, 0) !== ''){
                return i;
            }
        }
        return -1;
    }
    endLine = getNonEmptyRowIndex(sheet);
	var arr1 = [], arr2 = [];
    for (var i = 1; i <= endLine; i++){
        var cellValue1 =  sheet.getValue(i, 4);  //Budget Type值
        var cellValue2 = sheet.getValue(i, 14);  //Budget Category值
        var cellValue3 = sheet.getValue(i, 15);  //Minor Budget Category值
        if (cellValue1 === "CapEx") {
            //CapEx校验
            if (cellValue2 && cellValue2 !== "Store Deployment" && cellValue2 !== "Office CapEx"){
				arr1.push(i);
            }
        }
        if (cellValue1 === "OpEx") {
            //OpEx校验
            if (cellValue2 && cellValue2 !== "Office G&A" && cellValue2 !== "Store M&R" && cellValue2 !== "Promotion" && cellValue2 !== "AD Fee" && cellValue2 !== "Utility"){
				arr1.push(i);
            }
        }
        if (cellValue2 === "Store Deployment") {
            
            if (cellValue3 && cellValue3 !== sheet.getValue(i, 3)){
                debugger
                arr2.push(i);
            }
        }
        if (cellValue2 === "Office CapEx") {
            if (cellValue3 && !["Office PC & Others", "Hogan Data Center", "Enterprise Application", "Restaurant related", "Data COE", "Digitalization","R&D"].includes(cellValue3) ){
                arr2.push(i);
            }
        }
        if (cellValue2 === "Office G&A") {
            if (cellValue3 && !["Misc Professional Service", "Office M&R", "Telephone & Telegraf"].includes(cellValue3) ){
                arr2.push(i);
            }
        }
        if (cellValue2 === "Store M&R") {
            if (cellValue3 && !["MCCL - MDS", "MCCL - nonMDS", "nonMCCL-800", "nonMCCL-TSI"].includes(cellValue3) ){
                arr2.push(i);
            }
        }
        if (cellValue2 === "Promotion") {
            if (cellValue3 && cellValue3 !== "Promotion Expense"){
                arr2.push(i);
            }
        }
        if (cellValue2 === "AD Fee") {
            if (cellValue3 && cellValue3 !== "Digitalization."){
                arr2.push(i);
            }
        }
        if (cellValue2 === "Utility") {
            if (cellValue3 && !["Wifi", "Bandwidth"].includes(cellValue3) ){
                arr2.push(i);
            }
        }
    }
    var lineBorder1 = new GC.Spread.Sheets.LineBorder('red', GC.Spread.Sheets.LineStyle.thin);
    arr1.forEach(i =>{
        sheet.getRange(i, 14, 1, 1).setBorder(lineBorder1, { all: true });
        sheet.getRange(i, 13, 1, 1).borderRight(lineBorder1);
        sheet.getRange(i-1, 14, 1, 1).borderBottom(lineBorder1);
    })
    arr2.forEach(i =>{
        sheet.getRange(i, 15, 1, 1).setBorder(lineBorder1, { all: true });
        sheet.getRange(i, 14, 1, 1).borderRight(lineBorder1);
        sheet.getRange(i-1, 15, 1, 1).borderBottom(lineBorder1);
    })
	if (arr1.length!=0 && arr2.length!=0){
		ForSwal("Budget Category及Minor Budget Category类型不符，请检查", false);
		return false;
	}else if(arr1.length!=0){
		ForSwal("Budget Category类型不符，请检查", false);
		return false;
    }else if(arr2.length!=0){
		ForSwal("Minor Budget Category类型不符，请检查", false);
		return false;
    }
}