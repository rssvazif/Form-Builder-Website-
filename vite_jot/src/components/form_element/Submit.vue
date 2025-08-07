<script setup>

const props = defineProps({
  isActive: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
    <div class="submit-com">
        <div class="border-blue" :class="{active_heading:isActive}">
            <button id="submit">ارسال</button>
        </div>
    </div>
</template>

<style scoped>
.submit-com{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 110px;
    position: relative;
}
.submit-com::after{
    content: '';
    width: 769px;
    height: 1px;
    background-color: #d7d8e1;
    position: absolute;
    left: -37px;
    top: 0;
    
}
#submit{
    background-color: #18bd5b;
    border: none;
    border-radius: 4px;
    color: #fff;
    font-family: inherit;
    font-size: 16px;
    padding: 0 12px;
    height: 50%;
    width: 180px;
}
.border-blue{
    padding: 10px 20px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    border:2.5px solid #fff;
    border-radius: 4px;
    position: relative;
}
.active_heading{
    border: 2.5px solid #3595f6;
}
@media (max-width: 640px){
    .submit-com::after{
        width: 340px;
    }
}
</style>