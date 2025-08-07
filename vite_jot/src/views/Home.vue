<script setup>
import HeaderApp from '../components/header.vue'
import signUp from '../components/signUp.vue'
import logo from '../components/logo_blue.vue'
import woman_laptop_right from '../components/woman_laptop_right.vue'
import woman_laptop_left from '../components/woman_laptop_left.vue'
import signUp_box from '../components/signUp_box.vue'
import payments from '../components/features/payments.vue' 
import integrations from '../components/features/integrations.vue'
import customize from '../components/features/customize.vue'
import footer_endPage from '../components/footer_endPage.vue'
import {onMounted, ref, onUnmounted ,computed} from 'vue'
import SignUp from '../components/signUp.vue'

const Login_on = ref(false)
const SignUp_on = ref(false)
const tuggle = ref(false)
const windowWidth = ref(window.innerWidth)
const text_error = ref('')
const username_or_email = ref('')
const password_login = ref('')
const open_menu_template = ref(false)
const open_menu_product = ref(false)
const open_menu_support = ref(false)

function windowControler(){
    windowWidth.value = window.innerWidth
    if(windowWidth.value >= 992){
        tuggle.value = false
    }
}
onMounted(()=>{
    check_signUp()
})
onMounted(()=>{
    window.addEventListener('resize' , windowControler);
    windowControler();
    if(window.innerWidth > 360){
        Login_on.value = false
        SignUp_on.value = false
    }
})

onUnmounted(()=>{
    window.removeEventListener('resize', windowControler)
})

function check_signUp(){
    const token = localStorage.getItem('token')
    if(!token){
        return
    }
    window.location.href = '/myWorkspace'
}
function go_workSpace(){
    window.location.href = '/myWorkspace'
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
</script>

<template>
    <div :class="{active: tuggle}" class="hidden-menu">
        <ul class="topics">
            <li @click="go_workSpace()">صفحه کار من</li>
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
    <div class="signUp_in_responsive" v-if="Login_on">
        <div style="padding: 15px 15px 0 15px;">
            <button class="close-add-label" @click="Login_on = false">
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
                    <button @click="user_store.change_box('SignUp'),text_error = ''">ثبت نام</button>
                </div>
            </div>
        </div>
    </div>
    <div class="signUp_in_responsive" v-if="SignUp_on">
        <div style="padding: 15px 15px 0 15px;">
            <button class="close-add-label" @click="SignUp_on = false , accept_email = false">
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
                    <button @click="user_store.change_box('Login'),user_email ='',text_error=''">ورود</button>
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
    <nav class="check-item">
        <logo/>
        <signUp @click="SignUp_on = true" v-show="!tuggle"/>
        <div @click="tuggle = !tuggle" :class="{active: tuggle}" class="hamburger-menu">
            <span></span>
            <span></span>
            <span></span>
        </div>
    </nav>
    <HeaderApp id="test"/>

    <section class="page-welcome container">
        <div class="title">
            <h1>آسان ترین فرم ساز آنلاین</h1>
            <h2>فرم‌های قدرتمند، کار را انجام می‌دهند.</h2>
            <p>ما باور داریم که یک فرم مناسب می‌تواند تفاوت بزرگی ایجاد کند. از کارهای تکراری و وقت‌گیر فاصله بگیرید و با فرم‌های هوشمندی که از منطق شرطی پشتیبانی می‌کنند، گزارش‌ تولید می‌کنند و گردش‌ کارها را خودکار می‌سازند، بهره‌وری خود را افزایش دهید.</p>
        </div>
        <div class="pic-and-signUp">
            <woman_laptop_right/>
            <signUp_box/>
            <woman_laptop_left/>
        </div>
    </section>

    <section class="features container">
        <div class="inner-features">
            <payments/>
            <integrations/>
            <customize/>
        </div>
    </section>

    <section class="bottom-signUp container">
        <h4 class="sentence-style">آماده شروع هستید؟</h4>
        <p id="pragh" class="sentence-style">اولین فرم خودتو بساز تا ببینی برای چی جامعه بزرگی به جات فرم اعتماد دارن.</p>
        <signUp_box class="control-signUp-box"/>
    </section>

    <footer class="container">
        <footer_endPage/>
    </footer>
    
</template>

<style setup>
    summary {
        list-style: none;
    }
    details{
        width: 100%;
    }
    .arrow-sub-menu{
        float: left;
    }
    .div-after-summary{
        padding: 12px 16px 0;
        font-size: 14px;
        color: #24356a;
    }
    .summary-template-sub-menu{
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 5px;
    }
    .hidden-menu{
        background-color: var(--jfv-header-bg-light);
        height: 100vh;
        width: 100%;
        position: fixed;
        top: 60px;
        left: -2000px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        font-size: 1.1rem;
        transition: .3s ease;
    }

    .hidden-menu.active{
        left: 0;
        justify-content:start;
    }
    .topics{
        display: flex;
        flex-direction: column;
        width: 100%;
        padding: 0;
        color: var(--jfv-header-font-dark);
        height: 65%;
    }

    .topics li{
        list-style: none;
        border-bottom: 1px solid #aaa;
        padding: 12px;
    }

    .topics li:last-child{
        border: none;
    }
    .signUp-login-resp{
        display: flex;
        justify-content: center;
        align-items: center;
        list-style: none;
        padding: 0;
        margin-bottom: 0;
        width: 100%;
        box-shadow: rgba(41, 42, 61, 0.25) 0px 0px 16px;
    }

    .signUp-login-resp li{
        width: fit-content;
    }

    .signUp-login-resp li button{
        width: inherit;
        font-size: 16px;
        font-weight: bold;
    }

    .login-resp{
        background-color: inherit;
        outline: none;
        border: 1px solid var(--jfv-header-bg-dark);
        border-radius: 5px;
        font-family: inherit;
        padding: 0.44em 3.1em;
        margin: 16px 16px 16px 8px;
        cursor: pointer;
    }
    .signUp-resp{
        margin: 0;
    }

    .check-item{
        padding: 1rem;
        display: none;
        justify-content: space-between;
        align-items: center;

    }

    .hamburger-menu{
        height: 20px;
        width: 20px;
        cursor: pointer;
        position: relative;
    }

    .hamburger-menu span{
        height: 3px;
        width: 100%;
        background-color: #555;
        border-radius: 25px;
        position: absolute;
        top: 50%;
        right: -5px;
        transform: translate(-50%,-50%);
        transition: .3s ease;
    }

    .hamburger-menu span:nth-child(1){
        top: 25%;
    }

    .hamburger-menu span:nth-child(3){
        top: 75%;
    }

    .hamburger-menu.active span:nth-child(1){
        top: 50%;
        transform: translate(-50% , -50%) rotate(45deg) ;
    }

    .hamburger-menu.active span:nth-child(2){
        opacity: 0;
    }

    .hamburger-menu.active span:nth-child(3){
        top: 50%;
        transform: translate(-50% , -50%) rotate(-45deg) ;
    }

    .page-welcome{
        display: flex;
        flex-direction: column;
        margin: 0 6.9em;
        padding: 3em 1.7em;
        width: 85%;
    }
    .pic-and-signUp{
        display: flex;
        justify-content: space-between;
        margin: 30px 0;
    }

    .title{
        display: flex;
        flex-direction: column;
        justify-content: center;
        text-align: center;
    }

    .title h1{
        font-size: 22px;
        color: var(--jfv-button-bg-signUp);
        margin: 0 0 12px 0;
    }
    .title h2{
        font-size: 50px;
        color: var(--jfv-header-font-dark);
        margin: 0;
    }
    .title p{
        font-size: 22px;
        color: var(--jfv-title-p-font-light);
        margin: 32px 0 0 0;
    }

    .features{
        background-color: var(--jfv-orange-100);
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 2.5em 0;
    }
    .inner-features{
        display: flex;
        justify-content: space-between;
        margin: 0 6.9em;
        padding: 0 1.4em;
    }
    .sentence-style{
        margin: 0;
        text-align: center;
        color: #fff;
        padding: 0 0 0.2em;
    }
    .bottom-signUp{
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 5em 1.4em;
        background-color:var(--jfv-bottom-signUp) ;
    }
    .bottom-signUp h4{
        font-size: 2.4em;
    }
    .bottom-signUp #pragh{
        font-size: 1.4em;
        color: var(--jfv-withe-dark);
    }
    .control-signUp-box{
        margin: 2.5em 32em;
        width: 417px;
    }
    .signUp_in_responsive{
        position: fixed;
        width: 100%;
        height: 100%;
        z-index: 2009;
        top: 50%;
        left: 50%;
        overflow: none;
        transform: translate(-50%,-50%);
        background-color: #fff;
    }
    .new-responsive-signUp{
        padding: 0 8px;
    }
    .new-responsive-signUp h2{
        margin: 3px  0 15px;
        text-align: center;
        color: var(--jfv-google-apple-blue);
    }

    .new-responsive-signUp p{
        text-align: center;
        margin: 3px 4px;
        color: #6c73a8;
        font-size: 14px;
    }
    .topics-menu-down{
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    @media (max-width: 1400px){
        .page-welcome{
            margin: 0 1em;
        }
        .title{
            width: 100%;
            padding: 0 18px;
            text-align: center;
        }
        .title h1{
            font-size:  1.3em;
        }
        .title h2{
            font-size: 2.5em
        }
        .title p{
            font-size: 1em;
        }
    }

    @media (max-width : 1200px){

        .jot-logo{
            width: 30%;
        }
        .logo b{
            font-size: 25px;
        }

        .menu-bar{
            width: 50% ;
            font-size: 80%;
        }

        .login-signUP{
            width: 60%;
            height: 60%;
        }

        .login{
            width: 50%;
            max-height: 100%;
        }

        .login span {
            font-size: 12.5px;
        }
        .signUp span{
            font-size: small;
        }

        .page-welcome{
            margin: 0;
            width: auto;
            padding: 2em 0;
        }
        .box{
            min-width: 304px;
        }
        .inner-features{
            flex-direction: column;
            margin: 0;
        }
    }

    @media (max-width: 992px){
        .check-item{
            display: flex;
            padding: 0.5em 1em;
        }
        #test{
            display: none;
        }
        .header{
            margin: 0.2rem;
        }
        .signUp{
            width: 30vw;
            font-size: 0.2em;
            background-color: var(--jfv-header-bg-dark);
        }
        .svg-box svg{
            display: none;
        }
        .signUp{
            margin: 0;
        }
        .control-signUp-box{
            margin: 20px 0 30px 0;
            width: 317px;
        }
    }

    @media (max-width: 360px){
        .logo{
            gap: 0.1em;
        }
        .hamburger-menu{
            width: 18px;
            height: 18px;
        }
        .check-item{
            padding: 1em 0 1em 1em;
        }
    }

</style>