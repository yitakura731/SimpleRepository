<template>
  <div class="overlay">
    <div class="panel">
      <img
        src="~/static/loading.gif"
        class="loading-image"
        width="70"
        height="70"
      />
      <span class="ml-3 text">{{ $t('roadingTitle') }}</span>
    </div>
  </div>
</template>

<style>
.overlay {
  background: rgba(10, 10, 10, 0.5);
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 999;
  transition: all 0.5s ease;
}
.panel {
  user-select: none;
  background: white;
  width: 270px;
  height: 100px;
  padding: 15px;
  position: absolute;
  left: 50%;
  top: 50%;
  transition: all 0.3s ease;
  border: 2px solid limegreen;
  border-radius: 15px;
}
.text {
  font-size: 24px;
}
</style>
