<template >
    <Teleport to="body">
        <div class="importBox">
            <div class="boxCanvas">
                <div class="boxControl">
                    <label class="boxFile" for="boxFile">
                        <input id="boxFile" name="boxFile" v-on:change="selectFile" type="file" style="display: none">
                        📁请选择文件
                    </label>
                    <br>
                    {{ fileBoxData.fileName }}
                </div>
                <div class="braControl">
                    <button class="type-btn1" @click="smallButtom('Confirm','')">确定</button>
                    <button class="type-btn1" @click="smallButtom('Close','')">返回</button>
                </div>
            </div>
        </div>
    </Teleport>
</template>

<script setup>
import { reactive } from 'vue';
import axios from 'axios'
const props = defineProps([
    "autton"
])
const emit = defineEmits([
    "autton"
])

const fileBoxData = reactive({
    fileName:'',
})

function smallButtom(mode,data){
    if(mode=="Close"){
        emit("autton", mode)
    }
    if (mode == "Confirm") {
        let file = document.getElementById('boxFile');
        emit("autton", mode,file )
    }
    
}



function selectFile(file) {
    file=file.target.files[0]
    if (file) {
        fileBoxData.fileName = file.name;
    }
}
</script>

<style scoped>
@import '../assets/css/importBox.css';
</style>