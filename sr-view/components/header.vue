<template>
  <b-navbar class="p-0">
    <div class="header-area w-100 d-sm-flex align-items-center">
      <div class="d-flex justify-content-center">
        <header-brand />
      </div>
      <div class="d-flex flex-fill">
        <b-navbar-nav class="ml-2 d-flex align-items-center">
          <header-regist-button class="mr-3" />
          <header-space-button class="mr-3" />
          <header-search-area />
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto d-flex align-items-center mr-2">
          <header-global-button />
          <header-account-button />
        </b-navbar-nav>
      </div>
      <div class="d-block d-sm-none">
        <b-collapse id="collapse-1" class="collapse px-2 pb-2">
          <header-search-input />
        </b-collapse>
      </div>
    </div>
  </b-navbar>
</template>

<script>
import HeaderBrand from './header-brand.vue';
import HeaderGlobalButton from './header-global-button.vue';
import HeaderAccountButton from './header-account-button.vue';
import HeaderRegistButton from './header-regist-button.vue';
import HeaderSpaceButton from './header-space-button.vue';
import HeaderSearchArea from './header-search-area.vue';
import HeaderSearchInput from './header-search-input.vue';

export default {
  components: {
    'header-brand': HeaderBrand,
    'header-global-button': HeaderGlobalButton,
    'header-regist-button': HeaderRegistButton,
    'header-search-area': HeaderSearchArea,
    'header-search-input': HeaderSearchInput,
    'header-account-button': HeaderAccountButton,
    'header-space-button': HeaderSpaceButton
  }
};
</script>
>
<style scoped>
.header-area {
  color: white;
  background-color: #3b5998;
  font-size: 20px;
  font-family: Tahoma;
}
</style>
