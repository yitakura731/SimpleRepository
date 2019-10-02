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
      <div
        ref="imgParent"
        class="img-parent d-flex align-items-center"
        :style="imgParentStyles()"
      >
        <img
          ref="contentsImg"
          class="image-area"
          :src="imageData !== null ? imageData.src : null"
          :height="imageData !== null ? imageData.height : 100"
          :width="imageData !== null ? imageData.width : 100"
        />
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
    setScale(diff) {
      const newScale = this.scale + diff;
      this.imageData.height = this.imageData.height * (newScale / this.scale);
      this.imageData.width = this.imageData.width * (newScale / this.scale);
      this.scale = newScale;
    },
    render() {
      this.loading = true;
      this.$store
        .dispatch('repository/fetchImage', {
          contentId: this.content.docId
        })
        .then(response => {
          return new Promise((resolve, reject) => {
            const image = new Image();
            image.src = `data:image/jpeg;base64,${response}`;
            image.onload = () => {
              return resolve(image);
            };
          });
        })
        .then(image => {
          const contentsArea = this.$refs.imgParent;
          const contentHeight = contentsArea.clientHeight;
          image.width = image.width * (contentHeight / image.height);
          image.height = contentHeight;
          this.imageData = image;
          this.loading = false;
        })
        .catch(error => {
          this.$nuxt.$emit('showError', error);
          this.loading = false;
        });
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
.image-area {
  display: block;
  margin: 0 auto;
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
