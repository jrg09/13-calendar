export const testUser = {
  name: "jrg",
  email: "jorge@mail.es",
  password: "jorge1",
  uid: "abc123",
};

export const initialState = {
  status: "checking", //checking, authenticated, not-authenticated
  user: {},
  errorMessage: undefined,
};

export const authenticatedState = {
  status: "authenticated", //checking, authenticated, not-authenticated
  user: testUser,
  errorMessage: undefined,
};

export const notAuthenticatedState = {
  status: "not-authenticated", //checking, authenticated, not-authenticated
  user: {},
  errorMessage: undefined,
};
