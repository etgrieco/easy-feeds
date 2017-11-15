// gives subscriptions, feeds, & most-recent stories
export const fetchSingleFeed = (feedId, offset = 0) => (
  $.ajax({
    type: "GET",
    url: `api/subscriptions/${feedId}`,
    data: {
      offset
    }
  })
);

// gives subscriptions & feeds
export const fetchAllSubscriptions = () => (
  $.ajax({
    type: "GET",
    url: `api/subscriptions/`
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

export const createFeed = feed => (
  $.ajax({
    type: "POST",
    url: "api/subscriptions",
    data: { subscription: feed }
  })
);
