<template>
  <b-card no-body no-header class="h-100 border-0">
    <b-form inline>
      <b-button type="button" @click="setScale(10)">
        <font-awesome-icon icon="plus" />
      </b-button>
      <b-button type="button" class="ml-1" @click="setScale(-10)">
        <font-awesome-icon icon="minus" />
      </b-button>
      <div class="contents-number ml-1">
        {{ scale }}
      </div>
      <div class="ml-1 contents-label">
        %
      </div>
    </b-form>

    <div ref="contentsArea" class="border mt-1 h-100">
      <div ref="canvasParent" class="canvas-parent" :style="styles()">
        <b-img ref="contentsCanvas" :src="imageData" fluid-grow />
      </div>
    </div>

    <transition name="fade">
      <loading-spinner v-show="loading" />
    </transition>
  </b-card>
</template>

<script>
import LoadingSpinner from './loading-spinner';

export default {
  components: {
    'loading-spinner': LoadingSpinner
  },
  props: {
    content: {
      type: Object,
      required: true,
      validator(obj) {
        return (
          typeof obj.docId === 'string' &&
          typeof obj.docName === 'string' &&
          typeof obj.mimetype === 'string'
        );
      }
    }
  },
  data() {
    return {
      imageData: null,
      scale: 100,
      loading: false
    };
  },
  watch: {
    content(newVal, oldVal) {
      if (newVal !== null) {
        this.scale = 100;
        this.render();
      }
    }
  },
  mounted() {
    this.render();
  },
  methods: {
    setScale(input) {
      this.scale += input;
      this.render(this.currPage);
    },
    render() {
      this.loading = true;
      this.$store
        .dispatch('repository/fetchImage', {
          contentId: this.content.docId
        })
        .then(response => {
          this.imageData = `data:image/jpeg;base64,${response}`;
          this.loading = false;
        })
        .catch(error => {
          this.$nuxt.$emit('showError', error);
          this.loading = false;
        });
    },
    styles() {
      const contentsArea = this.$refs.contentsArea;
      let retVal = null;
      if (contentsArea != null) {
        retVal = { height: contentsArea.clientHeight + 'px' };
      } else {
        retVal = { height: 150 + 'px' };
      }
      return retVal;
    }
  }
};
</script>

<style scoped>
.contents-number {
  font-size: 25px;
  text-align: center;
  border: thin solid gray;
  width: 60px;
  border-radius: 5px;
}
.contents-label {
  font-size: 24px;
}
.canvas-parent {
  overflow: scroll;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 2s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
