export type User = {
  id: string,
  name?: string,
  birth?: string,
  occupationId?: string,
}

export const isNewUser = (user: User) => {
  return Object.keys(user).every((key) => key === `id` || !(user as any)[key])
}
