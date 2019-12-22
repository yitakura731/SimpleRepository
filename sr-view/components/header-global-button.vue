<template>
  <b-nav-item-dropdown right no-caret>
    <template v-slot:button-content>
      <font-awesome-icon icon="globe" class="text-white" />
    </template>
    <b-dropdown-item @click="setLocale('ja')">
      {{ $t('label_ja') }}
    </b-dropdown-item>
    <hr class="my-1" />
    <b-dropdown-item @click="setLocale('en')">
      {{ $t('label_en') }}
    </b-dropdown-item>
  </b-nav-item-dropdown>
</template>

<script>
export default {
  methods: {
    setLocale(newLocale) {
      this.$i18n.locale = newLocale;
    }
  }
};
</script>

<style scoped></style>
