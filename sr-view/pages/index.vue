<template>
  <b-container fluid :style="contentsArea" class="contents-area">
    <p class="welcome-area pt-3">
      {{ $t('welcome') }}
    </p>
    <p class="subtitle-area">
      {{ $t('subtitle') }}
    </p>
    <b-row align-h="center" align-v="center" class="pt-3">
      <b-col md="4">
        <b-card class="card-area m-2">
          <b-form-group :label="$t('localId')" label-size="sm">
            <b-input
              v-model="localId"
              size="sm"
              placeholder=""
              @keydown.enter="localLogin"
            />
          </b-form-group>
          <b-form-group :label="$t('password')" label-size="sm">
            <b-input
              v-model="password"
              size="sm"
              type="password"
              placeholder=""
              @keydown.enter="localLogin"
            />
          </b-form-group>
          <div class="text-center">
            <b-btn variant="primary" size="sm" block @click="localLogin">
              {{ $t('login') }}
            </b-btn>
          </div>
        </b-card>
        <b-alert v-if="error" show variant="danger" class="mt-1 text-center">
          {{ error }}
        </b-alert>
      </b-col>
      <b-col md="1" />
      <b-col md="4" class="text-center">
        <b-card class="card-area m-2">
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
  middleware: 'initialize',
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
          action: `
          api/auth/login/facebook`
        }
      ];
    },
    contentsArea() {
      return {
        '--contentsHeight': window.innerHeight + 'px'
      };
    }
  },
  methods: {
    async localLogin(event) {
      this.error = null;
      if (this.localId == null || this.password == null) {
        this.error = this.$t('emptyUserIdOrPassword');
        return;
      }
      await this.$store
        .dispatch('auth/localLogin', {
          loginId: this.localId,
          password: this.password
        })
        .catch(e => {
          this.error = e.response.data.info.message;
        });
    }
  }
};
</script>

<style scoped>
.contents-area {
  --contentsHeight: 0px;
  height: var(--contentsHeight);
  background-image: url('~@/assets/background.jpg');
  background-size: cover;
  background-position: center center;
}

.welcome-area {
  font-size: 40px;
  color: white;
  text-align: center;
  font-family: Tahoma;
}

.subtitle-area {
  font-size: 20px;
  color: white;
  text-align: center;
  font-family: Tahoma;
}

.card-area {
  background-color: rgba(234, 234, 234, 0.7);
  border-style: none;
}
</style>
