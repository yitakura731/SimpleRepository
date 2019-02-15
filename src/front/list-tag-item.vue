<template>
  <div>
    <!-- タグ名 -->
    <div v-b-toggle="'collapse-' + index" class="pl-2 tagClass my-0 py-2" @click="isOpen = !isOpen">
      <h6 class="my-0">
        <font-awesome-icon :icon="icon" class="ml-1 mr-2"/>
        {{tag.tagName}}
        <font-awesome-icon icon="tag" :style="style" class="tagColor ml-2"/>
      </h6>
    </div>
    <hr class="m-0">
    <!-- 文書リスト -->
    <b-collapse visible :id="'collapse-' + index">
      <div v-for="document in tag.docs" :key="document.docId">
        <list-doc-item :document="document"/>
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
  props : [
    'index',
    'tag'
  ],
  data() {
    return {
      isOpen : true,
    }
  },
  computed: {
    icon() {
      if (this.isOpen) {
        return "chevron-down";
      } else {
        return "chevron-right";
      }
    },
    style() {
      return { '--tagColor': this.tag.tagColor };
    },
  }
}
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
