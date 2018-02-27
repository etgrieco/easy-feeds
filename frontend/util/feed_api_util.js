export const fetchFeedResults = query => (
  $.ajax({
    type: "GET",
    url: "api/feeds",
    data: { query }
  })
);

export const fetchUnsubscribedFeed = feedId => (
  $.ajax({
    type: "GET",
    url: `api/feeds/${feedId}`,
  })
);
