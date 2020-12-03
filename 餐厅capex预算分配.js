var store_number_arr = []
var market_total = 0;
var flag
var flag2 
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
    var res = cfs.request.cube.queryCubeData('mcdcapex_cube_fin', 'Year{' + Year + '}->Scenario{' + Scenario + '}->Version{Working}->Status{FS09}->Period{YearSum}->Department{NoDept}->View{YTD}->Category{CTRE0701}->Entity{ET05}->Market{' + Market + '}->C3{C3OTH}->C4{Owner09}->Account{Inv06}');


    // var res = cfs.request.foundation.runComm(sqlstr).res
    // var res_mkc = cfs.request.foundation.runComm(sqlstr_mk).res
    // console.log(res_mkc)
    flag = true;
    if (res.res.data.length > 0 && res.res.data[0].data > 0) {

        market_total = res.res.data[0].data
        debugger
        // 获取市场对应的门店列表
        var sqlstr = 'select us_code from pbcs_store_master where market_city_name_en = "' + Market_des + '"';
        var res = cfs.request.foundation.runComm(sqlstr).res

        if (res.length > 0) {
            res.forEach((e, i) => {
                store_number_arr.push(e.us_code)
            })
            // store_number_arr = res[0].us_code
            flag = false;
        }
    }

    // mkc = res_mkc[0]['eps_code']

    // paraobj = { 'Market': mkc, 'Year': Year }
    // var ex1_res = cfs.request.python.web('intf_emsb_act', paraobj).res
    // var sheet1 = spread.getSheet(1);
    // var rownum = 0;
    // debugger;
    // function getNonEmptyRowIndex(sheet) {
    //     var rowCount = sheet.getRowCount(), colCount = sheet.getColumnCount();
    //     for (var i = rowCount - 1; i >= 0; i--) {
    //         if (sheet.getValue(i, 0) !== null && sheet.getValue(i, 0) !== undefined && sheet.getValue(i, 0) !== '') {
    //             return i;
    //         }
    //     }
    //     return -1;
    // }
    // rownum = getNonEmptyRowIndex(sheet1);

    // var rno = rownum + 1
    // debugger;

    // function in_array(search, array) {
    //     for (var i in array) {
    //         if (array[i] == search) {
    //             return true;
    //         }
    //     }
    //     return false;
    // }



    // arr_check = sheet1.getArray(1, 0, sheet1.getRowCount(), 1)
    // var l1 = [];
    // arr_check.forEach((e, i) => {

    //     if (e[0]) {
    //         l1.push(e[0])
    //     }

    // }
    // );
    // debugger;


    // arr_number = sheet1.getArray(1, 2, sheet1.getRowCount(), 1)
    // console.log(ex1_res)
    // var lb = new GC.Spread.Sheets.LineBorder('red', GC.Spread.Sheets.LineStyle.thin);
    // debugger;
    // start_row=1
    // redata = JSON.parse(ex1_res.result)
    // if (redata.length > 0) {
    //     for (i = 0; i < redata.length; i++) {
    //         debugger;
    //         if (in_array(redata[i]['projectNumber'], l1)) {
    //             var inx = l1.indexOf(redata[i]['projectNumber'])
    //             console.log(rr_number[inx][0])
    //             debugger;
    //             if (arr_number[inx][0] < redata[i]['actualAmount'])
    //                 debugger
    //             {
    //                 sheet1.getRange(inx, 2, 1, 1).setBorder(lb, { all: true });
    //                 // sheet1.getRange(i+start_row-1,2,1,1).borderBottom(lb);
    //                 flag2 = false
    //             }
    //         }
    //     }
    // }
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
                sheet.get(i + startRow, 0, 1, 1).setBorder(lineBorder1, { all: true });
                // sheet.getRange(i+startRow, statusCol-1, 1, 1).borderRight(lineBorder1);
                sheet.getRange(i + startRow - 1, 2, 1, 1).borderBottom(lineBorder1);
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

        // debugger;

        function in_array(search, array) {
            for (var i in array) {
                if (array[i] == search) {
                    return true;
                }
            }
            return false;
        }



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
        redata = JSON.parse(ex1_res.result)
        if (redata.length > 0) {
            for (i=0;i<redata.length;i++){
            for (j = 0; j < l1.length; j++) {
                // debugger;
                console.log(typeof redata[i])
                if (l1[j] == redata[i]['projectNumber']) {
                    if(arr_number[j][0]<redata[i]['actualAmount']){
                        debugger;
                        console.log('OK')
                        console.log(i)
                        sheet1.getRange(j+1, 2, 1, 1).borderBottom(lineBorder1);
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
        let newArr = arr2.reduce((pre,cur)=>{
            return pre.concat(cur)},[])
        
        var r = newArr.filter(function (s) {
            return s && s.trim(); // 注：IE9(不包含IE9)以下的版本没有trim()方法
        });

        function  statisticalFieldNumber(arr) {
            return arr.reduce(function (prev, next) {
                prev[next] = (prev[next] + 1) || 1;
                return prev;
            }, {});
        }
        var new_count = statisticalFieldNumber(r)
        debugger;
        
        for ( let val of Object.values(new_count)){
            if (val>=2)
            flag3=false
        }

        debugger;


        
        if (!flag3) {
            ForSwal("请重新确认上传的项目名称是否重复");
            spread.resumePaint();
            return false
        }


        if (sumall > market_total) {
            ForSwal("上传总金额超出分配至该市场的预算");
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