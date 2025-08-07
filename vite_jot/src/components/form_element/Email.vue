<script setup>
import {ref} from 'vue'
import { useFormFieldsStore } from '../../../stores/FormFieldsStore'
const Form_store = useFormFieldsStore()
const Email_data = Form_store.fields.find(item => item.type === 'Email')

</script>

<template>
    <div class="Email-com">
        <div class="border-blue">
            <div class="label-name">ایمیل</div>
            <div class="input-box">
                <span>
                    <input type="text" v-model="Email_data.value.Email">
                    <span class="subLabels" style="margin: 0; padding: 0;">
                        <input type="text" v-model="Email_data.value.subLabels" style="border: none; padding: 0;">
                    </span>
                </span>
            </div>
        </div>
    </div>
</template>

<style scoped>
.Email-com{
    display: flex;
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
.input-box{
    display: flex;
    justify-content: left;
    align-items: center;
    direction: ltr;
    width: 100%;
    
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
    text-align: left;
}
@media (max-width: 640px){
   .input-box span input , .subLabels input{
        width: 100%;
   }
}
</style>