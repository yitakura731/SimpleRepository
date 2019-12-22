<template>
  <b-input
    v-model="input"
    type="text"
    size="sm"
    placeholder="search…"
    @keydown.enter="search"
  />
</template>

<script>
export default {
  data() {
    return {
      input: null
    };
  },
  methods: {
    search() {
      const space = this.$store.state.repository.selectedSpace;
      if (space != null) {
        this.$store
          .dispatch('repository/fetchDocument', {
            spaceId: space.id,
            query: this.input
          })
          .catch(error => {
            this.$nuxt.$emit('showError', error);
          });
      }
    }
  }
};
</script>
