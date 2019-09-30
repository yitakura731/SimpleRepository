<template>
  <div>
    <b-container fluid :style="styleContents" class="contentsArea">
      <b-collapse id="menu-clsp" v-model="showLeftMenu" class="leftArea">
        <space :style="styleLeft" class="pb-4" />
        <document />
      </b-collapse>
      <div :style="styleRight" class="rightArea pl-2">
        <myContent />
      </div>
    </b-container>
    <error-dialog />
    <success-dialog />
  </div>
</template>

<script>
import Space from '@@/components/space.vue';
import Document from '@@/components/document.vue';
import Content from '@@/components/content.vue';
import ErrorDialog from '@@/components/error-dialog.vue';
import SuccessDialog from '@@/components/success-dialog.vue';

export default {
  middleware: ['auth', 'initialize'],
  layout: 'main',
  components: {
    space: Space,
    document: Document,
    myContent: Content,
    'error-dialog': ErrorDialog,
    'success-dialog': SuccessDialog
  },
  data() {
    return {
      showLeftMenu: true
    };
  },
  computed: {
    styleContents() {
      return {
        '--contentsHeight': window.innerHeight - 45 + 'px'
      };
    },
    styleLeft() {
      let val = 0;
      if (this.showLeftMenu) {
        val = 20;
      } else {
        val = 0;
      }
      return {
        '--leftWidth': val + '%'
      };
    },
    styleRight() {
      let val = 0;
      if (this.showLeftMenu) {
        val = 80;
      } else {
        val = 100;
      }
      return {
        '--rightWidth': val + '%'
      };
    }
  }
};
</script>

<style scoped>
.contentsArea {
  --contentsHeight: 0px;
  height: var(--contentsHeight);
  display: flex;
  width: 100%;
  align-items: stretch;
}

.leftArea {
  --leftWidth: 20%;
  width: var(--leftWidth);
  height: 100%;
}

.rightArea {
  --rightWidth: 80%;
  width: var(--rightWidth);
  height: 100%;
}
</style>
