/*
 *  ┌───┐   ┌───┬───┬───┬───┐ ┌───┬───┬───┬───┐ ┌───┬───┬───┬───┐ ┌───┬───┬───┐
 *  │Esc│   │ F1│ F2│ F3│ F4│ │ F5│ F6│ F7│ F8│ │ F9│F10│F11│F12│ │P/S│S L│P/B│  ┌┐    ┌┐    ┌┐
 *  └───┘   └───┴───┴───┴───┘ └───┴───┴───┴───┘ └───┴───┴───┴───┘ └───┴───┴───┘  └┘    └┘    └┘
 *  ┌───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───────┐ ┌───┬───┬───┐ ┌───┬───┬───┬───┐
 *  │~ `│! 1│@ 2│# 3│$ 4│% 5│^ 6│& 7│* 8│( 9│) 0│_ -│+ =│ BacSp │ │Ins│Hom│PUp│ │N L│ / │ * │ - │
 *  ├───┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─────┤ ├───┼───┼───┤ ├───┼───┼───┼───┤
 *  │ Tab │ Q │ W │ E │ R │ T │ Y │ U │ I │ O │ P │{ [│} ]│ | \ │ │Del│End│PDn│ │ 7 │ 8 │ 9 │   │
 *  ├─────┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴─────┤ └───┴───┴───┘ ├───┼───┼───┤ + │
 *  │ Caps │ A │ S │ D │ F │ G │ H │ J │ K │ L │: ;│" '│ Enter  │               │ 4 │ 5 │ 6 │   │
 *  ├──────┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴────────┤     ┌───┐     ├───┼───┼───┼───┤
 *  │ Shift  │ Z │ X │ C │ V │ B │ N │ M │< ,│> .│? /│  Shift   │     │ ↑ │     │ 1 │ 2 │ 3 │   │
 *  ├─────┬──┴─┬─┴──┬┴───┴───┴───┴───┴───┴──┬┴───┼───┴┬────┬────┤ ┌───┼───┼───┐ ├───┴───┼───┤ E││
 *  │ Ctrl│    │Alt │         Space         │ Alt│    │    │Ctrl│ │ ← │ ↓ │ → │ │   0   │ . │←─┘│
 *  └─────┴────┴────┴───────────────────────┴────┴────┴────┴────┘ └───┴───┴───┘ └───────┴───┴───┘
 * 
 * @Author: Huang Meng
 * @Date: 2020-11-19 12:49:55
 * @LastEditTime: 2021-07-07 13:31:08
 * @LastEditors: your name
 * @Description: 
 * @FilePath: \jscode\餐厅capex预算分配.js
 * 可以输入预定的版权声明、个性签名、空行等
 */

P





var store_number_arr = []
var market_total = 0;
var flag
function AfterLoad() {
    spread.suspendPaint();
    debugger
    var Market = $('.dataSheetCon>div:eq(0)').find('select[aname=Market]').next().find('.form-check.active').find('input').val()
    var Market_des = $('.dataSheetCon>div:eq(0)').find('select[aname=Market]').next().find('button').attr('title')
    var Scenario = $('.dataSheetCon>div:eq(0)').find('select[aname=Scenario]').next().find('.form-check.active').find('input').val()
    var Year = $('.dataSheetCon>div:eq(0)').find('select[aname=year]').next().find('.form-check.active').find('input').val()
    // 先查状态对不对
    // var sqlstr = 'select status from app1_nit_i_prod_list where prod_code = "CTRE0701" and mkt = "'+ Market +'"';
    // var sqlstr_mk = 'select eps_code from app1_mcd_info_mapping_market where  store_master_code = "' + Market_des + '"';

    // 查询市场金额，变更，将C30TH替换为 C30
    var res = cfs.request.cube.queryCubeData('mcdcapex_cube_fin', 'Year{' + Year + '}->Scenario{' + Scenario + '}->Version{Working}->Status{FS09}->Period{YearSum}->Department{NoDept}->View{YTD}->Category{CTRE0701}->Entity{ET05}->Market{' + Market + '}->C3{C3O}->C4{Owner09}->Account{Inv06}');


    // var res = cfs.request.foundation.runComm(sqlstr).res
    // var res_mkc = cfs.request.foundation.runComm(sqlstr_mk).res
    // console.log(res_mkc)
    flag = true;
    if (res.res.data.length > 0 && res.res.data[0].data > 0) {
        // if (Market_des == 'BEIJING') {
        //     var res1 = cfs.request.cube.queryCubeData('mcdcapex_cube_fin', 'Year{' + Year + '}->Scenario{' + Scenario + '}->Version{Working}->Status{FS09}->Period{YearSum}->Department{NoDept}->View{YTD}->Category{CTRE0701}->Entity{ET05}->Market{NBJ}->C3{C3O}->C4{Owner09}->Account{Inv06}');
        //     market_shanxi = res1.res.data[0].data
        //     market_total = res.res.data[0].data + market_shanxi
        // }
        // else {
            market_total = res.res.data[0].data
        // }
        debugger
        // 获取市场对应的门店列表
        // 替换12个市场字段，原字段为market_city_name_en，12.0修改
        var sqlstr = 'select us_code from pbcs_store_master where market_desc = "' + Market_des + '"';
        var res = cfs.request.foundation.runComm(sqlstr).res

        if (res.length > 0) {
            res.forEach((e, i) => {
                store_number_arr.push(e.us_code)
            })
            // store_number_arr = res[0].us_code
            flag = false;
        }
    }


    debugger;
    if (flag) {
        // 直接锁表
        lock_table()
    }
    var sheet = spread.getSheet(0);

    sheet.setColumnVisible(3, false);  //隐藏列
    sheet.setColumnVisible(4, false);  //隐藏列
    var arr1 = sheet.getArray(1, 0, sheet.getRowCount(), 1);
    arr1.forEach((e, i) => {
        if (e[0]) {
            var cell = sheet.getCell(i + 1, 0);
            cell.backColor("White");  //区域填充色为白色
            cell.locked(true);  //区域锁定
        }
    })
    spread.resumePaint();

}
function lock_table() {
    var sheet = spread.getSheet(0);
    var Range = sheet.getRange(1, 0, sheet.getRowCount(), 1, GC.Spread.Sheets.SheetArea.viewport);
    Range.backColor("White");  //区域填充色为白色
    Range.locked(true);  //区域锁定
    var Range = sheet.getRange(1, 2, sheet.getRowCount(), 1, GC.Spread.Sheets.SheetArea.viewport);
    Range.backColor("White");  //区域填充色为白色
    Range.locked(true);  //区域锁定
}

function BeforeSave() {
    debugger
    if (flag) {
        return false
    }
    spread.suspendPaint();
    if (store_number_arr && store_number_arr.length > 0) {
        var sheet = spread.getSheet(0);
        var startRow = 1;
        var arr1 = sheet.getArray(1, 0, sheet.getRowCount(), 1);
        var lineBorder1 = new GC.Spread.Sheets.LineBorder('red', GC.Spread.Sheets.LineStyle.thin);
        var flag1 = true;
        arr1.forEach((e, i) => {
            if (e[0] && !store_number_arr.includes(String(e[0]))) {
                sheet.getRange(i + startRow, 0, 1, 1).setBorder(lineBorder1, { all: true });
                // sheet.getRange(i+startRow, statusCol-1, 1, 1).borderRight(lineBorder1);
                sheet.getRange(i + startRow - 1, 0, 1, 1).borderBottom(lineBorder1);
                flag1 = false;
            }
        })
        if (!flag1) {
            ForSwal("请重新确认上传的门店范围是否正确");
            spread.resumePaint();
            return false
        }
        var Year = $('.dataSheetCon>div:eq(0)').find('select[aname=year]').next().find('.form-check.active').find('input').val()
        var Market_des = $('.dataSheetCon>div:eq(0)').find('select[aname=Market]').next().find('button').attr('title')
        var sqlstr_mk = 'select eps_code from app1_mcd_info_mapping_market where  store_master_code = "' + Market_des + '"';
        var res_mkc = cfs.request.foundation.runComm(sqlstr_mk).res
        mkc = res_mkc[0]['eps_code']

        paraobj = { 'Market': mkc, 'Year': Year }
        var ex1_res = cfs.request.python.web('intf_emsb_act', paraobj).res
        var sheet1 = spread.getSheet(1);

        arr_check = sheet1.getArray(1, 0, sheet1.getRowCount(), 1)
        var l1 = [];
        arr_check.forEach((e, i) => {

            if (e[0]) {
                l1.push(e[0])
            }

        }
        );
        debugger;


        arr_number = sheet1.getArray(1, 2, sheet1.getRowCount(), 1)
        console.log(ex1_res)
        var lineBorder1 = new GC.Spread.Sheets.LineBorder('red', GC.Spread.Sheets.LineStyle.thin);
        // debugger;
        start_row = 1
        var flag2 = true
        redata = JSON.parse(ex1_res.result)
        if (redata.length > 0 && arr_check.length > 0) {
            for (i = 0; i < redata.length; i++) {
                for (j = 0; j < l1.length; j++) {
                    // debugger;
                    console.log(typeof redata[i])
                    if (l1[j] == redata[i]['projectNumber']) {
                        if (arr_number[j][0] < redata[i]['actualAmount']) {
                            debugger;
                            console.log('OK')
                            console.log(i)
                            sheet1.getRange(j + 1, 2, 1, 1).borderBottom(lineBorder1);
                            // sheet1.getRange(j+startRow, 3, 1, 1).setBorder(lineBorder1, { all: true });
                            // sheet1.getcell(i+start_row-1,2,1,1).borderBottom(lb);
                            flag2 = false
                        }
                    }
                }
            }
        }




        var arr2 = sheet.getArray(1, 2, sheet.getRowCount(), 1);
        var sum = 0;
        arr2.forEach((e, i) => {
            if (e[0]) {
                sum += +(e[0])
            }
        })



        var sheet1 = spread.getSheet(1);
        var arr3 = sheet1.getArray(1, 2, sheet1.getRowCount(), 1)
        var sum1 = 0
        arr3.forEach((e, i) => {

            if (e[0]) {
                sum1 += +(e[0])
            }

        }
        )
        sumall = sum + sum1
        var arr2 = sheet1.getArray(1, 1, sheet1.getRowCount(), 1);
        let newArr = arr2.reduce((pre, cur) => {
            return pre.concat(cur)
        }, [])

        var r = newArr.filter(function (s) {
            return s && s.trim(); // 注：IE9(不包含IE9)以下的版本没有trim()方法,去掉非空
        });

        function statisticalFieldNumber(arr) {
            return arr.reduce(function (prev, next) {
                prev[next] = (prev[next] + 1) || 1;
                return prev;
            }, {});
        }
        var new_count = statisticalFieldNumber(r)
        debugger;
        var flag3 = true
        if (r.length > 0) {
            for (key in new_count) {
                if (new_count[key] >= 2) {
                    flag3 = false
                }
            }
        }

        debugger;






        if (sumall > market_total) {
            ForSwal("上传总金额超出分配至该市场的预算");
            spread.resumePaint();
            return false
        }

        if (!flag3) {
            ForSwal("请重新确认上传的项目名称是否重复");
            spread.resumePaint();
            return false
        }
        if (!flag2) {
            ForSwal("请重新确认上传的项目金额是否正确");
            spread.resumePaint();
            return false
        }

    }


    spread.resumePaint();

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
                var url = Api.seepln + "cube/queryCubeInfoAndDetail";
                paramObj = $.extend(
                    {
                        cube_name: cube_name,
                    },
                    cfs.common.userParams
                );
                return cfs.request.common.sendRequest(url, "POST", paramObj, false, true);
            },
            updateDimensionMemberAttribute: function (dimension, update_dimension) {
                var url = Api.seepln + "dimensionImport/updateDimensionMemberAttribute";
                paramObj = $.extend(
                    {
                        dimension: dimension,
                        'update_dimension\[\]': update_dimension,
                    },
                    cfs.common.userParams
                );
                return cfs.request.common.sendRequest(url, "POST", paramObj, false, true);
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
                        entryObject: 'SE7Q8GPLEG33'
                    },
                    cfs.common.userParams
                );
                return cfs.request.common.sendRequest(url, "POST", paramObj, true, true);
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
            pythonWeb: function (pythonName, parameter, runType = 1) {
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
        dialogBox: function (text, thenEvent) {
            swal({
                title: text,
                text: '',
                type: 'info',
                showCancelButton: true,
                confirmButtonText: getLanguage('sure'),
                cancelButtonText: getLanguage('cancel'),
            }).then(function (result) {
                if (result.value) {
                    thenEvent();
                }
            });
        },
        valueToDate: function (value) {
            let n = Number(value.split('.')[0]);
            var date = new Date("1900-1-1");
            date.setDate(date.getDate() + n - 2);
            return date.format();
        }
    }
};


var cfs = {
    //请求后端数据
    request: {
        /*通用同步请求
            code为200返回结果在.res内，否则结果在.err内（部分业务错误也会强制返回500或999）
            type: POST/GET/PUT/DELETE
            json: TRUE为application/json FALSE为application/x-www-form-urlencoded
            returnAll：TRUE返回所有结果, FALSE返回.resultObj（有时候结果在resultList里）
        */
        common: {
            sendRequest: function (url, type, paramObj, json = false, returnAll = false) {
                var data = json ? JSON.stringify(paramObj) : paramObj;
                var contentType = "application/" + (json ? "json" : "x-www-form-urlencoded");
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
                        resObj.err.Message = XMLHttpRequest.responseJSON.Message.substr(0, 200) || XMLHttpRequest.statusText.substr(0, 200);
                    },
                });
                return resObj;
            },
        },
        cube: {
            //script: Year{2020}->Period{6}->Version{Working}...
            queryCubeData: function (cubeName, script) {
                var url = Api.SeeplnCube + "cube/queryCubeData";
                paramObj = $.extend(
                    {
                        cube_name: cubeName,
                        script: script,
                    },
                    cfs.common.userParams
                );
                return cfs.request.common.sendRequest(url, "POST", paramObj, true);
            },
            //通用保存方法
            save: function (sheetDatas) {
                var url = Api.SeeplnCube + "spreadsheet/save";
                paramObj = $.extend(
                    {
                        sheetDatas: sheetDatas,
                    },
                    cfs.common.userParams
                );
                return cfs.request.common.sendRequest(url, "POST", paramObj, true);
            },
        },
        foundation: {
            //根据user权限获取维度，最多2层
            getAccessDimensionMemberLevel: function (dimName, exp = "", name = "#root", id = "1", searchValue = "") {
                let url = Api.seepln + "dimension/getAccessDimensionMemberLevel";
                paramObj = $.extend(
                    {
                        dimensionName: dimName,
                        name: name,
                        dimensionExpression: exp,
                        id: id,
                        searchValue: searchValue,
                    },
                    cfs.common.userParams
                );
                return cfs.request.common.sendRequest(url, "POST", paramObj, false, true);
            },
            //根据表达式查询，不分权限
            selectDimensionMemberByNameFunction: function (dimensionMemberNames) {
                let url = Api.seepln + "dimension/selectDimensionMemberByNameFunction";
                paramObj = $.extend(
                    {
                        dimensionMemberNames: dimensionMemberNames,
                    },
                    cfs.common.userParams
                );
                return cfs.request.common.sendRequest(url, "POST", paramObj, false);
            },
            //执行自定义sql语句
            runComm: function (comm) {
                var url = Api.seepln + "sqlparser/run/post2";
                paramObj = $.extend(
                    {
                        sql: comm,
                    },
                    cfs.common.userParams
                );
                return cfs.request.common.sendRequest(url, "POST", paramObj, false, true);
            },

            // 获取系统变量
            queryonevariableinfo: function (name) {
                var url = Api.seepln + "variablemanagement/queryonevariableinfo";
                paramObj = $.extend(
                    {
                        isStatus: "1",
                        name: name,
                    },
                    cfs.common.userParams
                );
                return cfs.request.common.sendRequest(url, "GET", paramObj, false, true);
            },
        },
        python: {
            //同步调用python
            web: function (pyName, params) {
                var url = Api.python + "start/web";
                paramObj = $.extend({
                    pyName: pyName,
                    params: params,
                },
                    cfs.common.userParams
                );
                return cfs.request.common.sendRequest(url, "POST", paramObj, true, true);
            },
        },
    },
    card: {
        //dashboard单个卡片方法 bootstrap4图标：http://easyview.seepln.com/Limitless_2.0.1/Bootstrap%204/Template/layout_1/LTR/material/full/icons_icomoon.html
        head: {
            //获取卡片表头jquery dom
            getDom: function (cardName) {
                return $("#" + cardName).find(".card-header");
            },
            //删除卡片表右边所有元素
            removeButton: function (dom) {
                dom.find(".header-elements").html("");
            },
            addSelectButton: function (carHead, buttonInfo) {
                var btn = $(`<div class="list-icons ${buttonInfo.id}">
                      <label for="" style="width: 60px;margin: 0;margin-bottom:-4px">${buttonInfo.text}</label>
                      <select
                          class="form-control select selectXm"
                          id="${buttonInfo.id}"
                          data-fouc
                      >
                      </select>
                  </div>`);
                let sHtml = "";
                buttonInfo.list.forEach(function (v) {
                    sHtml += "<option value='" + v.key + "'>" + v.value + "</option>";
                });
                carHead.find(".header-elements").prepend(btn);
                $("#" + buttonInfo.id).html(sHtml);
                $(".select").select2({ minimumResultsForSearch: -1 });
                return btn;
            },
            /*添加下拉按钮
                      buttonInfo: {
                          id: "UploadButton",
                          text: "上传数据",
                          icon: "mi-file-upload",
                          list: ["增量上传", "全量上传"]
                      },
                  */
            addDropdownButton: function (carHead, buttonInfo) {
                var list = buttonInfo.list;
                for (var i = 0; i < list.length; i++) {
                    list[i] = '<a index = "' + i + '" class="dropdown-item" href="#">' + list[i] + "</a>";
                }
                var btn = $(
                    '<div id="' +
                    buttonInfo.id +
                    '" class="dropdown breadcrumb-elements-item mr-1 cursor-pointer">' +
                    '<a class="dropdown-toggle" data-toggle="dropdown"><i class="' +
                    buttonInfo.icon +
                    ' icon text-default mr-1"></i>' +
                    '<span class="iconSpan loadDes">' +
                    buttonInfo.text +
                    "</span></a>" +
                    '<div class="dropdown-menu" style="min-width:100px">' +
                    list.join("") +
                    "</div></div>"
                );
                carHead.find(".header-elements").append(btn);
                if (buttonInfo.id.indexOf("_disable") == -1) {
                    var buttonInfo2 = Object.create(buttonInfo);
                    buttonInfo2.id = buttonInfo.id + "_disable";
                    var btn_disable = this.addDropdownButton(carHead, buttonInfo2);
                    btn_disable.hide();
                    btn_disable.find(".dropdown-menu").remove();
                    btn_disable.hover(function () {
                        this.style.cursor = "not-allowed";
                    });
                }
                return btn;
            },
            /*添加普通按钮
                      buttonInfo: {
                          id: "UploadButton",
                          text: "上传数据",
                          icon: "mi-file-upload",
                      },
                  */
            addButton: function (carHead, buttonInfo) {
                var btn = $(
                    '<a class="breadcrumb-elements-item mr-1 cursor-pointer" id="' +
                    buttonInfo.id +
                    '"><div class="customLoader mr-1" style="margin-bottom: 2px; display: none;"></div><i class="' +
                    buttonInfo.icon +
                    ' icon text-default mr-1"></i><span class="iconSpan loadDes">' +
                    buttonInfo.text +
                    "</span></a>"
                );
                carHead.find(".header-elements").append(btn);
                if (buttonInfo.id.indexOf("_disable") == -1) {
                    var buttonInfo2 = Object.create(buttonInfo);
                    buttonInfo2.id = buttonInfo.id + "_disable";
                    var btn_disable = this.addButton(carHead, buttonInfo2);
                    btn_disable.hide();
                    btn_disable.hover(function () {
                        this.style.cursor = "not-allowed";
                    });
                }
                return btn;
            },
            //点击后调用防止反复执行
            disableButton: function (btn) {
                btn.hide();
                $("#" + btn.attr("id") + "_disable").show();
                cfs.common.unScroll();
            },
            //恢复按钮可用
            enableButton: function (btn) {
                $("#" + btn.attr("id") + "_disable").hide();
                btn.show();
                cfs.common.removeUnScroll();
            },
        },
        body: {
            //获取卡片内容jquery dom
            getDom: function (cardName) {
                return $("#" + cardName).find(".card-body");
            },
            //添加文件上传卡片
            addFileTag: function (cardName, text) {
                var dom = $(
                    '<div status="-1" filename="' +
                    text +
                    '" style="margin: 1.25rem; padding: 10px;display: inherit; background-color:#f7f7f7;width:fit-content;width:-webkit-fit-content;width:-moz-fit-content;">' +
                    '<span style="margin-right: 15px;">' +
                    text +
                    "</span>" +
                    '<i class="icon-bin delete" onclick="cfs.card.body.deleteFileTag(this)" style="margin-right: 10px;cursor: pointer;"></i>' +
                    '<div class="customLoader" style="margin-bottom: 2px;display: none;"></div><span class="infotext" style="margin-left: 5px; margin-right: 5px; display: none;"></span>' +
                    '<i data-trigger="hover" data-toggle="popover" data-placement="right" data-content="" class="infobtn icon-info22" style="margin-right: 10px;cursor: pointer; display: none;"></i>'
                );
                this.getDom(cardName).append(dom);
                return dom;
            },
            //删除文件上传卡片
            deleteFileTag: function (dom) {
                dom.parentElement.remove();
            },
            createTable: function (cardName, data, withHead = true, cls = "table", headCls = "", tableStyle = "") {
                let headArr = [];
                let rowArr = [];
                for (let i = 0; i < data.length; i++) {
                    if (withHead && i === 0) {
                        let tArr = [];
                        for (let key in data[i]) {
                            tArr.push("<th>" + key + "</th>");
                        }
                        headArr.push(`<tr class='${headCls}'>` + tArr.join("") + "<tr>");
                    }
                    let cellArr = [];
                    for (let key in data[i]) {
                        if (cellArr.length == 0) {
                            cellArr.push("<td style='font-weight: bold'>" + data[i][key] + "</td>");
                        } else {
                            cellArr.push("<td>" + data[i][key] + "</td>");
                        }
                    }
                    rowArr.push("<tr>" + cellArr.join("") + "<tr>");
                }
                let headHtml = withHead ? "<thead>" + headArr.join("") + "</thead>" : "";
                let dom = $(`<div class="table-responsive" style="">
                      <table id="table_${cardName}" class="${cls}" style="${tableStyle}">
                      ${headHtml}
                      <tbody class="">
                                                  ${rowArr.join("")}
                                                  </tbody>
                                              </table>
                                          </div>`);
                if (cardName) this.getDom(cardName).append(dom);
                return dom;
            },
            createSimpleTag1: function (cardName, data, iconCls) {
                let dom = $(`<div class="media">
                  <div class="mr-3 align-self-center">
                      <i class="${iconCls}"></i>
                  </div>
                  <div class="media-body text-left align-self-center">
                      <h3 class="font-weight-black mb-0">${data}</h3>
                  </div>
                  </div>`);
                if (cardName) this.getDom(cardName).append(dom);
                return dom;
            }
        },
        //自定义初始化卡片
        cusInit: function (cardName, border = true, removeHead = false, textCenter = true, useEchart = false, hideRef = true) {
            var cardDom = $(`[data-name='${cardName}']`);
            //cardDom.addClass("border border-primary");
            if (border) {
                if (cardDom.find("#" + cardName).length > 0) {
                    cardDom.find("#" + cardName).css("border", "3px solid #64b5f6").css("border-radius", "5px");
                } else {
                    cardDom.css("border", "3px solid #64b5f6").css("border-radius", "5px");
                }
            }
            var cardBody = cfs.card.body.getDom(cardName);
            if (!useEchart) {
                cardBody.html("");
                cardBody.css("padding", "10px");
                cardBody.css("overflow", "auto");
            }
            var headDom = cardDom.find(".card-header");
            headDom.css("height", "3rem");
            //headDom.find("h6").css("padding", "5px");
            let ref = headDom.find(".freshBS");
            ref.find("i").css("margin", 10);
            if (hideRef) ref.hide();
            if (removeHead) {
                headDom.remove();
            } else if (textCenter) {
                headDom.find("h6").addClass("ml-3").addClass("text-center").css("width", "100%");
                headDom.removeClass("bg-white");
                headDom.addClass("bg-primary-300");
            }
            return cardBody;
        }
    },
    data: {
        //数据处理
        spreadjs: {
            //从excel二维表生成cube.save方法的sheetData（静态表格式）
            createSheetData: function (dimList, dimMap, dataTables, startIndex = 1, maxLength = 10000) {
                var sheetDataObj = { rowDatas: [] };
                if (dataTables == undefined || Object.keys(dataTables).length == 0) return sheetDataObj;
                //准备表头所在列和维度名的map
                var colMap = {};
                for (var i = 0; i < dataTables[0].length; i++) {
                    var dimName = dimMap[dataTables[0][i].value] || dataTables[0][i].value;
                    if (dimMap.indexOf(dimName) != -1) {
                        colMap[i] = dimName;
                    }
                }
                var rowDatasArr = [];
                for (var i = startIndex; i < startIndex + maxLength; i++) {
                    if (dataTables[i]) {
                        var arr = dataTables[i];
                        var columnDimensionMemberMap = {};
                        for (var c in colMap) {
                            var val = arr[c].value;
                            columnDimensionMemberMap[colMap[c]] = val;
                        }
                        rowDatasArr.push({ columnDimensionMemberMap: columnDimensionMemberMap });
                    }
                }
                sheetDataObj.rowDatas = rowDatasArr;
                return sheetDataObj;
            },
        },
    },
    //echarts
    echarts: {
        theme: "westeros",
        init: function (dom, theme, option) {
            var ec = echarts.init(dom.get(0), theme);
            dom.resize(function () {
                ec.resize();
            });
            /*window.addEventListener('resize', function () {
                      ec.resize();
                  });*/
            this.refresh(ec, option);
            return ec;
        },
        refresh: function (ec, option) {
            ec.clear();
            ec.setOption(option);
        },
    },
    //通用方法
    common: {
        //ajax要用的user属性
        userParams: {
            app: Userinfo.app,
            app_id: Userinfo.app,
            token: Userinfo.token,
            user_id: Userinfo.user_id,
            creater: Userinfo.user_id,
            tenant_code: Userinfo.tenant_code,
            tenantCode: Userinfo.tenant_code,
            language: Userinfo.language,
            description: Userinfo.language,
        },
        //是否对话框，按是后执行thenEvent
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
        //excel的5位纯数字日期格式转yyyy-mm-dd
        valueToDate: function (value) {
            var n = Number(value.split(".")[0]);
            var date = new Date("1900-1-1");
            date.setDate(date.getDate() + n - 2);
            return date.format();
        },
        drap: function (obj) {
            //拖拽移动
            obj.addEventListener("mousedown", start);

            function start(event) {
                // 鼠标左键
                if (event.button == 0) {
                    // getComputedStyle(obj)['margin-left'] return XXpx需要转成整型
                    // 如果有obj有margin值而不加这个数组拖拽会出现位置偏移
                    offsetX = event.pageX - obj.offsetLeft + parseInt(getComputedStyle(obj)["margin-left"]);
                    offsetY = event.pageY - obj.offsetTop + parseInt(getComputedStyle(obj)["margin-top"]);
                    // 绑定事件，同样unbind解绑定，此效果的实现最后必须要解绑定，否则鼠标松开后拖拽效果依然存在
                    //movemove事件必须绑定到$(document)上，鼠标移动是在整个屏幕上的
                    document.addEventListener("mousemove", move);
                    //此处的$(document)可以改为obj
                    document.addEventListener("mouseup", stop);
                }
                return false; //阻止默认事件或冒泡
            }

            function move(event) {
                obj.style.left = event.pageX - offsetX + "px";
                obj.style.top = event.pageY - offsetY + "px";
                return false; //阻止默认事件或冒泡
            }

            function stop(envet) {
                document.removeEventListener("mousemove", move);
                document.removeEventListener("mouseup", stop);
            }
        },
        /**禁用滚动条**/
        unScroll: function () {
            var top = $(document).scrollTop();
            $(document).on('scroll.unable', function (e) {
                $(document).scrollTop(top);
            })
        },
        /**启用滚动条**/
        removeUnScroll: function () {
            $(document).unbind("scroll.unable");
        }
    },
    //导出文件
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
        toXlsx: function (fileName, dataJson = null, titleArr = null, spreadOperate = null, contentDomStr = '.dashBoardContent') {
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
            console.log(dataArr)
            var divName = `exportXlsxTmp`;
            var div = $(`<div id="${divName}" style='display:none;'></div>`);
            $(contentDomStr).append(div);
            var spread = new GC.Spread.Sheets.Workbook(document.getElementById('ss'), { sheetCount: 1 });
            var sheet = spread.getSheet(0);
            sheet.suspendPaint();
            sheet.setRowCount(10000);
            if (dataJson) {
                sheet.setArray(0, 0, [titleArr]);
                sheet.setArray(1, 0, dataArr);
            }
            // 设置百分比
            $.each(dataArr,function(k,v){
                spread.getActiveSheet().setFormatter(k+1,dataArr[0].length-1,"0%");
            });
            if (spreadOperate && spreadOperate instanceof Function) {
                spreadOperate(spread);
            }
            sheet.resumePaint();
            var excelIo = new GC.Spread.Excel.IO();
            var json = spread.toJSON();
            excelIo.save(json, function (blob) {
                saveAs(blob, fileName + ".xlsx");
            }, function (e) {
                // process error
                console.log(e);
            });
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


// 获取系统变量
function queryGlobalVariables(variableName) {
    let cfs = new DevCustomFuncTools();
    let val;
    comm =
      'SELECT value FROM app' +
      Userinfo.app +
      "_variable_info WHERE `name`='" +
      variableName +
      "'";
    let res = cfs.request.foundation.runComm(comm);
    if (res.err) {
      ForSwal('读取数据失败：' + res.err.Message);
    } else {
      data = res.res;
    }
    debugger;
    val = data[0].value;
    console.log(val);
    return val;
  };