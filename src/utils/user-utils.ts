import {extend} from 'vee-validate'
import {required} from 'vee-validate/dist/rules'
import {nanoid} from 'nanoid'

export type User = {
  id: string,
  name: string,
  birth?: string,
  occupationId?: string,
  importance?: number,
}

export type Occupation = {
  value: string,
  text: string,
}

export const IMPORTANCE_ITEMS = [1, 2, 3]

extend(`required`, {...required, message: 'Поле обязательно для заполнения'})

extend(`cyrillic`, {
  message: `Только кирилица`,
  validate: (v) => /^[а-яё ]+$/i.test(v),
})

extend(`min_words`, {
  message: (_field: string, params: Record<string | number, any>) => `Минимум ${params[0]} слова`,
  validate: (v, params: Record<string | number, any>) => v?.split(` `).filter(Boolean).length >= params[0],
})

export const USER_NAME_RULES = {
  required: true,
  cyrillic: true,
  min_words: 2,
}

export const createUser = (): User => {
  return {
    id: nanoid(),
    name: ``,
    birth: undefined,
    occupationId: undefined,
    importance: generateImportance(),
  }
}

const NEW_USER_EMPTY_FIELDS = [`name`, `birth`, `occupationId`]

export const isNewUser = (user: User) => {
  return Object.keys(user).every((key) => !NEW_USER_EMPTY_FIELDS.includes(key) || !(user as any)[key])
}

export const generateImportance = () => {
  return Math.round(0.5 + Math.random() * 3)
}

export const cloneUser = (user: User, patch: Partial<User> = {}) => {
  return {...user, ...patch}
}
