import api from './api';
import { Application } from '../types';

export default async function postApplication(application: Application) {
  const { data } = await api.post<Application>(
    `participants/application`,
    application
  );
  return data;
}
