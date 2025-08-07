<script setup>
const props = defineProps({
    isActive:{
        type: Boolean,
        default: false
    }
})
</script>

<template>
    <div class="Spinner-com">
        <div class="border-blue" :class="{active_heading:isActive}">
            <div class="label-name">
                سوال یادداشت کنید
            </div>
            <div class="input-box">
                <div class="spinner-item">
                    <button>-</button>
                    <span><input type="text" :disabled="isActive" :class="{move_input:isActive}"></span>
                    <button>+</button>
                </div>
                <span v-if="isActive">
                    افزودن زیر برچسب
                </span>
            </div>
        </div>
    </div>
</template>

<style scoped>
.Spinner-com{
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
    padding: 0 10px ;
}
.input-box span{
    font-size: 12px;
    padding: 7px 0;
    color: #636a96;
    display: flex;
}
.spinner-item{
    display: flex;
    align-items: center;
    justify-content: center;
    width: 310px;
    height: 40px;
    border: 1px solid #b8bdc9;
    border-radius: 5px;
}
.spinner-item button{
    width: 36px;
    height: 38px;
    background-color: #f4f4f7;
    border: none;
    outline: none;
    font-size: 25px;
    color: #58657e;
}
.spinner-item span{
    height: 100%;
    padding: 0;
}
.spinner-item span input{
    width: 238px;
    border: none;
    height: 100%;
    outline: none;
    font-family: inherit;
    font-size: 16px;
    direction: ltr;
    padding: 0 10px;
    color: #b8bdc9;
    text-align: center;
}
@media (max-width: 640px){
    .spinner-item{
        width: 100%;
    }
    .spinner-item span input{
        width: 100%;
    }
    .Spinner-com{
        padding: 0;
    }
}
</style>