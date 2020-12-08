function Beforeload(){
    spread.suspendPaint();
    var sheet =spread.getSheet(1);
    
    var rowCount = sheet.getRowCount();
    // strFormula=''
    // var startRow =3 ;
    // // var ColQ1 = 'D';

    // strFormula += 'L' + (startRow+1) + ':' + 'L' + rowCount +'*'+'M'+(startRow+1)+':'+'M'+rowCount;

    // debugger;

    // // // 设置区域公式
    // sheet.setArrayFormula(3, 13, rowCount-3, 1, 'IFERROR(IF('+strFormula+'=0,"",'+strFormula+'),"")');  
    // // sheet.setArrayFormula(1, 19, rowCount-1, 1, 'IFERROR(IF('+strFormula1+'=0,"",'+strFormula1+'),"")');
    var sqlstr = 'select min_bud_category,sum(proj_cur_ver) total  from app1_apply_info_to_be  where bud_category="Store Deployment"  and min_bud_category !="Pooling-Store CapEx" group by min_bud_category';
    var res = cfs.request.foundation.runComm(sqlstr).res
    var l_keys = []
    for (var i = 0, length = res.length; i < length; i++) {
        l_keys.push(Object.values(res[i]))
    }
    var startRow =4 ;
    endrow=17
    for(i=0;i<=29;i++){
    strFormula=''
    strFormula += 'L' + (startRow) + ':' + 'L' + endrow +'*'+'M'+startRow+':'+'M'+endrow;
    sheet.setArrayFormula(startRow-1, 13, 14, 1, 'IFERROR(IF('+strFormula+'=0,"",'+strFormula+'),"")');
    startRow+=15
    endrow+=15
    }
    
    var l1 = ['IoT','NP#','RAM'];
    var cm = spread.commandManager(); 
    var l2 = ['IoT','NP#','RAM','Office PC & Others']
    var arr = sheet.getArray(1, 0, rowCount-1, 2);
    var arr1 = sheet.getArray(1,4, rowCount-1, 2);
    arr.forEach((e, i) => {
        if (e[0]) {
            {
                if (e[1]=='TotalChina'){
                sheet.getCell(i+1, 11).backColor("White"); //  区域底色变白
                sheet.getCell(i+1, 12).backColor("White"); //  区域底色变白
                sheet.getCell(i+1, 13).backColor("White"); //  区域底色变白
                sheet.getCell(i+1, 11).locked(true);  //区域锁定
                sheet.getCell(i+1, 12).locked(true);  //区域锁定
                sheet.getCell(i+1, 13).locked(true);  //区域锁定}
                for (var j = 0, length = l_keys.length; j < length; j++) {
                        if (e[0] == l_keys[j][1]) {
                            sheet.setValue(i + 1, 13, l_keys[j][0]);
                            // if (local_sum > l_keys[j][0]) { flag = false }
                            // sheet.getCell(i+1, 13).backColor("White"); //  区域底色变白
                        }
                    }
                }
                // if (l2.includes(e[0])&&e[1]!='TotalChina'){
                    if (e[1]!='TotalChina'){
                    if (e[0]=='Office PC & Others')
                    {
                        console.log(e)
                        // cm.execute({cmd: "editCell", row:e.row, col:e.col+7, newValue: e[0], sheetName: sheet.name()});
                        cm.execute({cmd: "editCell", row:(i+1), col:13, newValue: arr1[i][0], sheetName: sheet.name()});
                        sheet.getCell(i+1, 11).backColor("White"); //  区域底色变白
                        sheet.getCell(i+1, 12).backColor("White"); //  区域底色变白
                        sheet.getCell(i+1, 13).backColor("White"); //  区域底色变白
                        sheet.getCell(i+1, 11).locked(true);  //区域锁定
                        sheet.getCell(i+1, 12).locked(true);  //区域锁定
                        sheet.getCell(i+1, 13).locked(true);  //区域锁定}
                        debugger;

                    }
                     else{   
                sheet.getCell(i+1, 13).backColor("White"); //  区域底色变白
                // sheet.getCell(i+1, 11).locked(true);  //区域锁定
                // sheet.getCell(i+1, 12).locked(true);  //区域锁定
                sheet.getCell(i+1, 13).locked(true);  //区域锁定}

                // sheet.setFormula(i-1,13,'IFERROR(IF('+strFormula2+'=0,"",'+strFormula2+'),"")')
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
    }
    )
    
    
    // var endLine = sheet.getRowCount();  // 结束行号
    // var startLine = 3
    // var endCol = sheet.getColumnCount()
    // sheet.setArrayFormula(3, 8, endLine-3, 1, 'IFERROR(E4:E'+ endLine + '-H4:H' + endLine+',0)');  //i列=E列-H列
    // sheet.setArrayFormula(3, 10, endLine-3, 1, 'IFERROR(IF((B4:B'+ endLine + ')="TotalChina",IF((J4:J'+ endLine + ')="","",J4:J'+ endLine + '-H4:H' + endLine+'),""),"")');  //K列=j列-h列
    // var arr_market = sheet.getArray(3, 1, endLine-3, 1);
    // var arr_ranges = [new GC.Spread.Sheets.Range(3, 10, endLine-3, 1)];
    // arr_market.forEach((v,i)=>{
    //     if(v[0] && v[0]=='TotalChina'){
    //         arr_ranges.push(new GC.Spread.Sheets.Range(i+3, 8, 1, 1))
    //     }
    // })
    // var iconSetRule = new GC.Spread.Sheets.ConditionalFormatting.IconSetRule();
    // iconSetRule.ranges(arr_ranges);
    // // iconSetRule.ranges([new GC.Spread.Sheets.Range(3, 10, endLine-3, 1)]);
    // iconSetRule.iconSetType(GC.Spread.Sheets.ConditionalFormatting.IconSetType.threeTrafficLightsUnrimmed);
    // var iconCriteria = iconSetRule.iconCriteria();
    // iconCriteria[0] = new GC.Spread.Sheets.ConditionalFormatting.IconCriterion(true, GC.Spread.Sheets.ConditionalFormatting.IconValueType.number, 0);
    // iconCriteria[1] = new GC.Spread.Sheets.ConditionalFormatting.IconCriterion(true, GC.Spread.Sheets.ConditionalFormatting.IconValueType.number, 0);
    // iconSetRule.reverseIconOrder(false);
    // iconSetRule.showIconOnly(false);
    // sheet.conditionalFormats.clearRule();
    // sheet.conditionalFormats.addRule(iconSetRule);
    // for (var i = startLine; i <= endLine; i++) {
    //     if (sheet.getValue(i, 1) === "TotalChina") {
    //         sheet.getRange(i, 1, 1, endCol, GC.Spread.Sheets.SheetArea.viewport).font('bold normal 12px normal');
    //     }
    // }
    // sheet.setValue(0,8,"Var");  //将I1文本替换为TA Type
    // sheet.setValue(0,10,"Var");  //将K1文本替换为TA Type
    // var endLine = sheet.getRowCount();
    // // Office PC & Others起始结束行
    // var OCOStartLine;
    // var OCOEndLine;
    // for (var i = 3; i <= endLine; i++) {
    //     if(sheet.getValue(i, 0) == "Office PC & Others"){
    //         if(!OCOStartLine){
    //             OCOStartLine = i;
    //         }else if(i == endLine || sheet.getValue(i+1, 0) != "Office PC & Others"){
    //             OCOEndLine = i;
    //         }
    //     }else if(sheet.getValue(i, 1) == "TotalChina") {
    //         sheet.setFormula(i,6,'IFERROR(IF(H'+(i+1)+'/F'+(i+1)+'=0,"",H'+(i+1)+'/F'+(i+1)+'),"")')
    //     }else{   
    //         sheet.setFormula(i,7,'IFERROR(IF(F'+(i+1)+'*G'+(i+1)+'=0,"",F'+(i+1)+'*G'+(i+1)+'),"")')
    //     }
    // }
    // var Range = sheet.getRange(OCOStartLine, 5, OCOEndLine-OCOStartLine, 1, GC.Spread.Sheets.SheetArea.viewport);
    // Range.backColor("White");  //区域填充色为白色
    // Range.locked(true);  //区域锁定
    // var Range = sheet.getRange(OCOStartLine, 7, OCOEndLine-OCOStartLine, 1, GC.Spread.Sheets.SheetArea.viewport);
    // Range.backColor("rgb(255,243,201)");  
    // Range.locked(false);  
    
    //     //隐藏第i列至最后一列的所有无数据列
    // for (var i = 9;i<endCol;i++){
    //     HideNullCol(sheet,startLine,endLine,i);
    // }
    
    spread.resumePaint();
}
function BeforeSave() {

    spread.suspendPaint();
    var sheet = spread.getSheet(1);

    var rowCount = sheet.getRowCount();
    var sqlstr = 'select min_bud_category,sum(proj_cur_ver) total  from app1_apply_info_to_be  where bud_category="Store Deployment"  and min_bud_category !="Pooling-Store CapEx" group by min_bud_category';
    var res = cfs.request.foundation.runComm(sqlstr).res
    var l_keys = []
    for (var i = 0, length = res.length; i < length; i++) {
        l_keys.push(Object.values(res[i]))
    }
    var arr = sheet.getArray(1, 0, rowCount - 1, 2);
    var flag=true
    arr.forEach((e, i) => {
        if (e[0]) {
            {
                if (e[1] == 'TotalChina') {
                    var arr_l = sheet.getArray(i - 14, 13, 14, 1)
                    local_sum = 0
                    for (var j = 0, length = arr_l.length; j < length; j++) {
                        local_sum += arr_l[j][0]
                    }
                    debugger;
                    for (var j = 0, length = l_keys.length; j < length; j++) {
                        if (e[0] == l_keys[j][1]) {
                            if (local_sum > l_keys[j][0]) { flag = false };
                            debugger;
                            // sheet.getCell(i+1, 13).backColor("White"); //  区域底色变白
                        }
                    }
                }
            }
        }
    }
    )

    if (!flag){
        ForSwal("请重新确认上传的门店范围是否正确");
        spread.resumePaint();
        return false
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