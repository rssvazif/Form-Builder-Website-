<script setup>
import {useFormFieldsStore} from '../../../stores/FormFieldsStore'

const Form_store = useFormFieldsStore()
const Heading_data = Form_store.fields.find(item => item.type === 'Heading_main')

const props = defineProps({
    modelValue:{
        type:Boolean,
        default:false
    }
})
</script>


<template>

    <div class="heading-com" :style="{height:Heading_data.size === 'big'?'':'90px'}">
        <div class="border-blue">
            <div class="padding-done" :style="{direction:Heading_data.aligment === 'left'?'ltr':''}">
                <div>
                    <input class="mainHeader" type="text" v-model="Heading_data.Header" :style="{fontSize:Heading_data.size === 'big'?'':'20px',textAlign:Heading_data.aligment === 'center'?'center':''}">    
                </div>
                <div v-if="Form_store.show_subTitle">
                    <input class="subheader" placeholder="زیر عنوان" type="text" v-model="Heading_data.subHeader" :style="{fontSize:Heading_data.size === 'big'?'':'12px' ,textAlign:Heading_data.aligment === 'center'?'center':''}">
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
.heading-com{
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 600;
    height: 135px;
    position: relative;
}
.heading-com::after{
    content: '';
    width: 769px;
    height: 1px;
    background-color: #d7d8e1;
    position: absolute;
    left: -37px;
    top: 87%;
}
.border-blue{
    height: 100%;
    width:100%;
    border: 2.5px solid #fff;
    border-radius: 4px;
    position: relative;
}
.padding-done{
    padding: 10px 20px;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;    
    justify-content: center;
}
.padding-done div{
    width: 100%;
}
.padding-done div input{
    border: none;
    outline: none;
    font-family: inherit;
    font-weight: 600;
    width: 100%;
    
}
.mainHeader{
    font-size: 32px;
    color: #2c3345;
    margin: 0 0 10px;
}
.subheader{
    font-size: 16px; 
    color: #c5c7d8;
}

@media (max-width: 640px){
    .heading-com::after{
        width: 340px;
    }
}
</style>
<style scoped>
::placeholder{
    color: #c5c7d8;
}
</style>