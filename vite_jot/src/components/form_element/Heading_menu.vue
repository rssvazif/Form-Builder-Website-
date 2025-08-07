<script setup>
import { useFormFieldsStore } from '../../../stores/FormFieldsStore'

const Form_store = useFormFieldsStore()
const Heading_data= Form_store.fields.find(item => item.type === 'Heading')
</script>
<template>
    <div class="heading-com" :style="{height:Heading_data.value.size === 'big'?'90px':''}">
        <div class="border-blue">
            <div class="padding-done" :style="{direction:Heading_data.value.aligment === 'left'?'ltr':''}">
                <div>
                    <input class="mainHeader" type="text" v-model="Heading_data.value.Header" :style="{fontSize:Heading_data.value.size === 'big'?'':'16px',textAlign:Heading_data.value.aligment === 'center'?'center':''}">
                </div>
                <div v-if="Form_store.show_subTitle">
                    <input class="subheader" type="text" placeholder="زیر عنوان" v-model="Heading_data.value.subHeader" :style="{fontSize:Heading_data.value.size === 'big'?'':'10px' ,textAlign:Heading_data.value.aligment === 'center'?'center':''}">
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
    height: 70px;
    position: inherit;
}
.heading-com::after{
    content: "";
    width: 650px;
    height: 1px;
    background-color: #d7d8e1;
    top: 93%;
    left: 18px;
    position: absolute;
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
    font-size: 20px;
    color: #2c3345;
    margin: 0 0 10px;
}
.subheader{
    font-size: 12px; 
    color: #c5c7d8;
}
@media{
    .heading-com::after{
        width: 300px;
    }
}
</style>

<style scoped>
::placeholder{
    color: #c5c7d8;;
}
</style>