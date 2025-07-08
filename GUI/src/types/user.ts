export interface User {
  id: string;
  userId: string;
  name: string;
  firstName: string;
  lastName: string;
  identificationNo: string;
}

export interface ApiUser extends User {
  createdAt: string;
  updatedAt: string;
}
