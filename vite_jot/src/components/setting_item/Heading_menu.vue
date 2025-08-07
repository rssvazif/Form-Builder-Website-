<script setup>
import {ref} from 'vue'
import {useFormFieldsStore} from '../../../stores/FormFieldsStore'
const Form_store = useFormFieldsStore()
const Heading_data= Form_store.fields.find(item => item.type === 'Heading')


const props = defineProps({
    modelValue:{
        type:Boolean,
        default:false
    }
})

const emit = defineEmits(['update:modelValue'])

function close_panel(){
    emit('update:modelValue',false)
}

const border_style = ref(0)
const tuggle_setting = ref('عمومی')
const hide_field = ref(false)

</script>

<template>
    <div class="left-panel" :class="{show_leftPanel: props.modelValue}">
        <div class="heading-setting">
            <h3>ویژگی های عنوان</h3>
            <span class="heading-setting-span-svg">
                <svg @click="close_panel()" width="24" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" class="svg-close-setting"><path fill-rule="evenodd" d="M17.707 7.707a1 1 0 0 0-1.414-1.414L12 10.586 7.707 6.293a1 1 0 0 0-1.414 1.414L10.586 12l-4.293 4.293a1 1 0 1 0 1.414 1.414L12 13.414l4.293 4.293a1 1 0 0 0 1.414-1.414L13.414 12l4.293-4.293Z" clip-rule="evenodd"></path></svg>
            </span>
        </div>
        <div class="button-setting-in-panel">
            <button class="per-button" @click="tuggle_setting = 'عمومی' , border_style = 0" >عمومی</button>
            <button class="per-button" @click="tuggle_setting = 'تصویر عنوان' , border_style = 1">تصویر عنوان</button>
        </div>
        <div class="General" v-if="tuggle_setting === 'عمومی'">
            <div class="line">
                <div class="simple-div-setting">
                    <label for="heading-text">متن عنوان</label>
                </div>
                <div class="simple-div-setting">
                    <input type="text" name="heading-text" v-model="Heading_data.value.Header">
                </div>
            </div>
            <div class="line">
                <div class="simple-div-setting">
                    <label for="subheading">متن زیرعنوان</label>
                </div>
                <div class="simple-div-setting">
                    <input type="text" name="subheading"  v-model="Heading_data.value.subHeader">
                </div>
                <p class="p-in-setting">افزودن متن کوچک تر پایین عنوان</p>
            </div>
            <div class="line">
                <div class="simple-div-setting">
                    <label for="heading-text">اندازه عنوان</label>
                </div>
                <div class="simple-div-setting" style="display: flex; align-items: center;">
                    <span class="span-in-setting" @click="Heading_data.value.size = 'default'" :style="{backgroundColor:Heading_data.value.size === 'default'? '#0075e3':''}">پیش فرض </span>
                    <span class="span-in-setting" @click="Heading_data.value.size = 'big'" :style="{backgroundColor:Heading_data.value.size === 'big'? '#0075e3':''}">بزرگ </span>
                    <span class="span-in-setting" @click="Heading_data.value.size = 'small'" :style="{backgroundColor:Heading_data.value.size === 'small'? '#0075e3':''}">کوچک </span>
                </div>
            </div>
            <div class="line">
                <div class="simple-div-setting">
                    <label for="heading-text">ترازبندی متن</label>
                </div>
                <div class="simple-div-setting" style="display: flex; align-items: center;">
                    <span class="span-in-setting" @click.prevent="Heading_data.value.aligment = 'right'" :style="{backgroundColor:Heading_data.value.aligment === 'right'? '#0075e3':''}">راست </span>
                    <span class="span-in-setting" @click.prevent="Heading_data.value.aligment = 'center'" :style="{backgroundColor:Heading_data.value.aligment === 'center'? '#0075e3':''}">وسط </span>
                    <span class="span-in-setting" @click.prevent="Heading_data.value.aligment = 'left'" :style="{backgroundColor:Heading_data.value.aligment === 'left'? '#0075e3':''}">چپ </span>
                </div> 
                <p class="p-in-setting">انتخاب چگونگی قرارگیری متن در افق</p>
            </div>
            <div class="line">
                <div class="simple-div-setting">
                    <label for="heading-text">فیلد تکراری</label>
                </div>
                <div class="simple-div-setting margin-div-setting">
                    <button @click="Form_store.addFields(Heading_data,Form_store.fields.length)" style="display: flex; align-items: center;justify-content: space-between;
                    padding: 0 10px; width: 130px; height: 40px; background-color:rgba(218, 222, 243); font-family: inherit;font-size: 14px; color: rgba(52, 60, 106); border-radius: .25rem; border: none;">
                        <span>
                            <svg style="display: flex;" width="20" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M16 5.5V4a3 3 0 0 0-3-3H4a3 3 0 0 0-3 3v9a3 3 0 0 0 3 3h1.5a.5.5 0 0 0 .5-.5V9a3 3 0 0 1 3-3h6.5a.5.5 0 0 0 .5-.5ZM11 8a3 3 0 0 0-3 3v9a3 3 0 0 0 3 3h9a3 3 0 0 0 3-3v-9a3 3 0 0 0-3-3h-9Z" clip-rule="evenodd"></path></svg>
                        </span>
                        <span style="width: 100%;">تکرار</span>
                    </button>
                </div>
                <p class="p-in-setting">تکرار و کپی فیلد با تمام جزییات و مقادیر</p>
            </div>
            <div class="line">
                <div class="simple-div-setting">
                    <label for="heading-text">مخفی کردن فیلد</label>
                </div>
                <div>
                    <div class="simple-div-setting">
                        <span class="on-off-hidden" @click="hide_field = !hide_field">
                            <span v-if="!hide_field" id="off-hide">خاموش </span>
                            <span v-else id="on-hide">روشن</span>
                        </span>
                    </div>
                </div>
            </div>
        </div>
        <div class="Heading-image" v-if="tuggle_setting === 'تصویر عنوان'">
            <div class="line">
                <div class="simple-div-setting">
                    <label for="heading-text">تصویر عنوان</label>
                </div>
                <div class="simple-div-setting">
                    <button class="choose-file-image">
                        <span>
                            <svg style="display: flex;" width="20" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M19 1a1 1 0 0 1 1 1v2h2a1 1 0 1 1 0 2h-2v2a1 1 0 1 1-2 0V6h-2a1 1 0 1 1 0-2h2V2a1 1 0 0 1 1-1Zm-6 4a3 3 0 0 0 3 3 3 3 0 1 0 6 0c.35 0 .687-.06 1-.17V18a3 3 0 0 1-3 3H4a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3h9.764A2.989 2.989 0 0 0 13 5Zm-3 3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm5.248 2.312 5.59 7.416A.794.794 0 0 1 20.204 19H3.795a.794.794 0 0 1-.642-1.26l3.63-5.002a.794.794 0 0 1 1.285 0l2.003 2.76 3.909-5.186a.794.794 0 0 1 1.268 0Z" clip-rule="evenodd"></path></svg>
                        </span>
                        <span>
                            انتخاب فایل
                        </span>
                    </button>
                </div>
            </div>
        </div>
    </div>

</template>

<style setup>
    .left-panel{
        position: fixed;
        top: 114px;
        left: -390px;
        z-index: 210;
        transition: all .8s ease;
        background-color: #33384a;
        height: 100%;
        width: 390px;
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
    .button-setting-in-panel{
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .per-button{
        width: 205px;
        height:48px;
        background-color: #292d3c;
        border: none;
        outline: none;
        font-size: 14px;
        font-family: inherit;
        color: #bfc3ce;
        border-bottom: 3.5px solid #292d3c;
        transition: .3s ease;
    }
    .per-button:hover{
        border-bottom: 3.5px solid rgba(255, 97, 0);
        color: #fff;
    }
    .General{
        overflow: auto;
        max-height: 478px;
    }
    .line{
        padding: 13px;
        height: fit-content;
        border-bottom: 1px solid #292d3c;
    }
    .line .simple-div-setting{
        height: 41.89px;
    }
    .line .simple-div-setting label{
        font-size: 16px;
        color: #fff;
        padding: 8px 0 8px 8px;
    }
    .line .simple-div-setting input{
        background-color: #434a60;
        outline: none;
        border: 1px solid #292d3c;
        padding: 4px;
        height: 100%;
        font-size: 14px;
        font-family: inherit;
        color: #fff;
        border-radius: 2px;
    }
    .line .p-in-setting{
        font-size: 12px;
        color: #a0a6b6;
        margin: 5px 0 0;
    }
    .simple-div-setting .span-in-setting{
        padding: 8px 12px 6px ;
        background-color: #434a60;
        border: 1px solid #292d3c;
        text-align: center;
        width: 25%;
        font-size: 14px;
        color: #fff;
        cursor: pointer;
    }
    .margin-div-setting{
        margin: 0 0 6px;
    }
    .line .simple-div-setting .on-off-hidden{
        border: none;
        background-color: #434a60;
        padding: 2px;
        color: #a2acba;
        cursor: pointer;    
    }
    #off-hide{
        padding: 3px 20px;
        height: 20.8px;
    }
    #on-hide{
        background-color: #0075e3;
        color: #fff;
        padding: 3px 25px;
        height: 20.8px;
    }
    .Heading-image{
        display: flex;
        flex-direction: column;
    }
    .choose-file-image{
        display: flex;
        align-items: center;
        border: none;
        background-color:#daddf3 ;
        color: #343c6a;
        font-family: inherit;
        height: 40px;
        width: 160px;
        padding: 2px 10px;
        gap: 8px;
        border-radius: .25rem; 
        font-size: 14px;    
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