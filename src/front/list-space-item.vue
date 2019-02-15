<template>
  <div>
    <div :class="spaceClass" @click="click()">
      <p class="my-1">
        <img class="m-1" :src="imgSrcPath" width="40" height="40"/>
        {{ space.spaceName }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: ['space'],
  computed: {
    spaceClass() {
      let retVal = null;
      const current = this.$store.getters.selectedSpace;
      if (current != null && current._id === this.space._id) {
        retVal = 'selectedSpace';
      } else {
        retVal = 'space';
      }
      return retVal;
    },
    imgSrcPath() {
      if (this.space.fileName == null || this.space.fileName == '') {
        return `/images/space_default.png`;
      } else {
        return `/spaces/${this.space.fileName}`;
      }
    }
  },
  methods: {
    click() {
      this.$store.dispatch('setSpace', {
        space: this.space,
        errorCallback: error => {
          this.$root.$refs.ErrorDialog.show(error);
        }
      });
    }
  }
};
</script>

<style scoped>
.space {
  background-color: whitesmoke;
  transition: 0.5s;
}

.space:hover {
  background-color: blanchedalmond;
}

.selectedSpace {
  background-color: gold;
}
</style>