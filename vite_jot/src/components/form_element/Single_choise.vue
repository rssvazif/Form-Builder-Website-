<script setup>
import {ref} from 'vue'
const props = defineProps({
    isActive:{
        type:Boolean,
        default: false
    }
})
const single_input = ref([
    {text:'گزینه 1 را یادداشت کنید', selected:false},
    {text:'گزینه 2 را یادداشت کنید', selected:false},
    {text:'گزینه 3 را یادداشت کنید', selected:false},
    {text:'گزینه 4 را یادداشت کنید', selected:false},
])
</script>

<template>
    <div class="Single_choise-com">
        <div class="border-blue" :class="{active_heading:isActive}">
            <div class="label-name">سوال یادداشت کنید</div>
            <div class="input-box">
                <div id="test" v-for="(item,index) in single_input" :key="index">
                    <span>{{ item.text }}</span>
                </div>
                <div class="add-option" v-if="isActive">
                    <button>افزودن گزینه</button>
                    <button>افزودن گزینه "سایر"</button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.Single_choise-com{
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
#test{
    position: relative;
    display: flex;
    align-items: center;
    padding: 7px 27px;
    font-size: 15px;
}
#test::before{
    width: 20px;
    height: 20px;
    border: 1px solid;
    content: "";
    position: absolute;
    top: 3px;
    left: 630px;
    background-color: #fff;
    border-color: #b8bdc9;
    border-radius: 50%; 
    cursor: pointer;
}
.add-option{
    display: flex;
    align-items: center;
}
.add-option button{
    background-color: inherit;
    font-family: inherit;
    border: none;
    border-radius: 3px;
    outline: none;
    font-size: 12px;
    color: #636A96;
    text-decoration: underline;
    padding: 5px 7px;
    margin: 4px 5px
}
.add-option button:hover{
    color: #fff;
    background-color: #c8ceed;
    transition: all .25s;
}
@media (max-width: 640px){
    #test::before{
        left: 200px;
    }
}
</style>