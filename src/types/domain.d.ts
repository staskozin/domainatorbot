declare type Domain = {
  domain_name: string
  registrar?: string
  expires?: Date
  deletion?: Date
}

declare interface DomainSource {
  async getDomain(name: string): Domain | null
}

declare interface DomainStorage {
  async setDomain(domain: Domain): void
}
