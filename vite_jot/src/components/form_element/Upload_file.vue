<script setup>
const props = defineProps({
    isActive:{
        type:Boolean,
        default:false
    }
})
</script>

<template>
    <div class="Upload_file-com">
        <div class="border-blue" :class="{active_heading:isActive}">
            <div class="label-name">بارگذاری فایل</div>
            <div class="input-box">
                <div class="box-upload">
                    <div class="cloud-upload">
                        <svg width="39" height="28" xmlns="http://www.w3.org/2000/svg"><path fill="#b3bccd" d="M32.375 12.188C31.5 5.688 26 .874 19.375.874 13.687.875 8.75 4.438 6.937 9.813 2.875 10.687 0 14.186 0 18.374c0 4.563 3.563 8.375 8.125 8.75h23.813c3.812-.375 6.812-3.625 6.812-7.5 0-3.688-2.75-6.875-6.375-7.438zm-6.313 3.5a.567.567 0 01-.437.187.567.567 0 01-.438-.188L20 10.5v12.25c0 .375-.25.625-.625.625s-.625-.25-.625-.625V10.5l-5.188 5.188a.604.604 0 01-.874 0 .604.604 0 010-.876l6.25-6.25c.062-.062.125-.124.187-.124.125-.063.313-.063.5 0 .063.062.125.062.188.124l6.25 6.25c.25.25.25.626 0 .876z"/></svg>
                    </div>
                    <div>بارگذاری فایل</div>
                </div>
                <span v-if="isActive">
                    افزودن زیر برچسب
                </span>
            </div>
        </div>
    </div>
</template>

<style scoped>
.Upload_file-com{
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
.label-name{
    display: flex;
    justify-content: start;
    width: 100%;
    color: #2c3345;
    margin: 0 0 15px;
    padding-right: 10px;
}
.input-box{
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 0 10px ;
}
.input-box span{
    font-size: 12px;
    padding: 7px 0;
    color: #636a96;
    display: flex;
}
.box-upload{
    border: 1px dashed #444 ;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 40px 10px;
    gap: 10px;
    overflow-x: scroll;
}
.box-upload div{
    font-weight: bolder;
}
</style>