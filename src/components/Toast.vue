<template>
<Teleport to="body">
    <div class="toast">
        <h1 class="tips">{{$props.tips}}</h1>
    </div>

</Teleport>


</template>


<script setup>

import { defineProps } from 'vue';
defineProps([
    "tips"
])





</script>



<style >



.tips{
    /* 动画 */
    font-size: 20px;
    color: #fff;
    text-align: center;
    line-height: 50px;
    background: #000;
    opacity: 0.8;
    width: 100%;
    height: 53px;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9999;

}

</style>