<template>
<!-- 数据包页 -->
    <div class="box-frame">
        <div v-for="item in packetData.packet" :key="item.id" class="folder">
            <span @click="openBox(item.id)" class="f-icon-emelent cor"
                :class="item.checked ? 'f-box-select-style' :'' ">{{ item.checked ? '✔️' : '📦' }}</span>
            <label class="f-label-block cor" :for="item.id">{{item.boxName}}</label>
            <input :id="item.id" class="cke" type="checkbox" v-model="item.checked">
        </div>
    </div>
</template> 

<script setup>

import { reactive,onMounted,watch } from 'vue';
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:2623/';
const props = defineProps([
    "hBUtton","allSelect","delBox"
])

const packetData = reactive({
    packet: [],
});

const emit = defineEmits(["hBUtton"]);
function openBox(id){
    emit("hBUtton","openBox", id);
};

watch(packetData, function(val){
    //遍历 packetData.packet 将checked为真的id存入selecItems 数组
    let selecItems = [];
    for(let i = 0; i < packetData.packet.length; i++){
        if(packetData.packet[i].checked){
            selecItems.push(packetData.packet[i].id);
        }
    }
    emit("hBUtton","selectItems", selecItems);
})

watch(props, function (val) {
    if (val.allSelect){
        for (let i = 0; i < packetData.packet.length; i++){
            packetData.packet[i].checked = true;
        }
    }
    else{
        for (let i = 0; i < packetData.packet.length; i++){
            packetData.packet[i].checked = false;
        }
    }
    if(val.delBox){
        get_box_list()
        emit("hBUtton", "restDelBox", false);
    }

})

// 钩子OnMounted

onMounted(function () {
    get_box_list()

})

function get_box_list(){
    axios.get('/get-box-list').then(res => {
        let data = res.data.data;
        if (data != null) {
            for (let i = 0; i < data.length; i++) {
                data[i].checked = false;
            }
            packetData.packet = data;
        }else{
            packetData.packet =[]
        }
    });
}


</script>

<style scoped>

@import '../assets/css/packet.css';
</style>