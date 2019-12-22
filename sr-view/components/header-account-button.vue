<template>
  <b-nav-item-dropdown right no-caret>
    <template v-slot:button-content>
      <font-awesome-icon :icon="['fa', 'user-circle']" class="text-white" />
    </template>
    <b-dropdown-item>
      <font-awesome-icon icon="database" />
      {{ strategy.username }}
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
      const retVal = {};
      retVal.username = this.$store.state.auth.username;
      const strategy = this.$store.state.auth.strategy;
      if (strategy === 'github') {
        retVal.icon = ['fab', 'github'];
      } else if (strategy === 'facebook') {
        retVal.icon = ['fab', 'facebook'];
      } else if (strategy === 'local') {
        retVal.icon = ['fas', 'database'];
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
