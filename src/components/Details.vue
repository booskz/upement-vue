<template>
    <!-- 详情页 -->
    <div class="details">
        <div class="det-info">
            <div class="item-data">
                <p>盒子名称:<input :class="detailsData.edit ? 'area' : 'disNp'" type="text" placeholder="盒子显示名称"
                        v-model="detailsData.box_det.boxName"></p>

                <p>用户名称:<input :class="detailsData.edit ? 'area' : 'disNp'" type="text" placeholder="用户名"
                        v-model="detailsData.box_det.userName"></p>

                <p>认证密码:<input :class="detailsData.edit ? 'area' : 'disNp'" type="password" placeholder="密码"
                        v-model="detailsData.box_det.password"></p>

                <p>使用场景:<input :class="detailsData.edit ? 'area' : 'disNp'" type="text"
                        placeholder="例:http://www.opty.fun" v-model="detailsData.box_det.scenarios"></p>

                <textarea :class="detailsData.edit ? 'area' : 'disNp'" style="max-width:255px " cols="33" rows="11"
                    placeholder="备注信息..." v-model="detailsData.box_det.remarks">
                </textarea>

                <br>
                <button class="type-btn2 cor" style="float: right;height: 30px;width: 90px;margin-top: 8px;"
                    @click="pcopy(detailsData.box_det.password)">复制密码</button>
            </div>
        </div>
        <div class="file-frame">
            <div class="files-frame-box">
                <div class="file-list">
                    <span @click="preview(file)" class="file-item cor" v-for="file in detailsData.files_det"
                        :key="detailsData.files_det.id">{{ file.fileName}}</span>
                </div>
            </div>
        </div>
        <div style="display: flex;white-space: nowrap;margin-top: 5px;">
            <!-- 编辑状态 -->
            <h1 v-if="detailsData.edit" class=" cor type-btn1" @click="detailsData.edit = !detailsData.edit">
                ↩️</h1>
            <h1 v-if="detailsData.edit" @click="detailsData.upLoad=true" class=" cor type-btn1">🗂️</h1>
            <h1 v-if="detailsData.edit" @click="put_box" class=" cor type-btn1">💾</h1>

            <!-- 查看状态 -->
            <h1 v-if="!detailsData.edit" @click="edit" class=" cor type-btn1">🔳</h1>
            <h1 v-if="!detailsData.edit" @click="backHome" class=" cor type-btn1">↩️</h1>
        </div>

    </div>
    <AddFile @autton="auttonSub" v-if="detailsData.upLoad" />
    <FilePreview v-if="detailsData.preview_box" :image="detailsData.image" :fileUrl="detailsData.fileUrl"
        @subHandleer="handler" />

</template>


<script setup>
import { reactive, onMounted } from 'vue';
import axios from 'axios'
import AddFile from './AddFile.vue';
import FilePreview from './FilePreview.vue';
axios.defaults.baseURL = 'http://localhost:2623/';
components: {
    AddFile, FilePreview
}

const detailsData = reactive({
    //0查看信息状态1修改状态
    edit: 0,
    box_det: {},
    files_det: [],
    upLoad: false,
    preview_box:false,
    image:'',
    fileUrl:false

})
const props = defineProps([
    "hBUtton","BoxId"
])
const emit = defineEmits(['hBUtton'])
function backHome() {
    emit('hBUtton', 'Home')
}

function pcopy(password) {
    navigator.clipboard.writeText(password).then(function () {
        emit('hBUtton', 'Tips','success')
    }, function () {
        emit('hBUtton', 'Tips', 'fail')
    });


}
function edit() {
    detailsData.edit = 1;
}

function auttonSub(mode, data) {
    if (mode == 'Close') {
        detailsData.upLoad = false
    } else if (mode == 'Confirm') {
        // 上传文件
        if (data.files[0]) {

            let fileObj = data.files[0];
            let fileName = fileObj.name;
            let formData = new FormData();
            formData.append('file', fileObj);
            formData.append('fileName', fileName);
            formData.append('id', props.BoxId);
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

function put_box() {

    axios.put('/box', detailsData.box_det).then(res => {
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
        data.append('id', props.BoxId);
        axios({
            method: "post",
            url: "/get-det",
            data: data
        }).then(res => {
            const data = res.data.data
            detailsData.files_det = data.file

        })
    }, 500)
}

onMounted(function (){
    const data =new FormData();
    data.append('id',props.BoxId);

    axios({
        method:"post",
        url:"/get-det",
        data:data
    }).then(res=>{
        const data =res.data.data
        detailsData.box_det = data.box
        detailsData.files_det=data.file
    })


})

function preview(fbj){
    detailsData.preview_box = !detailsData.preview_box
    axios({
        method:"post",
        url:"/preview",
        data:JSON.stringify({
            id:fbj.id,
            fileName: fbj.serverFileName
        })
    }).then(res=>{
       
        if (res.data.type=="image"){
             detailsData.image = "data:image/jpeg;base64," + res.data.data
        }
        if (res.data.type == "file") {
            detailsData.fileUrl =res.data.url
        }

    })
    // 请求服务器  发送id serverFileName
    // 如果是文件  服务器返回 {
    //     type:"file",
    //     bytes:"",
    // }
}

function handler(){
    detailsData.image = false
    detailsData.fileUrl = false
    detailsData.preview_box = !detailsData.preview_box

}



</script>


<style>
@import '../assets/css/details.css';
</style>