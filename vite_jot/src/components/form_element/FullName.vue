<script setup>
import {ref} from 'vue'
import {useFormFieldsStore} from '../../../stores/FormFieldsStore'
const Form_store = useFormFieldsStore()
const FullName_data = Form_store.fields.find(item => item.type === 'FullName')
const fullName = FullName_data.value.subLabels
const fullName_placeholder = FullName_data.value.PlaceHolder
</script>

<template>
    <div class="FullName-com" >
        <div class="border-blue" :style="{flexDirection:FullName_data.value.labelAlignment === 'right'?'row':''}">
            <div class="label-name" >
                <input type="text" v-model="FullName_data.value.fieldLabel" :style="{width:FullName_data.value.labelAlignment === 'right'?'200px':'',marginBottom:FullName_data.value.labelAlignment === 'right'?'18px':''}">
            </div>
            <div class="input-box" >
                <span>
                    <input type="text" v-model="fullName_placeholder.firstName" :style="{width:FullName_data.value.labelAlignment === 'right'?'150px':''}">
                    <span class="subLabels" :style="{width:FullName_data.value.labelAlignment === 'right'?'100px':''}">
                        <input type="text" v-model="fullName.firstName">
                    </span>
                </span>
                <span>
                    <input type="text" v-model="fullName_placeholder.lastName" :style="{width:FullName_data.value.labelAlignment === 'right'?'150px':''}">
                    <span class="subLabels" :style="{width:FullName_data.value.labelAlignment === 'right'?'100px':''}"> 
                        <input type="text" v-model="fullName.lastName" >
                    </span>
                </span>
            </div>
        </div>
    </div>
</template>

<style scoped>
.FullName-com{
    display: flex;
    align-items: center;
    justify-content: center;
}
.border-blue{
    margin: 28px 4px 12px;
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
.label-name input{
    border: none;
    font-family: inherit;
    color: #2c3345;
    font-size: 16px;
    outline: none;
    padding: 2px 0;
    width: 100%;
}
.input-box{
    display: flex;
    justify-content: center;
    align-items: center;

}
.input-box span{
    display: flex;
    flex-direction: column;
    margin: 0 10px;
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
}
.input-box span span{
    font-size: 12px;
    padding: 7px 0;
    color: #636a96;
}
.input-box span .subLabels{
    padding: 0;
    margin: 0;
}
.input-box span .subLabels input{
    border: none;
    padding: 0;
    color: #57647e;
}
@media (max-width: 640px){
    .input-box{
        flex-direction: column;
    }
   .input-box span input , .subLabels input{
        width: 100%;
   }
}
</style>