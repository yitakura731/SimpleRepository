<template>
  <b-navbar class="py-1">
    <b-navbar-brand class="headerArea h-100 d-flex align-items-center">
      <img src="~/static/icon.png" class="mr-2" width="40" height="40">
      <div class="headerText">
        {{ $t('navbar') }}
      </div>
    </b-navbar-brand>
  </b-navbar>
</template>

<style scoped>
.headerArea {
  background-color: #3b5998;
  font-size: 24px;
  font-family: Tahoma;
  vertical-align: middle;
}

.headerText {
  color: white;
}
</style>
