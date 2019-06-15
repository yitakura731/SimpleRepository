<template>
  <b-card no-body no-header class="h-100 border-0">
    <b-form inline>
      <b-button type="button" size="lg" @click="setScale(10)">
        <font-awesome-icon icon="plus" />
      </b-button>
      <b-button type="button" size="lg" class="ml-1" @click="setScale(-10)">
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
      <div ref="imgParent" class="img-parent" :style="imgParentStyles()">
        <div ref="imgWrapper" :style="imageWidth()">
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
      internalImageWidth: 0,
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
      this.internalImageWidth =
        this.internalImageWidth * (newScale / this.scale);
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
    imageWidth() {
      const contentsArea = this.$refs.contentsArea;
      let localWidth = 0;
      if (contentsArea != null) {
        if (this.internalImageWidth !== 0) {
          localWidth = this.internalImageWidth;
        } else {
          localWidth = contentsArea.clientWidth;
        }
        this.internalImageWidth = localWidth;
      } else {
        localWidth = 600;
      }
      return { width: this.internalImageWidth + 'px' };
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
.contents-number {
  font-size: 32px;
  text-align: center;
  border: thin solid gray;
  width: 60px;
  border-radius: 5px;
}
.contents-label {
  font-size: 30px;
}
.img-parent {
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
