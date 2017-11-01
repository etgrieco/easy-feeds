export const fetchFeedResults = (q) => (
  $.ajax({
    type: "GET",
    url: "api/feeds",
    data: { q }
  })
);

export const fetchSingleUnsubscribedFeed = (feedId) => (
  $.ajax({
    type: "GET",
    url: `api/feeds/${feedId}`,
  })
);
