<script setup>
const props = defineProps({
    isActive:{
        type:Boolean,
        default: false
    }
})
</script>

<template>
    <div class="Phone-com">
        <div class="border-blue" :class="{active_heading: isActive}">
            <div class="label-name">شماره تماس</div>
            <div class="input-box">
                <span>
                    <input type="text" placeholder="0935 _ 123 _ 4567" :disabled="isActive" :class="{move_input:isActive}">
                </span>
                <span>
                    لطفا شماره تماس معتبر وارد کنید.
                </span>
            </div>
        </div>
    </div>
</template>


<style scoped>
.Phone-com{
    padding: 0 35px;
    display:flex;
    justify-content: center;
    align-items: center;
}
.border-blue{
    margin: 12px 4px;
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
    cursor: move;
}
.move_input{
    cursor: move;
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
    padding: 0 10px;
}
.input-box span{
    font-size: 12px;
    padding: 7px 0;
    color: #636a96;
    display: flex;
}
.input-box span input{
    outline: none;
    background-color: inherit;
    font-family: inherit;
    border: 1px solid #b8bdc9;
    border-radius: 4px;
    width:312px;
    height: 40px;
    font-size: 14px;
    color: #b8bdc9;
    padding: 2px 8px;
    direction: ltr;
}
</style>