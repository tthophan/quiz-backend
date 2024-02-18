export type ExceptionType = keyof typeof ExceptionMessages;

export const ExceptionMessages = {
  SUCCESS: {
    message: 'Request processed successfully.',
  },
  UNAUTHORIZED: {
    message:
      'Unauthorized. The client must authenticate itself to get the requested response',
  },
  ACCESS_DENIED: {
    message:
      'Forbidden. The client does not have access rights to the content, or directory listing is denied.',
  },
  NOT_FOUND: {
    message: 'Not Found. The server cannot find the requested resource.',
  },
  CONFLICT: {
    message:
      'Conflict. This response is sent when a request conflicts with the current state of the server. Could be used for duplicate requests.',
  },
  INTERNAL_SERVER: {
    message:
      "Internal Server Error. The server has encountered a situation it doesn't know how to handle.",
  },
  INVALID_DATA: {
    message: 'Invalid request. One or several input parameters are invalid.',
  },
  QUIZ_NOT_FOUND: {
    message: 'Can not find Quiz',
  },
  AUTH_PHONE_NUMBER_EXISTS: {
    message: 'Phone number already exists',
  },
  AUTH_WRONG_PASSWORD: {
    message: 'Username or password incorrect',
  },
  QUIZ_ANSWERED: {
    message: 'previously answered quizzes.',
  },
};
