<template>
  <b-card no-body no-header class="h-100 w-100 border-0 top-area">
    <b-form inline class="operation-area p-1 m-1 border-0">
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

    <div ref="contentsArea" class="border-0 h-100 w-100 view-area">
      <div
        ref="imgParent"
        class="img-parent w-100 h-100 d-flex justify-content-center align-items-center"
        :style="styles()"
      >
        <img
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
          const contentWidth = contentsArea.clientWidth;
          if (image.height > image.width) {
            image.height = contentHeight;
            image.width = image.width * (contentHeight / image.height);
          } else {
            image.height = image.height * (contentWidth / image.width);
            image.width = contentWidth;
          }
          this.imageData = image;
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
}
.operation-area {
  position: absolute;
  z-index: 1;
  background-color: rgba(240, 240, 240, 0.7);
  border-radius: 5px;
}
.view-area {
  position: absolute;
}
.image-area {
  display: block;
}
.contents-number {
  font-size: 17px;
  text-align: center;
  border: thin solid gray;
  width: 40px;
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
