<template>
  <b-navbar class="py-1">
    <b-navbar-brand class="headerArea h-100 d-flex align-items-center">
      <img src="~/static/icon.png" class="mr-2" width="40" height="40" />
      <div class="headerText">
        {{ $t('navbar') }}
      </div>
    </b-navbar-brand>
    <b-nav-item-dropdown
      v-if="loggedIn"
      show
      right
      no-caret
      class="d-flex align-items-center ml-auto"
    >
      <template slot="button-content">
        <font-awesome-icon
          :icon="['fa', 'user-circle']"
          style="font-size: 40px; color: white;"
        />
      </template>
      <b-dropdown-item>
        <font-awesome-icon :icon="strategy.icon" style="font-size: 20px;" />
        {{ strategy.username }}
      </b-dropdown-item>
      <hr />
      <b-dropdown-item @click="logout()">
        <font-awesome-icon icon="sign-out-alt" style="font-size: 20px;" />
        {{ $t('logout') }}
      </b-dropdown-item>
    </b-nav-item-dropdown>
  </b-navbar>
</template>

<script>
export default {
  computed: {
    loggedIn() {
      const loginUser = this.$store.state.auth.username;
      return loginUser != null;
    },
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
      this.$store.dispatch('auth/logout').catch(error => {
        this.$nuxt.$emit('showError', error);
      });
    }
  }
};
</script>
>
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
