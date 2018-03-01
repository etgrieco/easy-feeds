export const fetchFeedResults = q => (
  $.ajax({
    type: "GET",
    url: "api/feeds",
    data: { q }
  })
);

export const fetchUnsubscribedFeed = feedId => (
  $.ajax({
    type: "GET",
    url: `api/feeds/${feedId}`,
  })
);
