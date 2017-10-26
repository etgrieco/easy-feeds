export const fetchFeeds = () => (
  $.ajax({
    type: "GET",
    url: "api/feeds"
  })
);

//creates (if non-existent) with rss_url and title
export const createFeed = (feed) => (
  $.ajax({
    type: "POST",
    url: "api/feeds",
    data: { feed }
  })
);
