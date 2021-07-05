/*
 * @Author: Huang Meng
 * @Date: 2021-06-30 11:22:52
 * @LastEditTime: 2021-07-05 11:24:37
 * @LastEditors: your name
 * @Description: 
 * @FilePath: \jscode\China_CapEx_Dashboard.js
 * 可以输入预定的版权声明、个性签名、空行等
 */





var cfs = new DevCustomFuncTools();
$(() => {
  //   let cube_name = 'Year';
  //   let script = 'Base(TotalYear,0)';
  //   debugger;
  //   res = cfs.request.foundation.getAccessDimensionMemberLevel(cube_name, script);
  //   debugger;
  // a = getResponse();
  // console.log(a);
  
  loadVue();
  $('.freshBS').on('click', function () {
    debugger;
    $('#app').empty();
    loadVue();
  });
});

async function getResponse() {
  let url = Api.seepln + 'dimension/getAccessDimensionMemberLevel';
  // 请求头参数
  let headerParams = {
    app: Userinfo.app,
    'app-id': Userinfo.app,
    token: Userinfo.token,
    'user-id': Userinfo.user_id,
    'u-id': Userinfo.u_id,
    creater: Userinfo.user_id,
    'tenant-code': Userinfo.tenant_code,
    tenantCode: Userinfo.tenant_code,
    language: Userinfo.language,
    description: Userinfo.language,
  };
  //请求体参数
  let bodyParams = {
    name: '#root',
    creater: Userinfo.user_id,
    tenantCode: Userinfo.tenant_code,
    token: Userinfo.token,
    app: Userinfo.app,
    language: Userinfo.language,
    dimensionName: 'Year',
    dimensionExpression: 'Year{Base(TotalYear,0)}',
  };
  //转换后的请求体
  let bodyParamsStr = jQuery.param(bodyParams);
  headerParams['Content-Type'] = 'application/x-www-form-urlencoded';
  await fetch(url + '?' + bodyParamsStr, {
    method: 'GET',
    headers: new Headers(headerParams),
  })
    .then((response) => (response = response.json()))
    .then((response) => handleResponse(response));
  return;
}

function loadVue() {
  var body = document.getElementsByTagName('body')[0];
  var jsNode = document.createElement('script');
  jsNode.setAttribute('type', 'text/javascript');
  jsNode.setAttribute(
    'src',
    'http://main.seepln.com/js/custom/cpm/0616/vue-2.6.14.js'
  );
  jsNode.onload = function () {
    console.log('Vue.js加载成功!');
    loadElementJs();
  };
  body.appendChild(jsNode);
}

function loadElementJs() {
  var body = document.getElementsByTagName('body')[0];
  var jsNode = document.createElement('script');
  jsNode.setAttribute('type', 'text/javascript');
  jsNode.setAttribute(
    'src',
    'http://main.seepln.com/js/custom/cpm/0616/element-ui@2.15.2.index.js'
  );
  jsNode.onload = function () {
    console.log('element.js加载成功!');
    loadtoPDF();
  };
  body.appendChild(jsNode);
}

function loadtoPDF() {
  var body = document.getElementsByTagName('body')[0];
  var jsNode = document.createElement('script');
  jsNode.setAttribute('type', 'text/javascript');
  jsNode.setAttribute(
    'src',
    'https://cdn.jsdelivr.net/npm/jspdf-with-html2canvas@1.3.5-2/dist/jspdf.min.js'
  );
  jsNode.onload = function () {
    console.log('jspdf和html2canvas加载成功!');
    loadElementCss();
  };
  body.appendChild(jsNode);
}

function loadElementCss() {
  var link = document.createElement('link');
  link.rel = 'stylesheet';
  link.type = 'text/css';
  link.href =
    'http://main.seepln.com/js/custom/cpm/0616/element-ui@2.15.2.index.css';
  link.onload = function () {
    console.log('element.css加载成功！');
    loadEcharts();
  };
  document.getElementsByTagName('head')[0].appendChild(link);
}

function loadEcharts() {
  var body = document.getElementsByTagName('body')[0];
  var jsNode = document.createElement('script');
  jsNode.setAttribute('type', 'text/javascript');
  jsNode.setAttribute(
    'src',
    'http://main.seepln.com/js/custom/cpm/0616/echarts.min.js'
  );
  jsNode.onload = function () {
    console.log('Echarts.js加载成功!');
    main();
  };
  body.appendChild(jsNode);
}

function main() {
  let dom = `
  <div id="app" style="font-family:Microsoft YaHei">
    <div class="page">
        <el-button @click.native="refresh">刷新</el-button>
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
                    <el-table id='table1' :data="storeCapex" :show-header="false" :cell-style="alignCellStyle">
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
              <el-row :gutter="24">
                <el-col :span="2"></el-col>
                <el-col :span="24">
                  <span style="font-weight: bold;font-family:Microsoft YaHei">Office IT CapEx</span></br></br>
                  <div class="borders">
                    <!-- Office IT Capex表格 -->
                    <el-table id='table2' :data="officeITCapex" :show-header="false" :cell-style="alignCellStyle">
                      <el-table-column prop="c1" width="150">
                      </el-table-column>
                      <el-table-column prop="c2" :formatter="stateFormat">
                      </el-table-column>
                      <el-table-column prop="c3">
                      </el-table-column>
                      <el-table-column prop="c4" :formatter="stateFormat">
                      </el-table-column>
                      <el-table-column prop="c5" width="150">
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
                <el-col :span="8">
                  <div id="DevChart" style="height: 325px;width: 100%;"></div>
                </el-col>
                <el-col :span="16">
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
                <el-col :span="8">
                  <!-- echarts-->
                  <div id="OpsChart" style="height: 325px;width: 100%;"></div>
                  <!-- /echarts -->
                </el-col>
                <el-col :span="16">
                  <template>
                    <!-- table -->
                    <el-table id='OpsTable' :data="OpsTable"
                      :header-cell-style="{background:'#ffc000', color:'black', 'text-align':'center'}"
                      :cell-style="OpsCellStyle" :row-class-name="OpsRowStyle" class="table" style="font-size: 8px">
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
    </div>
    <div class="page">
        <!----------------------------------------    4. BE CapEx Spending Tracking    --------------------------------------------->
        <el-row :gutter="20">
          <el-col :span="24">
            <!-- card4 -->
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span style="font-weight: bold;"><em>4. BE CapEx Spending Tracking</em></span>
              </div>
              <el-row>
                <el-col :span="8">
                  <div id="BEChart" style="height: 500px;width: 100%;"></div>
                </el-col>
                <el-col :span="16">
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
                <el-col :span="8">
                  <div id="MRChart" style="height: 500px;width: 100%;"></div>
                </el-col>
                <el-col :span="16">
                  <template>
                    <el-table id='MRTable' :data="MRTable"
                      :header-cell-style="{background:'#ffc000', color:'black', 'text-align':'center'}"
                      :cell-style="MRCellStyle" :row-class-name="MRRowStyle" class="table" style="font-size: 8px">
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
                <el-col :span="8">
                  <div id="StoreITChart" style="height: 500px;width: 100%;"></div>
                </el-col>
                <el-col :span="16">
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
                <el-col :span="8">
                  <div id="OfficeITChart" style="height: 500px;width: 100%;"></div>
                </el-col>
                <el-col :span="16">
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
  </div>
  <script>
    var app = new Vue({
      el: '#app',
      data: {
        //Store Capex
        storeCapex: [
          { c1: '已完成', c2: 0, c3: '在途', c4: 0, c5: '已报价', c6: 0, c7: '未使用', c8: 0, c9: 'Total', c10: 0 },
          { c2: '', c4: '', c6: ''}
        ],
        //Office IT Capex
        officeITCapex: [
          { c1: 'Actual Payment', c2: 0, c3: 'PD Not Paid', c4: 0, c5: 'Purchase Plan', c6: 0, c7: 'Total', c8: 0 },
          { c2: '', c4: '', c6: '' }
        ],
        //dev CapEx Spending Tracking
        Dev: undefined,
        DevTable: [],
        DevChart:
        {
          textStyle: {
            fontFamily: 'Microsoft YaHei',
          },
          color :['#174fdb','#f4bf43','#8f94a1'],
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
            x: '35%',
            y: 'bottom',
            itemHeight: 8, //修改icon图形大小
            textStyle: {
              fontSize: 10,
            },
          },
          grid: {
            left: '0%',
            right: '15%',
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
            data: [],
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
              data: [],
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
              data: [],
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
              data: [],
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
          textStyle: {
            fontFamily: 'Microsoft YaHei',
          },
        color :['#174fdb','#f4bf43','#8f94a1'],
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
            x: '35%',
            y: 'bottom',
            itemHeight: 8, //修改icon图形大小
            textStyle: {
              fontSize: 10,
            },
          },
          grid: {
            left: '0%',
            right: '15%',
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
            data: [],
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
              data: [],
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
              data: [],
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
              data: [],
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
          textStyle: {
            fontFamily: 'Microsoft YaHei',
          },
            color :['#174fdb','#f4bf43','#8f94a1'],
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
            x: '35%',
            y: 'bottom',
            itemHeight: 8, //修改icon图形大小
            textStyle: {
              fontSize: 10,
            },
          },
          grid: {
            left: '0%',
            right: '15%',
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
            data: [],
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
              data: [],
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
              data: [],
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
              data: [],
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
          textStyle: {
            fontFamily: 'Microsoft YaHei',
          },
            color:['#174fdb','#f4bf43','#8f94a1'],
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
            x: '35%',
            y: 'bottom',
            itemHeight: 8, //修改icon图形大小
            textStyle: {
              fontSize: 10,
            },
          },
          grid: {
            left: '0%',
            right: '15%',
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
            data: [],
          },
          series: [
            {
              stack: "0",
              name: '已完成',
              type: 'bar',
              data: [],
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
              data: [],
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
              data: [],
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
          textStyle: {
            fontFamily: 'Microsoft YaHei',
          },
           color :['#174fdb','#f4bf43','#8f94a1'],
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
            x: '35%',
            y: 'bottom',
            itemHeight: 8, //修改icon图形大小
            textStyle: {
              fontSize: 10,
            },
          },
          grid: {
            left: '0%',
            right: '15%',
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
            data: [],
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
              data: [],
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
              data: [],
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
          textStyle: {
            fontFamily: 'Microsoft YaHei',
          },
        color:['#174fdb','#f4bf43'],
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
            x: '35%',
            y: 'bottom',
            itemHeight: 8, //修改icon图形大小
            textStyle: {
              fontSize: 10,
            },
          },
          grid: {
            left: '0%',
            right: '15%',
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
        //debugger;
        //let res = JSON.parse(cfs.request.python.pythonWeb(pyName, {'Year':getSearchParam}).res);
        let res = cfs.request.python.pythonWeb(pyName, {'Year':getSearchParam});
        debugger;
        var resObj = {};
        if (res.err){
          ForSwal("读取数据失败：" + res.err.Message); //通过右上角的红色卡片报错
        }else{
          try{
            resObj = JSON.parse(res.res);
          }
          catch(e){
            ForSwal("Python结果转换JSON失败：" + e.Message); //通过右上角的红色卡片报错
            return;
          }
          console.log(resObj);
        }
        //debugger;


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
          //debugger;
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
        refresh(){
            pyName = 'China_CapEx_Dashboard';
            getSearchParam = showDashBoard.globalCurrentPovObj['Year'];
            //debugger;
            //let res = JSON.parse(cfs.request.python.pythonWeb(pyName, {'Year':getSearchParam}).res);
            res = cfs.request.python.pythonWeb(pyName, {'Year':getSearchParam});
            debugger;
            resObj = {};
            if (res.err){
              ForSwal("读取数据失败：" + res.err.Message); //通过右上角的红色卡片报错
            }else{
              try{
                resObj = JSON.parse(res.res);
              }
              catch(e){
                ForSwal("Python结果转换JSON失败：" + e.Message); //通过右上角的红色卡片报错
                return;
              }
              console.log(resObj);
            }
            //debugger;
    
    
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
              //debugger;
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
            debugger;  
        },
        drawBarChart(id, option) {
          // let that = this;
          // 1. 基于准备好的dom，初始化echarts实例
          let myChart = echarts.init(document.getElementById(id));
          myChart.innerHTML = "";
          // 3. 使用刚指定的配置项和数据显示图表
          myChart.setOption(option);
        },
        alignCellStyle(index) {
          //console.log(index)
          if (index.columnIndex === 1 || index.columnIndex === 3 || index.columnIndex === 5 || index.columnIndex === 7 || index.columnIndex === 9) {
          return 'text-align: center; '
          }        
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
    .page {
        width: 1175px;
        height: 1900px;
        padding: 0cm;
        margin: 0cm auto;
        background: white;
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
    }
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
    }
    
    .last-row2 {
      background-color: #dce4f4 !important;
      font-weight: bold;
      font-size: larger;
    }

    /* .table .normal-row {
      background: white;
    } */
  </style>
  `;
  $('#showDashBoard').append(dom);

  let btnDom = `
  <button type="button" id="btn" class="btn btn-light" data-toggle="modal" data-target="#modal_full">预览PDF<i class="icon-play3 ml-2"></i></button>
  `;

  modalDom = `
  <!-- Full width modal -->
  <div id="modal_full" class="modal fade" tabindex="-1">
    <div class="modal-dialog modal-full">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title"></h5>
          <button type="button" class="close" data-dismiss="modal">&times;</button>
        </div>

        <div class="modal-body" style="margin-left:-20px;">
        </div>

        <div class="modal-footer">
          <button type="button" class="btn btn-link" data-dismiss="modal">关闭</button>
          <button type="button" id="exportPDF" class="btn bg-primary">生成PDF</button>
        </div>
      </div>
    </div>
  </div>
  <!-- /full width modal -->
  `;
  if ($('#btn').length === 0) {
    $('.header-elements').append(btnDom);
  }
  $('#showDashBoard').append(modalDom);
  $('#btn').on('click', function () {
    document.getElementById('app').scrollTop = 0;
    let canvas = $('canvas')[0];
    // 输入body节点，返回包含body视图内容的canvas对象
    const options = {
      // 画布配置项
      width: 1385,
      dpi: 5000,
      useCORS: true, // 【重要】开启跨域配置
    };
    html2canvas(document.getElementById('app'), options).then(function (
      canvas
    ) {
      if ($('.modal-body').find('canvas').length === 0) {
        $('#modal_full').find('.modal-body')[0].appendChild(canvas);
      }
    });
  });

  $('#exportPDF').on('click', function () {
    document.getElementById('app').scrollTop = 0;
    // downloadPDF();
    downloadPdf1();
    // download2();
  });
}

function downloadPDF() {
  var target = document.getElementById('app');
  target.style.background = '#FFFFFF';
  let canvas = $('canvas')[0];
  html2canvas(target, {
    // 画布配置项
    width: 1385,
    dpi: 1000,
    canvas: canvas,
    useCORS: true, // 【重要】开启跨域配置
    onrendered: function (canvas) {
      var contentWidth = canvas.width;
      var contentHeight = canvas.height;
      //一页pdf显示html页面生成的canvas高度;
      var pageHeight = (contentWidth / 592.28) * 841.89;
      //未生成pdf的html页面高度
      var leftHeight = contentHeight;
      //页面偏移
      var position = 0;
      //a4纸的尺寸[595.28,841.89]，html页面生成的canvas在pdf中图片的宽高
      var imgWidth = 595.28;
      var imgHeight = (592.28 / contentWidth) * contentHeight;

      var pageData = canvas.toDataURL();

      var pdf = new jsPDF('', 'pt', [592.28, 841.89]);

      // let pdf = new jsPDF({
      //   orientation: 'p',
      //   unit: 'pt',
      //   format: 'a4',
      //   precision: '12',
      //   putOnlyUsedFonts: false,
      //   floatPrecision: 'smart', // default is 16
      // });

      //有两个高度需要区分，一个是html页面的实际高度，和生成pdf的页面高度(841.89)
      //当内容未超过pdf一页显示的范围，无需分页
      if (leftHeight < pageHeight) {
        pdf.addImage(
          pageData,
          'JPEG',
          5,
          0,
          contentWidth,
          contentHeight,
          '',
          'FAST'
        );

        // pdf.addImage(pageData, 'JPEG', 20, 0, contentWidth, contentHeight);
      } else {
        while (leftHeight > 0) {
          pdf.addImage(
            pageData,
            'JPEG',
            5,
            position,
            imgWidth,
            imgHeight,
            '',
            'FAST'
          );
          //   pdf.addImage(pageData, 'JPEG', 20, position, imgWidth, imgHeight);
          leftHeight -= pageHeight;
          position -= 920;
          //避免添加空白页
          if (leftHeight > 0) {
            pdf.addPage();
          }
        }
      }
      pdf.save('China_CapEx_Dashboard.pdf');
    },
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

function downloadPdf1() {
  document.getElementById('app').scrollTop = 0;
  var element = $('#app'); // global variable
  var w = element.width(); // 获得该容器的宽
  var h = element.height(); // 获得该容器的高
  var offsetTop = element.offset().top; // 获得该容器到文档顶部的距离
  var offsetLeft = element.offset().left; // 获得该容器到文档最左的距离
  var canvas = document.createElement('canvas');
  var abs = 0;
  var win_i = $(window).width(); // 获得当前可视窗口的宽度（不包含滚动条）
  var win_o = window.innerWidth; // 获得当前窗口的宽度（包含滚动条）
  if (win_o > win_i) {
    abs = (win_o - win_i) / 2; // 获得滚动条长度的一半
  }
//   canvas.width = w * 4; // 将画布宽&&高放大两倍
//   canvas.height = h * 8;
  canvas.width = w * 2 ;
  canvas.height = h * 8 ;
  var context = canvas.getContext('2d');
  context.scale(2, 2);
  context.translate(-offsetLeft - abs, -offsetTop);
  debugger;
  var wh;
  if (detectZoom() == 120) {
    //150分辨率 80%缩放
    wh = [800, 1100];
  } else if (detectZoom() == 113) {
    //125分辨率，90%缩放
    wh = [900, 1100];
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
        dpi: 600,
        canvas: canvas,
        useCORS: true, // 【重要】开启跨域配置
        onrendered: function (canvas) {
          // getCanvas = canvas.toDataURL();
          // // downloadFile('测试.png', getCanvas);
          // var pdf = new jsPDF('p', 'mm', [800, 2000]);
          // pdf.addImage(getCanvas, 'JPEG', 5, 0, '', '', '', 'FAST');
          // pdf.save('China_CapEx_Dashboard.pdf');

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
          var imgWidth = 595.28;
          var imgHeight = (592.28 / contentWidth) * contentHeight;
          var pageData = canvas.toDataURL();
          var pdf = new jsPDF('', 'pt', [592.28, 841.89]);
          
          //有两个高度需要区分，一个是html页面的实际高度，和生成pdf的页面高度(841.89)
          //当内容未超过pdf一页显示的范围，无需分页
          if (leftHeight < pageHeight) {
            pdf.addImage(
              pageData,
              'JPEG',
              5,
              0,
              contentWidth,
              contentHeight,
              '',
              'FAST'
            );

            // pdf.addImage(pageData, 'JPEG', 20, 0, contentWidth, contentHeight);
          } else {
            while (leftHeight > 0) {
              pdf.addImage(
                pageData,
                'JPEG',
                5,
                position,
                imgWidth,
                imgHeight,
                '',
                'FAST'
              );
              debugger;
              //   pdf.addImage(pageData, 'JPEG', 20, position, imgWidth, imgHeight);
              leftHeight = leftHeight - 4 * pageHeight;
              position -= 920;
              //避免添加空白页
              if (leftHeight > 0) {
                pdf.addPage();
              }
            }
          }
          pdf.save('China_CapEx_Dashboard.pdf');
        },
      },
      500
    );
  });
}
