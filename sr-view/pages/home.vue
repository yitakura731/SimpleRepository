<template>
  <div>
    <b-container fluid :style="styleContents" class="contentsArea">
      <b-row no-gutters class="mx-4 h-100">
        <b-col lg="3" class="pl-2 pr-2 h-100">
          <space />
          <document />
        </b-col>
        <b-col lg="9" class="pl-2 pr-2 h-100">
          <myContent />
        </b-col>
      </b-row>
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
