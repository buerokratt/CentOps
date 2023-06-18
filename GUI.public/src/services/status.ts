import axios from 'axios';
import { getApplicationStatus } from '../resources/api-constants';

export const getStatus = async (uuid?: string) => {
  if (!uuid) {
    return;
  }
  const { data } = await axios.get(getApplicationStatus(uuid));
  return data;
};
