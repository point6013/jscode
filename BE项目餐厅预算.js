var store_number_arr = []
var market_total = 0;
var flag
function AfterLoad(){
    spread.suspendPaint();
    debugger
    var Market = $('.dataSheetCon>div:eq(0)').find('select[aname=market]').next().find('.form-check.active').find('input').val()
    var Year = $('.dataSheetCon>div:eq(0)').find('select[aname=year]').next().find('.form-check.active').find('input').val()
    // var Scenario = $('.dataSheetCon>div:eq(0)').find('select[aname=Scenario]').next().find('.form-check.active').find('input').val()
    var Category = $('.dataSheetCon>div:eq(0)').find('select[aname=cps_category_code]').next().find('.form-check.active').find('input').val()

    var Market_des = $('.dataSheetCon>div:eq(0)').find('select[aname=market]').next().find('button').attr('title')
    // 查市场金额
    var C4 = cfs.request.foundation.selectDimensionMemberByNameFunction('Category{'+ Category +'}', 'name,ud1').res.resultList[0].ud1;

    var res = cfs.request.cube.queryCubeData('mcdcapex_cube_fin','Year{'+Year+'}->Scenario{Plan}->Version{Working}->Status{FS09}->Period{YearSum}->Department{NoDept}->View{YTD}->Category{'+Category+'}->Entity{ET04}->Market{'+Market+'}->C3{C3OTH}->C4{'+C4+'}->Account{Inv06}');
    flag = true;
    if (res.res.data.length > 0 && res.res.data[0].data > 0){

        market_total = res.res.data[0].data

        // 获取市场对应的门店列表
        var sqlstr = 'select us_code from pbcs_store_master where market_city_name_en = "'+ Market_des +'"';
        var res = cfs.request.foundation.runComm(sqlstr).res

        if (res.length > 0){
            res.forEach((e, i) => {
                store_number_arr.push(e.us_code)
            })
            // store_number_arr = res[0].us_code
            flag = false;
        }
    }
    if(flag){
        // 直接锁表
        lock_table()
    }
    var sheet =spread.getSheet(0);
    
    sheet.setColumnVisible(3,false);  //隐藏列
    sheet.setColumnVisible(4,false);  //隐藏列
    var arr1 = sheet.getArray(1, 0, sheet.getRowCount(), 1);
    arr1.forEach((e, i) => {
        if(e[0]){
            var cell = sheet.getCell(i+1, 0);
            cell.backColor("White");  //区域填充色为白色
            cell.locked(true);  //区域锁定
        }
    })

    spread.resumePaint();

}
function lock_table(){
    var sheet = spread.getSheet(0);
    var Range = sheet.getRange(1, 0, sheet.getRowCount(), 1, GC.Spread.Sheets.SheetArea.viewport);
    Range.backColor("White");  //区域填充色为白色
    Range.locked(true);  //区域锁定
    var Range = sheet.getRange(1, 2, sheet.getRowCount(), 1, GC.Spread.Sheets.SheetArea.viewport);
    Range.backColor("White");  //区域填充色为白色
    Range.locked(true);  //区域锁定
}

function BeforeSave(){
    debugger
    if(flag){
        return false
    }
    spread.suspendPaint();
    if(store_number_arr && store_number_arr.length>0){
        var sheet = spread.getSheet(0);
        var startRow = 1;
        var arr1 = sheet.getArray(1, 0, sheet.getRowCount(), 1);
        var lineBorder1 = new GC.Spread.Sheets.LineBorder('red', GC.Spread.Sheets.LineStyle.thin);
        var flag1 = true;
        arr1.forEach((e, i) => {
            if(e[0] && !store_number_arr.includes(String(e[0]))){
                sheet.getRange(i+startRow, 0, 1, 1).setBorder(lineBorder1, { all: true });
                // sheet.getRange(i+startRow, statusCol-1, 1, 1).borderRight(lineBorder1);
                sheet.getRange(i+startRow-1, 0, 1, 1).borderBottom(lineBorder1);
                flag1 = false;
            }
        })
        if (!flag1){
            ForSwal("请重新确认上传的门店范围是否正确");
            spread.resumePaint();
            return false
        }
        
        var arr2 = sheet.getArray(1, 2, sheet.getRowCount(), 1);
        var sum = 0
        arr2.forEach((e, i) => {
            if(e[0]){
                sum += +(e[0])
            }
        })
        if (sum>market_total){
            ForSwal("上传总金额超出分配至该市场的预算");
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
                debugger
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
            }
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