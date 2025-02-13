export const logger = {
  info: (params: {message: string}) => {
    console.log(`INFO: ${params.message}`);
  },
  warn: (params: {message: string}) => {
    console.warn(`WARN: ${params.message}`);
  },
  error: (params: {message: string}) => {
    console.warn(`WARN: ${params.message}`);
  },
};
