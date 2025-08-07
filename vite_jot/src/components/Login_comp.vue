<script setup>
import {ref} from 'vue'
import { useSignUp_LoginStore } from '../../stores/SignUp_LoginStore'

const user_Store = useSignUp_LoginStore()
const text_error = ref('')

const username_or_email = ref('')
const password_login = ref('')


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
        <div class="no-access-page">
            <div class="box-add-user">
                <div style="padding: 15px 15px 0 15px;">
                    <button class="close-add-label" @click="user_Store.close()">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" fill="#B0BEC5" viewBox="0 0 24 24" ><path fill-rule="evenodd" d="M17.707 7.707a1 1 0 0 0-1.414-1.414L12 10.586 7.707 6.293a1 1 0 0 0-1.414 1.414L10.586 12l-4.293 4.293a1 1 0 1 0 1.414 1.414L12 13.414l4.293 4.293a1 1 0 0 0 1.414-1.414L13.414 12l4.293-4.293Z" clip-rule="evenodd"></path></svg>
                    </button>
                </div>
                <div class="signUp-section">
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
                        <span><label for="email-address">ایمیل <small>یا</small> نام کاربری</label></span>
                        <span><input type="text" key="email-address" v-model="username_or_email" @input="text_error = ''"></span>
                        <span style="margin: 15px 0 0;"><label for="password-user">رمز عبور</label></span>
                        <span style="margin: 0 0 25px;"><input type="password" key="password-user" v-model="password_login" @input="text_error = ''"></span>
                        <span v-if="text_error" style="color: red; padding: 5px 0;">{{ text_error }}</span>
                        <span><button class="continue" @click="login_User()">ورود</button></span>
                        <div class="login-box">
                           حساب کاربری ندارید؟
                            <button @click="user_Store.change_box('SignUp'),text_error = ''">ثبت نام</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class=""></div>
</template>

<style setup>

</style>