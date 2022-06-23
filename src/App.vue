<template>

  <div class="main shadow">
    <h1 class="title">个人信息管理系统</h1>
    <hr color="#6633FF">
    <div class="frameCanver tastb">
      <div class="frameBar shadow tastw">
        <div style=" margin-left: 10px; float: left;">
          <span style="color:#fff;font-size: 18px;">{{ appData.config.changePage ? "🟥" : '🟨' }}</span>
        </div>
        <div class="subBar2">
          <button class="btnMargin" @click="hBU('All')">🔘</button>
          <button class="btnMargin" @click="hBU('Del')">❌</button>
          <button class="btnMargin" @click="hBU('Add')">➕</button>
        </div>

      </div>
      <Packet :delBox="appData.delBox" :allSelect="appData.allSelect" @hBUtton="hBU"
        v-if="appData.config.changePage == 0" /> <!-- Home -->
      <Details @hBUtton="hBU" :BoxId="appData.openBoxId" v-if="appData.config.changePage == 1" /><!-- 详情 -->
      <AddData @hBUtton="hBU" v-if="appData.config.changePage == 2" /><!-- 新增 -->
      <Toast v-if="appData.shTips" :tips="tips" />
    </div>

  </div>
</template>
      
<script setup>
import { reactive, watch, ref } from 'vue';
import Details from './components/Details.vue';
import Packet from './components/Packet.vue';

import AddData from './components/AddData.vue';
import Toast from './components/Toast.vue';
import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:2623/';
components: {
    Packet,
    Details,
    Toast
}
const appData = reactive({
  config: {
    changePage: 0,
    showSelectFile: false,
  },
  openBoxId: '',//点击的盒子id
  delList: [],//删除盒子的列表
  allSelect: false,//刷新全选
  shTips: false,//刷新提示
  delBox:false,//刷新盒子
})
// 首页按钮事件  
function hBU(mode, data) {
  if (mode == "Home") {
    appData.config.changePage = 0;//数据盒页+frame
  } else if (mode == "Close") {
    appData.config.showSelectFile = false;
  } else if (mode == "All") {
    appData.allSelect = !appData.allSelect;
  } else if (mode == "Tips") {
    tips.value = "RefreshMonitor"
    setTimeout(() => {
      tips.value = data
    }, 30)
  } else if (mode == "Del") {//请求删除
    if(!appData.delList.length){
      to_tips("No file selected")
      return
    }

    if (!confirm("真的要删除吗?")){
      return
    }
    const data = new FormData();
    data.append('delList', appData.delList);
    axios({
      method: 'delete',
      url: '/box',
      data: data,
    }).then(function (res) {
      appData.delBox=true
    })

  } else if (mode == "selectItems") {//更新选中的数据
    appData.delList = data
  }else if (mode == "restDelBox") {//更新选中的数据
    appData.delBox = false
  }else if (mode == "Add") {
    appData.config.changePage = 2
  } else {
    appData.openBoxId = data;
    appData.config.changePage = 1;//详情页-参数为 boxName
  }
}

const tips = ref('')

watch(tips, function () {
  if (tips.value != "RefreshMonitor") {
    appData.shTips = true
    setTimeout(() => {
      appData.shTips = false
    }, 1000)
  }
})

function to_tips(msg) {
  tips.value = "RefreshMonitor"
  setTimeout(() => {
    tips.value = msg
  }, 30)
}


</script>
<style scoped>
@import './assets/css/frame.css';
@import './assets/css/css.css';
</style>
