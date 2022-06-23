<template>
    <Teleport to="body">
        <div class="preview">
            <div class="preview-box">
                <div class="box-control">
                    <img v-if="props.image" :src="props.image">
                    <span v-if="props.fileUrl" class="ban">
                        当前文件不支持预览<a :href="props.fileUrl" target="_blank">📥点击下载</a>
                    </span>

                    <div class="braControl">
                        <button class="type-btn1" @click="smallButtom('Close', '')">返回</button>
                    </div>
                </div>
            </div>
        </div>
    </Teleport>
</template>

<script setup>
import {defineProps,defineEmits} from "vue"

const props = defineProps(["subHandleer", "image","fileUrl"])
const emit = defineEmits(["subHandleer"])

function smallButtom(mode) {
    emit("subHandleer", mode)
}



</script>


<style>


.preview {
    /* 图片预览 */
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
}

.preview-box {
    position: absolute;
    top: 50%;
    left: 50%;
    min-width: 300px;
    transform: translate(-50%, -50%);
}

.box-control>img {
    min-width: 600px;
    height: 400px;
    object-fit:contain;
    margin-bottom: 50px;
}
.ban{
    display: block;
    font-size: 20px;
    line-height: 20px;
    margin-bottom: 50px;
}

</style>