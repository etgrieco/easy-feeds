export const signup = (user) => {
  return $.ajax({
    type: 'POST',
    url: "/api/users",
    data: { user }
  });
};

export const login = (user) => (
  $.ajax({
    type: 'POST',
    url: 'api/session',
    data: { user },
  })
);

export const logout = () => (
  $.ajax({
    type: 'DELETE',
    url: '/api/session'
  })
);

export const fetchSubscriptions = () => {
  return $.ajax({
    type: 'GET',
    url: "/api/subscriptions",
  });
};
