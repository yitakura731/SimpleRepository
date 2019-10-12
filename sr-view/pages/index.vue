<template>
  <b-container fluid :style="styleContents" class="contentsArea">
    <p class="welcomeArea pt-3">
      {{ $t('welcome') }}
    </p>
    <p class="subtitleArea">
      {{ $t('subtitle') }}
    </p>
    <b-row align-h="center" align-v="center" class="pt-3">
      <b-col md="4">
        <b-card class="cardArea mb-5">
          <b-form-group :label="$t('localId')" label-size="sm">
            <b-input v-model="localId" size="sm" placeholder="" />
          </b-form-group>
          <b-form-group :label="$t('password')" label-size="sm">
            <b-input
              v-model="password"
              size="sm"
              type="password"
              placeholder=""
            />
          </b-form-group>
          <div class="text-center">
            <b-btn variant="primary" size="sm" block @click="localLogin">
              {{ $t('login') }}
            </b-btn>
          </div>
        </b-card>
        <b-alert v-if="error" show variant="danger" class="mt-1 text-center">
          {{ error.message }}
        </b-alert>
      </b-col>
      <b-col md="1" />
      <b-col md="4" class="text-center">
        <b-card class="cardArea">
          <div v-for="s in strategies" :key="s.key" class="mb-2">
            <form name="socialLogin" method="post" :action="s.action">
              <b-btn
                type="submit"
                block
                size="md"
                :style="{ background: s.color }"
                class="login-button"
              >
                <font-awesome-icon :icon="s.icon" style="font-size: 24px" />
                <span class="ml-2">{{ s.name }}{{ $t('loginWith') }}</span>
              </b-btn>
            </form>
          </div>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
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
          action: `api/auth/login/github`
        },
        {
          key: 'facebook',
          name: 'facebook',
          color: '#3C5A99',
          icon: ['fab', 'facebook'],
          action: `api/auth/login/facebook`
        }
      ];
    },
    styleContents() {
      return {
        '--contentsHeight': window.innerHeight + 'px'
      };
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

<style scoped>
.contentsArea {
  --contentsHeight: 0px;
  height: var(--contentsHeight);
  background-image: url('~@/assets/city.jpg');
  background-size: cover;
  background-position: center center;
}

.welcomeArea {
  font-size: 40px;
  color: white;
  text-align: center;
  font-family: Tahoma;
}

.subtitleArea {
  font-size: 20px;
  color: white;
  text-align: center;
  font-family: Tahoma;
}

.cardArea {
  background-color: rgba(234, 234, 234, 0.7);
  border-style: none;
}
</style>
