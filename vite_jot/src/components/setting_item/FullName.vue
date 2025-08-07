<script setup>
import {ref} from 'vue'
import {useFormFieldsStore} from '../../../stores/FormFieldsStore'
const Form_store = useFormFieldsStore()
const FullName_data = Form_store.fields.find(item => item.type === 'FullName')
const fullName = FullName_data.value.subLabels
const fullName_placeholder = FullName_data.value.PlaceHolder
const props = defineProps({
    modelValue:{
        type:Boolean,
        default: false
    }
})

const tuggle_setting = ref('عمومی')
const hide_field = ref(false)
const emit = defineEmits(['update:modelValue'])

function closePanel(){
    emit('update:modelValue',false)
}
</script>

<template>
    <div class="left-panel" :class="{show_leftPanel:props.modelValue}">
        <div class="heading-setting">
            <h3>ویژگی های نام و نام خانوادگی</h3>
            <span class="heading-setting-span-svg">
                <svg @click="closePanel()" width="24" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" class="svg-close-setting"><path fill-rule="evenodd" d="M17.707 7.707a1 1 0 0 0-1.414-1.414L12 10.586 7.707 6.293a1 1 0 0 0-1.414 1.414L10.586 12l-4.293 4.293a1 1 0 1 0 1.414 1.414L12 13.414l4.293 4.293a1 1 0 0 0 1.414-1.414L13.414 12l4.293-4.293Z" clip-rule="evenodd"></path></svg>
            </span>
        </div>
        <div class="button-setting-in-panel">
            <button class="per-button" @click="tuggle_setting = 'عمومی'">عمومی</button>
            <button class="per-button" @click="tuggle_setting = 'پیشرفته'">پیشرفته</button>
        </div>
        <div class="General" v-if="tuggle_setting === 'عمومی'">
            <div class="line">
                <div class="simple-div-setting">
                    <label for="heading-text">برچسب فیلد</label>
                </div>
                <div class="simple-div-setting">
                    <input type="text" name="heading-text" v-model="FullName_data.value.fieldLabel">
                </div>
            </div>
            <div class="line">
                <div class="simple-div-setting">
                    <label for="heading-text">ترازبندی برچسب</label>
                </div>
                <div class="simple-div-setting" style="display: flex; align-items: center;">
                    <span class="span-in-setting" @click="FullName_data.value.labelAlignment = 'right'" :style="{backgroundColor:FullName_data.value.labelAlignment === 'right'? '#0075e3':''}">راست </span>
                    <span class="span-in-setting" @click="FullName_data.value.labelAlignment = 'top'" :style="{backgroundColor:FullName_data.value.labelAlignment === 'top'? '#0075e3':''}">بالا </span>
                    <span class="span-in-setting" @click="FullName_data.value.labelAlignment = 'left'" :style="{backgroundColor:FullName_data.value.labelAlignment === 'left'? '#0075e3':''}">چپ </span>
                </div>
                <p class="p-in-setting">انتخاب چگونگی قرارگیری برچسب</p>
            </div>
            <div class="line">
                <div class="simple-div-setting">
                    <label for="heading-text">مورد نیاز</label>
                </div>
                <div>
                    <div class="simple-div-setting">
                        <span class="on-off-hidden" @click="hide_field = !hide_field">
                            <span v-if="!hide_field" id="off-hide">خاموش </span>
                            <span v-else id="on-hide">روشن</span>
                        </span>
                    </div>
                </div>
                <p class="p-in-setting">فیلد ضروری جهت ارسال</p>
            </div>
            <div class="line">
                <div class="simple-div-setting">
                    <label for="heading-text">زیر برچسب</label>
                </div>
                <div class="table-section-setting">
                    <table class="own-table">
                        <tbody>
                            <tr>
                                <td>
                                    <span>نام</span>
                                </td>
                                <td>
                                    <span>
                                        <input class="input-table-setting" type="text" v-model="fullName.firstName">
                                    </span>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <span>
                                        نام خانوادگی      
                                    </span>
                                </td>
                                <td>
                                    <span>
                                        <input class="input-table-setting" type="text" v-model="fullName.lastName">
                                    </span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="line">
                <div class="simple-div-setting">
                    <label for="heading-text">فیلد تکراری</label>
                </div>
                <div class="simple-div-setting margin-div-setting">
                    <button @click="Form_store.addFields(FullName_data,Form_store.fields.length)" style="display: flex; align-items: center;justify-content: space-between;
                    padding: 0 10px; width: 130px; height: 40px; background-color:rgba(218, 222, 243); font-family: inherit;font-size: 14px; color: rgba(52, 60, 106); border-radius: .25rem; border: none;">
                        <span>
                            <svg style="display: flex;" width="20" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M16 5.5V4a3 3 0 0 0-3-3H4a3 3 0 0 0-3 3v9a3 3 0 0 0 3 3h1.5a.5.5 0 0 0 .5-.5V9a3 3 0 0 1 3-3h6.5a.5.5 0 0 0 .5-.5ZM11 8a3 3 0 0 0-3 3v9a3 3 0 0 0 3 3h9a3 3 0 0 0 3-3v-9a3 3 0 0 0-3-3h-9Z" clip-rule="evenodd"></path></svg>
                        </span>
                        <span style="width: 100%;">تکرار</span>
                    </button>
                </div>
                <p class="p-in-setting">تکرار و کپی فیلد با تمام جزییات و مقادیر</p>
            </div>
        </div>
        <div class="advanced" v-else>
            <div class="line">
                <div class="simple-div-setting">
                    <label for="heading-text">متن جایگزین</label>
                </div>
                <div class="table-section-setting">
                    <table class="own-table">
                        <tbody>
                            <tr>
                                <td>
                                    <span>نام</span>
                                </td>
                                <td>
                                    <span>
                                        <input class="input-table-setting" type="text" v-model="fullName_placeholder.firstName">
                                    </span>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <span>
                                        نام خانوادگی      
                                    </span>
                                </td>
                                <td>
                                    <span>
                                        <input class="input-table-setting" type="text" v-model="fullName_placeholder.lastName">
                                    </span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<style setup>
    .left-panel{
        position: fixed;
        height: 100%;
        width: 390px;
        top: 114px;
        left: -390px;
        transition:  all .8s ease;
        background-color: #33384a;
        z-index: 210;
    }
    .heading-setting{
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 16px 0 8px;
        height: 56px;
    }
    .heading-setting h3{
        font-size: 18px;
        margin: 0;
        color: #fff;
    }
    .heading-setting-span-svg{
        display: flex;
        justify-content: center;
        color: #fff;    
    }
    .svg-close-setting{
        display: flex;
        cursor: pointer;
    }
    .show_leftPanel{
        left: 0;
    }
    .own-table{
        width:100%;
        border: 1px solid #434a60;
        color: #fff;
        border-radius: 4px;
        height: fit-content;
    }
    .own-table tr{
        height: 51.2px;
    }
    .own-table tr td{
        padding: 0;
        margin: 0;
    }
    .own-table tr td:nth-child(1){
        background-color: #33384a;
        width:35%;
    }
    .own-table tr td:nth-child(2){
        background-color: #434a60;
    }
    .own-table tr td span{
        padding: 0 6px;
    }
    .input-table-setting{
        background-color: inherit;
        border: none;
        outline: none;
        height: 100%;
        width: 100%;
        font-family: inherit;
        font-size: 14px;
        color: #fff;
    }
</style>
<style scoped>
    ::-webkit-scrollbar{
        width: 10px;
    }
    ::-webkit-scrollbar-track {
        background: #33384a;
    }
    ::-webkit-scrollbar-thumb {
        background:#292d3c;
    }
    ::-webkit-scrollbar-thumb:hover {
        background: #111;
    }
</style>