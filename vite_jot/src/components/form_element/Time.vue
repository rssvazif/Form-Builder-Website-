<script setup>
const props = defineProps({
    isActive:{
        type: Boolean,
        default: false
    }
})
</script>

<template>
    <div class="Time-com"> 
        <div class="border-blue" :class="{active_heading:isActive}">
            <div class="label-name">زمان</div>
            <div class="input-box">
                <span>
                    <input type="text" placeholder="دقیقه : ساعت" :disabled="isActive" :class="{move_input:isActive}">
                </span>
                <span>
                    دقیقه   / ساعت
                </span>
            </div>
        </div>
    </div>
</template>


<style scoped> 
.Time-com{
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
.input-box span input{
    width: 95px;
    height: 40px;
    font-family: inherit;
    background-color: inherit;
    font-size: 14px;
    border: 1px solid #b8bdc9;
    border-radius: 4px;
    outline: none;
    color: #b8bdc9;
    padding: 2px 5px;
    direction: ltr;
    text-align: center  ;
    direction: ltr;
}
</style>