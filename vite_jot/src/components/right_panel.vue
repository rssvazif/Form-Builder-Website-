<script setup>
import {ref} from 'vue'
import Heading from './element_icon/Heading.vue'
import FullName from './element_icon/FullName.vue'
import Email from './element_icon/Email.vue'
import Address from './element_icon/Address.vue'
import Phone from './element_icon/Phone.vue'
import DatePicker from './element_icon/DatePicker.vue'
import Appointment from './element_icon/Appointment.vue'
import Signature from './element_icon/Signature.vue'
import Fill_in_blank from './element_icon/Fill_in_the_blank.vue'
import ShortText from './element_icon/ShortText.vue'
import LongText from './element_icon/LongText.vue'
import Paragraph from './element_icon/Paragraph.vue'
import Dropdown from './element_icon/Dropdown.vue'
import Single_choise from './element_icon/Single_choise.vue'
import Multiple_choise from './element_icon/Multiple_choise.vue'
import Number from './element_icon/Number.vue'
import Image from './element_icon/Image.vue'
import Upload_file  from './element_icon/Upload_file.vue'
import Time from './element_icon/Time.vue'
import Captcha from './element_icon/captcha.vue'
import Spinner from './element_icon/Spinner.vue'
import Submit from './element_icon/Submit.vue'
import InputTable from './element_icon/InputTable.vue'
import StarRate from './element_icon/StarRate.vue'
import ScaleRate from './element_icon/ScaleRate.vue'
import Divider from './element_icon/Divider.vue'
import SectionCollapse from './element_icon/SectionCollapse.vue'
import PageBreak from './element_icon/PageBreak.vue'


const open_panel = ref(false)
const basic = ref(true)
const widget_payments = ref()

const elements = [
    {text:'عنوان',type:'Heading', icon:Heading},
    {text:'نام و نام خانوادگی',type:'FullName',icon:FullName},
    {text:'ایمیل',type:'Email',icon:Email},
    {text:'آدرس',type:'Address',icon:Address},
    {text:'شماره تماس',type:'Phone',icon:Phone},
    {text:'انتخاب گر تاریخ',type:'DatePicker',icon:DatePicker},
    {text:'قرار ملاقات',type:'Appointment',icon:Appointment , describe:'(به زودی)'},
    {text:'امضا',type:'Signeture',icon:Signature , describe:'(به زودی)'},
    {text:'جای خالی',type:'Fill_in_blank',icon:Fill_in_blank , describe:'(به زودی)'}
]
const elements_basic = [
    {text:'متن کوتاه',type:'ShortText',icon:ShortText},
    {text:'متن بلند',type:'LongText',icon:LongText},
    {text:'پاراگراف',type:'Paragraph',icon:Paragraph , describe:'(به زودی)'},
    {text:'منوی کشویی',type:'DropDown',icon:Dropdown , describe:'(به زودی)'},
    {text:'یک گزینه',type:'Single_choise',icon:Single_choise},
    {text:'چند گزینه',type:'Multiple_choise',icon:Multiple_choise},
    {text:'عدد',type:'Number',icon:Number},
    {text:'تصویر',type:'Image',icon:Image},
    {text:'بارگذاری فایل',type:'Upload_file',icon:Upload_file},
    {text:'زمان',type:'Time',icon:Time},
    {text:'کپچا',type:'Captcha',icon:Captcha , describe:'(به زودی)'},
    {text:'اسپینر',type:'Spinner',icon:Spinner},
    {text:'ارسال',type:'Submit',icon:Submit},
]
const elements_survey = [
    {text:'جدول ورودی',type:'InputTable',icon:InputTable , describe:'(به زودی)'},
    {text:'نرخ ستاره',type:'StarRate',icon:StarRate , describe:'(به زودی)'},
    {text:'نرخ مقیاس',type:'ScaleRate',icon: ScaleRate , describe:'(به زودی)'}
]
const elements_page = [
    {text:'تقسیم کننده',type:'Divider',icon:Divider , describe:'(به زودی)'},
    {text:'فروپاشی بخش',type:'SectionCollapse', icon:SectionCollapse , describe:'(به زودی)'},
    {text:'شکست صفحه',type:'PageBreak',icon:PageBreak , describe:'(به زودی)'}
]
function change_menu(input){
    if(input === 'پایه'){
        basic.value = true
    }else if(input === 'پرداخت'){
        basic.value = false
        widget_payments.value = 1
    }else{
        basic.value = false
        widget_payments.value = 2
    }
}

function onDragStart(event,element){
    localStorage.setItem('name',element.type)
    const width = window.innerWidth
    if(width < 640){
        open_panel.value = false
        console.log('test');
    }
}
</script>



<template>
    <div class="left-panel">
        <div class="panel-button" @click="open_panel = true" >
            <button class="button-panel-style" :class="{panel_active : open_panel}">
                <span>اضافه کردن عنصر</span>
                <span id="plus-item">
                    <span>
                        <svg style="display: flex;" xmlns="http://www.w3.org/2000/svg" width="23" fill="#fff" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M13 5a1 1 0 1 0-2 0v6H5a1 1 0 1 0 0 2h6v6a1 1 0 1 0 2 0v-6h6a1 1 0 1 0 0-2h-6V5Z" clip-rule="evenodd"></path></svg>
                    </span>
                </span>
            </button>
        </div>
        <div class="panel-items" :class="{form_element_show: open_panel}">
            <div class="form-element">
                <div>عناصر فرم</div>
                <button @click="open_panel = false"><svg xmlns="http://www.w3.org/2000/svg" width="24" fill="currentColor" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M17.707 7.707a1 1 0 0 0-1.414-1.414L12 10.586 7.707 6.293a1 1 0 0 0-1.414 1.414L10.586 12l-4.293 4.293a1 1 0 1 0 1.414 1.414L12 13.414l4.293 4.293a1 1 0 0 0 1.414-1.414L13.414 12l4.293-4.293Z" clip-rule="evenodd"></path></svg></button>
            </div>
            <div class="option-panel">
                <button class="button-panel basic" @click="change_menu('پایه')">پایه</button>
                <button class="button-panel" :class="{basic:!basic && widget_payments ===1}" @click="change_menu('پرداخت')">پرداخت ها</button>
                <button class="button-panel" :class="{basic:!basic && widget_payments === 2}" @click="change_menu('ابزارک')">ابزارک ها</button>
            </div>
            <div class="elements" v-if="basic">
                <div class="per-element" v-for="(element, index) in elements" :key="index" draggable="true" @dragstart="onDragStart($event,element)">
                    <div class="height-and-width-icon"><component :is="element.icon"/></div>
                    <div class="hover-text-item"><span class="text-element">{{ element.text }} <span style="font-size: 10px; margin: 0 5px;">{{ element.describe }}</span></span></div>
                </div>
                <div class="comment-element"><span>عناصر پایه</span></div>
                <div class="per-element" v-for="(element, index) in elements_basic" :key="index" draggable="true" @dragstart="onDragStart($event,element)">
                    <div class="height-and-width-icon"><component :is="element.icon"/></div>
                    <div class="hover-text-item"><span class="text-element">{{ element.text }} <span style="font-size: 10px; margin: 0 5px;">{{ element.describe }}</span></span></div>
                </div>
                <div class="comment-element"><span>عناصر نظرسنجی</span></div>
                <div class="per-element" v-for="(element, index) in elements_survey" :key="index" draggable="true" @dragstart="onDragStart($event,element)">
                    <div class="height-and-width-icon"><component :is="element.icon"/></div>
                    <div class="hover-text-item"><span class="text-element">{{ element.text }} <span style="font-size: 10px; margin: 0 5px;">{{ element.describe }}</span></span></div>
                </div>
                <div class="comment-element"><span>عناصر صفحه</span></div>
                <div class="per-element" v-for="(element, index) in elements_page" :key="index" draggable="true" @dragstart="onDragStart($event,element)">
                    <div class="height-and-width-icon"><component :is="element.icon"/></div>
                    <div class="hover-text-item"><span class="text-element">{{ element.text }} <span style="font-size: 10px; margin: 0 5px;">{{ element.describe }}</span></span></div>
                </div>
            </div>
            <div class="soon" v-else>
                <span>به زودی</span>
            </div>
        </div>
    </div>
</template>

<style scoped>
.panel-button{
    top: 10rem;
    right: 0;
    position: fixed;
    z-index: 10;
}
.button-panel-style{
    display: flex;
    align-items: center;
    justify-content: left;
    background-color:#33384a;
    color: #fff;
    font-size: 14px;
    font-family: inherit;
    width: 160px;
    height: 54px;
    outline: none;
    border: none;
    border-top-left-radius: 1000px;
    border-bottom-left-radius: 1000px;
    padding: 0;
    transition: .8s ease;
}
#plus-item{
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 54px;
    height: 54px;
    background-color: #33384a;
}
#plus-item span{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    z-index: 1001;
}
#plus-item::before{
    content: "";
    background-color: #000;
    pointer-events: none;
    border-radius: 50%;
    width: 54px;
    height: 54px;
    animation: 2s infinite animPulse;
    display: inline-block;
    position: absolute;
    bottom: 0;
    left: 0;
}
#plus-item::after{
    content: "";
    background-color: #000;
    pointer-events: none;
    border-radius: 50%;
    width: 54px;
    height: 54px;
    animation: 4s infinite animPulse;
    display: inline-block;
    position: absolute;
    bottom: 0;
    left: 0;
}

.panel_active{
    transform: translateX(200px);
    transition: .8s ease;
}
.form_element_show{
    transform: translateX(-320px);
    transition: .8s ease;
}
.panel-items{
    display: flex;
    flex-direction: column;
    background-color: #33384a;
    width: 320px;
    position: fixed;
    right:-320px;
    height: 100%;
    transition: .8s ease;
    z-index: 10;
}
.form-element{
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 16px 0 8px;
    height: 56px;
    color: #fff;
}
.form-element button{
    background-color: inherit;
    border: none;
    outline: none;
    color: #fff;
    display: flex;

}
.form-element div{
    font-size: 18px;
    width: 100%;
    display: flex;
}
.option-panel{
    display: flex;
    align-items: center;
    height: 48px;
}
.button-panel{
    height: 100%;
    background-color: #292d3c;
    border: none;
    outline: none;
    color: #bfc3ce;
    font-family: inherit;
    width: 106px;
    font-size: 14px;
    border-bottom: .25rem solid #292d3c;
    border-radius: 1px;
}
.basic{
    border-bottom: .25rem solid rgb(255, 97, 0);
    color: #fff;
}
.button-panel:hover{
    border-bottom: .25rem solid rgba(255, 97, 0);
    color: #fff;
}
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
.elements{
    overflow-y: auto; 
    max-height: 69%;
}
.per-element{
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    height: 56px;
    border-bottom: 1px solid ;
    border-color: rgba(76, 83, 111,0.5);
    cursor: move;
}
.per-element:hover .height-and-width-icon{
    background-color: rgba(255, 123, 28);
    transition: .5s ease;
} 
.per-element:hover .hover-text-item{
    background-color: rgba(255, 97, 0);
    transition: .5s ease;
}
.per-element div:nth-child(2){
    width: 100%;
    background-color: #33384a;
    height: 100%;
    display: flex;
    align-items: center;
}
.text-element{
    padding: 0 16px;
    font-size: 16px;
}
.height-and-width-icon{
    width: 60px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #292d3c;
}
.comment-element{
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #bfc3ce;
    font-size: 12px;
    background-color: #292d3c;
}
.soon{
    color: #fff;
    display: flex;
    justify-content: center;
    font-size: 18px;
    font-weight: 500;
    height: 69%;
    align-items: center;
}
@media (max-width: 640px){
    .button-panel-style{
        border-radius: 50%;
        width: fit-content;
    }
    .button-panel-style span:nth-child(1){
        display: none;
    }
    .panel-button{
        right: 6px;
        top: 33rem;
    }
}
</style>