export const fetchFeeds = (q) => (
  $.ajax({
    type: "GET",
    url: "api/feeds",
    data: { q }
  })
);

// export const fetchFeed = (id) => (
//   $.ajax({
//     type: "GET",
//     url: `api/feeds/${id}`
//   })
// );
