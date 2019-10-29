<template>
  <b-navbar class="headerArea py-0" toggleable="md" type="dark">
    <b-navbar-brand class="h-100 d-flex align-items-center">
      <img src="~/static/icon.png" class="mr-2" width="30" height="30" />
      <div class="headerText">
        {{ $t('navbar') }}
      </div>
    </b-navbar-brand>

    <b-navbar-toggle target="nav-collapse" />

    <b-collapse id="nav-collapse" is-nav>
      <b-nav-form>
        <b-button
          v-if="loggedIn"
          v-b-toggle.menu-clsp
          variant="outline-light"
          class="d-flex align-items-center ml-5"
        >
          <font-awesome-icon icon="align-justify" />
        </b-button>
      </b-nav-form>

      <b-nav-form>
        <b-nav-item-dropdown
          v-if="loggedIn"
          no-caret
          class="headerText d-flex align-items-center ml-1"
        >
          <template slot="button-content">
            <div class="uploadButton">
              <font-awesome-icon icon="cloud-upload-alt" />
              {{ $t('registration') }}
            </div>
          </template>
          <b-dropdown-item @click="postSpace()">
            <font-awesome-icon icon="folder-plus" />
            {{ $t('postSpaceDialogTitle') }}
          </b-dropdown-item>
          <hr class="my-1" />
          <b-dropdown-item @click="postTag()">
            <font-awesome-icon icon="tag" />
            {{ $t('postTagDialogTitle') }}
          </b-dropdown-item>
          <hr class="my-1" />
          <b-dropdown-item @click="postDocument()">
            <font-awesome-icon icon="file-medical" />
            {{ $t('postDocDialogTitle') }}
          </b-dropdown-item>
        </b-nav-item-dropdown>
      </b-nav-form>

      <b-nav-form>
        <b-button-group right>
          <b-button
            data-toggle="button"
            class="languageButton"
            @click="setLocale('ja')"
          >
            {{ $t('label_ja') }}
          </b-button>
          <b-button
            data-toggle="button"
            class="languageButton"
            @click="setLocale('en')"
          >
            {{ $t('label_en') }}
          </b-button>
        </b-button-group>
      </b-nav-form>

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
            style="font-size: 28px; color: white;"
          />
        </template>
        <b-dropdown-item>
          <font-awesome-icon :icon="strategy.icon" style="font-size: 16px;" />
          {{ strategy.username }}
        </b-dropdown-item>
        <hr class="my-1" />
        <b-dropdown-item @click="logout()">
          <font-awesome-icon icon="sign-out-alt" style="font-size: 16px;" />
          {{ $t('logout') }}
        </b-dropdown-item>
      </b-nav-item-dropdown>

      <post-space-dialog ref="PostSpaceDialog" />
      <post-doc-dialog ref="PostDocDialog" />
      <post-tag-dialog ref="PostTagDialog" />
    </b-collapse>
  </b-navbar>
</template>

<script>
import PostSpaceDialog from './post-space-dialog';
import PostDocDialog from './post-doc-dialog.vue';
import PostTagDialog from './post-tag-dialog.vue';

export default {
  components: {
    'post-doc-dialog': PostDocDialog,
    'post-tag-dialog': PostTagDialog,
    'post-space-dialog': PostSpaceDialog
  },
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
    setLocale(newLocale) {
      this.$i18n.locale = newLocale;
    },
    logout() {
      this.$store.dispatch('auth/logout').catch(error => {
        this.$nuxt.$emit('showError', error);
      });
    },
    postDocument() {
      this.$refs.PostDocDialog.start();
    },
    postTag() {
      this.$refs.PostTagDialog.start();
    },
    postSpace() {
      this.$refs.PostSpaceDialog.start();
    }
  }
};
</script>
>
<style scoped>
.headerArea {
  background-color: #3b5998;
  font-size: 20px;
  font-family: Tahoma;
  vertical-align: middle;
}

.languageButton {
  padding: 3px 6px;
  font-size: 16px;
  background-color: rgba(0, 0, 0, 0.1);
  border: solid 1px white;
  border-radius: 5px;
}

.uploadButton {
  color: white;
  padding: 3px 6px;
  font-size: 16px;
  border: solid 1px white;
  border-radius: 5px;
}

.uploadButton:hover {
  color: white;
  padding: 3px 6px;
  font-size: 16px;
  border: solid 1px white;
  font-weight: bold;
}

.headerText {
  color: white;
}
</style>
