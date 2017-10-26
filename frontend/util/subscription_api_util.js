export const destroySubscription = (id) => (
  $.ajax({
    type: "DELETE",
    url: `api/feeds/${id}`
  })
);

// creates feeds if one does not exist
// { newFeed: { rss_url: "www....", title: "my-title" } }
export const createSubscription = ( subscription ) => (
  $.ajax({
    type: "POST",
    url: "api/feeds",
    data: { subscription }
  })
);
