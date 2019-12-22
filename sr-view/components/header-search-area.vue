<template>
  <b-nav-item>
    <div class="d-block d-sm-none">
      <b-link v-b-toggle.collapse-1 data-toggle="collapse">
        <font-awesome-icon icon="search" class="text-white" />
      </b-link>
    </div>
    <div class="d-none d-sm-block">
      <header-search-input />
    </div>
  </b-nav-item>
</template>

<script>
import HeaderSearchInput from './header-search-input.vue';

export default {
  components: {
    'header-search-input': HeaderSearchInput
  }
};
</script>
>
