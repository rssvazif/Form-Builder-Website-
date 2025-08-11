<script setup> 
    import logo from '../components/logo.vue'
    import logo_without from '../components/logo_without_b.vue'
    import footer_page from '../components/footer_endPage_others.vue'
    import menu_bar_myWork from '../components/menu_bar_myWork.vue'
    import signUp from '../components/signUp.vue'
    import { useSignUp_LoginStore } from '../../stores/SignUp_LoginStore'

    import {ref,onMounted, onUnmounted,computed} from 'vue'

    const user_store = useSignUp_LoginStore()
    const type_page = ref(false);
    const LabelId_holder = ref('')
    const model_name = ref('')
    const model_id = ref('')
    const beffor_change_name = ref('')
    const filter_type = ref(false);
    const sort_type = ref(false);
    const add_label = ref(false);
    const sort_option = ref('تاریخ ساخت');
    const label_list = ref(true);
    const div_label = ref(false);
    const new_label_name = ref('');
    const color_label = ref('');
    const active_products = ref(false)
    const choose_option = ref(false)
    const choose_cardORform = ref(false)
    const label_id_push = ref('-1')
    const label_name_show = ref('')
    const label_color_back = ref('')
    const formSectionRef = ref(null)
    const labelSettingRef = ref(null)
    const sure_aboutDelete = ref(false)
    const edit_label = ref(false)
    const select_other_color = ref(false)
    const index_label_edit = ref('')
    const change_name_label = ref(false)
    const Login_on = ref(false)
    const SignUp_on = ref(false)
    const open_menu_template = ref(false)
    const open_menu_product = ref(false)
    const open_menu_support = ref(false)
    const username_or_email = ref('')
    const password_login = ref('')
    const menu_sort = [
        {id:0,text:'حروف الفبا [ آ - ی ]'},
        {id:1, text: 'تاریخ ساخت'},
        {id:2, text:'آخرین ویرایش'}
    ]
    const Name_Forms = ref([])
    const Labels = ref([])
    const colors = ['#0075e3','#bf78f0','#ffa34f','#fecaca','#008f75','#94cd2a','#f87171','#ffdc7b']
    const index_edit = ref('')
    const selected_form = ref(false)
    const selected_id = ref('')
    const form_id_delete = ref('')
    const text_error = ref('')
    const delete_type = ref('')
    const User_Name = ref('')
    const open_menu = ref(false)
    const box_content = ref(false)
    const tuggle = ref(false)
    const windowWidth = ref(window.innerWidth)
    
    function windowControler(){
        windowWidth.value = window.innerWidth
        if(windowWidth.value >= 992){
            tuggle.value = false
        }
    }

    function tuggle_page(){
        type_page.value = !type_page.value;
    }
    function filter_forms(){
        filter_type.value = !filter_type.value;
    }
    function sort_forms(){
        sort_type.value = !sort_type.value;
    }
    function put_value(item){
        sort_option.value = item.text;
    }
    function adding_label(){
        add_label.value = !add_label.value;
    }
    function change_label_show(){
        label_list.value = !label_list.value;
    }
    onMounted(()=>{
        document.addEventListener('click', handleClickSettingLabel)
        document.addEventListener('click', handleClickOutside)
        window.addEventListener('resize' , windowControler);
        windowControler()
        get_labels()
        get_all_Forms()
        get_userName()
        if(window.innerWidth > 360){
            Login_on.value = false
            SignUp_on.value = false
        }
    })
    onUnmounted(()=>{
        window.removeEventListener('resize', windowControler)
    })
    const handleClickOutside = (event) => {
        if(event.target.closest('.delete-form-tool-box')) return
        const isOutside = formSectionRef.value && !formSectionRef.value.contains(event.target)
        if(isOutside){
            selected_form.value = false
        }
    }
    const handleClickSettingLabel = (event) => {
        if (event.target.closest('.icon-three-dot') || event.target.closest('.setting-label')) return;
        edit_label.value = false
    }
    window.addEventListener('pageshow', (event) => {
        if (event.persisted) {
            window.location.reload();
        }
    });
    async function get_userName(){
        const token = localStorage.getItem('token')
        const expiresTime = localStorage.getItem('expiry')
        if(!token || !expiresTime){
            console.log('token is not valid');
            return
        }
        const now = Date.now()
        if(now > expiresTime){
            localStorage.removeItem('token')
            localStorage.removeItem('expiry')
            return
        }
        try{
            const response = await fetch('/api/getUserName',{
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if(!response.ok){
                const errordata = await response.json()
                console.log(errordata);
            }
            const data = await response.json()
            User_Name.value = data.User_Name
        }catch(error){
            console.log(error);
        }
    }
    async function set_new_label(){
        const token = localStorage.getItem('token')
        if(!token) return;
        if (!new_label_name.value.trim()) return;
        color_label.value = get_RandomColor()
        try{

            const response = await fetch('/api/Label',{
                method: 'POST',
                headers:{
                    'Content-type':'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    name: new_label_name.value,
                    color: color_label.value
                })
            })
            if(!response.ok){
                const errordata = await response.json()
                console.log(errordata.message);
                throw new Error('error to add label')
            }
            new_label_name.value = ''
            div_label.value = false
            await get_labels()

        }catch(error){
            console.log(error.message);
            text_error.value = 'برچسب با همین نام قبلا ایجاد شده است'
        }
    }
    async function get_labels(){
        try{
            const token = localStorage.getItem('token')
            const expiresTime = localStorage.getItem('expiry')
            const now = Date.now()
            if(!token || !expiresTime){
                console.log('token not exist!');
                return 
            }
            if(now > Number(expiresTime)){
                localStorage.removeItem('token')
                localStorage.removeItem('expiry')
                window.location.href = '/'
            }
            const response = await fetch('/api/get_label',{
                method: 'GET',
                headers:{
                    Authorization: `Bearer ${token}`
                }
            })
            if(!response.ok){
                const errordata = await response.json()
                throw new Error(errordata.message)
            }

            const data = await response.json()
            Labels.value = data.labels
        }catch(error){
            console.log(error.message);
        }
    }
    function get_RandomColor(){
        return colors[Math.floor(Math.random()*colors.length)]
    }
    function open_formBuilder(){
        window.location.href = `/build/${label_id_push.value}`
    }
    async function get_all_Forms(){
        const token = localStorage.getItem('token')
        if(!token){
            console.log('توکن وجود ندارد');
            return
        }   
        try{
            let url = '/api/getAllForms';
            if(label_id_push.value !== '-1'){
                url = `/api/getSpecialForms/${label_id_push.value}`
            }
            const response = await fetch(url,{
                method: 'GET',
                headers:{
                    Authorization: `Bearer ${token}`
                }
            })
            if(!response.ok){
            const errordata = await response.json()
            throw new Error(errordata.message)
        }
            const data = await response.json()
            Name_Forms.value = data.Name_Forms
        }catch(error){
            console.log(error.message);
        }   
        
    }
    function get_Labelforms(label_id,name,color){
        if(label_id === '-1'){
            label_id_push.value = '-1'
            label_name_show.value = ''
            label_color_back.value = ''
        }else{
            const width = window.innerWidth
            if(width < 640){
                label_name_show.value = ''
            }else{
                label_name_show.value = name
            }
            label_id_push.value = label_id
            label_color_back.value = color
        }
    }
    function go_to_EditForm(form_id){
        if(!form_id){
            return
        }
        localStorage.setItem('f_id_cat',form_id)
        window.location.href = '/build'
    }
    function selected_form_func(index,id){
        if(index === ''){
            selected_form.value = false
            selected_id.value = ''
            form_id_delete.value = ''
            return
        }
        selected_form.value = true
        selected_id.value = index
        form_id_delete.value = id
    }
    async function Delete_Form(){
        const token = localStorage.getItem('token')
        const expiresTime = localStorage.getItem('expiry')
        if(!token || !expiresTime){
            console.log('token is not valid');
            return
        }
        const now = Date.now()
        if(now > expiresTime){
            localStorage.removeItem('token')
            localStorage.removeItem('expiry')
            return
        }
        try{
            const form_id = form_id_delete.value
            const response = await fetch(`/api/deleteForm/${form_id}`,{
                method: 'DELETE',
                headers:{
                    Authorization: `Bearer ${token}`
                }   
            })
            if(!response.ok){
                const errordata = await response.json()
                console.log(errordata);
            }
            const data = await response.json()
            console.log(data.message);
            window.location.reload() 
        }catch(error){
            console.log(error);
        }
    }
    function check_user_status(){
        const token = localStorage.getItem('token')
        const expiresTime = localStorage.getItem('expiry')
        if(!token || !expiresTime){
            active_products.value = false
            div_label.value = false
            user_store.open_SignUp = true
            SignUp_on.value = true
            return
        }
    }
    function setting_label(index,label_id){
        edit_label.value = true
        index_label_edit.value = index
        LabelId_holder.value = label_id
    }
    function change_name(index){
        let holder = Labels.value[index]
        beffor_change_name.value = holder.name
        model_name.value = holder.name
        model_id.value = holder._id
    }
    async function send_new_name() {
        const token = localStorage.getItem('token')
        const expiresTime = localStorage.getItem('expiry')
        if(!token || !expiresTime){
            console.log('token is not valid');
            return
        }
        const now = Date.now()
        if(now > expiresTime){
            localStorage.removeItem('token')
            localStorage.removeItem('expiry')
            return
        }
        try{
            if(model_name.value.trim() === beffor_change_name.value.trim()){
                text_error.value = 'نام برچسب تغییر نکرده است'
                return
            }
            const dataTransfer = {
                id : model_id.value,
                name : model_name.value
            }
            const response = await fetch('/api/newNameLabel',{
                method: 'PUT',
                headers: {
                    'Content-type':'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(dataTransfer)
            })
            if(!response.ok){
                const errordata = await response.json()
                console.log(errordata);
            }
            const data = await response.json()
            console.log(data.message);
            await get_labels()
            change_name_label.value = false
        }catch(error){
            console.log(error);
        }
    }
    async function update_color(index){
        const token = localStorage.getItem('token')
        const expiresTime = localStorage.getItem('expiry')
        if(!token || !expiresTime){
            console.log('token is not valid');
            return
        }
        const now = Date.now()
        if(now > expiresTime){
            localStorage.removeItem('token')
            localStorage.removeItem('expiry')
            return
        }
        try{
            const dataTransfer = {
                id: LabelId_holder.value,
                color : colors[index]
            }
            const response = await fetch('/api/newColorLabel',{
                method: 'PUT',
                headers: {
                    'Content-type':'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(dataTransfer)
            })
            if(!response.ok){
                const errordata = await response.json()
                console.log(errordata);
            }
            const data = await response.json()
            console.log(data.message);
            await get_labels()
        }catch(error){
            console.log(error);
        }
    }
    async function delete_label() {
        const token = localStorage.getItem('token')
        const expiresTime = localStorage.getItem('expiry')
        if(!token || !expiresTime){
            console.log('token is not valid');
            return
        }
        const now = Date.now()
        if(now > expiresTime){
            localStorage.removeItem('token')
            localStorage.removeItem('expiry')
            return
        }
        try{
            const label_id = LabelId_holder.value
            const response = await fetch(`/api/deleteLabel/${label_id}`,{
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if(!response.ok){
                const errordata = await response.json()
                console.log(errordata);
            }
            window.location.reload()
        }catch(error){
            console.log(error);
        }
    }
    function back_home(){
        window.location.href = '/'
    }
    const New_User = {
    username: '',
    email: '',
    password:''
}
const password_again = ref('')
const user_email = ref('')
const accept_email = ref(false)
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const isEmailValid = computed(() => {
  return emailRegex.test(user_email.value);
});
function get_email() {
  if(!user_email.value) {
    text_error.value = 'لطفا ایمیل را وارد کنید'
    return;
  }
  
  if(!isEmailValid.value) {
    user_email.value = ''
    text_error.value = 'ایمیل نامعتبر است'
    return;
  }
  
  accept_email.value = true;
}
    async function send_new_user(e){
        New_User.email = user_email.value;
        if(New_User.password !== password_again.value){
            text_error.value = 'عدم تطابق رمز عبور'
            return
        }
        try{
            if(New_User.password.length === 0 || New_User.email.length === 0){
                text_error.value = 'تمام فیلد ها را تکمیل کنید'
                return
            }
            const response = await fetch('/api/User',{
                method: 'POST',
                headers:{
                    'Content-type':'application/json'
                },
                body: JSON.stringify(New_User)
            })
            if(!response.ok){
                const errordata = await response.json()
                console.log(errordata.message);
                if(errordata.message === 'کاربر قبلا ثبت نام کرده است.'){
                    text_error.value = 'شما قبلا ثبت نام کرده اید.'
                }
                throw new Error('error in response')
            }
            const data = await response.json()
            const expiresIn = 24 * 60 * 60 * 1000;
            const expiryTime = Date.now() + expiresIn;
            localStorage.setItem('expiry',expiryTime.toString())
            localStorage.setItem('token',data.token)

            window.location.href = '/myWorkspace'
            accept_email.value = false
            user_email.value = ''
            New_User.email = ''
            New_User.password = ''
            New_User.username = ''

        }catch(error){
            const Error = await response.json()
            console.log('error in try block');
            alert(Error.message)
        }
}
async function login_User(){
    try{
        const token = localStorage.getItem('token')
        if(token){
            console.log('you logined up.');
            window.location.href = '/'
            return
        }
        const information = {
            email_username: username_or_email.value,
            password: password_login.value
        }
        const response = await fetch('/api/login',{
            method:'POST',
            headers:{
                'Content-type':'application/json'
            },
            body: JSON.stringify(information)
        })
        if(!response.ok){
            const errordata = await response.json()
            if(errordata.message === 'user is not found.'){
                text_error.value = 'حساب کاربری وجود ندارد.'
            }else if(errordata.message === 'password is incorrect.'){
                text_error.value = 'رمز عبور نادرست است.'
            }
            throw new Error(errordata.message)
        }

        const data = await response.json()
        const expiresIn = 24 * 60 * 60 * 1000;
        const expiryTime = Date.now() + expiresIn;
        localStorage.setItem('expiry',expiryTime.toString())
        localStorage.setItem('token',data.token)
        window.location.href = '/myWorkspace'

    }catch(error){
        console.error(error.message);
    }
}
</script>

<template>
    <div class="item-header container">
        <div class="head-page">
            <div class="myWorkspace responsive-workspace-header">
                <router-link to="/">
                    <logo id="color-bf-logo"/>
                </router-link>
                <div class="workspace-style" @click="tuggle_page()">
                    <span class="page-name">صفحه کار من</span>
                    <span class="arrow-back"><svg xmlns="http://www.w3.org/2000/svg" :class="{rotate: type_page}" width="20" height="100%" fill="#fff" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M4.293 8.293a1 1 0 0 1 1.414 0L12 14.586l6.293-6.293a1 1 0 1 1 1.414 1.414l-7 7a1 1 0 0 1-1.414 0l-7-7a1 1 0 0 1 0-1.414Z" clip-rule="evenodd"></path></svg></span>
                    <div class="type-of-pages" v-show="type_page">
                        <ul class="four-section-pages">
                            <li><button id="this-page">
                                <span><svg xmlns="http://www.w3.org/2000/svg"  fill="none" viewBox="-19 0 62 24"><path fill="#fff" d="M18 1.08H6a3 3 0 0 0-3 3v16a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3v-16a3 3 0 0 0-3-3Z"></path><path fill="#0A1551" d="M18.001 15.58a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z"></path><path fill="#FF6100" d="M8.233 6.245c.11-.22.424-.22.534 0l2.201 4.404a.298.298 0 0 1-.267.432H6.3a.298.298 0 0 1-.267-.432l2.201-4.404Z"></path><path fill="#09F" d="M13 7.08a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-3a1 1 0 0 1-1-1v-3Z"></path><rect width="5" height="5" x="6" y="13.081" fill="#FFB629" rx="1"></rect></svg></span>
                                <span>صفحه کار من</span>
                            </button></li>
                            <li><button>
                                <span><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="-19 0 62 24"><path fill="#FF6100" fill-rule="evenodd" d="M6 1h12a3 3 0 0 1 3 3v16a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V4a3 3 0 0 1 3-3Zm1.5 5a1.5 1.5 0 1 0 0 3h9a1.5 1.5 0 0 0 0-3h-9Zm0 5a1.5 1.5 0 0 0 0 3h9a1.5 1.5 0 0 0 0-3h-9ZM6 17.5A1.5 1.5 0 0 1 7.5 16h9a1.5 1.5 0 0 1 0 3h-9A1.5 1.5 0 0 1 6 17.5Z" clip-rule="evenodd"></path></svg></span>
                                <span>فرم های من</span>
                            </button></li>
                            <li><button>
                                <span><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="-19 0 62 24"><path fill="#007862" fill-rule="evenodd" d="M6 1h12a3 3 0 0 1 3 3v16a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V4a3 3 0 0 1 3-3Zm7.5 3h-3a1.5 1.5 0 1 0 0 3h1v1.5H8.8a1.3 1.3 0 0 0-1.3 1.3v.45h-1a1.5 1.5 0 0 0 0 3h1v.45A1.3 1.3 0 0 0 8.8 15h2.7v2h-1a1.5 1.5 0 0 0 0 3h3a1.5 1.5 0 0 0 0-3h-1v-2h2.7a1.3 1.3 0 0 0 1.3-1.3v-.45h1a1.5 1.5 0 0 0 0-3h-1V9.8a1.3 1.3 0 0 0-1.3-1.3h-2.7V7h1a1.5 1.5 0 0 0 0-3ZM11 11.75a1.5 1.5 0 0 0-1.5-1.5h-1V9.8a.3.3 0 0 1 .3-.3h6.4a.3.3 0 0 1 .3.3v.45h-1a1.5 1.5 0 0 0 0 3h1v.45a.3.3 0 0 1-.3.3H8.8a.3.3 0 0 1-.3-.3v-.45h1a1.5 1.5 0 0 0 1.5-1.5Z" clip-rule="evenodd"></path></svg></span>
                                <span>روندکار من
                                    <small>(به زودی)</small>
                                </span>
                            </button></li>
                            <li><button>
                                <span><svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="-19 0 62 24"><path fill-rule="evenodd" d="M6 1h12a3 3 0 0 1 3 3v16a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V4a3 3 0 0 1 3-3Zm-.5 6a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v11h-3V7Zm5 3a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v8h-3v-8Zm6-3a1 1 0 0 0-1 1v10h3V8a1 1 0 0 0-1-1h-1Z" clip-rule="evenodd"></path></svg></span>
                                <span>گزارشات من
                                    <small>(به زودی)</small>
                                </span>

                            </button></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="type-of-pages" v-if="box_content">
                <ul class="four-section-pages">
                    <li><button id="this-page">
                        <span><svg xmlns="http://www.w3.org/2000/svg"  fill="none" viewBox="-19 0 62 24"><path fill="#fff" d="M18 1.08H6a3 3 0 0 0-3 3v16a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3v-16a3 3 0 0 0-3-3Z"></path><path fill="#0A1551" d="M18.001 15.58a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z"></path><path fill="#FF6100" d="M8.233 6.245c.11-.22.424-.22.534 0l2.201 4.404a.298.298 0 0 1-.267.432H6.3a.298.298 0 0 1-.267-.432l2.201-4.404Z"></path><path fill="#09F" d="M13 7.08a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-3a1 1 0 0 1-1-1v-3Z"></path><rect width="5" height="5" x="6" y="13.081" fill="#FFB629" rx="1"></rect></svg></span>
                        <span>صفحه کار من</span>
                    </button></li>
                    <li><button>
                        <span><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="-19 0 62 24"><path fill="#FF6100" fill-rule="evenodd" d="M6 1h12a3 3 0 0 1 3 3v16a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V4a3 3 0 0 1 3-3Zm1.5 5a1.5 1.5 0 1 0 0 3h9a1.5 1.5 0 0 0 0-3h-9Zm0 5a1.5 1.5 0 0 0 0 3h9a1.5 1.5 0 0 0 0-3h-9ZM6 17.5A1.5 1.5 0 0 1 7.5 16h9a1.5 1.5 0 0 1 0 3h-9A1.5 1.5 0 0 1 6 17.5Z" clip-rule="evenodd"></path></svg></span>
                        <span>فرم های من</span>
                    </button></li>
                    <li><button>
                        <span><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="-19 0 62 24"><path fill="#007862" fill-rule="evenodd" d="M6 1h12a3 3 0 0 1 3 3v16a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V4a3 3 0 0 1 3-3Zm7.5 3h-3a1.5 1.5 0 1 0 0 3h1v1.5H8.8a1.3 1.3 0 0 0-1.3 1.3v.45h-1a1.5 1.5 0 0 0 0 3h1v.45A1.3 1.3 0 0 0 8.8 15h2.7v2h-1a1.5 1.5 0 0 0 0 3h3a1.5 1.5 0 0 0 0-3h-1v-2h2.7a1.3 1.3 0 0 0 1.3-1.3v-.45h1a1.5 1.5 0 0 0 0-3h-1V9.8a1.3 1.3 0 0 0-1.3-1.3h-2.7V7h1a1.5 1.5 0 0 0 0-3ZM11 11.75a1.5 1.5 0 0 0-1.5-1.5h-1V9.8a.3.3 0 0 1 .3-.3h6.4a.3.3 0 0 1 .3.3v.45h-1a1.5 1.5 0 0 0 0 3h1v.45a.3.3 0 0 1-.3.3H8.8a.3.3 0 0 1-.3-.3v-.45h1a1.5 1.5 0 0 0 1.5-1.5Z" clip-rule="evenodd"></path></svg></span>
                        <span>روندکار من
                            <small>(به زودی)</small>
                        </span>
                    </button></li>
                    <li><button>
                        <span><svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="-19 0 62 24"><path fill-rule="evenodd" d="M6 1h12a3 3 0 0 1 3 3v16a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V4a3 3 0 0 1 3-3Zm-.5 6a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v11h-3V7Zm5 3a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v8h-3v-8Zm6-3a1 1 0 0 0-1 1v10h3V8a1 1 0 0 0-1-1h-1Z" clip-rule="evenodd"></path></svg></span>
                        <span>گزارشات من
                            <small>(به زودی)</small>
                        </span>

                    </button></li>
                </ul>
            </div>
            <div class="signUp_in_responsive" v-if="Login_on || user_store.open_Login">
                <div style="padding: 15px 15px 0 15px;">
                    <button class="close-add-label" @click="Login_on = false , user_store.open_Login= false , SignUp_on = false , user_store.open_SignUp= false">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" fill="#B0BEC5" viewBox="0 0 24 24" ><path fill-rule="evenodd" d="M17.707 7.707a1 1 0 0 0-1.414-1.414L12 10.586 7.707 6.293a1 1 0 0 0-1.414 1.414L10.586 12l-4.293 4.293a1 1 0 1 0 1.414 1.414L12 13.414l4.293 4.293a1 1 0 0 0 1.414-1.414L13.414 12l4.293-4.293Z" clip-rule="evenodd"></path></svg>
                    </button>
                </div>
                <div class="new-responsive-signUp">
                    <h2>خوش آمدی!</h2>
                    <p>اطلاعات، پرداخت‌ها و امضاها را با فرم‌های آنلاین سفارشی جمع‌آوری کن.</p>
                    <p id="signUp-p">ورود با</p>
                    <div class="signUp-with">
                        <button>
                            <span><svg fill="none" width="32" xmlns="http://www.w3.org/2000/svg" viewBox="2 1 32 32"><circle cx="18.5" cy="18" r="18" fill="white"></circle><path d="M30.8759 18.2751C30.8759 17.2576 30.7916 16.5151 30.6093 15.7451H18.7534V20.3376H25.7125C25.5723 21.4789 24.8146 23.1976 23.1309 24.3525L23.1073 24.5063L26.8559 27.3522L27.1156 27.3776C29.5008 25.2188 30.8759 22.0426 30.8759 18.2751Z" fill="#4285F4"></path><path d="M18.7518 30.3758C22.1612 30.3758 25.0234 29.2758 27.114 27.3783L23.1293 24.3532C22.063 25.082 20.6318 25.5907 18.7518 25.5907C15.4125 25.5907 12.5784 23.432 11.5681 20.4482L11.42 20.4606L7.52217 23.4169L7.47119 23.5557C9.54769 27.5982 13.813 30.3758 18.7518 30.3758Z" fill="#34A853"></path><path d="M11.5695 20.4475C11.303 19.6775 11.1487 18.8525 11.1487 18C11.1487 17.1475 11.303 16.3225 11.5555 15.5525L11.5485 15.3885L7.60177 12.3848L7.47264 12.445C6.61681 14.1225 6.12573 16.0063 6.12573 18C6.12573 19.9938 6.61681 21.8774 7.47264 23.555L11.5695 20.4475Z" fill="#FBBC05"></path><path d="M18.7519 10.4109C21.123 10.4109 22.7225 11.4147 23.6345 12.2535L27.1983 8.84348C25.0095 6.84973 22.1612 5.62598 18.7519 5.62598C13.813 5.62598 9.5477 8.40346 7.47119 12.4459L11.5541 15.5535C12.5784 12.5697 15.4126 10.4109 18.7519 10.4109Z" fill="#EB4335"></path></svg></span>
                            <span>گوگل</span>
                        </button>
                        <button>
                            <span><svg width="32" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="2 1 32 32"><rect x="19.8198" y="19.125" width="11.25" height="11.25" fill="#FEBA08"></rect><rect x="6.31982" y="19.125" width="11.25" height="11.25" fill="#05A6F0"></rect><rect x="19.8198" y="5.625" width="11.25" height="11.25" fill="#80BC06"></rect><rect x="6.31982" y="5.625" width="11.25" height="11.25" fill="#F25325"></rect></svg></span>
                            <span>مایکروسافت</span>
                        </button>
                    </div>
                    <div class="space" style="margin: 0 140px 12px;">
                        <div class="thin"></div>
                        <span>یا</span>
                        <div class="thin"></div>
                    </div>
                    <div class="signUp-email">
                        <span><label for="email-address" style="text-align: center;">ایمیل <small>یا</small> نام کاربری</label></span>
                        <span><input type="text" key="email-address" v-model="username_or_email" @input="text_error = ''" style="width: 90%;"></span>
                        <span style="margin: 15px 0 0;"><label style="text-align: center;" for="password-user">رمز عبور</label></span>
                        <span style="margin: 0 0 25px;"><input style="width: 90%;" type="password" key="password-user" v-model="password_login" @input="text_error = ''"></span>
                        <span v-if="text_error" style="color: red; padding: 5px 0;">{{ text_error }}</span>
                        <span><button class="continue" @click="login_User()">ورود</button></span>
                        <div class="login-box">
                            حساب کاربری ندارید؟
                            <button @click="user_store.change_box('SignUp'), Login_on = false,text_error = ''">ثبت نام</button>
                        </div>
                    </div>
                </div>
            </div>
            <div :class="{active: tuggle}" class="hidden-menu">
                <ul class="topics">
                    <li @click="go_workSpace()" v-if="false">صفحه کار من</li>
                    <li class="topics-menu-down" @click="open_menu_template = !open_menu_template">
                        <details>
                            <summary :style="{color:open_menu_template?'#0075e3':''}">
                                <span>قالب ها</span>
                                <span class="arrow-sub-menu">
                                    <svg width="16" style="transition: .3s ease;" :style="{transform: open_menu_template?'rotate(180deg)':''}" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 4"><path fill-rule="evenodd" clip-rule="evenodd" d="M0.861934 0.195262C1.12228 -0.0650874 1.54439 -0.0650874 1.80474 0.195262L4 2.39052L6.19527 0.195262C6.45562 -0.0650874 6.87773 -0.0650874 7.13808 0.195262C7.39843 0.455612 7.39843 0.877722 7.13808 1.13807L4.47141 3.80474C4.21106 4.06509 3.78895 4.06509 3.5286 3.80474L0.861934 1.13807C0.601584 0.877722 0.601584 0.455612 0.861934 0.195262Z" fill="currentColor"></path></svg>
                                </span>
                            </summary>
                            <div class="div-after-summary">
                                <div class="summary-template-sub-menu">
                                    <span>
                                        <img src="/form.svg" alt="قالب های فرم" width="32" height="32">
                                    </span>
                                    <span>قالب های فرم</span>
                                </div>
                                <div class="summary-template-sub-menu">
                                    <span>
                                        <img src="/card-form.svg" alt="card-from" width="32" height="32">
                                    </span>
                                    <span>قالب های کارت فرم</span>
                                </div>
                            </div>
                        </details>
                    </li>
                    <li class="topics-menu-down" @click="open_menu_product = !open_menu_product">
                        <details>
                            <summary :style="{color:open_menu_product?'#0075e3':''}">
                                <span>محصولات</span>
                                <span class="arrow-sub-menu">
                                    <svg width="16" style="transition: .3s ease;" :style="{transform: open_menu_product?'rotate(180deg)':''}" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 4"><path fill-rule="evenodd" clip-rule="evenodd" d="M0.861934 0.195262C1.12228 -0.0650874 1.54439 -0.0650874 1.80474 0.195262L4 2.39052L6.19527 0.195262C6.45562 -0.0650874 6.87773 -0.0650874 7.13808 0.195262C7.39843 0.455612 7.39843 0.877722 7.13808 1.13807L4.47141 3.80474C4.21106 4.06509 3.78895 4.06509 3.5286 3.80474L0.861934 1.13807C0.601584 0.877722 0.601584 0.455612 0.861934 0.195262Z" fill="currentColor"></path></svg>
                                </span>
                            </summary>
                            <div class="div-after-summary">
                                <div class="summary-template-sub-menu">
                                    <span>
                                        <img src="/form.svg" alt="from creator" width="32" height="32">
                                    </span>
                                    <span>فرم ساز</span>
                                </div>
                                <div class="summary-template-sub-menu">
                                    <span>
                                        <img src="/pdf-editor.svg" alt="pdf editor" width="32" height="32">
                                    </span>
                                    <span>پی دی اف ادیتور</span>
                                    <small class="small-style">(به زودی)</small>
                                </div>
                                <div class="summary-template-sub-menu">
                                    <span>
                                        <img src="/report-builder.svg" alt="reporter" width="32" height="32">
                                    </span>
                                    <span>گزارش ساز</span>
                                    <small class="small-style">(به زودی)</small>
                                </div>
                                <div class="summary-template-sub-menu">
                                    <span>
                                        <img src="/approvals.svg" alt="workflow jotform" width="32" height="32">
                                    </span>
                                    <span>روند کار جات فرم</span>
                                    <small class="small-style">(به زودی)</small>
                                </div>
                            </div>
                        </details>
                    </li>
                    <li class="topics-menu-down" @click="open_menu_support = !open_menu_support">
                        <details>
                            <summary :style="{color:open_menu_support?'#0075e3':''}">
                                <span>پشتیبانی</span>
                                <span class="arrow-sub-menu">
                                    <svg width="16" style="transition: .3s ease;" :style="{transform: open_menu_support?'rotate(180deg)':''}" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 4"><path fill-rule="evenodd" clip-rule="evenodd" d="M0.861934 0.195262C1.12228 -0.0650874 1.54439 -0.0650874 1.80474 0.195262L4 2.39052L6.19527 0.195262C6.45562 -0.0650874 6.87773 -0.0650874 7.13808 0.195262C7.39843 0.455612 7.39843 0.877722 7.13808 1.13807L4.47141 3.80474C4.21106 4.06509 3.78895 4.06509 3.5286 3.80474L0.861934 1.13807C0.601584 0.877722 0.601584 0.455612 0.861934 0.195262Z" fill="currentColor"></path></svg>
                                </span>
                            </summary>
                            <div class="div-after-summary">
                                <div class="summary-template-sub-menu">ارتباط با ما</div>
                                <div class="summary-template-sub-menu">سوالات متداول</div>
                                <div class="summary-template-sub-menu">دستورالعمل کاربر</div>
                                <div class="summary-template-sub-menu">وبلاگ</div>
                            </div>
                        </details>
                    </li>
                </ul>
                <ul class="signUp-login-resp" style="margin: 40px 0 0;">
                    <li>
                        <button class="login-resp" @click="Login_on = true , SignUp_on = false">ورود</button>
                    </li>
                    <li>
                        <signUp class="signUp-resp" @click="SignUp_on = true , Login_on = false " />
                    </li>
                </ul>
            </div>
            <div class="signUp_in_responsive" v-if="SignUp_on || user_store.open_SignUp">
                <div style="padding: 15px 15px 0 15px;">
                    <button class="close-add-label" @click="SignUp_on = false, user_store.open_SignUp= false , SignUp_on = false , user_store.open_SignUp= false, accept_email = false">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" fill="#B0BEC5" viewBox="0 0 24 24" ><path fill-rule="evenodd" d="M17.707 7.707a1 1 0 0 0-1.414-1.414L12 10.586 7.707 6.293a1 1 0 0 0-1.414 1.414L10.586 12l-4.293 4.293a1 1 0 1 0 1.414 1.414L12 13.414l4.293 4.293a1 1 0 0 0 1.414-1.414L13.414 12l4.293-4.293Z" clip-rule="evenodd"></path></svg>
                    </button>
                </div>
                <div class="new-responsive-signUp">
                    <h2>الان ثبت نام کن</h2>
                    <p>اطلاعات، پرداخت‌ها و امضاها را با فرم‌های آنلاین سفارشی جمع‌آوری کن.</p>
                    <p id="signUp-p" v-if="!accept_email">ثبت نام با</p>
                    <div class="signUp-with" v-if="!accept_email">
                        <button>
                            <span><svg fill="none" width="32" xmlns="http://www.w3.org/2000/svg" viewBox="2 1 32 32"><circle cx="18.5" cy="18" r="18" fill="white"></circle><path d="M30.8759 18.2751C30.8759 17.2576 30.7916 16.5151 30.6093 15.7451H18.7534V20.3376H25.7125C25.5723 21.4789 24.8146 23.1976 23.1309 24.3525L23.1073 24.5063L26.8559 27.3522L27.1156 27.3776C29.5008 25.2188 30.8759 22.0426 30.8759 18.2751Z" fill="#4285F4"></path><path d="M18.7518 30.3758C22.1612 30.3758 25.0234 29.2758 27.114 27.3783L23.1293 24.3532C22.063 25.082 20.6318 25.5907 18.7518 25.5907C15.4125 25.5907 12.5784 23.432 11.5681 20.4482L11.42 20.4606L7.52217 23.4169L7.47119 23.5557C9.54769 27.5982 13.813 30.3758 18.7518 30.3758Z" fill="#34A853"></path><path d="M11.5695 20.4475C11.303 19.6775 11.1487 18.8525 11.1487 18C11.1487 17.1475 11.303 16.3225 11.5555 15.5525L11.5485 15.3885L7.60177 12.3848L7.47264 12.445C6.61681 14.1225 6.12573 16.0063 6.12573 18C6.12573 19.9938 6.61681 21.8774 7.47264 23.555L11.5695 20.4475Z" fill="#FBBC05"></path><path d="M18.7519 10.4109C21.123 10.4109 22.7225 11.4147 23.6345 12.2535L27.1983 8.84348C25.0095 6.84973 22.1612 5.62598 18.7519 5.62598C13.813 5.62598 9.5477 8.40346 7.47119 12.4459L11.5541 15.5535C12.5784 12.5697 15.4126 10.4109 18.7519 10.4109Z" fill="#EB4335"></path></svg></span>
                            <span>گوگل</span>
                        </button>
                        <button>
                            <span><svg width="32" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="2 1 32 32"><rect x="19.8198" y="19.125" width="11.25" height="11.25" fill="#FEBA08"></rect><rect x="6.31982" y="19.125" width="11.25" height="11.25" fill="#05A6F0"></rect><rect x="19.8198" y="5.625" width="11.25" height="11.25" fill="#80BC06"></rect><rect x="6.31982" y="5.625" width="11.25" height="11.25" fill="#F25325"></rect></svg></span>
                            <span>مایکروسافت</span>
                        </button>
                    </div>
                    <div class="space" style="margin: 0 140px 12px;" v-if="!accept_email">
                        <div class="thin"></div>
                        <span>یا</span>
                        <div class="thin"></div>
                    </div>
                    <div class="signUp-email" v-if="!accept_email" @keyup.enter="get_email()">
                        <span><label for="email-address" style="text-align: center;">ایمیل</label></span>
                        <span><input type="text" key="email-address" v-model="user_email" @input="text_error = ''" style="width: 90%;"></span>
                        <span v-if="text_error" style="color: red; padding: 5px 0;">{{ text_error }}</span>
                        <span><button class="continue" @click="get_email()" style="width: 90%;">ادامه</button></span>
                        <div class="login-box">
                            قبلا ثبت نام کرده اید؟
                            <button @click="user_store.change_box('Login'), SignUp_on= false,user_email ='',text_error=''">ورود</button>
                        </div>
                    </div>
                    <div class="signUp-username" v-if="accept_email" @keyup.enter="send_new_user(e)">
                        <div class="item-signUp" style="width: 100%;">
                            <span style="width: 100%;"><label style="text-align: center;" for="user-name">نام کاربری</label></span>
                            <span style="width: 100%;"><input  type="text" key="user-name" v-model="New_User.username" @input="text_error = ''" style="width: 90%;"></span>
                        </div>
                        <div class="item-signUp" style="width: 100%;">
                            <span style="width: 100%;"><label style="text-align: center;" for="email-address">ایمیل</label></span>
                            <span style="width: 100%;"><input type="text" key="email-address" class="input-ltr" v-model="user_email" :disabled="accept_email" @input="text_error = ''" style="width: 90%;"></span>
                        </div>
                        <div class="item-signUp" style="width: 100%;">
                            <span style="width: 100%;"><label style="text-align: center;" for="password">رمز عبور</label></span>
                            <span style="width: 100%;"><input type="password" key="password" class="input-ltr" v-model="New_User.password" @input="text_error = ''" style="width: 90%;"></span>
                        </div>
                        <div class="item-signUp" style="width: 100%;">
                            <span style="width: 100%;"><label style="text-align: center;" for="password-again">تکرار رمز عبور</label></span>
                            <span style="width: 100%;"><input type="password" key="password-again" v-model="password_again" class="input-ltr" @input="text_error = ''" style="width: 90%;"></span>
                            <span v-if="text_error" style="color: red; padding: 5px 0;">{{ text_error }}</span>
                        </div>
                        <div class="item-signUp" style="width: 100%; flex-direction: row;">
                            <button @click="send_new_user(e)" style="width: 90%;">ثبت نام</button>
                        </div>
                    </div>
                </div>
    </div>
            <nav class="check-item check-item-workspace" style="position: relative;">
                <logo_without @click="back_home()"/>
                <div id="none-workspace"  :style="{marginLeft: User_Name? '130px':''}" @click="box_content = !box_content">
                    <span class="page-name">صفحه کار من</span>
                    <span class="arrow-back">
                        <svg style="display: flex;" xmlns="http://www.w3.org/2000/svg" :class="{rotate: box_content}" width="20" height="100%" fill="#fff" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M4.293 8.293a1 1 0 0 1 1.414 0L12 14.586l6.293-6.293a1 1 0 1 1 1.414 1.414l-7 7a1 1 0 0 1-1.414 0l-7-7a1 1 0 0 1 0-1.414Z" clip-rule="evenodd"></path>
                        </svg>
                    </span>
                </div>
                
                <button class="signUp-back-withe" @click="SignUp_on= true" v-if="!User_Name && !tuggle">ثبت نام رایگان</button>
                <div @click="tuggle = !tuggle" :class="{active: tuggle}" class="hamburger-menu hamburger-back">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            
            </nav>
            <menu_bar_myWork id="color-bf-menu" class="responsive-workspace-header"/>
        </div>
    </div>
    <div class="create-tool-box" :style="{justifyContent:selected_form?'right':''}">
        <div class="button-box">
            <button class="create-box" @click="active_products = true,check_user_status()">
                <span>+</span>
                <span>ایجاد</span>
            </button>
        </div>
        <div class="product-box" v-if="active_products">
            <button class="close-add-label close-product" @click="active_products = false">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" fill="#B0BEC" viewBox="0 0 24 24" ><path fill="#fff" d="M17.707 7.707a1 1 0 0 0-1.414-1.414L12 10.586 7.707 6.293a1 1 0 0 0-1.414 1.414L10.586 12l-4.293 4.293a1 1 0 1 0 1.414 1.414L12 13.414l4.293 4.293a1 1 0 0 0 1.414-1.414L13.414 12l4.293-4.293Z" clip-rule="evenodd"></path></svg>
            </button>
            <div class="product-selector">
                <div class="header-box-product">
                    <h1>با چه چیزی دوست داری شروع کنی، {{ User_Name }}؟</h1>
                    <h2>فرم‌های هوشمندتری ایجاد کنید، داده‌ها را جمع‌آوری و مدیریت کنید، گردش‌های کاری را خودکار کنید و سازماندهی خود را حفظ کنید - همه در یک مکان.</h2>
                </div>
                <ul class="product-item">
                    <li>
                        <button @click="active_products = false,choose_option = true">
                            <div class="product-item-icon icon-1">
                                <svg xmlns="http://www.w3.org/2000/svg" width="45" fill="none" viewBox="0 0 24 24"><path fill="#fff" d="M18 1H6a3 3 0 0 0-3 3v16a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V4a3 3 0 0 0-3-3Z"></path><path fill="#FFB629" d="M6 17.5A1.5 1.5 0 0 1 7.5 16h9a1.5 1.5 0 0 1 0 3h-9A1.5 1.5 0 0 1 6 17.5Z"></path><path fill="#FF6100" d="M6 12.5A1.5 1.5 0 0 1 7.5 11h9a1.5 1.5 0 0 1 0 3h-9A1.5 1.5 0 0 1 6 12.5Z"></path><path fill="#09F" d="M6 7.5A1.5 1.5 0 0 1 7.5 6h9a1.5 1.5 0 0 1 0 3h-9A1.5 1.5 0 0 1 6 7.5Z"></path></svg>
                            </div>
                            <div class="describe-item">
                                <div>فرم</div>
                                <div>فرم های با منطق جهت خودکارسازی ایجاد کن.</div>
                            </div>
                        </button>
                    </li>
                    <li>
                        <button>
                            <div class="product-item-icon icon-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="45" fill="none" viewBox="0 0 24 24"><path fill="#fff" d="M18 1H6a3 3 0 0 0-3 3v16a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V4a3 3 0 0 0-3-3Z"></path><path fill="#C8CEED" fill-rule="evenodd" d="M11.5 6v2.5H8.8a1.3 1.3 0 0 0-1.3 1.3V11h1V9.8a.3.3 0 0 1 .3-.3h6.4a.3.3 0 0 1 .3.3V11h1V9.8a1.3 1.3 0 0 0-1.3-1.3h-2.7V6h-1Zm0 9v3h1v-3h2.7a1.3 1.3 0 0 0 1.3-1.3V12h-1v1.7a.3.3 0 0 1-.3.3H8.8a.3.3 0 0 1-.3-.3V12h-1v1.7A1.3 1.3 0 0 0 8.8 15h2.7Z" clip-rule="evenodd"></path><path fill="#FF6100" d="M13.5 4h-3a1.5 1.5 0 1 0 0 3h3a1.5 1.5 0 0 0 0-3Z"></path><path fill="#09F" d="M13.5 17h-3a1.5 1.5 0 0 0 0 3h3a1.5 1.5 0 0 0 0-3Z"></path><path fill="#FFB629" fill-rule="evenodd" d="M6.5 10.25h3a1.5 1.5 0 0 1 0 3h-3a1.5 1.5 0 0 1 0-3Z" clip-rule="evenodd"></path><path fill="#FFB629" d="M14.5 10.25h3a1.5 1.5 0 0 1 0 3h-3a1.5 1.5 0 0 1 0-3Z"></path></svg>
                            </div>
                            <div class="describe-item">
                                <div>روندکار
                                    <small>(به زودی)</small>
                                </div>
                                <div>به راحتی روندکار ها را خودکارسازی کن.</div>
                            </div>
                        </button>
                    </li>
                    <li>
                        <button>
                            <div class="product-item-icon icon-3">
                                <svg xmlns="http://www.w3.org/2000/svg" width="45" fill="none" viewBox="0 0 24 24"><path fill="#fff" d="M18 1H6a3 3 0 0 0-3 3v16a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V4a3 3 0 0 0-3-3Z"></path><path fill="#FFB629" d="M15.5 8a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v10h-3V8Z"></path><path fill="#09F" d="M5.5 7a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v11h-3V7Z"></path><path fill="#FF6100" d="M10.5 10a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v8h-3v-8Z"></path></svg>
                            </div>
                            <div class="describe-item">
                                <div>گزارش
                                    <small>(به زودی)</small>
                                </div>
                                <div>از فرم های آنلاین خودت گزارش هوشمند بساز.</div>
                            </div>
                        </button>
                    </li>
                </ul>
            </div>
        </div>
        <div class="product-box" v-if="choose_option">
            <button class="close-add-label close-product" @click="active_products = false , choose_option = false">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" fill="#B0BEC" viewBox="0 0 24 24" ><path fill="#fff" d="M17.707 7.707a1 1 0 0 0-1.414-1.414L12 10.586 7.707 6.293a1 1 0 0 0-1.414 1.414L10.586 12l-4.293 4.293a1 1 0 1 0 1.414 1.414L12 13.414l4.293 4.293a1 1 0 0 0 1.414-1.414L13.414 12l4.293-4.293Z" clip-rule="evenodd"></path></svg>
            </button>
            <div class="template-or-scratch">
                <div class="header-box-product edit-template">
                    <h1> فرم ایجاد کنید</h1>
                    <h2>با فرم‌های قدرتمندی که از منطق شرطی استفاده می‌کنند، پرداخت‌ها را می‌پذیرند، گزارش تولید می‌کنند و گردش‌های کاری را خودکار می‌کنند، شروع به جمع‌آوری داده‌ها کنید.</h2>
                </div>
                <ul class="product-item temp-scratch-button">
                    <li>
                        <button @click="choose_option = false , choose_cardORform = true">
                            <div class="scratch-back"><svg xmlns="http://www.w3.org/2000/svg" fill="#454e80" viewBox="0 0 24 24" class="jfWizard-list-item-icon-svg optionIcon" width="70" height="80"><path fill-rule="evenodd" d="M13 5a1 1 0 1 0-2 0v6H5a1 1 0 1 0 0 2h6v6a1 1 0 1 0 2 0v-6h6a1 1 0 1 0 0-2h-6V5Z" clip-rule="evenodd"></path></svg></div>
                            <div style="font-size: 18px; color: var(--jfv-google-apple-blue); font-weight: bold;margin: 16px 0 10px;">از ابتدا</div>
                            <div style="font-size: 14px; color: #343c6a;">از یک قالب خالی استفاده کنید</div>
                        </button>
                    </li>
                    <li>
                        <button>
                            <div class="template-back"><img src="/useFormTemplate_large.svg" alt="template"></div>
                            <div style="font-size: 18px; color: var(--jfv-google-apple-blue); font-weight: bold;margin: 16px 0 10px;">استفاده از قالب</div>
                            <div style="font-size: 14px; color: #343c6a;">از تعداد زیادی قالب آماده می توانید استفاده کنید</div>
                        </button>
                    </li>
                </ul>
            </div>
            <button class="back-product" @click="active_products = true, choose_option =false">
                <span>برگشت</span>
                <span style="display: flex;"><svg xmlns="http://www.w3.org/2000/svg" width="24" fill="currentColor" viewBox="0 0 24 24" class="backButton-svg"><path fill-rule="evenodd" d="M10.707 7.707a1 1 0 0 0-1.414-1.414l-5 5a1 1 0 0 0 0 1.414l5 5a1 1 0 0 0 1.414-1.414L7.414 13H19a1 1 0 1 0 0-2H7.414l3.293-3.293Z" clip-rule="evenodd"></path></svg></span>
            </button>
        </div>
        <div class="product-box" v-if="choose_cardORform">
            <button class="close-add-label close-product" @click="active_products = false , choose_option = false">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" fill="#B0BEC" viewBox="0 0 24 24" ><path fill="#fff" d="M17.707 7.707a1 1 0 0 0-1.414-1.414L12 10.586 7.707 6.293a1 1 0 0 0-1.414 1.414L10.586 12l-4.293 4.293a1 1 0 1 0 1.414 1.414L12 13.414l4.293 4.293a1 1 0 0 0 1.414-1.414L13.414 12l4.293-4.293Z" clip-rule="evenodd"></path></svg>
            </button>
            <div class="template-or-scratch">
                <div class="header-box-product edit-template">
                    <h1>انتخاب طرح بندی فرم</h1>
                    <h2>یک طرح بندی را براساس نیازهای خود انتخاب کنید.</h2>
                </div>
                <ul class="product-item temp-scratch-button">
                    <li>
                        <button @click="choose_cardORform = false , open_formBuilder()">
                            <div class="classic-back common-back"><img src="/classic_large.svg" alt="classic form"></div>
                            <div style="font-size: 18px; color: var(--jfv-google-apple-blue); font-weight: bold; margin: 16px 0 10px;">فرم کلاسیک</div>
                            <div style="font-size: 14px; color: #343c6a;">نمایش تمام سوالات در یک صفحه</div>
                        </button>
                    </li>
                    <li>
                        <button>
                            <div class="card-back common-back"><img src="/card_large.svg" alt="template"></div>
                            <div style="font-size: 18px; color: var(--jfv-google-apple-blue); font-weight: bold;margin: 16px 0 10px;">فرم کارت</div>
                            <div style="font-size: 14px; color: #343c6a;">نمایش هر سوال در یک صفحه مجزا</div>
                        </button>
                    </li>
                </ul>
            </div>
            <button class="back-product" @click="choose_option = true, choose_cardORform =false">
                <span>برگشت</span>
                <span style="display: flex;"><svg xmlns="http://www.w3.org/2000/svg" width="24" fill="currentColor" viewBox="0 0 24 24" class="backButton-svg"><path fill-rule="evenodd" d="M10.707 7.707a1 1 0 0 0-1.414-1.414l-5 5a1 1 0 0 0 0 1.414l5 5a1 1 0 0 0 1.414-1.414L7.414 13H19a1 1 0 1 0 0-2H7.414l3.293-3.293Z" clip-rule="evenodd"></path></svg></span>
            </button>
        </div>
        <div class="box-sure-delete" v-if="sure_aboutDelete">
            <div class="div-sure-delete">
                <div style="padding: 32px 32px 0;">
                    <div>
                        <button class="close-add-label" id="close-delete-form-button" @click="sure_aboutDelete = false">
                            <svg width="22" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" class="magnet-button-icon shrink-0 w-5 h-5" style="display: flex;"><path fill-rule="evenodd" d="M17.707 7.707a1 1 0 0 0-1.414-1.414L12 10.586 7.707 6.293a1 1 0 0 0-1.414 1.414L10.586 12l-4.293 4.293a1 1 0 1 0 1.414 1.414L12 13.414l4.293 4.293a1 1 0 0 0 1.414-1.414L13.414 12l4.293-4.293Z" clip-rule="evenodd"></path></svg>
                        </button>
                    </div>
                    <div class="trash-icon">
                        <div class="trash-icon-back"> 
                            <svg width="40" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M7 5H4a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h2.764A2.99 2.99 0 0 1 9 1h6a2.99 2.99 0 0 1 2.236 1H20a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H7ZM4.036 6.534A.5.5 0 0 1 4.535 6h14.93a.5.5 0 0 1 .5.534l-.92 13.667A3 3 0 0 1 16.052 23H7.948a3 3 0 0 1-2.993-2.799l-.92-13.667ZM12 16a1 1 0 0 1-1-1v-4a1 1 0 1 1 2 0v4a1 1 0 0 1-1 1Zm-1 2a1 1 0 1 1 2 0 1 1 0 0 1-2 0Z" clip-rule="evenodd"></path></svg>
                        </div>
                    </div>
                    <div class="h2-delete-item">
                        <h2 v-if="delete_type === 'form'">حذف فرم</h2>
                        <h2 v-else>حذف برچسب</h2>
                    </div>
                    <div style="text-align: center; color: #6c73a8;">
                        <span v-if="delete_type === 'form'">آیا از حذف فرم مطمئن هستید؟</span>
                        <span v-else>آیا از حذف برچسب مطمئن هستید؟ تمام فرم های این برچسب حذف خواهد شد</span>
                    </div>
                </div>
                <div class="button-delete-cancel">
                    <div>
                        <button class="delete-button-common cancel-delete" @click="sure_aboutDelete = false">لغو</button>
                        <button v-if="delete_type === 'form'" class="delete-button-common accept-delete" @click="Delete_Form(),sure_aboutDelete = false">حذف</button>
                        <button v-if="delete_type === 'label'" class="delete-button-common accept-delete" @click="delete_label(),sure_aboutDelete = false">حذف</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="delete-form-tool-box" v-if="selected_form">
            <button @click="sure_aboutDelete = true,delete_type = 'form'">
                <svg style="display: flex;" width="20" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M4 5h16a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1h-2.764c-.55-.614-1.348-1-2.236-1H9a2.99 2.99 0 0 0-2.236 1H4a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1Zm.036 1.534A.5.5 0 0 1 4.535 6h14.93a.5.5 0 0 1 .5.534l-.92 13.667A3 3 0 0 1 16.052 23H7.948a3 3 0 0 1-2.993-2.799l-.92-13.667ZM10 11a1 1 0 0 0-1 1v5a1 1 0 1 0 2 0v-5a1 1 0 0 0-1-1Zm4 0a1 1 0 0 0-1 1v5a1 1 0 1 0 2 0v-5a1 1 0 0 0-1-1Z" clip-rule="evenodd"></path></svg>
            </button>
        </div>
        <div class="no-access-for-toolbar-responsive"></div>
        <div v-if="!selected_form" class="tool-box" :style="{background:label_color_back !== ''?`linear-gradient(-270deg, #fff 0%, ${label_color_back} 99.97%)`:''}">
            <div class="div-isApp-toolbar">
                <button class="isApp-toolbar-responsive" @click.prevent="open_menu = true">
                    <span>
                        <svg style="display: flex; transform: rotate(180deg);" width="24" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M7.707 7.293a1 1 0 0 0-1.414 1.414L9.586 12l-3.293 3.293a1 1 0 1 0 1.414 1.414l4-4a1 1 0 0 0 0-1.414l-4-4Zm6 0a1 1 0 1 0-1.414 1.414L15.586 12l-3.293 3.293a1 1 0 0 0 1.414 1.414l4-4a1 1 0 0 0 0-1.414l-4-4Z" clip-rule="evenodd"></path></svg>
                    </span>
                    <span>منو</span>
                </button>
            </div>
            <div id="label_tool-box-name" v-if="label_name_show">
                <button>
                    <span style="background-color: var(--jfv-google-apple-blue); border-radius: 4px; color: #fff; height: 36px; width: 36px; display: flex;
                    justify-content: center;
                    align-items: center;">
                        <svg width="20" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" height="20"><path fill-rule="evenodd" d="M7.428 3.264a.477.477 0 0 0-.854 0l-3.522 7.045a.477.477 0 0 0 .427.691h7.044a.477.477 0 0 0 .427-.69L7.428 3.263ZM17 21a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM13 4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1h-6a1 1 0 0 1-1-1V4Zm-9 9a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-6a1 1 0 0 0-1-1H4Z" clip-rule="evenodd"></path></svg>
                    </span>
                    <span style="padding-right: 8px;">همه</span>
                </button>
                <span style="width: 20px; display: flex; align-items: center; justify-content: center;">
                    <svg style="transform: rotate(90deg);" xmlns="http://www.w3.org/2000/svg" width="18" height="100%" fill="currentColor" viewBox="-5 0 35 18"><path fill-rule="evenodd" d="M4.293 8.293a1 1 0 0 1 1.414 0L12 14.586l6.293-6.293a1 1 0 1 1 1.414 1.414l-7 7a1 1 0 0 1-1.414 0l-7-7a1 1 0 0 1 0-1.414Z" clip-rule="evenodd"></path></svg>
                </span>
                <button id="button-before-arrow">
                    <span class="maximum-height">
                        <svg style="transform: rotate(180deg);" xmlns="http://www.w3.org/2000/svg" :fill="label_color_back" width="15" height="100%" viewBox="0 0 24 24" aria-hidden="true"><path fill-rule="evenodd" d="M5 4a4 4 0 0 0-4 4v8a4 4 0 0 0 4 4h10.154a3 3 0 0 0 2.153-.911l4.85-5a3 3 0 0 0 0-4.178l-4.85-5A3 3 0 0 0 15.154 4H5Z" clip-rule="evenodd"></path></svg>
                    </span>
                    <span style="padding-right: 4px;">{{ label_name_show }}</span>
                </button>
            </div>
            <div class="type-sort-button">
                <button :class="{active_field:filter_type}" class="height-sort-type" @click="filter_forms()">
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" fill="currentColor" viewBox="0 0 24 24" class="folder-icon w-5 h-5 shrink-0"><path fill-rule="evenodd" d="M7.428 3.264a.477.477 0 0 0-.854 0l-3.522 7.045a.477.477 0 0 0 .427.691h7.044a.477.477 0 0 0 .427-.69L7.428 3.263ZM17 21a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM13 4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1h-6a1 1 0 0 1-1-1V4Zm-9 9a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-6a1 1 0 0 0-1-1H4Z" clip-rule="evenodd"></path></svg>
                    </span>
                    <span>نوع</span>
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" :class="{rotate:filter_type}" width="12" fill="currentColor" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M4.293 8.293a1 1 0 0 1 1.414 0L12 14.586l6.293-6.293a1 1 0 1 1 1.414 1.414l-7 7a1 1 0 0 1-1.414 0l-7-7a1 1 0 0 1 0-1.414Z" clip-rule="evenodd"></path></svg>
                    </span>
                    <div class="filter-forms" v-show="filter_type">
                        <ul>
                            <li class="filter-forms-items" id="different">
                                <span></span>
                                <label for="select-all">انتخاب همه</label>
                                <input type="checkbox" style="cursor: pointer;" id="select-all" checked>
                            </li>
                            <li class="filter-forms-items">
                                <span><svg xmlns="http://www.w3.org/2000/svg" width="17" fill="none" viewBox="0 -1 24 24"><path fill="#fff" d="M18 1H6a3 3 0 0 0-3 3v16a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V4a3 3 0 0 0-3-3Z"></path><path fill="#C8CEED" fill-rule="evenodd" d="M18 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2ZM6 1h12a3 3 0 0 1 3 3v16a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V4a3 3 0 0 1 3-3Z" clip-rule="evenodd"></path><path fill="#FFB629" d="M6 17.5A1.5 1.5 0 0 1 7.5 16h9a1.5 1.5 0 0 1 0 3h-9A1.5 1.5 0 0 1 6 17.5Z"></path><path fill="#FF6100" d="M6 12.5A1.5 1.5 0 0 1 7.5 11h9a1.5 1.5 0 0 1 0 3h-9A1.5 1.5 0 0 1 6 12.5Z"></path><path fill="#09F" d="M6 7.5A1.5 1.5 0 0 1 7.5 6h9a1.5 1.5 0 0 1 0 3h-9A1.5 1.5 0 0 1 6 7.5Z"></path></svg></span>
                                <label for="select-forms">فرم ها</label>
                                <input type="checkbox" style="cursor: pointer;" id="selcet-forms" checked>
                                
                            </li>
                            <li class="filter-forms-items">
                                <span><svg xmlns="http://www.w3.org/2000/svg" width="18" fill="none" viewBox="0 -1 24 24"><path fill="#fff" d="M18 1H6a3 3 0 0 0-3 3v16a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V4a3 3 0 0 0-3-3Z"></path><path fill="#C8CEED" fill-rule="evenodd" d="M18 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2ZM6 1h12a3 3 0 0 1 3 3v16a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V4a3 3 0 0 1 3-3Z" clip-rule="evenodd"></path><path fill="#C8CEED" fill-rule="evenodd" d="M11.5 6v2.5H8.8a1.3 1.3 0 0 0-1.3 1.3V11h1V9.8a.3.3 0 0 1 .3-.3h6.4a.3.3 0 0 1 .3.3V11h1V9.8a1.3 1.3 0 0 0-1.3-1.3h-2.7V6h-1Zm0 9v3h1v-3h2.7a1.3 1.3 0 0 0 1.3-1.3V12h-1v1.7a.3.3 0 0 1-.3.3H8.8a.3.3 0 0 1-.3-.3V12h-1v1.7A1.3 1.3 0 0 0 8.8 15h2.7Z" clip-rule="evenodd"></path><path fill="#09F" d="M13.5 17h-3a1.5 1.5 0 0 0 0 3h3a1.5 1.5 0 0 0 0-3Z"></path><path fill="#FFB629" fill-rule="evenodd" d="M6.5 10.25h3a1.5 1.5 0 0 1 0 3h-3a1.5 1.5 0 0 1 0-3Z" clip-rule="evenodd"></path><path fill="#FFB629" d="M14.5 10.25h3a1.5 1.5 0 0 1 0 3h-3a1.5 1.5 0 0 1 0-3Z"></path><path fill="#FF6100" d="M13.5 4h-3a1.5 1.5 0 1 0 0 3h3a1.5 1.5 0 0 0 0-3Z"></path></svg></span>
                                <label for="select-workflows">روند کار ها</label>
                                <input type="checkbox" style="cursor: pointer;" id="selcet-workflows" checked>
                            </li>
                            <li class="filter-forms-items">
                                <span><svg xmlns="http://www.w3.org/2000/svg" width="17" fill="none" viewBox="0 -1 24 24"><path fill="#fff" d="M18 1H6a3 3 0 0 0-3 3v16a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V4a3 3 0 0 0-3-3Z"></path><path fill="#FFB629" d="M15.5 8a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v10h-3V8Z"></path><path fill="#09F" d="M5.5 7a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v11h-3V7Z"></path><path fill="#FF6100" d="M10.5 10a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v8h-3v-8Z"></path><path fill="#C8CEED" fill-rule="evenodd" d="M18 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2ZM6 1h12a3 3 0 0 1 3 3v16a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V4a3 3 0 0 1 3-3Z" clip-rule="evenodd"></path></svg></span>
                                <label for="select-reports">گزارشات</label>
                                <input type="checkbox" style="cursor: pointer;" id="selcet-reports" checked>
                            </li>
                        </ul>
                    </div>
                </button>
            </div>
            <div class="type-sort-button">
                <button class="height-sort-type" @click="sort_forms()" :class="{active_field:sort_type}">
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="100%" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true" class="w-6 top-2 absolute left-2 pointer-events-none  color-navy-700"><path fill-rule="evenodd" d="M16 16V4a1 1 0 1 1 2 0v12h2a1 1 0 0 1 .707 1.707l-3 3a1 1 0 0 1-1.414 0l-3-3A1 1 0 0 1 14 16h2ZM3 14a1 1 0 0 1 1-1h5a1 1 0 1 1 0 2H4a1 1 0 0 1-1-1Zm1-5a1 1 0 0 0 0 2h7a1 1 0 1 0 0-2H4ZM3 6a1 1 0 0 1 1-1h9a1 1 0 1 1 0 2H4a1 1 0 0 1-1-1Zm1 11a1 1 0 1 0 0 2h2a1 1 0 1 0 0-2H4Z" clip-rule="evenodd"></path></svg>
                    </span>
                    <span>{{sort_option}}</span>
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" :class="{rotate:sort_type}" width="12" fill="currentColor" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M4.293 8.293a1 1 0 0 1 1.414 0L12 14.586l6.293-6.293a1 1 0 1 1 1.414 1.414l-7 7a1 1 0 0 1-1.414 0l-7-7a1 1 0 0 1 0-1.414Z" clip-rule="evenodd"></path></svg>
                    </span>
                    <div class="filter-forms sort-forms" v-show="sort_type">
                        <ul>
                            <li class="filter-forms-items" v-for="item in menu_sort" @click="put_value(item)" :key="item.id"><span>{{ item.text }} 
                                </span>
                                <span v-show="item.text==sort_option" class="arrow-back mark-select"><svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" 
                                    width="20" 
                                    height="100%" viewBox="-7 0 30 24" class="w-4 h-4 color-white"><path fill-rule="evenodd" d="M18.707 7.293a1 1 0 0 1 0 1.414l-8 8a1 1 0 0 1-1.414 0l-4-4a1 1 0 1 1 1.414-1.414L10 14.586l7.293-7.293a1 1 0 0 1 1.414 0Z" clip-rule="evenodd"></path></svg>
                                </span>
                            </li>
                        </ul>
                    </div>
                </button>
            </div>
            <div class="search-button height-sort-type">
                <span class="search-normal">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="100%" fill="currentColor" viewBox="0 0 24 24" class="shrink-0 w-5"><path fill-rule="evenodd" d="M15.763 17.175a8.5 8.5 0 1 1 1.413-1.413l.031.03 4.5 4.5a1 1 0 0 1-1.414 1.415l-4.5-4.5a.903.903 0 0 1-.03-.032ZM17 10.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0Z" clip-rule="evenodd"></path></svg>
                </span>
                <input type="search" placeholder="جستجو" class="search-normal">
                <span @click="open_search = true" class="search-in-responsive">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="100%" fill="currentColor" viewBox="0 0 24 24" class="shrink-0 w-5"><path fill-rule="evenodd" d="M15.763 17.175a8.5 8.5 0 1 1 1.413-1.413l.031.03 4.5 4.5a1 1 0 0 1-1.414 1.415l-4.5-4.5a.903.903 0 0 1-.03-.032ZM17 10.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0Z" clip-rule="evenodd"></path></svg>
                </span>
                <input type="search" placeholder="جستجو" v-if="open_search">
            </div>
        </div>
    </div>

    <div class="forms-sideBar">
        <div class="sideBar" :class="{settingLabelOn : edit_label , settingLabelOff : !edit_label}" :style="{right:open_menu?'0':''}">
            <div class="title-sideBar">
                <span>صفحه کار من</span>
                <span class="three-dot-normal"><button class="icon-three-dot" @click="adding_label()">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="100%" fill="#545f6f" viewBox="0 -2 24 24" class="w-4 h-4"><path fill-rule="evenodd" d="M12 7a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5Zm0 7.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5Zm-2.5 5a2.5 2.5 0 1 0 5 0 2.5 2.5 0 0 0-5 0Z" clip-rule="evenodd"></path></svg>
                </button></span>
                <span class="back-arrow-responsive" @click="open_menu = false">
                    <svg width="24" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" style="display: flex;"><path fill-rule="evenodd" d="M7.707 7.293a1 1 0 0 0-1.414 1.414L9.586 12l-3.293 3.293a1 1 0 1 0 1.414 1.414l4-4a1 1 0 0 0 0-1.414l-4-4Zm6 0a1 1 0 1 0-1.414 1.414L15.586 12l-3.293 3.293a1 1 0 0 0 1.414 1.414l4-4a1 1 0 0 0 0-1.414l-4-4Z" clip-rule="evenodd"></path></svg>
                </span>
                <div class="add-label" v-show="add_label" @click="div_label = true , add_label= false ,check_user_status()">
                    <span class="maximum-height"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="100%" fill="#fff" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M12 23c6.075 0 11-4.925 11-11S18.075 1 12 1 1 5.925 1 12s4.925 11 11 11Zm0-16a1 1 0 0 1 1 1v3h3a1 1 0 1 1 0 2h-3v3a1 1 0 1 1-2 0v-3H8a1 1 0 1 1 0-2h3V8a1 1 0 0 1 1-1Z" clip-rule="evenodd"></path></svg></span>
                    <span>ایجاد برچسب</span>
                </div>
            </div>
            <div class="page-no-access" v-if="change_name_label">
                <div class="box-add-label">
                    <div class="head-add-label">
                        <div class="plus-add-label">
                            <div class="background-plus">
                                <svg width="25" xmlns="http://www.w3.org/2000/svg" fill="#fff" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M4 5a1 1 0 0 1 1-1h7a1 1 0 1 0 0-2H5a3 3 0 0 0-3 3v14a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3v-7a1 1 0 1 0-2 0v7a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5Zm6.84 4.17c.12-.375.33-.716.608-.995l5.443-5.443c.97-.97 2.542-.97 3.512 0l.869.87c.97.97.97 2.541 0 3.51l-5.443 5.444c-.279.279-.62.487-.995.608l-2.314.744c-1.494.481-2.905-.93-2.424-2.424l.744-2.314Zm2.022.42a.483.483 0 0 0-.118.193l-.7 2.178 2.177-.7a.483.483 0 0 0 .194-.12l3.312-3.311-1.553-1.553-3.312 3.313Zm6.996-3.891-.717.717-1.552-1.553.716-.717a.483.483 0 0 1 .683 0l.87.87a.483.483 0 0 1 0 .683Z" clip-rule="evenodd"></path></svg>
                            </div>
                            <span>تغییر نام برچسب</span>
                        </div>
                        <button class="close-add-label" @click="change_name_label = false">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" fill="currentColor" viewBox="0 0 24 24" ><path fill-rule="evenodd" d="M17.707 7.707a1 1 0 0 0-1.414-1.414L12 10.586 7.707 6.293a1 1 0 0 0-1.414 1.414L10.586 12l-4.293 4.293a1 1 0 1 0 1.414 1.414L12 13.414l4.293 4.293a1 1 0 0 0 1.414-1.414L13.414 12l4.293-4.293Z" clip-rule="evenodd"></path></svg>
                        </button>
                    </div>
                    <div class="input-add-label">
                        <label for="new-label">نام برچسب</label>
                        <input type="text" id="new-label" v-model="model_name" @input="text_error = ''" @keyup.enter="send_new_name()">
                    </div>
                    <div style="display: flex;justify-content: center;padding: 5px 0;">
                        <span v-if="text_error" style="color: red; padding: 5px 0;">{{ text_error }}</span>
                    </div>
                    <div class="button-add-label">
                        <button @click="change_name_label = false"><span>لغو</span></button>
                        <button @click="send_new_name()"><span>ادامه</span></button>
                    </div>
                </div>
            </div>
            <div>
                <ul class="label-list">
                    <li class="folder" @click="get_Labelforms('-1','',''),get_all_Forms()" :style="{backgroundColor:label_name_show === ''?'#c8ceed':''}">
                        <span style="width: 10%;"><svg @click="change_label_show()" xmlns="http://www.w3.org/2000/svg" :class="{rotate_half:!label_list}" style="transition: .3s ease;" width="20" fill="currentColor" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M8 11a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l2-2 2-2A1 1 0 0 0 16 11H8Z" clip-rule="evenodd"></path></svg></span>
                        <span style="width: 10%;"><svg xmlns="http://www.w3.org/2000/svg" width="20" fill="currentColor" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M7.428 3.264a.477.477 0 0 0-.854 0l-3.522 7.045a.477.477 0 0 0 .427.691h7.044a.477.477 0 0 0 .427-.69L7.428 3.263ZM17 21a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM13 4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1h-6a1 1 0 0 1-1-1V4Zm-9 9a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-6a1 1 0 0 0-1-1H4Z" clip-rule="evenodd"></path></svg></span>
                        <span style="width: 60%;margin: 0 12px;">همه</span>
                    </li>
                    <li v-if="label_list" v-for="(item,index) in Labels" class="folder label-names" :key="index" @click="get_Labelforms(item._id,item.name,item.color),get_all_Forms()" :style="{backgroundColor:label_name_show === item.name?'#c8ceed':''}">
                        <span style="width: 10%;" class="maximum-height"><svg xmlns="http://www.w3.org/2000/svg" style="transform: rotate(180deg);" width="20" height="100%" fill="currentColor" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M9 17a1 1 0 0 0 1.707.707l4-4a1 1 0 0 0 0-1.414l-4-4A1 1 0 0 0 9 9v8Z" clip-rule="evenodd"></path></svg></span>
                        <span style="width: 10%;" class="maximum-height"><svg xmlns="http://www.w3.org/2000/svg" :fill="item.color" width="15" height="100%" style="transform: rotate(180deg);" viewBox="0 0 24 24" aria-hidden="true"><path fill-rule="evenodd" d="M5 4a4 4 0 0 0-4 4v8a4 4 0 0 0 4 4h10.154a3 3 0 0 0 2.153-.911l4.85-5a3 3 0 0 0 0-4.178l-4.85-5A3 3 0 0 0 15.154 4H5Z" clip-rule="evenodd"></path></svg></span>
                        <span style="width: 60%;margin: 0 12px;"> {{ item.name }}</span>
                        <span class="maximum-height" style="position: relative;">
                            <button @click.stop="setting_label(index,item._id)" class="icon-three-dot label-dot">
                                <svg id="hide-dot" xmlns="http://www.w3.org/2000/svg" width="16" height="100%" fill="#545f6f" viewBox="0 -2 24 24" class="w-4 h-4"><path fill-rule="evenodd" d="M12 7a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5Zm0 7.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5Zm-2.5 5a2.5 2.5 0 1 0 5 0 2.5 2.5 0 0 0-5 0Z" clip-rule="evenodd"></path></svg>
                                <div ref="labelSettingRef" class="setting-label" v-if="edit_label && index === index_label_edit">
                                    <ul class="ul-setting-label">
                                        <li class="common-setting-label" @click="edit_label = false, active_products = true,check_user_status()">
                                            <span>
                                                <svg style="display: flex;" width="18" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M5 2a3 3 0 0 0-3 3v14a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3V5a3 3 0 0 0-3-3H5Zm7 5a1 1 0 0 1 1 1v3h3a1 1 0 1 1 0 2h-3v3a1 1 0 1 1-2 0v-3H8a1 1 0 1 1 0-2h3V8a1 1 0 0 1 1-1Z" clip-rule="evenodd"></path></svg>
                                            </span>
                                            <span class="span-label-setting-padding">افزودن فرم جدید</span>
                                        </li>
                                        <li class="common-setting-label" @click="change_name_label = true , change_name(index)">
                                            <span>
                                                <svg style="display: flex;" width="18" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M18.715 2.586a2 2 0 0 0-2.829 0L3.782 14.69a2 2 0 0 0-.499.83l-1.189 3.888c-.468 1.532.966 2.966 2.498 2.497l3.888-1.19a2 2 0 0 0 .829-.498L21.414 8.113a2 2 0 0 0 0-2.828l-2.7-2.7Zm-2.909 2.908L17.301 4l2.698 2.699-1.494 1.494-2.699-2.699Z" clip-rule="evenodd"></path></svg>
                                            </span>
                                            <span class="span-label-setting-padding">
                                                تغییر نام
                                            </span>
                                        </li>
                                        <li class="common-setting-label change-color">
                                            <div>
                                                <span>
                                                    <svg width="18" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M12 1c-.5 0-.698.283-.698.283l-.02.02-.053.053a81.557 81.557 0 0 0-.935.938 86.34 86.34 0 0 0-2.3 2.435 49.235 49.235 0 0 0-2.547 3.02c-.76.993-1.442 2.01-1.792 2.876a9 9 0 1 0 16.69 0c-.35-.865-1.032-1.883-1.792-2.876a49.207 49.207 0 0 0-2.548-3.02 86.197 86.197 0 0 0-3.234-3.373l-.054-.054-.014-.013-.005-.006S12.5 1 12 1Z" clip-rule="evenodd"></path></svg>
                                                </span>
                                                <span class="span-label-setting-padding">تغییر رنگ</span>
                                            </div>
                                            <div style="margin: 5px -5px;display: flex;flex-wrap: wrap; position: relative;">
                                                <span v-for="(color,index) in colors" :key="index" class="label-colors-square" :style="{backgroundColor:color}" @click="update_color(index)"></span>
                                                <span @click.prevent="select_other_color = true" style="width: 32.8px;height: 32.8px; margin: 5px; display: flex; justify-content: center;align-items: center; background-color: #fff; border-radius: 2px;">
                                                    <svg style="display: flex;" width="18" xmlns="http://www.w3.org/2000/svg" fill="#000" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M13 5a1 1 0 1 0-2 0v6H5a1 1 0 1 0 0 2h6v6a1 1 0 1 0 2 0v-6h6a1 1 0 1 0 0-2h-6V5Z" clip-rule="evenodd"></path></svg>
                                                </span>
                                            </div>
                                        </li>
                                        <li class="common-setting-label" @click="sure_aboutDelete = true , delete_type = 'label'">
                                            <span>
                                                <svg style="display: flex;" width="18" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M4 5h16a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1h-2.764c-.55-.614-1.348-1-2.236-1H9a2.99 2.99 0 0 0-2.236 1H4a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1Zm.036 1.534A.5.5 0 0 1 4.535 6h14.93a.5.5 0 0 1 .5.534l-.92 13.667A3 3 0 0 1 16.052 23H7.948a3 3 0 0 1-2.993-2.799l-.92-13.667ZM10 11a1 1 0 0 0-1 1v5a1 1 0 1 0 2 0v-5a1 1 0 0 0-1-1Zm4 0a1 1 0 0 0-1 1v5a1 1 0 1 0 2 0v-5a1 1 0 0 0-1-1Z" clip-rule="evenodd"></path></svg>
                                            </span>
                                            <span class="span-label-setting-padding">حذف</span>
                                        </li>
                                    </ul>
                                </div>
                            </button>
                        </span>
                    </li>
                </ul>
                <div class="add-label-bottom" @click="div_label = true,check_user_status()">
                    <span class="maximum-height" style="width: 14%;"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="100%" fill="#6c73a8" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M12 23c6.075 0 11-4.925 11-11S18.075 1 12 1 1 5.925 1 12s4.925 11 11 11Zm0-16a1 1 0 0 1 1 1v3h3a1 1 0 1 1 0 2h-3v3a1 1 0 1 1-2 0v-3H8a1 1 0 1 1 0-2h3V8a1 1 0 0 1 1-1Z" clip-rule="evenodd"></path></svg></span>
                    <span style="color:#6c73a8 ;">ایجاد برچسب</span>
                </div>
            
                <div class="no-access-page new-label-responsive-box" v-if="div_label">
                    <div class="box-add-label">
                        <div class="head-add-label">
                            <div class="plus-add-label">
                                <div class="background-plus">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="25" fill="#fff" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M5 2a3 3 0 0 0-3 3v14a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3V5a3 3 0 0 0-3-3H5Zm7 5a1 1 0 0 1 1 1v3h3a1 1 0 1 1 0 2h-3v3a1 1 0 1 1-2 0v-3H8a1 1 0 1 1 0-2h3V8a1 1 0 0 1 1-1Z" clip-rule="evenodd"></path></svg>
                                </div>
                                <span>ایجاد برچسب</span>
                            </div>
                            <button class="close-add-label" @click="div_label = false">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" fill="currentColor" viewBox="0 0 24 24" ><path fill-rule="evenodd" d="M17.707 7.707a1 1 0 0 0-1.414-1.414L12 10.586 7.707 6.293a1 1 0 0 0-1.414 1.414L10.586 12l-4.293 4.293a1 1 0 1 0 1.414 1.414L12 13.414l4.293 4.293a1 1 0 0 0 1.414-1.414L13.414 12l4.293-4.293Z" clip-rule="evenodd"></path></svg>
                            </button>
                        </div>
                        <div class="input-add-label">
                            <label for="new-label">نام برچسب</label>
                            <input type="text" id="new-label" placeholder="نام برچسب جدید" v-model="new_label_name" @input="text_error = ''">
                        </div>
                        <div style="display: flex;justify-content: center;padding: 5px 0;">
                            <span v-if="text_error" style="color: red; padding: 5px 0;">{{ text_error }}</span>
                        </div>
                        <div class="button-add-label">
                            <button @click="div_label = false"><span>لغو</span></button>
                            <button @click="set_new_label()"><span>ادامه</span></button>
                        </div>
                    </div>
                </div>

            </div>
            <div>
                <ul class="folder-actions">
                    <li class="actions-item">
                        <span><svg xmlns="http://www.w3.org/2000/svg" width="20" fill="#454e80" viewBox="0 0 24 24" aria-hidden="true"><path fill-rule="evenodd" d="M20 2H4a3 3 0 0 0-3 3v11a3 3 0 0 0 3 3h8.417a2 2 0 0 1 1.075.313l3.97 2.528A1 1 0 0 0 19 20.998V19h1a3 3 0 0 0 3-3V5a3 3 0 0 0-3-3ZM6 8.5a1 1 0 0 1 1-1h10a1 1 0 1 1 0 2H7a1 1 0 0 1-1-1Zm1 3a1 1 0 1 0 0 2h10a1 1 0 1 0 0-2H7Z" clip-rule="evenodd"></path></svg></span>
                        <span>ارسال</span>
                    </li>
                    <li class="actions-item">
                        <span><svg xmlns="http://www.w3.org/2000/svg" width="20" fill="#454e80" viewBox="0 0 24 24" aria-hidden="true"><path fill-rule="evenodd" d="M12.864 3.05a.952.952 0 0 0-1.728 0L8.675 8.354l-5.836.687a.95.95 0 0 0-.792.647.942.942 0 0 0 .258.987l4.315 3.966-1.145 5.729a.943.943 0 0 0 .373.95c.3.216.7.24 1.024.06L12 18.526l5.128 2.854a.956.956 0 0 0 1.023-.06.943.943 0 0 0 .375-.95l-1.146-5.73 4.315-3.965a.942.942 0 0 0 .258-.987.95.95 0 0 0-.792-.647l-5.836-.687-2.461-5.304Z" clip-rule="evenodd"></path></svg></span>
                        <span>محبوب ها</span>
                    </li>
                    <li class="actions-item">
                        <span><svg xmlns="http://www.w3.org/2000/svg" width="20" fill="#454e80" viewBox="0 0 24 24" aria-hidden="true" ><path fill-rule="evenodd" d="M1 3a1 1 0 0 1 1-1h20a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V3Zm1 4.5a.5.5 0 0 1 .5-.5h19a.5.5 0 0 1 .5.5V19a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3V7.5ZM12 11a1 1 0 0 1 1 1v2.586l.793-.793a1 1 0 0 1 1.414 1.414l-2.5 2.5a1 1 0 0 1-1.414 0l-2.5-2.5a1 1 0 1 1 1.414-1.414l.793.793V12a1 1 0 0 1 1-1Z" clip-rule="evenodd"></path></svg></span>
                        <span>آرشیو</span>
                    </li>
                    <li class="actions-item">
                        <span><svg xmlns="http://www.w3.org/2000/svg" width="20" fill="#454e80" viewBox="0 0 24 24" aria-hidden="true"><path fill-rule="evenodd" d="M4 5h16a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1h-2.764c-.55-.614-1.348-1-2.236-1H9a2.99 2.99 0 0 0-2.236 1H4a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1Zm.036 1.534A.5.5 0 0 1 4.535 6h14.93a.5.5 0 0 1 .5.534l-.92 13.667A3 3 0 0 1 16.052 23H7.948a3 3 0 0 1-2.993-2.799l-.92-13.667ZM10 11a1 1 0 0 0-1 1v5a1 1 0 1 0 2 0v-5a1 1 0 0 0-1-1Zm4 0a1 1 0 0 0-1 1v5a1 1 0 1 0 2 0v-5a1 1 0 0 0-1-1Z" clip-rule="evenodd"></path></svg></span>
                        <span>سطل زباله</span>
                    </li>
                </ul>
            </div>

        </div>
        <div class="forms" v-if="Name_Forms.length === 0">
            <div class="forms-list">
                <span class="icon-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="209" height="139" fill="none" class="lsApp-noForms-icon-standalone">
                        <path fill="#E6E6F5" d="M3 96.061c0-23.632 19.158-42.79 42.79-42.79h112.325c23.632 0 42.79 19.158 42.79 42.79s-19.158 42.79-42.79 42.79H45.79C22.158 138.851 3 119.693 3 96.061"></path>
                        <mask id="noItems_svg__a" width="198" height="86" x="3" y="53" maskUnits="userSpaceOnUse" style="mask-type: alpha;"><path fill="#E6E6F5" d="M3 96.061c0-23.632 19.158-42.79 42.79-42.79h112.325c23.632 0 42.79 19.158 42.79 42.79s-19.158 42.79-42.79 42.79H45.79C22.158 138.851 3 119.693 3 96.061"></path></mask><g mask="url(#noItems_svg__a)"><path fill="#CD7448" fill-rule="evenodd" d="M118.337 76.547q-12.652 15.957-20.705 20.579c-8.054 4.622-8.643-.235-38.14-20.745-2.052-.861-3.716-1.09-6.495 2q-2.494 2.773-10.721 1.46a1.014 1.014 0 0 0-1.16.836c-.045.273.025.552.192.772q2.025 2.655 7.01 2.893c6.592.317 7.3-2.156 11.009.758s23.584 26.213 35.57 26.792 27.734-17.227 32.189-18.6q4.455-1.371 7.268-21.678z" clip-rule="evenodd"></path><path fill="#F4F5FE" fill-rule="evenodd" d="M61.955 88.68q4.905-4.683 5.949-8.17 21.942 16.393 24.838 15.496c2.646-.82 24.003-20.019 31.424-24.56.674-.673.721 5.077 1.257 4.458l-2.407 22.314q-13 9.303-16.565 11.463c-3.566 2.16-12.922 6.115-21.372-.755q-8.45-6.87-23.124-20.246" clip-rule="evenodd"></path><path fill="#fff" d="M113.638 113.173c1.348 4.698 1.348 10.59 0 21.327l49.541-7.235-3.033-40.263q-3.033-10.065-7.077-14.092c-4.044-4.026-25.276-2.013-30.332 0-5.055 2.013-6.066 11.072-11.121 19.125s0 14.092 2.022 21.138"></path><path fill="#CD7448" fill-rule="evenodd" d="M144.98 70.779q-3.033 24.705-17.047 24.705c-14.014 0-10.728-7.372-8.973-10.829q1.755-3.456 3.859-12.305 7.231-2.307 11.04-2.578 3.807-.27 11.121 1.007" clip-rule="evenodd"></path><mask id="noItems_svg__b" width="110" height="93" x="54" y="-2" maskUnits="userSpaceOnUse" style="mask-type: alpha;"><path fill="#C4C4C4" d="M54.29-2h109.352v92.712H54.289z"></path></mask><g mask="url(#noItems_svg__b)"><mask id="noItems_svg__c" width="59" height="92" x="109" y="70" maskUnits="userSpaceOnUse" style="mask-type: alpha;"><path fill="#fff" d="M113.638 137.166c1.348-10.737 1.348-19.295 0-23.992-2.022-7.047-7.077-13.086-2.022-21.139s6.066-17.111 11.121-19.125 26.288-4.026 30.332 0q4.044 4.027 7.077 14.092l3.033 40.264q7.078 27.177 2.022 33.217c-5.055 6.039-7.077-10.066-29.32-19.125-4.718-2.013-12.133-2.85-22.243-4.192"></path></mask><g mask="url(#noItems_svg__c)"><path fill="#fff" d="M113.638 137.164q2.022-16.106 0-23.151c-2.022-7.047-7.077-13.086-2.022-21.139s5.782-17.822 10.838-19.835 25.832-4.915 29.876-.889c2.696 2.685 5.794 8.98 7.816 15.691v13.61l3.033 26.654q7.078 27.177 2.022 33.217c-5.055 6.039-7.077-10.066-29.32-19.125q-7.077-3.02-22.243-5.033"></path><path fill="#CD7448" fill-rule="evenodd" d="M144.981 70.779q-3.033 24.705-17.047 24.705c-14.014 0-10.728-7.372-8.973-10.829q1.755-3.456 3.859-12.305 7.231-2.307 11.04-2.578 3.807-.27 11.121 1.007" clip-rule="evenodd"></path></g><path fill="#0A1551" fill-rule="evenodd" d="M116.82 31.942c-3.39 14.435-4.541 16.132-5.802 19.302a2.15 2.15 0 0 0 .438 2.294q7.2 7.431 19.261 4.643c8.566-1.98 8.525-4.956 3.217-29.137z" clip-rule="evenodd"></path><path fill="#CD7448" d="M139.285 52.625c-1.66 12.973 3.905 17.524 5.815 17.556 1.909.032-5.402 8.023-19.033 20.81-4.461-8.599-4.96-16.267-3.567-18.49 2.09-3.337 4.029-.483 3.313-12.162-.47-7.672 9.731-6.942 16.997-8.188-3.525.474-9.281.592-3.525.474"></path><path fill="#BD5826" fill-rule="evenodd" d="M125.313 55.15c.792 7.228.769 11.214.687 11.85-.122.954 17.282.148 12.312-15.173s-6.632 1.805-12.999 3.324" clip-rule="evenodd" opacity="0.677"></path><mask id="noItems_svg__d" width="38" height="44" x="116" y="22" maskUnits="userSpaceOnUse" style="mask-type: alpha;"><path fill="#fff" d="M148.093 55.674q-6.864 9.17-19.143 10.064c-8.313.606-13.863-10.234-12.793-21.363.511-5.31 1.687-9.997 6.362-14.827q14.477-14.952 27.2 3.95l3.662 9.771z"></path></mask><g mask="url(#noItems_svg__d)"><path fill="#CD7448" d="M146.968 54.8q-7.664 8.515-19.978 8.304c-8.336-.144-12.887-11.436-10.817-22.421.988-5.242 2.582-9.803 7.676-14.193q15.77-13.59 26.74 6.375l2.766 10.06z"></path><path fill="#A44616" d="M134.771 55.015c-2.695-.416-4.642-2.252-4.348-4.1s2.718-3.007 5.413-2.59c2.696.416 4.642 2.251 4.348 4.099s-2.718 3.008-5.413 2.591" opacity="0.423"></path></g><path fill="#A5330A" fill-rule="evenodd" d="M128.578 54.603q-3.178 1.358-7.5-1.401 2.034 5.778 4.623 5.258t2.877-3.857" clip-rule="evenodd"></path><path fill="#0A1551" fill-rule="evenodd" d="M129.938 37.088c-7.822-1.299-11.005-1.904-13.711-4.047.157-10.06 8.434-15.98 12.27-16.876 8.871-2.164 18.502.543 24.413 8.326a15 15 0 0 1 1.479 2.365q.348.56.688 1.257c3.699 10.657 5.645 26.206 4.59 31.966-2.957 3.801-26.689 4.621-23.717-.143q.25-.397.548-.835c1.396-2.08 3.387-5.046 3.368-11.71-.004-1.613-.47-3.501-.996-5.63-.178-.72-.363-1.466-.538-2.24l-1.197-.416c-1.692-.588-2.986-1.038-3.79-1.387-.88-.38-.041-2.924.562-4.75.526-1.593.871-2.64-.266-1.223-1.465 1.825-2.025 3.254-2.3 4.373-.157.637-.756 1.078-1.403.97" clip-rule="evenodd"></path><path fill="#fff" d="M118.165 137.36c5.329-2.997 29.268 3.736 47.509-2.946 10-3.663 2.348-24.998-1.822-42.89-2.639-9.901-7.007-16.464-10.989-18.891l-8.662 6.374 2.205 11.872s-1.37 4.311 1.517 12.143 7.375 17.68 7.375 17.68l-42.925 9.005c.155 3.55 1.529 10.051 5.792 7.653"></path></g><path fill="#CD7448" fill-rule="evenodd" d="M123.877 135.904c-2.093 1.665-3.098 1.719-5.599 3.64-2.013.964-3.499 1.379-7.866.075q-3.93-1.174-11.104-.601a1.008 1.008 0 0 1-.948-1.516q1.823-3.066 7.103-3.59c6.58-.653 7.399 1.778 10.978-1.318q3.58-3.097 7.436 3.31" clip-rule="evenodd"></path><path fill="url(#noItems_svg__e)" d="M119.883 139.37c10.617-.87 29.269 3.736 47.509-2.946 10.001-3.663 2.348-24.998-1.822-42.889-2.638-9.902-7.006-16.465-10.988-18.892l-8.662 6.374 2.205 11.873s-1.37 4.31 1.517 12.142 7.375 17.68 7.375 17.68l-42.925 9.005c.154 3.55-1.092 7.283 5.791 7.653"></path></g><mask id="noItems_svg__f" width="64" height="78" x="99" y="13" maskUnits="userSpaceOnUse" style="mask-type: alpha;"><path fill="#C4C4C4" d="M99 13h64v78H99z"></path></mask><g mask="url(#noItems_svg__f)"><mask id="noItems_svg__g" width="59" height="92" x="109" y="70" maskUnits="userSpaceOnUse" style="mask-type: alpha;"><path fill="#fff" d="M113.349 137.166c1.348-10.737 1.348-19.295 0-23.992-2.022-7.047-7.077-13.086-2.022-21.139s6.066-17.111 11.121-19.125 26.288-4.026 30.332 0q4.044 4.027 7.077 14.092l3.033 40.264q7.078 27.177 2.022 33.217c-5.055 6.039-7.077-10.066-29.32-19.125-4.718-2.013-12.133-2.85-22.243-4.192"></path></mask><g mask="url(#noItems_svg__g)"><path fill="#fff" d="M113.349 137.164q2.022-16.106 0-23.151c-2.022-7.047-7.077-13.086-2.022-21.139s5.782-17.822 10.838-19.835 25.832-4.915 29.876-.889c2.696 2.685 5.794 8.98 7.816 15.691v13.61l3.033 26.654q7.078 27.177 2.022 33.217c-5.055 6.039-7.077-10.066-29.32-19.125q-7.077-3.02-22.243-5.033"></path><path fill="#CD7448" fill-rule="evenodd" d="M144.692 70.779q-3.033 24.705-17.047 24.705c-14.014 0-10.728-7.372-8.973-10.829q1.755-3.456 3.859-12.305 7.231-2.307 11.04-2.578 3.807-.27 11.121 1.007" clip-rule="evenodd"></path></g><path fill="#0A1551" fill-rule="evenodd" d="M116.531 31.942c-3.39 14.435-4.542 16.132-5.802 19.302a2.15 2.15 0 0 0 .438 2.294q7.2 7.431 19.261 4.643c8.566-1.98 8.525-4.956 3.217-29.137z" clip-rule="evenodd"></path><path fill="#CD7448" d="M138.996 52.625c-1.661 12.973 3.905 17.524 5.815 17.556 1.909.032-5.402 8.023-19.033 20.81-4.461-8.599-4.96-16.267-3.567-18.49 2.09-3.337 4.029-.483 3.313-12.162-.47-7.672 9.731-6.942 16.997-8.188-3.525.474-9.281.592-3.525.474"></path><path fill="#BD5826" fill-rule="evenodd" d="M125.024 55.15c.792 7.228.769 11.214.687 11.85-.122.954 17.282.148 12.312-15.173s-6.632 1.805-12.999 3.324" clip-rule="evenodd" opacity="0.677"></path><mask id="noItems_svg__h" width="39" height="44" x="115" y="22" maskUnits="userSpaceOnUse" style="mask-type: alpha;"><path fill="#fff" d="M147.804 55.674q-6.864 9.17-19.143 10.064c-8.314.606-13.863-10.234-12.793-21.363.51-5.31 1.686-9.997 6.362-14.827q14.477-14.952 27.2 3.95l3.662 9.771z"></path></mask><g mask="url(#noItems_svg__h)"><path fill="#CD7448" d="M146.679 54.8q-7.665 8.515-19.978 8.304c-8.336-.144-12.887-11.436-10.817-22.421.988-5.242 2.582-9.803 7.676-14.193q15.77-13.59 26.74 6.375l2.766 10.06z"></path><path fill="#37120C" fill-opacity="0.25" fill-rule="evenodd" d="M131.905 39.455c1.203.588 2.055 1.53 2.483 2.24a.594.594 0 1 1-1.017.614c-.329-.544-1.02-1.313-1.987-1.786-.945-.461-2.165-.648-3.627-.043a.594.594 0 0 1-.455-1.098c1.802-.747 3.378-.525 4.603.073M120.443 37.48a3.34 3.34 0 0 0-2.266.716.594.594 0 0 0 .746.926 2.15 2.15 0 0 1 1.456-.455c.615.034 1.415.331 2.313 1.269a.594.594 0 1 0 .858-.822c-1.063-1.11-2.134-1.58-3.107-1.634" clip-rule="evenodd"></path><path fill="#A44616" d="M134.482 55.015c-2.695-.416-4.642-2.252-4.348-4.1s2.718-3.007 5.413-2.59c2.696.416 4.642 2.251 4.348 4.099s-2.718 3.008-5.413 2.591M112.964 50.555c-2.648-.672-4.48-2.7-4.092-4.529s2.848-2.766 5.496-2.093 4.48 2.7 4.092 4.53c-.388 1.828-2.848 2.765-5.496 2.092" opacity="0.423"></path></g><path fill="#A5330A" fill-rule="evenodd" d="M128.289 54.603q-3.178 1.358-7.5-1.401 2.034 5.778 4.623 5.258t2.877-3.857" clip-rule="evenodd"></path><path fill="#321907" d="M129.299 45.2c-.558-.01-1-.68-.987-1.498s.476-1.474 1.034-1.465c.558.01 1 .68.987 1.5-.013.817-.476 1.473-1.034 1.463M120.7 43.649c-.558-.01-1-.68-.987-1.499.013-.818.475-1.474 1.033-1.464s1 .68.987 1.499c-.012.818-.475 1.473-1.033 1.464"></path><path fill="#8A3110" fill-rule="evenodd" d="M125.715 42.596a.36.36 0 0 0-.5.07c-.982 1.305-1.621 1.94-2.222 2.378-.302.221-.601.397-.943.587l-.291.16a30 30 0 0 0-.891.501c-1.157.68-1.326 2.249-.802 3.412.271.6.736 1.135 1.394 1.442.661.309 1.483.372 2.434.084a.355.355 0 0 0 .237-.443.36.36 0 0 0-.446-.238c-.809.245-1.446.176-1.923-.047a2.16 2.16 0 0 1-1.044-1.088c-.437-.97-.215-2.08.514-2.509a29 29 0 0 1 .863-.485l.304-.167c.35-.194.68-.387 1.018-.634.679-.497 1.367-1.193 2.37-2.524a.356.356 0 0 0-.072-.499" clip-rule="evenodd"></path><path fill="#0A1551" fill-rule="evenodd" d="M129.649 37.088c-7.822-1.299-11.005-1.904-13.711-4.047.157-10.06 8.434-15.98 12.27-16.876 8.871-2.164 18.502.543 24.413 8.326a15 15 0 0 1 1.479 2.365q.348.56.688 1.257c3.699 10.657 5.645 26.206 4.59 31.966-2.957 3.801-26.689 4.621-23.717-.143q.25-.397.548-.835c1.396-2.08 3.387-5.046 3.368-11.71-.004-1.613-.471-3.501-.996-5.63-.178-.72-.363-1.466-.538-2.24l-1.197-.416c-1.692-.588-2.987-1.038-3.79-1.387-.88-.38-.041-2.924.562-4.75.526-1.593.871-2.64-.266-1.223-1.465 1.825-2.025 3.254-2.3 4.373-.157.637-.756 1.078-1.403.97" clip-rule="evenodd"></path><path fill="#fff" d="M117.876 137.36c5.328-2.997 29.268 3.736 47.508-2.946 10.001-3.663 2.348-24.998-1.821-42.89-2.639-9.901-7.007-16.464-10.989-18.891l-8.662 6.374 2.205 11.872s-1.37 4.311 1.517 12.143 7.375 17.68 7.375 17.68l-42.925 9.005c.155 3.55 1.528 10.051 5.792 7.653"></path></g><path fill="#fff" d="M42 4.583A4.583 4.583 0 0 1 46.583 0h21.77a4.583 4.583 0 0 1 4.582 4.583v27.498a4.583 4.583 0 0 1-4.583 4.583H46.583A4.583 4.583 0 0 1 42 32.081z"></path><path fill="#C8CEED" fill-rule="evenodd" d="M68.352 1.146H46.583a3.437 3.437 0 0 0-3.437 3.437v27.498a3.437 3.437 0 0 0 3.437 3.437h21.77a3.437 3.437 0 0 0 3.437-3.437V4.583a3.437 3.437 0 0 0-3.438-3.437M46.583 0A4.583 4.583 0 0 0 42 4.583v27.498a4.583 4.583 0 0 0 4.583 4.583h21.77a4.583 4.583 0 0 0 4.582-4.583V4.583A4.583 4.583 0 0 0 68.352 0z" clip-rule="evenodd"></path><path fill="#09F" d="M48.547 12.44c0-1.085.88-1.964 1.964-1.964h14.404a1.964 1.964 0 1 1 0 3.928H50.51a1.964 1.964 0 0 1-1.964-1.964"></path><path fill="#FF6100" d="M48.547 18.987c0-1.085.88-1.964 1.964-1.964h14.404a1.964 1.964 0 1 1 0 3.928H50.51a1.964 1.964 0 0 1-1.964-1.964"></path><path fill="#FFB629" d="M48.547 25.534c0-1.085.88-1.964 1.964-1.964h14.404a1.964 1.964 0 1 1 0 3.928H50.51a1.964 1.964 0 0 1-1.964-1.964"></path><rect width="29.884" height="29.884" x="22.5" y="43.5" fill="#fff" stroke="#C8CEED" rx="2.5"></rect><path fill="#fff" d="M25.417 49.418a3.01 3.01 0 0 1 3.009-3.01h18.052a3.01 3.01 0 0 1 3.009 3.01V67.47a3.01 3.01 0 0 1-3.009 3.009H28.426a3.01 3.01 0 0 1-3.009-3.009z"></path><path fill="#97ACDA" stroke="#97ACDA" stroke-width="0.652" d="M42.457 60.078a.4.4 0 0 0-.4.4v2.351h-2.351a.4.4 0 0 0 0 .8h2.351v2.352a.4.4 0 0 0 .8 0V63.63h2.352a.4.4 0 0 0 0-.8h-2.352v-2.352a.4.4 0 0 0-.4-.4Z"></path><path fill="#FF6100" d="M38.56 50.07c0-.362.294-.656.657-.656h6.566c.363 0 .657.294.657.656v6.566a.657.657 0 0 1-.657.657h-6.566a.657.657 0 0 1-.657-.657z"></path><path fill="#09F" d="M28.424 50.07c0-.362.294-.656.656-.656h6.566c.363 0 .657.294.657.656v6.566a.657.657 0 0 1-.657.657H29.08a.657.657 0 0 1-.656-.657z"></path><path fill="#FFB629" d="M28.423 60.207c0-.363.294-.657.656-.657h6.566c.363 0 .657.294.657.657v6.566a.657.657 0 0 1-.657.656H29.08a.657.657 0 0 1-.656-.656z"></path><path fill="#fff" d="M64.075 72.883c-1.629 0-2.073-.439-2.074-2.075-.002-14.674-.001-10.092 0-24.766 0-1.562.47-2.039 2.04-2.04 14.687-.003 10.116-.003 24.802 0 1.549.001 2.038.497 2.039 2.052.002 14.674.002 10.092 0 24.766 0 1.618-.459 2.063-2.093 2.063H64.075m24.223-2.062a.52.52 0 0 0 .523-.523v-5.627a.523.523 0 0 0-.523-.522h-5.627a.523.523 0 0 0-.522.522v5.627c0 .289.234.523.522.523zm-14.67 0h5.627a.52.52 0 0 0 .523-.523v-5.627a.523.523 0 0 0-.523-.522H73.63a.523.523 0 0 0-.523.522v5.627c0 .289.234.523.523.523m-9.042 0h5.626a.523.523 0 0 0 .523-.523v-5.627a.523.523 0 0 0-.523-.522h-5.626a.523.523 0 0 0-.523.522v5.627c0 .289.234.523.523.523m18.085-9.043h5.627a.52.52 0 0 0 .523-.523V55.63a.523.523 0 0 0-.523-.523h-5.627a.523.523 0 0 0-.522.523v5.626c0 .289.234.523.522.523m-9.043 0h5.627a.52.52 0 0 0 .523-.523V55.63a.523.523 0 0 0-.523-.523H73.63a.523.523 0 0 0-.523.523v5.626c0 .289.234.523.523.523m-9.042 0h5.626a.523.523 0 0 0 .523-.523V55.63a.523.523 0 0 0-.523-.523h-5.626a.523.523 0 0 0-.523.523v5.626c0 .289.234.523.523.523m9.043-9.043h5.626c.289 0 .523-.142.523-.316v-3.398c0-.174-.234-.316-.523-.316H73.63c-.29 0-.523.142-.523.316v3.398c0 .175.234.316.523.316m9.026 0h5.626c.289 0 .523-.142.523-.316v-3.398c0-.174-.234-.316-.523-.316h-5.626c-.289 0-.523.142-.523.316v3.398c0 .175.234.316.523.316m-18.07 0h5.627c.289 0 .523-.142.523-.316v-3.398c0-.174-.234-.316-.523-.316h-5.626c-.289 0-.523.142-.523.316v3.398c0 .175.234.316.523.316"></path><path fill="#fff" d="M63.605 46.407h25.674v24.872H63.605z"></path><path fill="#0D953B" d="M82.059 49.012a1 1 0 0 1 1-1h4.745a1 1 0 0 1 1 1v2.813a1 1 0 0 1-1 1H83.06a1 1 0 0 1-1-1z"></path><path fill="#FFB629" d="M82.059 56.233a1 1 0 0 1 1-1h4.418a1 1 0 0 1 1 1v4.418a1 1 0 0 1-1 1H83.06a1 1 0 0 1-1-1zM82.059 65.058a1 1 0 0 1 1-1h4.418a1 1 0 0 1 1 1v4.419a1 1 0 0 1-1 1H83.06a1 1 0 0 1-1-1z"></path><path fill="#0D953B" d="M73.107 49.012a1 1 0 0 1 1-1h4.872a1 1 0 0 1 1 1v2.813a1 1 0 0 1-1 1h-4.872a1 1 0 0 1-1-1z"></path><path fill="#FF6100" d="M73.233 56.233a1 1 0 0 1 1-1h4.419a1 1 0 0 1 1 1v4.418a1 1 0 0 1-1 1h-4.419a1 1 0 0 1-1-1zM73.233 65.058a1 1 0 0 1 1-1h4.419a1 1 0 0 1 1 1v4.419a1 1 0 0 1-1 1h-4.419a1 1 0 0 1-1-1z"></path><path fill="#0D953B" d="M64.006 49.012a1 1 0 0 1 1-1h4.82a1 1 0 0 1 1 1v2.813a1 1 0 0 1-1 1h-4.82a1 1 0 0 1-1-1z"></path><path fill="#09F" d="M64.006 56.233a1 1 0 0 1 1-1h4.82a1 1 0 0 1 1 1v4.418a1 1 0 0 1-1 1h-4.82a1 1 0 0 1-1-1v-4.4190000000000005M64.006 65.058a1 1 0 0 1 1-1h4.82a1 1 0 0 1 1 1v4.419a1 1 0 0 1-1 1h-4.82a1 1 0 0 1-1-1v-4.4190000000000005"></path><rect width="29.884" height="29.884" x="61.5" y="43.5" stroke="#C8CEED" rx="2.5"></rect><ellipse fill="#09F" rx="21" ry="20" transform="matrix(-1 0 0 1 188 76)"></ellipse><mask id="noItems_svg__i" width="42" height="40" x="167" y="56" maskUnits="userSpaceOnUse" style="mask-type: alpha;"><ellipse fill="#09F" rx="21" ry="20" transform="matrix(-1 0 0 1 188 76)"></ellipse></mask><g mask="url(#noItems_svg__i)"><path fill="#091141" fill-rule="evenodd" d="M181.184 67.87c-1.303 5.55-2.791 18.819-3.275 20.038a.83.83 0 0 0 .168.881q2.767 2.857 7.405 1.785c3.292-.76 4.322-14.522 2.281-23.817z" clip-rule="evenodd"></path><path fill="#F4F5FE" fill-rule="evenodd" d="M160.092 89.683q1.886-1.8 2.286-3.141 8.436 6.302 9.549 5.957c1.017-.316 9.228-7.696 12.08-9.442.259-.258.277 1.952.484 1.714l-.926 8.579q-4.998 3.576-6.368 4.406c-1.371.83-4.967 2.351-8.216-.29q-3.248-2.64-8.889-7.783" clip-rule="evenodd"></path><path fill="#fff" d="M179.558 99.2c.432 1.829 1.255 3.422.542 7.52 3.857.699 6.49-.474 8.265.385l6.727-3.076 4.806-2.114-2.251-6.695.248-5.226c-.653-2.613-1.728-5.087-2.714-6.167-1.48-1.62-9.511-.882-11.489-.2s-2.436 4.42-4.524 7.42-.258 5.412.39 8.154"></path><path fill="#EFBB9D" fill-rule="evenodd" d="M192.009 82.8q-1.165 9.498-6.553 9.498c-5.387 0-4.124-2.834-3.449-4.163q.674-1.33 1.483-4.73 2.78-.888 4.244-.991 1.464-.104 4.275.387" clip-rule="evenodd"></path><path fill="#321907" d="M183.946 74.105c-.213.031-.422-.196-.469-.507s.088-.589.3-.62.422.195.468.507c.047.31-.087.588-.299.62M181.043 74.055c-.212.03-.422-.196-.468-.507s.087-.589.3-.62c.212-.032.422.195.468.507.047.31-.088.588-.3.62"></path><path fill="#EFBB9D" d="M189.82 75.822c-.639 4.987 1.655 6.86 2.389 6.872s-2.231 2.962-7.471 7.877c-1.715-3.305-1.907-6.253-1.371-7.108.803-1.283 1.549-.185 1.273-4.675-.18-2.95 3.741-2.67 6.535-3.148-1.355.182-3.569.228-1.355.182"></path><path fill="#DC9F7E" fill-rule="evenodd" d="M184.448 76.793c.304 2.778.295 4.31.264 4.555-.047.367 6.644.057 4.733-5.833s-2.55.694-4.997 1.278" clip-rule="evenodd" opacity="0.677"></path><mask id="noItems_svg__j" width="16" height="17" x="180" y="64" maskUnits="userSpaceOnUse" style="mask-type: alpha;"><path fill="#fff" d="M193.205 76.994q-2.638 3.525-7.359 3.87c-3.196.232-5.33-3.935-4.918-8.213.196-2.042.648-3.844 2.445-5.7q5.565-5.748 10.457 1.518l1.408 3.757z"></path></mask><g mask="url(#noItems_svg__j)"><path fill="#EFBB9D" d="M192.773 76.658q-2.948 3.273-7.68 3.192c-3.205-.055-4.954-4.396-4.159-8.62.38-2.014.993-3.768 2.951-5.455q6.063-5.224 10.28 2.45l1.063 3.867z"></path><path fill="#EFA77F" d="M188.083 76.74c-1.036-.16-1.784-.865-1.671-1.575s1.045-1.157 2.081-.997 1.784.866 1.671 1.576-1.044 1.157-2.081.996M179.812 75.026c-1.018-.258-1.723-1.038-1.573-1.74.149-.704 1.095-1.064 2.112-.805 1.018.258 1.723 1.038 1.573 1.74-.149.704-1.095 1.064-2.112.805"></path></g><path fill="#A5330A" fill-rule="evenodd" d="M185.491 76.568q-1.222.522-2.884-.539.782 2.22 1.778 2.022.995-.2 1.106-1.483" clip-rule="evenodd"></path><path fill="#0A1551" d="M186.092 72.967c-.215-.003-.385-.261-.38-.576s.183-.566.398-.563c.214.004.384.262.379.576-.005.315-.183.567-.397.563M182.786 72.371c-.215-.003-.384-.261-.379-.576s.182-.567.397-.563c.214.004.384.262.379.576-.005.315-.182.567-.397.563"></path><path fill="#EFBB9D" fill-rule="evenodd" d="M192.01 82.802q-1.166 9.497-6.554 9.497c-5.387 0-4.124-2.834-3.449-4.163q.674-1.33 1.483-4.73 2.78-.888 4.244-.992t4.276.388" clip-rule="evenodd"></path><path fill="#fff" d="m191.709 85.964.848 4.564s-.527 1.657.583 4.668 2.835 6.797 2.835 6.797l3.989 5.271c3.844-1.408.903-9.61-.7-16.488-1.015-3.806-2.694-6.33-4.225-7.262z"></path><path fill="url(#noItems_svg__k)" d="m192.49 87.12.848 4.564s-.527 1.657.583 4.668c1.11 3.01 2.835 6.797 2.835 6.797l3.526 4.725c3.845-1.408 1.366-9.064-.237-15.942-1.015-3.807-2.694-6.33-4.225-7.263z"></path><path fill="#fff" d="M191.824 82.502c-4.305.922-6.663.256-7.304-.193-.307.154-1.025.961-1.346 1.346a574 574 0 0 1-2.306 5.574c-.577 1.346.384 2.114 1.73 3.652 1.345 1.538 5.574.192 7.112-.192 1.23-.308 2.691-6.663 3.268-9.803-.769-.154-1.09-.32-1.154-.385"></path><path fill="#091141" fill-rule="evenodd" d="M186.227 69.849c-3.007-.5-4.231-.733-5.271-1.556.06-3.867 3.242-6.144 4.717-6.488 3.41-.832 7.113.209 9.385 3.2q.337.446.568.91.135.215.265.483c1.422 4.097 1.385 19.518.979 21.732-1.137 1.462-10.26 1.777-9.118-.055q.096-.153.211-.32c.537-.8 2.087-11.384 2.08-13.946-.001-.62-.181-1.346-.383-2.164q-.103-.415-.207-.861l-.46-.16c-.65-.226-1.148-.4-1.457-.533-.338-.147-.015-1.124.216-1.826.203-.613.335-1.015-.102-.47-.563.701-.778 1.25-.884 1.68a.48.48 0 0 1-.539.374" clip-rule="evenodd"></path><circle cx="192.977" cy="62.319" r="3.652" fill="#091141"></circle><path fill="#091141" d="M186.98 70.598s-1.176-.324-1.313.176c0 0-.093.335.978.604 1.07.27 1.331.24 1.485-.065.153-.306-.581-.603-1.15-.715M182.712 69.848s1.017.06 1.015.557c0 0-.003.333-.896.254-.892-.078-1.153-.24-1.19-.513-.036-.274.593-.37 1.071-.298"></path><path stroke="#D97D4A" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.92" d="m183.922 73.28-.362 1.114.72.19"></path></g><ellipse cx="21" cy="109" fill="#FFB629" rx="21" ry="20"></ellipse><mask id="noItems_svg__l" width="42" height="40" x="0" y="89" maskUnits="userSpaceOnUse" style="mask-type: alpha;"><ellipse cx="21" cy="109" fill="#FFB629" rx="21" ry="20"></ellipse></mask><g mask="url(#noItems_svg__l)"><path fill="#fff" d="m20.742 120.667 10.686-.564a2.01 2.01 0 0 1 2.118 1.824l7.55 22.086-31.47 8.27-2.952-25.361a2.025 2.025 0 0 1 1.342-2.531z"></path><path fill="url(#noItems_svg__m)" d="M16.653 127.117a183 183 0 0 1-4.466 22.35c-.319 1.151-1.68 2.131-2.81 2.456-2.54.737-4.543-1.68-4.364-4.267 0 0 1.544-21.819 2.552-22.503.16-.113 9.088 1.964 9.088 1.964"></path><path fill="#B46458" d="m23.807 114.269.601 6.221c.214 2.172-.978 3.473-3.06 3.656-1.778.148-3.782-.531-3.921-2.459l-.496-9.829z"></path><path fill="#B46458" d="M22.694 116.47c3.556-.342 6.203-3.516 6.014-6.518l-.414-6.285a6.91 6.91 0 0 0-6.97-6.588c-3.741.096-7.337 3.319-7.213 7.218l.387 4.889a7.86 7.86 0 0 0 8.196 7.284"></path><path fill="#091141" d="M16.298 105.532c2.809-3.131.77-4.968.77-4.968l-2.503-.508c-7.801 1.429-1.42 8.102-1.42 8.102l1.554 3.055s2.112 7.226 9.304 5.607c5.408-1.219 4.668-5.86 4.668-5.86-3.506-1.598-9.888.979-9.888.979-.96-1.217-2.485-6.407-2.485-6.407"></path><path fill="#091141" d="M16.834 100.939c3.27-.392 6.517-.96 9.726-1.7 0 0 3.368-2.018 1.487-3.958-1.501-1.516-4.11.42-4.11.42s-.276-1.79-1.627-2.045c-1.612-.309-6.105.028-8.761 6.69z"></path><path fill="#B46458" d="m24.465 120.472 1.985-.106s1.455 3.073-2.97 4.229c-4.616 1.192-6.785-.231-8.1-2.341l4.963-1.955z"></path><circle r="1.829" fill="#B46458" transform="scale(-1 1)rotate(10.379 -603.32 -23.193)"></circle><path stroke="#893B2F" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.92" d="m24.673 107.396.272 1.365-.876.124"></path><path fill="#0A1551" d="M26.314 106.129c.263-.053.415-.409.337-.795s-.353-.657-.616-.604c-.264.053-.415.409-.338.795s.353.657.617.604M21.368 107.036c.263-.053.414-.409.337-.796-.077-.386-.353-.657-.617-.604-.263.053-.414.409-.337.796.077.386.353.656.617.604"></path><path fill="#091141" d="M20.4 103.906s1.425-.261 1.536.345c0 0 .075.407-1.221.615s-1.602.146-1.753-.232.75-.654 1.437-.728M25.734 103.131s-1.2.157-1.156.747c0 0 .032.394 1.084.225s1.348-.382 1.368-.71-.734-.389-1.296-.262"></path><path fill="#fff" d="m25.48 112.356-2.532.272s.06.949 1.365.773c1.305-.177 1.166-1.045 1.166-1.045"></path></g><defs><linearGradient id="noItems_svg__e" x1="155.19" x2="152.764" y1="92.503" y2="109.514" gradientUnits="userSpaceOnUse"><stop stop-color="#fff"></stop><stop offset="1" stop-color="#F3F5FE"></stop></linearGradient><linearGradient id="noItems_svg__k" x1="198.553" x2="194.043" y1="102.876" y2="82.136" gradientUnits="userSpaceOnUse"><stop stop-color="#F4F5FE"></stop><stop offset="1" stop-color="#fff"></stop></linearGradient><linearGradient id="noItems_svg__m" x1="6.512" x2="10.572" y1="152.168" y2="124.439" gradientUnits="userSpaceOnUse"><stop offset="0.307" stop-color="#F4F6FF"></stop><stop offset="1" stop-color="#fff"></stop></linearGradient></defs>
                    </svg>
                </span>
                <span  class="text-center first-text">درحال حاضر هیچ فرمی ثبت نشده.</span>
                <span class="text-center secend-text">اولین فرم خودتو با جمع آوری داده ها ایجاد کن.</span>
                <button class="create-box secend-box" @click="active_products = true,check_user_status()">
                    <span>+</span>
                    <span>ایجاد</span>
                </button>
            </div>
        </div>
        <div class="forms" style="align-items: start;" v-else>
            <div class="up-ul-nameForm">
                <ul class="ul-nameForm" ref="formSectionRef">
                    <li v-for="(form,index) in Name_Forms" :key="index" class="form-name" @mousemove.prevent="index_edit = index" @mouseleave.prevent="index_edit = ''" @click="selected_form_func(index,form._id)" :style="{backgroundColor:selected_id === index && selected_form?'#f3f3fe':''}">
                        <span class="up-input-form-name">
                            <input type="checkbox" :checked="selected_form && selected_id === index">
                        </span>
                        <div class="up-form-button-name-svg">
                            <button class="form-button-name-svg">
                                <svg width="20" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M12.864 3.05a.952.952 0 0 0-1.728 0L8.675 8.354l-5.836.687a.95.95 0 0 0-.792.647.942.942 0 0 0 .258.987l4.315 3.966-1.145 5.729a.943.943 0 0 0 .373.95c.3.216.7.24 1.024.06L12 18.526l5.128 2.854a.956.956 0 0 0 1.023-.06.943.943 0 0 0 .375-.95l-1.146-5.73 4.315-3.965a.942.942 0 0 0 .258-.987.95.95 0 0 0-.792-.647l-5.836-.687-2.461-5.304Z" clip-rule="evenodd"></path></svg>
                            </button>
                        </div>
                        <span class="form-background-name-svg">
                            <svg width="30" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><path fill="#fff" d="M18 1H6a3 3 0 0 0-3 3v16a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V4a3 3 0 0 0-3-3Z"></path><path fill="#FFB629" d="M6 17.5A1.5 1.5 0 0 1 7.5 16h9a1.5 1.5 0 0 1 0 3h-9A1.5 1.5 0 0 1 6 17.5Z"></path><path fill="#FF6100" d="M6 12.5A1.5 1.5 0 0 1 7.5 11h9a1.5 1.5 0 0 1 0 3h-9A1.5 1.5 0 0 1 6 12.5Z"></path><path fill="#09F" d="M6 7.5A1.5 1.5 0 0 1 7.5 6h9a1.5 1.5 0 0 1 0 3h-9A1.5 1.5 0 0 1 6 7.5Z"></path></svg>
                        </span>
                        <div class="name-date" style="margin: 0; width: 90%;">
                            <span>{{ form.title }}</span>
                            <span> ساخته شده در {{ new Date(form.createdAt).toLocaleDateString('fa-IR')}}</span>
                        </div>
                        <div class="Edit-form" v-if="index_edit === index || selected_form && selected_id === index" @click="go_to_EditForm(form._id)">
                            <button>
                                ویرایش فرم
                            </button>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
    <div class="footer-others">
        <footer_page/>
    </div>
</template>

<style setup>
.no-access-page{
    position: fixed;
    z-index: 1001;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(37, 45, 91, 0.7);
}
.item-header{
    display: flex;
    align-items: center;
    margin: 0;
    background-color: var(--jfv-header-bg-dark);
    height: 4em;
}
.head-page{
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0  0 0 16px;
    width: 100%;
}

#white-path{
    fill: #fff;
}
.myWorkspace{
    display: flex;
    align-items: center;
    float: right;
}
.workspace-style{
    display: flex;
    align-items: center;
    cursor: pointer;
    transition: .3s ease;
    position: relative;
}


.arrow-back{
    background-color: var(--jfv-gray-200);
    border-radius: 50%;
    margin: 0 5px;
    padding: 0 0 0 3px;
    height: 20px;
    width: 20px;
}
.arrow-back svg, .page-name{
    transition: .3s ease;
}
.mark-select{
    background-color: #09f;
}
.page-name{
    color: var(--jfv-header-bg-light);
    border-right: 1px solid var(--jfv-blue-border);
    padding: 0 15px 0 0;
}

#color-bf-logo{
    color: var(--jfv-header-bg-light);
}
#color-bf-menu{
    color: var(--jfv-header-bg-light);
}
.create-tool-box{
    display: flex;
    justify-content: space-between;
}
.button-box{
    display: flex;
    align-items: center;        
    padding: 7px 10px;
    border: 1px solid var(--jfv-withe-dark);
    width: 23.8%;
}
.create-box{
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--jfv-button-bg-signUp);
    outline: none;
    border-radius: 5px;
    padding: 8px 12px;
    border: none;
    font-family: inherit;
    color: var(--jfv-header-bg-light);
    width: 100%;
    height: 44px;
    font-size: 16px;
}
.create-box:hover{
    background-color: var(--jfv-button-bg-signUp-hover);
    transition: 0.3s ease;
}
.create-box span{
    margin: 0 2px;
}
.tool-box{
    display: flex;
    align-items: center;
    justify-content: left;
    border: 1px solid var(--jfv-withe-dark);
    border-right: none;
    width: 100%;
    padding: 0 10px;
}
#label_tool-box-name{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: right;
}
#label_tool-box-name button{
    background-color: #fff;
    border-radius: .25rem;
    outline: none;
    border: none;
    width: fit-content;
    height: 45.2px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 5px 8px;
}
#label_tool-box-name button span{
    display: flex;
    justify-content: center;
    font-size: 14px;
    color: #343c6a;
}
.tool-box button , .tool-box input{
    font-family: inherit;
}


.type-sort-button button{
    display: flex;
    align-items: center;
    justify-content: center;
    outline: none;
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 5px;
    margin: 2px 7px;
}
.type-sort-button button span{
    padding: 0 3px;
}
.search-button{
    height: 2.45em;
    width: 200px;
    display: flex;
    border: 1px solid #c8ceed;
    border-radius: 0.25rem;
    transition: .3s ease;
}
.search-button input{
    border: none;
    width: 100%;
    margin: 2px 7px;
    padding: 5px;
    outline: none;
    color: var(--jfv-blue-light);
}
.search-button:hover{
    border: 1px solid var(--jfv-blue-light);
    transition: 0.3s ease;
}
.search-button span{
    padding: 0 10px 0 0;
}
.height-sort-type{
    height: 40px;
    color: var(--jfv-blue-light);
    position: relative;
    background-color: #fff;
}
.forms-sideBar{
    position: relative;
    display: flex;
    z-index: 1;
}
.sideBar{
    width: 24.18%;
    display: flex;
    flex-direction: column;
    border: 1px solid #ccc;
    border-top: none;
    background-color: #f3f3fe;
    max-height: 600px;
}
.icon-three-dot{
    background-color: inherit;
    border: none;
    height: 32px;
    width: 32px;
    border-radius: 4px;
    outline: none;
}
.icon-three-dot:hover{
    background-color: #c8ceed;
}
.folder{
    margin: 1px 0;
    padding: 11px 8px 11px 14px;
    display: flex;
    align-items: center;
    border-radius: 4px;
    cursor: pointer;
}
.folder:hover{
    background-color: #dadef3;
}
.label-list{
    padding: 0 12px;
    color: var(--jfv-google-apple-blue);
}
.label-dot{
    position: relative;
}
.label-dot:hover{
    background-color: rgba(255, 255, 255, .35);
}
.label-names{
    padding: 11px 32px 11px 14px;
    margin: 0;
    position: relative;
}
.label-names:hover{
    background-color: #dadef3;
}
#hide-dot{
    display: none;
}
.label-names:hover #hide-dot{
    display: flex;
}
.add-label-bottom{
    display: flex;
    align-items: center;
    padding: 11px 44px 11px 26px;   
    cursor: pointer;
    border-radius: 5px;
    margin: 0 13px;
    border-bottom: 1px solid #c8ceed;
}
.add-label-bottom:hover{
    background-color: #dadef3;
}

.forms{
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    max-height: 600px;
    padding: 18px 20px; 
    overflow-y: auto;
    position: relative;
}
.forms-list{
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 30%; 
}
.type-of-pages{
    position: absolute;
    width: 330px;
    height: fit-content;
    border: 1px solid #c8ceed;
    border-radius: 6px;
    bottom: -306px;
    left: -160px;
    background-color: #fff;
    z-index: 30;
}
.four-section-pages{
    display: flex;
    flex-wrap: wrap;
    padding: 6px;
}
.four-section-pages li button{
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 5px;
    margin: 5px;
    padding: 0 3px;
    width: 148px;
    height: 130px;
    border-radius: 6px;
    border: 1px solid #c8ceed;
    background-color: var(--jfv-header-bg-light);
    font-family: inherit;
    transition: .5s ease;
}
.four-section-pages li button:hover{
    background-color: #f3f3fe;
    transition: .5s ease;
}
#this-page{
    background-color: var(--jfv-header-bg-dark);
    color: #fff;
}
.filter-forms{
    position: absolute;
    background-color: var(--jfv-header-bg-dark);
    color: #fff;
    border-radius: 4px;
    padding: 10px 5px;
    width: 130px;
    z-index: 5;
    bottom: -152px;
    left: -50px;
    transition: .3s ease;
}
#different{
    color: var(--jfv-withe-dark);
    font-size: 10px;
    margin: 0 0 5px 0;
}
#different:hover{
    background-color: inherit;
}
.filter-forms-items{
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 5px 0;
}
.filter-forms-items label{
    cursor: pointer;
}
.filter-forms-items:hover{
    background-color: var(--jfv-blue-light);
}
.sort-forms{
    bottom: -105px;
    left: -90px;
    width: 180px;
}
.active_field{
    background-color: var(--jfv-header-bg-dark);
    color: #fff;
}
.rotate{
    transform: rotate(180deg);
    transition: .3s ease;
}
.rotate_half{
    transform: rotate(90deg);
    transition: .3s ease;
}
.title-sideBar{
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #545f6f;
    padding: 7px 10px 7px 10px;
    margin: 5px;
}
.text-center{
    padding: 5px 7px;
    margin: 0 10px;
    font-weight: bold;
}
.first-text{
    color: #0a1551;
}
.secend-text{
    color: #545f6f;
}
.icon-center{
    margin: 80px 0 20px 0;
}
.secend-box{
    background-color: #fff;
    color: var(--jfv-button-bg-signUp);
    border: 1px solid var(--jfv-button-bg-signUp);
    margin: 20px 0 100px 0;
    transition: .3s ease;
}
.secend-box:hover{
    background-color: var(--jfv-button-bg-signUp);
    color: #fff;
}
.footer-others{
    background-color: var(--jfv-header-bg-dark);
}
.add-label{
    position: absolute;
    background-color: #252d5b;
    color: #fff;
    width: 235px;
    height: 52px;
    display: flex;
    align-items: center;
    padding: 2px 16px;
    margin: 2px 0;
    left: 1038px ;
    bottom: 458px;  
    z-index: 6;
    border-radius: 5px;
    cursor: pointer;
}
.add-label:hover{
    background-color: #0a1551;
}
.add-label span:nth-child(1){
    width: 15%;
}
.add-label span:nth-child(2){
    width: 85%;
}
.maximum-height{
    height: 100%;
}
.folder-actions{
    display: flex;
    flex-direction: column;
    padding: 0 12px;
    margin: 16px 0;
}
.actions-item{
    display: flex;
    padding: 11px 32px 11px 14px;
    margin: 2px 0;
    border-radius: 5px;
    cursor: pointer;
    gap: 10px;
    color: var(--jfv-google-apple-blue);
}
.actions-item:hover{
    background-color: #dadef3;
}
.box-add-label{
    position: absolute;
    width: 700px;
    background-color: #fff;
    border-radius: 4px;
    top: 50%;
    left: 50%;
    overflow: hidden;
    transform: translate(-50%,-50%);
}
.head-add-label{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 20px;
}
.plus-add-label{
    display: flex;
    align-items: center;
    color: var(--jfv-google-apple-blue);
    font-size: 20px;
    font-weight: 600;
}
.background-plus{
    background-color: var(--jfv-button-bg-signUp);
    margin: 0 0 0 10px;
    border-radius: 4px;
    width: 36px;
    height: 36px;
    display: flex;
    justify-content: center;
}
.close-add-label{
    color: rgba(52, 60, 106);
    display: flex;
    justify-content: center;
    outline: none;
    border: none;
    border-radius: 50%;
    background-color: rgba(218, 222, 243,0.8);
    height: 40px;
    width: 40px;
}
.input-add-label{
    display: flex;
    flex-direction: column;
    padding: 32px 30px 14px;
    color: var(--jfv-google-apple-blue);
    margin: 0 0 25px;
}
.input-add-label label{
    margin: 0 0 12px;
}
#new-label{
    color: var(--jfv-google-apple-blue);
    z-index: 2;
    border: 1px solid #c8ceed;
    border-radius: 4px;
    width: 100%;
    height: 40px;
    padding: 0 16px;
    font-size: 1rem;
    font-weight: 400;
    transition: all .3s;
    position: relative;
    font-family: inherit;
}
#new-label::placeholder{
    color: var(--jfv-withe-dark);
}
#new-label:focus{
    border-color: #3468e7;
    outline: none;
}
.button-add-label{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
    background-color: #f8f8fa;
    border-top: 1px solid #edeef5;  
}
.button-add-label button{
    font-family: inherit;
    height: 40px;
    border: none;
    padding: 0 10px;
    border-radius: 0.25rem;
    min-width: 95px;
}
.button-add-label button span{
    padding: 0 8px;
    font-size: 14px;
}
.button-add-label button:nth-child(2){
    background-color: #64b200;
    color: #fff;
}   
.button-add-label button:nth-child(1){
    background-color: inherit;
    border: 1px solid rgba(200, 206, 237);
}
.product-box{
    left: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    position: fixed;
    overflow: auto;
    z-index: 102;
    background-color: #f3f3fe;
    display: flex;
    justify-content: center;
}
.close-product{
    background-color: #6c73a8;
    margin: 40px 0 ;
}
.product-selector{
    width: 1000px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
}
.header-box-product{
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 50px 0 0;
}
.header-box-product h1{
    font-size: 28px;
    color: var(--jfv-google-apple-blue);
    text-align: center;
    margin:0;
}
.header-box-product h2{
    font-size: 18px;
    color: #6c73a8;
    text-align: center;
    margin: 22px 0 20px;
    width: 85%
}
.product-item{
    display: flex;
    justify-content: center;
    gap: 16px;
    align-items: flex-start;
    padding: 0 0 180px;
}
.product-item li button{
    padding: 20px 12px;
    background-color: #fff;
    outline: none;
    border: 1px solid rgb(200, 206, 237);
    border-radius: 8px;
    width: 225px;
    height: 181px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    font-family: inherit;
}
.product-item li button:hover{
    background-color: rgb(255, 255, 255);
    outline: rgb(0, 153, 255) solid 2px;
}
.product-item-icon{
    display: flex;
    justify-content: center;
    width: 60px;
    height: 60px;
    border-radius: 7.5px;
}
.icon-1{
    background-color: rgb(255, 123, 28);
}
.icon-2{
    background-color: rgb(0, 120, 98);
}
.icon-3{
    background-color: rgb(52, 64, 103);
}
.describe-item{
    display: flex;
    flex-direction: column;
    gap: 6px;
}
.describe-item div:nth-child(1){
    color: var(--jfv-google-apple-blue);
    font-size: 18px;
}
.describe-item div:nth-child(2){
    color: #343c6a;
    font-size: 14px;
}
.describe-item div small{
    font-size: 10px;
}
.back-product{
    background-color: #dadef3;
    border-radius: 30px;
    padding: 0 12px 0 8px;
    height: 40px;
    font-family: inherit;
    outline: none;
    border: none;
    color: #343c6a;
    margin: 40px 0;
    display: flex;
    align-items: center;
    font-size: 16px;
}
.template-or-scratch{
    display: flex;
    flex-direction: column;
    justify-content:center;
    gap: 35px;
    width: 1300px;
    margin: 30px 0;
}
.temp-scratch-button{
    padding: 0;
}
.edit-template h2{
    width: 50%;
    color: #343c6a; 
}
.temp-scratch-button li button{
    padding: 12px;
    height: 260px;
    justify-content: start;
}
.temp-scratch-button li button div:nth-child(2):checked{
    color: #09f;
}

.scratch-back{
    background-color: #c8ceed;
    width: 100%;
    border-radius: 8px;
    height: 137px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.template-back{
    background-color: #ff6100;
    width: 100%;
    height: 137px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
}
.common-back{
    width: 100%;
    height: 137px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
}
.classic-back{
    background-color: #ae90ff;
}
.card-back{
    background-color: #4dbefc;
}
.up-ul-nameForm{
    width: 100%;
    display: flex;
}
.ul-nameForm{
    display: flex;
    flex-direction: column;
    width:100%;
}
.form-name{
    width: 100%;
    display: flex;
    align-items: center;
    height: 68px;
    padding: 14px 23px;
    cursor: pointer;
    border-radius: .25rem;
    transition: .4s ease;
    position: relative;
}
.form-name:hover{
    background-color: #f3f3fe;
}
.form-background-name-svg{
    background-color: #ff7b1c;
    width: 40px;
    height: 40px;
    border-radius: .25rem;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 18px;
}
.form-button-name-svg{
    border: none;
    background-color: inherit;
    display: flex;
    justify-content: center;
    color: #c8ceed;
}
.up-form-button-name-svg{
    margin-left: 18px;
}
.up-input-form-name{
    margin-left: 18px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.up-input-form-name input{
    cursor: pointer;
    outline: none;
    width: 17px;
    height: 17px;
    margin: 0;
}
.name-date{
    display: flex;
    flex-direction: column;
}
.name-date span{
    width: fit-content;
}
.name-date span:nth-child(1){
    font-size: 18px;
    color: var(--jfv-google-apple-blue);
}
.name-date span:nth-child(2){
    font-size: 12px;
    color: #6f76a7;
    margin: 2px 0 0;
}
.Edit-form{
    transition: .4s ease;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 120px;
    height: 68px;
    padding: 0;
    margin: 0;
    position: absolute;
    left: 0;
    top: 0;
}
.Edit-form button{
    background-color: inherit;
    outline: none;
    font-family: inherit;
    font-size: 0.875em;
    color: rgb(10, 21, 81);
    border: none;
    height: 100%;
    width: 100%;
    padding: 3px 7px;
    transition: .4s ease;
    border-top-left-radius: .25rem;
    border-bottom-left-radius: .25rem;
}
.Edit-form button:hover{
    background-color: rgb(200, 206, 237);
}
.delete-form-tool-box{
    display: flex;
    justify-content: right;
    align-items: center;
    padding: 0 10px;
    width: 100%;
    border-bottom: 1px solid #a6abc6;
}
.delete-form-tool-box button{
    display: flex;
    justify-content: center;
    width: 41.6px;
    height: 40px;
    background: inherit;
    color: rgba(220, 38, 38);
    border: 1px solid rgba(220, 38, 38);
    border-radius: .25rem;
    padding: 0 10px;
    margin: 0 12px 0 3px;
    transition: .3s ease;
}
.delete-form-tool-box button:hover{
    background-color: rgba(220, 38, 38,0.1);
}
.box-sure-delete{
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    position: fixed;
    background-color: rgba(8, 9, 11, var(--bg-opacity));
    z-index: 10120;
}
.div-sure-delete{
    width: 480px;
    height: fit-content;
    max-height: 323px;
    background-color: #fff;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    border-radius: .5rem;
}
.trash-icon{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 90px;
}
.trash-icon-back{
    background-color: #fecaca80;
    width: 19%;
    height: 100%;
    border-radius: .5rem;
    color: rgba(220, 38, 38);
    display: flex;
    justify-content: center;
    align-items: center;
}
.trash-icon-back svg{
    display: flex;
}
#close-delete-form-button{
    position: absolute;
    z-index: 11103;
    right: 13px ;
    top: 15px;
}
.h2-delete-item h2{
    text-align: center;
    color: var(--jfv-google-apple-blue);
    font-size: 18px;
    margin: 23px 0;
}
.button-delete-cancel{
    padding: 32px;
}
.button-delete-cancel div{
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 15px;
}

.delete-button-common{
    padding: 0 18px;
    outline: none;
    font-family: inherit;
    font-size: 14px;
    border-radius: .25rem;
    height: 40px;
}
.cancel-delete{
    background-color: inherit;
    border: 1px solid rgba(200, 206, 237);
    color: rgba(52,60,106);
}
.accept-delete{
    background-color: #dc2626;
    color: #fff;
    border: none;
}
.setting-label{
    position: absolute;
    width: 236px;
    height: fit-content;
    background-color: #252d5b;
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    right: 0;
    color: #fff;
    top: 0;
    z-index: 220;
    box-shadow: 0 0 40px rgba(37, 45, 91, .25);
}
.ul-setting-label{
    padding: 4px 0;
}
.common-setting-label{
    padding: 2px 16px;
    margin:  2px 0;
    display: flex;
    align-items: center;
    height: 40px;
}
.common-setting-label:hover{
    background-color: var(--jfv-google-apple-blue);
}
.common-setting-label span{
    font-family: var(--primaryOne-font,--primaryTwo-font);
    font-size: 16px;
}
.label-colors-square{
    height: 32.8px;
    width: 32.8px;
    margin: 5px;
    cursor: pointer;
    border-radius: 2px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.change-color{
    display: block;
    height: fit-content;
    text-align: right;
}
.span-label-setting-padding{
    padding: 0 8px 0 0;
}
#input-color{
    position: absolute;
    opacity: 0;
    width: 100%;
    height: 100%;
    cursor: pointer;
    left: 0;
    top: 0;
}
.settingLabelOn{
    max-height: fit-content;
}
.settingLabelOff{
    overflow: auto;
}
.page-no-access{
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    position: fixed;
    background-color: #252d5bb3;
    z-index: 10120;
}
.search-in-responsive{
    display: none;
    transition: .4s ease;
}
.hamburger-back span{
    background-color: #fff;
}
.div-isApp-toolbar{
    display: none;
}
.isApp-toolbar-responsive{
    color: #343c6a;
    background-color: #dadef3;
    border-top-left-radius: 32px;
    border-bottom-left-radius: 32px;
    width: 105px;
    padding-right: .5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: inherit;
    outline: none;
    border: none;
    margin: 0 0 0 8px;
    height: 40px;
    gap: 8px;
}
.no-access-for-toolbar-responsive{
    display: none;
}
.no-access-for-toolbar-responsive{
    z-index: 1;
    background-color: rgba(0, 0, 0, .45);
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 65px;
    left: 0;
}
.back-arrow-responsive{
    display: none;
}
.label_tool-box-name-responsive{
    display: block;
}
.signUp-back-withe{
    background-color: #fff;
    color: #17255b;
    font-family: var(--primaryOne-font) , var(--primaryTwo-font);
    font-size: 12px;
    font-weight: 600;
    outline: none;
    border: none;
    padding: 0 8px;
    border-radius: 5px;
    cursor: pointer;
    height: 24px;
}
#none-workspace{
    display: flex;
    align-items: center;
}
@media (max-width: 992px) {
    .settingLabelOff {
        position: fixed;
        top: 65px;
        right: -300px;
        width: 288px;
        height: 100dvh;
        z-index: 3000;
        transition: .4s ease;
        overflow: auto;
    }
    .head-page{
        padding: 0;
    }
    .forms-list {
        width: 90%;
    }
    .responsive-workspace-header{
        display: none;
    }
    .check-item-workspace{
        width: 100%;
    }
}
@media (max-width: 640px) {
    .signUp-back-withe{
        margin: 0 45vw 0 0 ;
    }
    .settingLabelOn{
        position: fixed;
        top: 65px;
        right: 0;
        width: 288px;
        height: 100dvh;
        z-index: 3000;
        transition: .4s ease;
        overflow: auto;
    }
    .create-tool-box{
        flex-wrap: wrap;
    }
    .button-box{
        width: 100%;
        padding: 13px 20px 14px;
    }
    .search-normal{
        display: none;
    }
    .search-in-responsive{
        display: block;
    }
    .search-button{
        width: fit-content;
    }
    .search-button span{
        padding: 8px;
        margin-right: 4px;
    }
    .type-sort-button button {
        margin: 2px;
    }
    .tool-box{
        padding: 13.5px 0 13.5px 15px;
    }
    .div-isApp-toolbar{
        display: block;
    }
    .three-dot-normal{
        display: none;
    }
    .back-arrow-responsive{
        display: block;
    }
    .new-label-responsive-box{
        position: fixed;
        z-index: 1001;
        left: 0px;
        top: 0px;
        width: 100%;
        height: 100%;
        overflow: auto;
        background-color: rgba(37, 45, 91, 0.7);
    }
    .box-add-label{
        width: 90%;
    }
    .div-sure-delete{
        width: 90%
    }
    .forms{
        padding: 18px 0;
    }
    .up-input-form-name{
        display: none;
    }
    .up-form-button-name-svg{
        margin-left: 2px ;
    }
    .button-delete-cancel{
        padding: 15px 0 ;
    }
    .button-delete-cancel div{
        gap: 4px;
        flex-direction: column;
    }
    .delete-button-common{
        width: 85%;
    }
    .div-sure-delete{
        max-height: none;
    }
    #hide-dot{
        display: block;
    }
    .setting-label{
        width: 200px;
        right: -155px;
        top: 35px ;
    }
    .type-of-pages{
        bottom: 135vw;
        left: 10vw;
    }
    .close-product{
        position: absolute;
        right: 10px;
        top: -30px;
    }
    .product-selector{
        flex-direction: column;
        padding: 0 10px;
        width: 100%;
        height: 100%;
        max-width: 350px;
    }
    .product-item{
        padding: 0 0 40px 0;
        flex-direction: column;
        align-items: center;
    }
    .back-product{
        position: absolute;
        left: 4px ;
        top: -30px;
    }
    .edit-template{
        width: 100%;
        margin: 360px 0 0;
    }
    .product-box img{
        width: auto;
    }
    #none-workspace{
        display: none;
    }
}
@media (max-width: 360px){
    
}
</style>