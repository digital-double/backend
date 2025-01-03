jest.mock('../utils/StatusError', () => {
    return jest.fn().mockImplementation((message, status) => {
      const error = new Error(message);
      error.status = status;
      return error;
    });
  });