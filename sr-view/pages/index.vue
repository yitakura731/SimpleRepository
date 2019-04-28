<template>
  <div>
    <b-row align-h="center" align-v="center" class="mt-5">
      <b-col md="5">
        <b-card bg-variant="light">
          <form name="localLoging" method="post" action="/api/auth/login/local">
            <b-form-group :label="$t('localId')">
              <b-input name="localId" placeholder="" />
            </b-form-group>
            <b-form-group :label="$t('password')">
              <b-input name="password" type="password" placeholder="" />
            </b-form-group>
            <div class="text-center">
              <b-btn variant="primary" type="submit" block>
                {{ $t('login') }}
              </b-btn>
            </div>
          </form>
        </b-card>
        <b-alert v-if="localLoginError" show variant="danger" class="mt-2">
          {{ localLoginError }}
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
      localLoginError: null
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
  mounted() {}
};
</script>
