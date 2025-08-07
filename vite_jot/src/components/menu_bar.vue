<template>
    <div class="menu-bar">
            <div class="menu-bar-items">
                <router-link to="/myWorkspace" style="color: inherit;">
                    <span id="dashboard">صفحه کار من</span>
                </router-link>
            </div>
            <div class="menu-bar-items">
                <span>قالب ها</span>
            </div>
            <div class="menu-bar-items">
                <span>محصولات</span>
            </div>
            <div class="menu-bar-items">
                <span>پشتیبانی</span>
            </div>
        </div>
</template>


<style setup>
.menu-bar{
    display: flex;
    align-items: center;
    justify-content: space-around;
    margin-right: 10em;
}

.menu-bar-items{
    padding: 0.8em 2em;
    cursor: pointer;
    transition: .3s ease;
}
.menu-bar-items:hover{
    color: var(--jfv-button-bg-google);
    transition: .3s ease;
}
</style>