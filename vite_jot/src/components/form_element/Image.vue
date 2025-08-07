<script setup>
const props = defineProps({
    isActive:{
        type:Boolean,
        default:false
    }
})
</script>
<template>
    <div class="Image-com">
        <div class="border-blue" :class="{active_heading:isActive}">
            <div class="image">
                <img src="/image_placeholder.png" alt="image" height="104">
            </div>
        </div>
    </div>
</template>

<style scoped>
.Image-com{
    padding: 0 35px;
    display: flex;
    align-items: center;
    justify-content: center;
}
.border-blue{
    margin: 12px 4px ;
    padding: 12px 10px;
    width: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    border: 2.5px solid #fff;
    border-radius: 4px;
    position: relative;
}
.active_heading{
    border: 2.5px solid #3595f6;
}
.image{
    display: flex;
    justify-content: center;
    width: 100%;
}
</style>