/*
 * @Author: Huang Meng
 * @Date: 2021-07-15 17:07:33
 * @LastEditTime: 2021-07-15 17:10:01
 * @LastEditors: your name
 * @Description: 
 * @FilePath: \jscode\it_controller_4.8_add_min_bud_category.js
 * 可以输入预定的版权声明、个性签名、空行等
 * 实现功能： 验证A列不等于B列时，区域底色变白，锁定单元格
 * 注意事项，由于arr1是从第二列开始取得，因此sheet.getCell行参数需要+1
 */



function check_bud_name() {
  spread.suspendPaint();
  var sheet = spread.getSheet(0);//获取sheet页
  var endRow = sheet.getRowCount();//获取sheet页总行数
  // 隐藏插入行按钮
  $(".breadcrumb-elements-item.dropdown-toggle").eq(0).hide();
  //隐藏上传
  $("a#excel_upload").hide();
  debugger;
  var arr1 = sheet.getArray(1, 0, endRow, 2);
  arr1.forEach((e, i) => {
    if (e[0] != e[1]) {
      debugger;
      sheet.getCell(i+1, 0).backColor("White"); //  区域底色变白,
      sheet.getCell(i+1, 1).backColor("White"); //  区域底色变白
      sheet.getCell(i+1, 0).locked(true); //区域锁定
      sheet.getCell(i+1, 1).locked(true); //区域锁定
    }
  });

  spread.resumePaint();
}
