 function Afterload(){
    $(document).on('change','input[id$=account_receivable]',function(){
        var contract_amount=0;
        $(this).parents('table[name=sub_contract_sheet]').find('input[id$=account_receivable]').each(function(i, v){
            contract_amount += +($(v).val())
        })
        $(this).parents('div[name=sub_contract_sheet]').parent().parent().find('input[id$=contract_amount]').val(contract_amount).trigger('change')
    })
    $(document).on('change','div[name=sub_contract_info] input[id$=contract_amount]',function(){
        var contract_amount=0;
        $('div[name=sub_contract_info] input[id$=contract_amount]').each(function(i, v){
            contract_amount += +($(v).val())
        })
        $('div[name=main_contract_base_info] input[id$=contract_amount]').val(contract_amount).trigger('change')
    })
}
function BeforeSave(){
    var main_contract_code=$("div[name=main_contract_base_info] input[id$='main_contract_code']").val();
    var sub_contract_obj = $("input[id$='sub_contract_code']")
    var main_code_flag = true // 如果主合同编码不存在，需要新建成员，为true
    var sub_contract_code_arr = [];

    // 如果main_contract_code不存在 对main_contract_code进行拼接
    if(!main_contract_code){
        var client=$('div[name=main_contract_base_info] select[id$=client]').val()
        var c1=$('div[name=main_contract_base_info] select[id$=c1]').val()
        var product=$('div[name=main_contract_base_info] select[id$=product]').val()
        var contract_sign_Year=parseInt($("div[name=main_contract_base_info] input[id$='contract_sign_time']").val().split('-')[0]);
    
        // 根据填的各个维度的ud1，拼主合同编码
        var client_ud1 = (cfs.request.foundation.selectDimensionMemberByNameFunction('Client{'+ client +'}', 'name,ud1').res.resultList)[0].ud1;
        var product_ud1 = (cfs.request.foundation.selectDimensionMemberByNameFunction('product{'+ product +'}', 'name,ud1').res.resultList)[0].ud1;
        var c1_ud1 = (cfs.request.foundation.selectDimensionMemberByNameFunction('C1{'+ c1 +'}', 'name,ud1').res.resultList)[0].ud1;
        main_contract_code='M_'+client_ud1+'_'+product_ud1+'_'+c1_ud1+'_'+contract_sign_Year
        $("div[name=main_contract_base_info] input[id$='main_contract_code']").val(main_contract_code).trigger('change')
        // 拼子合同编码
        debugger
        if(sub_contract_obj.length>0){
            sub_contract_obj.each(function(i, v){
                debugger
                var sub_contract_code_i = $(v).val();
                if(!sub_contract_code_i){
                    sub_contract_code_i='S_'+client_ud1+'_'+product_ud1+'_'+c1_ud1+'_'+(contract_sign_Year+i)
                }
                $(v).val(sub_contract_code_i).trigger('change');
                sub_contract_code_arr.push(sub_contract_code_i)
            })
        }
    }else{
        main_code_flag = false
        // 如果主合同编码已经有了，检查自合同编码是否有空的，如果有空的，需要给一个值
        if(sub_contract_obj.length>0){
            last_year = parseInt(main_contract_code.substring(main_contract_code.length-4,main_contract_code.length))-1
            sub_contract_obj.each(function(i, v){
                var sub_contract_code_i = $(v).val();
                if(sub_contract_code_i){
                    i_year = parseInt(sub_contract_code_i.substring(sub_contract_code_i.length-4,sub_contract_code_i.length))
                    last_year = Math.max(i_year, last_year)
                }else{
                    last_year += 1
                    sub_contract_code_i = 'S'+main_contract_code.substring(1,main_contract_code.length-4)+last_year
                    $(v).val(sub_contract_code_i).trigger('change');
                    sub_contract_code_arr.push(sub_contract_code_i)
                }
            })
        }
    }
    

    // 等待保存是否成功的信息，如果成功再进行维度成员操作
    var SaveVar = setInterval(function(){ waitSave() }, 100);
    function waitSave(){
      if ($('div#jGrowl .bg-danger').length > 0){
        // 保存失败
        clearInterval(SaveVar);
      }else if($('div#jGrowl .bg-teal').length > 0){
        // 保存成功
        AfterSave(main_code_flag, main_contract_code, sub_contract_code_arr, contract_sign_Year);
        clearInterval(SaveVar);
      }
    }
}

function AfterSave(main_code_flag, main_contract_code, sub_contract_code_arr, contract_sign_Year){
    var sales_staff=$("div[name=main_contract_base_info] input[id$='sales_staff']").val();
    var project_staff=$("div[name=main_contract_base_info] input[id$='project_staff']").val();
    var project_name = $('div[name=main_contract_base_info] input[id$=project_name]').val();
    var contract_amount = $('div[name=main_contract_base_info] input[id$=contract_amount]').val();
    var main_contract_code_sub = 'S_'+main_contract_code
    // 判断主合同是新增还是修改
    if(main_code_flag){
        // 新增
        var dimension_member_list = '[{"id":null,"parent_name":"TotalProject","name":"'+main_contract_code+'","description_1":"'+project_name+'","description_2":"'+project_name+'","aggweight":"1","sharedmember":false,"is_active":true,"is_calculated":false,"ud1":"'+main_contract_code+'","ud2":"'+sales_staff+'","ud3":"'+project_staff+'","ud4":"'+contract_amount+'"}]'
        var res = cfs.request.foundation.saveDimensionMember('Project', dimension_member_list)
        var dimension_member_list = '[{"id":null,"parent_name":"'+main_contract_code+'","name":"'+main_contract_code_sub+'","description_1":"'+project_name+'","description_2":"'+project_name+'","aggweight":"1","sharedmember":false,"is_active":true,"is_calculated":false,"ud1":"'+main_contract_code_sub+'","ud2":"'+sales_staff+'","ud3":"'+project_staff+'","ud4":"'+contract_amount+'"}]'
        var res = cfs.request.foundation.saveDimensionMember('Project', dimension_member_list)
    }else{
        // 修改
        var update_dimension='{"name":"'+main_contract_code+'","description_1":"'+project_name+'","description_2":"'+project_name+'","ud1":"'+main_contract_code+'","ud2":"'+sales_staff+'","ud3":"'+project_staff+'","ud4":'+contract_amount+'}'
        var res = cfs.request.foundation.updateDimensionMemberAttribute('Project',update_dimension)
        var update_dimension='{"name":"'+main_contract_code_sub+'","description_1":"'+project_name+'","description_2":"'+project_name+'","ud1":"'+main_contract_code_sub+'","ud2":"'+sales_staff+'","ud3":"'+project_staff+'","ud4":'+contract_amount+'}'
        var res = cfs.request.foundation.updateDimensionMemberAttribute('Project',update_dimension)
    }

    cfs.request.python.job('project_overview_tocube', {main_contract_code:main_contract_code})
    // 主合同签约金额和数量进cube
    // var contract_sign_Period=parseInt($("div[name=main_contract_base_info] input[id$='contract_sign_time']").val().split('-')[1]);
    // var Scenario='Actual'
    // var Version=$("div[name=main_contract_base_info] select[id$='Version']").val();
    // var View='Periodic'
    // var entity=$('div[name=main_contract_base_info] select[id$=entity]').val()
    // var region=$('div[name=main_contract_base_info] select[id$=region]').val()
    // var industry=$('div[name=main_contract_base_info] select[id$=industry]').val()
    // var mode=$('div[name=main_contract_base_info] select[id$=mode]').val()
    // var c1=$('div[name=main_contract_base_info] select[id$=c1]').val()
    // var c2=$('div[name=main_contract_base_info] select[id$=c2]').val()
    // var c3=$('div[name=main_contract_base_info] select[id$=c3]').val()
    // var Channel=$('div[name=main_contract_base_info] select[id$=Channel]').val()
    // var client=$('div[name=main_contract_base_info] select[id$=client]').val()
    // var product=$('div[name=main_contract_base_info] select[id$=product]').val()

    // var querdetail =cfs.request.foundation.queryCubeInfoAndDetail('project_cube_v2')
    // var cube_id=querdetail.res.resultObj.cube_info.id
    // var cont_dictArray = [{ columnDimensionMemberMap: {Year:contract_sign_Year,Period:contract_sign_Period,Scenario: Scenario, Version: Version, View: View, Project: main_contract_code_sub, Entity: entity, Client: client, Region: region, Industry: industry, Product: product, Mode: mode, C1: c1, C2: c2, C3: c3,Channel:Channel, Account: 'DA010', data: contract_amount } }]
    // cont_dictArray.push({columnDimensionMemberMap:{Year:contract_sign_Year,Period:contract_sign_Period,Scenario:Scenario,Version:Version,View:View,Project:main_contract_code_sub,Entity:entity,Client:client,Region:region,Industry:industry,Product:product,Mode:mode,C1:c1,C2:c2,C3:c3,Channel:Channel,Account:'DA011',data:1}})
    // var data_string=[{rowDatas:cont_dictArray,cubeId:cube_id}]
    // var save1 =cfs.request.cube.save(data_string)


    var sub_contract_obj = $("input[id$='sub_contract_code']")
    // 遍历子合同，判断新增还是修改
    sub_contract_obj.each(function(i, v){
        debugger
        var sub_contract_code_i = $(v).val();
        contract_amount = $(v).parent().parent().parent().find('input[id$=contract_amount]').val()
        if(sub_contract_code_arr.includes(sub_contract_code_i)){
            // 新增
            var dimension_member_list = '[{"id":null,"parent_name":"'+main_contract_code+'","name":"'+sub_contract_code_i+'","description_1":"'+project_name+'","description_2":"'+project_name+'","aggweight":"1","sharedmember":false,"is_active":true,"is_calculated":false,"ud1":"'+sub_contract_code_i+'","ud2":"'+sales_staff+'","ud3":"'+project_staff+'","ud4":"'+contract_amount+'"}]'
            var res = cfs.request.foundation.saveDimensionMember('Project', dimension_member_list)
        }else{
            // 修改
            var update_dimension='{"name":"'+sub_contract_code_i+'","description_1":"'+project_name+'","description_2":"'+project_name+'","ud1":"'+sub_contract_code_i+'","ud2":"'+sales_staff+'","ud3":"'+project_staff+'","ud4":'+contract_amount+'}'
            var res = cfs.request.foundation.updateDimensionMemberAttribute('Project',update_dimension)
        }
        // var sub_contract_sheet_tr = $(v).parent().parent().parent().find('table[name=sub_contract_sheet] tbody tr')
        // sub_contract_sheet_tr.each(function(j, e){
        //     var date = $(e).find('input[id$=collection_date]').val()
        //     var sub_contract_year = parseInt(date.split('-')[0]);
        //     var sub_contract_period = parseInt(date.split('-')[1]);
        //     var account_receivable = $(e).find('input[id$=account_receivable]').val()
        //     var sub_dictArray = [{ columnDimensionMemberMap: {Year:sub_contract_year,Period:sub_contract_period,Scenario: Scenario, Version: Version, View: View, Project: sub_contract_code_i, Entity: entity, Client: client, Region: region, Industry: industry, Product: product, Mode: mode, C1: c1, C2: c2, C3: c3,Channel:Channel, Account: 'DA001', data: account_receivable } }]
        //     sub_dictArray.push({columnDimensionMemberMap:{Year:sub_contract_year,Period:sub_contract_period,Scenario:Scenario,Version:Version,View:View,Project:sub_contract_code_i,Entity:entity,Client:client,Region:region,Industry:industry,Product:product,Mode:mode,C1:c1,C2:c2,C3:c3,Channel:Channel,Account:'DA013',data:1}})
        //     var data_string=[{rowDatas:sub_dictArray,cubeId:cube_id}]
        //     var save1 =cfs.request.cube.save(data_string)
        // })
    })

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