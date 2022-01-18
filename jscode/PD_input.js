/**spread2 = spread对象
*/
function init() {
    before_load();
    lock_table();
  }
  
  function before_load() {
      spread.suspendPaint();
      $('div.sheetInsertRow').hide();//隐藏插入行
      // var sheet = spread.getActiveSheet();
      var sheet1 = spread.getSheet(0);//获取sheet页
      var endRow = sheet1.getRowCount();//获取sheet页总行数
      var startRow = 1;
      var ColQ1 = 'F';
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
      sheet1.setColumnVisible(35,false);
      // 隐藏line no列
  
      // // 隐藏 ABCD
      // sheet.setRowVisible(0, false, GC.Spread.Sheets.SheetArea.colHeader);
      // // 隐藏 1234
      // sheet.setColumnVisible(0, false, GC.Spread.Sheets.SheetArea.rowHeader);
  
      // 隐藏上传按钮
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
      rownum = getNonEmptyRowIndex(sheet1);
  
      var rno = rownum + 1
  
  
  
      // 拼接构造公式
      // for (var i = 0; i < 13; i++){
      //     var col = Convert26(ConvertNum(ColQ1) + i);
      //     strFormula += col + (startRow+1) + ':' + col + endRow + '+';
      // }
      // debugger;
      // // 去掉最后的+号
      // strFormula = strFormula.substring(0,strFormula.length - 1);
      // // // 设置区域公式
      // sheet1.setArrayFormula(1, 4, endRow-1, 1, 'IFERROR(IF('+strFormula+'=0,"",'+strFormula+'),"")');  
  
      // debugger;
      
  
      // for (var i=2;i<=endRow;i++){
      // strFormula ='SUM(F'+i+':R'+i+')'
      // sheet1.setFormula(i-1,4,'IFERROR(IF('+strFormula+'=0,"",'+strFormula+'),"")')
  
      // }
      
      
      for (var i=2;i<=endRow;i++){
      strFormula ='SUM(F'+i+':R'+i+')'
      sheet1.setFormula(i-1,4,'IFERROR(IF('+strFormula+'=0,"",'+strFormula+'),"")')
      }
      var end_col_num = ConvertNum('AK');
      var arr1 = sheet1.getArray(1, end_col_num-1, endRow-1, 1);
          debugger;
      arr1.forEach((e, i) => {
      if (e[0] ==='esourcing') {
  
          // debugger;
      var cell = sheet1.getRange(i+1, 0, 1, end_col_num, GC.Spread.Sheets.SheetArea.viewport);
      cell.backColor("White");  //区域填充色为白色
      cell.locked(true);  //区域锁定
      }
    });
  
    
      debugger;
   spread.resumePaint();
  
  
  }
  
  function before_save() {
      debugger
      spread.suspendPaint();
      var sheet = spread.getSheet(0);
      // 非空行
      var rownum = getNonEmptyRowIndex(sheet);
      var arr = sheet.getArray(1, 1, rownum, 1);
      // var arr1 = sheet.getArray(4, 6, 1, 12);
      var arr1 = sheet.getArray(1, 4, rownum, 1);
      var arr2 = sheet.getArray(1, 5, rownum, 1);
  
      flag=true
      arr.forEach((row, i) => {
          if ((!row[0]) && (arr1[i][0] != arr2[i][0]) && (arr1[i][0] !== null && arr1[i][0]  !== undefined && arr1[i][0] !== '')) 
              // $.jGrowl('', {
              //     header: "请填写完整PD Code",
              //     theme: 'alert-styled-left bg-danger',
              {console.log(i);
              debugger;
              flag = false}
          }
          // return false
      )
  
      function getNonEmptyRowIndex(sheet) {
          let rowCount = sheet.getRowCount();
          let colCount = sheet.getColumnCount();
  
          for (var i = 1; i <= rowCount; i++) {
              let arr = sheet.getArray(i, 0, 1, colCount);
              let flag = false;
              for (var j = 0; j < arr.length; j++) {
                  if (arr[j][0]) {
                      flag = true;
                      break
                  }
              }
              if (!flag) {
                  return i - 1
              }
          }
          return -1;
      }
      if (!flag) {
          ForSwal("请重新确认PD code 是否缺失");
          spread.resumePaint();
          return false
      }
  
      var sqlstr_mk = 'select DISTINCT sap_budg_code from app1_apply_info_to_be where sap_budg_code is not null '
      var res_mkc = cfs.request.foundation.runComm(sqlstr_mk).res
      debugger;
      var endRow = sheet.getRowCount();//获取sheet页总行数
      var res_array=[]
      for( i in res_mkc){
          res_array.push(res_mkc[i].sap_budg_code)
  
      }
      var flag1=true;
      var lineBorder1 = new GC.Spread.Sheets.LineBorder('red', GC.Spread.Sheets.LineStyle.thin);
      for(var i=1;i++;i<endRow){
          var budget_code=sheet.getCell(i,0).value()
          if(budget_code != null){
              if(!res_array.includes(budget_code)){
                  sheet.getRange(i , 0, 1, 1).setBorder(lineBorder1, { all: true });
                  sheet.getRange(i - 1, 0, 1, 1).borderBottom(lineBorder1);
                  flag1=false;
              }
          }
          else{
              break;
          }
  
      }
      if(!flag1){
          ForSwal("请重新确认Budget code 是否正确");
          spread.resumePaint();
          return false
      }
    
      spread.resumePaint();
  }
  
  //锁表
  function lock_table() {
    $("#header-elements").find('[name="save_all"]').show();
    var year = $(".dataSheetCon>div:eq(0)").find("select[aname=year]").val();
    var lockkey = `SELECT is_locked from mcdcapex.app1_process_lock_config WHERE scenario = 'Projection' and year = ${year}`;
    console.log(lockkey);
    // JS执行查询SQL
    var res = cfs.request.foundation.runComm(lockkey);
  
    if (res.err) {
      ForSwal("读取数据失败:" + res.err.Message); //通过右上角的红色卡片报错
    } else {
      data = res.res;
  
      if (data[0].is_locked == 1) {
        var sheet = spread.getSheet(0);
        spread.suspendPaint();
        sheet.suspendCalcService(true);
        var Range = sheet.getRange(
          1,
          0,
          sheet.getRowCount(),
          sheet.getColumnCount(),
          GC.Spread.Sheets.SheetArea.viewport
        );
        Range.backColor("White"); //区域填充色为白色
        Range.locked(true); //区域锁定
        $("#header-elements").find('[name="save_all"]').hide();
        sheet.resumeCalcService(false);
        spread.resumePaint();
      }
    }
  }
  
  
  var cfs = {//dashboard全局方法
      request: {//请求后端数据
          common: {//通用请求
          sendRequest: function (url, type, paramObj, json = false, returnAll = false) {
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
                  if (returnAll){
                      resObj.res = res;
                  }else{
                      if (res.resultCode === 0) {
                      resObj.res = res.resultObj;
                      }
                  }
              },
              error: function (XMLHttpRequest) {
                  resObj.err = {};
                  resObj.err.Message = XMLHttpRequest.responseJSON.Message.substr(0, 200) || XMLHttpRequest.statusText.substr(0, 200);
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
                  sql: comm
              },
              cfs.common.userParams
              );
              return cfs.request.common.sendRequest(url, "POST", paramObj, false, true);
          },
          selectDimensionMemberByNameFunction: function (exp, cols) {
              let url = Api.seepln + 'dimension/selectDimensionMemberByNameFunction';
              paramObj = $.extend(
              {
                  dimensionMemberNames: exp,
                  duplicate: '1',
                  resultString: cols
              },
              cfs.common.userParams
              );
              return cfs.request.common.sendRequest(url, "POST", paramObj, false, true);
          },
          saveDimensionMember: function (dim, dim_list) {
              let url = Api.seepln + 'dimensionSave/saveDimensionMember';
              paramObj = $.extend(
              {
                  name: dim,
                  increment: 1,
                  dimension_member_list: dim_list,
              },
              cfs.common.userParams
              );
              return cfs.request.common.sendRequest(url, "POST", paramObj, false, true);
          },
          queryCubeInfoAndDetail: function (cube_name) {
              var url = Api.seepln +"cube/queryCubeInfoAndDetail";
              paramObj = $.extend(
                {
                  cube_name: cube_name,
                },
                cfs.common.userParams
              );
              return cfs.request.common.sendRequest(url, "POST", paramObj,false, true);
            },
          updateDimensionMemberAttribute: function (dimension,update_dimension) {
              var url = Api.seepln +"dimensionImport/updateDimensionMemberAttribute";
              paramObj = $.extend(
                {
                  dimension:  dimension,
                  'update_dimension\[\]': update_dimension,
                },
                cfs.common.userParams
              );
              return cfs.request.common.sendRequest(url, "POST", paramObj,false, true);
            },
            queryonevariableinfo: function (name) {
                var url = Api.seepln +"variablemanagement/queryonevariableinfo";
                paramObj = $.extend(
                  {
                    isStatus: "1",
                    name: name,
                  },
                  cfs.common.userParams
                );
                return cfs.request.common.sendRequest(url, "GET", paramObj,false, true);
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
                      entryObject:'SE7Q8GPLEG33'
                    },
                    cfs.common.userParams
                  );
                  return cfs.request.common.sendRequest(url, "POST", paramObj,true, true);
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
                return cfs.request.common.sendRequest(url, "POST", paramObj, true, true);
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
                return cfs.request.common.sendRequest(url, "POST", paramObj, true, true);
              },
              //同步调用python
              pythonWeb: function (pythonName, parameter, runType=1) {
                  var url = Api.pythonWeb + "doPythonWeb";
                  paramObj = $.extend(
                      {
                      pythonName: pythonName,
                      parameter: JSON.stringify(parameter),
                      runType: runType,//1-同步，2-异步
                      },
                      cfs.common.userParams
                  );
                  return cfs.request.common.sendRequest(url, "POST", paramObj, true, true);
              },
            },
      },
      common: {//通用方法
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
          dialogBox: function(text, thenEvent){
          swal({
                  title: text,
                  text: '',
                  type: 'info',
                  showCancelButton: true,
                  confirmButtonText: getLanguage('sure'),
                  cancelButtonText: getLanguage('cancel'),
          }).then(function (result) {
              if (result.value){
              thenEvent();
              }
          });
          },
          valueToDate: function(value){
              let n = Number(value.split('.')[0]);
              var date = new Date("1900-1-1");
              date.setDate(date.getDate() + n - 2);
              return date.format();
          }
      }
    };
  