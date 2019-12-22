<template>
  <div
    class="d-sm-flex h-100 w-100 px-1 px-sm-3"
    @mouseup="mouseUp($event)"
    @mousemove="mouseMove($event)"
  >
    <div :style="leftArea" class="left-area p-0">
      <document />
    </div>

    <div class="d-none d-sm-flex h-100" @mousedown="mouseDown($event)">
      <div class="border-sub-left-area" />
      <div class="border-sub-right-area" />
    </div>

    <div :style="rightArea" class="right-area">
      <div v-if="isSmSize">
        <my-content-dialog />
      </div>
      <div v-else class="h-100">
        <my-content />
      </div>
    </div>
    <error-dialog />
    <success-dialog />
  </div>
</template>

<script>
import Document from '@@/components/document.vue';
import Content from '@@/components/content.vue';
import ContentDialog from '@@/components/content-dialog.vue';
import ErrorDialog from '@@/components/error-dialog.vue';
import SuccessDialog from '@@/components/success-dialog.vue';

export default {
  middleware: ['initialize'],
  layout: 'main',
  components: {
    document: Document,
    myContent: Content,
    myContentDialog: ContentDialog,
    errorDialog: ErrorDialog,
    successDialog: SuccessDialog
  },
  data() {
    return {
      showLeftMenu: true,
      borderRatio: 40,
      isMouseDown: false
    };
  },
  computed: {
    leftArea() {
      let val = 0;
      if (this.showLeftMenu) {
        val = this.borderRatio;
      } else {
        val = 0;
      }
      return {
        '--leftWidth': val + '%'
      };
    },
    rightArea() {
      let val = 0;
      if (this.showLeftMenu) {
        val = 100 - this.borderRatio;
      } else {
        val = 100;
      }
      return {
        '--rightWidth': val + '%'
      };
    },
    isSmSize() {
      return window.matchMedia('screen and (max-width: 600px)').matches;
    }
  },
  created() {
    this.$nuxt.$on('dispayContent', data => {
      this.data = data;
    });
  },
  methods: {
    mouseDown(event) {
      this.isMouseDown = true;
    },
    mouseUp(event) {
      this.isMouseDown = false;
    },
    mouseMove(event) {
      if (this.isMouseDown) {
        this.borderRatio += 100 * (event.movementX / window.innerWidth);
      }
    }
  }
};
</script>

<style scoped>
.left-area {
  --leftWidth: 40%;
  width: var(--leftWidth);
  height: 100%;
}

.border-sub-left-area {
  width: 5px;
  cursor: ew-resize;
  margin-left: 4px;
}

.border-sub-right-area {
  width: 5px;
  cursor: ew-resize;
  margin-right: 8px;
  border-left: double lightgray 4px;
}

.right-area {
  --rightWidth: 0%;
  width: var(--rightWidth);
  padding-right: 0em;
  height: 100%;
}

@media screen and (max-width: 600px) {
  .left-area {
    width: 100%;
    padding: 0.3em;
  }
  .right-area {
    width: 0%;
    height: 0%;
  }
}
</style>
