export interface User {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  idCode: string;
}

export interface ApiUser extends User {
  createdAt: string;
  updatedAt: string;
  deleted: boolean;
}
