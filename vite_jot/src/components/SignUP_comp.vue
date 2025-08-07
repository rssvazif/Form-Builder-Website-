<script setup>
import {ref,computed} from 'vue'
import { useSignUp_LoginStore } from '../../stores/SignUp_LoginStore'

const user_store = useSignUp_LoginStore()
const text_error = ref('')
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
        <div class="no-access-page">
            <div class="box-add-user">
                <div style="padding: 15px 15px 0 15px;">
                    <button class="close-add-label" @click="user_store.close()">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" fill="#B0BEC5" viewBox="0 0 24 24" ><path fill-rule="evenodd" d="M17.707 7.707a1 1 0 0 0-1.414-1.414L12 10.586 7.707 6.293a1 1 0 0 0-1.414 1.414L10.586 12l-4.293 4.293a1 1 0 1 0 1.414 1.414L12 13.414l4.293 4.293a1 1 0 0 0 1.414-1.414L13.414 12l4.293-4.293Z" clip-rule="evenodd"></path></svg>
                    </button>
                </div>
                <div class="signUp-section">
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
                        <span><label for="email-address">ایمیل</label></span>
                        <span><input type="text" key="email-address" v-model="user_email" @input="text_error = ''"></span>
                        <span v-if="text_error" style="color: red; padding: 5px 0;">{{ text_error }}</span>
                        <span><button class="continue" @click="get_email()">ادامه</button></span>
                        <div class="login-box">
                           قبلا ثبت نام کرده اید؟
                            <button @click="user_store.change_box('Login'),user_email ='',text_error=''">ورود</button>
                        </div>
                    </div>
                    <div class="signUp-username" v-if="accept_email" @keyup.enter="send_new_user(e)">
                        <div class="item-signUp">
                            <span><label for="user-name">نام کاربری</label></span>
                            <span><input type="text" key="user-name" v-model="New_User.username" @input="text_error = ''"></span>
                        </div>
                        <div class="item-signUp">
                            <span><label for="email-address">ایمیل</label></span>
                            <span><input type="text" key="email-address" class="input-ltr" v-model="user_email" :disabled="accept_email" @input="text_error = ''"></span>
                        </div>
                        <div class="item-signUp">
                            <span><label for="password">رمز عبور</label></span>
                            <span><input type="password" key="password" class="input-ltr" v-model="New_User.password" @input="text_error = ''"></span>
                        </div>
                        <div class="item-signUp">
                            <span><label for="password-again">تکرار رمز عبور</label></span>
                            <span><input type="password" key="password-again" v-model="password_again" class="input-ltr" @input="text_error = ''"></span>
                            <span v-if="text_error" style="color: red; padding: 5px 0;">{{ text_error }}</span>
                        </div>
                        <div class="item-signUp">
                            <button @click="send_new_user(e)">ثبت نام</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
</template>


<style setup>

</style>