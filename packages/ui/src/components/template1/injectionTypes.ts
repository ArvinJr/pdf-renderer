export interface Invoice {
  no: string
  date: string
}

export interface Client {
  name: string
  phone: number
  email: string
  address: string
}

export interface Details {
  name: string
  invoice: Invoice
  client: Client
}

export interface Header {
  logo?: string
  details?: Details
}

export interface Body {
  description: string
  price: number
  quantity: number
}

export interface Footer {
  name: string
  address: string
  website: string
  email: string
  phone: number
}

export interface Template1Type {
  header?: Header
  body: Body[]
  note?: string
  footer?: Footer
}
