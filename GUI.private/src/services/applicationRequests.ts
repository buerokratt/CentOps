import api from './api';
import { ApplicationRequest } from '../types';

export async function getApplicationRequests() {
  const { data } = await api.get<ApplicationRequest[]>(
    `admin/participants/applications`
  );
  return data;
}
