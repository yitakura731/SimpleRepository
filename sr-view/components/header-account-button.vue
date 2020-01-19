<template>
  <b-nav-item-dropdown right no-caret>
    <template v-slot:button-content>
      <font-awesome-icon :icon="['fa', 'user-circle']" class="text-white" />
    </template>
    <b-dropdown-item>
      <font-awesome-icon :icon="strategy" />
      {{ username }}
    </b-dropdown-item>
    <hr class="my-1" />
    <b-dropdown-item @click="logout()">
      <font-awesome-icon icon="sign-out-alt" />
      {{ $t('logout') }}
    </b-dropdown-item>
  </b-nav-item-dropdown>
</template>

<script>
export default {
  computed: {
    strategy() {
      let retVal = null;
      const strategy = this.$store.state.auth.strategy;
      if (strategy === 'github') {
        retVal = ['fab', 'github'];
      } else if (strategy === 'facebook') {
        retVal = ['fab', 'facebook'];
      } else {
        retVal = ['fas', 'database'];
      }
      return retVal;
    },
    username() {
      let retVal = '';
      const name = this.$store.state.auth.username;
      if (name != null) {
        if (this.$i18n.locale === 'ja') {
          retVal = name.ja;
        } else {
          retVal = name.en;
        }
      }
      return retVal;
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('auth/logout');
    }
  }
};
</script>

<style scoped></style>
