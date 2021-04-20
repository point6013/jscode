// var Year = $('.multiselect-selected-text').text();
// 引入jspdf
$.getScript('../js/plugins/jspdf.min.js');
$.getScript('../js/plugins/jspdf.plugin.autotable.js');
$.getScript('../js/StbDemo/topdf/html2canvas.min.js');
$(document).ready(function(){
    $("#globalPovPart .searchSeleteStyle:last-child()").click(function(){
       r1() 
    })
})
var result ;
var new_list_data = [];
var pdfListData = [];
var list_data;
function r1(data, params) {
     var html = `<i class="icon-drawer-in mr-2" style="margin-bottom: 6px;cursor: pointer;" onclick="showPdfModal();"></i>`;
      $(".icon-drawer-in").remove();
    $($(".dashBoardContent .dataSheet:nth-child(1) .header-elements .dataSheetCon").children()[1]).before(html);
    var componentId = $(".dashBoardContent .dataSheet:nth-child(1) div .card .echart").attr("id");
    var html = `
        <div class="row">
            <div class="col-lg-3">
                <label class="col-form-label col-lg-5" style="font-weight: bold;">Total Projection</label>
                <div class="col-lg-6" style="display:inline-block;">
                   <p class="input1" style="width: 10rem; height: 28px;padding: 3px 0 0 0.5rem; border: 1px solid #ddd;margin: 0;text-align: center;font-weight: bold">
                </div>
            </div>
            <div class="col-lg-3">
                <label class="col-form-label col-lg-5" style="font-weight: bold;">Purchase Plan</label>
                <div class="col-lg-6" style="display:inline-block;">
                    <p class="input2" style="width: 10rem; height: 28px;padding: 3px 0 0 0.5rem; border: 1px solid #ddd;margin: 0;text-align: center;font-weight: bold">
                </div>
            </div>
            <div class="col-lg-3">
                <label class="col-form-label col-lg-5" style="font-weight: bold;">PD Not Paid</label>
                <div class="col-lg-6" style="display:inline-block;">
                     <p class="input3" style="width: 10rem; height: 28px;padding: 3px 0 0 0.5rem; border: 1px solid #ddd;margin: 0;text-align: center;font-weight: bold">
                </div>
            </div>
            <div class="col-lg-3">
                <label class="col-form-label col-lg-5" style="font-weight: bold;">Payment</label>
                <div class="col-lg-6" style="display:inline-block;">
                     <p class="input4" style="width: 10rem; height: 28px;padding: 3px 0 0 0.5rem; border: 1px solid #ddd;margin: 0;text-align: center;font-weight: bold">
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-lg-3">
                <label class="col-form-label col-lg-5"></label>
                <div class="col-lg-6" style="display:inline-block;">
                    <p class="b1" style="width: 10rem;text-align: center;font-weight: bold"></p>
                </div>
            </div>
            <div class="col-lg-3">
                <label class="col-form-label col-lg-5"></label>
                <div class="col-lg-6" style="display:inline-block;">
                    <p class="b2" style="width: 10rem;text-align: center;font-weight: bold"></p>
                </div>
            </div>
            <div class="col-lg-3">
                <label class="col-form-label col-lg-5"></label>
                <div class="col-lg-6" style="display:inline-block;">
                    <p class="b3" style="width: 10rem;text-align: center;font-weight: bold"></p>
                </div>
            </div>
            <div class="col-lg-3">
                <label class="col-form-label col-lg-5"></label>
                <div class="col-lg-6" style="display:inline-block;">
                    <p class="b4" style="width: 10rem;text-align: center;font-weight: bold"></p>
                </div>
            </div>
        </div>
        <ul class="nav nav-tabs nav-tabs-solid nav-justified tabulDom bg-teal-400 border-x-0 border-bottom-0 mt-4 mb-0" style="background: none;border: none;box-shadow: none;">
            <li class="nav-item" style="margin-right:10px;">
                <a href="#tab1" class="nav-link font-size-sm " style="background-color: #FF9800;font-weight: bold;font-size:16px;" data-toggle="tab">Spending by IT Account</a>
            </li>

            <li class="nav-item" style="margin-right:10px;">
                <a href="#tab2" class="nav-link font-size-sm " style="background-color: #999;font-weight: bold;font-size:16px;" data-toggle="tab">Spending by IT BP</a>
            </li>
            <li class="nav-item" style="margin-right:10px;font-size:bold">
                <a href="#tab3" class="nav-link font-size-sm " style="background-color: #999;font-weight: bold;font-size:16px;" data-toggle="tab">Spending by Biz Owner</a>
            </li>
        </ul>
        <div class="tab-content mt-4">
            <div class="tab-pane active fade show" id="tab1">
               <div class="row">
                    <div class="col-lg-6" style="width: 100%; height: 500px;" id="tab1chart1"></div>
                    <div class="col-lg-6" style="width: 100%; height: 500px;" id="tab1chart2"></div>
               </div>
            </div>
            <div class="tab-pane fade" id="tab2">
                <div class="row">
                    <div class="col-lg-6" style="width: 100%; height: 500px;" id="tab2chart1"></div>
                    <div class="col-lg-6" style="width: 100%; height: 500px;" id="tab2chart2"></div>
                </div>
            </div>
            <div class="tab-pane fade" id="tab3">
                <div class="row">
                    <div class="col-lg-6" style="width: 100%; height: 500px;" id="tab3chart1"></div>
                    <div class="col-lg-6" style="width: 100%; height: 500px;" id="tab3chart2"></div>
                    <div class="col-lg-6" style="width: 100%; height: 110px;" id="tab3chart1One"></div>
                    <div class="col-lg-6" style="width: 100%; height: 110px;" id="tab3chart2One"></div>
                </div>
            </div>
        </div>
        
        <!-- pdf显示弹框 -->
        <div id="pdf-modal" class="modal fade" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog modal-full">
                <div class="modal-content">
                    <div class="modal-header bg-teal-400">
                            <h5 class="modal-title">下载pdf</h5>
                            <button type="button" class="close legitRipple" data-dismiss="modal">×</button>
                    </div>
                    <div class="modal-body pl-0 pr-0 modal_scroll" style="height: 600px;overflow-y: auto;overflow-x: hidden;padding:0;">
                        <div id="pdfDom22" style="height: 100%;">
                            
                            <div class="tab-content mt-4">
                                <div class="">
                                    <ul class="nav nav-tabs nav-tabs-solid nav-justified bg-teal-400 border-x-0 border-bottom-0 mt-2 mb-2" style="background: none;border: none;box-shadow: none;">
                                         <li class="nav-item" style="margin-right:10px;">
                                            <a href="#tab1" class="nav-link font-size-sm " style="background-color: #FF9800;font-weight: bold;font-size:16px;" data-toggle="tab">Spending by IT Account</a>
                                        </li>
                            
                                        <li class="nav-item" style="margin-right:10px;">
                                            <a href="#tab2" class="nav-link font-size-sm " style="background-color: #999;font-weight: bold;font-size:16px;" data-toggle="tab">Spending by IT BP</a>
                                        </li>
                                        <li class="nav-item" style="margin-right:10px;font-size:bold">
                                            <a href="#tab3" class="nav-link font-size-sm " style="background-color: #999;font-weight: bold;font-size:16px;" data-toggle="tab">Spending by Biz Owner</a>
                                        </li>
                                    </ul>
                                    <div class="row">
                                        <div class="col-lg-4" style="margin-top: 30px;">
                                            <table class="table table-hover datatable-highlight dataTable no-footer table-striped table-xs ml-4" style="font-size:12px;" id="table1">
                                                <thead>
                                                    <tr>
                                                        <th></th>
                                                        <th>Purchase Plan</th>
                                                        <th>PD Not Paid</th>
                                                        <th>Payment</th>
                                                    </tr>
                                                </thead>
                                                <tbody id="tableTbody1">
                                                
                                                </tbody>
                                            </table>
                                        </div>
                                        <div class="col-lg-8">
                                            <div class="col-lg-6" style="width: 50%; height: 480px;display: inline-block;" id="tab1chart11"></div>
                                            <div class="col-lg-6" style="width: 49%; height: 480px;display: inline-block;" id="tab1chart22"></div>
                                        </div>
                                    </div>
                                </div>
                                <div class="">
                                    <ul class="nav nav-tabs nav-tabs-solid nav-justified bg-teal-400 border-x-0 border-bottom-0 mt-2 mb-2" style="background: none;border: none;box-shadow: none;">
                                        <li class="nav-item" style="margin-right:10px;">
                                            <a href="#tab1" class="nav-link font-size-sm " style="background-color: #999;font-weight: bold;font-size:16px;" data-toggle="tab">Spending by IT Account</a>
                                        </li>
                            
                                        <li class="nav-item" style="margin-right:10px;">
                                            <a href="#tab2" class="nav-link font-size-sm " style="background-color: #FF9800;font-weight: bold;font-size:16px;" data-toggle="tab">Spending by IT BP</a>
                                        </li>
                                        <li class="nav-item" style="margin-right:10px;font-size:bold">
                                            <a href="#tab3" class="nav-link font-size-sm " style="background-color: #999;font-weight: bold;font-size:16px;" data-toggle="tab">Spending by Biz Owner</a>
                                        </li>
                                    </ul>
                                    <div class="row">
                                        <div class="col-lg-4" style="margin-top: 27px;">
                                            <table class="table table-hover datatable-highlight dataTable no-footer table-striped table-xs ml-4" style="font-size:12px;" id="table2">
                                                <thead>
                                                    <tr>
                                                        <th></th>
                                                        <th>Purchase Plan</th>
                                                        <th>PD Not Paid</th>
                                                        <th>Payment</th>
                                                    </tr>
                                                </thead>
                                                <tbody id="tableTbody2">
                                                
                                                </tbody>
                                            </table>
                                        </div>
                                        <div class="col-lg-8">
                                            <div class="col-lg-6" style="width: 50%; height: 510px;display: inline-block;" id="tab2chart11"></div>
                                            <div class="col-lg-6" style="width: 49%; height: 510px;display: inline-block;" id="tab2chart22"></div>
                                        </div>
                                    </div>
                                </div>
                                <div class="">
                                    <ul class="nav nav-tabs nav-tabs-solid nav-justified bg-teal-400 border-x-0 border-bottom-0 mt-2 mb-2" style="background: none;border: none;box-shadow: none;">
                                        <li class="nav-item" style="margin-right:10px;">
                                            <a href="#tab1" class="nav-link font-size-sm " style="background-color: #999;font-weight: bold;font-size:16px;" data-toggle="tab">Spending by IT Account</a>
                                        </li>
                            
                                        <li class="nav-item" style="margin-right:10px;">
                                            <a href="#tab2" class="nav-link font-size-sm " style="background-color: #999;font-weight: bold;font-size:16px;" data-toggle="tab">Spending by IT BP</a>
                                        </li>
                                        <li class="nav-item" style="margin-right:10px;font-size:bold">
                                            <a href="#tab3" class="nav-link font-size-sm " style="background-color: #FF9800;font-weight: bold;font-size:16px;" data-toggle="tab">Spending by Biz Owner</a>
                                        </li>
                                    </ul>
                                    <div class="row">
                                        <div class="col-lg-4" style="margin-top: 29px;">
                                            <table class="table table-hover datatable-highlight dataTable no-footer table-striped table-xs ml-4" style="font-size:12px;" id="table3">
                                                <thead>
                                                    <tr>
                                                        <th></th>
                                                        <th>Purchase Plan</th>
                                                        <th>PD Not Paid</th>
                                                        <th>Payment</th>
                                                    </tr>
                                                </thead>
                                                <tbody id="tableTbody3">
                                                
                                                </tbody>
                                            </table>
                                        </div>
                                        <div class="col-lg-8">
                                            <div class="col-lg-6" style="width: 49%; height: 797px;display: inline-block;" id="tab3chart11"></div>
                                            <div class="col-lg-6" style="width: 49%; height: 797px;display: inline-block;" id="tab3chart22"></div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-lg-4" style="margin-top: 16px;">
                                            <table class="table table-hover datatable-highlight dataTable no-footer table-striped table-xs ml-4" style="font-size:12px;" id="table3">
                                                <thead>
                                                    <tr>
                                                        <th></th>
                                                        <th>Purchase Plan</th>
                                                        <th>PD Not Paid</th>
                                                        <th>Payment</th>
                                                    </tr>
                                                </thead>
                                                <tbody id="tableTbody3One">
                                                
                                                </tbody>
                                            </table>
                                        </div>
                                        <div class="col-lg-8">
                                            <div class="col-lg-6" style="width: 49%;height: 110px;display: inline-block;" id="oneEchart3"></div>
                                            <div class="col-lg-6" style="width: 49%;height: 110px;display: inline-block;" id="one2Echart3"></div>
                                            
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn bg-modal-footer bg-teal-400 legitRipple" onclick="downloadPdf();">
                                <i class="icon-checkmark3 font-size-base mr-1"></i>
                                <span class="sure">确定</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
        
    `;
    $("#" + componentId).html(html);
    // var getSearchParam = $("select[aname='year']").val()[0];
    var getSearchParam = showDashBoard.globalCurrentPovObj['year'];
    console.log('year')
    console.log(getSearchParam);
    result =JSON.parse(cfs.request.python.pythonWeb('IT_spending_dashboard', {'year':getSearchParam}).res)
    // value_percent = result.res2
    // console.log(value_percent)
    // result = {"res": [],
    // "res2":  [{"Total_Projection": 486510437.0, "Purchase_Plan": 237585207.0, 
    // "PD_Not_Paid": 248762791.3, "Payment": 162438.7},
    //  {"Total_Projection": 
    // "100.0%", "Purchase_Plan": "48.8%", "PD_Not_Paid": "51.1%", "Payment": 
    // "0.0%"}]}
    console.log(result)

    $(".input1").text(format(result.res2[0]['Total Projection'])); 
    $(".input2").text(format(result.res2[0]['Purchase Plan']));
    $(".input3").text(format(result.res2[0]['PD Not Paid']));
    $(".input4").text(format(result.res2[0]['Payment']));

    $(".b1").text(result.res2[1]['Total Projection']);
    $(".b2").text(result.res2[1]['Purchase Plan']);
    $(".b3").text(result.res2[1]['PD Not Paid']);
    $(".b4").text(result.res2[1].Payment);
    renderEcharts("#tab1");

    $(".tabulDom li").click(function () {
        var id = $(this).children().attr("href");
        console.log(id);
        $(this).children().css("background-color","#FF9800");
         $(this).siblings().children().css("background-color","#999");
        renderEcharts(id,'click');
    })
    var exportIHtml = `<span style="position: absolute;right: 365px;top: 10.5px;margin-right: 50px;cursor: pointer;" onclick="tableExportFunction();"><i class="icon-download4" style="margin-right: 6px;""></i>IT Spending明细下载</span>`;
    $(".dashBoardContent .dataSheet:nth-child(2)").css("position", "relative");
    $(".dashBoardContent .dataSheet:nth-child(2)").append(exportIHtml);
}
// 下载Excel
function tableExportFunction(){
    console.log("下载")
    var it_bp =  $(".elementIframe").contents().find("select[data-valuekey='it_bp']+div button").attr("title")
    var biz_owner = $(".elementIframe").contents().find("select[data-valuekey='business_owner']+div button").attr("title")
    console.log(it_bp)
    console.log(biz_owner)
    var sql_ = ' and 1=1'
    if (it_bp=='-'){
        sql_1 = sql_
    }else{
        it_bp =  it_bp.split(", ")
        it_bp = JSON.stringify(it_bp).replace("[", "(").replace("]", ")");
        console.log(it_bp)
        sql_1 = sql_ + ' and b.description_1 in ' +   it_bp
    }
    
    
    
    var sql2_ = ' and 1=1'
    if (biz_owner=='-'){
        sql2_1 = sql2_
    }else{
        biz_owner =  biz_owner.split(", ")
        biz_owner = JSON.stringify(biz_owner).replace("[", "(").replace("]", ")");
        console.log(biz_owner)
        sql2_1 = sql2_ + ' and c.description_1 in ' +   biz_owner
    }
    
    
    console.log(sql_1)
    // var all_status=$(".elementIframe").contents().find("select[name='Order Status']+div").text()
    // var all_status = "供应商已报价 业务部门已确认 DOA已审批 供应商已提供服务 已评价服务"
    // var status_Array = []
    // if (it_bp && all_status) {
    //     status_Array = status.split(", ")
    //     status_Array = (status_Array[0] == "-" ? all_status.split(" ") : status_Array)
    // }

    // var market = $("select[id='marketSelectId']").val()
    // var category = $("select[id=projectSelectId]").val()
    $(".loadingicon").show();
    var downloadSQL = `
    SELECT d.description_1 as product,
    b.description_1 as it_bp  ,
    e.description_1 as bus_dep ,
    c.description_1 as bus_owner ,
    estimated_inv, 
    act_payment , 
    pd_total ,
    purchase_total ,
    proj_cur_ver 
     from mcdcapex.app1_mcd_info_product_list  a left join mcdcapex.app1_di_it_bp_table_dimension   b  on a.it_bp = b.name 
    left join mcdcapex.app1_smartlist   c
    on a.bus_owner = c.subject_value
    left join mcdcapex.app1_di_product_table_dimension  d
    on a.product_code = d.name
    left join mcdcapex.app1_di_department_table_dimension e 
    on a.bus_dep = e.name 
     WHERE estimated_inv is not NULL and proj_cur_ver is not NULL`+sql_1+ sql2_1;
     console.log(downloadSQL)
    var resDownload = cfs.request.foundation.runComm(downloadSQL);
    var theadData = ['product','it_bp','bus_dep','bus_owner','estimated_inv','act_payment','pd_total','purchase_total','proj_cur_ver'];
    if (resDownload.res.length !== 0) {
        cfs.export.toCsv("IT_Spending_Detail_Download",resDownload.res,theadData);
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

// 订单明细报告渲染成功后的回调
function electronicFormFn() {
    $(".elementIframe").contents().find("#contractList_table_wrapper .dataTables_scroll .dataTables_scrollHead .table thead tr th:first-child").css("display", "none");
    //    $(".elementIframe").contents().find("#contractList_table_wrapper .DTFC_LeftWrapper").css("display","none");
    $(".elementIframe").contents().find("#contractList_table_wrapper .dataTables_scroll .dataTables_scrollBody .table tbody tr td:first-child").css("display", "none");
    $(".elementIframe").contents().find("#contractList_table_wrapper .dataTables_scroll .dataTables_scrollBody").css("max-height", "320px");
    $(".multiselect-container").css("min-width", "10rem");
}



function renderEcharts(id,type) {
    var option = {
            title: {
        text: 'Spending by Amount',
        left: 'center',
        align: 'right',
        textStyle:{'fontsize':12,fontWeight:'bold'}
        
    },
        tooltip: {
            trigger: 'axis',
            axisPointer: {            // Use axis to trigger tooltip
                type: 'shadow'        // 'shadow' as default; can also be 'line' or 'shadow'
            }
        },
        grid: {
            left: '3%',
            right: '6%',
            bottom: '8%',
            containLabel: true
        },
        color:['#bfbfbf','#fcce10','green'],
        xAxis: {
            type: 'value',
            splitNumber:4,
            axisLabel:{
            formatter: '{value}k'
            }
        },
        yAxis: {
            type: 'category',
        },
    };
    var option1 ={
            title: {
        text: 'Spending by Percent',
        left: 'center',
        align: 'right',
        textStyle:{'fontsize':12,fontWeight:'bold'}
    
    },
        tooltip: {
            trigger: 'axis',
            axisPointer: {            // Use axis to trigger tooltip
                type: 'shadow'        // 'shadow' as default; can also be 'line' or 'shadow'
            },
            formatter: function (params) {
                let str = params[0].name + "<br />";
                params.forEach((item) => {
                  str +=
                    '<span style="display:inline-block;margin-right:5px;border-radius:50%;width:10px;height:10px;left:5px;background-color:'+item.color+'"></span>' + item.seriesName + " : " + item.data + "%<br />";
                });
                return str;
             }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '8%',
            containLabel: true
        },
        color:['#bfbfbf','#fcce10','green'],
        xAxis: {
            type: 'value',
            
            axisLabel: {  
                show: true,   
                formatter: '{value} %'  
            }, 
        },

        yAxis: {
            type: 'category',
        },
    };

    list_data = result.res;
    for(i=0;i<list_data.length;i++){
        if([0,2,4].includes(i)){
        let optionB = JSON.parse( JSON.stringify( option ) );
        optionB.legend = list_data[i].legend
        optionB.yAxis = list_data[i].yAxis
        optionB.series = list_data[i].series
        new_list_data.push(optionB)
        }
        else if([1,3,5].includes(i)){
            let optionA = _.cloneDeep(option1);
            optionA.legend = list_data[i].legend
            optionA.yAxis = list_data[i].yAxis
            optionA.series = list_data[i].series
            new_list_data.push(optionA) 
        }else if(i==6){
            let optionC = _.cloneDeep(option);
            // optionC.legend = list_data[i].legend
            optionC.title={}
            optionC.grid.height=50
            optionC.yAxis = list_data[i].yAxis
            optionC.series = list_data[i].series
            new_list_data.push(optionC) 
        }else if(i==7){
            let optionD = _.cloneDeep(option1);
            // optionC.legend = list_data[i].legend
            optionD.title={}
            optionD.grid.height=50
            optionD.yAxis = list_data[i].yAxis
            optionD.series = list_data[i].series
            new_list_data.push(optionD) 
        }
    };
    if(id == "#tab1"){
        var echartstab1 = echarts.init(document.getElementById("tab1chart1"));
        var echartstab2 = echarts.init(document.getElementById("tab1chart2"));
        echartstab1.setOption(new_list_data[0]);
        echartstab2.setOption(new_list_data[1]);
    }else if(id == "#tab2"){
        setTimeout(function(){
            var echartstab3 = echarts.init(document.getElementById("tab2chart1"));
            var echartstab4 = echarts.init(document.getElementById("tab2chart2"));
            echartstab3.setOption(new_list_data[2]);
            echartstab4.setOption(new_list_data[3]);
        },300)
    }else{
        setTimeout(function(){
            var echartstab5 = echarts.init(document.getElementById("tab3chart1"));
            var echartstab6 = echarts.init(document.getElementById("tab3chart2"));
            echartstab5.setOption(new_list_data[4]);
            echartstab6.setOption(new_list_data[5]);
            var echartstab7 = echarts.init(document.getElementById("tab3chart1One"));
            var echartstab8 = echarts.init(document.getElementById("tab3chart2One"));
            echartstab7.setOption(new_list_data[6]);
            echartstab8.setOption(new_list_data[7]);
        },300)
    }
    
}
var tableArray = [];
var seriesData = [];
function showPdfModal(){
    $("#pdf-modal").modal("show");
    setTimeout(function(){
        let newListData = _.cloneDeep(list_data);
        // 处理table数据
        $.each(newListData,function(k,v){
            var obj = {};
            if([0,2,4,6].includes(k)){
                let newData = v.yAxis[0].data.reverse();//倒序
                $.each(newData,function(k1,v1){
                    obj[k1] = [];
                    obj[k1].push(v1);
                });
                $.each(v.series,function(k1,v1){
                    let newData = v1.data.reverse();//倒序
                    $.each(newData,function(k2,v2){
                        obj[k2].push(v2);
                    });
                });
                tableArray.push(obj);
            }
        });
        console.log(tableArray)
        // 渲染table
        var tableTbodyHtml1 = "";
        var tableTbodyHtml2 = "";
        var tableTbodyHtml3 = "";
         var tableTbodyHtml4 = "";
        $.each(tableArray[0],function(k,v){
            tableTbodyHtml1 += `<tr>`;
            $.each(v,function(k1,v1){
                tableTbodyHtml1 += `
                    <td>${v1}</td>
                `;
            })
            tableTbodyHtml1 += `</tr>`;
        })
        $.each(tableArray[1],function(k,v){
            tableTbodyHtml2 += `<tr>`;
            $.each(v,function(k1,v1){
                tableTbodyHtml2 += `
                    <td>${v1}</td>
                `;
            })
            tableTbodyHtml2 += `</tr>`;
        })
        $.each(tableArray[2],function(k,v){
            tableTbodyHtml3 += `<tr>`;
            $.each(v,function(k1,v1){
                tableTbodyHtml3 += `
                    <td>${v1}</td>
                `;
            })
            tableTbodyHtml3 += `</tr>`;
        })
        $.each(tableArray[3],function(k,v){
            tableTbodyHtml4 += `<tr>`;
            $.each(v,function(k1,v1){
                tableTbodyHtml4 += `
                    <td>${v1}</td>
                `;
            })
            tableTbodyHtml4 += `</tr>`;
        })
        $("#tableTbody1").html(tableTbodyHtml1);
        $("#tableTbody2").html(tableTbodyHtml2);
        $("#tableTbody3").html(tableTbodyHtml3);
        $("#tableTbody3One").html(tableTbodyHtml4);
        $("#tableTbody1 tr").css("height","50px");
        $("#tableTbody2 tr").css("height","38px");
        $("#tableTbody2 td").css("padding","0 1.25rem");
        $("#tableTbody3 tr").css("height","30px");
        $("#tableTbody3 tr td:nth-child(1)").css("width","8rem");
        var optionM1 = {
            title: {
                text: 'Spending by Amount',
                left: 'center',
                align: 'right',
                textStyle:{'fontsize':12,fontWeight:'bold'}
                
            },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {            // Use axis to trigger tooltip
                        type: 'shadow'        // 'shadow' as default; can also be 'line' or 'shadow'
                    }
                },
                grid: {
                    left: '3%',
                    right: '6%',
                    bottom: '8%',
                    containLabel: true
                },
                color:['#bfbfbf','#fcce10','green'],
                xAxis: {
                    type: 'value',
                    splitNumber:4,
                    axisLabel:{
                    formatter: '{value}k'
                    }
                },
                yAxis: {
                    type: 'category',
                },
            };
        var optionM2 ={
            title: {
                text: 'Spending by Percent',
                left: 'center',
                align: 'right',
                textStyle:{'fontsize':12,fontWeight:'bold'}
            
            },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {            // Use axis to trigger tooltip
                        type: 'shadow'        // 'shadow' as default; can also be 'line' or 'shadow'
                    },
                    formatter: function (params) {
                        let str = params[0].name + "<br />";
                        params.forEach((item) => {
                        str +=
                            '<span style="display:inline-block;margin-right:5px;border-radius:50%;width:10px;height:10px;left:5px;background-color:'+item.color+'"></span>' + item.seriesName + " : " + item.data + "%<br />";
                        });
                        return str;
                    }
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '8%',
                    containLabel: true
                },
                color:['#bfbfbf','#fcce10','green'],
                xAxis: {
                    type: 'value',
                    
                    axisLabel: {  
                        show: true,   
                        formatter: '{value} %'  
                    }, 
                },

                yAxis: {
                    type: 'category',
                },
            };
        for(i=0;i<list_data.length;i++){
            if([0,2,4].includes(i)){
                let optionB = JSON.parse( JSON.stringify( optionM1 ) );
                optionB.legend = list_data[i].legend;
                optionB.yAxis = list_data[i].yAxis[0];
                optionB.series = list_data[i].series;
                pdfListData.push(optionB)
            }else if([1,3,5].includes(i)){
                let optionA = _.cloneDeep(optionM2);
                optionA.legend = list_data[i].legend;
                list_data[i].yAxis[1]["position"] = "right";
                optionA.yAxis = list_data[i].yAxis[1];
                optionA.series = list_data[i].series
                pdfListData.push(optionA) 
            }else if(i==6){
                let optionC = _.cloneDeep(optionM1);
                // optionC.legend = list_data[i].legend
                optionC.title={}
                optionC.grid.height=50
                optionC.yAxis = list_data[i].yAxis[0];
                optionC.series = list_data[i].series
                pdfListData.push(optionC) 
            }else if(i==7){
                let optionD = _.cloneDeep(optionM2);
                // optionC.legend = list_data[i].legend
                optionD.title={}
                optionD.grid.height=50
                list_data[i].yAxis[1]["position"] = "right";
                optionD.yAxis = list_data[i].yAxis[1];
                optionD.series = list_data[i].series
                pdfListData.push(optionD) 
            }
        };
       var echartstab11 = echarts.init(document.getElementById("tab1chart11"));
        var echartstab22 = echarts.init(document.getElementById("tab1chart22"));
        echartstab11.setOption(pdfListData[0]);
        echartstab22.setOption(pdfListData[1]);
        var echartstab33 = echarts.init(document.getElementById("tab2chart11"));
        var echartstab44 = echarts.init(document.getElementById("tab2chart22"));
        echartstab33.setOption(pdfListData[2]);
        echartstab44.setOption(pdfListData[3]);
        var echartstab55 = echarts.init(document.getElementById("tab3chart11"));
        var echartstab66 = echarts.init(document.getElementById("tab3chart22"));
        var oneEchart3 = echarts.init(document.getElementById("oneEchart3"));
        var one2Echart3 = echarts.init(document.getElementById("one2Echart3"));
        echartstab55.setOption(pdfListData[4]);
        echartstab66.setOption(pdfListData[5]); 
        oneEchart3.setOption(pdfListData[6]);
        one2Echart3.setOption(pdfListData[7]);
    },500)
}
//下载
function downloadFile(fileName, content) {
    let aLink = document.createElement('a');
    let blob = this.base64ToBlob(content); //new Blob([content]);
    let evt = document.createEvent("HTMLEvents");
    evt.initEvent("click", true, true);//initEvent 不加后两个参数在FF下会报错  事件类型，是否冒泡，是否阻止浏览器的默认行为
    aLink.download = fileName;
    aLink.href = URL.createObjectURL(blob);
    aLink.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));//兼容火狐
}
//base64转blob
function base64ToBlob(code) {
    let parts = code.split(';base64,');
    let contentType = parts[0].split(':')[1];
    let raw = window.atob(parts[1]);
    let rawLength = raw.length;

    let uInt8Array = new Uint8Array(rawLength);

    for (let i = 0; i < rawLength; ++i) {
        uInt8Array[i] = raw.charCodeAt(i);
    }
    return new Blob([uInt8Array], { type: contentType });
}
function downloadPdf(){
    document.getElementById("table3").scrollTop = 0;
    var element = $('#pdfDom22'); // global variable
    var w = element.width();    // 获得该容器的宽
    var h = element.height();    // 获得该容器的高
    var offsetTop = element.offset().top;    // 获得该容器到文档顶部的距离
    var offsetLeft = element.offset().left;    // 获得该容器到文档最左的距离
    var canvas = document.createElement("canvas");
    var abs = 0;
    var win_i = $(window).width();    // 获得当前可视窗口的宽度（不包含滚动条）
    var win_o = window.innerWidth;    // 获得当前窗口的宽度（包含滚动条）
    if(win_o>win_i){
        abs = (win_o - win_i)/2;    // 获得滚动条长度的一半
    }
    canvas.width = w*2;    // 将画布宽&&高放大两倍
    canvas.height = h*6;
    var context = canvas.getContext("2d");
    // context.font=`Roboto,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"`;
    // // 关闭抗锯齿
    // context.mozImageSmoothingEnabled = false;
    // context.webkitImageSmoothingEnabled = false;
    // context.msImageSmoothingEnabled = false;
    // context.imageSmoothingEnabled = false;
    context.scale(1, 1);
    context.translate(-offsetLeft-abs,-offsetTop);
    setTimeout(function(){
        html2canvas(element, {
            scale:window.devicePixelRatio*2,
            dpi:300,
            canvas: canvas,
            useCORS: true,// 【重要】开启跨域配置
            onrendered: function (canvas) {
                getCanvas = canvas.toDataURL();
                // downloadFile('测试.png', getCanvas);
                var pdf = new jsPDF('p', 'mm', [580, 660]);
                pdf.addImage(getCanvas, 'JPEG', 5,0,'','','','FAST')
                pdf.save('myTest.pdf');
            },
        });
    },500)
    
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
    },
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