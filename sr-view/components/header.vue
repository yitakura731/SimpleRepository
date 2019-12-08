<template>
  <b-navbar class="p-0">
    <div class="header-area w-100 pl-2 d-sm-flex text-center">
      <b-navbar-brand class="h-100 mt-1 text-white">
        <img
          src="~/static/icon.png"
          class="d-inline-block align-top"
          width="30"
          height="30"
        />
        {{ $t('navbar') }}
      </b-navbar-brand>

      <div class="d-flex flex-fill">
        <b-navbar-nav>
          <b-nav-item v-b-toggle.menu-clsp>
            <div class="header-button">
              <font-awesome-icon icon="align-justify" />
            </div>
          </b-nav-item>

          <b-nav-item-dropdown no-caret>
            <template v-slot:button-content>
              <div class="header-button">
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

          <b-nav-item-dropdown no-caret>
            <template v-slot:button-content>
              <div class="header-button">
                <font-awesome-icon icon="angle-down" />
                {{ $t('language') }}
              </div>
            </template>
            <b-dropdown-item @click="setLocale('ja')">
              {{ $t('label_ja') }}
            </b-dropdown-item>
            <b-dropdown-item @click="setLocale('en')">
              {{ $t('label_en') }}
            </b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>

        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown right no-caret>
            <template v-slot:button-content>
              <font-awesome-icon
                :icon="['fa', 'user-circle']"
                style="font-size: 28px; color: white;"
              />
            </template>
            <b-dropdown-item>
              <font-awesome-icon :icon="strategy.icon" />
              {{ strategy.username }}
            </b-dropdown-item>
            <hr class="my-1" />
            <b-dropdown-item @click="logout()">
              <font-awesome-icon icon="sign-out-alt" />
              {{ $t('logout') }}
            </b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </div>
    </div>

    <post-space-dialog ref="PostSpaceDialog" />
    <post-doc-dialog ref="PostDocDialog" />
    <post-tag-dialog ref="PostTagDialog" />
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
      this.$store.dispatch('auth/logout');
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
.header-area {
  color: white;
  background-color: #3b5998;
  font-size: 20px;
  font-family: Tahoma;
  vertical-align: middle;
}

.header-button {
  color: white;
  padding: 3px 6px;
  font-size: 16px;
  border: solid 1px white;
  border-radius: 5px;
}
</style>
