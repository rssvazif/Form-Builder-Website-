<script setup>
import {ref,onMounted} from 'vue'
import { useRoute } from 'vue-router'
import {useFormFieldsStore} from '../../stores/FormFieldsStore'
import fieldComponents from '../components/filedComponents'
import logo from '../components/logo.vue'

const route = useRoute()
const Form_store = useFormFieldsStore()

class Form{
    constructor(formId){
        this.formId = formId
    }
    async getForm(){
        try{
            const response = await fetch(`/api/form/${this.formId}`,{
                method: 'GET',
                headers:{
                    'Content-Type':'application/json'
                }
            })
            if(!response.ok){
                console.log(await response.json())
                throw new Error('error to get form')
            }
            const data = await response.json()
            Form_store.setEditForm(data.form)
        }catch(err){
            console.log(err)
        }
    }
    
}

function goToHomePage(){
    window.location.href = '/'
}

const instanceForm = new Form(route.params.form_id)
onMounted(()=>{
    instanceForm.getForm()
})
</script>

<template>
    <div class="form-page-published">
        <div class="form-each">
            <ul class="form-section" ref="formSectionRef">
                <li v-for="(field, index) in Form_store.fields" :key="index" class="per-li">
                    <component class="component-form" :is="fieldComponents[field.type]" :field="field" v-model="Form_store.fields[index]"/> 
                </li>
            </ul>
        </div>
        <div class="invite-to-jotform">
            <logo @click="goToHomePage()" style="color: #fff; cursor: pointer;"/>
            <div style="display: flex;align-items: center;gap: 10px;">
                <span style="color: #f3f3fe;font-size: 11px;">به شکل رایگان فرم خودتو بساز</span>
                <router-link class="create-own-jotform" to="/" target="_blank">
                    جات فرم خودتو بساز
                </router-link>
            </div>
        </div>
    </div>
</template>

<style setup>
.form-page-published{
    display: flex;
    justify-content: center;
    align-items: center;
    margin: auto;
    background-color: #f3f3fe;
    height: 100%;
    min-height: 860px;
    padding: 72px 0 80px;
}
.invite-to-jotform{
    background-color: var(--jfv-google-apple-blue);
    position: fixed;
    display: flex;
    justify-content: space-between;
    left: 0;
    right: 0;
    bottom: 0;
    height: 56px;
    padding: 0 14px;
}
.create-own-jotform{
    color: #fff;
    background-color: #78bb07;
    padding: 8.75px 8px;
    border-radius: 3px;
    font-size: 14px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 200px;
    height: 30px;
}
</style>