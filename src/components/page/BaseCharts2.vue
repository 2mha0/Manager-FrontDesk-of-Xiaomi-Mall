<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-pie-chart"></i> schart图表
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="schart-box">
        <div class="content-title">折线图</div>
        <schart class="schart" canvasId="line" :options="options2"></schart>
      </div>
    </div>
  </div>
</template>

<script>
import Schart from 'vue-schart';
export default {
  name: 'basecharts',
  components: {
    Schart
  },
  data() {
    return {
      options2: {
        type: 'line',
        title: {
          text: '用户行为分析数据统计图'
        },
        bgColor: '#fbfbfb',
        labels: ['一号商品', '二号商品', '三号商品', '四号商品', '五号商品', '六号商品', '七号商品', '八号商品'],
        datasets: [
          {
            label: '手机电话卡',
            data: []
          },
          {
            label: '电视机盒子',
            data: []
          },
          {
            label: '笔记本显示器',
            data: []
          },
          {
            label: '家电插线板',
            data: []
          },
          {
            label: '出行穿戴',
            data: []
          },
          {
            label: '电源配件',
            data: []
          },
          {
            label: '耳机音箱',
            data: []
          },
          {
            label: '生活箱包',
            data: []
          },
          {
            label: '智能路由器',
            data: []
          }
        ]
      },
    };
  },
  created() {
    this.fetchChartData(); // 组件创建时初始化获取数据
    setInterval(() => {
      this.fetchChartData(); // 每3秒钟更新一次数据
    }, 3000);
  },

  methods: {
    fetchChartData() {
      // 发送 AJAX 或 Fetch 请求获取后端数据
      fetch('http://localhost:8081/diagram/lineChart')
          .then(response => response.json())
          .then(data => {

          })
          .catch(error => {
            console.error('Error fetching chart data:', error);
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
.content-title {
  clear: both;
  font-weight: 400;
  line-height: 50px;
  margin: 10px 0;
  font-size: 22px;
  color: #1f2f3d;
}
</style>



