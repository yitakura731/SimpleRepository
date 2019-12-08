<template>
  <div class="h-100">
    <b-container
      fluid
      class="contents-area h-100 w-100"
      @mouseup="mouseUp($event)"
      @mousemove="mouseMove($event)"
    >
      <b-collapse
        id="menu-clsp"
        v-model="showLeftMenu"
        :style="leftArea"
        class="left-area"
      >
        <document />
      </b-collapse>

      <b-collapse id="menu-clsp" v-model="showLeftMenu">
        <div class="border-area" @mousedown="mouseDown($event)">
          <div class="border-sub-left-area" />
          <div class="border-sub-right-area" />
        </div>
      </b-collapse>

      <div :style="rightArea" class="right-area">
        <myContent />
      </div>
    </b-container>
    <error-dialog />
    <success-dialog />
  </div>
</template>

<script>
import Document from '@@/components/document.vue';
import Content from '@@/components/content.vue';
import ErrorDialog from '@@/components/error-dialog.vue';
import SuccessDialog from '@@/components/success-dialog.vue';

export default {
  middleware: ['initialize'],
  layout: 'main',
  components: {
    document: Document,
    myContent: Content,
    'error-dialog': ErrorDialog,
    'success-dialog': SuccessDialog
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
    }
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
.contents-area {
  display: flex;
  align-items: stretch;
}

.left-area {
  --leftWidth: 40%;
  width: var(--leftWidth);
  height: 100%;
}

.border-area {
  height: 100%;
  display: flex;
}

.border-sub-left-area {
  height: 100%;
  width: 5px;
  display: flex;
  cursor: ew-resize;
  margin-left: 8px;
}

.border-sub-right-area {
  height: 100%;
  width: 5px;
  display: flex;
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
  .contents-area {
    height: var(500px);
    width: 100%;
    display: initial;
    align-items: initial;
  }
  .left-area {
    width: 100%;
    padding-left: 0.3em;
    padding-right: 0.3em;
    border-right: none;
    display: initial;
  }
  .right-area {
    width: 100%;
    padding-left: 0;
  }
}
</style>
