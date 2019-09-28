<template>
  <div>
    <b-row align-h="center" align-v="center" class="mt-5">
      <b-col md="5">
        <b-card bg-variant="light">
          <b-form-group :label="$t('localId')">
            <b-input v-model="localId" placeholder="" />
          </b-form-group>
          <b-form-group :label="$t('password')">
            <b-input v-model="password" type="password" placeholder="" />
          </b-form-group>
          <div class="text-center">
            <b-btn variant="primary" block @click="localLogin">
              {{ $t('login') }}
            </b-btn>
          </div>
        </b-card>
        <b-alert v-if="error" show variant="danger" class="mt-2 text-center">
          {{ error.message }}
        </b-alert>
      </b-col>
      <b-col md="5" class="text-center pt-4">
        <b-card bg-variant="light">
          <div v-for="s in strategies" :key="s.key" class="mb-2">
            <form name="socialLogin" method="post" :action="s.action">
              <b-btn
                type="submit"
                block
                size="lg"
                :style="{ background: s.color }"
                class="login-button"
              >
                <font-awesome-icon :icon="s.icon" style="font-size: 30px" />
                <span class="ml-2">{{ s.name }}{{ $t('loginWith') }}</span>
              </b-btn>
            </form>
          </div>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<style scoped>
.login-button {
  border: 0;
}
</style>

<script>
export default {
  middleware: 'auth',
  data() {
    return {
      localId: null,
      password: null,
      error: null
    };
  },
  computed: {
    strategies() {
      return [
        {
          key: 'github',
          name: 'Git Hub',
          color: '#333',
          icon: ['fab', 'github'],
          action: '/api/auth/login/github'
        },
        {
          key: 'facebook',
          name: 'facebook',
          color: '#3C5A99',
          icon: ['fab', 'facebook'],
          action: '/api/auth/login/facebook'
        }
      ];
    }
  },
  methods: {
    async localLogin() {
      this.error = null;
      const fd = {
        localId: this.localId,
        password: this.password
      };
      await this.$store.dispatch('auth/localLogin', fd).catch(e => {
        this.error = e.response.data.info;
      });
    }
  }
};
</script>
