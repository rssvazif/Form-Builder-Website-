<template>
    <div class="form-designer">
        <button>
            <span>
                <svg style="display: flex;" xmlns="http://www.w3.org/2000/svg" width="28" fill="currentColor" viewBox="0 0 24 24" class="block w-7 h-7"><path fill-rule="evenodd" d="M2.877 10.69a3 3 0 0 0 0 4.242l1.414 1.414a3 3 0 0 0 4.243 0L15.25 9.63a3 3 0 0 0 0-4.243l.763-.763a.421.421 0 0 1 .596 0l2.53 2.531a1 1 0 0 1 0 1.414l-3.535 3.536a2.994 2.994 0 0 0-.86 2.462 2 2 0 0 0 .152 2.66l3.689 3.688a2 2 0 1 0 2.828-2.829l-3.688-3.688a1.991 1.991 0 0 0-.935-.528.997.997 0 0 1 .228-.351l3.536-3.536a3 3 0 0 0 0-4.242l-2.531-2.53a2.42 2.42 0 0 0-3.424 0l-.763.762a3 3 0 0 0-4.243 0L2.877 10.69Z" clip-rule="evenodd"></path></svg>
            </span>
        </button>
    </div>
</template>


<style setup>
.form-designer{
    position: fixed;
    top: 160px;
    left: 20px;
    width:54px;
    height: 54px;
    z-index: 10;
}
.form-designer button{
    background-color: #0075e3;
    border-radius: 50%;
    outline: none;
    border: none;
    width:100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
}
.form-designer button span{
    color: #fff;
}
@media (max-width: 640px){
    .form-designer{
        top: 33rem;
    }
}
</style>