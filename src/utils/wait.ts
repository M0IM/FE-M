export const wait = (timeout: any) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};
