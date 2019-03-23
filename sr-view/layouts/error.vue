<template>
  <div class="container">
    <div v-if="error.statusCode === 404" class="mt-3">
      <h1> {{ $t('pageNotFound') }} </h1>
    </div>
    <div v-else class="mt-3">
      <h1> {{ $t('errorOccured') }} </h1>
      <h4> ErrorCode : {{ error.statusCode }} </h4>
      <h5> ErrorMessage : {{ error.message }} </h5>
    </div>
  </div>
</template>
<script>
export default {
  layout: 'default',
  props: {
    error: {
      type: Object,
      required: true,
      validator(obj) {
        return (
          typeof obj.message === 'string' && typeof obj.statusCode === 'number'
        );
      }
    }
  }
};
</script>
