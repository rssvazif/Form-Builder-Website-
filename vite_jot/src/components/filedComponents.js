import {defineAsyncComponent} from 'vue'

const fieldComponents = {
    Heading_main: defineAsyncComponent(()=> import('../components/form_element/Heading_main.vue')),
    PlaceDrop: defineAsyncComponent(()=> import('../components/form_element/PlaceDrop.vue')),
    Heading: defineAsyncComponent(()=> import('../components/form_element/Heading_menu.vue')),
    FullName: defineAsyncComponent(()=> import('../components/form_element/FullName.vue')),
    Email: defineAsyncComponent(()=> import('../components/form_element/Email.vue')),
    Address: defineAsyncComponent(()=> import('../components/form_element/Address.vue')),
    Phone: defineAsyncComponent(()=> import('../components/form_element/Phone.vue')),
    DatePicker: defineAsyncComponent(()=> import('../components/form_element/DatePicker.vue')),
    ShortText: defineAsyncComponent(()=> import('../components/form_element/ShortText.vue')),
    LongText: defineAsyncComponent(()=> import('../components/form_element/LongText.vue')),
    Single_choise : defineAsyncComponent(()=> import('../components/form_element/Single_choise.vue')),
    Multiple_choise: defineAsyncComponent(()=> import('../components/form_element/Multiple_choise.vue')),
    Number: defineAsyncComponent(()=> import('../components/form_element/Number.vue')),
    Image: defineAsyncComponent(()=> import('../components/form_element/Image.vue')),
    Upload_file:defineAsyncComponent(()=> import('../components/form_element/Upload_file.vue')),
    Time: defineAsyncComponent(()=> import('../components/form_element/Time.vue')),
    Spinner: defineAsyncComponent(()=> import('../components/form_element/Spinner.vue')),
    Submit: defineAsyncComponent(()=> import('../components/form_element/Submit.vue')),
}

export default fieldComponents