let message: unknown;
let baseMessage: string;

message = 'Hello!';

if (typeof message === 'string') {
  baseMessage = message;
}


function error(message: string, code: number): never {
  throw {message, code}
  // for (;;) {} - infinite loop
  // while(true) {}  - infinite loop
}
