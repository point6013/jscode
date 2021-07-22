/*
 * @Author: Huang Meng
 * @Date: 2021-07-15 17:14:50
 * @LastEditTime: 2021-07-16 10:15:25
 * @LastEditors: your name
 * @Description:
 * @FilePath: \jscode\it_controller_summary_by_account.js
 * 可以输入预定的版权声明、个性签名、空行等
 * 实现功能：
 * 1.隐藏无数据行
 * 2.修改显示年数据
 * 3.静态表中修改默认维度显示的信息替换
 * 4. 
 */

function init() {

  summary_account(0);  // 
  summary_account(1)
  IT_Report();
  replace_category_name(0);
  replace_category_name(1)
}

function IT_Report() {
  spread.suspendPaint();
  var sheet = spread.getSheet(0);
  var sheet1 = spread.getSheet(1);
  // 隐藏 ABCD
  sheet.setRowVisible(0, false, GC.Spread.Sheets.SheetArea.colHeader);
  // 隐藏 1234
  sheet.setColumnVisible(0, false, GC.Spread.Sheets.SheetArea.rowHeader);
  // // 隐藏sheet名
  // spread.options.tabStripVisible = false;
  // spread.options.newTabVisible = false;
  var year = $("[dc='Year']").val();
  last_year = year - 1;

  var arg1 = last_year + " Projection";
  var arg2 = year + " Plan";
  //   debugger;
  sheet.setValue(2, 1, arg1); //将I1文本替换为TA Type
  sheet.setValue(2, 2, arg2); //将I1文本替换为TA Type
  sheet1.setValue(2, 1, arg1); //将I1文本替换为TA Type
  sheet1.setValue(2, 2, arg2); //将I1文本替换为TA Type
  spread.resumePaint();
}

function summary_account(sheetid) {
  spread.suspendPaint();
  var sheet = spread.getSheet(sheetid);
  var endLine = sheet.getRowCount();
  var colCount = sheet.getColumnCount();
  for (i = 3; i < endLine; i++) {
    HideNullRow(sheet, i, colCount);
  }
  spread.resumePaint();
}

function HideNullRow(sheet, lineNum, colCount) {
  // 隐藏无数据列
  // let arr = sheet.getArray(startLine, ColNum, endLine-startLine, 1);
  let arr = sheet.getArray(lineNum, 0, 1, colCount);
  //   debugger;
  let flag = false;
  try {
    arr.forEach((row) => {
      if (row[1] || row[2] || row[3]) {
        flag = true;
        // throw new Error("EndIterative")
      }
    });
  } catch (e) {
    if (e.message != "EndIterative") {
      throw e;
    }
  }
  if (!flag) {
    sheet.setRowVisible(lineNum, false);
  }
}

function translate(arr) {
  // Create an empty object
  let obj = {};
  // let arr1 =[]

  arr.forEach((v) => {
    let key = v["name"];
    let value = v["description_1"];
    obj[key] = value;
    // arr1.push(key)
  });
  return obj;
}

function translate1(arr) {
  // Create an empty object
  // let obj = {};
  let arr1 = [];

  arr.forEach((v) => {
    let key = v["name"];
    // let value = v['description_1'];
    // obj[key] = value;
    arr1.push(key);
  });
  return arr1;
}

function replace_category_name(sheetid) {
  var cfs = new DevCustomFuncTools();
  var sqlstr =
    "select  name,description_1 from  `mcdcapex`.`app1_di_budget_type_table_dimension` a";
  var res = cfs.request.foundation.runComm(sqlstr).res;
  category_object = translate(res);
  category_list = translate1(res);
  var sheet = spread.getSheet(sheetid);
  var endLine = sheet.getRowCount();
  var arr1 = sheet.getArray(3, 0, endLine, 1);
debugger;
  for (i = 0; i < endLine; i++) {
    if (arr1[i]&&category_list.includes(arr1[i][0])){
        debugger;
      category_name = category_object[arr1[i][0]];
      sheet.setValue(i+3, 0, category_name); //将I1文本替换为TA Type
    }
  }

}
