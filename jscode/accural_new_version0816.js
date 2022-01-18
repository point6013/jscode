/*
 * @Description:
 * @Author: 刘俊_liujun
 * @Date: 2021-08-11 10:43
 * @LastEditors: your name
 * @LastEditTime: 2021-08-16 14:23:55
 */
$(() => {
    init();
  
  });
  
  const main = () => {
  //   window.vueData = data;
    //debugger;
    window.break = " \n ";
    let dom = `
  <a-icon type="sync" />
    
    
  <div id="app" style="padding: 10px;">
      <a-form layout="inline">
      <a-month-picker v-model="localedate"/>
      <a-button  icon="sync" style="backgroud-color:white" @click="loadPython()" />
    </a-form>
  
  
    <div class="page" style="margin:0 auto;">
      <a-col :span="24">
        <!-- 第一行：标题 -->
        <a-row size="large">
          <a-col :span="24">
            <h1 style="text-align: center; background: #ccac7c; color: white;">IT CapEx Accural Aging Report</h1>
          </a-col>
        </a-row>
        <!-- /第一行：标题 -->
  
        <!-- 第二行：汇总表格 overallTable-->
        <a-row>
          <div class="border">
            <div style="width: 95%; text-align: right; font-size: 8px; vertical-align:middle;">('000 RMB)</div>
            <table class="normal_table" style="margin: 10px">
              <tr>
                <td>Beginning Balance</td>
                <td>{{ this.overallTable.beg_bal }}</td>
                <td>YTD Settled Accrual</td>
                <td>{{ this.overallTable.set_ytd }}</td>
                <td>YTD Cancelled Accrual</td>
                <td>{{ this.overallTable.cel_ytd }}</td>
                <td>Ending Balance</td>
                <td>{{ this.overallTable.end_bal }}</td>
              </tr>
            </table>
          </div>
  
        </a-row>
        <!-- /第二行：汇总表格 -->
  
        <a-row style="margin-top: 15px;">
          <a-col :span="4">
            <a-button type="primary">
              跳转明细
            </a-button>
          </a-col>
        </a-row>
  
        <!-- 第三行：图表 -->
        <a-row>
          <a-col :span="14">
            <div id="r3chart1" style="width: 710px;height:400px;margin-top: 20px" class="border"></div>
          </a-col>
          <a-col :span="9">
            <div id="r3chart2" style="width: 510px;height:400px;margin-top: 20px" class="border"></div>
          </a-col>
        </a-row>
        <!-- /第三行：图表 -->
  
        <!-- 第四行：注释 -->
        <a-row>
          <em>* Cleared includes both settled and cancelled accrual. (The same below.)</em>
        </a-row>
        <!-- /第四行：注释 -->
  
        <!-- 第五行：标题 -->
        <br><br>
          <a-row>
          <h2    style=" background-color:lightgray; width: 400px;margin-top: 15px;"
          >&nbsp; &nbsp;Summary by IT BP</h2>
        </a-row>
        <!-- /第五行：标题 -->
  
        <!-- 第六行：图表 -->
        <a-row>
          <a-col :span="12">
            <div id="r6chart1" style="width: 610px;height:400px;margin-top: 10px" class="border"></div>
          </a-col>
          <a-col :span="11">
            <div id="r6chart2" style="width: 610px;height:400px;margin-top: 10px" class="border"></div>
          </a-col>
        </a-row>
        <!-- /第六行：图表 -->
  
        <!-- 第七行：表格 -->
        <div style="width: 98%;margin-top: 15px; text-align: right; font-size: 8px; vertical-align:middle;">('000 RMB)</div>
        <a-row>
          <a-table  :columns="r7header" :data-source="r7data" :pagination="false" :row-class-name="setBold" class="border_table">
          </a-table>
        </a-row>
        <!-- /第七行：表格 -->
  
        <br><br>
        <!-- 第八行：标题 -->
        <a-row>
          <h2    style=" background-color:lightgray; width: 400px;margin-top: 10px;"
          >&nbsp;&nbsp;Top 10 Ending Balance Breakdown</h2>
        </a-row>
        <!-- /第八行：标题 -->
  
        <!-- 第九行：表格 -->
      <div style="width: 98%;margin-top: -5px; text-align: right; font-size: 8px; vertical-align:middle;">('000 RMB)</div>
        <a-row>
          <a-table  :columns="r9header" :data-source="r9data" :pagination="false" :row-class-name="setBold" class="border_table">
          </a-table>
        </a-row>
        <!-- 第九行：表格 -->
      </a-col>
    </div>
  </div>
  
  <script>
  
     app = new Vue({
      el: '#app',
      data: {
        initialData: {},
  
        localedate: "",
  
        // row 2a
        overallTable: {},
  
        //row 3 chart 1 option
        r3chart1option: {
          title: [
            {
              text: 'Accrual Balance YTD Cleared*% ',
              left: '35%',
              top: '5%',
            },
            {
              subtext: "('000 RMB)",
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
  
            },
            {
              name: '',
              type: 'value',
              interval: 2400
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
              // label: {
              //   normal:{
              // 		textStyle:{
              // 			color:'black'
              // 		}
              // 	},
              //   show: true,
              //   formatter: function (c) {
              //     //console.log(c);
              //     return c.data[3] + "%";
              //   }
              // },
              itemStyle: {
                //通常情况下：
                normal: {
                  //每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
                  color: '#cccccc',
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
            },
            {
              subtext: "('000 RMB)",
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
          series: [
            {
              type: 'pie',
              id: 'pie',
              radius: '50%',
              center: ['50%', '45%'],
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
              left: '30%',
              top: '5%',
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
              itemStyle: {
                //通常情况下：
                normal: {
                    show: true,
                    color: '#acd4fc',
                  //每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
  
                },
              },
              label: {
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
              itemStyle: {
                //通常情况下：
                normal: {
                  show: true,
                  //每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
                  color: '#0474c4',
                },
              },
              
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
              itemStyle: {
                //通常情况下：
                normal: {
                  show: true,
                  //每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
                  color: '#9c9c9c',
                },
              },
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
            },
            {
              subtext: "('000 RMB)",
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
                  color: '#8c94a4',
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
                  color: '#74a4fc',
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
                  color: '#9ce484',
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
  
        // row 7
        r7header: [
          {
            title: 'IT BP',
            className: 'blue',
            align: 'center',          
            children: [
              {
                title: '',
                dataIndex: 'it_bp_desc',
                key: 'it_bp_desc',
                className: 'blue'
              },
            ],
            customRender:(value, row, index) => {//表体的数据列样式
              // console.log(value,row,index)//本列的值,所有行数据包括本列,第几列
              const obj = {
                children: value,
                attrs: {},
                };
              obj.attrs.align = 'right';
              return obj;
              }
          },
          {
            title: 'Beginning Balance',
            className: 'blue',
            align: 'center',          
            children: [
              {
                title: 'a',
                key: 'beg_bal',
                dataIndex: 'beg_bal',
                align: 'right',
                className: 'blue',
              }
            ]
          },
          {
            title: 'YTD Settled',
            className: 'blue',
            align: 'center',           
            children: [
              {
                title: 'b',
                dataIndex: 'ytd_settle',
                key: 'ytd_settle',
                align: 'right', 
                className: 'blue'
              }]
          },
          {
            title: 'YTD Settled%',
            className: 'blue',
            align: 'center', 
            children: [
              {
                title: 'b% = b / a',
                key: 'ytd_settle_pct',
                dataIndex: 'ytd_settle_pct',
                align: 'right', 
                className: 'blue',
                customCell: (record, rowIndex) => {
                  return {
                    style: {
                      'color': '#c45c14'
                    }
                  }
                }
              }
            ]
          },
          {
            title: 'YTD Cancelled',
            className: 'blue',
            align: 'center', 
            children: [
              {
                title: 'c',
                dataIndex: 'ytd_cancel',
                key: 'ytd_cancel',
                align: 'right', 
                className: 'blue'
              }
            ]
          },
          {
            title: 'YTD Cancelled%',
            className: 'blue',
            align: 'center', 
            children: [
              {
                title: 'c% = c / a',
                dataIndex: 'ytd_cancel_pct',
                key: 'ytd_cancel_pct',
                align: 'right', 
                className: 'blue',
                customCell: (record, rowIndex) => {
                  return {
                    style: {
                      'color': '#c45c14'
                    }
                  }
                }
              }
            ]
          },
          {
            title: 'Ending Balance',
            className: 'blue',
            align: 'center', 
            children: [
              {
                title: 'd = a - b -c',
                key: 'end_bal',
                dataIndex: 'end_bal',
                align: 'right', 
                className: 'blue',
                
              }
            ]
          },
          {
            title: 'Ending Balance%',
            className: 'blue',
            align: 'center', 
            'border-right': '1px solid #000',
            children: [
              {
                title: 'd% = d / a',
                key: 'end_bal_pct',
                dataIndex: 'end_bal_pct',
                align: 'right', 
                className: 'blue',
                customCell: (record, rowIndex) => {
                  return {
                    style: {
                      'color': '#c45c14',
                      'border-right': '1px solid #000'
                    }
                  }
                }
              }
            ]
          },
          {
            title: 'Aging of Ending Balance',
            className: 'grey',
            children: [
              //1
              {
                title: '<1 year',
                colSpan: 2,
                dataIndex: '<1year',
                align: 'right',
                className: 'grey',
              },
              {
                title: '<1 year',
                colSpan: 0,
                dataIndex: '<1year_pct',
                align: 'right',
                className: 'grey',
                customCell: (record, rowIndex) => {
                  return {
                    style: {
                      'color': '#c45c14'
                    }
                  }
                }
              },
              //2
              {
                title: '1-2year',
                colSpan: 2,
                dataIndex: '1-2years',
                align: 'right',
                className: 'grey',
              },
              {
                title: '1-2year',
                colSpan: 0,
                dataIndex: '1-2years_pct',
                align: 'right',
                className: 'grey',
                customCell: (record, rowIndex) => {
                  return {
                    style: {
                      'color': '#c45c14'
                    }
                  }
                }
              },
              //3
              {
                title: '2-3years',
                colSpan: 2,
                dataIndex: '2-3years',
                align: 'right',
                className: 'grey',
              },
              {
                title: '2-3years',
                colSpan: 0,
                dataIndex: '2-3years_pct',
                align: 'right',
                className: 'grey',
                customCell: (record, rowIndex) => {
                  return {
                    style: {
                      'color': '#c45c14'
                    }
                  }
                }
              },
              //4
              {
                title: '>3 years',
                colSpan: 2,
                dataIndex: '>3years',
                align: 'right',
                className: 'grey',
              },
              {
                title: '>3years_pct',
                colSpan: 0,
                dataIndex: '>3years_pct',
                align: 'right',
                className: 'grey',
                customCell: (record, rowIndex) => {
                  return {
                    style: {
                      'color': '#c45c14'
                    }
                  }
                }
              },
            ],
          },
        ],
        r7data: [],
  
  
        //row 9 col
        r9header: [
          {
            title: 'IT BP',
            dataIndex: 'IT_BP',
            key: 'IT_BP',
            className: 'grey'
          },
          {
            title: 'Budget Code',
            key: 'Budget_code',
            dataIndex: 'Budget_code',
            className: 'grey'
          },
          {
            title: 'Product Name',
            key: 'Prod_name',
            dataIndex: 'Prod_name',
            className: 'grey'
          },
          {
            title: 'Budget Item',
            key: 'Budget_item',
            dataIndex: 'Budget_item',
            className: 'grey'
          },
          {
            title: 'Beginning Balance',
            dataIndex: 'beg_bal',
            key: 'beg_bal',
            align: 'right',
            className: 'grey',
          },
          {
            title: 'Ending Balance',
            dataIndex: 'end_bal',
            key: 'end_bal',
            align: 'right',
            className: 'grey',
          },
          {
            title: 'Aging',
            key: 'Aging',
            dataIndex: 'Aging',
            className: 'grey'
          },
        ],
        r9data: [],
      },
      components: {},
      template: '',
      watch: {},
      mounted() {
          this.getlocal()
          this.loadPython()
          debugger
        //获取Python的取数结果
      //   this.initialData = window.vueData;
        // row 1
        new_obj = {}
        for (i in this.initialData.part1) {
          new_obj[i] = format(Math.round(this.initialData.part1[i], 0))
        }
  
  
        //row2 overall table
        this.overallTable = new_obj;
  
        //row3 chart1
        this.r3chart1option.dataset.source = this.initialData.part2;
        let r3chart1dom = echarts.init(document.getElementById('r3chart1'));
        r3chart1dom.setOption(this.r3chart1option);
        console.log(this.r3chart1option);
  
        //row3 chart2
        this.r3chart2option.dataset.source = this.initialData.part3;
        let r3chart2dom = echarts.init(document.getElementById('r3chart2'));
        r3chart2dom.setOption(this.r3chart2option);
        console.log(this.r3chart2option);
        
        //row6 chart1
        this.r6chart1option.dataset.source = this.initialData.part4;
        let r6chart1dom = echarts.init(document.getElementById('r6chart1'));
        r6chart1dom.setOption(this.r6chart1option);
        console.log(this.r6chart1option);
  
        //row6 chart2
        this.r6chart2option.dataset.source = this.initialData.part5;
        let r6chart2dom = echarts.init(document.getElementById('r6chart2'));
        r6chart2dom.setOption(this.r6chart2option);
        console.log(this.r6chart2option);
  
        //row7
        var table_part_new = []
        for (item of this.initialData.table_part) {
          for (let key in item) {
  
            //千分位符
            if (["1-2years", "2-3years", '<1year', '>3years', 'beg_bal', 'end_bal', 'ytd_settle', 'ytd_cancel'].includes(key)) {
              item[key] = format(item[key])
            }
            //百分比
            if (["1-2years_pct", "2-3years_pct", '<1year_pct', '>3years_pct', 'end_bal_pct', 'ytd_settle_pct', 'ytd_cancel_pct'].includes(key)) {
              item[key] = Math.round(item[key] * 100) + "%"
            }
  
          }
          table_part_new.push(item);
        }
  
        this.r7data = table_part_new;
  
        //row9
        
        
       var table_part_r9 = []
        for (item of this.initialData.top10_table) {
          for (let key in item) {
  
            //千分位符
            if (['end_bal','beg_bal'].includes(key)) {
              item[key] = format(item[key])
            }
  
            }
  
          table_part_r9.push(item);
        }
  
        this.r9data = table_part_r9;
        
      //   this.r9data = table_part_r9;
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
        setBold(record, index){
          // debugger;
          if ( record.it_bp_desc === "Grand Total" ){
              return "boldRow"
          }
          // console.log( record, index);
        },
        
  
          onChange(date, dateString) {
              console.log(date)
            console.log(date, dateString);
          },
          
          getlocal(){
              var year = new Date().getFullYear();
              var month = new Date().getMonth()+1;
              var date = new Date().getDate();
              this.localedate =  year +'-'+month;
          },
          loadPython() {
  
            var cfs = new DevCustomFuncTools();
          
          //   let year = showDashBoard.globalCurrentPovObj['Year'];
          //   let month = showDashBoard.globalCurrentPovObj['Month'];
          console.log( typeof this.localedate)
                  debugger;
                  if(typeof this.localedate==="string"){
  
          month = this.localedate.split('-')[1]
          year = this.localedate.split('-')[0]
                      
                  }
          else{
  
          month = this.localedate._d.format('YYYY-MM').split('-')[1]
          year = this.localedate._d.format('YYYY-MM').split('-')[0]
          debugger;
          }
          // let month = t.split('-')[1]
          
            let res = cfs.request.python.pythonWeb('accural_aging_dashboard', {
              year:year,
              month: month,
            });
            // console.log(res);
            var resObj = {};
            if (res.err) {
              ForSwal('读取数据失败：' + res.err.Message); //通过右上角的红色卡片报错
            } else {
              try {
              //   resObj = JSON.parse(res.res);
                  this.initialData = JSON.parse(res.res)
              } catch (e) {
                ForSwal('Python结果转换JSON失败：' + e.Message); //通过右上角的红色卡片报错
                // return;
              }
              console.log(resObj);
            }
            // debugger;
          },
          
      }
    })
  
  </script>
  
  <style>
    .normal_table td {
      font-weight: bold;
      width: 250px;
    }
  
    /* table */
    .ant-table {
      font-size: 12px;
    }
  
    /* row data */
    .ant-table-tbody>tr>td {
      height: 8px;
      padding: 6px;
    }
  
    /* row tags */
    .my-tag {
      font-size: 12px;
    }
  
    .ant-table-thead>tr>th {
      height: 8px;
      padding: 6px;
    }
  
    .border {
      border: 1px solid #000
    }
      .border_table {
      border: 2px solid #000
    }
  
    th.blue {
      background-color: #5c9cd4 !important;
      color: white !important;
    }
  
    th.grey {
      background-color: #cccccc !important;
      color: black !important;
    }
    
    .ant-table-thead > tr > th {
          text-align: center !important; 
        }
        
    .boldRow{
         font-weight: bold;
     }
  </style>
    `;
    $('#showDashBoard').append(dom);
  };
  
  //脚本加载
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
      loadAntdCss();
    };
    body.appendChild(jsNode);
  }
  
  function loadAntdCss() {
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = 'https://cdn.jsdelivr.net/npm/ant-design-vue@1.7.7/dist/antd.css';
    link.onload = function () {
      console.log('antd.css加载成功！');
      loadAntdJs();
    };
    document.getElementsByTagName('head')[0].appendChild(link);
  }
  
  function loadAntdJs() {
    var body = document.getElementsByTagName('body')[0];
    var jsNode = document.createElement('script');
    jsNode.setAttribute('type', 'text/javascript');
    jsNode.setAttribute(
      'src',
      'https://cdn.jsdelivr.net/npm/ant-design-vue@1.7.7/dist/antd.js'
    );
    jsNode.onload = function () {
      console.log('antd.js加载成功!');
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
      main();
    };
    body.appendChild(jsNode);
  }
  
  // function loadPython() {
  //   var cfs = new DevCustomFuncTools();
  //     debugger;
  //   let year = showDashBoard.globalCurrentPovObj['Year'];
  //   let month = showDashBoard.globalCurrentPovObj['Month'];
  
  //   let res = cfs.request.python.pythonWeb('accural_aging_dashboard', {
  //     year: year,
  //     month: month,
  //   });
  //   // console.log(res);
  //   var resObj = {};
  //   if (res.err) {
  //     ForSwal('读取数据失败：' + res.err.Message); //通过右上角的红色卡片报错
  //   } else {
  //     try {
  //       resObj = JSON.parse(res.res);
  //     } catch (e) {
  //       ForSwal('Python结果转换JSON失败：' + e.Message); //通过右上角的红色卡片报错
  //       // return;
  //     }
  //     console.log(resObj);
  //   }
  //   // debugger;
  
  //   return resObj;
  // };
  
  
  