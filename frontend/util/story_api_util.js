export const fetchLatest = () => (
  $.ajax({
    type: "GET",
    url: "api/stories"
  })
);

export const fetchStory = id => (
  $.ajax({
    type: "GET",
    url: `api/stories/${id}`
  })
);
