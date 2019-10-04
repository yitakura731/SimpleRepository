<template>
  <div>
    <b-container
      fluid
      :style="styleContents"
      class="contentsArea"
      @mouseup="mouseUp($event)"
      @mousemove="mouseMove($event)"
    >
      <b-collapse
        id="menu-clsp"
        v-model="showLeftMenu"
        :style="styleLeft"
        class="leftArea"
      >
        <space class="pb-4" />
        <document />
      </b-collapse>
      <b-collapse id="menu-clsp" v-model="showLeftMenu">
        <div class="borderArea" @mousedown="mouseDown($event)">
          <div class="borderSubLeftArea" />
          <div class="borderSubRightArea" />
        </div>
      </b-collapse>
      <div :style="styleRight" class="rightArea">
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
      showLeftMenu: true,
      borderRatio: 20,
      isMouseDown: false
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
        val = this.borderRatio;
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
.contentsArea {
  --contentsHeight: 0px;
  height: var(--contentsHeight);
  width: 100%;
  display: flex;
  align-items: stretch;
}

.leftArea {
  --leftWidth: 20%;
  width: var(--leftWidth);
  height: 100%;
}

.borderArea {
  height: 100%;
  display: flex;
}

.borderSubLeftArea {
  height: 100%;
  width: 5px;
  display: flex;
  cursor: ew-resize;
  margin-left: 8px;
}

.borderSubRightArea {
  height: 100%;
  width: 5px;
  display: flex;
  cursor: ew-resize;
  margin-right: 8px;
  border-left: double lightgray 4px;
}

.rightArea {
  --rightWidth: 80%;
  width: var(--rightWidth);
  padding-right: 0em;
  height: 100%;
}

@media screen and (max-width: 600px) {
  .contentsArea {
    height: var(500px);
    width: 100%;
    display: initial;
    align-items: initial;
  }
}

@media screen and (max-width: 600px) {
  .leftArea {
    width: 100%;
    padding-left: 0.3em;
    padding-right: 0.3em;
    border-right: none;
    display: initial;
  }
  .rightArea {
    width: 100%;
    padding-left: 0;
  }
}
</style>
