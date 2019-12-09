<template>
  <div class="parent h-100 w-100">
    <div class="child d-flex justify-content-center align-items-center">
      <div class="d-flex">
        <img src="~/static/loading.gif" width="30" height="30" />
        <span class="ml-3">{{ $t('roadingTitle') }}</span>
      </div>
    </div>
  </div>
</template>

<style>
.parent {
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(10, 10, 10, 0.5);
  z-index: 999;
  transition: all 0.5s ease;
}
.child {
  user-select: none;
  background: white;
  width: 170px;
  height: 60px;
  transition: all 0.3s ease;
  border: 2px solid #3b5998;
  border-radius: 5px;
}
</style>
