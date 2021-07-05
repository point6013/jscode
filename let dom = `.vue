  let dom = `
  <div id="app">
    <!----------------------------------------------     1.China CapEx Spending Summary   --------------------------------------------------------------->
    <el-row :gutter="20">
      <el-col :span="24">
        <!-- card1 -->
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span style="font-weight: bold;"><em>1.China CapEx Spending Summary</em></span>
          </div>
          <el-row :gutter="24">
            <el-col :span="2"></el-col>
            <el-col :span="24">
              <span style="font-weight: bold;">Store CapEx</span></br></br>
              <div class="borders">
                <!-- Store Capex表格 -->
                <el-table id='table1' :data="storeCapex" :show-header="false">
                  <el-table-column prop="c1" style="font-weight: bold;">
                  </el-table-column>
                  <el-table-column prop="c2" :formatter="stateFormat" style="font-weight: bold;">
                  </el-table-column>
                  <el-table-column prop="c3">
                  </el-table-column>
                  <el-table-column prop="c4" :formatter="stateFormat">
                  </el-table-column>
                  <el-table-column prop="c5" >
                  </el-table-column>
                  <el-table-column prop="c6" :formatter="stateFormat">
                  </el-table-column>
                  <el-table-column prop="c7">
                  </el-table-column>
                  <el-table-column prop="c8" :formatter="stateFormat">
                  </el-table-column>
                  <el-table-column prop="c9">
                  </el-table-column>
                  <el-table-column prop="c10" :formatter="stateFormat">
                  </el-table-column>
                </el-table>
              </div>
            </el-col>
            <el-col :span="2"></el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="2"></el-col>
            <el-col :span="24">
              <span style="font-weight: bold;">Office IT CapEx</span></br></br>
              <div class="borders">
                <!-- Office IT Capex表格 -->
                <el-table id='table2' :data="officeITCapex" :show-header="false">
                  <el-table-column prop="c1" width="160">
                  </el-table-column>
                  <el-table-column prop="c2" :formatter="stateFormat">
                  </el-table-column>
                  <el-table-column prop="c3">
                  </el-table-column>
                  <el-table-column prop="c4" :formatter="stateFormat">
                  </el-table-column>
                  <el-table-column prop="c5">
                  </el-table-column>
                  <el-table-column prop="c6" :formatter="stateFormat">
                  </el-table-column>
                  <el-table-column prop="c7">
                  </el-table-column>
                  <el-table-column prop="c8" :formatter="stateFormat">
                  </el-table-column>
                  <el-table-column prop="c9">
                  </el-table-column>
                  <el-table-column prop="c10">
                  </el-table-column>
                </el-table>
              </div>
            </el-col>
            <el-col :span="2">
            </el-col>
          </el-row>
        </el-card>
        <!-- / card1 -->
      </el-col>
    </el-row>
    <!----------------------------------------------     2.Dev CapEx Spending Tracking   --------------------------------------------------------------->
    <el-row :gutter="20">
      <el-col :span="24">
        <!-- card2 -->
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span style="font-weight: bold;"><em>2.Dev CapEx Spending Tracking</em></span>
          </div>
          <el-row>
            <el-col :span="10">
              <div id="DevChart" style="height: 325px;width: 100%;"></div>
            </el-col>
            <el-col :span="14">
              <template>
                <el-table id='DevTable' :data="DevTable"
                  :header-cell-style="{background:'#ffc000', color:'black', 'text-align':'center'}"
                  :cell-style="DevCellStyle" :row-class-name="DevRowStyle" class="table" style="font-size: 8px">
                  <el-table-column prop="Project" label="Project" width="180">
                  </el-table-column>
                  <el-table-column prop="Plan" label="Plan" :formatter="stateFormat">
                  </el-table-column>
                  <el-table-column prop="Proj" label="Proj." :formatter="stateFormat">
                  </el-table-column>
                  <el-table-column prop="Var_pct" label="Var %" :formatter="statePercent">
                  </el-table-column>
                  <el-table-column prop="已完成" label="已完成" :formatter="stateFormat">
                  </el-table-column>
                  <el-table-column prop="在途" label="在途" :formatter="stateFormat">
                  </el-table-column>
                  <el-table-column prop="已报价" label="已报价" :formatter="stateFormat">
                  </el-table-column>
                  <el-table-column prop="已完成_pct" label="已完成%" :formatter="statePercent">
                  </el-table-column>
                </el-table>
              </template>
            </el-col>
          </el-row>
        </el-card>
        <!-- /card2 -->
      </el-col>
    </el-row>
    <!----------------------------------------    3. Ops CapEx Spending Tracking    --------------------------------------------->
    <el-row :gutter="20">
      <el-col :span="24">
        <!-- card3 -->
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span style="font-weight: bold;"><em>3. Ops CapEx Spending Tracking</em></span>
          </div>
          <el-row>
            <el-col :span="10">
              <!-- echarts-->
              <div id="OpsChart" style="height: 325px;width: 100%;"></div>
              <!-- /echarts -->
            </el-col>
            <el-col :span="14">
              <template>
                <!-- table -->
                <el-table id='OpsTable' :data="OpsTable"
                  :header-cell-style="{background:'#ffc000', color:'black', 'text-align':'center'}"
                  :cell-style="OpsCellStyle" :row-class-name="OpsRowStyle" class="table" max-height="550" style="font-size: 8px">
                  <el-table-column prop="Project" label="Project" width="180">
                  </el-table-column>
                  <el-table-column prop="Plan" label="Plan" :formatter="stateFormat">
                  </el-table-column>
                  <el-table-column prop="Proj" label="Proj." :formatter="stateFormat">
                  </el-table-column>
                  <el-table-column prop="Var_pct" label="Var %" :formatter="statePercent">
                  </el-table-column>
                  <el-table-column prop="已完成" label="已完成" :formatter="stateFormat">
                  </el-table-column>
                  <el-table-column prop="在途" label="在途" :formatter="stateFormat">
                  </el-table-column>
                  <el-table-column prop="已报价" label="已报价" :formatter="stateFormat">
                  </el-table-column>
                  <el-table-column prop="已完成_pct" label="已完成%" :formatter="statePercent">
                  </el-table-column>
                </el-table>
                <!-- /table -->
              </template>
            </el-col>
          </el-row>
        </el-card>
        <!-- /card3 -->
      </el-col>
    </el-row>
    <!----------------------------------------    4. BE CapEx Spending Tracking    --------------------------------------------->
    <el-row :gutter="20">
      <el-col :span="24">
        <!-- card4 -->
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span style="font-weight: bold;"><em>4. BE CapEx Spending Tracking</em></span>
          </div>
          <el-row>
            <el-col :span="10">
              <div id="BEChart" style="height: 500px;width: 100%;"></div>
            </el-col>
            <el-col :span="14">
              <!-- BE CapEx Spending Tracking -->
              <template>
                <el-table id='BETable' :data="BETable"
                  :header-cell-style="{background:'#ffc000', color:'black', 'text-align':'center'}"
                  :cell-style="BECellStyle" :row-class-name="BERowStyle" class="table" max-height="500" style="font-size: 8px">
                  <el-table-column prop="Project" label="Project" width="180">
                  </el-table-column>
                  <el-table-column prop="Plan" label="Plan" :formatter="stateFormat">
                  </el-table-column>
                  <el-table-column prop="Proj" label="Proj." :formatter="stateFormat">
                  </el-table-column>
                  <el-table-column prop="Var_pct" label="Var %" :formatter="statePercent">
                  </el-table-column>
                  <el-table-column prop="已完成" label="已完成" :formatter="stateFormat">
                  </el-table-column>
                  <el-table-column prop="在途" label="在途" :formatter="stateFormat">
                  </el-table-column>
                  <el-table-column prop="已报价" label="已报价" :formatter="stateFormat">
                  </el-table-column>
                  <el-table-column prop="已完成_pct" label="已完成%" :formatter="statePercent">
                  </el-table-column>
                </el-table>
              </template>
            </el-col>
          </el-row>
        </el-card>
        <!-- /card3 -->
      </el-col>
    </el-row>
    <!----------------------------------------      5. CapEx M&R Spending Tracking    --------------------------------------------->
    <el-row :gutter="20">
      <el-col :span="24">
        <!-- card4 -->
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span style="font-weight: bold;"><em>5. CapEx M&R Spending Tracking</em></span>
          </div>
          <el-row>
            <el-col :span="10">
              <div id="MRChart" style="height: 500px;width: 100%;"></div>
            </el-col>
            <el-col :span="14">
              <template>
                <el-table id='MRTable' :data="MRTable"
                  :header-cell-style="{background:'#ffc000', color:'black', 'text-align':'center'}"
                  :cell-style="MRCellStyle" :row-class-name="MRRowStyle" class="table" max-height="500" style="font-size: 8px">
                  <el-table-column prop="Market" label="Market" width="180">
                  </el-table-column>
                  <el-table-column prop="Plan" label="Plan" :formatter="stateFormat">
                  </el-table-column>
                  <el-table-column prop="Proj" label="Proj." :formatter="stateFormat">
                  </el-table-column>
                  <el-table-column prop="Var_pct" label="Var %" :formatter="statePercent">
                  </el-table-column>
                  <el-table-column prop="已完成" label="已完成" :formatter="stateFormat">
                  </el-table-column>
                  <el-table-column prop="在途" label="在途" :formatter="stateFormat">
                  </el-table-column>
                  <el-table-column prop="已报价" label="已报价" :formatter="stateFormat">
                  </el-table-column>
                  <el-table-column prop="已完成_pct" label="已完成%" :formatter="statePercent">
                  </el-table-column>
                </el-table>
              </template>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
    <!----------------------------------------      6.Store IT Capex Spending Tracking    --------------------------------------------->
    <el-row :gutter="20">
      <el-col :span="24">
        <!-- card4 -->
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span style="font-weight: bold;"><em>6.Store IT Capex Spending Tracking</em></span>
          </div>
          <el-row>
            <el-col :span="10">
              <div id="StoreITChart" style="height: 500px;width: 100%;"></div>
            </el-col>
            <el-col :span="14">
              <template>
                <el-table id='StoreITTable' :data="StoreITTable"
                  :header-cell-style="{background:'#ffc000', color:'black', 'text-align':'center'}"
                  :cell-style="StoreITCellStyle" :row-class-name="StoreITRowStyle" class="table" max-height="500" style="font-size: 8px">
                  <el-table-column prop="Project" label="Project" width="180">
                  </el-table-column>
                  <el-table-column prop="Plan" label="Plan" :formatter="stateFormat">
                  </el-table-column>
                  <el-table-column prop="Proj" label="Proj." :formatter="stateFormat">
                  </el-table-column>
                  <el-table-column prop="Var_pct" label="Var %" :formatter="statePercent">
                  </el-table-column>
                  <el-table-column prop="已完成" label="已完成" :formatter="stateFormat">
                  </el-table-column>
                  <el-table-column prop="在途" label="在途" :formatter="stateFormat">
                  </el-table-column>
                  <el-table-column prop="已报价" label="已报价" :formatter="stateFormat">
                  </el-table-column>
                  <el-table-column prop="已完成_pct" label="已完成%" :formatter="statePercent">
                  </el-table-column>
                </el-table>
              </template>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
    <!----------------------------------------      7. Office IT Capex Spending Tracking    --------------------------------------------->
    <el-row :gutter="20">
      <el-col :span="24">
        <!-- card4 -->
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span style="font-weight: bold;"><em>7. Office IT Capex Spending Tracking</em></span>
          </div>
          <el-row>
            <el-col :span="10">
              <div id="OfficeITChart" style="height: 500px;width: 100%;"></div>
            </el-col>
            <el-col :span="14">
              <template>
                <el-table id='OfficeITTable' :data="OfficeITTable"
                  :header-cell-style="{background:'#ffc000', color:'black', 'text-align':'center'}"
                  :cell-style="OfficeITCellStyle" :row-class-name="OfficeITRowStyle" class="table" max-height="500" style="font-size: 8px">
                  <el-table-column prop="Project" label="Project" width="160">
                  </el-table-column>
                  <el-table-column prop="Plan" label="Plan" :formatter="stateFormat">
                  </el-table-column>
                  <el-table-column prop="Proj" label="Proj." :formatter="stateFormat">
                  </el-table-column>
                  <el-table-column prop="Var_pct" label="Var %" :formatter="statePercent">
                  </el-table-column>
                  <el-table-column prop="Actual" label="Actual Payment" :formatter="stateFormat" width="120">
                  </el-table-column>
                  <el-table-column prop="PD Not Paid" label="PD Not Paid" :formatter="stateFormat">
                  </el-table-column>
                  <el-table-column prop="Paid_pct" label="Paid%" :formatter="statePercent">
                  </el-table-column>
                </el-table>
              </template>
            </el-col>
          </el-row>
        </el-card>
        <!-- /card3 -->
      </el-col>
    </el-row>
  </div>
  <script>
    
    const app = new Vue({
      el: '#app',
      data: {
        //Store Capex
        storeCapex: [
          { c1: '已完成', c2: 0, c3: '在途', c4: 0, c5: '已报价', c6: 0, c7: '未使用', c8: 0, c9: 'Total', c10: 0 },
          { c2: '10%', c4: '35%', c6: '55%'}
        ],
        //Office IT Capex
        officeITCapex: [
          { c1: 'Actual Payment', c2: 13591, c3: 'PD Not Paid', c4: 49680, c5: 'Purchase Plan', c6: 77781, c7: 'Total', c8: 141052 },
          { c2: '10%', c4: '35%', c6: '55%' }
        ],
        //dev CapEx Spending Tracking
        Dev: undefined,
        DevTable: [],
        DevChart:
        {
          title: {
            text: 'Budget Spending%',
            x:'center',
            y:'5'
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          legend: {
            x: '40%',
            y: 'bottom',
          },
          grid: {
            left: '10%',
            right: '10%',
            bottom: '10%',
            top: '15%',
            containLabel: true
          },
          xAxis: {
            name: '%',
            type: 'value',
            max:100,
            axisLine: {
              symbol: ['none', 'arrow'], //两端都显示箭头
              symbolOffset: [0, 5] //箭头距离两端的距离,可为负数
            }
          },
          yAxis: {
            name: "",
            type: 'category',
            data: ['三线城市-铂涛客户组合', '三线城市-GDL客户组合', '二线城市-卢浮亚洲客户组合', '二线城市-维也纳客户组合', '二线城市-铂涛客户组合', '二线城市-GDL客户组合', '一线城市-卢浮亚洲客户组合', '一线城市-维也纳客户组合', '一线城市-铂涛客户组合', '一线城市-GDL客户组合'],
            // axisLine: {
            //     symbol: ['none', 'none'], //两端都显示箭头
            //     symbolOffset: [0, 30] //箭头距离两端的距离,可为负数
            // }
          },
          series: [
            {
              stack: "0",
              name: '已完成',
              type: 'bar',
              data: [9000, 10000, 10500, 11000, 12000, 14500, 15000, 16000, 17500, 21000],
              itemStyle: {
                //通常情况下：
                normal: {
                  //每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
                  color: '#3161b6'
                }
              },
              //鼠标悬停时：
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            },
            {
              stack: "0",
              name: '在途',
              type: 'bar',
              data: [9000, 10000, 10500, 11000, 12000, 14500, 15000, 16000, 17500, 21000],
              itemStyle: {
                //通常情况下：
                normal: {
                  //每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
                  color: '#e88b00'
                }
              },
              //鼠标悬停时：
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            },
            {
              stack: "0",
              name: '已报价',
              type: 'bar',
              data: [9000, 10000, 10500, 11000, 12000, 14500, 15000, 16000, 17500, 21000],
              itemStyle: {
                //通常情况下：
                normal: {
                  //每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
                  color: '#bdbdbd'
                }
              },
              //鼠标悬停时：
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            },
          ]
        },
        //Ops CapEx Spending Tracking
        Ops: undefined,
        OpsTable: [],
        OpsChart:
        {
          title: {
            text: 'Budget Spending%',
            x:'center',
            y:'5'
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          legend: {
            x: '40%',
            y: 'bottom',
          },
          grid: {
            left: '10%',
            right: '10%',
            bottom: '10%',
            top: '10%',
            containLabel: true
          },
          xAxis: {
            name: '%',
            type: 'value',
            max:100,
            axisLine: {
              symbol: ['none', 'arrow'], //两端都显示箭头
              symbolOffset: [0, 5] //箭头距离两端的距离,可为负数
            }
          },
          yAxis: {
            name: "",
            type: 'category',
            data: ['三线城市-铂涛客户组合', '三线城市-GDL客户组合', '二线城市-卢浮亚洲客户组合', '二线城市-维也纳客户组合', '二线城市-铂涛客户组合', '二线城市-GDL客户组合', '一线城市-卢浮亚洲客户组合', '一线城市-维也纳客户组合', '一线城市-铂涛客户组合', '一线城市-GDL客户组合'],
            // axisLine: {
            //     symbol: ['none', 'none'], //两端都显示箭头
            //     symbolOffset: [0, 30] //箭头距离两端的距离,可为负数
            // }
          },
          series: [
            {
              stack: "0",
              name: '已完成',
              type: 'bar',
              data: [9000, 10000, 10500, 11000, 12000, 14500, 15000, 16000, 17500, 21000],
              itemStyle: {
                //通常情况下：
                normal: {
                  //每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
                  color: '#3161b6'
                }
              },
              //鼠标悬停时：
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            },
            {
              stack: "0",
              name: '在途',
              type: 'bar',
              data: [9000, 10000, 10500, 11000, 12000, 14500, 15000, 16000, 17500, 21000],
              itemStyle: {
                //通常情况下：
                normal: {
                  //每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
                  color: '#e88b00'
                }
              },
              //鼠标悬停时：
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            },
            {
              stack: "0",
              name: '已报价',
              type: 'bar',
              data: [9000, 10000, 10500, 11000, 12000, 14500, 15000, 16000, 17500, 21000],
              itemStyle: {
                //通常情况下：
                normal: {
                  //每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
                  color: '#bdbdbd'
                }
              },
              //鼠标悬停时：
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            },
          ]
        },
        //BE CapEx Spending Tracking
        BETable: [],
        BEChart:
        {
          title: {
            text: 'Budget Spending%',
            x:'center',
            y:'5'
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          legend: {
            x: '40%',
            y: 'bottom',
          },
          grid: {
            left: '10%',
            right: '10%',
            bottom: '10%',
            top: '15%',
            containLabel: true
          },
          xAxis: {
            name: '%',
            type: 'value',
            max:100,
            axisLine: {
              symbol: ['none', 'arrow'], //两端都显示箭头
              symbolOffset: [0, 5] //箭头距离两端的距离,可为负数
            }
          },
          yAxis: {
            name: "",
            type: 'category',
            data: ['三线城市-铂涛客户组合', '三线城市-GDL客户组合', '二线城市-卢浮亚洲客户组合', '二线城市-维也纳客户组合', '二线城市-铂涛客户组合', '二线城市-GDL客户组合', '一线城市-卢浮亚洲客户组合', '一线城市-维也纳客户组合', '一线城市-铂涛客户组合', '一线城市-GDL客户组合'],
            // axisLine: {
            //     symbol: ['none', 'none'], //两端都显示箭头
            //     symbolOffset: [0, 30] //箭头距离两端的距离,可为负数
            // }
          },
          series: [
            {
              stack: "0",
              name: '已完成',
              type: 'bar',
              data: [9000, 10000, 10500, 11000, 12000, 14500, 15000, 16000, 17500, 21000],
              itemStyle: {
                //通常情况下：
                normal: {
                  //每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
                  color: '#3161b6'
                }
              },
              //鼠标悬停时：
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            },
            {
              stack: "0",
              name: '在途',
              type: 'bar',
              data: [9000, 10000, 10500, 11000, 12000, 14500, 15000, 16000, 17500, 21000],
              itemStyle: {
                //通常情况下：
                normal: {
                  //每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
                  color: '#e88b00'
                }
              },
              //鼠标悬停时：
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            },
            {
              stack: "0",
              name: '已报价',
              type: 'bar',
              data: [9000, 10000, 10500, 11000, 12000, 14500, 15000, 16000, 17500, 21000],
              itemStyle: {
                //通常情况下：
                normal: {
                  //每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
                  color: '#bdbdbd'
                }
              },
              //鼠标悬停时：
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            },
          ]
        },
        //CapEx M&R Spending Tracking
        MRTable: [],
        MRChart:
        {
          title: {
            text: 'Budget Spending%',
            x:'center',
            y:'5'
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          legend: {
            x: '40%',
            y: 'bottom',
          },
          grid: {
            left: '10%',
            right: '10%',
            bottom: '10%',
            top: '15%',
            containLabel: true
          },
          xAxis: {
            name: '%',
            type: 'value',
            max:100,
            axisLine: {
              symbol: ['none', 'arrow'], //两端都显示箭头
              symbolOffset: [0, 5] //箭头距离两端的距离,可为负数
            }
          },
          yAxis: {
            name: "",
            type: 'category',
            data: ['三线城市-铂涛客户组合', '三线城市-GDL客户组合', '二线城市-卢浮亚洲客户组合', '二线城市-维也纳客户组合', '二线城市-铂涛客户组合', '二线城市-GDL客户组合', '一线城市-卢浮亚洲客户组合', '一线城市-维也纳客户组合', '一线城市-铂涛客户组合', '一线城市-GDL客户组合'],
          },
          series: [
            {
              stack: "0",
              name: '已完成',
              type: 'bar',
              data: [9000, 10000, 10500, 11000, 12000, 14500, 15000, 16000, 17500, 21000],
              itemStyle: {
                //通常情况下：
                normal: {
                  //每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
                  color: '#3161b6'
                }
              },
              //鼠标悬停时：
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            },
            {
              stack: "0",
              name: '在途',
              type: 'bar',
              data: [9000, 10000, 10500, 11000, 12000, 14500, 15000, 16000, 17500, 21000],
              itemStyle: {
                //通常情况下：
                normal: {
                  //每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
                  color: '#e88b00'
                }
              },
              //鼠标悬停时：
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            },
            {
              stack: "0",
              name: '已报价',
              type: 'bar',
              data: [9000, 10000, 10500, 11000, 12000, 14500, 15000, 16000, 17500, 21000],
              itemStyle: {
                //通常情况下：
                normal: {
                  //每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
                  color: '#bdbdbd'
                }
              },
              //鼠标悬停时：
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            },
          ]
        },
        //Store IT Capex Spending Tracking
        store_it_capex: undefined,
        StoreITTable: [],
        StoreITChart:
        {
          title: {
            text: 'Budget Spending%',
            x:'center',
            y:'3'
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          legend: {
            x: '40%',
            y: 'bottom',
          },
          grid: {
            left: '10%',
            right: '10%',
            bottom: '10%',
            top: '20%',
            containLabel: true
          },
          xAxis: {
            name: '%',
            type: 'value',
            max:100,
            axisLine: {
              symbol: ['none', 'arrow'], //两端都显示箭头
              symbolOffset: [0, 5] //箭头距离两端的距离,可为负数
            }
          },
          yAxis: {
            name: "",
            type: 'category',
            data: ['三线城市-铂涛客户组合', '三线城市-GDL客户组合', '二线城市-卢浮亚洲客户组合', '二线城市-维也纳客户组合', '二线城市-铂涛客户组合', '二线城市-GDL客户组合', '一线城市-卢浮亚洲客户组合', '一线城市-维也纳客户组合', '一线城市-铂涛客户组合', '一线城市-GDL客户组合'],
            // axisLine: {
            //     symbol: ['none', 'none'], //两端都显示箭头
            //     symbolOffset: [0, 30] //箭头距离两端的距离,可为负数
            // }

          },
          series: [
            {
              stack: "0",
              name: '已完成',
              type: 'bar',
              data: [9000, 10000, 10500, 11000, 12000, 14500, 15000, 16000, 17500, 21000],
              itemStyle: {
                //通常情况下：
                normal: {
                  //每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
                  color: '#3161b6'
                }
              },
              //鼠标悬停时：
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            },
            {
              stack: "0",
              name: '在途',
              type: 'bar',
              data: [9000, 10000, 10500, 11000, 12000, 14500, 15000, 16000, 17500, 21000],
              itemStyle: {
                //通常情况下：
                normal: {
                  //每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
                  color: '#e88b00'
                }
              },
              //鼠标悬停时：
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            },
            {
              stack: "0",
              name: '已报价',
              type: 'bar',
              data: [9000, 10000, 10500, 11000, 12000, 14500, 15000, 16000, 17500, 21000],
              itemStyle: {
                //通常情况下：
                normal: {
                  //每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
                  color: '#bdbdbd'
                }
              },
              //鼠标悬停时：
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            },
          ]
        },
        //Office IT Capex Spending Tracking
        office_it_capex: undefined,
        OfficeITTable: [],
        OfficeITChart:
        {
          title: {
            text: 'Budget Spending%',
            x:'center',
            y:'5'
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          legend: {
            x: '40%',
            y: 'bottom',
          },
          grid: {
            left: '10%',
            right: '10%',
            bottom: '10%',
            top: '15%',
            containLabel: true
          },
          xAxis: {
            name: '%',
            type: 'value',
            max:100,
            axisLine: {
              symbol: ['none', 'arrow'], //两端都显示箭头
              symbolOffset: [0, 5] //箭头距离两端的距离,可为负数
            }
          },
          yAxis: {
            name: "",
            type: 'category',
            data: ['三线城市-铂涛客户组合', '三线城市-GDL客户组合', '二线城市-卢浮亚洲客户组合', '二线城市-维也纳客户组合', '二线城市-铂涛客户组合', '二线城市-GDL客户组合', '一线城市-卢浮亚洲客户组合', '一线城市-维也纳客户组合', '一线城市-铂涛客户组合', '一线城市-GDL客户组合'],
            // axisLine: {
            //     symbol: ['none', 'none'], //两端都显示箭头
            //     symbolOffset: [0, 30] //箭头距离两端的距离,可为负数
            // }
          },
          series: [
            {
              stack: "0",
              name: 'Actual Payment',
              type: 'bar',
              data: [9000, 10000, 10500, 11000, 12000, 14500, 15000, 16000, 17500, 21000],
              itemStyle: {
                //通常情况下：
                normal: {
                  //每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
                  color: '#3161b6'
                }
              },
              //鼠标悬停时：
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            },
            {
              stack: "0",
              name: 'PD Not Paid',
              type: 'bar',
              data: [9000, 10000, 10500, 11000, 12000, 14500, 15000, 16000, 17500, 21000],
              itemStyle: {
                //通常情况下：
                normal: {
                  //每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
                  color: '#e88b00'
                }
              },
              //鼠标悬停时：
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            },
          ]
        },
      },
      components: {},
      watch: {},
      mounted() {
        let pyName = 'China_CapEx_Dashboard';
        let getSearchParam = showDashBoard.globalCurrentPovObj['Year'];
        let res = JSON.parse(cfs.request.python.pythonWeb(pyName, {'Year':getSearchParam}).res);
        let resObj = res;

        // resObj = eval("("+vueData+")");

        //这里填入table的数值
        this.DevTable = resObj['Dev'];
        //这里改echarts的option
        let Label = [];
        let Finished = [];
        let InTransit = [];
        let Quoted = [];
        for(let item of this.DevTable){
            if( item.is_bold === 1 && item['Project'] !== 'Total'){
                continue;
            }
          Label.push(item['Project'].substring(0,19).padStart(20,' '));
          Finished.push(item['已完成_pct']);
          InTransit.push(item['在途_pct']);
          Quoted.push(item['已报价_pct']);
        }
        this.DevChart.yAxis.data = Label.reverse();
        this.DevChart.series[0].data = Finished.reverse();
        this.DevChart.series[1].data = InTransit.reverse();
        this.DevChart.series[2].data = Quoted.reverse();


        this.OpsTable = resObj['Ops'];
        Label = [];
        Finished = [];
        InTransit = [];
        Quoted = [];
        for(let item of this.OpsTable){
            if( item.is_bold === 1 && item['Project'] !== 'Total'){
                continue;
            }
          Label.push(item['Project'].substring(0,19).padStart(20,' '));
          Finished.push(item['已完成_pct']);
          InTransit.push(item['在途_pct']);
          Quoted.push(item['已报价_pct']);
        }
        this.OpsChart.yAxis.data = Label.reverse();
        this.OpsChart.series[0].data = Finished.reverse();
        this.OpsChart.series[1].data = InTransit.reverse();
        this.OpsChart.series[2].data = Quoted.reverse();

        this.BETable = resObj['BE'];
        Label = [];
        Finished = [];
        InTransit = [];
        Quoted = [];
        for(let item of this.BETable){
            if( item.is_bold === 1 && item['Project'] !== 'Total'){
                continue;
            }
          Label.push(item['Project'].substring(0,19).padStart(20,' '));
          Finished.push(item['已完成_pct']);
          InTransit.push(item['在途_pct']);
          Quoted.push(item['已报价_pct']);
        }
        this.BEChart.yAxis.data = Label.reverse();
        this.BEChart.series[0].data = Finished.reverse();
        this.BEChart.series[1].data = InTransit.reverse();
        this.BEChart.series[2].data = Quoted.reverse();

        this.MRTable = resObj['M&R'];
        Label = [];
        Finished = [];
        InTransit = [];
        Quoted = [];
        for(let item of this.MRTable){
            if( item.is_bold === 1 && item['Market'] !== 'Total'){
                continue;
            }
          Label.push(item['Market'].substring(0,19).padStart(20,' '));
          Finished.push(item['已完成_pct']);
          InTransit.push(item['在途_pct']);
          Quoted.push(item['已报价_pct']);
        }
        this.MRChart.yAxis.data = Label.reverse();
        this.MRChart.series[0].data = Finished.reverse();
        this.MRChart.series[1].data = InTransit.reverse();
        this.MRChart.series[2].data = Quoted.reverse();


        this.StoreITTable = resObj['store_it'];
        Label = [];
        Finished = [];
        InTransit = [];
        Quoted = [];
        for(let item of this.StoreITTable){
            if( item.is_bold === 1 && item['Project'] !== 'Total'){
                continue;
            }
          Label.push(item['Project'].substring(0,19).padStart(20,' '));
          Finished.push(item['已完成_pct']);
          InTransit.push(item['在途_pct']);
          Quoted.push(item['已报价_pct']);
        }
        this.StoreITChart.yAxis.data = Label.reverse();
        this.StoreITChart.series[0].data = Finished.reverse();
        this.StoreITChart.series[1].data = InTransit.reverse();
        this.StoreITChart.series[2].data = Quoted.reverse()


        this.OfficeITTable = resObj['office_it'];
        Label = [];
        Finished = [];
        InTransit = [];
        Quoted = [];
        for(let item of this.OfficeITTable){
            if( item.is_bold === 1 && item['Project'] !== 'Total'){
                continue;
            }
          Label.push(item['Project'].substring(0,19).padStart(20,' '));
          Finished.push(item['Paid_pct']);
          InTransit.push(item['PD Not Paid_pct']);

        }
        this.OfficeITChart.yAxis.data = Label.reverse();
        this.OfficeITChart.series[0].data = Finished.reverse();
        this.OfficeITChart.series[1].data = InTransit.reverse();



        //Store Capex
        this.storeCapex[0]['c2'] = resObj['store_it_capex']['已完成'];
        this.storeCapex[1]['c2'] = resObj['store_it_capex']['已完成_pct'] + '%';
        this.storeCapex[0]['c4'] = resObj['store_it_capex']['在途'];
        this.storeCapex[1]['c4'] = resObj['store_it_capex']['在途_pct'] + '%';
        this.storeCapex[0]['c6'] = resObj['store_it_capex']['已报价'];
        this.storeCapex[1]['c6'] = resObj['store_it_capex']['已报价_pct'] + '%';
        this.storeCapex[0]['c8'] = resObj['store_it_capex']['未使用'];
        this.storeCapex[1]['c8'] = resObj['store_it_capex']['未使用_pct'] + '%';
        this.storeCapex[0]['c10'] = resObj['store_it_capex']['Proj'];

        ////Office IT Capex
        this.officeITCapex[0]['c2'] = resObj['office_it_capex'][0]['Actual'];
        this.officeITCapex[1]['c2'] = resObj['office_it_capex'][0]['Paid_pct'] + '%';
        this.officeITCapex[0]['c4'] = resObj['office_it_capex'][0]['PD Not Paid'];
        this.officeITCapex[1]['c4'] = resObj['office_it_capex'][0]['PD Not Paid_pct'] + '%';
        this.officeITCapex[0]['c6'] = resObj['office_it_capex'][0]['Purchase Plan'];
        this.officeITCapex[1]['c6'] = resObj['office_it_capex'][0]['Purchase Plan_pct'] + '%';
        this.officeITCapex[0]['c8'] = resObj['office_it_capex'][0]['Proj'];

        console.log(resObj);

        
        this.$nextTick(function () {
          debugger;
          // 仅在渲染整个视图之后运行的代码
          document.getElementById('DevChart').setAttribute('style', 'height: ' + document.getElementById('DevTable').offsetHeight + 'px !important');
          document.getElementById('OpsChart').setAttribute('style', 'height: ' + document.getElementById('OpsTable').offsetHeight + 'px !important');
          document.getElementById('BEChart').setAttribute('style', 'height: ' + document.getElementById('BETable').offsetHeight + 'px !important');
          document.getElementById('MRChart').setAttribute('style', 'height: ' + document.getElementById('MRTable').offsetHeight + 'px !important');
          document.getElementById('StoreITChart').setAttribute('style', 'height: ' + document.getElementById('StoreITTable').offsetHeight + 'px !important');
          document.getElementById('OfficeITChart').setAttribute('style', 'height: ' + document.getElementById('OfficeITTable').offsetHeight + 'px !important');
          //绘制Echarts
          //dev CapEx Spending Tracking
          this.drawBarChart('DevChart', this.DevChart);
          //Ops CapEx Spending Tracking
          this.drawBarChart('OpsChart', this.OpsChart);
          //BE CapEx Spending Tracking
          this.drawBarChart('BEChart', this.BEChart);
          //CapEx M&R Spending Tracking
          this.drawBarChart('MRChart', this.MRChart);
          //Store IT Capex Spending Tracking
          this.drawBarChart('StoreITChart', this.StoreITChart);
          //Office IT Capex Spending Tracking
          this.drawBarChart('OfficeITChart', this.OfficeITChart);
        })
      },
      methods: {
        drawBarChart(id, option) {
          // let that = this;
          // 1. 基于准备好的dom，初始化echarts实例
          let myChart = echarts.init(document.getElementById(id));
          myChart.innerHTML = "";
          // 3. 使用刚指定的配置项和数据显示图表
          myChart.setOption(option);
        },
        //dev CapEx Spending Tracking
        DevRowStyle(row) {
          if (this.DevTable[row.rowIndex]['Project'] === 'Total') {
            return 'last-row'
          }
          else if (this.DevTable[row.rowIndex]['is_bold'] === 1) {
            return 'header-row'
          }
          else{
            return 'normal-row'
          }
        },
        DevCellStyle(index) {
          //console.log(index)
          if (this.DevTable[index.rowIndex]['Project'] === 'Total') {
            if (index.columnIndex === 0) {
            return 'text-align: left; background:"#dce4f4" '
            }
            else{
              return 'text-align: right; background:"#dce4f4" '
            }
          }
          else if (this.DevTable[index.rowIndex]['is_bold'] === 1) {
            if (index.columnIndex === 0) {
            return 'text-align: left; '
            }
            else{
              return 'text-align: right; '
            }
          }
          else if (this.DevTable[index.rowIndex]['is_bold'] === 0) {
            if (index.columnIndex === 0) {
            return 'text-align: left; padding-left:15px;'
            }
            else{
              return 'text-align: right; '
            }
          }
        },
        //Ops CapEx Spending Tracking
        OpsRowStyle(row) {
          if (this.OpsTable[row.rowIndex]['Project'] === 'Total') {
            return 'last-row'
          }
          else if (this.OpsTable[row.rowIndex]['is_bold'] === 1) {
            return 'header-row'
          }
          else{
            return 'normal-row'
          }
        },
        OpsCellStyle(index) {
          //console.log(index)
          if (this.OpsTable[index.rowIndex]['Project'] === 'Total') {
            if (index.columnIndex === 0) {
            return 'text-align: left; background:"#dce4f4" '
            }
            else{
              return 'text-align: right; background:"#dce4f4" '
            }
          }
          else if (this.OpsTable[index.rowIndex]['is_bold'] === 1) {
            if (index.columnIndex === 0) {
            return 'text-align: left; '
            }
            else{
              return 'text-align: right; '
            }
          }
          else if (this.OpsTable[index.rowIndex]['is_bold'] === 0) {
            if (index.columnIndex === 0) {
            return 'text-align: left; padding-left:15px;'
            }
            else{
              return 'text-align: right; '
            }
          }
        },
        //BE CapEx Spending Tracking
        BERowStyle(row) {
          if (this.BETable[row.rowIndex]['Project'] === 'Total') {
            return 'last-row'
          }
          else if (this.BETable[row.rowIndex]['is_bold'] === 1) {
            return 'header-row'
          }
          else{
            return 'normal-row'
          }
        },
        BECellStyle(index) {
          //console.log(index)
          if (this.BETable[index.rowIndex]['Project'] === 'Total') {
            if (index.columnIndex === 0) {
            return 'text-align: left; background:"#dce4f4" '
            }
            else{
              return 'text-align: right; background:"#dce4f4" '
            }
          }
          else if (this.BETable[index.rowIndex]['is_bold'] === 1) {
            if (index.columnIndex === 0) {
            return 'text-align: left; '
            }
            else{
              return 'text-align: right; '
            }
          }
          else if (this.BETable[index.rowIndex]['is_bold'] === 0) {
            if (index.columnIndex === 0) {
            return 'text-align: left; padding-left:15px;'
            }
            else{
              return 'text-align: right; '
            }
          }
        },
        //CapEx M&R Spending Tracking
        MRRowStyle(row) {
          if (this.MRTable[row.rowIndex]['Market'] === 'Total') {
            return 'last-row2'
          }
          else if (this.MRTable[row.rowIndex]['is_bold'] === 1) {
            return 'header-row'
          }
          else{
            return 'normal-row'
          }
        },
        MRCellStyle(index) {
          //console.log(index)
          if (this.MRTable[index.rowIndex]['Project'] === 'Total') {
            if (index.columnIndex === 0) {
            return 'text-align: left; background:"#dce4f4" '
            }
            else{
              return 'text-align: right; background:"#dce4f4" '
            }
          }
          else if (this.MRTable[index.rowIndex]['is_bold'] === 1) {
            if (index.columnIndex === 0) {
            return 'text-align: left; '
            }
            else{
              return 'text-align: right; '
            }
          }
          else if (this.MRTable[index.rowIndex]['is_bold'] === 0) {
            if (index.columnIndex === 0) {
            return 'text-align: left; padding-left:15px;'
            }
            else{
              return 'text-align: right; '
            }
          }
        },
        //Store IT Capex Spending Tracking
        StoreITRowStyle(row) {
          if (this.StoreITTable[row.rowIndex]['Project'] === 'Total') {
            return 'last-row2'
          }
          else if (this.StoreITTable[row.rowIndex]['is_bold'] === 1) {
            return 'header-row'
          }
          else{
            return 'normal-row'
          }
        },
        StoreITCellStyle(index) {
          //console.log(index)
          if (this.StoreITTable[index.rowIndex]['Project'] === 'Total') {
            if (index.columnIndex === 0) {
            return 'text-align: left; background:"#dce4f4" '
            }
            else{
              return 'text-align: right; background:"#dce4f4" '
            }
          }
          else if (this.StoreITTable[index.rowIndex]['is_bold'] === 1) {
            if (index.columnIndex === 0) {
            return 'text-align: left; '
            }
            else{
              return 'text-align: right; '
            }
          }
          else if (this.StoreITTable[index.rowIndex]['is_bold'] === 0) {
            if (index.columnIndex === 0) {
            return 'text-align: left; padding-left:15px;'
            }
            else{
              return 'text-align: right; '
            }
          }
        },
        //Office IT Capex Spending Tracking
        OfficeITRowStyle(row) {
          if (this.OfficeITTable[row.rowIndex]['Project'] === 'Total') {
            return 'last-row'
          }
          else if (this.OfficeITTable[row.rowIndex]['is_bold'] === 1) {
            return 'header-row'
          }
          else{
            return 'normal-row'
          }
        },
        OfficeITCellStyle(index) {
          //console.log(index)
          if (this.OfficeITTable[index.rowIndex]['Project'] === 'Total') {
            if (index.columnIndex === 0) {
            return 'text-align: left; background:"#dce4f4" '
            }
            else{
              return 'text-align: right; background:"#dce4f4" '
            }
          }
          else if (this.OfficeITTable[index.rowIndex]['is_bold'] === 1) {
            if (index.columnIndex === 0) {
            return 'text-align: left; '
            }
            else{
              return 'text-align: right; '
            }
          }
          else if (this.OfficeITTable[index.rowIndex]['is_bold'] === 0) {
            if (index.columnIndex === 0) {
            return 'text-align: left; padding-left:15px;'
            }
            else{
              return 'text-align: right; '
            }
          }
        },
        stateFormat(row, column, cellValue) {
            if( cellValue === "" || cellValue === null || cellValue === undefined ){
                return "";
            }
            else{
                return (cellValue).toLocaleString();//新增千分位符
            }
        },
        statePercent(row, column, cellValue){
          return cellValue+'%';
        },
      },
    })
    console.log(app);
  </script>
  <style>
    .el-row {
      margin-bottom: 20px;
    }

    .el-col {
      border-radius: 4px;
    }

    div.borders {
      border-style: solid;
      border-color: black;
    }

    .el-table__body {
      border-collapse: collapse;

    }

    .table .header-row {
      font-weight: bold;
      font-size: larger;
      border-bottom: 2px solid black;
      vertical-align: middle;
      text-align: center;
    }
    
    .el-table td {
      padding: 2px 0;
    }
    
    #table1 td
    { 
        font-weight:bold;
        
    }
    
    #table2 td
    { 
        font-weight:bold;
    }
    
    .last-row {
      background-color: #dce4f4 !important;
      font-weight: bold;
      font-size: larger;
      border-bottom: 2px solid black;
    }
    
    .last-row2 {
      background-color: #dce4f4 !important;
      font-weight: bold;
      font-size: larger;
      border-bottom: 2px solid black;
    }

    /* .table .normal-row {
      background: white;
    } */
  </style>
  `;