import {defineStore} from 'pinia'

export const useFormFieldsStore = defineStore('FormFieldsStore',{
    state: ()=>({
        fields:[],
        activeFieldIndex : null,
        show_subTitle: false
    }),
    actions: {
        setFields(newFields) {
            this.fields.push(newFields)
        },
        addFields(newFields,index){
            this.fields.splice(index,0,newFields)
        },
        deleteField(index){
            this.fields.splice(index,1)
        },
        SetActive(index){
            this.activeFieldIndex = index
        },
        setEditForm(form){
            this.fields = form.fields
        }
    }
})