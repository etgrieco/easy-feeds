export const fetchFeedResults = (q) => (
  $.ajax({
    type: "GET",
    url: "api/feeds",
    data: { q }
  })
);
