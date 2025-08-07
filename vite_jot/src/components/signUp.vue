<template>
    <button class="signUp"><span>ثبت نام رایگان</span></button>
</template>

<style setup>
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
    }

    @media (max-width: 992px){
        .signUp{
            margin-right: 120px;
        }
    }
</style>