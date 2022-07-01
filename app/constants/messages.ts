export const successful = {
  CREATED: 'Created Successfully',
  UPDATED: 'Updated Successfully',
  FOUNDED: 'Founded Successfully',
  LISTED: 'Listed Successfully',
  QUALIFIED: 'Qualify Successfully',
  DESTROY: 'Destroy Successfully'
};

export const error = {
  FAIL: 'Server Fail',
  EMPTY: 'Cannot be empty',
  INVALID_EMAIL: 'Invalid format',
  INVALID_DOMAIN: 'Invalid domain',
  INVALID_SCORE: 'Invalid score',
  PASSWORD_LONG: 'Should be at least 8 chars long',
  PASSWORD_ALPHA: 'Should be alphanumeric',
  EMAIL_DUPLICATE: 'Already in use',
  WRONG: 'Wrong parameters',
  WRONG_PARAMS: 'Wrong email or password',
  NOT_CREATED: 'Cannot be created',
  NOT_TOKEN: 'Token was not supplied',
  NOT_AUTH: 'Unauthorized resources'
};

export default {
  successful,
  error
};
