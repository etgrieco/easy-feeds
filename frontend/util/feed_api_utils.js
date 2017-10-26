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

//creates (if non-existent) with rss_url and title
export const createFeed = (feed) => (
  $.ajax({
    type: "POST",
    url: "api/feeds",
    data: { feed }
  })
);

export const destroyFeed = (id) => (
  $.ajax({
    type: "DELETE",
    url: "api/feeds",
  })
);

const testFeed = {
rss_url: "http://feeds.bbci.co.uk/news/rss.xml",
title: "My BBC"
};
