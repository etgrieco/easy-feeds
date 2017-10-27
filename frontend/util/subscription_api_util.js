export const fetchSubscriptions = () => (
  $.ajax({
    type: "GET",
    url: "api/subscriptions"
  })
);


export const deleteSubscription = id => (
  $.ajax({
    type: "DELETE",
    url: `api/subscriptions/${id}`
  })
);

// creates feeds if one does not exist
// { newFeed: { rss_url: "www....", title: "my-title" } }
export const createSubscription = subscription => (
  $.ajax({
    type: "POST",
    url: "api/subscriptions",
    data: { subscription }
  })
);
