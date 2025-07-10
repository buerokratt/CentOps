export const userName = <T extends { firstName: string; lastName: string }>(
  o: T
) => `${o.firstName} ${o.lastName}`;
