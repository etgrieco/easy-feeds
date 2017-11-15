export const signup = (user) => {
  return $.ajax({
    type: 'POST',
    url: "/api/users",
    data: { user }
  });
};

export const createDemoUser = () => (
  $.ajax({
    type: 'POST',
    url: "/api/users",
    data: {
      user: {
        email: `demo-user-${Math.floor(Math.random() * 1000000)}@demo.com`,
        first_name: "Demo",
        last_name: "User",
        password: `${Math.floor(Math.random() * 1000000)}`
      }
    }
  })
);

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
