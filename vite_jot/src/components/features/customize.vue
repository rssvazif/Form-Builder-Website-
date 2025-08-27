<template>
    <div class="customize">
        <div style="display: flex; justify-content: center;">
            <img src="/customize-forms-2.svg" alt="customize-jot">
        </div>
        <div>
            <h3>فرم مورد نیازتان را در دقیقه ای بسازید</h3>
        </div>
        <div>
            <p>با فرم ساز آنلاین جات فرم بدون نیاز به کدنویسی، فرم های حرفه ای طراحی کنید. سپس فرم ها را با لوگو ، فونت و رنگ های خودتان شخصی سازی کنید.</p>
        </div>
    </div>
</template>


<style setup>
    .customize{
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 29%;
        padding: 2.5em 0;
    }
    h3{
        font-size: 28px;
        text-align: center;
        margin: 25px 0 18px;
        color: var(--jfv-free-dark);
    }
    p{
        font-size: 16px;
        margin: 0;
        color: var(--jfv-blue-p-tag-dark);
    }
    @media (max-width: 1200px){
        .customize{
            width: 100%;
            padding: 2.5em 0;
        }
    }
    @media (max-width: 992px){
        .customize div img{
            width: 100%;
        }
        p{
            text-align: center;
        }
    }
</style>