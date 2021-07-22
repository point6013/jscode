/*
 * @Author: Huang Meng
 * @Date: 2021-07-08 15:25:54
 * @LastEditTime: 2021-07-08 15:25:54
 * @LastEditors: your name
 * @Description: 
 * @FilePath: \jscode\Store_aging.js
 * 可以输入预定的版权声明、个性签名、空行等
 */
var cfs1 = new DevCustomFuncTools();
var storeAgeEchart1Data;
var storeAgeEchart2Data;

// var exportIHtml = `<span class="exportParent" style="position: absolute;right: 251px;top: 10.5px;margin-right: 22px;cursor: pointer;" onclick="tableExportFunction();"><i class="icon-download4" style="margin-right: 6px;""></i><span class="exportSpan">EPS订单明细下载</span></span>`;
// // $($(".dashBoardContent .dataSheet:nth-child(0)").children()[0]).css("position", "relative");
// $($(".dashBoardContent")).append(exportIHtml);
// debugger;
var newSQLStr = "";
function getPovParam(){
    domLoadingShow();
    newSQLStr = "";
    // setTimeout(function(){
        var getSearchParam = showDashBoard.globalCurrentPovObj;
        console.log(getSearchParam)
        // let para = JSON.stringify(getSearchParam)
        let pyName = 'store_aging_dashboard';
        let paraobj = {'filters':getSearchParam}
        // let result = cfs.request.python.web(pyName,paraobj).res.result;
        // let result= cfs.request.python.web('store_aging_dashboard.py', {'filters':getSearchParam}).res
        // console.log(result)
        debugger;
        result =JSON.parse(cfs.request.python.pythonWeb('store_aging_dashboard', paraobj).res)
        // result =JSON.parse(cfs.request.pythonWweb('store_aging_dashboard', paraobj))
        debugger;
        console.log(result)
        newSQLStr=result.res;
        renderModule1();
        renderModule2();
        renderModule3();
        setTimeout(function(){
            domLoadingHide();
        },2000)
        
    // },1000)
}
function renderModule1(){
    console.log("render1")
    var exportIHtml = `<span class="exportParent" style="position: absolute;right: 185px;top: 60px;margin-right: 15px;cursor: pointer;" onclick="tableExportFunction();"><i class="mi-cloud-download" style="margin-right: 1px;""></i><span class="exportSpan">New Store明细下载</span></span>`;
    // $($(".dashBoardContent .dataSheet:nth-child(0)").children()[0]).css("position", "relative");
    $($(".dashBoardContent")).append(exportIHtml);
    debugger;
    var componentId = $(".dashBoardContent .dataSheet:nth-child(1) div .card .echart").attr("id");
    var html2 = `
        <div class="row" style="height: 690px;overflow:auto;table-layout: fixed;border: 1px solid #c1c1c1;">
            <table class="table table-hover datatable-highlight dataTable no-footer table-striped table-xs" style="font-size:12px;">
                <thead>
                    <tr>
                        <th style="padding: 0 4rem;"></th>
                        <th style="padding: 0 4rem;"></th>
                        <th colspan='12' class='x27' style="border-left: 1px solid #c1c1c1;">PER STORE PER MONTH SALES ('000) </th>
                        <th colspan='12' class='x27' style="border-left: 1px solid #c1c1c1;">COMP SALES % </th>
                    </tr>
                    <tr>
                        <td>Store Age</td>
                        <td># of Stores </td>
                        <td>2011</td>
                        <td>2012</td>
                        <td>2013</td>
                        <td>2014</td>
                        <td>2015</td>
                        <td>2016</td>
                        <td>2017</td>
                        <td>2018</td>
                        <td>2019</td>
                        <td>2020</td>
                        <td>2021</td>
                        <td style="background: #c1c1c1;">TTM</td>
                        <td>2011</td>
                        <td>2012</td>
                        <td>2013</td>
                        <td>2014</td>
                        <td>2015</td>
                        <td>2016</td>
                        <td>2017</td>
                        <td>2018</td>
                        <td>2019</td>
                        <td>2020</td>
                        <td>2021</td>
                        <td style="background: #c1c1c1;">TTM</td>
                    </tr>
                </thead>
                <tbody id="table1">

                </tbody>
            </table>
        </div>
    `;
    $("#" + componentId).html(html2);
    var sqlParam = `SELECT
                    Store_Age,
										case when Store_age='Pre 2006' then '2005' else substr(store_age,1,4) end store_age1,
                    count( DISTINCT US_CODE ) AS store_number,
                    sum( CASE WHEN Cal_Year = '2011' THEN sales ELSE NULL END )/1000/sum(case when Cal_Year='2011' then real_count else null end) sale_2011,
                    sum( CASE WHEN Cal_Year = '2012' THEN sales ELSE NULL END )/1000/sum(case when Cal_Year='2012' then real_count else null end) sale_2012,
                    sum( CASE WHEN Cal_Year = '2013' THEN sales ELSE NULL END )/1000/sum(case when Cal_Year='2013' then real_count else null end) sale_2013,
                    sum( CASE WHEN Cal_Year = '2014' THEN sales ELSE NULL END )/1000/sum(case when Cal_Year='2014' then real_count else null end) sale_2014,
                    sum( CASE WHEN Cal_Year = '2015' THEN sales ELSE NULL END )/1000/sum(case when Cal_Year='2015' then real_count else null end) sale_2015,
                    sum( CASE WHEN Cal_Year = '2016' THEN sales ELSE NULL END )/1000/sum(case when Cal_Year='2016' then real_count else null end) sale_2016,
                    sum( CASE WHEN Cal_Year = '2017' THEN sales ELSE NULL END )/12/1000/count(case when Cal_Year='2017' and 
                    counts>=1 then 1 else null end) sale_2017,
                    sum( CASE WHEN Cal_Year = '2018' THEN sales ELSE NULL END )/12/1000/count(case when Cal_Year='2018' and 
                    counts>=1 then 1 else null end) sale_2018,
                    sum( CASE WHEN Cal_Year = '2019' THEN sales ELSE NULL END )/12/1000/count(case when Cal_Year='2019' and 
                    counts>=1 then 1 else null end) sale_2019,
                    sum( CASE WHEN Cal_Year = '2020' and counts>=1 THEN sales ELSE NULL END )/12/1000/count(case when Cal_Year='2020' and 
                    counts>=1 then 1 else null end) sale_2020,
                    sum( CASE WHEN Cal_Year = '2021' and counts>=1 THEN sales ELSE NULL END )/12/1000/count(case when Cal_Year='2021' and 
                    counts>=1 then 1 else null end) sale_2021,
                    sum( CASE WHEN Cal_Year = 'ttm' and counts>=1 THEN sales ELSE NULL END )/12/1000/count(case when Cal_Year='ttm' and 
                    counts>=1 then 1 else null end) sale_ttm,
                    sum( CASE WHEN Cal_year = '2011' THEN comp_cy ELSE NULL END ) / sum( CASE WHEN Cal_year = '2011' THEN comp_py ELSE NULL END )- 1 AS comp_sale_2011,
                	sum( CASE WHEN Cal_year = '2012' THEN comp_cy ELSE NULL END ) / sum( CASE WHEN Cal_year = '2012' THEN comp_py ELSE NULL END )- 1 AS comp_sale_2012,
                	sum( CASE WHEN Cal_year = '2013' THEN comp_cy ELSE NULL END ) / sum( CASE WHEN Cal_year = '2013' THEN comp_py ELSE NULL END )- 1 AS comp_sale_2013,
                	sum( CASE WHEN Cal_year = '2014' THEN comp_cy ELSE NULL END ) / sum( CASE WHEN Cal_year = '2014' THEN comp_py ELSE NULL END )- 1 AS comp_sale_2014,
                	sum( CASE WHEN Cal_year = '2015' THEN comp_cy ELSE NULL END ) / sum( CASE WHEN Cal_year = '2015' THEN comp_py ELSE NULL END )- 1 AS comp_sale_2015,
                	sum( CASE WHEN Cal_year = '2016' THEN comp_cy ELSE NULL END ) / sum( CASE WHEN Cal_year = '2016' THEN comp_py ELSE NULL END )- 1 AS comp_sale_2016,
                	sum( CASE WHEN Cal_year = '2017' THEN comp_cy ELSE NULL END ) / sum( CASE WHEN Cal_year = '2017' THEN comp_py ELSE NULL END )- 1 AS comp_sale_2017,
                	sum( CASE WHEN Cal_year = '2018' THEN comp_cy ELSE NULL END ) / sum( CASE WHEN Cal_year = '2018' THEN comp_py ELSE NULL END )- 1 AS comp_sale_2018,
                	sum( CASE WHEN Cal_year = '2019' THEN comp_cy ELSE NULL END ) / sum( CASE WHEN Cal_year = '2019' THEN comp_py ELSE NULL END )- 1 AS comp_sale_2019,
                	sum( CASE WHEN Cal_year = '2020' THEN comp_cy ELSE NULL END ) / sum( CASE WHEN Cal_year = '2020' THEN comp_py ELSE NULL END )- 1 AS comp_sale_2020,
                	sum( CASE WHEN Cal_year = '2021' THEN comp_cy ELSE NULL END ) / sum( CASE WHEN Cal_year = '2021' THEN comp_py ELSE NULL END )- 1 AS comp_sale_2021,                	
                    	sum( CASE WHEN Cal_year = 'ttm' THEN comp_cy ELSE NULL END ) / sum( CASE WHEN Cal_year = 'ttm' THEN comp_py ELSE NULL END )- 1 AS comp_sale_ttm
                    from 	mcdcapex.app1_store_aging_data_df_sale 
                    WHERE
                        1 = 1 and Ownership='McOpCo'  ${newSQLStr}
                    GROUP BY 1,2
										
										union all 


SELECT
                    '总计' as store_age,
										'all' as store_age1,
                    count( DISTINCT US_CODE ) AS store_number,
                    sum( CASE WHEN Cal_Year = '2011' THEN sales ELSE NULL END )/1000/sum(case when Cal_Year='2011' then real_count else null end) sale_2011,
                    sum( CASE WHEN Cal_Year = '2012' THEN sales ELSE NULL END )/1000/sum(case when Cal_Year='2012' then real_count else null end) sale_2012,
                    sum( CASE WHEN Cal_Year = '2013' THEN sales ELSE NULL END )/1000/sum(case when Cal_Year='2013' then real_count else null end) sale_2013,
                    sum( CASE WHEN Cal_Year = '2014' THEN sales ELSE NULL END )/1000/sum(case when Cal_Year='2014' then real_count else null end) sale_2014,
                    sum( CASE WHEN Cal_Year = '2015' THEN sales ELSE NULL END )/1000/sum(case when Cal_Year='2015' then real_count else null end) sale_2015,
                    sum( CASE WHEN Cal_Year = '2016' THEN sales ELSE NULL END )/1000/sum(case when Cal_Year='2016' then real_count else null end) sale_2016,
                    sum( CASE WHEN Cal_Year = '2017' THEN sales ELSE NULL END )/12/1000/count(case when Cal_Year='2017' and 
                    counts>=1 then 1 else null end) sale_2017,
                    sum( CASE WHEN Cal_Year = '2018' THEN sales ELSE NULL END )/12/1000/count(case when Cal_Year='2018' and 
                    counts>=1 then 1 else null end) sale_2018,
                    sum( CASE WHEN Cal_Year = '2019' THEN sales ELSE NULL END )/12/1000/count(case when Cal_Year='2019' and 
                    counts>=1 then 1 else null end) sale_2019,
                    sum( CASE WHEN Cal_Year = '2020' and counts>=1 THEN sales ELSE NULL END )/12/1000/count(case when Cal_Year='2020' and 
                    counts>=1 then 1 else null end) sale_2020,
                    sum( CASE WHEN Cal_Year = '2021' and counts>=1 THEN sales ELSE NULL END )/12/1000/count(case when Cal_Year='2021' and 
                    counts>=1 then 1 else null end) sale_2021,                    
                    sum( CASE WHEN Cal_Year = 'ttm' and counts>=1 THEN sales ELSE NULL END )/12/1000/count(case when Cal_Year='ttm' and 
                    counts>=1 then 1 else null end) sale_ttm,
                    sum( CASE WHEN Cal_year = '2011' THEN comp_cy ELSE NULL END ) / sum( CASE WHEN Cal_year = '2011' THEN comp_py ELSE NULL END )- 1 AS comp_sale_2011,
                	sum( CASE WHEN Cal_year = '2012' THEN comp_cy ELSE NULL END ) / sum( CASE WHEN Cal_year = '2012' THEN comp_py ELSE NULL END )- 1 AS comp_sale_2012,
                	sum( CASE WHEN Cal_year = '2013' THEN comp_cy ELSE NULL END ) / sum( CASE WHEN Cal_year = '2013' THEN comp_py ELSE NULL END )- 1 AS comp_sale_2013,
                	sum( CASE WHEN Cal_year = '2014' THEN comp_cy ELSE NULL END ) / sum( CASE WHEN Cal_year = '2014' THEN comp_py ELSE NULL END )- 1 AS comp_sale_2014,
                	sum( CASE WHEN Cal_year = '2015' THEN comp_cy ELSE NULL END ) / sum( CASE WHEN Cal_year = '2015' THEN comp_py ELSE NULL END )- 1 AS comp_sale_2015,
                	sum( CASE WHEN Cal_year = '2016' THEN comp_cy ELSE NULL END ) / sum( CASE WHEN Cal_year = '2016' THEN comp_py ELSE NULL END )- 1 AS comp_sale_2016,
                	sum( CASE WHEN Cal_year = '2017' THEN comp_cy ELSE NULL END ) / sum( CASE WHEN Cal_year = '2017' THEN comp_py ELSE NULL END )- 1 AS comp_sale_2017,
                	sum( CASE WHEN Cal_year = '2018' THEN comp_cy ELSE NULL END ) / sum( CASE WHEN Cal_year = '2018' THEN comp_py ELSE NULL END )- 1 AS comp_sale_2018,
                	sum( CASE WHEN Cal_year = '2019' THEN comp_cy ELSE NULL END ) / sum( CASE WHEN Cal_year = '2019' THEN comp_py ELSE NULL END )- 1 AS comp_sale_2019,
                	sum( CASE WHEN Cal_year = '2020' THEN comp_cy ELSE NULL END ) / sum( CASE WHEN Cal_year = '2020' THEN comp_py ELSE NULL END )- 1 AS comp_sale_2020,
                 	sum( CASE WHEN Cal_year = '2021' THEN comp_cy ELSE NULL END ) / sum( CASE WHEN Cal_year = '2021' THEN comp_py ELSE NULL END )- 1 AS comp_sale_2021,                      	
                    	sum( CASE WHEN Cal_year = 'ttm' THEN comp_cy ELSE NULL END ) / sum( CASE WHEN Cal_year = 'ttm' THEN comp_py ELSE NULL END )- 1 AS comp_sale_ttm
                    from 	mcdcapex.app1_store_aging_data_df_sale 
                    WHERE
                        1 = 1 and Ownership='McOpCo' ${newSQLStr}
                    GROUP BY 1,2
										order by 2 ASC
                    `;
                    debugger
    var res2 = cfs.request.foundation.runComm(sqlParam);
    var tbodyHtml = "";
    $.each(res2.res,function(k,v){
        tbodyHtml += `
                <tr>
                    <td>${v.Store_Age}</td>
                    <td>${v.store_number}</td>
                    <td>${v["sale_2011"] !== null ? format(Math.round(v["sale_2011"])) : ""}</td>
                    <td>${v["sale_2012"] !== null ? format(Math.round(v["sale_2012"])) : ""}</td>
                    <td>${v["sale_2013"] !== null ? format(Math.round(v["sale_2013"])) : ""}</td>
                    <td>${v["sale_2014"] !== null ? format(Math.round(v["sale_2014"])) : ""}</td>
                    <td>${v["sale_2015"] !== null ? format(Math.round(v["sale_2015"])) : ""}</td>
                    <td>${v["sale_2016"] !== null ? format(Math.round(v["sale_2016"])) : ""}</td>
                    <td>${v["sale_2017"] !== null ? format(Math.round(v["sale_2017"])) : ""}</td>
                    <td>${v["sale_2018"] !== null ? format(Math.round(v["sale_2018"])) : ""}</td>
                    <td>${v["sale_2019"] !== null ? format(Math.round(v["sale_2019"])) : ""}</td>
                    <td>${v["sale_2020"] !== null ? format(Math.round(v["sale_2020"])) : ""}</td>
                    <td>${v["sale_2021"] !== null ? format(Math.round(v["sale_2021"])) : ""}</td>
                    <td style="background: #c1c1c1;">${v["sale_ttm"] !== null ? format(Math.round(v["sale_ttm"])): ""}</td>
                    <td>${v["comp_sale_2011"] !== null ? (Number(v["comp_sale_2011"])*100).toFixed(1) + "%" : ""}</td>
                    <td>${v["comp_sale_2012"] !== null ? (Number(v["comp_sale_2012"])*100).toFixed(1) + "%" : ""}</td>
                    <td>${v["comp_sale_2013"] !== null ? (Number(v["comp_sale_2013"])*100).toFixed(1) + "%" : ""}</td>
                    <td>${v["comp_sale_2014"] !== null ? (Number(v["comp_sale_2014"])*100).toFixed(1) + "%" : ""}</td>
                    <td>${v["comp_sale_2015"] !== null ? (Number(v["comp_sale_2015"])*100).toFixed(1) + "%" : ""}</td>
                    <td>${v["comp_sale_2016"] !== null ? (Number(v["comp_sale_2016"])*100).toFixed(1) + "%" : ""}</td>
                    <td>${v["comp_sale_2017"] !== null ? (Number(v["comp_sale_2017"])*100).toFixed(1) + "%" : ""}</td>
                    <td>${v["comp_sale_2018"] !== null ? (Number(v["comp_sale_2018"])*100).toFixed(1) + "%" : ""}</td>
                    <td>${v["comp_sale_2019"] !== null ? (Number(v["comp_sale_2019"])*100).toFixed(1) + "%" : ""}</td>
                    <td>${v["comp_sale_2020"] !== null ? (Number(v["comp_sale_2020"])*100).toFixed(1) + "%" : ""}</td>
                    <td>${v["comp_sale_2021"] !== null ? (Number(v["comp_sale_2021"])*100).toFixed(1) + "%" : ""}</td>
                    <td style="background: #c1c1c1;">${v["comp_sale_ttm"] !== null ? (Number(v["comp_sale_ttm"]) *100).toFixed(1) + "%" : ""}</td>
                </tr>`;
    })
    $("#table1").html(tbodyHtml);
}
function renderModule2(){
    var componentId = $(".dashBoardContent .dataSheet:nth-child(2) div .card .echart").attr("id");
    var html = `
    <div class="row" style="height: 722px;overflow:auto;table-layout: fixed;border: 1px solid #c1c1c1;">
        <table class="table table-hover datatable-highlight dataTable no-footer table-striped table-xs">
            <thead>
                <tr>
                    <td style="padding: 0 4rem;"></td>
                    <td style="padding: 0 4rem;"></td>
                    <td colspan="12" class="x27" width="792" style="border-left: 1px solid #c1c1c1;">&nbsp;Yearly CASH FLOW ('000) </td>
                    <td colspan="12" class="x27" width="792" style="border-left: 1px solid #c1c1c1;">&nbsp;PER STORE INVESTMENT ('000) </td>
                </tr>
                <tr>
                    <td>Store Age</td>
                    <td># of Stores</td>
                    <td>2011</td>
                    <td>2012</td>
                    <td>2013</td>
                    <td>2014</td>
                    <td>2015</td>
                    <td>2016</td>
                    <td>2017</td>
                    <td>2018</td>
                    <td>2019</td>
                    <td>2020</td>
                    <td>2021</td>
                    <td style="background: #c1c1c1;"><span style="float:right;">TTM </td>
                    <td>2011</td>
                    <td>2012</td>
                    <td>2013</td>
                    <td>2014</td>
                    <td>2015</td>
                    <td>2016</td>
                    <td>2017</td>
                    <td>2018</td>
                    <td>2019</td>
                    <td>2020</td>
                    <td>2021</td>
                    <td style="background: #c1c1c1;"><span style="float:right;">TTM </td>
                </tr>
            </thead>
            <tbody id="table2">
                
            </tbody>
        </table>
    </div>
    `;
    $("#" + componentId).html(html);
    var sqlParam = `SELECT
                    Store_Age,
                    case when Store_age='Pre 2006' then '2005' else substr(store_age,1,4) end store_age1,
                    count( DISTINCT US_CODE ) AS store_number,
                    sum( CASE WHEN Cal_Year = '2011' THEN CF ELSE NULL END )*12/1000/sum(case when Cal_Year='2011' then count_after else null end) CF_2011,
                    sum( CASE WHEN Cal_Year = '2012' THEN CF ELSE NULL END )*12/1000/sum(case when Cal_Year='2012' then count_after else null end) CF_2012,
                    sum( CASE WHEN Cal_Year = '2013' THEN CF ELSE NULL END )*12/1000/sum(case when Cal_Year='2013' then count_after else null end) CF_2013,
                    sum( CASE WHEN Cal_Year = '2014' THEN CF ELSE NULL END )*12/1000/sum(case when Cal_Year='2014' then count_after else null end) CF_2014,
                    sum( CASE WHEN Cal_Year = '2015' THEN CF ELSE NULL END )*12/1000/sum(case when Cal_Year='2015' then count_after else null end) CF_2015,
                    sum( CASE WHEN Cal_Year = '2016' THEN CF ELSE NULL END )*12/1000/sum(case when Cal_Year='2016' then count_after else null end) CF_2016,
                    sum( CASE WHEN Cal_Year = '2017' THEN CF ELSE NULL END )/1000/count(case when Cal_Year='2017' and 
                    counts>=1 then 1 else null end) CF_2017,
                    sum( CASE WHEN Cal_Year = '2018' THEN CF ELSE NULL END )/1000/count(case when Cal_Year='2018' and 
                    counts>=1 then 1 else null end) CF_2018,
                    sum( CASE WHEN Cal_Year = '2019' THEN CF ELSE NULL END )/1000/count(case when Cal_Year='2019' and 
                    counts>=1 then 1 else null end) CF_2019,
                    sum( CASE WHEN Cal_Year = '2020' and counts>=1 THEN CF ELSE NULL END )/1000/count(case when Cal_Year='2020' and 
                    counts>=1 then 1 else null end) CF_2020,
                    sum( CASE WHEN Cal_Year = '2021' and counts>=1 THEN CF ELSE NULL END )/1000/count(case when Cal_Year='2021' and 
                    counts>=1 then 1 else null end) CF_2021,                    
                    sum( CASE WHEN Cal_Year = 'ttm' and counts>=1 THEN CF ELSE NULL END )/1000/count(case when Cal_Year='ttm' and 
                    counts>=1 then 1 else null end) CF_ttm,
                    
                    
                	sum( CASE WHEN Cal_Year = '2011' THEN Inv ELSE NULL END )/sum(case when  Cal_Year = '2011' then Inv_Counts else null end) Inv_2011,
                	sum( CASE WHEN Cal_Year = '2012' THEN Inv ELSE NULL END )/sum(case when  Cal_Year = '2012' then Inv_Counts else null end) Inv_2012,
                	sum( CASE WHEN Cal_Year = '2013' THEN Inv ELSE NULL END )/sum(case when  Cal_Year = '2013' then Inv_Counts else null end) Inv_2013,
                	sum( CASE WHEN Cal_Year = '2014' THEN Inv ELSE NULL END )/sum(case when  Cal_Year = '2014' then Inv_Counts else null end) Inv_2014,
                	sum( CASE WHEN Cal_Year = '2015' THEN Inv ELSE NULL END )/sum(case when  Cal_Year = '2015' then Inv_Counts else null end) Inv_2015,
                	sum( CASE WHEN Cal_Year = '2016' THEN Inv ELSE NULL END )/sum(case when  Cal_Year = '2016' then Inv_Counts else null end) Inv_2016,
                	sum( CASE WHEN Cal_Year = '2017' THEN Inv ELSE NULL END )/sum(case when  Cal_Year = '2017' then Inv_Counts  else null end) Inv_2017,
                	sum( CASE WHEN Cal_Year = '2018' THEN Inv ELSE NULL END ) /sum(case when  Cal_Year = '2018' then  Inv_Counts else null end)Inv_2018,
                	sum( CASE WHEN Cal_Year = '2019' THEN Inv ELSE NULL END ) /sum(case when  Cal_Year = '2019' then Inv_Counts else null end)Inv_2019,
                	sum( CASE WHEN Cal_Year = '2020' and counts>=1 THEN Inv ELSE NULL END )/sum(case when  Cal_Year = '2020' then Inv_Counts else null end) Inv_2020,
                	sum( CASE WHEN Cal_Year = '2021' and counts>=1 THEN Inv ELSE NULL END )/sum(case when  Cal_Year = '2021' then Inv_Counts else null end) Inv_2021,
                	sum( CASE WHEN Cal_Year = 'ttm' and counts>=1 THEN Inv ELSE NULL END )/sum(case when  Cal_Year = 'ttm' then Inv_Counts else null end) Inv_ttm
                    
                    from 	mcdcapex.app1_store_aging_data_df_sale
                    where 1=1 and Ownership='McOpCo' ${newSQLStr}
                    GROUP BY 1,2
                    union all 
                    
                    SELECT
                    '总计' store_age,
                    'all'  as store_age1,
                    count( DISTINCT US_CODE ) AS store_number,
                    sum( CASE WHEN Cal_Year = '2011' THEN CF ELSE NULL END )*12/1000/sum(case when Cal_Year='2011' then count_after else null end) CF_2011,
                    sum( CASE WHEN Cal_Year = '2012' THEN CF ELSE NULL END )*12/1000/sum(case when Cal_Year='2012' then count_after else null end) CF_2012,
                    sum( CASE WHEN Cal_Year = '2013' THEN CF ELSE NULL END )*12/1000/sum(case when Cal_Year='2013' then count_after else null end) CF_2013,
                    sum( CASE WHEN Cal_Year = '2014' THEN CF ELSE NULL END )*12/1000/sum(case when Cal_Year='2014' then count_after else null end) CF_2014,
                    sum( CASE WHEN Cal_Year = '2015' THEN CF ELSE NULL END )*12/1000/sum(case when Cal_Year='2015' then count_after else null end) CF_2015,
                    sum( CASE WHEN Cal_Year = '2016' THEN CF ELSE NULL END )*12/1000/sum(case when Cal_Year='2016' then count_after else null end) CF_2016,
                    sum( CASE WHEN Cal_Year = '2017' THEN CF ELSE NULL END )/1000/count(case when Cal_Year='2017' and 
                    counts>=1 then 1 else null end) CF_2017,
                    sum( CASE WHEN Cal_Year = '2018' THEN CF ELSE NULL END )/1000/count(case when Cal_Year='2018' and 
                    counts>=1 then 1 else null end) CF_2018,
                    sum( CASE WHEN Cal_Year = '2019' THEN CF ELSE NULL END )/1000/count(case when Cal_Year='2019' and 
                    counts>=1 then 1 else null end) CF_2019,
                    sum( CASE WHEN Cal_Year = '2020' and counts>=1  THEN CF ELSE NULL END )/1000/count(case when Cal_Year='2020' and 
                    counts>=1 then 1 else null end) CF_2020,
                    sum( CASE WHEN Cal_Year = '2021' and counts>=1  THEN CF ELSE NULL END )/1000/count(case when Cal_Year='2021' and 
                    counts>=1 then 1 else null end) CF_2021,                    
                    sum( CASE WHEN Cal_Year = 'ttm' and counts>=1  THEN CF ELSE NULL END )/1000/count(case when Cal_Year='ttm' and 
                    counts>=1 then 1 else null end) CF_ttm,
                    
                    
                	sum( CASE WHEN Cal_Year = '2011' THEN Inv ELSE NULL END )/sum(case when  Cal_Year = '2011' then Inv_Counts else null end) Inv_2011,
                	sum( CASE WHEN Cal_Year = '2012' THEN Inv ELSE NULL END )/sum(case when  Cal_Year = '2012' then Inv_Counts else null end) Inv_2012,
                	sum( CASE WHEN Cal_Year = '2013' THEN Inv ELSE NULL END )/sum(case when  Cal_Year = '2013' then Inv_Counts else null end) Inv_2013,
                	sum( CASE WHEN Cal_Year = '2014' THEN Inv ELSE NULL END )/sum(case when  Cal_Year = '2014' then Inv_Counts else null end) Inv_2014,
                	sum( CASE WHEN Cal_Year = '2015' THEN Inv ELSE NULL END )/sum(case when  Cal_Year = '2015' then Inv_Counts else null end) Inv_2015,
                	sum( CASE WHEN Cal_Year = '2016' THEN Inv ELSE NULL END )/sum(case when  Cal_Year = '2016' then Inv_Counts else null end) Inv_2016,
                	sum( CASE WHEN Cal_Year = '2017' THEN Inv ELSE NULL END )/sum(case when  Cal_Year = '2017' then Inv_Counts  else null end) Inv_2017,
                	sum( CASE WHEN Cal_Year = '2018' THEN Inv ELSE NULL END ) /sum(case when  Cal_Year = '2018' then  Inv_Counts else null end)Inv_2018,
                	sum( CASE WHEN Cal_Year = '2019' THEN Inv ELSE NULL END ) /sum(case when  Cal_Year = '2019' then Inv_Counts else null end)Inv_2019,
                	sum( CASE WHEN Cal_Year = '2020' and counts>=1 THEN Inv ELSE NULL END )/sum(case when  Cal_Year = '2020' then Inv_Counts else null end) Inv_2020,
                	sum( CASE WHEN Cal_Year = '2021' and counts>=1 THEN Inv ELSE NULL END )/sum(case when  Cal_Year = '2021' then Inv_Counts else null end) Inv_2021,
                	sum( CASE WHEN Cal_Year = 'ttm' and counts>=1 THEN Inv ELSE NULL END )/sum(case when  Cal_Year = 'ttm' then Inv_Counts else null end) Inv_ttm
                    
                    from 	mcdcapex.app1_store_aging_data_df_sale
                    where 1=1 and Ownership='McOpCo' ${newSQLStr}
                    GROUP BY 1,2
                    order by 2
                    `;
    var res2 = cfs.request.foundation.runComm(sqlParam);
    var tbodyHtml = "";
    $.each(res2.res,function(k,v){
        tbodyHtml += `
                <tr>
                    <td>${v.Store_Age}</td>
                    <td>${v.store_number}</td>
                    <td>${v["CF_2011"] !== null ? format(Math.round(v["CF_2011"])) : ""}</td>
                    <td>${v["CF_2012"] !== null ? format(Math.round(v["CF_2012"])) : ""}</td>
                    <td>${v["CF_2013"] !== null ? format(Math.round(v["CF_2013"])) : ""}</td>
                    <td>${v["CF_2014"] !== null ? format(Math.round(v["CF_2014"])) : ""}</td>
                    <td>${v["CF_2015"] !== null ? format(Math.round(v["CF_2015"])) : ""}</td>
                    <td>${v["CF_2016"] !== null ? format(Math.round(v["CF_2016"])) : ""}</td>
                    <td>${v["CF_2017"] !== null ? format(Math.round(v["CF_2017"])) : ""}</td>
                    <td>${v["CF_2018"] !== null ? format(Math.round(v["CF_2018"])) : ""}</td>
                    <td>${v["CF_2019"] !== null ? format(Math.round(v["CF_2019"])) : ""}</td>
                    <td>${v["CF_2020"] !== null ? format(Math.round(v["CF_2020"])) : ""}</td>
                    <td>${v["CF_2021"] !== null ? format(Math.round(v["CF_2021"])) : ""}</td>
                    <td style="background: #c1c1c1;">${v["CF_ttm"] !== null ? format(Math.round(v["CF_ttm"])) : ""}</td>
                    <td>${v["Inv_2011"] !== null ? format(Math.round(v["Inv_2011"])) : ""}</td>
                    <td>${v["Inv_2012"] !== null ? format(Math.round(v["Inv_2012"])) : ""}</td>
                    <td>${v["Inv_2013"] !== null ? format(Math.round(v["Inv_2013"])) : ""}</td>
                    <td>${v["Inv_2014"] !== null ? format(Math.round(v["Inv_2014"])) : ""}</td>
                    <td>${v["Inv_2015"] !== null ? format(Math.round(v["Inv_2015"])) : ""}</td>
                    <td>${v["Inv_2016"] !== null ? format(Math.round(v["Inv_2016"])) : ""}</td>
                    <td>${v["Inv_2017"] !== null ? format(Math.round(v["Inv_2017"])) : ""}</td>
                    <td>${v["Inv_2018"] !== null ? format(Math.round(v["Inv_2018"])) : ""}</td>
                    <td>${v["Inv_2019"] !== null ? format(Math.round(v["Inv_2019"])) : ""}</td>
                    <td>${v["Inv_2020"] !== null ? format(Math.round(v["Inv_2020"])) : ""}</td>
                    <td>${v["Inv_2021"] !== null ? format(Math.round(v["Inv_2021"])) : ""}</td>
                    <td style="background: #c1c1c1;">${v["Inv_ttm"] !== null ? format(Math.round(v["Inv_ttm"])) : ""}</td>
                </tr>`;
    })
    $("#table2").html(tbodyHtml);
}
function renderModule3(){
    var componentId = $(".dashBoardContent .dataSheet:nth-child(3) div .card .echart").attr("id");
    var html = `
    <div class="row" style="height: 690px;overflow:auto;table-layout: fixed;border: 1px solid #c1c1c1;">
    <table class="table table-hover datatable-highlight dataTable no-footer table-striped table-xs" style="font-size:12px;">
        <thead>
            <tr>
                <td  style="padding: 0 4rem;"></td>
                <td  style="padding: 0 4rem;"></td>
                <td colspan='12' class='x40' width='792' style="border-left: 1px solid #c1c1c1;">&nbsp;Cash ROI % = CF / Investment </td>
                <td colspan='12' class='x27' width='792' style="border-left: 1px solid #c1c1c1;">&nbsp;McOpCo Margin %<span style='mso-spacerun:yes;'>&nbsp; </span></td>
            </tr>
            <tr>
                <td>Store Age</td>
                <td># of Stores </td>
                <td>2011</td>
                <td>2012</td>
                <td>2013</td>
                <td>2014</td>
                <td>2015</td>
                <td>2016</td>
                <td>2017</td>
                <td>2018</td>
                <td>2019</td>
                <td>2020</td>
                <td>2021</td>
                <td style="background: #c1c1c1;">TTM</td>
                <td>2011</td>
                <td>2012</td>
                <td>2013</td>
                <td>2014</td>
                <td>2015</td>
                <td>2016</td>
                <td>2017</td>
                <td>2018</td>
                <td>2019</td>
                <td>2020</td>
                <td>2021</td>
                <td style="background: #c1c1c1;">TTM </td>
            </tr>
        </thead>
        <tbody id="table3">
        
        </tbody>
    </div>
    `;
    $("#" + componentId).html(html);
    var sqlParam = `
                SELECT
                Store_Age,
                case when Store_age='Pre 2006' then '2005' else substr(store_age,1,4) end store_age1,
                count( DISTINCT US_CODE ) AS store_number,
                sum( CASE WHEN Cal_Year = '2011' THEN CF ELSE NULL END )*12/1000/sum(case when Cal_Year='2011' then count_after else null end)/	(sum( CASE WHEN Cal_Year = '2011' THEN Inv ELSE NULL END )/sum(case when  Cal_Year = '2011' then Inv_Counts else null end)) cash_roi_2011,
                sum( CASE WHEN Cal_Year = '2012' THEN CF ELSE NULL END )*12/1000/sum(case when Cal_Year='2012' then count_after else null end)/	(sum( CASE WHEN Cal_Year = '2012' THEN Inv ELSE NULL END )/sum(case when  Cal_Year = '2012' then Inv_Counts else null end)) cash_roi_2012,
                sum( CASE WHEN Cal_Year = '2013' THEN CF ELSE NULL END )*12/1000/sum(case when Cal_Year='2013' then count_after else null end)/	(sum( CASE WHEN Cal_Year = '2013' THEN Inv ELSE NULL END )/sum(case when  Cal_Year = '2013' then Inv_Counts else null end)) cash_roi_2013,
                
                sum( CASE WHEN Cal_Year = '2014' THEN CF ELSE NULL END )*12/1000/sum(case when Cal_Year='2014' then count_after else null end)/	(sum( CASE WHEN Cal_Year = '2014' THEN Inv ELSE NULL END )/sum(case when  Cal_Year = '2014' then Inv_Counts else null end)) cash_roi_2014,
                sum( CASE WHEN Cal_Year = '2015' THEN CF ELSE NULL END )*12/1000/sum(case when Cal_Year='2015' then count_after else null end)/	(sum( CASE WHEN Cal_Year = '2015' THEN Inv ELSE NULL END )/sum(case when  Cal_Year = '2015' then Inv_Counts else null end)) cash_roi_2015,
                sum( CASE WHEN Cal_Year = '2016' THEN CF ELSE NULL END )*12/1000/sum(case when Cal_Year='2016' then count_after else null end)/	(sum( CASE WHEN Cal_Year = '2016' THEN Inv ELSE NULL END )/sum(case when  Cal_Year = '2016' then Inv_Counts else null end)) cash_roi_2016,
                sum(case when Cal_Year='2017' then CF else null end) /1000/sum(case when Cal_Year='2017' then Inv else null end) cash_roi_2017,
                
                sum(case when Cal_Year='2018' then CF else null end)/1000 /sum(case when Cal_Year='2018' then Inv else null end) cash_roi_2018,
                sum(case when Cal_Year='2019' then CF else null end)/1000 /sum(case when Cal_Year='2019' then Inv else null end) cash_roi_2019,
                
                sum(case when Cal_Year='2020' and counts>=1 then CF else null end)/1000 /sum(case when Cal_Year='2020'and counts>=1  then Inv else null end) cash_roi_2020,
                sum(case when Cal_Year='2021' and counts>=1 then CF else null end)/1000 /sum(case when Cal_Year='2021'and counts>=1  then Inv else null end) cash_roi_2021,
                sum(case when Cal_Year='ttm' and counts>=1 then CF else null end) /1000/sum(case when Cal_Year='ttm' and counts>=1  then Inv else null end) cash_roi_ttm,
                
                sum( CASE WHEN Cal_Year = '2011'  THEN margin_fee ELSE NULL END )	/sum(case when Cal_Year='2011' then TNS else null end)  M_margin_2011,
                sum( CASE WHEN Cal_Year = '2012' THEN margin_fee ELSE NULL END )	/sum(case when Cal_Year='2012' then TNS else null end)  M_margin_2012,
                sum( CASE WHEN Cal_Year = '2013' THEN margin_fee ELSE NULL END )	/sum(case when Cal_Year='2013' then TNS else null end)  M_margin_2013,
                sum( CASE WHEN Cal_Year = '2014' THEN margin_fee ELSE NULL END )	/sum(case when Cal_Year='2014' then TNS else null end)  M_margin_2014,
                sum( CASE WHEN Cal_Year = '2015' THEN margin_fee ELSE NULL END )	/sum(case when Cal_Year='2015' then TNS else null end)  M_margin_2015,
                sum( CASE WHEN Cal_Year = '2016' THEN margin_fee ELSE NULL END )	/sum(case when Cal_Year='2016' then TNS else null end)  M_margin_2016,
                sum( CASE WHEN Cal_Year = '2017' THEN margin_fee ELSE NULL END )	/sum(case when Cal_Year='2017' then TNS else null end)  M_margin_2017,
                sum( CASE WHEN Cal_Year = '2018' THEN margin_fee ELSE NULL END )	/sum(case when Cal_Year='2018' then TNS else null end)  M_margin_2018,
                sum( CASE WHEN Cal_Year = '2019' THEN margin_fee ELSE NULL END )	/sum(case when Cal_Year='2019' then TNS else null end)  M_margin_2019,
                sum( CASE WHEN Cal_Year = '2020' and counts>=1 THEN margin_fee ELSE NULL END )	/sum(case when Cal_Year='2020' and counts>=1 then TNS else null end)  M_margin_2020,
                sum( CASE WHEN Cal_Year = '2021' and counts>=1 THEN margin_fee ELSE NULL END )	/sum(case when Cal_Year='2021' and counts>=1 then TNS else null end)  M_margin_2021,
                sum( CASE WHEN Cal_Year = 'ttm' and counts>=1 THEN margin_fee ELSE NULL END )	/sum(case when Cal_Year='ttm' and counts>=1 then TNS else null end)  M_margin_ttm
                
                from 	mcdcapex.app1_store_aging_data_df_sale
                where 1=1 and Ownership='McOpCo' ${newSQLStr}
                GROUP BY 1,2
                
                union all
                
                
                SELECT
                '总计' store_age,
                'all' store_age1,
                count( DISTINCT US_CODE ) AS store_number,
                sum( CASE WHEN Cal_Year = '2011' THEN CF ELSE NULL END )*12/1000/sum(case when Cal_Year='2011' then count_after else null end)/	(sum( CASE WHEN Cal_Year = '2011' THEN Inv ELSE NULL END )/sum(case when  Cal_Year = '2011' then Inv_Counts else null end)) cash_roi_2011,
                sum( CASE WHEN Cal_Year = '2012' THEN CF ELSE NULL END )*12/1000/sum(case when Cal_Year='2012' then count_after else null end)/	(sum( CASE WHEN Cal_Year = '2012' THEN Inv ELSE NULL END )/sum(case when  Cal_Year = '2012' then Inv_Counts else null end)) cash_roi_2012,
                sum( CASE WHEN Cal_Year = '2013' THEN CF ELSE NULL END )*12/1000/sum(case when Cal_Year='2013' then count_after else null end)/	(sum( CASE WHEN Cal_Year = '2013' THEN Inv ELSE NULL END )/sum(case when  Cal_Year = '2013' then Inv_Counts else null end)) cash_roi_2013,
                
                sum( CASE WHEN Cal_Year = '2014' THEN CF ELSE NULL END )*12/1000/sum(case when Cal_Year='2014' then count_after else null end)/	(sum( CASE WHEN Cal_Year = '2014' THEN Inv ELSE NULL END )/sum(case when  Cal_Year = '2014' then Inv_Counts else null end)) cash_roi_2014,
                sum( CASE WHEN Cal_Year = '2015' THEN CF ELSE NULL END )*12/1000/sum(case when Cal_Year='2015' then count_after else null end)/	(sum( CASE WHEN Cal_Year = '2015' THEN Inv ELSE NULL END )/sum(case when  Cal_Year = '2015' then Inv_Counts else null end)) cash_roi_2015,
                sum( CASE WHEN Cal_Year = '2016' THEN CF ELSE NULL END )*12/1000/sum(case when Cal_Year='2016' then count_after else null end)/	(sum( CASE WHEN Cal_Year = '2016' THEN Inv ELSE NULL END )/sum(case when  Cal_Year = '2016' then Inv_Counts else null end)) cash_roi_2016,
                sum(case when Cal_Year='2017' then CF else null end) /1000/sum(case when Cal_Year='2017' then Inv else null end) cash_roi_2017,
                
                sum(case when Cal_Year='2018' then CF else null end)/1000 /sum(case when Cal_Year='2018' then Inv else null end) cash_roi_2018,
                sum(case when Cal_Year='2019' then CF else null end)/1000 /sum(case when Cal_Year='2019' then Inv else null end) cash_roi_2019,
                
                sum(case when Cal_Year='2020' and counts>=1 then CF else null end)/1000 /sum(case when Cal_Year='2020' then Inv else null end) cash_roi_2020,
                sum(case when Cal_Year='2021' and counts>=1 then CF else null end)/1000 /sum(case when Cal_Year='2021' then Inv else null end) cash_roi_2021,
                sum(case when Cal_Year='ttm' and counts>=1 then CF else null end) /1000/sum(case when Cal_Year='ttm' then Inv else null end) cash_roi_ttm,
                
                sum( CASE WHEN Cal_Year = '2011'  THEN margin_fee ELSE NULL END )	/sum(case when Cal_Year='2011' then TNS else null end)  M_margin_2011,
                sum( CASE WHEN Cal_Year = '2012' THEN margin_fee ELSE NULL END )	/sum(case when Cal_Year='2012' then TNS else null end)  M_margin_2012,
                sum( CASE WHEN Cal_Year = '2013' THEN margin_fee ELSE NULL END )	/sum(case when Cal_Year='2013' then TNS else null end)  M_margin_2013,
                sum( CASE WHEN Cal_Year = '2014' THEN margin_fee ELSE NULL END )	/sum(case when Cal_Year='2014' then TNS else null end)  M_margin_2014,
                sum( CASE WHEN Cal_Year = '2015' THEN margin_fee ELSE NULL END )	/sum(case when Cal_Year='2015' then TNS else null end)  M_margin_2015,
                sum( CASE WHEN Cal_Year = '2016' THEN margin_fee ELSE NULL END )	/sum(case when Cal_Year='2016' then TNS else null end)  M_margin_2016,
                sum( CASE WHEN Cal_Year = '2017' THEN margin_fee ELSE NULL END )	/sum(case when Cal_Year='2017' then TNS else null end)  M_margin_2017,
                sum( CASE WHEN Cal_Year = '2018' THEN margin_fee ELSE NULL END )	/sum(case when Cal_Year='2018' then TNS else null end)  M_margin_2018,
                sum( CASE WHEN Cal_Year = '2019' THEN margin_fee ELSE NULL END )	/sum(case when Cal_Year='2019' then TNS else null end)  M_margin_2019,
                sum( CASE WHEN Cal_Year = '2020' and counts>=1 THEN margin_fee ELSE NULL END )	/sum(case when Cal_Year='2020' and counts>=1 then TNS else null end)  M_margin_2020,
                sum( CASE WHEN Cal_Year = '2021' and counts>=1 THEN margin_fee ELSE NULL END )	/sum(case when Cal_Year='2021' and counts>=1 then TNS else null end)  M_margin_2021,
                sum( CASE WHEN Cal_Year = 'ttm' and counts>=1 THEN margin_fee ELSE NULL END )	/sum(case when Cal_Year='ttm' and counts>=1 then TNS else null end)  M_margin_ttm
                
                from 	mcdcapex.app1_store_aging_data_df_sale
                where 1=1 and Ownership='McOpCo' ${newSQLStr}
                GROUP BY 1,2
                order by 2
                    `;
    var res2 = cfs.request.foundation.runComm(sqlParam);
    var tbodyHtml = "";
    $.each(res2.res,function(k,v){
        tbodyHtml += `
                <tr>
                    <td>${v.Store_Age}</td>
                    <td>${v.store_number}</td>
                    <td>${v["cash_roi_2011"] !== null ? (Number(v["cash_roi_2011"]) * 100).toFixed(1) + "%" : ""}</td>
                    <td>${v["cash_roi_2012"] !== null ? (Number(v["cash_roi_2012"]) * 100).toFixed(1) + "%" : ""}</td>
                    <td>${v["cash_roi_2013"] !== null ? (Number(v["cash_roi_2013"]) * 100).toFixed(1) + "%" : ""}</td>
                    <td>${v["cash_roi_2014"] !== null ? (Number(v["cash_roi_2014"]) * 100).toFixed(1) + "%" : ""}</td>

                    <td>${v["cash_roi_2015"] !== null ? (Number(v["cash_roi_2015"]) * 100).toFixed(1) + "%" : ""}</td>
                    <td>${v["cash_roi_2016"] !== null ? (Number(v["cash_roi_2016"]) * 100).toFixed(1) + "%" : ""}</td>
                    <td>${v["cash_roi_2017"] !== null ? (Number(v["cash_roi_2017"]) * 100).toFixed(1) + "%" : ""}</td>
                    <td>${v["cash_roi_2018"] !== null ? (Number(v["cash_roi_2018"]) * 100).toFixed(1) + "%" : ""}</td>
                    <td>${v["cash_roi_2019"] !== null ? (Number(v["cash_roi_2019"]) * 100).toFixed(1) + "%" : ""}</td>
                    <td>${v["cash_roi_2020"] !== null ? (Number(v["cash_roi_2020"]) * 100).toFixed(1) + "%" : ""}</td>
                    <td>${v["cash_roi_2021"] !== null ? (Number(v["cash_roi_2021"]) * 100).toFixed(1) + "%" : ""}</td>
                    <td style="background: #c1c1c1;">${v["cash_roi_ttm"] !== null ? (Number(v["cash_roi_ttm"]) * 100).toFixed(1) + "%" : ""}</td>
                    <td>${v["M_margin_2011"] !== null ? (Number(v["M_margin_2011"]) * 100).toFixed(1) + "%" : ""}</td>
                    <td>${v["M_margin_2012"] !== null ? (Number(v["M_margin_2012"]) * 100).toFixed(1) + "%" : ""}</td>
                    <td>${v["M_margin_2013"] !== null ? (Number(v["M_margin_2013"]) * 100).toFixed(1) + "%" : ""}</td>
                    <td>${v["M_margin_2014"] !== null ? (Number(v["M_margin_2014"]) * 100).toFixed(1) + "%" : ""}</td>
                    <td>${v["M_margin_2015"] !== null ? (Number(v["M_margin_2015"]) * 100).toFixed(1) + "%" : ""}</td>
                    <td>${v["M_margin_2016"] !== null ? (Number(v["M_margin_2016"]) * 100).toFixed(1) + "%" : ""}</td>
                    <td>${v["M_margin_2017"] !== null ? (Number(v["M_margin_2017"]) * 100).toFixed(1) + "%" : ""}</td>
                    <td>${v["M_margin_2018"] !== null ? (Number(v["M_margin_2018"]) * 100).toFixed(1) + "%" : ""}</td>
                    <td>${v["M_margin_2019"] !== null ? (Number(v["M_margin_2019"]) * 100).toFixed(1) + "%" : ""}</td>
                    <td>${v["M_margin_2020"] !== null ? (Number(v["M_margin_2020"]) * 100).toFixed(1) + "%" : ""}</td>
                    <td>${v["M_margin_2021"] !== null ? (Number(v["M_margin_2021"]) * 100).toFixed(1) + "%" : ""}</td>
                    <td style="background: #c1c1c1;">${v["M_margin_ttm"] !== null ? (Number(v["M_margin_ttm"]) * 100).toFixed(1) + "%" : ""}</td>
                </tr>`;
    })
    $("#table3").html(tbodyHtml);
}

function renderModule4(){
    $(document).ready(function () {
        $('.select').select2({
            minimumResultsForSearch: Infinity
        });
    });
    var componentId = $(".dashBoardContent .dataSheet:nth-child(1) div .card .echart").attr("id");
    var html = "";
    html += `<div class="form-group row" style="margin-left:5px;">
                        <div class="col-lg-12">
                            <div class="row">
                                <label class="col-form-label text-lg-left" style="padding-top:4px;">指标</label>
                                <div class="col-lg-2">
                                    <select class="form-control select" data-fouc id="projectSelectId" data-placeholder="请选择" onchange="storeAgeChange()">
                                        <option value="SALES_PER_STORE_MONTH">PER STORE PER MONTH SALES</option>
                                        <option value="COMP_SALES">COMP SALES %</option>
                                        <option value="CASH_FLOW">Yearly CASH FLOW</option>
                                        <option value="IPER_STORE_INVESTMENT">PER STORE INVESTMENT</option>
                                        <option value="Cash_ROI">Cash ROI %</option>
                                        <option value="M_margin">McOpCo Margin % </option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>`;
    html += `
        <div class="row">
            <div class="col-lg-6" id="echarts1" style="height:458px;">
            
            </div>
            <div class="col-lg-6" id="echarts2" style="height:458px;">
            
            </div>
        </div>
    `;
    $("#" + componentId).html(html);
    echartsFunction1();
    echartsFunction2();
}
function storeAgeChange(){
    renderEcharts1();
    renderEcharts2();
}
function echartsFunction1(){
    var sqlParam = `select 
                    Cal_Year,
                    Store_Age,
                    open_year2,
                    case when Cal_Year in ('2011','2012','2013','2014','2015','2016')  then round(sum( sales)/1000/sum( real_count),0) else
                    round(sum(sales)/12/1000/count(1),0) end SALES_PER_STORE_MONTH,
                    round(sum( comp_cy) / sum( comp_py)- 1,3)*100 as  COMP_SALES,
                    case when Cal_Year in ('2011','2012','2013','2014','2015','2016') then round(sum(CF)/1000*12/sum(count_after),0) else round(sum(CF)/1000/count(case when counts>=1 then 1 else null end),0) end  CASH_FLOW,
                    round(sum( Inv)/sum( Inv_Counts),0) IPER_STORE_INVESTMENT,
                    case when Cal_Year in ('2011','2012','2013','2014','2015','2016') then round(sum(CF)/1000*12/sum(count_after)/(sum( Inv)/sum( Inv_Counts)),3)*100 else round(sum(CF)/1000/count(case when counts>=1 then 1 else null end)/(sum( Inv)/sum( Inv_Counts)),3)*100 end  Cash_ROI,
                    round(sum(margin_fee)	/sum(TNS),3)*100 M_margin
                    from app1_store_aging_data_df_sale 
                    where 1= 1 and Cal_year<> 'ttm'${newSQLStr}
                    group by Cal_Year,
                    Store_Age,
                    open_year2
                    order by open_year2 ASC
                    `;
    var res2 = cfs.request.foundation.runComm(sqlParam);
    storeAgeEchart1Data = res2;
    renderEcharts1();
}

function echartsFunction2(){
    var sqlParam = `select 
                    Cal_year,
                    concat('Y', Cal_year-open_year2+1 ) as age,
                    Cal_year-open_year2+1 as age1,
                    Store_Age,
                    case when Cal_Year in ('2011','2012','2013','2014','2015','2016')  then round(sum( sales)/1000/sum( real_count),0) else
                    round(sum(sales)/12/1000/count(1),0) end SALES_PER_STORE_MONTH,
                    round(sum( comp_cy) / sum( comp_py)- 1,3)*100 as  COMP_SALES,
                    case when Cal_Year in ('2011','2012','2013','2014','2015','2016') then round(sum(CF)/1000*12/sum(count_after),0) else round(sum(CF)/1000/count(case when counts>=1 then 1 else null end),0) end  CASH_FLOW,
                    round(sum( Inv)/sum( Inv_Counts),0) IPER_STORE_INVESTMENT,
                    case when Cal_Year in ('2011','2012','2013','2014','2015','2016') then round(sum(CF)/1000*12/sum(count_after)/(sum( Inv)/sum( Inv_Counts)),3)*100 else round(sum(CF)/1000/count(case when counts>=1 then 1 else null end)/(sum( Inv)/sum( Inv_Counts)),3)*100 end  Cash_ROI,
                    round(sum(margin_fee)	/sum(TNS),3)*100 M_margin
                    from app1_store_aging_data_df_sale 
                    where 1= 1 and Cal_year<>'ttm' ${newSQLStr}
                    group by Cal_Year,
                    Store_Age,age
                    order by age1 ASC`;
    var res2 = cfs.request.foundation.runComm(sqlParam);
    storeAgeEchart2Data = res2;
    renderEcharts2();
}
function renderEcharts1(){
    var selectValue = $("#projectSelectId").val();
    var titleData = ["Pre 2006","2006 Openings","2007 Openings","2008 Openings","2009 Openings","2010 Openings",
    "2011 Openings","2012 Openings","2013 Openings","2014 Openings","2015 Openings","2016 Openings","2017 Openings",
    "2018 Openings","2019 Openings","2020 Openings"];
    // 获取x轴
    var xAxisData = [];
    $.each(storeAgeEchart1Data.res,function(k,v){
        xAxisData.push(v.Cal_Year);
    });
    var newXdata = unique(xAxisData);
    // 把年份和对应的数据相关联
    var yearNewData = {};
    $.each(newXdata,function(k,v){
        yearNewData[v] = [];
        $.each(storeAgeEchart1Data.res,function(k1,v1){
            if(v == v1.Cal_Year){
                yearNewData[v].push(v1);
            }
        })
    });
    // 处理echarts数据
    let lineData = [];
    titleData.forEach((val,i)=>{
        let bbb = []
        newXdata.forEach((cVal,j)=>{
            if(yearNewData[cVal][i] == undefined){
                bbb.push('')
            }else{
                bbb.push(yearNewData[cVal][i][selectValue])
            }
        })
        lineData.push(bbb)
    })
    var seriesData = [];
    $.each(titleData,function(k,v){
        var obj = {};
        obj["name"] = v;
        obj["type"] = "line";
        obj["data"] = lineData[k];
        seriesData.push(obj);
    });
    var option = {
        title: {
            text: ''
        },
        tooltip: {
            trigger: 'axis',
            formatter:function (params){
                var html = "";
                html += params[0].axisValue + "<br>";
                if(selectValue == "COMP_SALES" || selectValue == "Cash_ROI" || selectValue == "M_margin"){
                    params.forEach(function(v,i){
                        if(params[i].data !== "" && params[i].data !== null){
                            html += params[i].marker + params[i].seriesName + "：" + params[i].data + "%" + "<br>";
                        }else {
                            html += params[i].marker + params[i].seriesName + "：" +  "<br>";
                        }
                    });
                }else {
                    params.forEach(function(v,i){
                        html += params[i].marker + params[i].seriesName + "：" + params[i].data + "<br>";
                    });
                }
                return html;
            }
        },
        grid: {
            left: '9%',
            // right: '4%',
            top: '5%',
            height: 389,
            containLabel: true
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            // data: ["2011","2012","2013","2014","2015","2016","2017","2018","2019","2020","2020ttm"]
            data:newXdata
        },
        yAxis: {
            type: 'value',
            // min: 0,
            // max:1200
        },
        series: seriesData
    };
    var myChart = echarts.init(document.getElementById("echarts1"));
    myChart.setOption(option);
}
function renderEcharts2(){
    let selectValue = $("#projectSelectId").val();
    var titleData = ["Pre 2006","2006 Opening","2007 Opening","2008 Opening","2009 Opening","2010 Opening",
    "2011 Opening","2012 Opening","2013 Opening","2014 Opening","2015 Opening","2016 Opening","2017 Opening",
    "2018 Opening","2019 Opening","2020 Opening"];
    // 获取x轴
    var xAxisData = [];
    $.each(storeAgeEchart2Data.res,function(k,v){
        xAxisData.push(v.age);
    });
    var newXdata = unique(xAxisData);
    // 把年份和对应的数据相关联
    var yearNewData = {};
    $.each(newXdata,function(k,v){
        yearNewData[v] = [];
        $.each(storeAgeEchart2Data.res,function(k1,v1){
            if(v == v1.age){
                yearNewData[v].push(v1);
            }
        })
    });
    // 处理echarts数据
    let lineData = [];
    titleData.forEach((val,i)=>{
        let bbb = []
        newXdata.forEach((cVal,j)=>{
            let ccc = yearNewData[cVal].filter((ccVal)=>{
                return ccVal.Store_Age===val
            })
            if(ccc.length>0){
                bbb.push(ccc[0][selectValue])
            }else{
                bbb.push('')
            }
        })
        lineData.push(bbb)
    })
    var seriesData2 = [];
    $.each(titleData,function(k,v){
        var obj = {};
        obj["name"] = v;
        obj["type"] = "line";
        obj["data"] = lineData[k];
        seriesData2.push(obj);
    });

    var option = {
        title: {
            text: ''
        },
        tooltip: {
            trigger: 'axis',
            formatter:function (params){
                var html = "";
                html += params[0].axisValue + "<br>";
                if(selectValue == "COMP_SALES" || selectValue == "Cash_ROI" || selectValue == "M_margin"){
                    params.forEach(function(v,i){
                        if(params[i].data !== "" && params[i].data !== null){
                            html += params[i].marker + params[i].seriesName + "：" + params[i].data + "%" + "<br>";
                        }else {
                            html += params[i].marker + params[i].seriesName + "：" +  "<br>";
                        }
                    });
                }else {
                    params.forEach(function(v,i){
                        html += params[i].marker + params[i].seriesName + "：" + params[i].data + "<br>";
                    });
                }
                return html;
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            top: '5%',
            bottom: '10%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: newXdata
        },
        yAxis: {
            type: 'value',
            // min: 0,
            // max:1200
        },
        series: seriesData2
    };
    var myChart2 = echarts.init(document.getElementById("echarts2"));
    myChart2.setOption(option);
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
      return cfs.request.common.sendRequest(url, "POST", paramObj, false,true);
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
    createSimpleTag1: function(cardName, data, iconCls){
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
      cusInit: function(cardName, border = true, removeHead = false, textCenter = true, useEchart = false, hideRef = true) {
          var cardDom = $(`[data-name='${cardName}']`);
          //cardDom.addClass("border border-primary");
          if (border) {
      if (cardDom.find("#" + cardName).length > 0){
      cardDom.find("#" + cardName).css("border", "3px solid #64b5f6").css("border-radius", "5px");
      }else{
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
    unScroll: function() {
    var top = $(document).scrollTop();
    $(document).on('scroll.unable',function (e) {
      $(document).scrollTop(top);
    })
    },
    /**启用滚动条**/
    removeUnScroll: function() {
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
        toXlsx: function (fileName, dataJson, titleArr = null) {
        if (!dataJson) return;
        if (dataJson.length == 0 && titleArr == null) return;
        //组标题
        //
        var sheet = XLSX.utils.json_to_sheet(dataJson);
        var blob = this.sheet2blob(sheet, fileName.substr(0, 30));
        this.download(blob, fileName + ".xlsx");
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
// 去重
function unique(arr){
    var newArr = [];
    for(var i = 0; i < arr.length; i++){
        if(newArr.indexOf(arr[i]) == -1){
            newArr.push(arr[i])
        }
    }
    return newArr;
}
$(document).ready(function(){
    // setTimeout(function(){
        $("#globalPovPart .searchSeleteStyle:last-child").click(function(){
            getPovParam();
        });
    // },3000)
});
// 显示对应dom的loading效果
function domLoadingShow(){
    $(".dashBoardContent .dataSheet").each(function(k,v){
        var dataName = $(v).children().attr("data-id");
        loadingShow1(dataName,"加载中...");
    });
}
// 隐藏对应dom的loading效果
function domLoadingHide(){
    $(".dashBoardContent .dataSheet").each(function(k,v){
        var dataName = $(v).children().attr("data-id");
        loadingHide1(dataName,"加载中...")
    });
}
function loadingShow1(cardName, msg){
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
    } catch (error) {}
  }
function loadingHide1(cardName){
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

function tableExportFunction(){
    console.log("下载")

    var cfs = new DevCustomFuncTools();
    // var year_down = $("[dc='Year']").eq(0).val()

    var getSearchParam = showDashBoard.globalCurrentPovObj;
    console.log(getSearchParam)
    // let para = JSON.stringify(getSearchParam)
    let pyName = 'store_aging_dashboard';
    let paraobj = {'filters':getSearchParam}
    result =JSON.parse(cfs.request.python.pythonWeb('store_aging_dashboard', paraobj).res).res1
    debugger;
    $(".loadingicon").show();
    var downloadSQL = `select `+result+
    ` from mcdcapex.app1_store_aging_data`

    console.log(downloadSQL)
    var resDownload = cfs.request.foundation.runComm(downloadSQL);
    var theadData = result.replaceAll('`','').split(",");
    if (resDownload.res.length !== 0) {
        cfs.export.toCsv("New_Store_Detail_Download",resDownload.res,theadData);
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



