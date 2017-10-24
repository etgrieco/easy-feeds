export const createUser = user => $.ajax({
  type: "POST",
  url: "api/users",
  data: { user }
});
