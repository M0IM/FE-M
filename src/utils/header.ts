import axiosInstance from 'apis/axiosInstance.ts';

function setHeader(key: string, value: string) {
  console.log(key, value);
  axiosInstance.defaults.headers.common[key] = value;
}

function removeHeader(key: string) {
  if (!axiosInstance.defaults.headers.common[key]) {
    return;
  }
  console.log(key);

  delete axiosInstance.defaults.headers.common[key];
}

export {setHeader, removeHeader};
