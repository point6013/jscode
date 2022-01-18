/*
 * @Author: Huang Meng
 * @Date: 2021-08-20 10:33:52
 * @LastEditTime: 2021-08-20 10:40:18
 * @LastEditors: your name
 * @Description: 
 * @FilePath: \01code\jscode\accrual_aging_dashboard_0820.js
 * 可以输入预定的版权声明、个性签名、空行等
 */

$(() => {
  window.devicePixelRatio = 2;
  $('#refreshBoard').hide()
  init();

});

const main = () => {
//   window.vueData = data;
  //   <el-botton style="margin-right:25px; text-align: right; float: right; font-size: 15px; vertical-align:middle;border:0px;color:black">As at {{this.localedate}}</el-botton>

            // <el-tag style="margin-right: 25px; float: right; font-size:15px;height:40px;border:0px;">As at {{this.localedate}}</el-tag>

  //debugger;
  window.break = " \n ";
  let dom = `
<div id="app" >
  <div class="page" >
    <el-col :span="24">
      <!-- 第一行：标题 -->
 <div  sytle='width:100%; display:inline-block;height:50px;' >
          <el-date-picker
              class='show'
            v-model="localedate"
            type="month"
            placeholder="选择月份">
          </el-date-picker>
          <el-button class='show' icon="el-icon-refresh"  @click="loadPython()">刷新</el-button>
          <span style="margin-right: 10px; margin-left:1070px;font-size:15px;text-align: right;border-right:0px; border:0px;color:black; margin-bottom:5px; ">
          As&nbsp;at&nbsp;{{this.reportdate.substring(0,3)}}&nbsp;{{this.reportdate.substring(4,9)}}&nbsp;{{this.reportdate.substring(10,14)}}</span>

  </div>

      <h1 style="text-align: center; width: 1248.96px; height:46px; background: #ccac7c; color: white;font-family:Microsoft YaHei; font-weight:bold;vertical-align:center;">IT&nbsp;CapEx&nbsp;Accrual&nbsp;Aging&nbsp;Report</h1>

      <!-- /第一行：标题 -->

      <!-- 第二行：汇总表格 overallTable-->
      <el-row >
        <div style="width:1248.96px;" class='border1'>
          
          
          <div style="width: 98%; text-align: right; font-size: 8px; vertical-align:middle;">('000 RMB)</div>
          <table class="normal_table" style="margin: 10px;width: 100%;font-size:16px;" >
            <tr>
              <td>Beginning&nbsp;Balance:&nbsp;&nbsp;{{ this.overallTable.beg_bal }}</td>
              <td>YTD&nbsp;Settled&nbsp;Accrual:&nbsp;&nbsp;{{ this.overallTable.set_ytd }}</td>
              <td>YTD&nbsp;Cancelled&nbsp;Accrual:&nbsp;&nbsp;{{ this.overallTable.cel_ytd }}</td>
              <td>Ending&nbsp;Balance:&nbsp;&nbsp;{{ this.overallTable.end_bal }}</td>
            </tr>
          </table>
        </div>

      <el-row>
      <!-- /第二行：汇总表格 -->

      <el-row style="margin-top: 15px;">
        <el-col :span="4">
          <el-button style="border: 1px solid #DDDDDD" class='show' >
            <a href='http://ecapex.mcd.com.cn/v1_5_6/dashboard/showDashBoardLeft.html?param1=BIDE8ILJ07N4VG&appid=1'>跳转明细</a>
          </el-button>
        </el-col>
      </el-row>

      <!-- 第三行：图表 -->
     <el-row  style="width:1248.96px;margin-top: 10px">
        <el-col :span="14"   style='margin-top: 10px;'>
          <div id="r3chart1" style="width:700px;height:400px;padding-left:30px;" class='border1'></div>
          </el-col>

        <el-col :span="10" style='margin-top: 10px;' >
          <div id="r3chart2" style="height:400px;padding-right:0px;" class='border1'></div>
        </el-col>
      </el-row>
      <!-- /第三行：图表 -->

      <!-- 第四行：注释 -->
      <el-row>
        <em>*&nbsp;Cleared&nbsp;includes&nbsp;both&nbsp;settled&nbsp;and&nbsp;cancelled&nbsp;accrual.&nbsp;(The&nbsp;same&nbsp;below.)</em>
      </el-row>
      <!-- /第四行：注释 -->

      <!-- 第五行：标题 -->

        <el-row>
        <h2    style=" background-color:lightgray; width: 430px;margin-top: 15px;font-family: Microsoft YaHei;font-weight:bold;"
        >&nbsp;&nbsp;Summary&nbsp;by&nbsp;IT&nbsp;BP</h2>
      </el-row>
      <!-- /第五行：标题 -->

      <!-- 第六行：图表 -->
     <el-row  style="width:1248.96px;margin-top: 15px">
        <el-col :span="12"  >
          <div id="r6chart1" style="width: 598px;height:400px;padding-left:30px" class='border1'></div>
        </el-col>
        <el-col :span="12">
          <div id="r6chart2" style="height:400px;" class='border1' ></div>
        </el-col>
      </el-row>
      <!-- /第六行：图表 -->
      <!-- 第七行：表格 -->
      

  
  
  
  
  
  
  
      
      
    <div style="width: 98%;margin-top: 15px; text-align: right; font-size: 8px; vertical-align:middle;">('000 RMB)</div>
   <div style='width:1248.96px;border: 1px solid #000;width:1248.96px'>
          <table class="normal_2" style="margin: 0px;width:1246.96px;font-size:10px;"  >
            <tr style='font-weight:bold;'>
              <td style='width:110px;padding-left:6px;text-align:center;background: #5c9cd4; color: white;border-left: 0px solid #000;'  rowspan='3'>IT&nbsp;BP</td>
              <td style='width:108px;padding-right:1px;text-align:center;background: #5c9cd4; color: white;'>Beginning</td>
              <td style='width:108px;padding-right:1px;text-align:center;background: #5c9cd4; color: white; '>YTD</td>
              <td style='width:108px;padding-right:10px;text-align:center;background: #5c9cd4; color: white;'>YTD</td>
              <td style='width:108px;padding-right:1px;text-align:center;background: #5c9cd4; color: white;'>YTD</td>
              <td style='width:108px;padding-right:1px;text-align:center;background: #5c9cd4; color: white;'>YTD</td>
              <td style='width:108px;padding-right:1px;text-align:center;background: #5c9cd4; color: white;'>Ending</td>
              <td style='width:99px;padding-right:1px;text-align:center;background: #5c9cd4; color: white;border-right:1px solid #000;'>Ending</td>
              <td style='padding-right:1px;text-align:center;background: #cccccc;border-right: 0px solid #000;'  colspan='8'>Aging&nbsp;of&nbsp;Ending&nbsp;Balance</td>
            </tr>
              <tr style='font-weight:bold;'>
              <td style='width:108px;padding-right:1px;text-align:center;background: #5c9cd4; color: white;'>Balance</td>
              <td style='width:108px;padding-right:1px;text-align:center;background: #5c9cd4; color: white; '>Settled</td>
              <td style='width:108px;padding-right:1px;text-align:center;background: #5c9cd4; color: white;'>Settled%</td>
              <td style='width:108px;padding-right:1px;text-align:center;background: #5c9cd4; color: white;'>Cancelled</td>
              <td style='width:108px;padding-right:1px;text-align:center;background: #5c9cd4; color: white;'>Cancelled%</td>
              <td style='width:108px;padding-right:1px;text-align:center;background: #5c9cd4; color: white;'>Balance</td>
              <td style='width:99px;padding-right:1px;text-align:center;background: #5c9cd4; color: white;border-right:1px solid #000;'>Balance%</td>
              <td style='width:105px;padding-right:1px;text-align:center;background: #cccccc;'  colspan='2' rowspan='2'><1&nbsp;year</td>
              <td style='width:105px;padding-right:1px;text-align:center;background: #cccccc;'  colspan='2' rowspan='2'>1-2&nbsp;years</td>
              <td style='width:90px;padding-right:1px;text-align:center;background: #cccccc;'  colspan='2' rowspan='2'>2-3&nbsp;years</td>
              <td style='text-align:center;padding-right:1px;background: #cccccc;;border-right:0px solid #000;'  colspan='2' rowspan='2'>>3&nbsp;years</td>
            </tr>
            <tr style='font-weight:bold;'>
              <td style='width:108px;padding-right:1px;text-align:center;background: #5c9cd4; color: white;'>a</td>
              <td style='width:108px;padding-right:1px;text-align:center;background: #5c9cd4; color: white; '>b</td>
              <td style='width:108px;padding-right:1px;text-align:center;background: #5c9cd4; color: white;'>b% = b / a</td>
              <td style='width:108px;padding-right:1px;text-align:center;background: #5c9cd4; color: white;'>c</td>
              <td style='width:108px;padding-right:1px;text-align:center;background: #5c9cd4; color: white;'>c% = c / a</td>
              <td style='width:108px;padding-right:1px;text-align:center;background: #5c9cd4; color: white;'>d = a - b - c</td>
              <td style='width:99px;padding-right:1px;text-align:center;background: #5c9cd4; color: white;border-right:1px solid #000;'>d% = d / a</td>
            </tr>
            
          <tr v-for="item in r7data" >
              <td  style='padding-left:6px;'>{{item['it_bp_desc'].split(' ')[0]}}&nbsp;{{item['it_bp_desc'].split(' ')[1]}}</td>
              <td  style='text-align:right;'>{{item.beg_bal}}</td>
              <td  style='text-align:right;'>{{item.ytd_settle}}</td>
              <td  style='text-align:right;color:#c45c14;'>{{item.ytd_settle_pct}}</td>
              <td  style='text-align:right;'>{{item.ytd_cancel}}</td>
              <td  style='text-align:right;color:#c45c14;'>{{item.ytd_cancel_pct}}</td>
              <td  style='text-align:right;'>{{item.end_bal}}</td>
              <td  style='text-align:right;color:#c45c14;border-right:1px solid #000;padding-right:3px;'>{{item.end_bal_pct}}&nbsp;&nbsp;</td>
              <td  style='text-align:right;'>{{item['<1year']}}</td>
              <td  style='text-align:right;color:#c45c14;'>{{item['<1year_pct']}}</td>
              <td  style='text-align:right;'>{{item['1-2years']}}</td>
              <td  style='text-align:right;color:#c45c14;'>{{item['1-2years_pct']}}</td>
              <td  style='text-align:right;'>{{item['2-3years']}}</td>
              <td  style='text-align:right;color:#c45c14;'>{{item['2-3years_pct']}}</td>
              <td   style='text-align:right;'>{{item['>3years']}}</td>
              <td  style='text-align:right;color:#c45c14;padding-right:3px;' >{{item['>3years_pct']}}</td>
          </tr>

          </table>
</div>
  <br></br>
      <!-- /第七行：表格 -->
      <!-- 第八行：标题 -->
      <el-row>
        <h2    style=" background-color:lightgray; width: 430px;margin-top: 25px;font-family:Microsoft YaHei;font-weight:bold;"
        >&nbsp;&nbsp;Top&nbsp;10&nbsp;Ending&nbsp;Balance&nbsp;Breakdown</h2>
      </el-row>
      <!-- /第八行：标题 -->

      <!-- 第九行：表格 -->
    <div style="width: 98%;margin-top: -5px; text-align: right; font-size: 8px; vertical-align:middle;">('000 RMB)</div>


     <div>

 <template>
      <table class="normal_2" style="margin: 0px;width:1248.96px;font-size:10px;border: 1px solid #000;" >
          <thead>

          </thead>
          <tbody>
              <tr style='font-weight:bold;border: 1px solid #000;border-bottom:0px; border-right: 1px solid #000;border-left: 1px solid #000;'>
          <td style='width:136px;padding-left:6px;text-align:left;background:#cccccc;'>IT&nbsp;BP</td>
          <td style='width:141px;padding-left:0px;text-align:left;background:#cccccc;'>Budget&nbsp; Code</td>
          <td style='width:141px;padding-left:0px;text-align:left;background:#cccccc;'>Product&nbsp;Name</td>
          <td style='width:400px;padding-left:0px;text-align:left;background:#cccccc;'>Budget&nbsp;Item</td>
          <td style='width:141px;padding-left:0px;text-align:left;background:#cccccc;'>Beginning &nbsp;Balance</td>
          <td style='width:141px;padding-left:0px;text-align:left;background:#cccccc;'>Ending&nbsp;Balance</td>
          <td style='width:141px;text-align:left;background:#cccccc;'>Aging</td>
              </tr>

              <tr v-for="item in r9data">
                  <td style='padding-left:6px;'>{{item.IT_BP.split(' ')[0]}}&nbsp;{{item.IT_BP.split(' ')[1]}}</td>
                  <td>{{item.Budget_code}}</td>
                  <td>{{item.Prod_name}}</td>
                  <td>{{item.Budget_item}}</td>
                  <td style='text-align:center;'>{{item.beg_bal}}</td>
                  <td style='text-align:center;'>{{item.end_bal}}</td>
                  <td>{{item.Aging}}</td>
              </tr>
             
          </tbody>
      </table>
  </template>
 </div>
 
 
      <br></br>
      <br></br>
      <!-- 第九行：表格 -->
    </el-col>
  </div>
</div>

<script>

   app = new Vue({
    el: '#app',
    data: {
    
    
      initialData: {},

      localedate: "",
      reportdate:"",
      it_bp_list:[],
      it_bo_list1:[],

      // row 2a
      overallTable: {},

      //row 3 chart 1 option
      r3chart1option: {
        title: [
          {
            text: 'Accrual Balance YTD Cleared*% ',
            left: 'center',
            top: '5%',
            textStyle: {
            fontFamily: "Microsoft YaHei"
          },
          },
          {
            subtext: "('000 RMB)",
            top: '10%',
            x: '80%'
          },
        ],
        legend: {
          top: '90%',
        },
        grid: {
          left: '5%',
          right: '5%',
          bottom: '20%',
          top: '20%',
          containLabel: true,
        },
        tooltip: {},
        dataset: {
          // 提供一份数据。
          source: [
            ['1', ' YTD Settled%', ' YTD Cancelled', 'YTD Ending Balance%', 'Monthly Cleared'],
            ['Jan', 98, 0, 2, 50000],
            ['Feb', 0, 0, 100, 150000],
            ['Mar', 51, 0, 49, 30000],
            ['Apr', 63, 0, 37, 60000],
            ['May', 98, 0, 2, 50000],
            ['Jun', 0, 0, 100, 150000],
            ['Jul', 51, 0, 49, 30000],
            ['Aug', 63, 0, 37, 600],
            ['Sep', 98, 0, 2, 500],
            ['Oct', 0, 0, 100, 1500],
            ['Nov', 51, 0, 49, 300],
            ['Dec', 63, 0, 37, 600],
          ],
        },
        xAxis: {
          name: '',
          type: 'category',

          // axisLine: {
          //     symbol: ['none', 'none'], //两端都显示箭头
          //     symbolOffset: [0, 30] //箭头距离两端的距离,可为负数
          // }
        },
        yAxis: [
          {
            name: '',
            type: 'value',
            splitNumber : 5,
            axisLabel: {  
                  show: true,  
                  interval: 'auto',  
                  formatter: '{value} %'  
              }

          },
          {
            name: '',
            type: 'value',
            splitLine:false,
            
          }
        ],
        // 声明多个 bar 系列，默认情况下，每个系列会自动对应到 dataset 的每一列。
        series: [
          {
            yAxisIndex: 0,
            stack: '0',
            type: 'bar',
            label: {
              normal:{
                    show: true,
                    textStyle:{
                        color:'black',
            // 			fontWeight:'bolder'
                    },
                    formatter: function (c) {
                       if( c.data[1] === 0){
                          return "";            		       
                       }
                        // console.log(c);
                        return c.data[1] + "%";
                    }
              },
            show: true,
            },
            itemStyle: {
              //通常情况下：
              normal: {
                //每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
                color: "#9cc4e4",
              },
            },
            //鼠标悬停时：
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
          {
            yAxisIndex: 0,
            stack: '0',
            type: 'bar',
            barWidth: 30,//柱图宽度
            label: {
              normal:{
                    show: true,
                    textStyle:{
                        color:'black'
                    },
                    formatter: function (c) {
                       if( c.data[2] === 0){
                          return "";            		       
                       }
                        // console.log(c);
                        return c.data[2] + "%";
                    }
              },
            show: true,
            },
            // label: {
            //   normal:{
            // 		textStyle:{
            // 			color:'black'
            // 		}
            // 	},
            //   show: true,
            //   formatter: function (c) {
            //     //console.log(c);
            //     return c.data[2] + "%";
            //   }
            // },
            itemStyle: {
              //通常情况下：
              normal: {
                //每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
                color: '#4474c4',
              },
            },
            //鼠标悬停时：
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
          {
            yAxisIndex: 0,

            stack: '0',
            type: 'bar',
            barWidth: 30,//柱图宽度
            label: {
              normal:{
                    show: true,
                    textStyle:{
                        color:'white'
                    },
                    formatter: function (c) {
                       if( c.data[3] === 0){
                          return "";            		       
                       }
                        // console.log(c);
                        return c.data[3] + "%";
                    }
              },
            show: true,
            },
              
            itemStyle: {
              //通常情况下：
              normal: {
                //每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
                color: '#9c9c9c',
              },
            },
            //鼠标悬停时：
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
          {
            yAxisIndex: 1,
            type: 'line',
            itemStyle: {
              //通常情况下：
              normal: {
                //每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
                color: "orange",
              },
            },
            //鼠标悬停时：
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
        ],
      },
      //row 3 chart 2 option
      r3chart2option: {
        title: [
          {
            text: 'Ending Balance',
            left: 'center',
            top: '5%',
              textStyle: {
              fontFamily: "Microsoft YaHei"
              },
          },
          {
            subtext: "('000 RMB)",
            top: '10%',
            x: '75%'
          },
        ],
        legend: {
          y: "90%",

        },
        tooltip: {
          trigger: 'axis',
          showContent: false
        },
        dataset: {
          source: [
            ['product', '2012'],
            ['<1 year', 41.1],
            ['1-2year', 86.5],
            ['2-3year', 24.1],
            ['>3years', 55.2]
          ]
        },
        grid: {
          left: '5%',
          right: '20%',
          bottom: '20%',
          top: '20%',
          containLabel: true,
        },
        color:["#FEC531","#567FE5","#174FDB","#98B7FF"],
        
        series: [
          {
            type: 'pie',
            id: 'pie',
            
          itemStyle: {
              borderColor: '#fff',
              borderWidth: 1
          },
            radius: ['40%', '65%'],
            center: ['50%', '55%'],
              label: {
              fontWeight:'bolder',
                formatter: function(v){
                    return format(v.data[1]) + window.break + Math.round(v.percent) + '%';
                }
              },
            encode: {
              itemName: 'product',
              value: '2021',
              tooltip: '2021'
            }
          }
        ]
      },
      

      
      
      
      r6chart1option:
      {
        title: [
          {
            text: 'YTD Cleared% by IT BP',
            left: 'center',
            top: '5%',
            textStyle: {
            fontFamily: "Microsoft YaHei"
          }, 
          },
        ],
        legend: {
          bottom: '5%',
          left: '25%',
        },
        grid: {
          left: '10%',
          right: '10%',
          bottom: '20%',
          top: '20%',
          containLabel: true,
        },
        tooltip: {},
        dataset: {
          // 提供一份数据。
          source: [
            ['Period', '<1 year', '1-2 year', '2-3 years', '>3 year'],
            ['Matcha Latte', 98, 2, 0],
            ['Milk Tea', 0, 100, 0],
            ['Cheese Cocoa', 51, 49, 0],
            ['Walnut Brownie', 63, 37, 0],
          ],
        },
        // // 声明一个 X 轴，类目轴（category）。默认情况下，类目轴对应到 dataset 第一列。
        // xAxis: {type: 'category'},
        // // 声明一个 Y 轴，数值轴。
        // yAxis: {},
        xAxis: {
          name: '',
          type: 'value',
          axisLine: {
            show: true,
            symbol: ['none', 'none'], //两端都显示箭头
            symbolOffset: [0, 5], //箭头距离两端的距离,可为负数
          },
          axisLabel: {
            show: true,
            interval: 'auto',
            formatter: '{value} %',
          },
        },
        yAxis: {
          name: '',
          
          type: 'category',
          // axisLine: {
          //     symbol: ['none', 'none'], //两端都显示箭头
          //     symbolOffset: [0, 30] //箭头距离两端的距离,可为负数
          // }
        },
        // 声明多个 bar 系列，默认情况下，每个系列会自动对应到 dataset 的每一列。
        

        
        
        series: [
          {
            stack: '0',
            type: 'bar',
          //   barWidth: 20,//柱图宽度
            itemStyle: {
              //通常情况下：
              normal: {
                  show: true,
                  color: '#acd4fc',
                //每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组

              },
            },
            label: {
            align:'center',
            normal:{
            show: true,
            textStyle:{
                color:'black'
            },
            formatter: function (c) {
               if( c.data[1] === 0){
                  return "";            		       
               }
                return c.data[1] + "%";
            }
            }},
            
            //鼠标悬停时：
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
          {
            stack: '0',
            type: 'bar',
          //   barWidth: 20,//柱图宽度
            itemStyle: {
              //通常情况下：
              normal: {
                show: true,
                //每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
                color: '#0474c4',
              },
            },
            
            label: {
          align:'center', 
            normal:{
            show: true,
            textStyle:{
                color:'black'
            },
            formatter: function (c) {
               if( c.data[2] === 0){
                  return "";            		       
               }
                return c.data[2] + "%";
            }
            }},
            //鼠标悬停时：
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
          {
            stack: '0',
            type: 'bar',
          //   barWidth: 20,//柱图宽度
            itemStyle: {
              //通常情况下：
              normal: {
                show: true,
                //每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
                color: '#9c9c9c',
              },
            },
            label: {
            align:'center',
            normal:{
            show: true,
            textStyle:{
                color:'white'
            },
            formatter: function (c) {
               if( c.data[3] === 0){
                  return "";            		       
               }
                return c.data[3] + "%";
            }
            }},
            //鼠标悬停时：
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
        ],
      },
      //row 6 chart 2 option
      r6chart2option: {
        title: [
          {
            text: 'Aging of Ending Balance by IT BP',
            left: 'center',
            top: '5%',
            textStyle: {
            fontFamily: "Microsoft YaHei"
          },              
          },
          {
            subtext: "('000 RMB)",
            top: '10%',
            x: '70%'
          },
        ],
        legend: {
          bottom: '5%'
        },
        tooltip: {},
        grid: {
            left: '10%',
          right: '20%',
          bottom: '20%',
          top: '20%',
          containLabel: true,
        },
           color:["#FEC531","#567FE5","#174FDB","#98B7FF"],

        dataset: {
          // 提供一份数据。
          source: [
            ['Period', '<1 year', '1-2 year', '2-3 years', '>3 year'],
            ['Matcha Latte', 0, 85.8, 93.7],
            ['Milk Tea', 83.1, 73.4, 55.1],
            ['Cheese Cocoa', 86.4, 65.2, 82.5],
            ['Walnut Brownie', 72.4, 53.9, 39.1],
          ],
        },
        xAxis: {
          name: '',
          type: 'value',
          axisLine: {
            show: true,
            symbol: ['none', 'none'], //两端都显示箭头
            symbolOffset: [0, 5], //箭头距离两端的距离,可为负数
          },
          min: 0
        },
        yAxis: {
          name: '',
          type: 'category',
          // axisLine: {
          //     symbol: ['none', 'none'], //两端都显示箭头
          //     symbolOffset: [0, 30] //箭头距离两端的距离,可为负数
          // }
        },
        // 声明多个 bar 系列，默认情况下，每个系列会自动对应到 dataset 的每一列。
        series: [
          {
            stack: '0',
            type: 'bar',
            itemStyle: {
              //通常情况下：
              normal: {
                //每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
                // color: '#8c94a4',
              },
            },
            //鼠标悬停时：
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
          {
            stack: '0',
            type: 'bar',
            itemStyle: {
              //通常情况下：
              normal: {
                //每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
                // color: '#74a4fc',
              },
            },
            //鼠标悬停时：
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
          {
            stack: '0',
            type: 'bar',
            itemStyle: {
              //通常情况下：
              normal: {
                //每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
                // color: '#9ce484',
              },
            },
            //鼠标悬停时：
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
          {
            stack: '0',
            type: 'bar',
            itemStyle: {
              //通常情况下：
              normal: {
                //每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
                // color: '#9ce344',
              },
            },
            //鼠标悬停时：
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
        ],
      },
    },
    components: {},
    template: '',
    watch: {
         initialData:{
         handler(val,oldval){

             if(val){
                 this.myEcharts_table(val);
             }
             else{
                 this.myEcharts_table(oldval);
             };
             deep:true
         }

       },
        
    },
    mounted() {
        let that = this;
         this.getlocal()
        this.loadPython()
        // debugger;
        //获取Python的取数结果
      //   this.myEcharts_table();
        this.$nextTick(function(){
            debugger;
            that.setblod();
        })

        

      
      
    },
    methods: {
      //千分位符
        format(num) {
        return num.toString().replace(/\d+/, function (n) {
        // 先提取整数部分
        return n.replace(/(\d)(?=(\d{3})+$)/g, function ($1) {
        // 对整数部分添加分隔符
        return $1 + ',';
        });
        });
        },
        //设置整行加粗

      //   setBold(row) {
      //     if (this.r7data[row.rowIndex]['it_bp_desc'] === 'Grand Total') {
      //       return 'boldRow'
      //     }
      //     else{
      //         return 'normalRow'
              
      //     }
      //   }
      //   ,
        
  formatterColumn(str){
      return "<span> str.split(' ')[0]  + '&nbsp;' + str.split(' ')[1] <span>"
      
  },
    

    
    cell_style({row,column,rowIndex,columnIndex}){
        // debugger;
        if (columnIndex === 0) {
        return 'text-align: left; background:"#dce4f4";font-size:6px;padding-left:6px !important;border:0px;'
        }
        else if([3,5,9,11,13,15].includes(columnIndex)){
        return 'text-align: right; background:"#dce4f4";padding-right:5px !important;color:#c45c14;font-size:6px;border:0px;'
        }
        
        else if (columnIndex==7){
            return 'text-align: right; background:"#dce4f4";padding-right:5px !important;color:#c45c14;font-size:6px;border-right:1px solid #000;border-bottom:0px;'
            
        }
        
        else
        {
        return 'text-align: right; background:"#dce4f4";padding-right:5px !important;font-size:6px;border:0px;'
        }
    },
    
        header_style({row,column,rowIndex,columnIndex}){
        if ([0,1,2].includes(rowIndex)&&columnIndex<=7){
          return 'background: #5c9cd4; color: white; padding-right: 0px !important; font-size: 6px; font-weight: bold;text-align:center;border:1px solid #5c9cd4 !important;'
        }

        else if ([0].includes(rowIndex)&&columnIndex==8)
        {
          return 'background: #cccccc; color: black; padding-right: 5px !important; font-size: 6px; font-weight: bold;text-align:center;border:1px solid #cccccc !important;'  
        }
        
        else if ([1,2].includes(rowIndex)&&columnIndex>=8 )
        
        if ([8,10,12,14].includes(columnIndex))
        {
          return 'background: #cccccc; color: black; padding-right: 5px !important;; font-size: 6px; font-weight: bold;text-align:center;border:1px solid #cccccc !important;'  
        } 
        else{
            return 'background: #cccccc; color: black; padding-right: 5px !important; font-size: 6px; font-weight: bold;border:1px solid #cccccc !important;' 
        }
        },
        
      header_style1({row,column,rowIndex,columnIndex}){
      if (columnIndex==0){
        return "background: #cccccc; color: black; font-size:10px;font-weiht:bold;text-align:left;padding-left:6px !important"
      }
        else {
            return "background: #cccccc; color: black; font-size:10px;font-weiht:bold;text-align:left;padding-left:0px !important"
            
        }
        },
        
      
      cell_style1({row,column,rowIndex,columnIndex}){
      
      
      if ([4,5].includes(columnIndex)){
          return "color: black; font-size:6x;font-weiht:normal;text-align:center;border:0px"
      }
          else if (columnIndex==0){
          return "color: black; font-size:6px;font-weiht:normal;text-align:left;padding-left:6px !important;border:0px" 
          }
          
          else{
          return "color: black; font-size:6px;font-weiht:normal;text-align:left;padding-left:0px !important;border:0px" 
          }
      }, 
        
      
      
      
        
      getlocal(){
          var year = new Date().getFullYear();
          var month = new Date().getMonth()+1;
          var day = new Date().getDate()
          this.localedate =  year +'-'+month 
      },  
      
      
      get_format_date(num){
      console.log(num)
      debugger;
          if (['1','21','31'].includes(num))  {
          result = num + "st,";}
          else if (['2','22'].includes(num)) {
              result = num + "nd,";
          }
          else if (['3','23'].includes(num)) {
              result = num + "rd,";
          }
          else {
              result = num + "th,";
          }
          return result
      },

      
      
      get_last_day(year,month){
      
              console.log(year)
              console.log(year%4)
      debugger;
          if ([1,3,5,7,8,10,12].includes(month)){
              return this.get_format_date('31')
          }
          else if([4,6,9,11].includes(month))
          {
              return this.get_format_date('30')
          }
          else if (year%4==0&&year&100!=0||year%400==0){
              return  this.get_format_date('29')
          }
          else {
               return  this.get_format_date('28')
              
          }
          
          
      
      },
       

       loadPython() {
              var cfs = new DevCustomFuncTools();
              console.log(typeof this.localedate)
              debugger;
                 if(typeof this.localedate==="string"){
                     month = this.localedate.split('-')[1]
                     year = this.localedate.split('-')[0] 
                     
                      day = new Date().getDate()-1
                      inter_date = new Date(this.localedate+'-'+day).toString()
                      new_year = inter_date.split(' ')[3]
                      new_month = inter_date.split(' ')[1]
                      new_day = this.get_format_date(inter_date.split(' ')[2])
                      this.reportdate = new_month +" " + new_day +' '+new_year
                      debugger;
                     
                     
                 }else{
                     year = this.localedate.getFullYear()
                     month = this.localedate.getMonth()+1
                     console.log(typeof month)
                      new_year = this.localedate.toString().split(' ')[3]
                      new_month = this.localedate.toString().split(' ')[1]
                     
                     
                      var monthhtis = new Date().getMonth()+1;
                      var day = new Date().getDate()-1;
                     
                     if  (monthhtis==month){
                         new_day = this.get_format_date(day+'')
                     }else{
                         new_day= this.get_last_day(new_year,month)
                     }
                     this.reportdate = new_month +" " + new_day +' '+new_year

                 }
                    let res = cfs.request.python.pythonWeb('accural_aging_dashboard', {
                    year:year,
                    month: month,
                });
                var resObj = {};
                  if (res.err) {
                    ForSwal('读取数据失败：' + res.err.Message); //通过右上角的红色卡片报错
                  } else {
                    try { this.initialData = JSON.parse(res.res)
                    } catch (e) {
                      ForSwal('Python结果转换JSON失败：' + e.Message); //通过右上角的红色卡片报错
                    }
                    console.log(resObj);
          }
        },
          myEcharts_table(){
            
                    // row 1
                    new_obj = {}
                    for (i in this.initialData.part1) {
                    new_obj[i] = format(Math.round(this.initialData.part1[i], 0))
                    }
            
            
                  //row2 overall table
                  this.overallTable = new_obj;
                  console.log(this.overallTable)
                //   debugger;
            
                  //row3 chart1
                  this.r3chart1option.dataset.source = this.initialData.part2;
                  let r3chart1dom = echarts.init(document.getElementById('r3chart1'));
                  r3chart1dom.setOption(this.r3chart1option);
                //   console.log(this.r3chart1option);
            
                  //row3 chart2
                  this.r3chart2option.dataset.source = this.initialData.part3;
                  let r3chart2dom = echarts.init(document.getElementById('r3chart2'));
                  r3chart2dom.setOption(this.r3chart2option);
                  console.log(this.r3chart2option);
                  
                  //row6 chart1
                  this.r6chart1option.dataset.source = this.initialData.part4;
                  let r6chart1dom = echarts.init(document.getElementById('r6chart1'));
                  r6chart1dom.setOption(this.r6chart1option);
                //   console.log(this.r6chart1option);
            
                  //row6 chart2
                  this.r6chart2option.dataset.source = this.initialData.part5;
                  let r6chart2dom = echarts.init(document.getElementById('r6chart2'));
                  r6chart2dom.setOption(this.r6chart2option);
                //   console.log(this.r6chart2option);
            
            
                //row7
                var table_part_new = []
                for (item of this.initialData.table_part) {
                  for (let key in item) {
          
                    //千分位符
                    if (["1-2years", "2-3years", '<1year', '>3years', 'beg_bal', 'end_bal', 'ytd_settle', 'ytd_cancel'].includes(key)) {
                      item[key] = format(item[key])
                    }
                    //百分比
                    else if(["1-2years_pct", "2-3years_pct", '<1year_pct', '>3years_pct', 'end_bal_pct', 'ytd_settle_pct', 'ytd_cancel_pct'].includes(key)) {
                      item[key] = Math.round(item[key] * 100) + "%"
                    }
                    
                  }
                  
                  table_part_new.push(item);
                              
                }
                console.log(table_part_new)
                this.r7data = table_part_new;
                    
               var table_part_r9 = []
                for (item of this.initialData.top10_table) {
                  for (let key in item) {
          
                    //千分位符
                    if (['end_bal','beg_bal'].includes(key)) {
                      item[key] = format(item[key])
                    }
                    
                    else if (['Budget_code','Budget_item','Aging'].includes(key)){
                        item[key] =item[key].replace('-',' -')
                    }
                    
                    else if (key=='IT_BP'){
                          item['IT_BP'] = item[key]
                    }
          
                 
              }
              this.it_bp_list.push(item['IT_BP'])
               table_part_r9.push(item);
                }
                debugger;
                console.log(this.it_bp_list)
              this.r9data = table_part_r9;
          },
    setblod() {

    // console.log(document.getElementsByClassName("normal_2"))
    // 获取表头的所有单元格
    var x = document.getElementsByClassName("normal_2")[0].rows
          debugger;
          bod = x[x.length-1]
    bod.style['font-weight']='bold'
    // 将第二列表头单元格的colSpan设为2
  //   x[8].colSpan = 2
  //   x[10].colSpan = 2
  //   x[12].colSpan = 2
  //   x[14].colSpan = 2
  //   // 将第三列表头单元格的display设为none
  //   x[9].style.display = 'none'
  //   x[11].style.display = 'none'
  //   x[13].style.display = 'none'
  //   x[15].style.display = 'none'

  }
}
})

</script>

<style>

.normal_table td {
font-weight: bold;
  }

  .set_bold  {
    font-weight: bold;
  }
  
  
  
    .customer-table thead th{
        border: 0px;
        height: 30px;
        padding-top: 0px;
        padding-bottom: 0px;
    }
    
    .customer-table tr td{
        border: 0px !important;
        height: 30px;
        padding-top: 0px;
        padding-bottom: 0px;
    }
  
  
  
  
  

  /* table */


  /* row data */
  .set_blod:last-child{
      font-size:bold;
  }

  /* row tags */
  .el-tag {
    font-size: 15px;
    background-color: #FFFFFF;
    color:black;
     border:0px !important;
     border-radius:0px;
  }



  .border1 {
   border: 1px solid #DDDDDD
  }
    .border_table {
    border: 1px solid #000;
    border-top:0px;
    border-bottom: 1.5px solid #000;
  }
  
  
  .border_table1 {
    border: 1px solid #000;
    border-top:0px;
    border-bottom: 1.5px solid #000;
  }
  
  

  th.blue {
    background-color: #5c9cd4 !important;
    color: white !important;
    padding: 0px 0 !important; 
    font-size: 2px; 
    font-weight: normal;
    
  }

  th.gray {
    background-color: #cccccc !important;
    color: black !important;
    padding: 0px 0 !important; 
    font-size: 2px; 
    font-weight: normal;
  }
  
  .ant-table-thead > tr > th {
        text-align: center !important; 
      }
      
  .boldRow{
       font-weight: bold;
       padding:0px;
   }
   
   
 .normalRow{
      padding:0px;
}




.el-table  th{
    padding:0px !important;
}
.el-table  td{
    padding:0px !important;
    
}



.el-table .cell{
    padding-bottom: 0px !important;
    padding-top: 0px !important;
          padding-left: 0px !important;
    padding-right: 5px !important;
      position:relative;
}


.el-table--border th{
    border:0px solid #000;
    text-align : 'center'
    
    
}

  .el-table--border td{
    border: 0px solid #000;
    text-align:'center'
    
    
    
}


.normal_1 {
  margin:0px;
    background: #cccccc;
    color: black; 
    font-size:10px;
    font-weight:bold;
    text-align:left;
    padding-left:6px !important;
    
}



 .normal_2 {
  margin:0px;
    color: black; 
    font-size:10px;
    text-align:left;
    padding-left:6px !important;
    
}



  .el-table .caret-wrapper{
    position:absolute;
  }
    

body{
    margin: 0;
  font-family: Roboto,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol";
  font-size: .8125rem;
  font-weight: 400;
  line-height: 1.5385;
  color: #333;
  text-align: left;
  background-color: #FFFFFF;
}

</style>
  `;
  $('#showDashBoard').append(dom);
};

$.getScript('../js/plugins/jspdf.min.js');
$.getScript('../js/plugins/jspdf.plugin.autotable.js');
$.getScript('../js/StbDemo/topdf/html2canvas.min.js');



let btnDom = `
<button type="button" id="downloadPDF" class="btn btn-light">下载PDF<i class="icon-play3 ml-2"></i></button>
`;

if ($('#btn').length === 0) {
  $('.header-elements').append(btnDom);


  $('#downloadPDF').on('click', function () {
    document.getElementById('showDashBoard').scrollTop = 0;
    downloadPdf();

  });
}





function detectZoom() {
var ratio = 0,
  screen = window.screen,
  ua = navigator.userAgent.toLowerCase();

if (window.devicePixelRatio !== undefined) {
  ratio = window.devicePixelRatio;
} else if (~ua.indexOf('msie')) {
  if (screen.deviceXDPI && screen.logicalXDPI) {
    ratio = screen.deviceXDPI / screen.logicalXDPI;
  }
} else if (
  window.outerWidth !== undefined &&
  window.innerWidth !== undefined
) {
  ratio = window.outerWidth / window.innerWidth;
}

if (ratio) {
  ratio = Math.round(ratio * 100);
}

return ratio;
console.log(ratio);
}
//将html页面导出.pdf格式文件(适用于jQuery、vue库)  -- xzz 2018/04/24
function downloadPdf() {
if(confirm("您确认下载该PDF文件吗?")){
  // $('#show').hide()
  $('.show').hide()
  debugger;
document.getElementById('showDashBoard').scrollTop = 0;
var element = $('#showDashBoard'); // global variable
var w = element.width(); // 获得该容器的宽
var h = element.height(); // 获得该容器的高
var offsetTop = element.offset().top; // 获得该容器到文档顶部的距离
var offsetLeft = element.offset().left;; // 获得该容器到文档最左的距离
debugger;
var canvas = document.createElement('canvas');
var abs = 0;
var win_i = $(window).width(); // 获得当前可视窗口的宽度（不包含滚动条）
var win_o = window.innerWidth; // 获得当前窗口的宽度（包含滚动条）
if (win_o > win_i) {
  abs = (win_o - win_i) / 2; // 获得滚动条长度的一半
}
//   canvas.width = w * 4; // 将画布宽&&高放大两倍
//   canvas.height = h * 8;
canvas.width = w * 3;
canvas.height = h *3;
var context = canvas.getContext('2d');
context.scale(2.8, 2.8);
context.translate(-offsetLeft - abs+40, -offsetTop);
debugger;
var wh;
if (detectZoom() == 120) {
  //150分辨率 80%缩放
  wh = [800, 1100];
} else if (detectZoom() == 113) {
  //125分辨率，90%缩放
  wh = [1800, 2100];
} else if (detectZoom() == 100) {
  wh = [1100, 1100];
} else {
  wh = [750, 1100];
}
setTimeout(function () {
  html2canvas(
    element,
    {
      scale: detectZoom() * 3,
      allowTaint: true,
      taintTest: true,
      dpi: 3000, //600
      // letterRendering:true,
      canvas: canvas,
      
      useCORS: true, // 【重要】开启跨域配置
      onrendered: function (canvas) {
        //*********方法2***********/
        var contentWidth = canvas.width;
        var contentHeight = canvas.height;
        //一页pdf显示html页面生成的canvas高度;
        var pageHeight = (contentWidth / 592.28) * 841.89;
        //未生成pdf的html页面高度
        var leftHeight = contentHeight;
        //页面偏移
        var position = 0;
        //a4纸的尺寸[595.28,841.89]，html页面生成的canvas在pdf中图片的宽高
        var imgWidth = 592.28;
        var imgHeight = (592.28 / contentWidth) * contentHeight;
        //var pageData = canvas.toDataURL();
        var pageData = canvas.toDataURL('image/png', 1.0);
        var pdf = new jsPDF('', 'pt', [592.28, 841.89]);

        //有两个高度需要区分，一个是html页面的实际高度，和生成pdf的页面高度(841.89)
        //当内容未超过pdf一页显示的范围，无需分页
        if (leftHeight < pageHeight) {
          pdf.addImage( pageData,'PNG', 0,0,contentWidth,contentHeight,'','FAST' );
        } else {
          let page = 1; //页码
          while (leftHeight > 0) {
            pdf.addImage(pageData,'PNG', 0,position,imgWidth,imgHeight,'','FAST');
            debugger;
            //   pdf.addImage(pageData, 'JPEG', 20, position, imgWidth, imgHeight);
            leftHeight = leftHeight - pageHeight;
            position -= 841.89;
            if (leftHeight > 0) {
              pdf.addPage();
            }
          }
          
        }
        var pageCount = pdf.internal.getNumberOfPages();
        if(pageCount>=2){
           pdf.deletePage(pageCount);
        }
        pdf.save('IT CapEx Accrual Aging Report.pdf');
      //   $('#show').show()
        $('.show').show()
      },
    },
    500
  );
});
}
}  

function  pdf_download(){
  const doc = new jsPDF()
doc.autoTable({ html: '#table1' })


debugger;
// Or use javascript directly:
doc.autoTable({
head: [['Name', 'Email', 'Country']],
body: [
  ['David', 'david@example.com', 'Sweden'],
  ['Castille', 'castille@example.com', 'Spain'],
  // ...
],
})

doc.save('table.pdf')
    }







function init() {
  loadMoment();
}

function loadMoment() {
  var body = document.getElementsByTagName('body')[0];
  var jsNode = document.createElement('script');
  jsNode.setAttribute('type', 'text/javascript');
  jsNode.setAttribute(
    'src',
    'https://cdn.jsdelivr.net/npm/moment@2.29.1/moment.js'
  );
  jsNode.onload = function () {
    console.log('moment.js加载成功!');
    loadVue();
  };
  body.appendChild(jsNode);
}

function loadVue() {
  var body = document.getElementsByTagName('body')[0];
  var jsNode = document.createElement('script');
  jsNode.setAttribute('type', 'text/javascript');
  jsNode.setAttribute('src', 'https://cdn.jsdelivr.net/npm/vue/dist/vue.js');
  jsNode.onload = function () {
    console.log('Vue.js加载成功!');
    // loadAntdCss();
    loadEcharts();
  };
  body.appendChild(jsNode);
}



function loadEcharts() {
    
  var body = document.getElementsByTagName('body')[0];
  var jsNode = document.createElement('script');
  jsNode.setAttribute('type', 'text/javascript');
  jsNode.setAttribute(
    'src',
    'https://cdn.jsdelivr.net/npm/echarts/dist/echarts.min.js'
  );
  jsNode.onload = function () {
    console.log('echarts.js加载成功!');
    loadElementJs()

  };
  body.appendChild(jsNode);
}


function loadElementJs() {
  var body = document.getElementsByTagName('body')[0];
  var jsNode = document.createElement('script');
  jsNode.setAttribute('type', 'text/javascript');
  jsNode.setAttribute(
    'src',
    'https://unpkg.com/element-ui/lib/index.js'
  );
  jsNode.onload = function () {
    console.log('element.js加载成功!');
    loadElementCss();
  };
  body.appendChild(jsNode);
}


function loadElementCss() {
  var link = document.createElement('link');
  link.rel = 'stylesheet';
  link.type = 'text/css';
  link.href =
    'https://unpkg.com/element-ui/lib/theme-chalk/index.css';
  link.onload = function () {
    console.log('element.css加载成功！');
     main();
  };
  document.getElementsByTagName('head')[0].appendChild(link);
}