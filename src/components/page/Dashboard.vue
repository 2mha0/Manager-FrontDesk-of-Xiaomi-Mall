<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="8">
                <el-card shadow="hover" class="mgb20" style="height:300px;">
                    <div class="user-info">
                        <img src="../../assets/img/img2.png" class="user-avator" alt />
                        <div class="user-info-cont">
                            <div class="user-info-name">{{name}}</div>
                            <div>{{role}}</div>
                        </div>
                    </div>
                    <div class="user-info-list">
                        登录IP：
                        <span>{{ip}}</span>
                    </div>
                    <div class="user-info-list">
                        登录地点：
                        <span>{{area}}</span>
                    </div>
                    <div class="user-info-list">
                        登录浏览器：
                    <span>{{brower}}</span>
                    </div>
                    <div class="user-info-list">
                        登录操作系统：
                    <span>{{os}}</span>
                  </div>

                </el-card>
                <el-card shadow="hover" style="height:252px;">
                    <div slot="header" class="clearfix">
                        <span>语言详情</span>
                    </div>Vue
                    <el-progress :percentage="71.3" color="#42b983"></el-progress>JavaScript
                    <el-progress :percentage="24.1" color="#f1e05a"></el-progress>CSS
                    <el-progress :percentage="13.7"></el-progress>HTML
                    <el-progress :percentage="5.9" color="#f56c6c"></el-progress>
                </el-card>
            </el-col>
            <el-col :span="16">
                <el-row :gutter="20" class="mgb20">
                    <el-col :span="8">
                        <el-card shadow="hover" :body-style="{padding: '0px'}">
                            <div class="grid-content grid-con-1">
                                <i class="el-icon-lx-people grid-con-icon"></i>
                                <div class="grid-cont-right">
                                  <div class="grid-num">{{ chartData }}</div>
                                    <div>用户访问量</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="8">
                        <el-card shadow="hover" :body-style="{padding: '0px'}">
                            <div class="grid-content grid-con-2">
                                <i class="el-icon-lx-notice grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num">34</div>
                                    <div>系统消息</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="8">
                        <el-card shadow="hover" :body-style="{padding: '0px'}">
                            <div class="grid-content grid-con-3">
                                <i class="el-icon-lx-goods grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num">358</div>
                                    <div>数量</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                </el-row>
                <el-card shadow="hover" style="height:403px;">
                    <div slot="header" class="clearfix">
                        <span>待办事项</span>
                        <el-button style="float: right; padding: 3px 0" type="text">添加</el-button>
                    </div>
                    <el-table :show-header="false" :data="todoList" style="width:100%;">
                        <el-table-column width="40">
                            <template slot-scope="scope">
                                <el-checkbox v-model="scope.row.status"></el-checkbox>
                            </template>
                        </el-table-column>
                        <el-table-column>
                            <template slot-scope="scope">
                                <div
                                    class="todo-item"
                                    :class="{'todo-item-del': scope.row.status}"
                                >{{scope.row.title}}</div>
                            </template>
                        </el-table-column>
                        <el-table-column width="60">
                            <template>
                                <i class="el-icon-edit"></i>
                                <i class="el-icon-delete"></i>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-card>
            </el-col>
        </el-row>
        <el-row :gutter="20">
          <div >
            <div id="map" :style="{ height: '600px', width: '1000px' }"/>
          </div>
            <el-col :span="12">
                <el-card shadow="hover">
                  <schart class="schart" canvasId="bar" :options="options1"></schart>
                </el-card>
            </el-col>
            <el-col :span="12">
                <el-card shadow="hover">
                  <schart class="schart" canvasId="line1" :options="options2"></schart>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import Schart from 'vue-schart';
import bus from '../common/bus';
import * as sysTool from '../../assets/js/systemTool';
import * as echarts from 'echarts';
import 'echarts/map/js/china.js';
import axios from "axios";


export default {
    name: 'dashboard',
    data() {
        return {
          chartData: 0,
          name: localStorage.getItem('ms_username'),
            ip:'',
            area: '',
            os:'',
            brower: '',
            todoList: [
                {
                    title: '今天要修复100个bug',
                    status: false
                },
                {
                    title: '今天要修复100个bug',
                    status: false
                },
                {
                    title: '今天要写100行代码加几个bug吧',
                    status: false
                },
                {
                    title: '今天要修复100个bug',
                    status: false
                },
                {
                    title: '今天要修复100个bug',
                    status: true
                },
                {
                    title: '今天要写100行代码加几个bug吧',
                    status: true
                }
            ],
            data: [
                {
                    name: '2018/09/04',
                    value: 1083
                },
                {
                    name: '2018/09/05',
                    value: 941
                },
                {
                    name: '2018/09/06',
                    value: 1139
                },
                {
                    name: '2018/09/07',
                    value: 816
                },
                {
                    name: '2018/09/08',
                    value: 327
                },
                {
                    name: '2018/09/09',
                    value: 228
                },
                {
                    name: '2018/09/10',
                    value: 1065
                }
            ],
          options1: {
            type: 'bar',
            title: {
              text: '系统页面访问量统计图'
            },
            bgColor: '#fbfbfb',
            labels: ['系统首页', '商品页面', '购物车页面', '订单页面', '登录页面'],
            datasets: [
              {
                fillColor: 'rgba(241, 49, 74, 0.5)',
                data: []
              }
            ]
          },
          options2: {
            type: 'line',
            title: {
              text: '各种类商品访问量统计图'
            },
            bgColor: '#fbfbfb',
            labels: ['一号商品', '二号商品', '三号商品', '四号商品', '五号商品', '六号商品', '七号商品','八号商品'],
            datasets: [
              {
                label: '电视机盒子',
                data: [3,5,7,9,12,14,16,14]
              },

              {
                label: '家电插线板',
                data: [5,7,9,3,8,13,9,10]
              },
              {
                label: '出行穿戴',
                data: [4,6,2,9,7,12,9,6]
              },
              {
                label: '电源配件',
                data: [12,5,7,13,12,10,9,6]
              },
              {
                label: '耳机音箱',
                data: [13,9,10,12,7,9,10,7]
              },
            ]
          }
        };
    },
    components: {
        Schart
    },
    computed: {
        role() {
            return this.name === 'admin' ? '超级管理员' : '普通用户';
        }
    },
  created() {
    this.ip = sessionStorage.getItem('ip')
    this.area = sessionStorage.getItem('area')
    this.brower = sysTool.GetCurrentBrowser()
    this.os = sysTool.GetOs()
    console.log('ip，地区，浏览器，操作系统，：',  this.ip, this.area,this.brower, this.os)
    this.fetchChartData1(); // 组件创建时初始化获取数据
    setInterval(() => {
      this.fetchChartData1(); // 每3秒钟更新一次数据
    }, 3000);
  },
  mounted() {
    this.init();
  },
  // created() {
    //     this.handleListener();
    //     this.changeDate();
    // },
    // activated() {
    //     this.handleListener();
    // },
    // deactivated() {
    //     window.removeEventListener('resize', this.renderChart);
    //     bus.$off('collapse', this.handleBus);
    // },
    methods: {
        /*changeDate() {
            const now = new Date().getTime();
            this.data.forEach((item, index) => {
                const date = new Date(now - (6 - index) * 86400000);
                item.name = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
            });
        },*/
      fetchChartData1() {
        //各页面访问量更新
        axios.get('http://localhost:8081/diagram/pageVisitorCount')
            .then(response => {
              const data = response.data;
              this.chartData = data; // 将获取到的数据保存到组件的数据属性中
            }).catch(error => {
          // 处理请求错误
          console.error(error);
        });

        axios.get('http://localhost:8081/diagram/getChinaMap')
            .then(response => {
              const data = response.data;
              const formattedData = data.map(item => ({
                name: item.place,
                value: item.pageView
              }));
              this.updateChart2(formattedData);
            })
            .catch(error => {
              // 处理请求错误
              console.error(error);
            });




        //各页面访问量更新
        axios.get('http://localhost:8081/diagram/pageVisits')
            .then(response => {
              const data = response.data;
              const counts = data.map(item => item.count); // 提取所有页面的访问次数作为数据数组
              this.$set(this.options1.datasets[0], 'data', counts); // 使用 this.$set 更新 options1 的数据字段（第一个柱状图）
              /*this.$set(this.options3.datasets[0], 'data', counts); // 使用 this.$set 更新 options3 的数据字段（饼状图）*/
              this.updateChart();
            }).catch(error => {
          // 处理请求错误
          console.error(error);
        });
        },




      updateChart2(data) {
        this.chinaMap.setOption({
          series: [
            {
              type: 'map',
              mapType: 'china',
              roam: false,
              geoIndex: 0,
              label: {
                normal: {
                  show: true
                },
                emphasis: {
                  show: true
                }
              },
              data: data
            }
          ]
        });
      },
     /* updatePageVisits(visits) {
        const gridNumElement = document.querySelector('.grid-num');
        gridNumElement.textContent = visits;
      },*/
        // handleListener() {
        //     bus.$on('collapse', this.handleBus);
        //     // 调用renderChart方法对图表进行重新渲染
        //     window.addEventListener('resize', this.renderChart);
        // },
        // handleBus(msg) {
        //     setTimeout(() => {
        //         this.renderChart();
        //     }, 200);
        // },
        // renderChart() {
        //     this.$refs.bar.renderChart();
        //     this.$refs.line.renderChart();
        // }
      init() {
        // 基于准备好的dom，初始化echarts实例
        let chinaMap = echarts.init(document.getElementById("map"));
        window.onresize = chinaMap.resize; // 窗口或框架被调整大小时执行chinaMap.resize
        this.chinaMap = chinaMap; // 保存echarts实例到组件的data属性中
        chinaMap.setOption({
          tooltip: {
            trigger: 'item',
            formatter: function (e) {
              return e.value === "NaN" ? e.name + "：" + '0' : e.name + "：" + e.value + " <br/>" + "66c";
            }
          },
          legend: {
            orient: 'vertical',
            left: 'left'
          },
          visualMap: {
            min: 0,
            max: 10000,
            left: 10,
            bottom: 10,
            showLabel: !0,
            text: ["高", "低"],
            textStyle: {
              color: '#000'
            },
            pieces: [{
              gt: 90,
              label: "> 90",
              color: "rgb(243,163,133)"
            }, {
              gte: 75,
              lte: 89,
              label: "75 - 89",
              color: "rgb(250,220,113)"
            }, {
              gte: 50,
              lt: 74,
              label: "50 - 74",
              color: "rgb(174,228,188)"
            }, {
              gt: 25,
              lt: 49,
              label: "25 - 49",
              color: "rgb(174,228,188)"
            },
              {
                gt: 1,
                lt: 24,
                label: "1 - 24",
                color: "rgb(99,194,229)"
              },
              {
                value: 0,
                color: "rgb(87,160,213)"
              }],
            show: !0
          },
          toolbox: {
            show: true,
            orient: 'vertical',
            left: 'right',
            top: 'center',
            feature: {
              dataView: {readOnly: false},
              restore: {},
              saveAsImage: {}
            }
          },
          geo: {
            map: "china",
            roam: !1,
            scaleLimit: {
              min: 1,
              max: 2
            },
            zoom: 1.23,
            // top: 120,
            label: {
              normal: {
                show: !0,
                fontSize: "14",
                color: "rgba(0,0,0,0.7)"
              }
            },
            itemStyle: {
              normal: {
                //shadowBlur: 50,
                //shadowColor: 'rgba(0, 0, 0, 0.2)',
                borderColor: "rgba(0, 0, 0, 0.2)"
              },
              emphasis: {
                areaColor: "#f2d5ad",
                shadowOffsetX: 0,
                shadowOffsetY: 0,
                borderWidth: 0
              }
            }
          },
          series: [
            {
              type: 'map',
              mapType: 'china',
              roam: false,
              geoIndex: 0,
              label: {
                normal: {
                  show: true
                },
                emphasis: {
                  show: true
                }
              },
              /* data: [
                 {name: '上海', value: 1},
                 {name: '广东', value: 100},
                 {name: '山东', value: 5}
               ]*/
            }
          ]
        });
      }
    }
};




</script>



<style scoped>
.el-row {
    margin-bottom: 20px;
}

.grid-content {
    display: flex;
    align-items: center;
    height: 100px;
}

.grid-cont-right {
    flex: 1;
    text-align: center;
    font-size: 14px;
    color: #999;
}

.grid-num {
    font-size: 30px;
    font-weight: bold;
}

.grid-con-icon {
    font-size: 50px;
    width: 100px;
    height: 100px;
    text-align: center;
    line-height: 100px;
    color: #fff;
}

.grid-con-1 .grid-con-icon {
    background: rgb(45, 140, 240);
}

.grid-con-1 .grid-num {
    color: rgb(45, 140, 240);
}

.grid-con-2 .grid-con-icon {
    background: rgb(100, 213, 114);
}

.grid-con-2 .grid-num {
    color: rgb(45, 140, 240);
}

.grid-con-3 .grid-con-icon {
    background: rgb(242, 94, 67);
}

.grid-con-3 .grid-num {
    color: rgb(242, 94, 67);
}

.user-info {
    display: flex;
    align-items: center;
    padding-bottom: 20px;
    border-bottom: 2px solid #ccc;
    margin-bottom: 20px;
}

.user-avator {
    width: 120px;
    height: 120px;
    border-radius: 50%;
}

.user-info-cont {
    padding-left: 50px;
    flex: 1;
    font-size: 14px;
    color: #999;
}

.user-info-cont div:first-child {
    font-size: 30px;
    color: #222;
}

.user-info-list {
    font-size: 14px;
    color: #999;
    line-height: 25px;
}

.user-info-list span {
    margin-left: 70px;
}

.mgb20 {
    margin-bottom: 20px;
}

.todo-item {
    font-size: 14px;
}

.todo-item-del {
    text-decoration: line-through;
    color: #999;
}

.schart {
    width: 100%;
    height: 300px;
}
</style>





