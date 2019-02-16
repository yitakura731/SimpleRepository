<template>
    <div class="overlay">
        <div class="panel">
            <img src = "/images/loading.gif" class="loading-image" width="70" height="70">
            <span class="ml-3 text">{{title}}</span>
        </div>
    </div>
</template>

<script>
import i18next from 'i18next';

export default {
    data() {
        return {
            title : i18next.t('loading-title')
        };
    }
}
</script>

<style>
.overlay {
    background: rgba(10, 10, 10, .5);
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 999;
    transition: all .5s ease;
}
.panel {
    user-select : none;
    background: white;
    width: 270px;
    height: 100px;
    padding: 15px;
    position: absolute;
    left: 50%;
    top: 50%;
    transition: all .3s ease;
    border : 2px solid limegreen;
    border-radius: 15px;
}
.text {
    font-size: 24px;
}
</style>
