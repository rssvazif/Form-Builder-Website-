<script setup>

import Login_component from './Login_comp.vue'
import SignUp_component from './SignUP_comp.vue'
import { useSignUp_LoginStore } from '../../stores/SignUp_LoginStore'

const user_store = useSignUp_LoginStore()

</script>

<template>
    <div class="header container">
        <div class="logo">
            <svg style="transform:translateY(-2px)" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 30" class="jot-logo">
                <path d="M7.47266 28.5098C8.03906 29.0589 7.6388 29.9996 6.83452 29.9996H1.80114C0.808059 29.9996 0 29.2163 0 28.2536V23.3741C0 22.5944 0.970426 22.2064 1.53682 22.7555L7.47266 28.5098Z" fill="#0A1551"></path><path d="M15.3409 28.8897C13.851 27.4096 13.851 25.0097 15.3409 23.5295L20.718 18.1875C22.2079 16.7073 24.6235 16.7073 26.1134 18.1875C27.6033 19.6677 27.6033 22.0676 26.1134 23.5478L20.7363 28.8897C19.2464 30.3699 16.8308 30.3699 15.3409 28.8897Z" fill="#FFB629"></path><path d="M1.135 15.4667C-0.354897 13.9865 -0.354896 11.5867 1.135 10.1065L10.184 1.11014C11.6739 -0.370046 14.0895 -0.370048 15.5794 1.11014C17.0693 2.59033 17.0693 4.99019 15.5794 6.47038L6.5304 15.4667C5.0405 16.9469 2.6249 16.9469 1.135 15.4667Z" fill="#0099FF"></path><path d="M8.5324 21.8782C7.0425 20.398 7.0425 17.9982 8.5324 16.518L20.7592 4.37085C22.2491 2.89067 24.6647 2.89066 26.1546 4.37085C27.6445 5.85104 27.6445 8.2509 26.1546 9.73109L13.9278 21.8782C12.4379 23.3584 10.0223 23.3584 8.5324 21.8782Z" fill="#FF6100"></path></svg>
            <b>جات فرم</b>
        </div>


        <div class="menu-bar">
            <div class="menu-bar-items">
                <router-link to="/myWorkspace" style="color: inherit;">
                    <span id="dashboard">صفحه کار من</span>
                </router-link>
            </div>
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
        </div>
        <div class="login-signUp">
            <button class="login" @click="user_store.open_Login = true , user_store.open_SignUp = false"><span>ورود</span></button>
            <button class="signUp" @click="user_store.open_SignUp = true , user_store.open_Login = false"><span>ثبت نام رایگان</span></button>
        </div>
        <Login_component v-if="user_store.open_Login"/>
        <SignUp_component v-if="user_store.open_SignUp || signUp_from_box"/>

    </div>

</template>

<style setup>
.help-field{
    width: 100%;
}
.learn-field{
    background-color: var(--jfv-gray-100);
    width: 100%;
}
.support-field{
    display: flex;
    flex-direction: column;
    padding: 10px 0;
}
.sub-menu{
    display: none;
    position: absolute;
    left: -50px;
    bottom: -180px;
    width: 250px;
    border: 1px solid #c8ceed;
    color: #000;
    background-color: #fff;
    border-radius: 6px; 
    padding: 10px 20px;
    z-index: 100;
    cursor:context-menu;
}
.support{
    padding: 0;
    justify-content: space-between;
    align-items: center;
    width: 300px;
    bottom: -128px;
}
.products{
    bottom: -300px;
    left: -75px;
    width: 280px;   
}
.sub-menu:hover{
    display: block;
}
.menu-bar-items:hover .sub-menu {
    display: block;
}
.menu-bar-items:hover .support{
    display: flex;
}
.sub-menu li:nth-child(1){
    margin: 10px 0;
}
.sub-menu li span:nth-child(1){
    color: var(--jfv-terms-color);
    font-weight:lighter;
    font-size: 12px;
}
.sub-menu-item{
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 0.5em 0.8em;
    cursor: pointer;
    transition: .3s ease;
    font-size: 14px;

}
.sub-menu-item:hover{
    color: var(--jfv-button-bg-google);
    transition: .3s ease;
    background-color: #eee;
}
.sub-menu-item:hover .support-span{
    color: var(--jfv-button-bg-google);
}
#dashboard{
    position: relative; 
}
#dashboard::after{
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translate(-50%); 
    width: 0;
    height: 2px;
    border-radius: 3px;
    background-color: var(--jfv-button-bg-google);
    transition: width 0.3s ease;
}
#dashboard:hover::after{
    width: 50%;
}
.header{
    background-color: var(--jfv-header-bg-light);
    color: var(--jfv-header-font-dark);
    display: flex;
    justify-content: center;
    margin: 0 5em;
    height: 4.5rem;
}

.logo{
    display: flex;
    align-items: center;
    min-width: 200px;
}

.logo b{
    font-size: 28px;
    width: 100%;
}

.jot-logo{
    max-width: 80px;
}


.menu-bar{
    display: flex;
    align-items: center;
    justify-content: space-around;
    margin-right: 10em;
}

.menu-bar-items{
    display: flex;
    align-items: center;
    padding: 0.8em 2em;
    cursor: pointer;
    transition: .3s ease;
    position: relative;
}
.menu-bar-items:hover{
    color: var(--jfv-button-bg-google);
    transition: .3s ease;
}


.login-signUp{
    display: flex;
    align-items: center;
}
.login:hover{
    color: var(--jfv-button-bg-google);
    transition: 0.3s ease;
}
.signUp:hover{
    background-color: var(--jfv-button-bg-signUp-hover);
    transition: 0.3s ease;
}

.signUp{
    background-color: var(--jfv-button-bg-signUp);
    color: var(--jfv-header-font-light);
    font-family: var(--primaryOne-font) , var(--primaryTwo-font);
    font-weight: 500;
    outline: none;
    border: none;
    padding:0.5em 1.6em;
    border-radius: 5px;
    font-size: inherit;
    cursor: pointer;
    transition: 0.3s ease;
}

.login{
    background-color: var(--jfv-header-bg-light);
    font-family: var(--primaryOne-font) , var(--primaryTwo-font);
    outline: none;
    border: none;
    border-right: 1px solid #ddd;
    padding: 0.8em 1.5em;
    font-size: inherit;
    cursor: pointer;
    transition: .3s ease;
}
.small-style{
    font-size: 12px; 
    color: var(--jfv-terms-color);
}
.no-access-page{
    position: fixed;
    z-index: 1001;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(37, 45, 91, 0.7);;
}
.box-add-user{
    position: absolute;
    width: 740px;
    background-color: #fff;
    border-radius: 8px;
    top: 50%;
    left: 50%;
    overflow: hidden;
    transform: translate(-50%,-50%);
}
.signUp-section{
    padding: 0 40px 35px;                       
}
.signUp-section h2{
    margin: 3px  0 15px;
    text-align: center;
    color: var(--jfv-google-apple-blue);
}

.signUp-section p{
    text-align: center;
    margin: 3px 4px;
    color: #6c73a8;
    font-size: 14px;
}
.signUp-with{
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 12px;
}
.signUp-with button{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 5px 4px;
    width: 76px;
    height: 76px;
    font-family: inherit;
    color: #47507d;
    outline: none;
    border: 1px solid #c8ceed;
    border-radius: 4px ;
    background-color: inherit;
    font-size: 12px;
}
.signUp-with button:hover{
    background-color: #eff1f9;
}
#signUp-p{
    padding: 10px 8px 0;
    margin: 13px 5px 0;
    color: #6f76a7;
}
.signUp-email{
    display: flex;
    flex-direction: column;
    align-items: center; 
    padding: 10px 5px;
}
.signUp-email label{
    margin: 0 0 10px;
    width: 50%;
    color: #000; 
}
.signUp-email span{
    width: 100%;
    display: flex;
    justify-content: center;
}
.signUp-email span input{
    font-family: inherit;
    outline: none;
    border: 1px solid #c8ceed;
    border-radius: 4px;
    width: 50%;
    height: 40px;
    padding: 0 12px;
    direction: ltr;
}
.signUp-email span input:focus{
    border-color: #6a9cff;
    box-shadow: 0 0 0 2px rgba(106, 156, 255, .58);
}
.login-box{
    width: 100%;
    display: flex;
    margin: 8px 0 0;
    font-size: 14px;
    justify-content: center;
    color: #2b3245;
}
.login-box button{
    border: none;
    outline: none;
    background-color: inherit;
    font-family: inherit;
    font-size: 14px;
    color: #2c75f2;
    padding: 1px 6px;
}
.continue{
    background-color: #64b200;
    outline: none;
    border: none;
    height: 48px;
    width: 50%;
    border-radius: 4px ;
    color: #fff;
    font-family: inherit;
    font-size: 18px;
    margin: 16px 0 0;
}
.continue:hover{
    background-color: #4eb100;
}
.signUp-username{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 10px 0;
    margin: 15px 4px 10px;
}

.item-signUp{
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 50%;
    margin: 5px 0;
}
.item-signUp span{
    display: flex;
    justify-content: center;
    text-align: right;
}
.item-signUp span input{
    width:100%;
    height: 40px;
    outline: none;
    border: none;
    font-family: inherit;
    padding: 0 12px;
    border-radius: 4px;
    border: 1px solid #c8ceed;
    font-size: 14px;
    font-weight: bold;        
}
.item-signUp span input:focus{
    border-color: #6a9cff;
    box-shadow: 0 0 0 2px rgba(106, 156, 255, .58);
}
.item-signUp span label{
    width: 100%;
    padding: 5px 0 5px;
    color: #2b3245;
    font-size: 16px;
}
.input-ltr{
    direction: ltr;
}
.item-signUp button{
    border: none;
    outline: none;
    background-color: #64b200;
    font-family: inherit;
    color: #fff;
    border-radius: 4px;
    height: 40px;
    margin: 30px 0 0;
    font-size: 18px;
}
.item-signUp button:hover{
    background-color:#4eb100 ;
}
</style>