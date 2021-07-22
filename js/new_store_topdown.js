/**spread2 = spread对象
*/

function init(){
    NS_project();
    lock_table();
    
    
}

function NS_project(){
        spread.suspendPaint();
    var sheet =spread.getSheet(0);
    var endLine = sheet.getRowCount();  // 结束行号
    var endCol = sheet.getColumnCount();  // 结束列号
    setVarFormula() //i列=E列-H列，K列=j列-h列 //Author:copy刘俊
    setVarFormula1() //i列=E列-H列，K列=j列-h列 //Author:copy刘俊
    sheet.setValue(3, 0, "New Stores"); //将I1文本替换为TA Type
    sheet.getRange(3,0,1,8,GC.Spread.Sheets.SheetArea.viewport).font('bold normal 13px normal')
    spread.resumePaint();
    sheet.addSpan(0, 5, 1, 3)
    sheet.addSpan(1, 5, 1, 3)
}



const setVarFormula = () => {
  sheet = spread.getSheet(0);
  var endLine = sheet.getRowCount()
  var arr_data = sheet.getArray(3, 1, endLine - 3, 1);
  mkt_number = get_mkt_number(arr_data)
  debugger;
  spread.suspendPaint();
  sheet.suspendCalcService(true);
  row = sheet.getRowCount();
  for( let r = 3; r < row;  r++){
      
    sheet.setFormula( r, 6, `IFERROR(H${r+1}/F${r+1},"")` ) //G列=H列/F列
    sheet.setFormula( r, 3, `IFERROR(E${r+1}/C${r+1},"")` ) //G列=H列/F列
    if(arr_data[r-3][0]== 'TotalChina'){
        // debugger;
    // sheet.setFormula( r, 10, `IFERROR(J${r+1}-H${r+1},0)` ) //K列=J列-H列
    sheet.getCell(r , 5).backColor("White"); //  区域底色变白
    sheet.getCell(r , 6).backColor("White"); //  区域底色变白
    sheet.getCell(r , 7).backColor("White"); //  区域底色变白
    sheet.getCell(r , 5).locked(true);  //区域锁定
    sheet.getCell(r, 6).locked(true);  //区域锁定
    sheet.getCell(r , 7).locked(true);  //区域锁定}
    }
    
  sheet.resumeCalcService(false);
  spread.resumePaint();
}

}


function setVarFormula1(){
    sheet = spread.getSheet(0);
    var endLine = sheet.getRowCount()
    var arr_data = sheet.getArray(3, 1, endLine - 3, 1);
    var arr_data1 = sheet.getArray(3, 0, endLine - 3, 1);    
    mkt_number = get_mkt_number(arr_data)
    debugger;
    spread.suspendPaint();
    sheet.suspendCalcService(true);
    row = sheet.getRowCount();
  for( let r = 3; r < row;  r++){

    if(arr_data[r-3][0]=='TotalChina'){
        if (arr_data1[r-3][0]!=='NoCategory'){
            let strFormula1=''
            let strFormula2=''
            let strFormula3=''
            let strFormula4=''
            debugger;
            startRow1 = r-mkt_number+1;
            endRow1= r;
            strFormula1 += 'SUM(' + 'F' + startRow1 + ":" + 'F' + endRow1 + ")"
            sheet.setFormula(r,5, 'IFERROR(IF(' + strFormula1 + '=0,"",' + strFormula1 + '),"")');
            strFormula2 += 'SUM(' + 'H' + startRow1 + ":" + 'H' + endRow1 + ")"
            sheet.setFormula(r,7, 'IFERROR(IF(' + strFormula2 + '=0,"",' + strFormula2 + '),"")');
            strFormula3 += 'SUM(' + 'C' + startRow1 + ":" + 'C' + endRow1 + ")"
            sheet.setFormula(r,2, 'IFERROR(IF(' + strFormula3 + '=0,"",' + strFormula3 + '),"")');
            strFormula4 += 'SUM(' + 'E' + startRow1 + ":" + 'E' + endRow1 + ")"
            sheet.setFormula(r,4, 'IFERROR(IF(' + strFormula4 + '=0,"",' + strFormula4 + '),"")');
            // var cell = sheet.getRange(, 0, endLine-1, endCol, GC.Spread.Sheets.SheetArea.viewport);
            sheet.getRange(r,2,1,6,GC.Spread.Sheets.SheetArea.viewport).font('bold normal 13px normal')
  }
  else{
          let strFormula1=''
            let strFormula2=''
            let strFormula3=''
            let strFormula4=''
            startRow1= r+2;
            endRow1 =startRow1+ 2*mkt_number+1;

            
            
            
            
            strFormula1 += 'SUM(' + 'F' + startRow1 + ":" + 'F' + endRow1 + ")/2"
            sheet.setFormula(r,5, 'IFERROR(IF(' + strFormula1 + '=0,"",' + strFormula1 + '),"")');
            strFormula2 += 'SUM(' + 'H' + startRow1 + ":" + 'H' + endRow1 + ")/2"
            sheet.setFormula(r,7, 'IFERROR(IF(' + strFormula2 + '=0,"",' + strFormula2 + '),"")');
            strFormula3 += 'SUM(' + 'C' + startRow1 + ":" + 'C' + endRow1 + ")/2"
            sheet.setFormula(r,2, 'IFERROR(IF(' + strFormula3 + '=0,"",' + strFormula3 + '),"")');
            strFormula4 += 'SUM(' + 'E' + startRow1 + ":" + 'E' + endRow1 + ")/2"
            sheet.setFormula(r,4, 'IFERROR(IF(' + strFormula4 + '=0,"",' + strFormula4 + '),"")');
    //   pass;
      
  }
  
  
  
  sheet.resumeCalcService(false);
  spread.resumePaint();
}
}
}









function get_mkt_number(arr2){
  
    let newArr = arr2.reduce((pre, cur) => {
        return pre.concat(cur)
    }, [])

    let newArr1 = newArr.reduce((pre,cur)=>{
    if(!pre.includes(cur)){
      return pre.concat(cur)
    }else{
      return pre
    }
},[])

    return newArr1.length-1
}

function lock_table() {
$("#header-elements").find('[name="save_all"]').show();
$("#header-elements").find('[name="save"]').show();
// debugger
var year = $("[dc='Year']").val();
var lockkey = `SELECT is_locked from mcdcapex.app1_process_lock_config WHERE scenario = 'Projection' and year = '${year}'`;
console.log(lockkey);
// JS执行查询SQL
var res = cfs.request.foundation.runComm(lockkey);

if (res.err) {
  ForSwal("读取数据失败:" + res.err.Message); //通过右上角的红色卡片报错
} else {
  data = res.res;

  if (data[0].is_locked == 1) {
    // debugger;
    var sheet = spread.getSheet(0);
    spread.suspendPaint();
    sheet.suspendCalcService(true);
    var Range = sheet.getRange(
      3,
      2,
      sheet.getRowCount(),
      sheet.getColumnCount(),
      GC.Spread.Sheets.SheetArea.viewport
    );
    Range.backColor("White"); //区域填充色为白色
    Range.locked(true); //区域锁定
    $("#header-elements").find('[name="save_all"]').hide();
    $("#header-elements").find('[name="save"]').hide();
    sheet.resumeCalcService(false);
    spread.resumePaint();
  }
  
  var activeSheetChanged = GC.Spread.Sheets.Events.ActiveSheetChanged;
  spread.bind(activeSheetChanged, function(e,args) { // spread event
  setTimeout(() =>{
      if (data[0].is_locked == 1) {
      $("#header-elements").find('[name="save"]').hide();
      }
  },100)
  //do some thing...
  });
}
}




//全局方法
var cfs = {
//dashboard全局方法
request: {
  //请求后端数据
  common: {
    //通用请求
    sendRequest: function (
      url,
      type,
      paramObj,
      json = false,
      returnAll = false
    ) {
      let data = json ? JSON.stringify(paramObj) : paramObj;
      let contentType =
        "application/" + (json ? "json" : "x-www-form-urlencoded");
      var resObj = {};
      var err = "";
      $.ajax({
        url: url,
        type: type,
        contentType: contentType,
        async: false,
        data: data,
        success: function (res) {
          if (returnAll) {
            resObj.res = res;
          } else {
            if (res.resultCode === 0) {
              resObj.res = res.resultObj;
            }
          }
        },
        error: function (XMLHttpRequest) {
          resObj.err = {};
          resObj.err.Message =
            XMLHttpRequest.responseJSON.Message.substr(0, 200) ||
            XMLHttpRequest.statusText.substr(0, 200);
        },
      });
      return resObj;
    },
  },
  foundation: {
    runComm: function (comm) {
      let url = Api.seepln + "sqlparser/run/post";
      paramObj = $.extend(
        {
          sql: comm,
        },
        cfs.common.userParams
      );
      return cfs.request.common.sendRequest(
        url,
        "POST",
        paramObj,
        false,
        true
      );
    },
    selectDimensionMemberByNameFunction: function (exp, cols) {
      let url = Api.seepln + "dimension/selectDimensionMemberByNameFunction";
      paramObj = $.extend(
        {
          dimensionMemberNames: exp,
          duplicate: "1",
          resultString: cols,
        },
        cfs.common.userParams
      );
      return cfs.request.common.sendRequest(
        url,
        "POST",
        paramObj,
        false,
        true
      );
    },
    saveDimensionMember: function (dim, dim_list) {
      let url = Api.seepln + "dimensionSave/saveDimensionMember";
      paramObj = $.extend(
        {
          name: dim,
          increment: 1,
          dimension_member_list: dim_list,
        },
        cfs.common.userParams
      );
      return cfs.request.common.sendRequest(
        url,
        "POST",
        paramObj,
        false,
        true
      );
    },
    queryCubeInfoAndDetail: function (cube_name) {
      var url = Api.seepln + "cube/queryCubeInfoAndDetail";
      paramObj = $.extend(
        {
          cube_name: cube_name,
        },
        cfs.common.userParams
      );
      return cfs.request.common.sendRequest(
        url,
        "POST",
        paramObj,
        false,
        true
      );
    },
    updateDimensionMemberAttribute: function (dimension, update_dimension) {
      var url = Api.seepln + "dimensionImport/updateDimensionMemberAttribute";
      paramObj = $.extend(
        {
          dimension: dimension,
          "update_dimension[]": update_dimension,
        },
        cfs.common.userParams
      );
      return cfs.request.common.sendRequest(
        url,
        "POST",
        paramObj,
        false,
        true
      );
    },
  },
  cube: {
    queryCubeData: function (cubeName, script) {
      let url = Api.SeeplnCube + "cube/queryCubeData";
      paramObj = $.extend(
        {
          cube_name: cubeName,
          script: script,
        },
        cfs.common.userParams
      );
      return cfs.request.common.sendRequest(url, "POST", paramObj, true);
    },
    save: function (sheetDatas) {
      var url = Api.SeeplnCube + "spreadsheet/save";
      paramObj = $.extend(
        {
          sheetDatas: sheetDatas,
          entryObject: "SE7Q8GPLEG33",
        },
        cfs.common.userParams
      );
      return cfs.request.common.sendRequest(
        url,
        "POST",
        paramObj,
        true,
        true
      );
    },
  },
  python: {
    //同步调用python
    web: function (pyName, params) {
      var url = Api.python + "start/web";
      paramObj = $.extend(
        {
          pyName: pyName,
          params: params,
        },
        cfs.common.userParams
      );
      return cfs.request.common.sendRequest(
        url,
        "POST",
        paramObj,
        true,
        true
      );
    },
    //异步调用python
    job: function (pyName, params) {
      var url = Api.python + "start/web/job";
      paramObj = $.extend(
        {
          pyName: pyName,
          params: params,
        },
        cfs.common.userParams
      );
      return cfs.request.common.sendRequest(
        url,
        "POST",
        paramObj,
        true,
        true
      );
    },
    //同步调用python
    pythonWeb: function (pythonName, parameter, runType = 1) {
      var url = Api.pythonWeb + "doPythonWeb";
      paramObj = $.extend(
        {
          pythonName: pythonName,
          parameter: JSON.stringify(parameter),
          runType: runType, //1-同步，2-异步
        },
        cfs.common.userParams
      );
      return cfs.request.common.sendRequest(
        url,
        "POST",
        paramObj,
        true,
        true
      );
    },
  },
},
common: {
  //通用方法
  userParams: {
    app: Userinfo.app,
    app_id: Userinfo.app,
    token: Userinfo.token,
    user_id: Userinfo.user_id,
    userId: Userinfo.user_id,
    creater: Userinfo.user_id,
    tenant_code: Userinfo.tenant_code,
    tenantCode: Userinfo.tenant_code,
    language: Userinfo.language,
    description: Userinfo.language,
  },
  dialogBox: function (text, thenEvent) {
    swal({
      title: text,
      text: "",
      type: "info",
      showCancelButton: true,
      confirmButtonText: getLanguage("sure"),
      cancelButtonText: getLanguage("cancel"),
    }).then(function (result) {
      if (result.value) {
        thenEvent();
      }
    });
  },
  valueToDate: function (value) {
    let n = Number(value.split(".")[0]);
    var date = new Date("1900-1-1");
    date.setDate(date.getDate() + n - 2);
    return date.format();
  },
},
export: {
  /* 导出文件到指定格式 数据大用csv
            fileName：文件名不带格式
            dataJson：原始数据 eg. [{Entity: "E001", Year:"2020", Period:"9"},{Entity: "E001", Year:"2020", Period:"10"}]
            titleArr：导出的列名: eg. [Entity, Year]
        */
  toCsv: function (fileName, dataJson, titleArr = null) {
    if (!dataJson) return;
    if (dataJson.length == 0 && titleArr == null) return;
    //组标题
    var titleObj = dataJson[0];
    titleArr = titleArr || Object.keys(titleObj);
    var titleStr = titleArr.join(",");
    var dataArr = [];
    for (var i = 0; i < dataJson.length; i++) {
      var rowArr = [];
      for (var j = 0; j < titleArr.length; j++) {
        var cell = dataJson[i][titleArr[j]] || "";
        cell = cell.toString();
        cell = cell.replace('"', '""');
        if (cell.indexOf(",") > -1) {
          cell = '"' + cell + '"';
        }
        rowArr.push(cell);
      }
      dataArr.push(rowArr.join(","));
    }
    var dataStr = titleStr + "\n" + dataArr.join("\n");
    var blob = new Blob([dataStr], { type: "text/plain;charset=utf-8" });
    //解决中文乱码问题
    blob = new Blob([String.fromCharCode(0xfeff), blob], { type: blob.type });
    this.download(blob, fileName + ".csv");
  },
  toXls: function (fileName, dataJson, titleArr = null) {
    if (!dataJson) return;
    if (dataJson.length == 0 && titleArr == null) return;
    //组标题
    var titleObj = dataJson[0];
    titleArr = titleArr || Object.keys(titleObj);
    var titleStr = "<tr><td>" + titleArr.join("</td><td>") + "</td></tr>";
    var dataArr = [];
    for (var i = 0; i < dataJson.length; i++) {
      var rowArr = [];
      for (var j = 0; j < titleArr.length; j++) {
        rowArr.push("<td>" + (dataJson[i][titleArr[j]] || "") + "</td>");
      }
      dataArr.push("<tr>" + rowArr.join("") + "</tr>");
    }
    var dataStr = "<table>" + titleStr + dataArr.join("") + "</table>";
    var uri = "data:application/vnd.ms-excel;base64,";
    var excelHtml = `<html xmlns:o="urn:schemas-microsoft-com:office:office" 
            xmlns:x="urn:schemas-microsoft-com:office:excel" 
            xmlns="http://www.w3.org/TR/REC-html40">
            <head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet>
            <x:Name>${fileName}</x:Name>
            <x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet>
            </x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]-->
            </head><body>${dataStr}</body></html>`;
    //下载模板
    function base64(s) {
      return window.btoa(unescape(encodeURIComponent(s)));
    }
    var blob = new Blob([excelHtml], {
      type: "application/vnd.ms-excel",
    });
    this.download(blob, fileName + ".xls");
  },
  toXlsx: function (
    fileName,
    dataJson = null,
    titleArr = null,
    spreadOperate = null,
    contentDomStr = ".dashBoardContent"
  ) {
    if (dataJson) {
      if (dataJson.length == 0 && titleArr == null) return;
      //组标题
      var titleObj = dataJson[0];
      titleArr = titleArr || Object.keys(titleObj);
      var dataArr = [];
      for (var i = 0; i < dataJson.length; i++) {
        var rowArr = [];
        for (var j = 0; j < titleArr.length; j++) {
          var cell = dataJson[i][titleArr[j]];
          rowArr.push(cell);
        }
        dataArr.push(rowArr);
      }
    }
    console.log(dataArr);
    var divName = `exportXlsxTmp`;
    var div = $(`<div id="${divName}" style='display:none;'></div>`);
    $(contentDomStr).append(div);
    var spread = new GC.Spread.Sheets.Workbook(
      document.getElementById("ss"),
      { sheetCount: 1 }
    );
    var sheet = spread.getSheet(0);
    sheet.suspendPaint();
    sheet.setRowCount(10000);
    if (dataJson) {
      sheet.setArray(0, 0, [titleArr]);
      sheet.setArray(1, 0, dataArr);
    }
    // 设置百分比
    $.each(dataArr, function (k, v) {
      spread
        .getActiveSheet()
        .setFormatter(k + 1, dataArr[0].length - 1, "0%");
    });
    if (spreadOperate && spreadOperate instanceof Function) {
      spreadOperate(spread);
    }
    sheet.resumePaint();
    var excelIo = new GC.Spread.Excel.IO();
    var json = spread.toJSON();
    excelIo.save(
      json,
      function (blob) {
        saveAs(blob, fileName + ".xlsx");
      },
      function (e) {
        // process error
        console.log(e);
      }
    );
    div.remove();
  },
  sheet2blob: function (sheet, sheetName) {
    sheetName = sheetName || "sheet1";
    var workbook = {
      SheetNames: [sheetName],
      Sheets: {},
    };
    workbook.Sheets[sheetName] = sheet;
    // 生成excel的配置项
    var wopts = {
      bookType: "xlsx", // 要生成的文件类型
      bookSST: false, // 是否生成Shared String Table，官方解释是，如果开启生成速度会下降，但在低版本IOS设备上有更好的兼容性
      type: "binary",
    };
    var wbout = XLSX.write(workbook, wopts);
    var blob = new Blob([s2ab(wbout)], { type: "application/octet-stream" });
    // 字符串转ArrayBuffer
    function s2ab(s) {
      var buf = new ArrayBuffer(s.length);
      var view = new Uint8Array(buf);
      for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xff;
      return buf;
    }
    return blob;
  },
  download: function (blob, fileFullName) {
    var btn = document.createElement("a");
    btn.href = URL.createObjectURL(blob);
    btn.download = fileFullName;
    btn.style = "display: none;";
    document.body.appendChild(btn);
    btn.click();
    document.body.removeChild(btn);
  },
},
};

//Author: 刘俊_liujun
const setCapExFormula = () => {
  sheet = spread.getSheet(0);
  spread.suspendPaint();
  sheet.suspendCalcService(true);
  row = sheet.getRowCount();
  for( let r = 3; r < row;  r++){
    sheet.setFormula( r, 7, `IF(F${r+1}*G${r+1}=0,"",F${r+1}*G${r+1})` )
  }
  sheet.resumeCalcService(false);
  spread.resumePaint();
}
// const setVarFormula = () => {
//   sheet = spread.getSheet(0);
//   var endLine = sheet.getRowCount()
//   var arr_data = sheet.getArray(3, 9, endLine - 3, 1);
//   debugger;
//   spread.suspendPaint();
//   sheet.suspendCalcService(true);
//   row = sheet.getRowCount();
//   for( let r = 3; r < row;  r++){
      
//     sheet.setFormula( r, 8, `IFERROR(E${r+1}-H${r+1},0)` ) //I列=E列-H列
//     if(arr_data[r-3][0]!== null&&arr_data[r-3][0]!== undefined&&arr_data[r-3][0]!== ''){
//     sheet.setFormula( r, 10, `IFERROR(J${r+1}-H${r+1},0)` ) //K列=J列-H列
//     }
//   }
//   sheet.resumeCalcService(false);
//   spread.resumePaint();



