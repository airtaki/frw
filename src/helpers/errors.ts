interface Details {
  info?: string;
}

export class NotFoundError extends Error {
  statusCode: number;
  constructor(message: string) {
    super(message);
    this.statusCode = 404;
    this.name = 'NotFoundError';
    // We don't want to show the stack trace to the user
    this.stack = null;
  }
};

export class UnauthorizedError extends Error {
  statusCode: number;
  info?: string;
  constructor(message: string, details: Details) {
    super(message);
    this.statusCode = 401;
    this.name = 'UnauthorizedError';
    this.info = details.info ?? undefined;
    // We don't want to show the stack trace to the user
    this.stack = null;
  }
};

export class ValidationError extends Error {
  statusCode: number;
  validationErrors?: Object;
  constructor(message: string, errors: Object) {
    super(message);
    this.statusCode = 400;
    this.name = 'ValidationError';
    this.validationErrors = errors;
    // We don't want to show the stack trace to the user
    this.stack = null;
  }
};

export class UnprocessableEntityError extends Error {
  statusCode: number;
  constructor(message: string, errors: Object) {
    super(message);
    this.statusCode = 422;
    this.name = 'UnprocessableEntityError';
    // We don't want to show the stack trace to the user
    this.stack = null;
  }
};


