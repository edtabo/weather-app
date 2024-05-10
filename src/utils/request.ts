import axios from 'axios';

interface Props {
  url: string;
};

export const request = async ({ url }: Props) => {
  try {
    const req = await axios.get(url);
    return req.data;
  } catch (error) {
    throw new Error('Something went wrong with the request');
  }
};
