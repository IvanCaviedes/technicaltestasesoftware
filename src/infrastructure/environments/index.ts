export function setEnvironment() {
  switch (process.env.NODE_ENV) {
    case 'development':
      return ['.env.development', '.env'];
    case 'production':
    default:
      return '.env';
  }
}
