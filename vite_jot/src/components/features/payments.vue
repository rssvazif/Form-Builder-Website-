<template>
    <div class="payment">
        <div>
            <img src="/payments-2.svg" alt="payment-jot">
        </div>
        <div>
            <h3>دریافت پرداخت آنلاین بدون دردسر</h3>
        </div>
        <div>
            <p>فرقی نمی‌کند محصول می‌فروشید، هزینه دریافت می‌کنید یا کمک جمع می‌کنید؛ جات‌فرم پرداخت مستقیم از طریق فرم شما را ممکن می‌سازد</p>
        </div>
    </div>
</template>

<style setup>
    .payment{
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 29%;
        padding: 2.5em 0;
    }
    @media (max-width: 1200px){
        .payment{
            width: 100%;
            padding: 2.5em 0;
        }
    }
</style>