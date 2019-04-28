<template>
  <div>
    <div :class="spaceClass" @click="click()">
      <p class="my-1">
        <img
          class="m-1"
          :src="'data:image/png;base64, ' + space.image"
          width="40"
          height="40"
        />
        {{ space.name }}
      </p>
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
    spaceClass() {
      let retVal = null;
      const current = this.$store.state.repository.selectedSpace;
      if (current != null && current === this.space.id) {
        retVal = 'selectedSpace';
      } else {
        retVal = 'space';
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
