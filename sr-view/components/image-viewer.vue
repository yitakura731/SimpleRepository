<template>
  <b-card no-body no-header class="h-100 border-0 top-area">
    <b-form inline class="operation-area">
      <b-button type="button" size="sm" @click="setScale(10)">
        <font-awesome-icon icon="plus" />
      </b-button>
      <b-button type="button" size="sm" class="ml-1" @click="setScale(-10)">
        <font-awesome-icon icon="minus" />
      </b-button>
      <div class="contents-number ml-1">
        {{ scale }}
      </div>
      <div class="ml-1 contents-label">
        %
      </div>
    </b-form>

    <div ref="contentsArea" class="border h-100 view-area">
      <div ref="imgParent" class="img-parent" :style="imgParentStyles()">
        <div ref="imgWrapper" :style="imageStyle()">
          <b-img ref="contentsImg" :src="imageData" fluid-grow />
        </div>
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
      internalimageWidth: 0,
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
    setScale(diff) {
      const newScale = this.scale + diff;
      this.internalimageWidth =
        this.internalimageWidth * (newScale / this.scale);
      this.scale = newScale;
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
    imageStyle() {
      const contentsArea = this.$refs.contentsArea;
      let localWidth = 0;
      if (contentsArea != null) {
        if (this.internalimageWidth !== 0) {
          localWidth = this.internalimageWidth;
        } else {
          localWidth = contentsArea.clientWidth;
        }
        this.internalimageWidth = localWidth;
      } else {
        localWidth = 600;
      }
      return { width: this.internalimageWidth + 'px' };
    },
    imgParentStyles() {
      const contentsArea = this.$refs.contentsArea;
      let retVal = null;
      if (contentsArea != null) {
        retVal = { height: contentsArea.clientHeight + 'px' };
      } else {
        retVal = { height: 450 + 'px' };
      }
      return retVal;
    }
  }
};
</script>

<style scoped>
.top-area {
  position: relative;
  width: 100%;
}
.operation-area {
  position: absolute;
  z-index: 1;
  background-color: rgba(240, 240, 240, 0.7);
  border-radius: 5px;
  padding: 4px;
  margin-left: 6px;
  margin-top: 6px;
}
.view-area {
  position: absolute;
  width: 100%;
}
.contents-number {
  font-size: 20px;
  text-align: center;
  border: thin solid gray;
  width: 60px;
  border-radius: 5px;
  background-color: white;
}
.contents-label {
  font-size: 20px;
}
.img-parent {
  overflow: scroll;
  background-color: lightgray;
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
