<template>
  <div>
    <!-- ヘッダー -->
    <myheader :style="styleHeader" class="headerArea"/>

    <!-- コンポーネント -->
    <b-container fluid :style="styleContents" class="contentsArea">
      <b-row no-gutters class="mx-4 h-100">
        <b-col lg="2" class="pl-2 pr-2">
          <!-- スペースエリア -->
          <space/>
        </b-col>
        <b-col lg="2" class="pl-2 pr-2">
          <!-- 文書ツリーエリア -->
          <document/>
        </b-col>
        <b-col lg="8" class="pl-2 pr-2">
          <!-- コンテンツエリア -->
          <myContent/>
        </b-col>
      </b-row>
    </b-container>

    <error-dialog/>
    <success-dialog/>
  </div>
</template>

<script>
import Space from './space.vue';
import Document from './document.vue';
import Content from './content.vue';
import Header from './header.vue';
import ErrorDialog from './error-dialog';
import SuccessDialog from './success-dialog';
import Consts from './consts';

export default {
  components: {
    'myheader': Header,
    'space': Space,
    'document': Document,
    'myContent': Content,
    'error-dialog': ErrorDialog,
    'success-dialog': SuccessDialog,
  },
  computed: {
    styleHeader() {
      return {
        '--headerHeight': Consts.HEADER_HEIGHT + 'px'
      };
    },
    styleContents() {
      return {
        '--contentsHeight': Consts.CONTENTS_HEIGHT + 'px'
      };
    },
  }
};
</script>

<style scoped>
.headerArea {
  --headerHeight: 0px;
  height: var(--headerHeight);
}
.contentsArea {
  --contentsHeight: 0px;
  height: var(--contentsHeight);
}
</style>
