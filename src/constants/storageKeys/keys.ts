const queryKeys = {
  AUTH: 'auth',
  GET_ACCESS_TOKEN: 'getAccessToken',
  GET_PROFILE: 'getProfile',
  TODOS: 'todos',
  TODOS_MEMBER: 'todosMember',
  TODOS_INDIVIDUAL: 'todosIndividual',
  TODOS_MY: 'todosMy',
} as const;

const storageKeys = {
  REFRESH_TOKEN: 'refreshToken',
  ACCESS_TOKEN: 'accessToken',
} as const;

export {queryKeys, storageKeys};
