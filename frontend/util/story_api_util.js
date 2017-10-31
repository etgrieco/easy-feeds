export const fetchLatest = () => (
  $.ajax({
    type: "GET",
    url: "api/stories"
  })
);
