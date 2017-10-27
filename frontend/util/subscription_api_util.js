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

export const updateSubscription = subscription => (
  $.ajax({
    type: "PATCH",
    url: `api/subscriptions/${subscription.id}`,
    data: { subscription }
  })
);

// creates feeds if one does not exist
// { newFeed: { rss_url: "www....", title: "my-title" } }
export const createFeed = subscription => (
  $.ajax({
    type: "POST",
    url: "api/subscriptions",
    data: { subscription }
  })
);
