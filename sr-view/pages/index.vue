<template>
  <div>
    <b-container fluid :style="styleContents" class="contentsArea">
      <b-row no-gutters class="mx-4 h-100">
        <b-col lg="2" class="pl-2 pr-2">
          <space />
        </b-col>
        <b-col lg="2" class="pl-2 pr-2">
          <document />
        </b-col>
        <b-col lg="8" class="pl-2 pr-2">
          <myContent />
        </b-col>
      </b-row>
    </b-container>
    <error-dialog />
    <success-dialog />
  </div>
</template>

<script>
import Space from '../components/space.vue';
import Document from '../components/document.vue';
import Content from '../components/content.vue';
import ErrorDialog from '../components/error-dialog.vue';
import SuccessDialog from '../components/success-dialog.vue';

export default {
  layout: 'default',
  components: {
    space: Space,
    document: Document,
    myContent: Content,
    'error-dialog': ErrorDialog,
    'success-dialog': SuccessDialog
  },
  computed: {
    styleContents() {
      return {
        '--contentsHeight': window.innerHeight - 54 + 'px'
      };
    }
  }
};
</script>

<style scoped>
.contentsArea {
  --contentsHeight: 0px;
  height: var(--contentsHeight);
}
</style>
