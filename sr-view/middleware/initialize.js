export default async function({ store, error }) {
  await store.dispatch('fetchTag').catch(e => {
    error(e);
  });
  await store.dispatch('fetchSpace').catch(e => {
    error(e);
  });
}
