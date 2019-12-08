<template>
  <div class="space-item-wrapper my-1">
    <div v-if="space.dispType === 'real'">
      <div :class="spaceItem" @click="click()">
        <img
          class="m-1"
          :src="'data:image/png;base64, ' + space.image"
          width="30"
          height="30"
        />
        {{ space.name }}
      </div>
    </div>
    <div v-if="space.dispType === 'dummy'">
      <div class="dummy-item" />
    </div>
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
.dummy-item {
  background-color: rgba(0, 0, 0, 0);
}

.space-item-wrapper {
  width: 48%;
}

.space-item {
  background-color: white;
  border-radius: 3px;
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.4);
}

.space-item:hover {
  background-color: blanchedalmond;
  border-radius: 3px;
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.4);
}

.selected-space-item {
  background-color: gold;
  border-radius: 3px;
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.4);
}
</style>
