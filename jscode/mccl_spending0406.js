// 项目概览
var projectName = {};
var maketData = [];
var data1 = [];//已完成
var data2 = [];//在途
var data3 = [];//已报价
var getProjectData = [];
var moduleId1 = "";
var moduleId2 = "";
var moduleId3 = "";
var module2MainData = {};
var dataTest = {};
var myChart;
// debugger;
// var proj_year = cfs.request.foundation.queryonevariableinfo('ProjYear').res.resultObj.value 
$.getScript("/js/plugins/tableExport.js");  //加载js文件
$.getScript("/js/plugins/xlsx.full.min.js");  //加载js文件
$(document).ready(function () {

});
// 获取项目名称及数据
function getProjectDF() {
    var year = $("#yearSelectId").val();
    var yearObj = {};
    yearObj["Year"] = year;
    var pythonRequset = cfs.request.python.web("by_market_eps_actual_TotalAccount_Project", yearObj);
    if (pythonRequset.res.result !== "") {
        dataTest = JSON.parse(pythonRequset.res.result);
        debugger;
        projectName = {};
        $.each(dataTest.projectView.Ydata1, function (k, v) {
            $.each(v, function (k1, v1) {
                projectName[k1] = v1;
            })
        })
        console.log(dataTest)
    } else {
        dataTest = {};
    }
    // 订单明细报告下载
    var exportIHtml = `<span style="position: absolute;right: 251px;top: 10.5px;margin-right: 50px;cursor: pointer;" onclick="tableExportFunction();"><i class="icon-download4" style="margin-right: 6px;""></i>EPS订单明细下载</span>`;
    $($(".dashBoardContent .dataSheet:nth-child(3)").children()[1]).css("position", "relative");
    $($(".dashBoardContent .dataSheet:nth-child(3)").children()[1]).append(exportIHtml);
}
// 订单明细报告下载
function tableExportFunction() {
    var status = $(".elementIframe").contents().find("select[data-valuekey='eps_actual_order']+div button").attr("title")
    // var all_status=$(".elementIframe").contents().find("select[name='Order Status']+div").text()
    var all_status = "供应商已报价 业务部门已确认 DOA已审批 供应商已提供服务 已评价服务"
    var status_Array = []
    if (status && all_status) {
        status_Array = status.split(", ")
        status_Array = (status_Array[0] == "-" ? all_status.split(" ") : status_Array)
    }

    var market = $("select[id='marketSelectId']").val()
    var category = $("select[id=projectSelectId]").val()

    $(".loadingicon").show();
    var downloadSQL = `
    SELECT order_actual_year AS 年份,
    department AS 部门 ,
    project_number AS EPS项目编号,
    project_name AS EPS项目名称,
    project_name1 AS CPS项目名称, 
    flow_type_name AS 流程, 
    market AS 市场, 
    order_type as 订单类型,
    order_number AS 订单编号,
    store_number AS 门店编号,
    store_name AS 门店名称, 
    vendor_number AS 供应商编码,
    vendor_name AS 供应商名称,
    order_money_notax AS 不含税金额,
    Process1 AS 订单节点,
    Process AS 节点对应状态,
    order_state_name AS 订单待执行操作,
    next_participants AS 待执行人, 
    next_groups AS 待执行实体,
    create_by AS 创建人EID,
    create_by_name AS 创建人, 
    update_by AS 更新人EID,
    update_date AS 更新日期, 
    order_date AS 拆单日期 
    FROM (SELECT a.* FROM
    (SELECT * from mcdcapex.t_eps_actual_data_cps_actual  WHERE order_actual_year='${$("#yearSelectId").val()}' and category_code ='CTNS' and StoreStatus='Opened'
    union all
    SELECT * from mcdcapex.t_eps_actual_data_cps_actual  WHERE order_actual_year='${$("#yearSelectId").val()}' and category_code !='CTNS') a WHERE category_code ='${category}' and market ='${market}' and Process1 IN ${JSON.stringify(status_Array).replace("[", "(").replace("]", ")")} ) b`;
    var resDownload = cfs.request.foundation.runComm(downloadSQL);
    var theadData = ['年份', '部门', 'EPS项目编号', 'EPS项目名称', 'CPS项目名称', '流程', '市场', '订单类型', '订单编号',
        '门店编号', '门店名称', '供应商编码', '供应商名称', '不含税金额','订单节点',
        '节点对应状态', '订单待执行操作', '待执行人', '待执行实体', '创建人EID', '创建人', '更新人EID', '更新日期', '拆单日期'];
    if (resDownload.res.length !== 0) {
        cfs.export.toCsv("EPS_Actual_Data_Download",resDownload.res,theadData);
        // cfs.export.toXlsx("EPS_Actual_Data_Download", resDownload.res, null, function (spread) {
            //填充完data数据后的自定义spread操作
            // var sheet = spread.getSheet(0);
            // sheet.setRowCount(1000)
            // sheet.setValue(0, 0, "100");
            // sheet.setValue(0, 1, "100");
        // });
    } else {
        $.jGrowl('', {
            header: "暂无数据下载",
            theme: 'alert-styled-left bg-danger'
        });
    }
    $(".loadingicon").hide();
}
// 项目概览
function renderModule1(data, params) {
    domLoadingShow();
    var componentId = $(".dashBoardContent .dataSheet:nth-child(1) div .card .echart").attr("id");
    $(document).ready(function () {
        $('.select').select2({
            minimumResultsForSearch: Infinity
        });
        $("#pageRenderPage").on("select2:open", function (e) {
            $(".select2-results").css("width", "134px");
        });
    });
    var selectHtml = "";
    selectHtml += `<div class="form-group row" style="margin-left:5px;">
                        <div class="col-lg-6">
                            <div class="row">
                                <label class="col-form-label text-lg-left" style="padding-top:4px;">年份</label>
                                <div class="col-lg-2">
                                    <select class="form-control select" data-fouc id="yearSelectId" data-placeholder="请选择" onchange="yearChange('${componentId}');">
                                        <option value="${proj_year}">${proj_year}</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <i class="loadingicon mr-1 icon-spinner2 spinner" style="position: absolute;right: 192px;top: 14px;display:none;"></i>
                    <span style="position: absolute;right: 67px;top: 11px;margin-right:4px;cursor: pointer;" id="download4"> <i class="icon-download4" style="margin-right: 6px;"></i>EPS订单全部明细下载</span>
                    <div id="echats1" style="height:416px;"></div>`;
    selectHtml += `
        <table id="noneExportTable" style="display:none;">
            <thead>
            
            </thead>
            <tbody>

            </tbody>
        </table>
    `;
    $("#" + componentId).append(selectHtml);
    var yearSQL = "select name from app1_di8_table_dimension where parent_name='TotalYear'";
    var resYear = cfs.request.foundation.runComm(yearSQL);
    var html = "";
    $.each(resYear.res, function (k, v) {
        html += `<option value="${v.name}">${v.name}</option>`;
    });
    $("#yearSelectId").html(html);
    var proj_year = cfs.request.foundation.queryonevariableinfo('ProjYear').res.resultObj.value;
    // var proj_year = "2020"; 
    $("#yearSelectId").val(proj_year).select2();
    myChart = echarts.init(document.getElementById("echats1"));
    getProjectDF();
    renderData1();
    renderModule2();
    renderModule3();
    setTimeout(function () {
        refreshTable("1");
    }, 500)
    $("#download4").click(function () {
        $(".loadingicon").show();
        setTimeout(function () {
            // var test = `SELECT * FROM mcdcapex.t_eps_actual_data_cps_actual WHERE department='BE'`;
            console.log(projectName)
            var projectArray = [];
            $.each(projectName, function (k, v) {
                projectArray.push(k);
            });
            var downloadSQL = `
                SELECT order_actual_year AS 年份,
                department AS 部门 ,
                project_number AS EPS项目编号,
                project_name AS EPS项目名称,
                project_name1 AS CPS项目名称, 
                flow_type_name AS 流程, 
                market AS 市场, 
                order_type as 订单类型,
                order_number AS 订单编号,
                store_number AS 门店编号,
                store_name AS 门店名称, 
                vendor_number AS 供应商编码,
                vendor_name AS 供应商名称,
                order_money_notax AS 不含税金额,
                Process1 AS 订单节点,
                Process AS 节点对应状态,
                order_state_name AS 订单待执行操作,
                next_participants AS 待执行人, 
                next_groups AS 待执行实体,
                create_by AS 创建人EID,
                create_by_name AS 创建人, 
                update_by AS 更新人EID,
                update_date AS 更新日期, 
                order_date AS 拆单日期 
								FROM (SELECT a.* FROM
								(SELECT * from mcdcapex.t_eps_actual_data_cps_actual  WHERE order_actual_year='${$("#yearSelectId").val()}' and category_code ='CTNS' and StoreStatus='Opened'
								union all
								SELECT * from mcdcapex.t_eps_actual_data_cps_actual  WHERE order_actual_year='${$("#yearSelectId").val()}' and category_code !='CTNS') a WHERE category_code in ${JSON.stringify(projectArray).replace("[", "(").replace("]", ")")} and market in ${JSON.stringify(maketData).replace("[", "(").replace("]", ")")}) b
								`;
            var resDownload = cfs.request.foundation.runComm(downloadSQL);
            var theadData = ['年份', '部门', 'EPS项目编号', 'EPS项目名称', 'CPS项目名称', '流程', '市场', '订单类型', '订单编号',
                '门店编号', '门店名称', '供应商编码', '供应商名称', '不含税金额','订单节点',
                '节点对应状态', '订单待执行操作', '待执行人', '待执行实体', '创建人EID', '创建人', '更新人EID', '更新日期', '拆单日期'];
            if (resDownload.res.length !== 0) {
                cfs.export.toCsv("EPS_Actual_Data_Download", resDownload.res, theadData);
            } else {
                $.jGrowl('', {
                    header: "暂无数据下载",
                    theme: 'alert-styled-left bg-danger'
                });
            }
            $(".loadingicon").hide();
        }, 800)
    });
}
// 项目进度概览
function renderModule2(data, params) {
    var componentId = $(".dashBoardContent .dataSheet:nth-child(2) div .card .echart").attr("id");
    $(document).ready(function () {
        $('.select').select2({
            minimumResultsForSearch: Infinity
        });
        $("#pageRenderPage").on("select2:open", function (e) {
            $(".select2-results").css("width", "134px");
        });
    });
    var html = "";
    html += `<div class="form-group row" style="margin-left:5px;">
                        <div class="col-lg-6">
                            <div class="row">
                                <label class="col-form-label text-lg-left" style="padding-top:4px;">项目</label>
                                <div class="col-lg-6">
                                    <select class="form-control select" data-fouc id="projectSelectId" data-placeholder="请选择" onchange="projectselectChange();">
                                        
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>`;
    html += `
        <div class="row">
            <div class="col-lg-6">
                <div class="row" style="padding:0;">
                    <div class="" style="padding: 0;margin-right: 2%;width: 65%;">
                        <div class="card row-1-card height1" style="margin-bottom: 0;height: 100%;color:#000;">
                            <div class="card-body" style="background-color: #f6f5ec;padding: 1.25rem 0.5rem;">
                                <div class="row" id="Category_item">
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="card mb-0" style="width: 33%;padding: 5px;color:#000;background-color: #f6f5ec;">
                        <div>
                            <span class="font-size-sm opacity-100 mr-2" style="font-weight: bold;font-size: 14px;">节点</span>
                            <span class="font-size-sm opacity-100 mr-2" style="float: right;font-weight: bold;font-size: 14px;">对应状态</span>
                        </div>
                        <div>
                            <span class="font-size-sm opacity-100 mr-2">1. 供应商已报价</span>
                            <span class="font-size-sm opacity-100 mr-2" style="float: right;">已报价</span>
                        </div>
                        <div>
                            <span class="font-size-sm opacity-100 mr-2">2. 业务部门已确认</span>
                            <span class="font-size-sm opacity-100 mr-2" style="float: right;">在途</span>
                        </div>
                        <div>
                            <span class="font-size-sm opacity-100 mr-2">3. DOA已审批</span>
                            <span class="font-size-sm opacity-100 mr-2" style="float: right;">在途</span>
                        </div>
                        <div>
                            <span class="font-size-sm opacity-100 mr-2">4. 供应商已提供服务</span>
                            <span class="font-size-sm opacity-100 mr-2" style="float: right;">在途</span>
                        </div>
                        <div>
                            <span class="font-size-sm opacity-100 mr-2">5. 已评价服务</span>
                            <span class="font-size-sm opacity-100 mr-2" style="float: right;">已完成</span>
                        </div>
                    </div>
                </div>
                <div class="row" style="position: relative;">
                    <span class="mt-2 mb-2" style="margin-right: 6px;position: absolute;right:185px;cursor: pointer;" onclick="moduleTableExport()"><i class="icon-download4 mr-2"></i>当前项目进度概览下载</span>
                    <span class="mt-2 mb-2" style="margin-right: 6px;position: absolute;right: 0px;cursor: pointer;" onclick="allmoduleTableExport()"><i class="icon-download4 mr-2"></i>所有项目进度概览下载</span>
                    <table class="table table-hover datatable-highlight dataTable no-footer table-striped" style="font-size:12px;" id="table2">
                        <thead>
                        
                        </thead>
                        <tbody id="scrollTbody">
                            
                        </tbody>
                    </table>
                    <<div id="exportTable2" style="width: 600px;height: 600px;display:none;"></div>
                </div>
            </div>
            <div class="col-lg-6" id="echarts3" style="height:556px;margin-top: -24px;">
               
            </div>
        </div>
    `;
    $("#" + componentId).html(html);
    // 项目下拉框数据
    var selecthtml = "";
    $.each(projectName, function (k, v) {
        if (k !== "" && k !== "项目总进度") {
            selecthtml += `<option value="${k}">${v}</option>`;
        }
    });
    $("#projectSelectId").html(selecthtml);
    $("#projectSelectId").on('select2:open', function (e) {
        $(".select2-container").removeClass("select2-container--default");
    });
    setTimeout(function () {
        module2Main();
    }, 500)
}
// 项目概览表格下载
function moduleTableExport() {
    var newArray = [];
    $.each(module2MainData.leftData.table, function (k, v) {
        var obj = {};
        $.each(v, function (k1, v1) {
            obj[module2MainData.leftData.tHeadData[k1]] = v1;
        });
        newArray.push(obj);
    })
    cfs.export.toXlsx("Project_Progress_by_Market_Download", newArray)
}
// 全部项目下载
function allmoduleTableExport() {
    var headerArray = [];
    var newArray = [];
    headerArray.push("项目")
    $.each(module2MainData.leftData.tHeadData, function (k, v) {
        headerArray.push(v);
    });
    var copyData = JSON.parse(JSON.stringify(projectName));
    var copyDataTest = JSON.parse(JSON.stringify(dataTest));
    $.each(copyData, function (k, v) {
        if (copyDataTest.projectView2[k] !== undefined) {
            $.each(copyDataTest.projectView2[k].leftData.table, function (k1, v1) {
                v1.unshift(v);
                newArray.push(v1);
            });
        }
    });
    console.log(newArray)
    var spread = new GC.Spread.Sheets.Workbook(document.getElementById('exportTable2'), { sheetCount: 1 });
    var sheet = spread.getSheet(0);
    sheet.suspendPaint();
    // sheet.rows =1000000 //设置行数
    sheet.setRowCount(1000)
    sheet.setArray(0, 0, [headerArray]);
    sheet.setArray(1, 0, newArray);
    var index = 1;
    $.each(copyData, function (k, v) {
        if (copyDataTest.projectView2[k] !== undefined) {
            let rowCount = copyDataTest.projectView2[k].leftData.table.length;
            sheet.addSpan(index, 0, rowCount, 1);
            index = index + 14;
        }
    });
    $.each(newArray,function(k,v){
        spread.getActiveSheet().setFormatter(k+1,newArray[0].length-1,"0%");
    });
    var endLine = sheet.getRowCount(); 
    var endCol = sheet.getColumnCount(); 
    sheet.getRange(0, 0, endLine, endCol).font('14px Calibri')
    var excelIo = new GC.Spread.Excel.IO();
    var json = spread.toJSON();
    excelIo.save(json, function (blob) {
        saveAs(blob, "Project_Progress_by_Market_Download" + ".xlsx");
    }, function (e) {
        console.log(e);
    });
    // sheet.addSpan(1, 0, 13, 1);
    // sheet.addSpan(14, 0, 13, 1);
    // sheet.addSpan(27, 0, 13, 1);
    // sheet.addSpan(40, 0, 13, 1);
    sheet.resumePaint();
}
// 项目进度概览主体部分数据
function module2Main() {
    var year = $("#yearSelectId").val();
    var category = $("#projectSelectId").val();
    var paramObj = {};
    module2MainData = {};
    paramObj["Year"] = year;
    paramObj["Category"] = category;
    var data = {};
    if (Object.keys(dataTest).length !== 0) {
        data = dataTest.projectView2[category];
        module2MainData = dataTest.projectView2[category];
    }
    $("#table2").html(`<thead>
                        
    </thead>
    <tbody id="scrollTbody">
        
    </tbody>`);
    var html = "";
    if (data !== undefined && Object.keys(data).length !== 0) {
        $.each(data.leftData.obj1, function (k, v) {
            html += `
                    <div class="col-lg-4" style="display: inline-block;padding: 0.2rem;">
                        <span class="font-size-sm opacity-100" style="font-weight: 800;font-size: 14px;">${year} ${v.title}</span>
                        <div>
                            <span class="font-size-sm opacity-100" style="font-size: 12px;">店数</span>
                            <span class="font-size-sm opacity-100" style="float: right;font-size: 12px;">${format(v.stores) || ""}</span>
                        </div>
                        <div>
                            <span class="font-size-sm opacity-100" style="font-size: 12px;">单店投资</span>
                            <span class="font-size-sm opacity-100" style="float: right;font-size: 12px;">${format(v.singleStoreInvest) || ""}</span>
                        </div>
                        <div>
                            <span class="font-size-sm opacity-100" style="font-size: 12px;">总投资</span>
                            <span class="font-size-sm opacity-100" style="float: right;font-size: 12px;">${format(v.totalInvestment) || ""}</span>
                        </div>
                    </div>
                `;
        })
        $("#Category_item").html(html);
        var tableHeadHtml = "<tr style='background: #fff;text-align: center;'>";
        var tableBodyHtml = "";
        var exportTableHtml = "";
        $.each(data.leftData.tHeadData, function (k, v) {
            tableHeadHtml += `
                <th style="font-weight: 700;width:100px;">${v} </th>
            `;
        });
        tableHeadHtml += "</tr>";
        $("#table2 thead").html(tableHeadHtml);
        $.each(data.leftData.table, function (k, v) {
            if (k == data.leftData.table.length - 1) {
                tableBodyHtml += "<tr onclick='tdClick(this)' style='font-weight: bold;'>";
                exportTableHtml += "<tr onclick='tdClick(this)' style='font-weight: bold;'>";
            } else {
                tableBodyHtml += "<tr onclick='tdClick(this)'>";
                exportTableHtml += "<tr onclick='tdClick(this)'>";
            }
            $.each(v, function (k1, v1) {
                var styleRight = "";
                if (k1 == 0) {
                    styleRight = "text-align: center;";
                } else {
                    styleRight = "text-align: right;";
                }
                if (k1 == 8) {
                    tableBodyHtml += `
                        <td style="${styleRight}">${Math.round(v1 * 100)} %</td>
                    `;
                    exportTableHtml += `
                        <td style="${styleRight}">${Math.round(v1 * 100)} %</td>
                    `;
                } else {
                    tableBodyHtml += `
                        <td style="${styleRight}">${format(v1)}</td>
                    `;
                    exportTableHtml += `
                        <td style="${styleRight}">${v1}</td>
                    `;
                }
            })
            tableBodyHtml += "</tr>";
            exportTableHtml += "</tr>";
        });
        $("#table2 tbody").html(tableBodyHtml);
        var dataTable = $('#table2').DataTable({
            destroy: true,
            bFilter: false,
            bLengthChange: false,
            paging: false,
            order: [],
            bSort: false,
            info: false,
            scrollY: 280,
            scrollCollapse: true,
            scrollX: true,
            autoWidth: false,
            fixedColumns: true,
            language: {
                sEmptyTable: getLanguage('noData')
            },
            drawCallback: function () {

            }
        });
        setTimeout(function () {
            dataTable.columns.adjust();
        })
        $("#table2_wrapper").css("width", "100%");
        $("#table2_wrapper").css("margin-top", "35px");
        $("#table2_wrapper").css("border", "1px solid #c1c1c1");
        echarts3Option();
    } else {
        html += `
                    <div class="col-lg-4" style="display: inline-block;padding: 0.2rem;">
                        <span class="font-size-sm opacity-100" style="font-weight: 800;font-size: 14px;">${year}</span>
                        <div>
                            <span class="font-size-sm opacity-100" style="font-size: 12px;">店数</span>
                            <span class="font-size-sm opacity-100" style="float: right;font-size: 12px;"></span>
                        </div>
                        <div>
                            <span class="font-size-sm opacity-100" style="font-size: 12px;">单店投资</span>
                            <span class="font-size-sm opacity-100" style="float: right;font-size: 12px;"></span>
                        </div>
                        <div>
                            <span class="font-size-sm opacity-100" style="font-size: 12px;">总投资</span>
                            <span class="font-size-sm opacity-100" style="float: right;font-size: 12px;"></span>
                        </div>
                    </div>
                    <div class="col-lg-4" style="display: inline-block;padding: 0.2rem;">
                        <span class="font-size-sm opacity-100" style="font-weight: 800;font-size: 14px;">${year}</span>
                        <div>
                            <span class="font-size-sm opacity-100" style="font-size: 12px;">店数</span>
                            <span class="font-size-sm opacity-100" style="float: right;font-size: 12px;"></span>
                        </div>
                        <div>
                            <span class="font-size-sm opacity-100" style="font-size: 12px;">单店投资</span>
                            <span class="font-size-sm opacity-100" style="float: right;font-size: 12px;"></span>
                        </div>
                        <div>
                            <span class="font-size-sm opacity-100" style="font-size: 12px;">总投资</span>
                            <span class="font-size-sm opacity-100" style="float: right;font-size: 12px;"></span>
                        </div>
                    </div>
                    <div class="col-lg-4" style="display: inline-block;padding: 0.2rem;">
                        <span class="font-size-sm opacity-100" style="font-weight: 800;font-size: 14px;">${year}</span>
                        <div>
                            <span class="font-size-sm opacity-100" style="font-size: 12px;">店数</span>
                            <span class="font-size-sm opacity-100" style="float: right;font-size: 12px;"></span>
                        </div>
                        <div>
                            <span class="font-size-sm opacity-100" style="font-size: 12px;">单店投资</span>
                            <span class="font-size-sm opacity-100" style="float: right;font-size: 12px;"></span>
                        </div>
                        <div>
                            <span class="font-size-sm opacity-100" style="font-size: 12px;">总投资</span>
                            <span class="font-size-sm opacity-100" style="float: right;font-size: 12px;"></span>
                        </div>
                    </div>
                `;
        $("#Category_item").html(html);
        $("#table2 thead").html("");
        $("#table2 tbody").html("");
    }
}
// 各市场订单进度报告
function renderModule3(data, params) {
    var componentId = $(".dashBoardContent .dataSheet:nth-child(3) div .card .echart").attr("id");
    $(document).ready(function () {
        $('.select').select2({
            minimumResultsForSearch: Infinity
        });
        $("#pageRenderPage").on("select2:open", function (e) {
            $(".select2-results").css("width", "134px");
        });
    });
    var html = "";
    html += `<div class="form-group row mb-0" style="margin-left:5px;">
                        <div class="col-lg-12">
                            <div class="row">
                                <label class="col-form-label text-lg-left" style="padding-top:4px;">市场</label>
                                <div class="col-lg-2">
                                    <select class="form-control select" data-fouc id="marketSelectId" data-placeholder="请选择" onchange="marketSelectChange('change');">
                                        <option value="北京">北京</option>
                                        <option value="广州">广州</option>
                                        <option value="深圳">深圳</option>
                                        <option value="上海">上海</option>
                                        <option value="湖北">湖北</option>
                                        <option value="四川">四川</option>
                                        <option value="天津">天津</option>
                                        <option value="江苏">江苏</option>
                                        <option value="浙江">浙江</option>
                                        <option value="福建">福建</option>
                                        <option value="辽宁">辽宁</option>
                                        <option value="湖南">湖南</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>`;
    html += `
        <div class="" id="echarts4" style="height: 345px;">
        
        </div>
    `;
    $("#" + componentId).html(html);
    var maketSQL = `select * from (select  distinct B.eps_code from mcdcapex.app1_di_market_table_dimension A INNER JOIN 
mcdcapex.app1_mcd_info_mapping_market B ON A.NAME=B.cps_code
where cps_code not in ('MCCL','MW')
order by  cps_code) a
union all
select  distinct B.eps_code  from mcdcapex.app1_di_market_table_dimension A INNER JOIN 
mcdcapex.app1_mcd_info_mapping_market B ON A.NAME=B.cps_code
where cps_code in ('MW')`;
    var resMaket = cfs.request.foundation.runComm(maketSQL);
    var selecthtml = "";
    $.each(resMaket.res, function (k, v) {
        if (v.eps_code == "Unallocated") {
            selecthtml += `<option value="MCCL">MCCL</option>`;
        } else {
            selecthtml += `<option value="${v.eps_code}">${v.eps_code}</option>`;
        }
        maketData.push(k);
    });
    $("#marketSelectId").html(selecthtml);
    renderMaketEcharts();
    // renderMaketTable();
}
// 各市场订单进度报告-echarts
function renderMaketEcharts() {
    if ($("#projectSelectId").val() == 'CTNS') {
        var echartsSQL = `select a.market,a.cps_status,round(sum(a.order_money_notax),0) as total from  t_eps_actual_data_cps_actual a 
    where a.order_actual_year='${$("#yearSelectId").val()}' and a.category_code='${$("#projectSelectId").val()}' and  StoreStatus='Opened' and market='${$("#marketSelectId").val()}'
    GROUP BY a.market,a.cps_status`} else {
        var echartsSQL = `select a.market,a.cps_status,round(sum(a.order_money_notax),0) as total from  t_eps_actual_data_cps_actual a 
    where a.order_actual_year='${$("#yearSelectId").val()}' and a.category_code='${$("#projectSelectId").val()}' and market='${$("#marketSelectId").val()}'
    GROUP BY a.market,a.cps_status`

    };
    debugger;
    var statusData = ["1", "2", "3", "4", "5"];
    var resEcharts = cfs.request.foundation.runComm(echartsSQL);
    var obj = {};
    $.each(resEcharts.res, function (k, v) {
        obj[v.cps_status] = v.total;
    });
    var data = [];
    $.each(statusData, function (k, v) {
        if (obj[v] == undefined) {
            data.push(0);
        } else {
            data.push(obj[v]);
        }
    })
    var myChart4 = echarts.init(document.getElementById("echarts4"));
    var option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        grid: [
            {
                top: 50,
                left: 80,
                right: 20,
                bottom: 96
            },
            {
                height: 60,
                left: 80,
                right: 20,
                bottom: 36
            }
        ],
        xAxis: [{
            type: 'category',
            data: ['供应商已报价', '业务部门已确认', 'DOA已审批', '供应商已提供服务', '已评价服务'],
            gridIndex: 0,
            axisLabel: {
                color: '#333',
                interval: 0,
            },
            axisLine: {
                lineStyle: {
                    color: '#e7e7e7'
                }
            },
            axisTick: {
                lineStyle: {
                    color: '#e7e7e7'
                }
            },
            zlevel: 2
        }, {
            type: 'category',
            gridIndex: 1,
            axisLine: {
                show: false
            },
            zlevel: 1
        }],
        yAxis: [{
            type: 'value',
            gridIndex: 0,
            axisLabel: {
                color: '#333'
            },
            splitLine: {
                lineStyle: {
                    type: 'dashed'
                },
                show: false
            },
            axisLine: {
                lineStyle: {
                    color: '#ccc'
                }
            },
            axisTick: {
                lineStyle: {
                    color: '#ccc'
                }
            }
        }, {
            type: 'value',
            gridIndex: 1,
            axisLabel: {
                show: false
            },
            axisLine: {
                show: false
            },
            splitLine: {
                show: false
            },
            axisTick: {
                show: false
            }
        }],
        series: [{
            data: data,
            type: 'line',
            smooth: true,
            color: '#B49A83',
            label: {
                show: true,
                position: 'top',
                textStyle: {
                    color: '#000'
                },
                formatter: function (value) {
                    return format(value.value)
                }
            },
            itemStyle: {
                normal: {
                    color: (params) => {
                        let colors = ['#4150d8', '#28bf7e', '#ed7c2f', '#f2a93b', '#f9cf36', '#4a5bdc', '#4cd698', '#f4914e', '#fcb75b', '#ffe180', '#b6c2ff', '#96edc1']
                        return colors[params.dataIndex]
                    }
                }
            },
            xAxisIndex: 0,
            yAxisIndex: 0
        }, {
            data: [{
                name: '未使用预算',
                value: 1
            }],
            label: {
                show: true,
                position: 'inside',
                formatter: '{b}',
                offset: [0, 10],
                textStyle: {
                    color: '#777'
                }
            },
            type: 'bar',
            barGap: 0,
            barWidth: '20%',
            itemStyle: {
                normal: {
                    color: 'rgba(237,237,237, .5)'
                }
            },
            xAxisIndex: 1,
            yAxisIndex: 1
        }, {
            data: [{
                name: '未完成',
                value: 1
            }],
            label: {
                show: true,
                position: 'inside',
                formatter: '{b}',
                offset: [0, 10],
                textStyle: {
                    color: '#777'
                }
            },
            type: 'bar',
            barGap: 0,
            barWidth: '60%',
            itemStyle: {
                normal: {
                    color: 'rgba(232,232,232, .7)'
                }
            },
            xAxisIndex: 1,
            yAxisIndex: 1
        }, {
            data: [{
                name: '已完成',
                value: 1
            }],
            label: {
                show: true,
                position: 'inside',
                formatter: '{b}',
                offset: [0, 10],
                textStyle: {
                    color: '#777'
                }
            },
            type: 'bar',
            barGap: 0,
            barWidth: '20%',
            itemStyle: {
                normal: {
                    color: 'rgba(166,166,166, .3)'
                }
            },
            xAxisIndex: 1,
            yAxisIndex: 1
        }]
    };
    myChart4.setOption(option);
}
//各市场订单进度报告-订单状态-table
function renderMaketTable() {
    var proj_year = cfs.request.foundation.queryonevariableinfo('ProjYear').res.resultObj.value
    // var tableSQL = `select * from t_eps_actual_data_cps_actual a where a.order_actual_year='${$("#yearSelectId").val()}' and a.project_name1='${$("#projectSelectId").val()}' and market='${$("#marketSelectId").val()}'
    // and a.cps_status='${$("#orderStatusId").val()}'`;
    var tableSQL = `SELECT 
                    order_number as '订单编号',
                    store_number		 as '餐厅编号',
                    store_name		 as '餐厅名称',
                    order_state_name as '待执行操作',
                    create_by 	as '创建人',
                    vendor_name	as '供应商名称',
                    market      as '市场',
                    order_money_notax as '不含税金额'
                FROM t_eps_actual_data_cps_actual
                where order_actual_year='${proj_year}' and project_name1='清洗机' and market1='北京' and cps_status='1'
                `
    var resTable = cfs.request.foundation.runComm(tableSQL);
    var html = `<table class="table table-hover datatable-highlight dataTable no-footer table-striped" style="font-size: 12px;width: 1200px;">
                    <thead>
                        <tr>
                            <th>订单编号</th>
                            <th>餐厅编号</th>
                            <th>餐厅名称</th>
                            <th>待执行操作</th>
                            <th>待执行人员</th>
                            <th>供应商名称</th>
                            <th>不含税金额</th>
                        </tr>
                    </thead>
                    <tbody id="status_body">
                        
                    </tbody>
                </table>`;
    $("#rightTable").html(html);
    var htmlTbody = "";
    $.each(resTable.res, function (k, v) {
        htmlTbody += `
            <tr>
                <td>${v.order_number}</td>
                <td>3330002</td>
                <td>宁波中山东路餐厅 JING GUANG</td>
                <td>${v.order_state_name}</td>
                <td>${v.create_by_name}</td>
                <td>${v.vendor_name}</td>
                <td>44,115</td>
            </tr>
        `
    });
    $("#status_body").html(htmlTbody);
}
// 项目进度概览table点击事件
function tdClick(event) {
    var value = $(event).find("td:first-child").text();
    $('#marketSelectId').val(value).select2({
        minimumResultsForSearch: Infinity
    });
    marketSelectChange();
}
//  项目进度概览的echarts
function echarts3Option() {
    let data_Existing = []; //module2MainData.result2["已完成金额"];//已完成订单
    let data_Future = []; //module2MainData.result2["在途金额"];//在途订单
    let data_occ = [];// module2MainData.result2["完成度"];//项目进度
    let data_other = []; //module2MainData.result2["总预算金额"];//预算总额
    let quoted_order = []; //module2MainData.result2["已报价金额"];//已报价订单
    var Xdata = [];
    if (module2MainData != undefined && Object.keys(module2MainData).length !== 0) {
        data_Existing = module2MainData.rightEchart["已完成金额"]; //data.result2["已完成金额"];//已完成订单
        data_Future = module2MainData.rightEchart["在途金额"]; //data.result2["在途金额"];//在途订单
        data_occ = [];// module2MainData.result2["完成度"];//项目进度
        data_other = module2MainData.rightEchart["总预算金额"]; //data.result2["总预算金额"];//预算总额
        quoted_order = module2MainData.rightEchart["已报价金额"]; //data.result2["已报价金额"];//已报价订单
        $.each(module2MainData.leftData.table, function (k, v) {
            if (module2MainData.leftData.table[k][0] !== "TotalChina" && module2MainData.leftData.table[k][0] !== "MCCL") {
                Xdata.push(v[0]);
            }
        });
        $.each(Xdata, function (k, v) {
            data_occ.push(module2MainData.rightEchart["完成度 %"][k] * 100)
        })
    }
    let option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                // 坐标轴指示器，坐标轴触发有效
                type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
            },
            formatter: function (params) {
                var html = "";
                if (params.length > 0) {
                    html += params[0].axisValue + "<br>";
                    html += params[0].marker + params[0].seriesName + "：" + format(params[0].data) + "<br>";
                    html += params[1].marker + params[1].seriesName + "：" + format(params[1].data) + "<br>";
                    html += params[2].marker + params[2].seriesName + "：" + format(params[2].data) + "<br>";
                    html += params[3].marker + params[3].seriesName + "：" + format(Math.round(params[3].data)) + "<br>";
                }
                return html;
            },
        },
        legend: {
            data: ['已完成订单', '在途订单', '已报价订单', '预算总额', '完成度%']
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '40px',
            containLabel: true,
        },
        xAxis: {
            type: 'category',
            data: Xdata,
            axisLabel: {
                interval: 0,
                // rotate:40,
            }
        },
        yAxis: [
            {
                type: 'value',
                splitLine: {
                    show: false
                }
            },
            {
                type: 'value',
                splitLine: { show: false },
                name: '',
                axisLabel: {
                    show: true,
                    interval: 'auto',
                    formatter: '{value}%',
                }
            },
        ],
        //    ["#b0b0b0","#f8da78","#fcf2cf","#bfbfbf"]
        series: [
            {
                name: '已完成订单',
                type: 'bar',
                stack: 'bar',
                barMaxWidth: 20,
                color: '#c1232b',
                data: data_Existing,
            },
            {
                name: '在途订单',
                type: 'bar',
                stack: 'bar',
                barMaxWidth: 20,
                color: '#fcce10',
                data: data_Future,
            },
            {
                name: '已报价订单',
                type: 'bar',
                stack: 'bar',
                barMaxWidth: 20,
                color: '#9bca63',
                data: quoted_order,
            },
            {
                name: `预算总额`,
                type: 'bar',
                barGap: '-127%',//调整位置
                barMaxWidth: 30,
                color: '#bfbfbf',
                data: data_other,
                itemStyle: {
                    normal: {
                        color: 'rgba(191,191,191,0.5)', //柱子颜色
                        // borderColor: "#000000", //边框颜色
                    },
                },
            },
            {
                name: '完成度%',
                type: 'line',
                yAxisIndex: 1,
                color: '#bfbfbf',
                data: data_occ,
                symbolSize: 8,
                label: {
                    show: true,
                    color: '#000000',
                    position: ['-100%', '-150%'],
                    formatter: function (params) {
                        return params.value.toFixed(0) + '%';
                    },
                },
            },
        ],
    };
    var myChart3 = echarts.init(document.getElementById("echarts3"));
    myChart3.setOption(option);
}
// 项目概览数据and年份切换
function renderData1(componentId) {
    loadingShow("#" + componentId);
    data1 = [];//已完成
    data2 = [];//在途
    data3 = [];//已报价
    //var legendData = ["已完成", '在途', '已报价', '未使用'];
    var Ydata = [];
    var Ydata2 = [];
    var seriesData2 = [];
    var legendData = [];
    if (Object.keys(dataTest).length !== 0) {
        $.each(dataTest.projectView.Ydata1, function (k, v) {
            $.each(v, function (k1, v1) {
                Ydata.push(v1);
            })
        });
        Ydata2 = dataTest.projectView.Ydata2;
        seriesData2 = dataTest.projectView.series;
        legendData = dataTest.projectView.legendData;
        Ydata = Ydata.reverse();
        Ydata2 = Ydata2.reverse();
    }
    var option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            },
            formatter: function (datas) {
                var html = ``;
                $.each(datas, function (k, v) {
                    if (k == 0) {
                        html += `${v.axisValue}<br>`;
                    }
                    html += `${v.seriesName} : ${Math.round(v.value)} %<br>`;
                });
                return html;
            }
        },
        color: ["#c1232b", "#fcce10", "#9bca63", "#bfbfbf"],
        legend: {
            data: legendData
        },
        dataZoom: {
            show: true,
            start: 35,
            end: 100,
            yAxisIndex: [0, 1],
            width: 30,
            height: 180,
            showDataShadow: false,
            left: '95%',
            textStyle: {
                color: 'rgba(255,255,255,0)'
            }
        },
        grid: {
            left: '3%',
            right: '7%',
            top: 30,
            bottom: '3%',
            containLabel: true,
            height: 200
        },
        xAxis: {
            type: 'value',
            axisLabel: {
                show: true,
                formatter: '{value} %'
            },
        },
        yAxis: [
            {
                type: 'category',
                scale: true,
                name: '',
                data: Ydata,
                boundaryGap: [0.1, 0.1],
                triggerEvent: true,
                tooltip: {

                },
                axisLabel: {
                    margin: 8,
                    formatter: function (params) {
                        var val = "";
                        if (params.length > 22) {
                            val = params.substr(0, 22) + '...';
                            return val;
                        } else {
                            return params;
                        }
                    }
                }
            },
            {
                type: 'category',
                scale: true,
                name: '',
                data: Ydata2,
                axisLabel: {
                    formatter: function (value, index) {
                        var integer = Math.round(value);
                        return format(integer)
                    }
                },
                boundaryGap: [0.1, 0.1]
            }
        ],
        series: seriesData2
    };

    myChart.setOption(option);
    //点击事件
    myChart.on('click', function (params) {
        $('#projectSelectId').val(params.name).select2({
            minimumResultsForSearch: Infinity
        });
    });
    myChart.on('mouseover', xAxisOver)
    myChart.on('mouseout', xAxisout)
}
function xAxisOver(params) {
    //因为进入柱形图区域也会触发事件，需要对参数的值判断，只响应坐标轴触发事件
    if (params.componentType === 'yAxis') {
        var newArry = [];
        $.each(dataTest.projectView.Ydata1, function (k, v) {
            $.each(v, function (k1, v1) {
                newArry.push(v1);
            })
        });
        newArry = newArry.reverse();
        var thisIndex = $(this).index() - 2;
        $.each(newArry, function (k, v) {
            if (params.value == v) {
                thisIndex = k;
            }
        })
        //保存标签值
        this.xLabel = params.value;
        let offsetX = params.event.offsetX + 10
        let offsetY = params.event.offsetY + 10
        myChart.setOption({
            tooltip: {
                formatter: function (param) {
                    var html = ``;
                    $.each(param, function (k, v) {
                        if (k == 0) {
                            html += `${v.axisValue}<br>`;
                        }
                        html += `${v.seriesName} : ${Math.round(v.value)} %<br>`;
                    });
                    return html;
                },
                alwaysShowContent: true
            }
        })
        //显示提示框
        myChart.dispatchAction({
            type: 'showTip',
            seriesIndex: 0,
            dataIndex: thisIndex,
            position: [offsetX, offsetY]
        });
    }
}
function xAxisout(params) {
    if (params.componentType === 'yAxis') {
        this.xLabel = ''
        myChart.setOption({
            tooltip: {
                formatter: function (param) {
                    var html = ``;
                    $.each(param, function (k, v) {
                        if (k == 0) {
                            html += `${v.axisValue}<br>`;
                        }
                        html += `${v.seriesName} : ${Math.round(v.value)} %<br>`;
                    });
                    return html;
                },
                alwaysShowContent: false
            }
        })
    }
}
// 年份切换
function yearChange() {
    domLoadingShow(0);
    setTimeout(function () {
        getProjectDF();
        renderData1();
        // module2Main();
        renderModule2();
        echarts3Option();
        marketSelectChange();
    }, 500)
}
// 项目切换
function projectselectChange() {
    domLoadingShow(1);
    setTimeout(function () {
        module2Main();
        marketSelectChange();
    }, 500)
}
// 市场切换
function marketSelectChange(type) {
    if (type == "change") {
        domLoadingShow(2);
    }
    setTimeout(function () {
        renderMaketEcharts();
        refreshTable();
    }, 500)
}
// 刷新订单明细表
function refreshTable(type) {
    setTimeout(function () {
        var dom = $(".dashBoardContent .dataSheet:nth-child(3) div:nth-child(2) .card iframe")[0].contentWindow;
        dom.$("#order_actual_year").val($("#yearSelectId").val()).trigger("change");
        dom.$("#category_code").val($("#projectSelectId").val()).trigger("change");
        dom.$("#market").val($("#marketSelectId").val()).trigger("change");
        dom.searchRun();
        domLoadingHide();
    }, 1000)
}
// 显示对应dom的loading效果
function domLoadingShow(num) {
    $(".dashBoardContent .dataSheet").each(function (k, v) {
        if (k >= num) {
            var dataName = $(v).children().attr("data-id");
            loadingShow1(dataName, "加载中...");
        }
    });
}
// 隐藏对应dom的loading效果
function domLoadingHide() {
    $(".dashBoardContent .dataSheet").each(function (k, v) {
        var dataName = $(v).children().attr("data-id");
        loadingHide1(dataName, "加载中...")
    });
}
// 订单状态切换
function orderStatusChange() {
    // renderMaketTable();
}
// 订单明细报告渲染成功后的回调
function electronicFormFn() {
    $(".elementIframe").contents().find("#contractList_table_wrapper .dataTables_scroll .dataTables_scrollHead .table thead tr th:first-child").css("display", "none");
    //    $(".elementIframe").contents().find("#contractList_table_wrapper .DTFC_LeftWrapper").css("display","none");
    $(".elementIframe").contents().find("#contractList_table_wrapper .dataTables_scroll .dataTables_scrollBody .table tbody tr td:first-child").css("display", "none");
    $(".multiselect-container").css("min-width", "10rem");
    $(".elementIframe").contents().find(".dataTables_scrollBody").css("max-height","293px")
    $(".elementIframe").contents().find(".datatable-scroll").css("max-height","327px")
}
//extrajs全局方法
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

function loadingShow1(cardName, msg) {
    var block = $($(`[data-id='${cardName}']`))
    var id = $($(`[data-id='${cardName}']`)).attr("data-id");
    block.append($(`
      <div class="${id} bg-slate-700 text-white rounded p-2" style="display: none;">
          <i class="icon-spinner4 spinner mt-1"></i> <span class="font-weight-semibold d-block mt-2">${msg}</span>
      </div>
    `));
    var message = $('.' + id);
    try {
        $(block).block({
            message: message,
            overlayCSS: {
                backgroundColor: '#fff',
                opacity: 0.8,
                cursor: 'wait',
            },
            css: {
                width: 100,
                '-webkit-border-radius': 2,
                '-moz-border-radius': 2,
                border: 0,
                padding: 0,
            },
        });
    } catch (error) { }
}
function loadingHide1(cardName) {
    var id = $($(`[data-id='${cardName}']`)).attr("data-id");
    var message = $('.' + id);
    var block = $($(`[data-id='${cardName}']`))
    try {
        $(block).unblock({
            onUnblock: function () {
                message.removeClass('bg-slate-700');
            },
        });
        $("." + message).remove();
    } catch (error) {
        //   alertA(error);
    }
}
// 去重
function unique(arr) {
    var newArr = [];
    for (var i = 0; i < arr.length; i++) {
        if (newArr.indexOf(arr[i]) == -1) {
            newArr.push(arr[i])
        }
    }
    return newArr;
}
// 千分位
function format(num) {
    return num.toString().replace(/\d+/, function (n) {
        // 先提取整数部分
        return n.replace(/(\d)(?=(\d{3})+$)/g, function ($1) {
            // 对整数部分添加分隔符
            return $1 + ',';
        });
    });
} 