export const CLEAR_SESSION_ERRORS = "CLEAR_SESSION_ERRORS";
export const CLEAR_ERRORS = "CLEAR_ERRORS";

export const clearSessionErrors = () => ({
  type: CLEAR_SESSION_ERRORS
});

export const clearErrors = () => ({
  type: CLEAR_ERRORS
});
