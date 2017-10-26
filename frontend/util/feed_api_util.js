export const fetchFeeds = () => (
  $.ajax({
    type: "GET",
    url: "api/feeds"
  })
);

export const fetchFeed = (id) => (
  $.ajax({
    type: "GET",
    url: `api/feeds/${id}`
  })
);
