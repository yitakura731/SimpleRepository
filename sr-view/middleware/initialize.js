export default async function({ store, error }) {
  await store.dispatch('repository/fetchTag').catch(e => {
    error(e);
  });
  await store.dispatch('repository/fetchSpace').catch(e => {
    error(e);
  });
}
