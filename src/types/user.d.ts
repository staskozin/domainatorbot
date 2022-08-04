declare interface IUser {
  id: number
  isAddingDomain: boolean
  isDeletingDomain: boolean
  async init()
  async setIsAddingDomain(isAddingDomain: boolean)
  async setIsDeletingDomain(isDeletingDomain: boolean)
  async reset()
}
