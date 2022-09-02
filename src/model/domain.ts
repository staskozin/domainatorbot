import fetch from 'node-fetch'

import db from '../lib/db.js'

export default class Domains {
  // Получить актуальную информацию о домене
  static async getDomain(query: string): Promise<Domain | null> {
    const response = await (await fetch(`http://api.whois.vu/?q=${query}`)).json() as WhoisResponse
    if (response.available === 'no' && response.registrar !== undefined && response.expires !== undefined) {
      return {
        name: response.domain,
        registrar: response.registrar,
        expires: new Date(response.expires * 1000)
      }
    }
    return null
  }
  
  // Получить информацию о домене из БД
  static async getSavedDomain(name: string): Promise<Domain | null> {
    const data = (await db.query('SELECT domain_name AS "name", registrar, expires FROM domain WHERE domain_name = $1', [name])).rows[0] as Domain
    if (!data) return null
    return data
  }
  
  // Сохранить домен в БД
  static async createDomain(query: string): Promise<Domain | null> {
    throw new Error('Method not implemented')
  }

  static async updateDomain(query: string): Promise<Domain | null> {
    throw new Error('Method not implemented')
  }

  static async deleteDomain(query: string): Promise<Domain | null> {
    throw new Error('Method not implemented')
  }

  // TODO: Добавить домен пользователю
  // TODO: Получить все домены пользователя
  // TODO: Обновить информацию обо всех доменах пользователя
  // TODO: 
}

type WhoisResponse = {
  available: string
  domain: string
  registrar?: string
  expires?: number
}

type Domain = {
  name: string
  registrar: string
  expires: Date
}
