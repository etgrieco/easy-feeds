export const fetchLatest = offset => (
  $.ajax({
    type: "GET",
    url: "api/stories",
    data: {
      offset
    }
  })
);

export const fetchStory = id => (
  $.ajax({
    type: "GET",
    url: `api/stories/${id}`
  })
);
