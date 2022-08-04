import db from '../lib/db.js'

class User implements IUser {
  id: number
  isAddingDomain: boolean
  isDeletingDomain: boolean

  constructor(userId: number) {
    this.id = userId
  }

  async init() {
    // Вытаскиваю данные о пользователе из БД, если его нет, то добавляю его
    let userInfo = (await db.query('SELECT * FROM public."user" WHERE user_id = $1', [this.id])).rows[0]
    if (!userInfo) {
      await db.query('INSERT INTO public."user" (user_id) VALUES ($1)', [this.id])
      userInfo = (await db.query('SELECT * FROM public."user" WHERE user_id = $1', [this.id])).rows[0]
    }

    this.isAddingDomain = userInfo.is_adding_domain
    this.isDeletingDomain = userInfo.is_deleting_domain
  }

  async setIsAddingDomain(isAddingDomain: boolean) {
    await db.query('UPDATE public."user" SET is_adding_domain = $1 WHERE user_id = $2', [isAddingDomain, this.id])
    this.isAddingDomain = isAddingDomain
  }

  async setIsDeletingDomain(isDeletingDomain: boolean) {
    await db.query('UPDATE public."user" SET is_deleting_domain = $1 WHERE user_id = $2', [isDeletingDomain, this.id])
    this.isDeletingDomain = isDeletingDomain
  }

  async reset() {
    await db.query('UPDATE public."user" SET is_adding_domain = false, is_deleting_domain = false WHERE user_id = $1', [this.id])
    await this.init()
  }
}

export default async function getUser(userId: number): Promise<User> {
  const user = new User(userId)
  await user.init()
  return user
}
