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

export const updateSubscription = feed => (
  $.ajax({
    type: "PATCH",
    url: `api/subscriptions/${feed.id}`,
    data: { subscription: feed }
  })
);

export const createFeed = feed => (
  $.ajax({
    type: "POST",
    url: "api/subscriptions",
    data: { subscription: feed }
  })
);
