<template>
  <div :class="spaceItem" class="m-1" @click="click()">
    <img
      class="m-1"
      :src="'data:image/png;base64, ' + space.image"
      width="30"
      height="30"
    />
    {{ space.name }}
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
  width: 46%;
  background-color: white;
  border-radius: 3px;
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.4);
}

.space-item:hover {
  width: 46%;
  background-color: blanchedalmond;
  border-radius: 3px;
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.4);
}

.selected-space-item {
  width: 46%;
  background-color: gold;
  border-radius: 3px;
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.4);
}
</style>
