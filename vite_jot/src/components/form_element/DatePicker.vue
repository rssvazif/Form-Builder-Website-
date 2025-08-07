<script setup>
const props = defineProps({
    isActive:{
        type:Boolean,
        default: false
    }
})

</script>
<template>
    <div class="DatePicker-com">
        <div class="border-blue" :class="{active_heading:isActive}">
            <div class="label-name">
                تاریخ
            </div>
            <div class="input-box">
                <div class="type-date">
                    <span><input type="text" placeholder="سال / ماه / روز" :disabled="isActive" :class="{move_input:isActive}"></span>
                    <button><svg xmlns="http://www.w3.org/2000/svg" width="15" viewBox="0 0 448 512"><path class="fa-primary" d="M400 64H352V31.1C352 14.33 337.7 0 320 0S288 14.33 288 31.1V64H160V31.1C160 14.33 145.7 0 128 0S96 14.33 96 31.1V64H48C21.49 64 0 85.49 0 112V192h448V112C448 85.49 426.5 64 400 64z"/><path class="fa-secondary" d="M0 192v272C0 490.5 21.5 512 48 512h352c26.5 0 48-21.5 48-48V192H0z"/></svg></button>
                </div>
                <span>تاریخ</span>
            </div>
        </div>
    </div>
</template>

<style scoped>
.fa-primary{
    opacity: 0.4;
}
.DatePicker-com{
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
}
.type-date{
    border: 1px solid #b8bdc9;
    border-radius: 4px;
    width: 312px;
    display: flex;
    align-items: center;
    justify-content: center;  
}
.type-date span{
    padding: 0;
}
.type-date span input{
    border: none;
    outline: none;
    font-family: inherit;
    background-color: inherit;
    height: 40px;
    width: 270px;
    font-size: 14px;
    color: #b8bdc9;
    padding: 2px 5px 2px 25px;
    text-align: center;
}
.type-date button{
    background-color: inherit;
    display: flex;
    border: none;
}
@media (max-width: 640px){
    .DatePicker-com{
        padding: 0;
    }
    .type-date{
        width: 100%;
    }
    .type-date span input{
        width: 100%;
    }
}
</style>