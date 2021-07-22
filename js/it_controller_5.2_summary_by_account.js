/*
 * @Author: Huang Meng
 * @Date: 2021-07-15 17:14:50
 * @LastEditTime: 2021-07-16 11:02:29
 * @LastEditors: your name
 * @Description:
 * @FilePath: \jscode\it_controller_5.2_summary_by_account.js
 * 可以输入预定的版权声明、个性签名、空行等
 * 实现功能：隐藏无数据行
 * 替换预设维度信息为维度描述
 */

function init() {
  summary_account(0);
  summary_account(1);
  replace_category_name(0);
  replace_category_name(1);
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
  debugger;
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
    if (arr1[i] && category_list.includes(arr1[i][0])) {
      debugger;
      category_name = category_object[arr1[i][0]];
      sheet.setValue(i + 3, 0, category_name); //将I1文本替换为TA Type
    }
  }
}
