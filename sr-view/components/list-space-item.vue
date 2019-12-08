<template>
  <div :class="spaceItem" @click="click()">
    <p class="my-1">
      <img
        class="m-1"
        :src="'data:image/png;base64, ' + space.image"
        width="30"
        height="30"
      />
      {{ space.name }}
    </p>
  </div>
</template>

<script>
export default {
  props: {
    space: {
      required: true,
      validator(obj) {
        return typeof obj.id === 'string' && typeof obj.name === 'string';
      }
    }
  },
  computed: {
    spaceItem() {
      let retVal = null;
      const current = this.$store.state.repository.selectedSpace;
      if (current != null && current.id === this.space.id) {
        retVal = 'selected-space-item';
      } else {
        retVal = 'space-item';
      }
      return retVal;
    }
  },
  methods: {
    click() {
      this.$store
        .dispatch('repository/setSpace', { space: this.space })
        .catch(error => {
          this.$nuxt.$emit('showError', error);
        });
    }
  }
};
</script>

<style scoped>
.space-item {
  background-color: whitesmoke;
  transition: 0.5s;
}

.space-item:hover {
  background-color: blanchedalmond;
}

.selected-space-item {
  background-color: gold;
}
</style>
