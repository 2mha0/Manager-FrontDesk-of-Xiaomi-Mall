<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-pie-chart"></i> 用户数据统计图表
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="schart-box">
                <div class="content-title">柱状图</div>
                <schart class="schart" canvasId="bar" :options="options1"></schart>
            </div>
          <div class="schart-box">
            <div class="content-title">柱状图</div>
            <schart class="schart" canvasId="bar1" :options="options12"></schart>
          </div>
            <div class="schart-box">
                <div class="content-title">折线图</div>
                <schart class="schart1" canvasId="line" :options="options2"></schart>
            </div>
            <div class="schart-box">
                <div class="content-title">饼状图</div>
                <schart class="schart" canvasId="pie" :options="options3"></schart>
            </div>
          <div>
            <div class="content-title">中国地图</div>
            <div id="map" :style="{ height: '600px', width: '1000px' }"/>
          </div>
          <div>
            <div class="content-title">词频图</div>
            <div id="chart" class="schart" style="width: 1200px; height: 600px"></div>
          </div>
        </div>
    </div>
</template>

<script>
import Schart from 'vue-schart';
import * as echarts from 'echarts';
import 'echarts/map/js/china.js';
import axios from 'axios';
import Chart from "echarts/src/view/Chart";
import "echarts-wordcloud";
export default {
    name: 'basecharts',
    components: {
        Schart
    },
    data() {
        return {

          wordList: [],

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
          options12: {
            type: 'bar',
            title: {
              text: '客户下单转化率统计图(%)'
            },
            bgColor: '#fbfbfb',
            labels: ['客户一', '客户二', '客户三', '客户四', '客户五','客户六','客户七','客户八','客户九','客户十'],
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
                        label: '手机电话卡',
                        data: [0]
                    },
                    {
                        label: '电视机盒子',
                        data: [0]
                    },
                    {
                        label: '笔记本显示器',
                        data: [0]
                    },
                  {
                    label: '家电插线板',
                    data: [0]
                  },
                  {
                    label: '出行穿戴',
                    data: [0]
                  },
                  {
                    label: '电源配件',
                    data: [0]
                  },
                  {
                    label: '耳机音箱',
                    data: [0]
                  },
                  {
                    label: '生活箱包',
                    data: [0]
                  },
                  {
                    label: '智能路由器',
                    data: [0]
                  }
                ]
            },
            options3: {
                type: 'pie',
                title: {
                    text: '系统页面访问量占比图'
                },
                legend: {
                    position: 'left'
                },
                bgColor: '#fbfbfb',
                labels: ['系统首页', '商品页面', '购物车页面', '订单页面', '登录页面'],
                datasets: [
                    {
                        data: []
                    }
                ]
            }
        };
    },
mounted() {
  this.init();
  this.initchart();
},
  created() {
    this.fetchChartData(); // 组件创建时初始化获取数据
    setInterval(() => {
      this.fetchChartData(); // 每3秒钟更新一次数据
    }, 2000);
    //词频图刷新
    this.fetchChartData3(); // 组件创建时初始化获取数据
    setInterval(() => {
      this.fetchChartData3(); // 每3秒钟更新一次数据
    }, 3650);
  },


methods: {
  initchart() {
    let myChart = echarts.init(document.querySelector("#chart"));
    myChart.setOption({
      series: [
        {
          type: "wordCloud",
          //shape: "ellipse",
          gridSize: 20,
          sizeRange: [14, 60],
          rotationRange: [0, 0],
          textStyle: {
            normal: {
              color: function () {
                return (
                    "rgb(" +
                    Math.round(Math.random() * 255) +
                    ", " +
                    Math.round(Math.random() * 255) +
                    ", " +
                    Math.round(Math.random() * 255) +
                    ")"
                );
              },
            },
          },
          left: "center",
          top: "center",
          right: null,
          bottom: null,
          width: "200%",
          height: "200%",
          data: this.wordList,
        },
      ],
    });
  },

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
          color: "rgb(135,221,225)"
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
  },

  fetchChartData3(){
    //词频图
    axios.get('http://localhost:8081/diagram/getWordFrequency')
        .then(response => {
          this.wordList = Object.entries(response.data).map(([name, value]) => ({
            name,
            value: Math.round(Math.random() * 100),
          }));
          this.initchart();
        })
        .catch(error => {
          console.error(error);
        });
  },


  fetchChartData() {

    //各页面访问量更新
    axios.get('http://localhost:8081/diagram/pageVisits')
        .then(response => {
          const data = response.data;
          const counts = data.map(item => item.count); // 提取所有页面的访问次数作为数据数组
          this.$set(this.options1.datasets[0], 'data', counts); // 使用 this.$set 更新 options1 的数据字段（第一个柱状图）
          this.$set(this.options3.datasets[0], 'data', counts); // 使用 this.$set 更新 options3 的数据字段（饼状图）
          this.updateChart();
        }).catch(error => {
      // 处理请求错误
      console.error(error);
    });

  //中国地图数据更新
    axios.get('http://localhost:8081/diagram/getChinaMap')
        .then(response => {
          const data = response.data;
          const formattedData = data.map(item => ({
            name: item.place,
            value: item.pageView
          }));
          this.updateChart1(formattedData);
        })
        .catch(error => {
          // 处理请求错误
          console.error(error);
        });

//转化率图
    axios.get('http://localhost:8081/diagram/conversion')
        .then(response => {
          const data = response.data;
          if (Array.isArray(data) && data.length > 0) {
            const conversionData = [];
            for (const item of data) {
              conversionData.push(parseFloat(item.conversion));
            }
            this.options12.datasets[0].data = conversionData;
          } else {
            // 处理数据为空的情况
            this.options12.datasets[0].data = [];
          }
        })
        .catch(error => {
          console.error(error);
        });

    //折线图
    axios.get('http://localhost:8081/diagram/lineChart')
        .then(response => {
          const data = response.data;
          // 更新折线图数据
          this.updateChartData(data);
        })
        .catch(error => {
          console.error('Error fetching chart data:', error);
        });
  },

  updateChartData(data) {
    for (const categoryId in data) {
      const categoryData = data[categoryId].goodIdAndCount;
      const datasetIndex = parseInt(categoryId) - 1;
      const dataset = this.options2.datasets[datasetIndex];
      dataset.data = [];
      for (const goodId in categoryData) {
        const count = categoryData[goodId];
        dataset.data.push(count);
      }
    }
  },

  /*updateChartData3() {
    const dataset = this.options12.datasets[0];
    dataset.data = Object.values(this.chartData); // 使用Object.values获取chartData中的数据值
  },*/

  updateChart() {
    // 使用 chart.js 更新图表数据
    const ctx = document.getElementById('chart1').getContext('2d');
    new Chart(ctx, this.options1);
    new Chart(ctx, this.options12);
    new Chart(ctx, this.options3);
  },
  updateChart1(data) {
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
  }
}
};

</script>

<style scoped>
.schart-box {
    display: inline-block;
    margin: 20px;
}
.schart {
    width: 800px;
    height: 400px;
}

.schart1 {
    width: 1100px;
    height: 400px;
}

.content-title {
    clear: both;
    font-weight: 400;
    line-height: 50px;
    margin: 10px 0;
    font-size: 22px;
    color: #1f2f3d;
}
</style>
