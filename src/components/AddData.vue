<template>
    <!-- 详情页 -->

    <div class="details">
        <div class="det-info">
            <div class="item-data">
                <p>盒子名称:<input class="area" type="text" placeholder="盒子显示名称" v-model="aData.data.boxName">
                </p>

                <p>用户名称:<input class="area" type="text" placeholder="用户名" v-model="aData.data.userName">
                </p>

                <p>认证密码:<input class="area" type="password" placeholder="密码" v-model="aData.data.password"></p>

                <p>使用场景:<input class="area" type="text" placeholder="例:http://www.opty.fun"
                        v-model="aData.data.scenarios"></p>

                <textarea class="area" style="max-width:255px " cols="33" rows="11" placeholder="备注信息..."
                    v-model="aData.data.remarks">
                </textarea>

                <br>
            </div>
        </div>
        <div class="file-frame">
            <div class="files-frame-box">
                <div class="file-list">
                    <span class="file-item cor" v-for="file in aData.files"
                        :key="aData.files.id">{{ file.fileName }}</span>
                </div>
            </div>
        </div>
        <div style="display: flex;white-space: nowrap;margin-top: 5px;">
            <h1 @click="belowBar('Home')" class=" cor type-btn1">↩️</h1>
            <h1 @click="aData.upLoad = true" class=" cor type-btn1">🗂️</h1>
            <h1 class=" cor type-btn1" @click="submit">💾</h1>
        </div>
    </div>
    <AddFile @autton="auttonSub" v-if="aData.upLoad" />

</template>


<script setup>
import { onMounted, reactive } from 'vue';

import AddFile from './AddFile.vue';
import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:2623/';
components: {
    AddFile
}
const props = defineProps([
    "hBUtton"
])
const emit = defineEmits(['hBUtton'])
const mmr = rdstr()
const aData = reactive({
    //0查看信息状态1修改状态
    data: {
        id: mmr,
        boxName: '',
        userName: '',
        password: '',
        scenarios: '',
        remarks: '',
        edit: 0,
    },
    files: [],
    upLoad: false,

})

function rdstr() {
    let chs = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
    let str = '';
    for (var i = 0; i < 16; i++) {
        str += chs.charAt(Math.floor(Math.random() * chs.length));
    }
    return str;
}

function belowBar(mode) {
    if (mode == 'Home') {
        emit('hBUtton', 'Home')
    } else if (mode == 'AddFile') {
        emit('hBUtton', 'AddFile')
    }

}
function auttonSub(mode, data) {
    if (mode == 'Close') {
        aData.upLoad = false
    } else if (mode == 'Confirm') {
        if (data.files[0]) {
            let fileObj = data.files[0];
            let fileName = fileObj.name;
            let formData = new FormData();
            formData.append('file', fileObj);
            formData.append('id', aData.data.id);
            formData.append('fileName', fileName);
            axios.post('/create-box-file', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            }).then(res => {
                if (200 <= res.status < 300) {
                    emit('hBUtton', 'Tips', res.data.message)
                } else {
                    emit('hBUtton', 'Tips', "NET ERROR")
                }
            })
        } else {
            emit('hBUtton', 'Tips', "No files selected.")
        }
        get_files()


    }

}
function submit() {
    const data = aData.data;

    axios({
        method: 'post',
        url: '/create-box',
        data: data
    }).then(res => {
        if (200 <= res.status < 300) {
            emit('hBUtton', 'Tips', res.data.message)
        } else {
            emit('hBUtton', 'Tips', "NET ERROR")
        }

    })


}

function get_files() {
    setTimeout(() => {
        const data = new FormData();
        data.append('id', aData.data.id);
        axios({
            method: "post",
            url: "/get-det",
            data: data
        }).then(res => {
            const data = res.data.data
            aData.files = data.file

        })
    }, 500)
}



</script>

<style>
@import '../assets/css/details.css';
</style>