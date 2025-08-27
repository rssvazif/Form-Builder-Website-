import { defineStore } from "pinia";

export const useSignUp_LoginStore = defineStore('SignUp_LoginStore',{
    state: ()=>({
        open_Login: false,
        open_SignUp: false,
        box: false,
        change: ''
    }),
    actions: {
        close(){
            this.open_Login = false
            this.open_SignUp = false
            this.box = false
        },
        change_box(selected){
            if(selected === 'Login'){
                this.open_Login = true
                this.open_SignUp = false
            }else{
                this.open_Login = false
                this.open_SignUp = true
            }
        }
    }
})