import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: "https://core.icash.silkinv.com/api",
  headers: {
    'Content-Type': 'application/json',
    'App-Authorizer': '647061697361',
    'Accept': 'application/json',
  },
  timeout: 30000,
  validateStatus: status => status < 400,
});

const axiosCall = async (requestOptions) => {
    console.log("adsfasfadsf = ", requestOptions.body);
  try {
    const response = await axiosInstance({
      method: 'POST',
      url: '/login',
      data: requestOptions.body,
    });
    if (response.status >= 200 && response.status < 400) {
      if(response.data) {
          return response.data
      }
    }
  } catch (error) {
      throw error
  }
};

export const unAuthAxiosCall = async (requestOptions) => {
    const response = await axiosCall(requestOptions);
    return response;
};
