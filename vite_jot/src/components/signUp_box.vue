<script setup>
import { useSignUp_LoginStore } from '../../stores/SignUp_LoginStore'
import SignUp from '../components/SignUP_comp.vue'

const user_store = useSignUp_LoginStore()

</script>
<template>
    <SignUp v-if="user_store.box"/>
    <div class="box">
        <div class="signUp-itmes">
            <div class="google">
                <button>
                    <span>ثبت نام با گوگل</span>
                    <svg class="auth-section-icon" width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="19" cy="19" r="19" fill="white"></circle><path d="M28.6259 19.2853C28.6259 18.4939 28.5604 17.9164 28.4186 17.3175H19.1974V20.8894H24.61C24.501 21.7771 23.9117 23.1139 22.6021 24.0122L22.5838 24.1318L25.4993 26.3452L25.7013 26.365C27.5565 24.686 28.6259 22.2155 28.6259 19.2853" fill="#4285F4"></path><path d="M19.1968 28.6965C21.8485 28.6965 24.0747 27.8409 25.7007 26.3651L22.6015 24.0122C21.7722 24.5791 20.659 24.9747 19.1968 24.9747C16.5996 24.9747 14.3952 23.2958 13.6095 20.975L13.4943 20.9846L10.4626 23.284L10.423 23.392C12.038 26.5361 15.3555 28.6965 19.1968 28.6965Z" fill="#34A853"></path><path d="M13.6101 20.9751C13.4027 20.3763 13.2827 19.7345 13.2827 19.0715C13.2827 18.4084 13.4027 17.7668 13.5991 17.1679L13.5937 17.0403L10.524 14.7041L10.4236 14.7509C9.75792 16.0557 9.37598 17.5208 9.37598 19.0715C9.37598 20.6222 9.75792 22.0873 10.4236 23.392L13.6101 20.9751" fill="#FBBC05"></path><path d="M19.1968 13.1682C21.041 13.1682 22.2851 13.9489 22.9944 14.6013L25.7662 11.949C24.0639 10.3983 21.8486 9.44653 19.1968 9.44653C15.3555 9.44653 12.038 11.6068 10.423 14.7509L13.5986 17.1679C14.3953 14.8472 16.5996 13.1682 19.1968 13.1682" fill="#EB4335"></path></svg>
                </button>
            </div>
            <div class="microsoft">
                <button>
                    <span>ثبت نام با مایکروسافت</span>
                    <svg class="auth-section-icon" width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="17.8537" cy="17.8633" r="17.542" fill="white"></circle><rect x="18.6052" y="18.6147" width="7.51489" height="7.51489" fill="#FEBA08"></rect><rect x="9.5874" y="18.6147" width="7.51489" height="7.51489" fill="#05A6F0"></rect><rect x="18.6052" y="9.59692" width="7.51489" height="7.51489" fill="#80BC06"></rect><rect x="9.5874" y="9.59692" width="7.51489" height="7.51489" fill="#F25325"></rect></svg>
                </button>
            </div>
            <div class="space">
                <div class="thin"></div>
                <span>یا</span>
                <div class="thin"></div>
            </div>
            

            <router-link to="#" class="email" @click="user_store.box = true">
                <span id="id-email">ثبت نام با ایمیل</span>
            </router-link>
                
            
            
            <div class="free">
                <p>رایگان !</p>
            </div>
        </div>
    </div>
</template>

<style setup>
    .box{
        display: flex;
        flex-direction: column;
        margin: 0 0.3em;
        padding: 1.5em;
        border: 1px solid #c8ceed;
        border-radius: .625rem;
        box-sizing: border-box;
        box-shadow: 0 3px 0 #d2dbf2;
        color: var(--jfv-header-font-light);
        background-color: var(--jfv-header-bg-light);
        min-width: 417px;
        max-height: fit-content;
        
    }

    .signUp-items{
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
    }

    .google button{
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        background-color: var(--jfv-button-bg-google);
        outline: none;
        border: none;
        padding: .75rem 1.375rem;
        margin: 0 0 12px 0;
        min-height: 3.875rem;
        font-size: 1.3125rem;
        width: 100%;
        border-radius: 7px;
    }

    .microsoft button{
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        background-color: var(--jfv-button-bg-microsoft);
        padding: .75rem 1.375rem;
        margin: 0 0 12px 0;
        min-height: 3.875rem;
        font-size: 1.3125rem;
        width: 100%;
        border-radius: 7px;
    }

    .email{
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: var(--jfv-button-bg-signUp);
        padding: .75rem 1.375rem;
        min-height: 3.875rem;
        font-size: 1.3125rem;
        width: 100%;
        border-radius: 7px;
    }

    #id-email{
        color: var(--jfv-header-font-light);
    }


    .google button span , .microsoft button span{
        font-family: var(--primaryOne-font), var(--primaryTwo-font);
        color: var(--jfv-header-font-light);
        width: 100%;
        
    }

    .space{
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 0 12px 0;
    }
    .free{
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 18px 0 0 0;
    }

    .free p{
        color: var(--jfv-free-dark);
        margin: 0;
    }

    .space span{
        color: var(--jfv-or-light);
        padding: 0 20px;
    }

    .thin{
        border: 1px solid var(--jfv-gray-300);
        width: 65%;
        height: 0;
    }
</style>