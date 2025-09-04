<script setup>
import logo from '../components/logo_blue.vue';
import tugglePreview from '../components/tugglePreview.vue';
import right_panel from '../components/right_panel.vue';
import FormDesigner from '../components/FormDesigner.vue'
import setting_Heading from '../components/setting_item/Heading_main.vue'
import setting_FullName from '../components/setting_item/FullName.vue'
import setting_Heading_menu from '../components/setting_item/Heading_menu.vue'
import setting_Email from '../components/setting_item/Email.vue'
import logo_without from '../components/logo_without_b_blue.vue'
import {ref,onMounted,onUnmounted,defineAsyncComponent,shallowRef,computed ,watch} from 'vue'
import { useDebounceFn } from '@vueuse/core'
import { useRoute } from 'vue-router';
import {useFormFieldsStore} from '../../stores/FormFieldsStore'


const Form_store = useFormFieldsStore()

const route = useRoute()
const label_id_url = computed(()=> route.params.label_id)
const title_form = ref('فرم')

const fieldComponents = {
    Heading_main: defineAsyncComponent(()=> import('../components/form_element/Heading_main.vue')),
    PlaceDrop: defineAsyncComponent(()=> import('../components/form_element/PlaceDrop.vue')),
    Heading: defineAsyncComponent(()=> import('../components/form_element/Heading_menu.vue')),
    FullName: defineAsyncComponent(()=> import('../components/form_element/FullName.vue')),
    Email: defineAsyncComponent(()=> import('../components/form_element/Email.vue')),
    Address: defineAsyncComponent(()=> import('../components/form_element/Address.vue')),
    Phone: defineAsyncComponent(()=> import('../components/form_element/Phone.vue')),
    DatePicker: defineAsyncComponent(()=> import('../components/form_element/DatePicker.vue')),
    ShortText: defineAsyncComponent(()=> import('../components/form_element/ShortText.vue')),
    LongText: defineAsyncComponent(()=> import('../components/form_element/LongText.vue')),
    Single_choise : defineAsyncComponent(()=> import('../components/form_element/Single_choise.vue')),
    Multiple_choise: defineAsyncComponent(()=> import('../components/form_element/Multiple_choise.vue')),
    Number: defineAsyncComponent(()=> import('../components/form_element/Number.vue')),
    Image: defineAsyncComponent(()=> import('../components/form_element/Image.vue')),
    Upload_file:defineAsyncComponent(()=> import('../components/form_element/Upload_file.vue')),
    Time: defineAsyncComponent(()=> import('../components/form_element/Time.vue')),
    Spinner: defineAsyncComponent(()=> import('../components/form_element/Spinner.vue')),
    Submit: defineAsyncComponent(()=> import('../components/form_element/Submit.vue')),
}
const replace_index = ref('')
const Date_created = ref(new Date())
const location_index = ref('')
const activeFieldId = ref(null)
const formSectionRef = ref(null)
const display_section = ref('')
const show_more = ref(false)
const setPassword = ref(false)
const change_type_input = ref(false)
const protection_password = ref('')
const open_setting = ref(false)
const change_status = ref(false)
const showSettingPublish = ref(false)
const accessSetting = ref('public')
const openToInvite = ref(false)
const emailPermissionCompany = ref('')
const status = ref([
    'فعال','غیرفعال','غیرفعال در محدودیت ارسال'
])
const index_status = ref(0)
const show_optionStatus = ref(false)
const select_layout = ref(false)
const item_setting = shallowRef(null)
const oldForm = ref(false)
const fieldSettingComponents = {
    Heading_main: setting_Heading,
    Heading: setting_Heading_menu,
    FullName: setting_FullName,
    Email: setting_Email,
}
const handleLiClick = (fieldId)=>{
    activeFieldId.value = fieldId;
    Form_store.show_subTitle = true
}
const handleClickOutside = (event) => {
    if(event.target.closest('.setting-menu')) return
    const isOutside = formSectionRef.value && !formSectionRef.value.contains(event.target)
    
    if(isOutside){
        activeFieldId.value = null
        Form_store.show_subTitle = false
    }
}
onMounted(() => {
    const token = localStorage.getItem('token')
    const expiresTime =  localStorage.getItem('expiry')
    if(!token || !expiresTime){
        window.location.href = '/'
        return
    }
    const now = Date.now()
    if(now > expiresTime){
        localStorage.removeItem('token')
        localStorage.removeItem('expiry')
        window.location.href  = '/'
        return
    }
  document.addEventListener('click', handleClickOutside)
  const form_id = localStorage.getItem('f_id_cat')
  if(form_id !== '' && form_id){
    get_oldForm_to_edit(form_id)
  }else{
    first_build()
  }
  
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})

function ondragover(event){
    event.preventDefault();
}
function remove_PlaceDrop(){
    const index_PlaceDrop = Form_store.fields.findIndex(field => field.type === 'PlaceDrop')
    if(index_PlaceDrop !== -1){
        Form_store.fields.splice(index_PlaceDrop,1)
        return 1;
    }  
}
function onDragStart(event,element,index){
    localStorage.setItem('name',element.type)
    replace_index.value = index
}

function ondrop(event){
    event.preventDefault()
    const item = localStorage.getItem('name')
    localStorage.removeItem('name')
    if(!item){
        return
    }
    let data = {
        type:item,
    }

    let flag = remove_PlaceDrop();


    switch (item.trim()){
        case 'FullName':
            data.value = {
                fieldLabel:'نام و نام خانوادگی',
                labelAlignment:'top',
                Required:false,
                subLabels:{
                    firstName:'نام',
                    lastName:'نام خانوادگی'
                },
                PlaceHolder:{
                    firstName:'',
                    lastName:''
                }
            }
            break
        case 'Heading_main':
            data.value = {
                Header: 'فرم',
                subHeader: '',
                size:'default',
                aligment:'right',
                image:'',
                hide: false,
            }
            break
        case 'Heading':
            data.value = {
                Header: 'عنوان',
                subHeader: '',
                size:'default',
                aligment:'right',
                image:'',
                hide: false,
            }
            break
        case 'Email':
            data.value = {
                fieldLabel:'',
                labelAlignment:'top',
                Required:false,
                subLabels:'example@example.com',
                Email:''
            }
            break
        case 'Address':
            data.value = {
                Street1:'',
                Street2:'',
                City:'',
                Province:'',
                Postal:''
            }
            break
        default:
            data.value = ''
    }
    let index = location_index.value
    if(flag === 1){
        Form_store.addFields(data,index)
        return
    }
    let Ind = (+index) + 1
    if(replace_index.value !== '' && replace_index.value <= index){
        let backInd = (+index) - 1
        let item1 = Form_store.fields.splice(replace_index.value,1)[0]
        let item2 = Form_store.fields.splice(backInd,1)[0]

        Form_store.addFields(item1,backInd)
        Form_store.addFields(item2,replace_index.value)
        replace_index.value = ''
        activeFieldId.value = index
        return
    }else if(replace_index.value !== '' && replace_index.value > index){
        let item1 = Form_store.fields.splice(replace_index.value,1)[0]
        let item2 = Form_store.fields.splice(index,1)[0]

        Form_store.addFields(item1,index)
        Form_store.addFields(item2,replace_index.value)
        replace_index.value = ''
        activeFieldId.value = index
        return
    }
    Form_store.addFields(data,Ind)
}

function handleAccessSetting(){
    if(accessSetting.value === 'company' && emailPermissionCompany.value === ''){
        accessSetting.value = 'public'
        return
    }
    if(emailPermissionCompany.value && accessSetting.value !== 'company'){
        emailPermissionCompany.value = ''
    }
}
function save_index(event,index){
    location_index.value = index
}
function show_more_less(){
    show_more.value = !show_more.value
}
function save_index_status(index){
    index_status.value = index
}
function set_settingPanel(type){
    open_setting.value = true
    item_setting.value = fieldSettingComponents[type]
}

async function get_oldForm_to_edit(form_id){
    const token = localStorage.getItem('token')
    const expireTime = localStorage.getItem('expiry')
    localStorage.removeItem('f_id_cat')
    if(!token || !expireTime){
        console.log('token is not valid');
        return
    }
    const now = Date.now()
    if(now > expireTime){
        console.log('token is not valid(time out)');
        return
    }
    try{
        const response = await fetch(`/api/editForm/${form_id}`,{
            method: 'GET',
            headers : {
                Authorization : `Bearer ${token}`
            }
        })
        if(!response.ok){
            const errordata = await response.json()
            console.log(errordata.message);
        }
        const data = await response.json()
        Form_store.setEditForm(data.form)
        title_form.value = data.form.title
        oldForm.value = {_id : form_id}
    }catch(error){
        console.log(error);
    }
}
function first_build(){
    if(Form_store.fields.length !== 0){
        return
    }
    Form_store.setFields({
        type:'Heading_main',
        Header: 'فرم',
        subHeader: '',
        size:'default',
        aligment:'right',
        image:'',
        hide: false,
    })
    Form_store.setFields({
        type:'PlaceDrop'
    })
    Form_store.setFields({
        type:'Submit'
    })
}
async function save_Form(){
    const token = localStorage.getItem('token')
    if(!token){
        console.log('token not exist!');
        return
    }
    try{
        const payload = {
            title: title_form.value,
            fields : Form_store.fields,
            label_id: label_id_url.value
        }
        if(oldForm.value){
            payload.form_id = oldForm.value._id
        }
        const response = await fetch('/api/save-form',{
            method: oldForm.value ? 'PUT' : 'POST',
            headers: {
                'Content-type':'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(payload)
        })
        if(!response.ok){
            const errordata = await response.json()
            console.log(errordata.message);        
        }
        const data = await response.json()
        Date_created.value = data.createdAt || new Date()
        if(!oldForm.value && data.form_id){
            oldForm.value = {_id: data.form_id}
        }
        
    }catch(error){
        console.log(error.message);
    }
}
const debouncedSave = useDebounceFn(() => {
  save_Form()
}, 3000)

watch(() => Form_store.fields, () => {
  debouncedSave()
}, { deep: true })
</script>

<template>
    <div style="overflow: hidden;">
        <div class="header-builder">
            <logo_without class="logo-responsive-build"/>
            <div class="form-builder">
                <logo/>
                <button>فرم ساز
                    <span class="arrow-back"><svg xmlns="http://www.w3.org/2000/svg" width="12" height="100%" fill="#333" viewBox="2 0 24 24"><path fill-rule="evenodd" d="M4.293 8.293a1 1 0 0 1 1.414 0L12 14.586l6.293-6.293a1 1 0 1 1 1.414 1.414l-7 7a1 1 0 0 1-1.414 0l-7-7a1 1 0 0 1 0-1.414Z" clip-rule="evenodd"></path></svg></span>
                </button>
            </div>
            <div class="name-date">
                <div>{{ title_form }}</div>
                <div>{{ new Date(Date_created).toLocaleDateString('fa-IR') }}</div>
            </div>
            <div class="help-and-avatar">
                <ul>
                    <li>
                        <button>
                            <span>کمک</span>
                            <span><svg style="display: flex; transform: scale(-1,1);" xmlns="http://www.w3.org/2000/svg" width="15" fill="currentColor" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M12 1C5.925 1 1 5.925 1 12s4.925 11 11 11 11-4.925 11-11S18.075 1 12 1ZM9.895 9.447C10.293 8.651 11.009 8 12 8c.537 0 1.041.18 1.398.497.339.301.602.774.602 1.503 0 .47-.365.958-1.055 1.418a6.041 6.041 0 0 1-1.246.628l-.016.006h-.001a1 1 0 0 0 .634 1.897h.002l.001-.001.004-.002.011-.003.035-.012.116-.043a8.044 8.044 0 0 0 1.57-.806C14.865 12.542 16 11.531 16 10c0-1.271-.486-2.298-1.273-2.997C13.96 6.32 12.963 6 12 6 9.99 6 8.708 7.35 8.106 8.553a1 1 0 0 0 1.789.894ZM12 18a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" clip-rule="evenodd"></path></svg></span>
                        </button>
                    </li>
                </ul>
                <div id="space-avatar">
                    <div>
                        <button class="build-avatar"><img src="/build-icon.png" alt="avatar" width="45" height="45"></button>
                    </div>
                </div>
            </div>
        </div>
        <div class="navigation">
            <ul>
                <li class="hover-style">
                    <button class="change-back-hover" @click="display_section = 'ساخت'" :class="{selected: display_section === 'ساخت' || display_section === ''}">ساخت</button>
                </li>
                <li class="hover-style">
                    <button class="change-back-hover" @click="display_section = 'تنظیمات'" :class="{selected: display_section === 'تنظیمات'}">تنظیمات</button>
                </li>
                <li class="hover-style">
                    <button class="change-back-hover" @click="display_section = 'انتشار'" :class="{selected: display_section === 'انتشار'}">انتشار</button>
                </li>
            </ul> 
            <tugglePreview/>
        </div>
    
        <div class="form-page" v-if="display_section === 'ساخت' || display_section === ''">
            <right_panel/>
            <FormDesigner/>
            <component :is="item_setting" class="setting-menu" v-model="open_setting"/>
            <div class="form-container">
                <div class="form-logo">
                    <div class="form-cover">
                        <button>نماد خود را اضافه کنید +</button>
                    </div>
                </div>
                <div class="form-each">
                    <ul class="form-section" ref="formSectionRef" @dragover="ondragover" @drop="ondrop($event)" >
                        <li v-for="(field, index) in Form_store.fields" :key="index" class="per-li" @click.stop="handleLiClick(index)" draggable="true" @dragstart="onDragStart($event,field,index)">
                        
                            <component class="component-form" :is="fieldComponents[field.type]" :field="field" v-model="Form_store.fields[index]" @dragover="save_index($event,index)" :class="{active_heading: activeFieldId === index }"/>    
                            <div class="dot-icon" v-if="activeFieldId === index && field.type !== 'PlaceDrop'">
                                <span>
                                    <svg style="display: flex;" xmlns="http://www.w3.org/2000/svg" width="27" fill="currentColor" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M7 6a2 2 0 1 0 4 0 2 2 0 0 0-4 0Zm0 6a2 2 0 1 0 4 0 2 2 0 0 0-4 0Zm2 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4Zm4-14a2 2 0 1 0 4 0 2 2 0 0 0-4 0Zm0 6a2 2 0 1 0 4 0 2 2 0 0 0-4 0Zm2 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4Z" clip-rule="evenodd"></path></svg>
                                </span>
                            </div>
                            <div class="remove-setting" v-if="activeFieldId === index && field.type !== 'PlaceDrop'">
                                <button class="button-setting common" @click="set_settingPanel(field.type)"> 
                                    <svg style="display: flex; justify-content: center; align-items: center;" xmlns="http://www.w3.org/2000/svg" width="21" fill="currentColor" viewBox="0 0 24 24"><path d="M21.81 10.328a2.75 2.75 0 0 1-1.69-4.082c.442-.737.309-1.373-.13-1.81l-.426-.426c-.437-.437-1.073-.57-1.81-.13a2.75 2.75 0 0 1-4.082-1.69C13.464 1.354 12.92 1 12.302 1h-.603c-.619 0-1.162.355-1.371 1.19a2.75 2.75 0 0 1-4.082 1.69c-.737-.442-1.374-.309-1.811.128l-.426.427c-.438.437-.571 1.074-.128 1.81a2.75 2.75 0 0 1-1.692 4.083c-.832.208-1.189.75-1.189 1.37v.603c0 .619.355 1.162 1.19 1.371a2.75 2.75 0 0 1 1.69 4.082c-.442.737-.309 1.373.13 1.81l.426.426c.439.439 1.075.57 1.81.13a2.749 2.749 0 0 1 4.082 1.69c.208.835.752 1.19 1.37 1.19h.603c.619 0 1.162-.355 1.371-1.19a2.75 2.75 0 0 1 4.082-1.69c.736.44 1.371.309 1.81-.13l.426-.426c.437-.437.57-1.073.13-1.81a2.749 2.749 0 0 1 1.69-4.082c.835-.208 1.19-.752 1.19-1.37v-.603c0-.62-.358-1.163-1.19-1.371ZM12 16.125a4.125 4.125 0 1 1 0-8.25 4.125 4.125 0 0 1 0 8.25Z"></path></svg>
                                </button>
                                <button class="button-remove common" @click="Form_store.deleteField(index)"> 
                                    <svg style="display: flex; justify-content: center; align-items: center;" xmlns="http://www.w3.org/2000/svg"  width="21" fill="currentColor" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M4 5h16a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1h-2.764c-.55-.614-1.348-1-2.236-1H9a2.99 2.99 0 0 0-2.236 1H4a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1Zm.036 1.534A.5.5 0 0 1 4.535 6h14.93a.5.5 0 0 1 .5.534l-.92 13.667A3 3 0 0 1 16.052 23H7.948a3 3 0 0 1-2.993-2.799l-.92-13.667ZM10 11a1 1 0 0 0-1 1v5a1 1 0 1 0 2 0v-5a1 1 0 0 0-1-1Zm4 0a1 1 0 0 0-1 1v5a1 1 0 1 0 2 0v-5a1 1 0 0 0-1-1Z" clip-rule="evenodd"></path></svg>
                                </button>
                            </div>
                        </li>
                    </ul>
                    <div class="form-page-break" @click="var_clicked = false">
                        <button>صفحه جدید اضافه کنید +</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="setting-page" v-if="display_section === 'تنظیمات'">
            <div class="setting-container">
                <div class="header-setting">
                    <div class="gear-icon-div">
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="#fff" viewBox="0 0 24 24" width="24px"><path d="M21.81 10.328a2.75 2.75 0 0 1-1.69-4.082c.442-.737.309-1.373-.13-1.81l-.426-.426c-.437-.437-1.073-.57-1.81-.13a2.75 2.75 0 0 1-4.082-1.69C13.464 1.354 12.92 1 12.302 1h-.603c-.619 0-1.162.355-1.371 1.19a2.75 2.75 0 0 1-4.082 1.69c-.737-.442-1.374-.309-1.811.128l-.426.427c-.438.437-.571 1.074-.128 1.81a2.75 2.75 0 0 1-1.692 4.083c-.832.208-1.189.75-1.189 1.37v.603c0 .619.355 1.162 1.19 1.371a2.75 2.75 0 0 1 1.69 4.082c-.442.737-.309 1.373.13 1.81l.426.426c.439.439 1.075.57 1.81.13a2.749 2.749 0 0 1 4.082 1.69c.208.835.752 1.19 1.37 1.19h.603c.619 0 1.162-.355 1.371-1.19a2.75 2.75 0 0 1 4.082-1.69c.736.44 1.371.309 1.81-.13l.426-.426c.437-.437.57-1.073.13-1.81a2.749 2.749 0 0 1 1.69-4.082c.835-.208 1.19-.752 1.19-1.37v-.603c0-.62-.358-1.163-1.19-1.371ZM12 16.125a4.125 4.125 0 1 1 0-8.25 4.125 4.125 0 0 1 0 8.25Z"></path></svg>
                        </span>
                    </div>
                    <div class="text-setting">
                        <h2>تنظیمات فرم</h2>
                        <span>شخصی سازی وضعیت و ویژگی های فرم</span>
                    </div>
                </div>
                <form class="setting-box">
                    <div class="per-item-setting title-setting">
                        <div>عنوان</div>
                        <div>
                            <p>نامی برای فرم خود وارد کنید</p>
                            <input type="text" v-model="title_form" @input="save_Form()">
                        </div>
                    </div>
                    <hr>
                    <div class="per-item-setting  status-setting">
                        <div>وضعیت فرم</div>
                        <div>
                            <p>فعالسازی ، غیرفعالسازی یا فعالسازی با شرایط خاص فرم</p>
                            <button @click.prevent="change_status = true">
                                <div style="display: flex; width: 32px; height: 32px;
                                justify-content: center; align-items: center; background-color: #64b200; border-radius: 4px; padding: 5px;">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="#fff" viewBox="0 0 24 24" width="30" height="21"><path fill-rule="evenodd" d="M21 20v-6.5a7.46 7.46 0 0 1-3.918 1.478A1.14 1.14 0 0 1 16.36 17H7.64a1.14 1.14 0 0 1 0-2.28h6.823a7.484 7.484 0 0 1-2.907-1.58H7.64a1.14 1.14 0 0 1 0-2.28h2.153a7.448 7.448 0 0 1-.58-1.58H7.64a1.14 1.14 0 0 1 0-2.28h1.376a7.5 7.5 0 0 1 3.74-6H6a3 3 0 0 0-3 3v16a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3Zm1-12.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0Zm-2.293-2.207a1 1 0 0 1 0 1.414l-3 3a1 1 0 0 1-1.414 0l-1.5-1.5a1 1 0 0 1 1.414-1.414l.793.793 2.293-2.293a1 1 0 0 1 1.414 0Z" clip-rule="evenodd"></path></svg>
                                </div>
                                <div>
                                    <span id="status-text">{{ status[index_status] }}</span>
                                    <span id="status-comment">فرم شما درحال حاضر فعال است</span>
                                </div>
                                <div style="display: flex;">    
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" width="20" height="20" style="fill: rgb(197, 197, 197); transform: rotate(180deg);"><path fill-rule="evenodd" d="M12 23c6.075 0 11-4.925 11-11S18.075 1 12 1 1 5.925 1 12s4.925 11 11 11Zm-1.707-7.707a1 1 0 1 0 1.414 1.414l4-4a1 1 0 0 0 0-1.414l-4-4a1 1 0 1 0-1.414 1.414L13.586 12l-3.293 3.293Z" clip-rule="evenodd"></path></svg>
                                </div>
                            </button>
                        </div>
                        <div class="overal-screen" v-if="change_status">
                            <div class="box-select-status">
                                <div class="form-status">
                                    <div class="header-box-status">
                                        <div class="status-div-icon">
                                            <svg width="22" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" role="presentation"><path fill-rule="evenodd" d="M6 1h12a3 3 0 0 1 3 3v9.757l-.879-.878a2.996 2.996 0 0 0-2.622-.837L17.5 12c0-.63-.51-1.14-1.14-1.14H7.64a1.14 1.14 0 0 0 0 2.28h8.006a2.987 2.987 0 0 0-.633 1.58H7.64a1.14 1.14 0 0 0 0 2.28h4.53A3 3 0 0 0 15 21c0 .716.255 1.432.764 2H6a3 3 0 0 1-3-3V4a3 3 0 0 1 3-3Zm1.64 6a1.14 1.14 0 0 0 0 2.28h8.72a1.14 1.14 0 0 0 0-2.28H7.64ZM15 17a1 1 0 1 0 0 2h3.586l-1.293 1.293a1 1 0 0 0 1.414 1.414l3-3a1 1 0 0 0 0-1.414l-3-3a1 1 0 0 0-1.414 1.414L18.586 17H15Z" clip-rule="evenodd"></path></svg>
                                        </div>
                                        <div class="status-div-text">
                                            <h1>
                                                وضعیت فرم
                                            </h1>
                                            <p id="p-in-status-div">
                                                وضعیتی برای فرم خود انتخاب کنید
                                            </p>
                                        </div>
                                        
                                        <button id="close-box-status" @click.prevent="change_status= false">
                                            <span>
                                                <svg style="display: flex;" width="22" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" class="magnet-button-icon shrink-0 w-5 h-5"><path fill-rule="evenodd" d="M17.707 7.707a1 1 0 0 0-1.414-1.414L12 10.586 7.707 6.293a1 1 0 0 0-1.414 1.414L10.586 12l-4.293 4.293a1 1 0 1 0 1.414 1.414L12 13.414l4.293 4.293a1 1 0 0 0 1.414-1.414L13.414 12l4.293-4.293Z" clip-rule="evenodd"></path></svg>
                                            </span>
                                        </button>
                                    
                                    </div>
                                    <div class="overflow-status">
                                        <h3>وضعیت فرم</h3>
                                        <p style="color:#6c73a8; font-size: 14px;">فعال ، غیرفعال یا فعال با شرایط خاص</p>
                                        <button id="overflow-button" @click.prevent="show_optionStatus = !show_optionStatus">
                                            <span style="font-size: 14px; color: var(--jfv-google-apple-blue); font-weight: 600;">{{ status[index_status] }}</span>
                                            <span>
                                                <svg style="display: flex; color: rgba(10, 21, 81); transition: .3s ease;" width="20" :class="{rotate_arrow_status:show_optionStatus}" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M7.293 10.293a1 1 0 0 1 1.414 0L12 13.586l3.293-3.293a1 1 0 1 1 1.414 1.414l-4 4a1 1 0 0 1-1.414 0l-4-4a1 1 0 0 1 0-1.414Z" clip-rule="evenodd"></path></svg>
                                            </span>
                                        </button>
                                        <div class="option-status" v-if="show_optionStatus">
                                            <span class="per-option-status" v-for="(item,index) in status" :key="index" :class="{active_option_status: index_status === index}" @click="save_index_status(index),show_optionStatus = !show_optionStatus">{{ item}}</span>
                                        </div>
                                    </div>
                                    <div class="save-cancel-status">
                                        <button id="cancel-id">لغو</button>
                                        <button id="save-id">ذخیره</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr>
                    <div class="per-item-setting protection-password" v-if="show_more">
                        <div>رمز محافظت</div>
                        <p>برای کنترل دسترسی به فرم رمز تعیین کنید</p>
                        <div class="enable-pasword">
                            <input type="checkbox" @click="setPassword = !setPassword">
                            <span style="min-width: 134px;">فعال سازی رمز محافظت</span>
                            <div v-if="setPassword" style="display: flex; justify-content:space-between; width: 100%; align-items: center;">
                                <input v-if="!change_type_input" id="pas-protection" type="password" placeholder="رمز را وارد کنید" v-model="protection_password">
                                <input v-else id="pas-protection" type="text" placeholder="رمز را وارد کنید" v-model="protection_password">
                                <div style="width: 40px;">
                                    <span class="span-show-icon">
                                        <svg @click.prevent="change_type_input = !change_type_input" style="display: flex ;" xmlns="http://www.w3.org/2000/svg" width="20" fill="#564632" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M12 4C9.277 4 7.031 5.239 5.33 6.698c-1.7 1.458-2.89 3.164-3.512 4.174-.43.697-.43 1.56 0 2.256.623 1.01 1.812 2.716 3.512 4.174C7.032 18.762 9.278 20 12 20c2.72 0 4.967-1.239 6.668-2.698 1.7-1.458 2.89-3.164 3.513-4.174a2.138 2.138 0 0 0 0-2.256c-.623-1.01-1.812-2.716-3.513-4.174C16.968 5.238 14.721 4 12 4Zm0 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm2-4a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z" clip-rule="evenodd"></path></svg>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr>
                    <div class="per-item-setting layout-form" v-if="show_more">
                        <div>طرح فرم</div>
                        <div>
                            <button @click.prevent="select_layout = !select_layout"></button>
                        </div>
                        <div class="box-layout-setting" v-if="select_layout">
                            <div id="one-page-layout">نمایش تمام سوالات در یک صفحه</div>
                            <div>نمایش هر سوال در یک صفحه مجزا</div>
                        </div>
                    </div>
                    <button class="show-more-less" @click.prevent="show_more_less()">
                        <span v-if="!show_more">نمایش بیشتر</span>
                        <span v-else>نمایش کمتر</span>
                    </button>
                </form>
            </div>
        </div>
        <div class="publish-form" v-if="display_section === 'انتشار'">
        <div class="no-access-page" v-if="showSettingPublish">
            <div class="setting-link-address-box">
                <div class="head-of-setting-link">
                    <span>تنظیمات</span>
                    <button class="close-add-label" @click="showSettingPublish = false , handleAccessSetting()">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" fill="currentColor" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M17.707 7.707a1 1 0 0 0-1.414-1.414L12 10.586 7.707 6.293a1 1 0 0 0-1.414 1.414L10.586 12l-4.293 4.293a1 1 0 1 0 1.414 1.414L12 13.414l4.293 4.293a1 1 0 0 0 1.414-1.414L13.414 12l4.293-4.293Z" clip-rule="evenodd"></path></svg>
                    </button>
                </div>
                <div class="access-settings-form">
                    <div>
                        <div>سطح دسترسی</div>
                        <ul style="padding: 12px 0 0;">
                            <li :class="{active_private:accessSetting === 'private'}" class="each-access-mode-style" @click="accessSetting = 'private'">
                                <div>
                                    <svg :class="{active_private:accessSetting === 'private'}" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" width="24" height="24" style="margin: 0px 14px;"><path fill-rule="evenodd" d="M9.5 7.5a2.5 2.5 0 0 1 5 0V10h-5V7.5Zm-3 2.5V7.5a5.5 5.5 0 1 1 11 0V10h.5a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h.5Z" clip-rule="evenodd"></path></svg>
                                </div>
                                <div class="two-comment-access">
                                    <span>فرم خصوصی</span>
                                    <span>فقط برای افراد دعوت شده دردسترس است</span>
                                </div>
                                <div class="tick-selected-access-mode" v-if="accessSetting === 'private'">
                                    <svg width="25" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M12 23c6.075 0 11-4.925 11-11S18.075 1 12 1 1 5.925 1 12s4.925 11 11 11Zm5.707-13.293a1 1 0 0 0-1.414-1.414L11 13.586l-2.293-2.293a1 1 0 0 0-1.414 1.414l3 3a1 1 0 0 0 1.414 0l6-6Z" clip-rule="evenodd"></path></svg>
                                </div>
                            </li>
                            <li :class="{active_public:accessSetting === 'public'}" class="each-access-mode-style" @click="accessSetting = 'public'">
                                <div>
                                    <svg :class="{active_public:accessSetting === 'public'}" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" width="24" height="24" style="margin: 0px 14px;"><path fill-rule="evenodd" d="M9.5 7.5A2.5 2.5 0 0 1 12 5h.5a2 2 0 0 1 1.861 1.267c.152.386.475.733.889.733 1.243 0 2.295-1.057 1.753-2.175A5 5 0 0 0 12.5 2H12a5.5 5.5 0 0 0-5.5 5.5V10H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2H9.5V7.5Z" clip-rule="evenodd"></path></svg>
                                </div>
                                <div class="two-comment-access">
                                    <span>فرم عمومی</span>
                                    <span>برای همه دردسترس است</span>
                                </div>
                                <div class="tick-selected-access-mode" v-if="accessSetting === 'public'"> 
                                    <svg width="25" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M12 23c6.075 0 11-4.925 11-11S18.075 1 12 1 1 5.925 1 12s4.925 11 11 11Zm5.707-13.293a1 1 0 0 0-1.414-1.414L11 13.586l-2.293-2.293a1 1 0 0 0-1.414 1.414l3 3a1 1 0 0 0 1.414 0l6-6Z" clip-rule="evenodd"></path></svg>
                                </div>
                            </li>
                            <li :class="{active_company: accessSetting === 'company'}" class="each-access-mode-style" @click="accessSetting = 'company'">
                                <div>
                                    <svg :class="{active_company:accessSetting === 'company'}" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" width="24" height="24" style="margin: 0px 14px;"><path fill-rule="evenodd" d="M6 3a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1h1a3 3 0 0 1 3 3v4h1a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1 3 3 0 0 1 3 3v7a1 1 0 1 1 0 2H2a1 1 0 1 1 0-2V6a3 3 0 0 1 3-3h1Zm7 8v9h-2.5v-3a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v3H4V6a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v5Zm7 2v7h-1v-1.5a1 1 0 0 0-1-1h-1a1 1 0 0 0-1 1V20h-1v-8h4a1 1 0 0 1 1 1ZM5.5 9a1 1 0 1 0 2 0V8a1 1 0 0 0-2 0v1Zm5 1a1 1 0 0 1-1-1V8a1 1 0 1 1 2 0v1a1 1 0 0 1-1 1Zm6 5a1 1 0 1 0 2 0v-1a1 1 0 1 0-2 0v1Zm-6-1a1 1 0 0 1-1-1v-1a1 1 0 1 1 2 0v1a1 1 0 0 1-1 1Zm-5-1a1 1 0 1 0 2 0v-1a1 1 0 1 0-2 0v1Z" clip-rule="evenodd"></path></svg>
                                </div>
                                <div class="two-comment-access">
                                    <span>دسترسی شرکت</span>
                                    <span>فقط برای اعضا ارگان شما دردسترس است</span>
                                </div>
                                <div class="tick-selected-access-mode" v-if="accessSetting === 'company'">
                                    <svg width="25" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M12 23c6.075 0 11-4.925 11-11S18.075 1 12 1 1 5.925 1 12s4.925 11 11 11Zm5.707-13.293a1 1 0 0 0-1.414-1.414L11 13.586l-2.293-2.293a1 1 0 0 0-1.414 1.414l3 3a1 1 0 0 0 1.414 0l6-6Z" clip-rule="evenodd"></path></svg>
                                </div>
                            </li>
                            <div style="height: 10px;" class="line-in-link-publish" v-if="accessSetting"></div>
                            <li style="padding: 10px 0;" v-if="accessSetting === 'company'">
                                <div>سطح دسترسی شرکت</div>
                                <div class="company-permission">
                                    <span>نیاز به دامنه ایمیل سازمانی</span>
                                    <span class="email-permission">
                                        <input type="email" placeholder="example.com" v-model="emailPermissionCompany">
                                    </span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
            <div class="publish-container">
                <div class="direct-link-header">
                    <div style="width: fit-content;">
                        <span class="svg-direct-link-span">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="#fff" viewBox="0 0 24 24" width="24px"><path fill-rule="evenodd" d="M17.959 6.04a3.714 3.714 0 0 1 0 5.253l-1.334 1.334a1 1 0 0 0 1.415 1.414l1.333-1.334a5.714 5.714 0 1 0-8.08-8.08L9.958 5.96a1 1 0 1 0 1.414 1.414l1.333-1.333a3.714 3.714 0 0 1 5.253 0Zm-10 10a1 1 0 0 1 0-1.414l6.667-6.667a1 1 0 1 1 1.414 1.414L9.374 16.04a1 1 0 0 1-1.415 0ZM6.04 12.707a3.714 3.714 0 0 0 5.252 5.252l1.334-1.333a1 1 0 1 1 1.414 1.414l-1.333 1.333a5.714 5.714 0 1 1-8.081-8.08l1.333-1.334a1 1 0 1 1 1.414 1.414L6.04 12.707Z" clip-rule="evenodd"></path></svg>
                        </span>
                    </div>
                    <div class="title-in-direct-link">
                        <h2>لینک مستقیم از فرم شما</h2>
                        <span>فرم شما به شکل امن برای اشتراک گذاری و استفاده از طریق لینک زیر دردسترس است</span>
                    </div>
                </div>
                <div class="each-box-in-publish">
                    <div class="inside-each-box-in-publish">
                        <div class="each-box-in-publish-head" v-if="!openToInvite">
                            <h2>اشراک گذاری با آدرس</h2>
                            <div @click="showSettingPublish = true">
                                <div v-if="accessSetting === 'private'" class="private-access-style">
                                    <span>
                                        <svg style="display: flex; justify-content: center;" width="14" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M9.5 7.5a2.5 2.5 0 0 1 5 0V10h-5V7.5Zm-3 2.5V7.5a5.5 5.5 0 1 1 11 0V10h.5a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h.5Z" clip-rule="evenodd"></path></svg>
                                    </span>
                                    <span>فرم خصوصی</span>
                                </div>
                                <div v-else-if="accessSetting === 'company'" class="company-access-style">
                                    <span>
                                        <svg style="display: flex; justify-content: center;" width="14" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M6 3a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1h1a3 3 0 0 1 3 3v4h1a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1 3 3 0 0 1 3 3v7a1 1 0 1 1 0 2H2a1 1 0 1 1 0-2V6a3 3 0 0 1 3-3h1Zm7 8v9h-2.5v-3a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v3H4V6a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v5Zm7 2v7h-1v-1.5a1 1 0 0 0-1-1h-1a1 1 0 0 0-1 1V20h-1v-8h4a1 1 0 0 1 1 1ZM5.5 9a1 1 0 1 0 2 0V8a1 1 0 0 0-2 0v1Zm5 1a1 1 0 0 1-1-1V8a1 1 0 1 1 2 0v1a1 1 0 0 1-1 1Zm6 5a1 1 0 1 0 2 0v-1a1 1 0 1 0-2 0v1Zm-6-1a1 1 0 0 1-1-1v-1a1 1 0 1 1 2 0v1a1 1 0 0 1-1 1Zm-5-1a1 1 0 1 0 2 0v-1a1 1 0 1 0-2 0v1Z" clip-rule="evenodd"></path></svg>
                                    </span>
                                    <span>دسترسی شرکت</span>
                                </div>
                                <div v-else class="public-access-style">
                                    <span>
                                        <svg style="display: flex; justify-content: center;" width="14" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M9.5 7.5A2.5 2.5 0 0 1 12 5h.5a2 2 0 0 1 1.861 1.267c.152.386.475.733.889.733 1.243 0 2.295-1.057 1.753-2.175A5 5 0 0 0 12.5 2H12a5.5 5.5 0 0 0-5.5 5.5V10H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2H9.5V7.5Z" clip-rule="evenodd"></path></svg>
                                    </span>
                                    <span>فرم عمومی</span>
                                </div>
                            </div>
                            <button class="setting-in-publish-head" @click="showSettingPublish = true">
                                <span>
                                    <svg style="display: flex;justify-content: center;align-items: center;" width="16.5" xmlns="http://www.w3.org/2000/svg" fill="#4573E3" viewBox="0 0 24 24"><path d="M21.81 10.328a2.75 2.75 0 0 1-1.69-4.082c.442-.737.309-1.373-.13-1.81l-.426-.426c-.437-.437-1.073-.57-1.81-.13a2.75 2.75 0 0 1-4.082-1.69C13.464 1.354 12.92 1 12.302 1h-.603c-.619 0-1.162.355-1.371 1.19a2.75 2.75 0 0 1-4.082 1.69c-.737-.442-1.374-.309-1.811.128l-.426.427c-.438.437-.571 1.074-.128 1.81a2.75 2.75 0 0 1-1.692 4.083c-.832.208-1.189.75-1.189 1.37v.603c0 .619.355 1.162 1.19 1.371a2.75 2.75 0 0 1 1.69 4.082c-.442.737-.309 1.373.13 1.81l.426.426c.439.439 1.075.57 1.81.13a2.749 2.749 0 0 1 4.082 1.69c.208.835.752 1.19 1.37 1.19h.603c.619 0 1.162-.355 1.371-1.19a2.75 2.75 0 0 1 4.082-1.69c.736.44 1.371.309 1.81-.13l.426-.426c.437-.437.57-1.073.13-1.81a2.749 2.749 0 0 1 1.69-4.082c.835-.208 1.19-.752 1.19-1.37v-.603c0-.62-.358-1.163-1.19-1.371ZM12 16.125a4.125 4.125 0 1 1 0-8.25 4.125 4.125 0 0 1 0 8.25Z"></path></svg>
                                </span>
                                <span>تنظیمات</span>
                            </button>
                        </div>
                        <div class="linkBox" v-if="!openToInvite">
                            <button class="edit-link-button">
                                <svg width="18px" style="display: flex; justify-content: center; align-items: center;" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M18.715 2.586a2 2 0 0 0-2.829 0L3.782 14.69a2 2 0 0 0-.499.83l-1.189 3.888c-.468 1.532.966 2.966 2.498 2.497l3.888-1.19a2 2 0 0 0 .829-.498L21.414 8.113a2 2 0 0 0 0-2.828l-2.7-2.7Zm-2.909 2.908L17.301 4l2.698 2.699-1.494 1.494-2.699-2.699Z" clip-rule="evenodd"></path></svg>
                            </button>
                            <div class="link">
                                http://localhost:form/23423524
                            </div>
                            <div style="display: flex;margin: 0 10px;">
                                <svg width="20" style="display: flex; justify-content: center;align-items: center;" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M17.959 6.04a3.714 3.714 0 0 1 0 5.253l-1.334 1.334a1 1 0 0 0 1.415 1.414l1.333-1.334a5.714 5.714 0 1 0-8.08-8.08L9.958 5.96a1 1 0 1 0 1.414 1.414l1.333-1.333a3.714 3.714 0 0 1 5.253 0Zm-10 10a1 1 0 0 1 0-1.414l6.667-6.667a1 1 0 1 1 1.414 1.414L9.374 16.04a1 1 0 0 1-1.415 0ZM6.04 12.707a3.714 3.714 0 0 0 5.252 5.252l1.334-1.333a1 1 0 1 1 1.414 1.414l-1.333 1.333a5.714 5.714 0 1 1-8.081-8.08l1.333-1.334a1 1 0 1 1 1.414 1.414L6.04 12.707Z" clip-rule="evenodd"></path></svg>
                            </div>
                        </div>
                        <div class="button-in-publish-container" v-if="!openToInvite">
                            <router-link to="/form/2423542" target="_blank">نمایش در صفحه دیگر</router-link>
                            <button>کپی آدرس</button>
                        </div>
                        <div class="line-in-link-publish" v-if="!openToInvite"></div>
                        <div>
                            <div class="invite-with-email">
                                <h2>دعوت با ایمیل</h2>
                                <span>
                                    <svg width="16" style="display: flex;justify-content: center;align-items: center;" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M17.707 8.707a1 1 0 0 1-1.414 0L13 5.414V15a1 1 0 0 1-2 0V5.414L7.707 8.707a1 1 0 0 1-1.414-1.414l5-5a1 1 0 0 1 1.414 0l5 5a1 1 0 0 1 0 1.414ZM4 16a1 1 0 1 0-2 0v3a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3v-3a1 1 0 1 0-2 0v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-3Z" clip-rule="evenodd"></path></svg>
                                </span>
                            </div>
                            <div class="email-address-box-to-invite" @click="openToInvite = true">
                                <span>
                                    <svg width="20" style="display: flex;justify-content: center;align-items: center;margin: 11px;" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fill-rule="evenodd" d="M1 7.52V18a3 3 0 0 0 3 3h16a3 3 0 0 0 3-3V7.52l-9.28 6.496a3 3 0 0 1-3.44 0L1 7.521Zm21.881-2.358A3.001 3.001 0 0 0 20 3H4a3.001 3.001 0 0 0-2.881 2.162l10.308 7.216a1 1 0 0 0 1.146 0l10.308-7.216Z" clip-rule="evenodd"></path></svg>
                                </span>
                                <span>به:</span>
                                <div class="input-box-to-email-invite">
                                    <input type="email" placeholder="آدرس ایمیل را برای دعوت وارد کنید">
                                </div> 
                            </div>
                            <div v-if="openToInvite" class="invitation-message">
                                <textarea maxlength="100" placeholder="متن دعوت را وارد کنید (اختیاری)"></textarea>
                            </div>
                            <div v-if="openToInvite" class="button-to-invitation">
                                <button @click="openToInvite = false">لغو</button>
                                <button>ارسال دعوت</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="direct-link-header" style="margin: 30px 0 0;">
                    <div class="pdf-svg-publish">
                        <svg style="display: flex;justify-content: center;align-items: center;" xmlns="http://www.w3.org/2000/svg" fill="#fff" viewBox="0 0 24 24" width="24px"><path fill-rule="evenodd" d="M3 20V4a3 3 0 0 1 3-3h7.756a2 2 0 0 1 1.425.596l5.243 5.32A2 2 0 0 1 21 8.32V20a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3ZM15 6V3l4 4h-3a1 1 0 0 1-1-1Zm-8.874 8.152v1.744c0 .037.024.061.072.072.181.021.325.032.432.032.384 0 .68-.088.888-.264.213-.181.32-.432.32-.752 0-.635-.403-.952-1.208-.952-.133 0-.28.013-.44.04-.043.01-.064.037-.064.08Zm-.88 4.768a.438.438 0 0 1-.32-.136.438.438 0 0 1-.136-.32v-4.888a.52.52 0 0 1 .128-.344.454.454 0 0 1 .32-.168A14 14 0 0 1 6.55 13c1.707 0 2.56.635 2.56 1.904 0 .688-.2 1.21-.6 1.568-.395.352-.976.528-1.744.528-.203 0-.392-.008-.568-.024-.048 0-.072.021-.072.064v1.424c0 .123-.045.23-.136.32a.438.438 0 0 1-.32.136h-.424Zm6.016-1.104c0 .048.021.077.064.088.107.021.235.032.384.032 1.13 0 1.696-.672 1.696-2.016 0-1.237-.565-1.856-1.696-1.856-.15 0-.277.01-.384.032-.043.01-.064.04-.064.088v3.632Zm-.88 1.12a.495.495 0 0 1-.328-.16.53.53 0 0 1-.128-.352v-4.848a.5.5 0 0 1 .128-.344c.09-.101.2-.157.328-.168A11.9 11.9 0 0 1 11.606 13c.981 0 1.741.259 2.28.776.544.512.816 1.227.816 2.144 0 .981-.272 1.741-.816 2.28-.539.533-1.299.8-2.28.8-.4 0-.808-.021-1.224-.064Zm5.312-.152c.09.09.197.136.32.136h.456a.412.412 0 0 0 .312-.136.438.438 0 0 0 .136-.32V16.6c0-.048.024-.072.072-.072h1.608a.452.452 0 0 0 .456-.448v-.128a.412.412 0 0 0-.136-.312.438.438 0 0 0-.32-.136H16.99c-.048 0-.072-.024-.072-.072V14.24c0-.043.024-.064.072-.064h1.768c.123 0 .23-.045.32-.136a.438.438 0 0 0 .136-.32v-.184a.438.438 0 0 0-.136-.32.438.438 0 0 0-.32-.136h-2.744a.438.438 0 0 0-.32.136.438.438 0 0 0-.136.32v4.928c0 .123.045.23.136.32Z" clip-rule="evenodd"></path></svg>
                    </div>
                    <div class="title-in-direct-link">
                        <h2>پی دی اف</h2>
                        <span>دانلود فایل به شکل پی دی اف</span>
                    </div>
                </div>
                <div class="each-box-in-publish">
                    <div class="inside-each-box-in-publish inside-pdf-box">
                        <div class="head-pdf-download">
                            <h2>دانلود فایل</h2>
                            <span>دانلود فرم در قالب پی دی اف</span>
                        </div>
                        <button>
                            <span>
                                <svg style="display: flex;justify-content: center;align-items: center;" width="20" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M13 3a1 1 0 1 0-2 0v11.586l-4.293-4.293a1 1 0 1 0-1.414 1.414l6 6a1 1 0 0 0 1.414 0l6-6a1 1 0 0 0-1.414-1.414L13 14.586V3ZM2 21a1 1 0 0 1 1-1h18a1 1 0 1 1 0 2H3a1 1 0 0 1-1-1Z" clip-rule="evenodd"></path></svg>
                            </span>
                            <span>دانلود</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<style setup>
hr{
    margin: 0;
    border: 1px solid #ece9e6;
}
.per-li{
    position: relative;
    padding: 0 35px;
}
.form-container{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.setting-container{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 20px 5px 10px;
    margin: 30px 0;  
}
.build-avatar{
    background-color: rgba(58, 60, 67, .65);
    border-radius: 50%;
    width: 48px;
    height: 48px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 2px solid var(--jfv-orange-font-dark);
}
.header-builder{
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 0 0 25px;
    height: 70px;
    background-color: #fff;
}
.form-builder button::before{
    content: "";
    border-left: 1px solid #e3e5f5;
    height: 24px;
    margin: 0 8px;
}
.form-builder{
    margin: 0 8px;
    height: 100%;
    display: flex;
    align-items: center;
}
.form-builder button{
    background-color: inherit;
    font-family: inherit;
    color: var(--jfv-google-apple-blue);
    font-size: 16px;
    display: flex;
    border: none;
    padding: 0 8px;
    height: 100%;
    display: flex;
    align-items: center;
}
.name-date{
    display: flex;
    flex-direction: column;
    width: 15%;
    margin: 0 0 0 130px;
}
.name-date div{
    display: flex;
    justify-content: center;
    width: 100%;
    direction: ltr;
    margin: 2px 0;
    padding: 1px ;
}
.name-date div:nth-child(1){
    font-size: 20px;
    color: var(--jfv-google-apple-blue);
    font-weight: bolder;
}
.name-date div:nth-child(2){
    font-size: 14px;
    color: #78bb07;
}
.help-and-avatar{
    display: flex;
    align-items: center;
    height: 100%;
}
.help-and-avatar ul{
    display: flex;
}
.help-and-avatar ul li{
    width: 70px;
    height: 30px;
}
.help-and-avatar ul li button{
    padding: 0 8px;
    font-family: inherit;
    background-color: #dadef3;
    border: none;
    border-radius: 100px;
    font-size: 14px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5px;
    color: rgba(52, 60, 106);  
    width: 100%;
    height: 32px;
}
#space-avatar{
    border-right: 1px solid #e3e5f5;
    margin: 0 20px 0 0;
    padding: 0 20px 0 0;
}
.navigation{
    background: linear-gradient(270deg, #ff6100 0%, #ffb841 99.97%);
    height: 44px;
    display: flex;
}
.navigation ul{
    display: flex;
    align-items: center;
    justify-content: center;
    width: 89%;
}
.navigation ul li , .navigation ul li a{
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.navigation ul li:nth-child(1){
    margin: 0 185px 0 0 ;
}
.navigation ul li a{
    padding: 0 28px;
    color: #fff;
    font-size: 18px;
    opacity: .7;
}
.change-back-hover{
    width: 120px;
    height: 100%;
    background-color: inherit;
    outline: none;
    border: none;
    font-family: inherit;
    font-size: 18px;
    color: #fff;
    opacity: .7;
}
.hover-style:hover .change-back-hover{
    background-color: rgba(255, 255, 255, var(--bg-opacity, 1));
    transition: .3s ease;
    opacity: 1;
}
.form-page{
    padding: 0 36px 50px;
    background-color: #F3F3FE;
    height: calc(100vh - 100px);
    overflow: auto;
    position: fixed;
    width: 100%;
}
.setting-page{
    padding: 0 36px 50px;
    background-color: #F3F3FE;
    height: calc(100vh - 100px);
    overflow: auto;
    position: fixed;
    left: 0;
    width: 100%;
}
.header-setting{
    margin: 0 0 24px;
    height: 40px;
    width: 660px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.text-setting{
    display: flex;
    flex-direction: column;
    align-items: right;
    font-size: 14px;
    width: 100%;
    padding: 0 20px;
    color: #6f76a7;
}
.gear-icon-div{
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
}
.gear-icon-div span{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    background-color: #ff6100;
    border-radius: 4px;
}
.text-setting h2{
    margin: 0;
    font-size: 18px;
    color: #0a1551;
}
.setting-box{
    width: 658.4px;
    background-color: #fff;
    border: 1px solid #f2f2f2;
    border-radius: 4px;
    box-shadow: inset 0 0 1px #bfbfbf;
    position: relative;
}
.per-item-setting{
    display: flex;
    flex-direction: column;
    padding: 30px;
}
.title-setting{
    height: 153.3px;
}
.title-setting div:nth-child(1){
    color: #596066;
    font-size: 17px;
}
.title-setting div p{
    color: #596066;
    font-size: 14px;
    margin: 7px 0 10px;
}
.title-setting div input{
    height: 38px;
    width: 179.2px;
    border-radius: 4px;
    outline: none;
    border: 1px solid #c5c5c5;
    font-size: 16px;
    padding: 3px 7px;
    font-family: inherit;
}
.form-logo{
    padding: 32px 0 0;
    margin: 0  0 32px;
    width: 768px;
}
.form-cover{
    display: flex;
    align-items: center;
    justify-content: center;
}
.form-cover::before , .form-cover::after{
    content: '';
    position: relative;
    vertical-align: middle;
    border-color: #c8ceed;
    border-bottom-style: dashed;
    border-bottom-width: 2px;
    width: 50%;
    height: 1px;
    margin-top: -2px;
    display: inline-block;
    padding: 0 8px; 
}
.form-page-break::before , .form-page-break::after{
    content: '';
    position: relative;
    vertical-align: middle;
    border-color: #c8ceed;
    border-bottom-style: dashed;
    border-bottom-width: 2px;
    width: 50%;
    height: 1px;
    margin-top: -2px;
    display: inline-block;
    padding: 0 8px;  
}
.form-cover button , .form-page-break button{
    font-family: inherit;
    background-color: inherit;
    outline: none;
    border: none;  
    font-size: 12px;
    color: #636a96;
    padding:4px 8px;
    margin: 0 8px;
    width: 25%;
    border-radius: 5px;
}
.form-cover button:hover , .form-page-break button:hover{
    color: #fff;
    background-color: #c8ceed;
    transition: .3s ease;
}
.form-page-break{
    margin: 0 348px;
    display: flex;
    align-items: center;
    justify-content: center;
}
.form-each{
    color: #2c3345;
}
.form-section{
    width: 768px;
    margin: 0 348px 30px;
    box-shadow: 0 4px 4px rgba(87, 100, 126, .21);
    background-color: #fff;
    border-radius: 3px;
    font-size: 16px;
    height: fit-content;
}
.dot-icon{
    position: absolute;
    width: 24px;
    height: 24px;
    left: 45px;
    top: 47%;
    transform: translateY(-50%);
}
.dot-icon span {
    color: rgb(44, 51, 69 , 0.5);
}
.remove-setting{
    position: absolute;
    width: 36px;
    height:96px;
    z-index: 200;
    left: -5px;
    top: 50%;
    transform: translateY(-50%);
}
.common{
    border: none;
    color: #fff;
    margin: 0 0 8px;
    padding: 0 10px;
    height: 40px;
    width: 40px;
}
.button-setting{
    background-color: #33384a;
    border-radius: 50%;
}
.button-remove{
    background-color: #dc2626;
    border-radius: 50%;
}
.selected{
    background-color: rgba(255, 255, 255, var(--bg-opacity, 1));
    color: #fff;
    opacity: 1;
}
.status-setting{
    height: 178.9px;
}
.status-setting div:nth-child(1){
    color: #596066;
    font-size: 17px;
}
.status-setting div p{
    color: #596066;
    font-size: 14px;
    margin: 7px 0 10px;
}
.status-setting div button{
    border: 1px solid rgb(197, 197, 197);
    border-radius: .25rem;
    background-color: inherit;
    font-family: inherit;
    outline: none;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content:space-between;
    padding: 12px 16px;
    margin: 8px 0 0;
    height: 63.6px;
}

.status-setting div button div:nth-child(2){
    width: 100%;
    text-align: right;
    padding: 0 10px;
    display: flex;
    flex-direction: column;
}
#status-text{
    font-size: 17px;
    color: #64b200;
    font-weight: bolder;
}
#status-comment{
    font-size: 14px;
    color: #596066;
}
.show-more-less{
    position: absolute;
    left: 0;
    font-family: inherit;
    background-color: #0075e3;
    outline: none;
    border: none;
    border-radius: 4px;
    font-size: 14px;
    color:#fff;
    padding: 0 10px;
    height: 40px;
    width: 192px;
}
.show-more-less:hover{
    background-color: rgba(0, 102, 195);
}
.protection-password div:nth-child(1){
    color: #596066;
    font-size: 17px;
    margin: 0 0 5px;
}
.protection-password p{
    font-size: 14px;
    color: #596066;
    margin: 0 0 15px;
}
.enable-pasword{
    display: flex;
    align-items: center;
    gap: 8px;
}
.enable-pasword span{
    color: #596066;
    font-size: 14px;
}
.enable-pasword input{
    outline: none;
    width: 20px;
    height: 20px;
    margin: 0;
    cursor: pointer;
}
.layout-form div:nth-child(1){
    color: #596066;
    font-size: 17px;
    margin: 0 0 5px;
}
.layout-form div button{
    width: 596.8px;
    height: 42.65px;
    background-color: inherit;
    border: 1px solid #c5c5c5;
    border-radius: 4px;
    outline: none;
}
#pas-protection{
    border: 1px solid #c5c5c5;
    border-radius: 4px;
    outline: none;
    cursor: auto;
    width: 215px;
    height: 25px;
    padding: 2px 5px;
    font-family: inherit;
    font-size: 12px;
}
.span-show-icon{
    color: #564632;
    border-right: 1px solid #eee8e2;
    padding: 5px 8px;
    display: flex;
    justify-content: right;
    align-items: center;
}
.span-show-icon svg{
    cursor: pointer;
}
.overal-screen{
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1010;
    background-color: rgb(8, 9, 11,0.6);
    width: 100%;
    height: 100%;
    position: fixed;
}
.box-select-status{
    position: absolute;
    overflow: hidden;
    left: 50%;
    transform: translate(-50%,-50%);
    top: 50%;
    width: 600px;
    height: fit-content;
    background-color: #fff;
    border-radius: 8px;
}
.form-status{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

}
.header-box-status{
    display: flex;
    align-items: center;
    justify-content:space-between;
    padding: 24px;
    width: 100%;
    border-bottom: 1px solid #ece9e6;
}
.status-div-icon{
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #0075e3;
    height: 40px;
    width: 40px;
    border-radius: 4px;
}
.status-div-icon svg{
    color: #fff;
}
.status-div-text{
    display: flex;
    flex-direction: column;
    align-items: right;
    margin-right: 12px;
    margin-left: 55px;
}
.status-div-text h1{
    font-size: 16px;
    color: var(--jfv-google-apple-blue);
    margin: 0;
}
#p-in-status-div{
    font-size: 14px;
    color: #6c73a8;
    margin: 0;
}
#close-box-status{
    margin: 0;
    height: 40px;
    width:40px;
    margin-right: 200px;
    padding: 0 10px;
    background-color: rgba(218, 222, 243);
    border-radius: 50%;
    border: none;
    display: flex;
    justify-content: center;
}
#close-box-status span svg{
    color: rgba(52, 60, 106);
}
.save-cancel-status{
    padding: 16px 24px;
    width:100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #f3f3fe;
    height: 72px;
}
#cancel-id{
    margin: 0;
    padding: 0 10px;
    display:block ;
    width: 19%;
    height: 40px;
    font-size: 14px;
    color: #343c6a;
}
#cancel-id:hover{
    background-color: rgba(200, 206, 237);
    transition: .3s ease;
}
#save-id{
    margin: 0;
    padding: 0 10px;
    display:block ;
    width: 19%;
    height: 40px;
    background-color:#64b200;
    color: #fff;
    font-size: 14px;
}
#save-id:hover{
    background-color: rgba(82, 147, 0);
    transition: .3s ease;
}
.overflow-status{
    display: flex;
    flex-direction: column;
    padding: 32px;
    width: 100%;
    position: relative;
}
.overflow-status h3{
    font-size: 16px;
    margin: 0;
    text-align: right;
}
#overflow-button{
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 40px;
}
.option-status{
    position: fixed;
    top: 230px;
    background-color: #fff;
    box-shadow: 0 2px 4px rgba(37, 45, 91, .04), 0 8px 16px rgba(84, 95, 111, .16);
    width: 536px;
    border-radius: 4px;
    visibility: visible;
    z-index: 105;
    border: 1px solid #c8ceed;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    max-height: 101px;
}
#overflow-button:hover{
    border-color: #6c73a8;
}
#overflow-button:focus{
    box-shadow: 0 0 0 3px rgba(119, 207, 255, .5);
    border-color: #6c73a8;
}
.rotate_arrow_status{
    transform: rotate(180deg);
}
.per-option-status{
    padding: 0 12px;
    color: var(--jfv-google-apple-blue);
    font-size: 14px;
    height: 40px;
    display: flex;
    align-items: center;
    background-color: inherit;
    cursor: pointer;
}
.active_option_status{
    background-color: #edf8ff;
}
.box-layout-setting{
    width: 596px;
    position: absolute;
    bottom: -29px;
    left: 30px;
    background-color: #fff;
    height: fit-content;
    border-radius: 4px;
    border: 1px solid #888;
    color: #3e4652;
    font-size: 14px;
    z-index: 104;
}
.box-layout-setting div{
    padding: 6px 8px;
    cursor: pointer;
}
#one-page-layout{
    color: #3e4652;
    font-size: 14px;
    margin: 0;    
}
#one-page-layout:hover{
    color: #fff;
}
.box-layout-setting div:hover{
    background-color: #0075e3;
    color: #fff;
}
.component-form{
    border-radius: 5px;
    border: 2.5px solid #fff;
}
.active_heading{
    border: 2.5px solid #3595f6;
    cursor: move;
}
.logo-responsive-build{
    display: none;
}
.publish-form{
    display: flex;
    justify-content: center;
    padding: 4em .5em 2em;
    background-color: #f3f3fe;
    height: 100vw;
    width: 100vw;
    max-height: 50vw;
}
.publish-container{
    width: 660px;
    height: fit-content;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.direct-link-header{
    display: flex;
    align-items: flex-start;
    width: 100%;
}
.svg-direct-link-span{
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #58b966;
    border-radius: 4px;
    width: 40px;
    height: 40px;
}
.title-in-direct-link{
    margin-right: 12px;
}
.title-in-direct-link h2{   
    margin: 0;
    font-size: 16px;
    color:var(--jfv-google-apple-blue);
}
.title-in-direct-link span{
    font-size: 14px;
    color: #6f76a7;
}
.each-box-in-publish{
    width: 100%;
    color: #2c3345;
    background-color: #fff;
    border: 1px solid #c8ceed;
    border-radius: 4px;
    align-items: center;
    margin-top: 1.5em;
    padding: 1.25em 1.5em;
    font-size: 16px;
    line-height: 1.25;
    display: flex;
}
.inside-each-box-in-publish{
    width: 100%;
}
.each-box-in-publish-head{
    display: flex;
    align-items: center;
}
.each-box-in-publish-head h2{
    display: inline-block;
    color: rgb(10, 21, 81);
    font-size: inherit;
    font-weight: 500;
    margin: 0px 11px 0px 0px;
    line-height: 24px;
}
.each-box-in-publish-head div div{
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    flex: 0 0 auto;
    height: 32px;
    border-radius: 2.5rem;
    padding: 0px 12px;
    cursor: pointer;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 16px;
    margin-right: 0.625rem;
    -webkit-box-pack: center;
    justify-content: center;
    white-space: nowrap;
}
.public-access-style{
    border: 1px solid rgb(100, 178, 0);
    background-color: rgb(237, 254, 209);
    color: rgb(82, 147, 0);
}
.private-access-style{
    background-color: #edf2ff;
    border-color: #4277ff87;
    color:  #4277ff;
}
.company-access-style{
    background-color: #ffedd1;
    border-color: #f38f32;
    color: #f17f15;
}
.each-box-in-publish-head div span{
    height: 14px;
    margin-right: 4px;
}
.setting-in-publish-head{
    margin-right: auto;
    margin-left: 4px;
    font-size: 0.875em;
    cursor: pointer;
    box-shadow: none;
    padding: 0px;
    border: 0px;
    display: flex;
    align-items: center;
    font-family: inherit;
    background-color: inherit;
}
.setting-in-publish-head span{
    color: rgb(0, 117, 227);
    margin: 3px;
}
.linkBox{
    border-radius: 4px;
    background-color: rgb(243, 243, 254);
    color: rgb(111, 118, 167);
    height: 2.5rem;
    display: flex;
    margin: 10px 0 10px;
}
.link{
    padding: 12px;
    display: flex;
    justify-content: left;
    width: 100%;
}
.edit-link-button{
    background-color: inherit;
    border: none;
    outline: none;
    padding: 0 10px;
    color: #626777;
}
.line-in-link-publish{
    border-top: 1px solid #eee;
    margin-top: 26px;
    height: 37px;
}
.invite-with-email{
    display: flex;
    align-items: center;
}
.invite-with-email h2{
    color: var(--jfv-google-apple-blue);
    margin: 0;
    font-size: 16px;
    margin-left: 11px;
}
.invite-with-email span{
    background-color: #dadef3;
    color: #343c6a;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 30px;
    height: 30px;
}
.email-address-box-to-invite{
    margin: 10px 0 4px;
    display: flex;
    align-items: center;
    border: 1px solid #c8ceed;
    border-radius: 4px;
}
.input-box-to-email-invite{
    width: 100%;
}
.input-box-to-email-invite input{
    padding: 8px;
    width: 100%;
    font-family: inherit;
    color: var(--jfv-google-apple-blue);
    border: none;
    outline: none;
}
.input-box-to-email-invite input:placeholder-shown{
    color: inherit;
}
.button-in-publish-container{
    display: flex;
    justify-content: left;
    align-items: center;
    padding: 0 0 10px;
}
.button-in-publish-container button{
    width: 110px;
    background-color: #64b200;
    color: #fff;
    font-size: 14px;
    padding: 0 8px;
    font-family: inherit;
    border: none;
    outline: none;
    height: 40px;
    border-radius: .25rem;
    margin-right: 6px;
}
.button-in-publish-container a{
    width:160px;
    background-color: #0075e3;
    color: #fff;
    padding: 0 8px;
    font-size: 14px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.pdf-svg-publish{
    background-color: #d62e2e;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 40px;
    width: 40px;
    border-radius: 4px;
}
.inside-pdf-box{
    display: flex;
    margin: 12px 0;
    align-items: center;
}
.head-pdf-download h2{
    margin: 0;
    font-size: 16px;
    color: var(--jfv-google-apple-blue);
}
.head-pdf-download span{
    color: #6f76a7;
    font-size: 14px;
}
.inside-pdf-box button{
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
    margin-right: auto;
    border: none;
    outline: none;
    background-color: #64b200;
    color: #fff;
    height: 40px;
    width: 140px;
    border-radius: 4px;
    font-size: 14px;
    font-family: inherit;
}
.setting-link-address-box{
    position: absolute;
    background-color: #fff;
    border-radius: 4px;
    margin: auto;
    height: fit-content;
    width: 100%;
    display: flex;
    flex-direction: column;
    max-width: 630px;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
}
.head-of-setting-link{
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #eaebf2;
}
.head-of-setting-link span{
    color: #141e46;
    padding-right: 20px;
    font-size: 18px;
} 
.head-of-setting-link button{
    margin: 18px;
}
.access-settings-form{
    padding: 24px 40px;
}
.each-access-mode-style{
    display: flex;
    align-items: center;
    border: 1px solid #bcbdd2;
    border-radius: 4px;
    cursor: pointer;
    margin-bottom: 8px;
}
.two-comment-access{
    display: flex;
    flex-direction: column;
}
.tick-selected-access-mode{
    margin-right: auto;
    margin-left: 18px;
    display: flex;
    align-items:center;
}
.two-comment-access span:nth-child(1){
    margin-top: 12px;
    color: #2c3345;
    font-size: 16px;
}
.each-access-mode-style div:nth-child(1){
    color: #8583a9;
}
.active_private{
    background-color: #edf2ff;
    border-color: #4277ff87;
    color:  #4277ff;
}
.active_public{
    background-color: #edfed1;
    border-color: #64b200;
    color: #529300;
}
.active_company{
    background-color: #ffedd1;
    border-color: #f38f32;
    color: #f17f15;
}
.two-comment-access span:nth-child(2){
    margin-bottom: 15px;
    font-size: 15px;
    color: #2c3345;
}
.invitation-message{
    height: 106px;
    border: 1px solid #c8ceed;
    padding: 8px 12px;
    border-radius: 4px;
}
.invitation-message textarea{
    width: 100%;
    height: 100%;
    outline: none;
    resize: none;
    border: none;
    font-family: inherit;
    color: var(--jfv-google-apple-blue);
}
.button-to-invitation{
    margin: 12px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.button-to-invitation button{
    height: 40px;
    font-family: inherit;
    font-size: 14px;
    padding: 0 18px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    border-radius: 4px;
}
.button-to-invitation button:nth-child(1){
    color: #343c6a;
    background-color: #dadef3;
}
.button-to-invitation button:nth-child(2){
    color: #fff;
    background-color: #64b200;
}
.company-permission{
    display: flex;
    flex-direction: column;
    padding: 10px 16px 0;
}
.email-permission{
    padding: 8px 0;
}
.email-permission input{
    border: 1px solid #d8dae9;
    outline: none;
    border-radius: 2px;
    width: 100%;
    max-width: 300px;
    color: #2c3345;
    font-family: inherit;
    padding: 8px;
    direction: ltr;
}
@media (max-width: 1200px){
    .form-builder{
        display: none;
    }
}
@media (max-width: 640px){
    .logo-responsive-build{
        display: block;
    }
    .header-builder{
        padding: 0 5px;
    }
    .name-date{
        margin: 0;
        width: 40%;
    }
    .name-date div:nth-child(1){
        font-size: 16px;
        justify-content: right;
    }
    .name-date div:nth-child(2){
        font-size: 12px;
        justify-content: right;
    }
    .name-date::before{
        content: "";
        border-left: 1px solid #e3e5f5;
        height: 24px;
        margin: 0 8px;
        position: absolute;
        right: 50px;
        top: 25px;
    }
    .help-and-avatar ul{
        display: none;
    }
    .build-avatar{
        width: 36px;
        height: 36px;
    }
    .build-avatar img{
        width: 30px;
        height: 30px;
    }
    .navigation ul li:nth-child(1){
        margin: 0;
    }
    .navigation{
        justify-content: center;
    }
    .form-page{
        width: 100%;
    }
    .form-container{
        width: 100%;
    }
    .form-cover button{
        width: 340px;
    }
    .form-logo{
        width: auto;
    }
    .form-each{
        width: auto;
        max-width: 360px;
    }
    .form-section{
        width: 100%;
        max-width: 340px;
        margin: 0 9px 0 0;
    }
    .form-page-break{
        margin: 40px 0;
    }
    .form-page-break button{
        width: 300px;
    }
    .setting-menu{
        width: 360px;
    }
    .setting-page{
        padding: 0 10px 50px;
        width: 100%;
    }
    .setting-box , .setting-container , .header-setting{
        width: 100%;
    }
    .layout-form div button{
        width: 100%;
    }
}
</style>