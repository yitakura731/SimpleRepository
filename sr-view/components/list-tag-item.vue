<template>
  <div>
    <div
      v-b-toggle="'collapse-' + index"
      class="pl-2 tagClass my-0 py-2"
      @click="isOpen = !isOpen"
    >
      <h6 class="my-0">
        <font-awesome-icon :icon="icon" class="ml-1 mr-2" />
        {{ tag.name }}
        <font-awesome-icon icon="tag" :style="style" class="tagColor ml-2" />
      </h6>
    </div>
    <hr class="m-0" />
    <b-collapse :id="'collapse-' + index" visible>
      <div v-for="document in docs" :key="document.id">
        <list-doc-item :document="document" />
      </div>
    </b-collapse>
  </div>
</template>

<script>
import ListDocItem from './list-doc-item.vue';

export default {
  components: {
    'list-doc-item': ListDocItem
  },
  props: {
    index: {
      type: Number,
      required: true
    },
    tag: {
      type: Object,
      required: true,
      validator(obj) {
        return (
          typeof obj.id === 'string' &&
          typeof obj.name === 'string' &&
          typeof obj.color === 'string'
        );
      }
    },
    docs: {
      type: Array,
      required: true,
      validator(obj) {
        return typeof Array.isArray(obj);
      }
    }
  },
  data() {
    return {
      isOpen: true
    };
  },
  computed: {
    icon() {
      if (this.isOpen) {
        return 'chevron-down';
      } else {
        return 'chevron-right';
      }
    },
    style() {
      return { '--tagColor': this.tag.color };
    }
  }
};
</script>

<style scoped>
.tagColor {
  --tagColor: black;
  color: var(--tagColor);
}

.tagClass {
  background-color: white;
  transition: 0.5s;
}
.tagClass:hover {
  background-color: blanchedalmond;
}
</style>
