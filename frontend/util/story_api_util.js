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

export const readStory = id => (
  $.ajax({
    type: "POST",
    url: "api/reads",
    data: { read: { story_id: id }}
  })
);

export const unreadStory = id => (
  $.ajax({
    type: "DELETE",
     url: `api/reads/${id}`,
  })
);
