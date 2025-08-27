<script setup>
import {ref,onMounted,computed} from 'vue'
import Login_component from './Login_comp.vue'
import SignUp_component from './SignUP_comp.vue'
import { useSignUp_LoginStore } from '../../stores/SignUp_LoginStore'

const user_store = useSignUp_LoginStore()
const avatar_status = ref(false)
const account_tuggle = ref(false)
const div_login = ref(false)
const text_error = ref('')
const div_signUp = ref(false)
const user_email = ref('')
const accept_email = ref(false)
const User_Name = ref('')

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const isEmailValid = computed(() => {
  return emailRegex.test(user_email.value);
});
onMounted(()=>{
    set_avatar()
    get_userName()
})

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
function close_login(){
    div_login.value = false
}
function close_signUp(){
    div_signUp.value = false
    user_email.value = ''
    accept_email.value = false
    text_error.value = ''
}
function set_avatar(){
    const token = localStorage.getItem('token')
    if(!token){
        avatar_status.value = false
        return
    }
    avatar_status.value = true
}
function logOut_user(){
    localStorage.removeItem('token')
    localStorage.removeItem('expiry')
    window.location.href = '/'
}

</script>

<template>
    <div class="menu-bar menu-workspace">
        <div class="menu-bar-items">
            <span>قالب ها</span>
            <span><svg xmlns="http://www.w3.org/2000/svg" width="15" height="100%" fill="currentColor" viewBox="3 0 35 18"><path fill-rule="evenodd" d="M4.293 8.293a1 1 0 0 1 1.414 0L12 14.586l6.293-6.293a1 1 0 1 1 1.414 1.414l-7 7a1 1 0 0 1-1.414 0l-7-7a1 1 0 0 1 0-1.414Z" clip-rule="evenodd"></path></svg></span>
            <div>
                <ul class="sub-menu">
                    <li><span>قالب ها</span></li>
                    <li ><router-link to="#" class="sub-menu-item">
                        <span>
                            <img src="/form.svg" alt="قالب های فرم" width="40" height="40">
                        </span>
                        <span>قالب های فرم</span>
                    </router-link></li>
                    <li><router-link to="#" class="sub-menu-item">
                        <span>
                            <img src="/card-form.svg" alt="card-from" width="40" height="40">
                        </span>
                        <span>قالب های کارت فرم</span>
                    </router-link></li>
                </ul>
            </div>
        </div>
        <div class="menu-bar-items">
            <span>محصولات</span>
            <span><svg xmlns="http://www.w3.org/2000/svg" width="15" height="100%" fill="currentColor" viewBox="3 0 35 18"><path fill-rule="evenodd" d="M4.293 8.293a1 1 0 0 1 1.414 0L12 14.586l6.293-6.293a1 1 0 1 1 1.414 1.414l-7 7a1 1 0 0 1-1.414 0l-7-7a1 1 0 0 1 0-1.414Z" clip-rule="evenodd"></path></svg></span>
            <div>
                <ul class="sub-menu products">
                    <li><span>محصولات</span></li>
                    <li><router-link to="#" class="sub-menu-item">
                        <span>
                            <img src="/form.svg" alt="from creator" width="40" height="40">
                        </span>
                        <span>فرم ساز</span>
                    </router-link></li>
                    <li class="sub-menu-item">
                        <span>
                            <img src="/pdf-editor.svg" alt="pdf editor" width="40" height="40">
                        </span>
                        <span>پی دی اف ادیتور</span>
                        <small class="small-style">(به زودی)</small>
                    </li>
                    <li class="sub-menu-item">
                        <span>
                            <img src="/report-builder.svg" alt="reporter" width="40" height="40">
                        </span>
                        <span>گزارش ساز</span>
                        <small class="small-style">(به زودی)</small>
                    </li>
                    <li class="sub-menu-item">
                        <span>
                            <img src="/approvals.svg" alt="workflow jotform" width="40" height="40">
                        </span>
                        <span>روند کار جات فرم</span>
                        <small class="small-style">(به زودی)</small>
                    </li>   
                </ul>
            </div>
        </div>
        <div class="menu-bar-items">
            <span>پشتیبانی</span>
            <span><svg xmlns="http://www.w3.org/2000/svg" width="15" height="100%" fill="currentColor" viewBox="3 0 35 18"><path fill-rule="evenodd" d="M4.293 8.293a1 1 0 0 1 1.414 0L12 14.586l6.293-6.293a1 1 0 1 1 1.414 1.414l-7 7a1 1 0 0 1-1.414 0l-7-7a1 1 0 0 1 0-1.414Z" clip-rule="evenodd"></path></svg></span>
            <div class="sub-menu support">
                <div class="support-field help-field">
                    <ul>
                        <li style="padding: 0 15px;"><span>کمک بگیرید</span></li>
                        <li><router-link to="#" class="sub-menu-item"><span class="support-span" style="font-size: 14px;">ارتباط با ما</span></router-link></li>
                        <li><router-link to="#" class="sub-menu-item"><span class="support-span" style="font-size: 14px;">سوالات متداول</span></router-link></li>
                    </ul>
                </div>
                <div class="support-field learn-field">
                    <ul>
                        <li style="padding: 0 15px;"><span>آموزش</span></li>
                        <li><router-link to="#" class="sub-menu-item"><span class="support-span" style="font-size: 14px;">دستورالعمل کاربر</span></router-link></li>
                        <li><router-link to="#" class="sub-menu-item"><span class="support-span" style="font-size: 14px;">وبلاگ</span></router-link></li>  
                    </ul>
                </div>
            </div>
        </div>
        <div class="login-signUp workspace-login-signUp" v-if="!avatar_status">
            <button class="login workspace-login" @click="user_store.open_Login = true , user_store.open_SignUp = false"><span>ورود</span></button>
            <button class="signUp" @click="user_store.open_SignUp = true ,user_store.open_Login = false"><span>ثبت نام رایگان</span></button>
        </div>
        <Login_component v-if="user_store.open_Login"/>
        <SignUp_component v-if="user_store.open_SignUp"/>
        <div class="box-avatar" v-if="avatar_status">
            <button class="avatar" style="border-radius: 50%;" @click="account_tuggle = !account_tuggle"><img src="/podo_logo.png" alt="user" width="45" height="45" style="border-radius: 50%;"></button>
            <div class="account-box" v-if="account_tuggle">
                <div class="box-hello">
                    <div>
                        <button class="avatar" style="border-radius: 50%;" @click="account_tuggle = !account_tuggle"><img src="/podo_logo.png" alt="user" width="45" height="100%" style="border-radius: 50%;"></button>
                    </div>
                    <div class="hello-username">
                        <span>سلام،</span>
                        <span>{{ User_Name }}</span>
                    </div>
                    <div class="status-user">
                        معتبر
                    </div>
                </div>
                <div class="user-bar">
                    <button>تنظیمات</button>
                </div>
                <div class="user-bar" @click="logOut_user()">
                    <button>خروج از حساب</button>
                </div>
            </div>
        </div>
    </div>


</template>


<style setup>
.box-avatar{
    margin: 0 20px;
    position: relative;
}
.avatar{
    border-radius: 50%;
    border: 2px solid var(--jfv-orange-font-dark);
    width: fit-content;
}
.avatar button{
    outline: none;
    font-family: inherit;
}
.account-box{
    position: absolute;
    width: 378px;
    background-color: #fff;
    height: fit-content;
    z-index: 50;
    left: 0;
    bottom: -206px;
    overflow: hidden;
    border-radius: 10px;
    border: 1px solid #c8ceed;
}
.box-hello{
    display: flex;
    align-items: center;
    padding: 16px;
    justify-content: space-between;
    width: 100%;    
    background-color: inherit;
    border: none;
}
.hello-username{
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 2px 10px;
    font-size: 14px;
}
.hello-username span:nth-child(1){
    color: #343c6a;
}
.hello-username span:nth-child(2){
    color: var(--jfv-google-apple-blue);
    font-weight: bolder;
}
.status-user{
    background-color: #01bd6f;
    border-radius: 4px;
    font-size: 12px;
    padding: 8px 16px;
}
.user-bar{
    display: flex;
    padding: 16px 20px;
    height: 56px;
    cursor: pointer;
}
.user-bar:hover{
    background-color: #f7f7ff;
}
.user-bar button{
    outline: none;
    border: none;
    background-color: inherit;
    font-family: inherit;
    font-size: 16px;
    color: #0c164e;
}

.menu-bar{
    display: flex;
    align-items: center;
    justify-content: space-around;
    margin-right: 10em;
}

.menu-bar-items{
    padding: 0.8em 2em;
    cursor: pointer;
    transition: .3s ease;
    font-size: 14px;
}
.menu-workspace .menu-bar-items:hover{
    color: var(--jfv-orange-font-dark);
}
.menu-workspace , .workspace-login{
    color: var(--jfv-header-bg-light);
}
.workspace-login{
    background-color: var(--jfv-header-bg-dark);
    border-right: 2px solid #ddd;
}

.workspace-login:hover{
    color: var(--jfv-orange-font-dark);
}
.workspace-login-signUp{
    font-size: 14px;
}

</style>