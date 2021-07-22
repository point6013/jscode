function init() {
    Beforeload();
    lock_table();
}

var l_keys = [];

function Beforeload() {
  spread.suspendPaint();
  var sheet = spread.getSheet(1);

  var rowCount = sheet.getRowCount();
  var arr_category = sheet.getArray(3, 0, rowCount, 1);
  // 二维数组变成一维数组
  let newArr = arr_category.reduce((pre, cur) => {
    return pre.concat(cur);
  }, []);

  // 一维数组去重====> 获取category的个数
  let newArr_len = newArr.reduce((pre, cur) => {
    if (!pre.includes(cur)) {
      return pre.concat(cur);
    } else {
      return pre;
    }
  }, []);

  //获取年
  var var_sql = `SELECT VALUE FROM app1_variable_info WHERE NAME ='ProjYear'`;
  var proj_year = cfs.request.foundation.runComm(var_sql).res[0].VALUE;
  // 从二维表中取出汇总的数据
  var sqlstr =
    `SELECT min_bud_category, ifnull(sum(pd_total),0)+ sum(purchase_total) total FROM app1_apply_info_to_be WHERE bud_category = "Store Deployment" AND min_bud_category != "Pooling-Store CapEx" and  year='` +
    proj_year +
    `' GROUP BY min_bud_category`;

  var res = cfs.request.foundation.runComm(sqlstr).res;
  // var l_keys = []
  if (res != undefined) {
    for (var i = 0, length = res.length; i < length; i++) {
      l_keys.push(Object.values(res[i]));
    }
  }

  // 生成循环公式，最后一列的公式生成
  var startRow = 4;
  endrow = 16;

  for (i = 0; i < newArr_len.length - 1; i++) {
    strFormula = "";
    strFormula +=
      "L" +
      startRow +
      ":" +
      "L" +
      endrow +
      "*" +
      "M" +
      startRow +
      ":" +
      "M" +
      endrow;
    sheet.setArrayFormula(
      startRow - 1,
      13,
      13,
      1,
      "IFERROR(IF(" + strFormula + '=0,"",' + strFormula + '),"")'
    );
    // 第4行，13列开始，取13行，1列数据
    startRow += 14;
    endrow += 14;
  }

  // 数字转字母
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
  };

  //将26进制转10进制
  var ConvertNum = function (str) {
    var n = 0;
    var s = str.match(/./g); //求出字符数组
    var j = 0;
    for (var i = str.length - 1, j = 1; i >= 0; i--, j *= 26) {
      var c = s[i].toUpperCase();
      if (c < "A" || c > "Z") {
        return 0;
      }
      n += (c.charCodeAt(0) - 64) * j;
    }
    return n;
  };

  var startRow1 = 4;
  endrow1 = 16;
  var colI2 = "B";
  emplty_col = ["D", "G", "J", "M"];
  // 每个totalChina的一行添加Total
  for (i = 0; i < newArr_len.length; i++) {
    // for (var j = 1; j <= 11; j++) {
    for (var j = 7; j <= 11; j++) {
      var strFormula = "";
      var strFormula = "";
      var col = Convert26(ConvertNum(colI2) + j);
      if (!emplty_col.includes(col)) {
        strFormula += "SUM(" + col + startRow1 + ":" + col + endrow1 + ")";
        sheet.setFormula(
          startRow1 + 12,
          ConvertNum(colI2) + j - 1,
          "IFERROR(IF(" + strFormula + '=0,"",' + strFormula + '),"")'
        );
      }
    }
    startRow1 += 14;
    endrow1 += 14;
  }

  // var l1 = ['IoT', 'NP#', 'RAM'];
  var cm = spread.commandManager();
  // var l2 = ['IoT', 'NP#', 'RAM', 'Office PC & Others']
  var arr = sheet.getArray(1, 0, rowCount - 1, 2);
  var arr1 = sheet.getArray(1, 4, rowCount - 1, 2);
  arr.forEach((e, i) => {
    if (e[0]) {
      {
        if (e[1] == "TotalChina") {
          sheet.getCell(i + 1, 11).backColor("White"); //  区域底色变白
          sheet.getCell(i + 1, 12).backColor("White"); //  区域底色变白
          sheet.getCell(i + 1, 13).backColor("White"); //  区域底色变白
          sheet.getCell(i + 1, 11).locked(true); //区域锁定
          sheet.getCell(i + 1, 12).locked(true); //区域锁定
          sheet.getCell(i + 1, 13).locked(true); //区域锁定}
          for (var j = 0, length = l_keys.length; j < length; j++) {
            if (e[0] == l_keys[j][1]) {
              sheet.setValue(i + 1, 13, l_keys[j][0]);
              // if (local_sum > l_keys[j][0]) { flag = false }
              // sheet.getCell(i+1, 13).backColor("White"); //  区域底色变白
            }
          }
        }
        // if (l2.includes(e[0])&&e[1]!='TotalChina'){
        if (e[1] != "TotalChina") {
          if (e[0] == "Office PC & Others") {
            console.log(e);
            // cm.execute({cmd: "editCell", row:e.row, col:e.col+7, newValue: e[0], sheetName: sheet.name()});

            cm.execute({
              cmd: "editCell",
              row: i + 1,
              col: 13,
              newValue: arr1[i][0],
              sheetName: sheet.name(),
            });
            sheet.getCell(i + 1, 11).backColor("White"); //  区域底色变白
            sheet.getCell(i + 1, 12).backColor("White"); //  区域底色变白
            sheet.getCell(i + 1, 13).backColor("White"); //  区域底色变白
            sheet.getCell(i + 1, 11).locked(true); //区域锁定
            sheet.getCell(i + 1, 12).locked(true); //区域锁定
            sheet.getCell(i + 1, 13).locked(true); //区域锁定}
          } else {
            // if(e[0]== 'Office PC & Others')
            // {
            // // var strFormula1=''
            // // strFormula1 +='=E'+i-10
            // // sheet.setFormula(i-1, 13, 'IFERROR(IF(' + strFormula1 + '=0,"",' + strFormula1 + '),"")');
            // sheet.setValue(i + 1, 13, 10000)

            // }

            // else{
            sheet.getCell(i + 1, 13).backColor("White"); //  区域底色变白
            // sheet.getCell(i+1, 11).locked(true);  //区域锁定
            // sheet.getCell(i+1, 12).locked(true);  //区域锁定
            sheet.getCell(i + 1, 13).locked(true); //区域锁定}
          }
          // sheet.setFormula(i-1,13,'IFERROR(IF('+strFormula2+'=0,"",'+strFormula2+'),"")')
        } else {
          if (e[0] == "Office PC & Others") {
            var strFormula1 = "";
            strFormula1 += "E" + (i + 2);
            sheet.setFormula(
              i + 1,
              13,
              "IFERROR(IF(" + strFormula1 + '=0,"",' + strFormula1 + '),"")'
            );
          }
        }

        // if (!l1.includes(e[0])&&e[1]!='TotalChina'){
        //     // strFormula2=''
        //     // strFormula2 += 'L' + i  +'*'+'M'+i;
        //     sheet.getCell(i+1, 11).backColor("White"); //  区域底色变白
        //     sheet.getCell(i+1, 12).backColor("White"); //  区域底色变白
        //     // sheet.getCell(i, 13).backColor("White"); //  区域底色变白
        //     sheet.getCell(i+1, 11).locked(true);  //区域锁定
        //     sheet.getCell(i+1, 12).locked(true);  //区域锁定
        //     // sheet.getCell(i, 13).locked(true);  //区域锁定}
        //     // sheet.setFormula(i,13,'IFERROR(IF('+strFormula2+'=0,"",'+strFormula2+'),"")')

        //     }
      }
    }
  });

  spread.resumePaint();
}

//锁表
function lock_table() {
  $("#header-elements").find('[name="save_all"]').show();
  $("#header-elements").find('[name="save"]').show();
  //   const year = $("[dc='Year']").eq(0).val();
  //   const year = $("[dc='Year']").find('.multiselect-selected-text').text();

  const year = $(".dataSheetCon>div:eq(1)").find("[dc='Year']").next().find('.multiselect-selected-text').text()
  console.log(year);
  debugger;
  var lockkey = `SELECT is_locked from mcdcapex.app1_process_lock_config WHERE scenario = 'Projection' and year = '${year}'`;
  console.log(lockkey);
  // JS执行查询SQL
  var res = cfs.request.foundation.runComm(lockkey);
  //   var res = cfs.request.foundation.runComm(lockkey)
  //   var res = cfs.request.foundation.runComm(lockkey).res;
  console.log(res);
  if (res.err) {
    ForSwal("读取数据失败:" + res.err.Message); //通过右上角的红色卡片报错
  } else {
    data = res.res;

    if (data[0].is_locked == 1) {
      var sheet = spread.getSheet(1);
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
  }
}

function BeforeSave() {
  spread.suspendPaint();
  console.time("自定义js运行时间：");
  var sheet = spread.getSheet(1);

  var rowCount = sheet.getRowCount();
  // var sqlstr = 'select min_bud_category,sum(proj_cur_ver) total  from app1_apply_info_to_be  where bud_category="Store Deployment"  and min_bud_category !="Pooling-Store CapEx" group by min_bud_category';
  // var res = cfs.request.foundation.runComm(sqlstr).res
  // var l_keys = []
  // for (var i = 0, length = res.length; i < length; i++) {
  //     l_keys.push(Object.values(res[i]))
  // }
  var arr = sheet.getArray(1, 0, rowCount - 1, 2);
  var flag = true;
  arr.forEach((e, i) => {
    if (e[0]) {
      {
        if (e[1] == "TotalChina") {
          var arr_l = sheet.getArray(i - 12, 13, 13, 1);
          local_sum = 0;
          for (var j = 0, length = arr_l.length; j < length; j++) {
            if (arr_l[j][0] == "") {
              local_sum += 0;
            } else {
              local_sum += arr_l[j][0];
            }
          }
          if (local_sum == 0) {
            local_sum = null;
          }
          for (var j = 0, length = l_keys.length; j < length; j++) {
            if (e[0] == l_keys[j][1]) {
              if (Math.round(local_sum) != l_keys[j][0]) {
                flag = false;
              }

              // sheet.getCell(i+1, 13).backColor("White"); //  区域底色变白
            }
          }
        }
      }
    }
  });
  console.timeEnd("自定义js运行时间：");
  if (!flag) {
    ForSwal("请重新核对各市场金额");
    spread.resumePaint();
    return false;
  }

  spread.resumePaint();
}

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
