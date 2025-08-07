<script setup>
const props = defineProps({
    isActive:{
        type:Boolean,
        default:false
    }
})
</script>

<template>
    <div class="Address-com">
        <div class="border-blue" :class="{active_heading:isActive}">
            <div class="label-name">
                آدرس
            </div>
            <div class="input-box">
                <span><input type="text" :disabled="isActive" :class="{move_input:isActive}"></span>
                <span>آدرس خیابان</span>
            </div>
            <div class="input-box">
                <span><input type="text" :disabled="isActive" :class="{move_input:isActive}"></span>
                <span>آدرس خیابان خط 2</span>
            </div>
            <div class="input-box-two">
                <span>
                    <input type="text" :disabled="isActive" :class="{move_input:isActive}">
                    <span>شهر</span>
                </span>
                <span>
                    <input type="text" :disabled="isActive" :class="{move_input:isActive}">
                    <span>استان</span>
                </span>
            </div>
            <div class="input-box">
                <span>
                    <input type="text" :disabled="isActive" :class="{move_input:isActive}">
                </span>
                <span>کد پستی</span>
            </div>
        </div>
    </div>
</template>

<style scoped>
.Address-com{
    padding: 0 35px;
    display: flex;
    align-items: center;
    justify-content: center;
}
.border-blue{
    margin: 12px 4px;
    padding: 12px 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    border: 2.5px solid #fff;
    border-radius: 4px;
    height: 387px;
    position: relative;
}
.label-name{
    display: flex;
    justify-content: start;
    width: 100%;
    color: #2c3345;
    margin: 0 0 15px;
    padding-right: 10px;
}
.active_heading{
    border: 2.5px solid #3595f6;
    cursor: move;
}
.move_input{
    cursor: move;
}
.input-box{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: right;
    
}
.input-box-two{
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    gap: 20px;
}
.input-box-two span{
    display: flex;
    flex-direction: column;
    width:100%;
}
 
.input-box span input{
    width:648px;
    height: 40px;
    outline: none;
    border: 1px solid #b8bdc9 ;
    border-radius: 4px;
    font-family: inherit;
    font-size: 14px;
    color: #b8b8b8;
    padding: 2px 8px;
}
.input-box-two span input{
    width: 312px;
    height: 40px;
    outline: none;
    border: 1px solid #b8bdc9 ;
    border-radius: 4px;
    font-family: inherit;
    font-size: 14px;
    color: #b8b8b8;
    padding: 2px 8px;
}
.input-box span,.input-box-two span span{
    font-size: 12px;
    padding: 7px 0;
    color: #636a96;
}
@media (max-width: 640px){
    .Address-com{
        padding: 0;
    }
    .input-box span input{
        width: 100%;
    }
    .input-box-two{
        gap: 7px;
        width: 80%;
    }
    .input-box-two span input{
        width: 100%;
    }
}
</style>