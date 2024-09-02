export interface User {
  name: string
  email: string
  login: string
  id: string
  $type: string
}

export interface Issue {
  summary: string
  customFields: CustomField[]
  id: string
  $type: string
}

export interface CustomField {
  value: Value[]
  name: string
  $type: string
}

export interface Value {
  name: string
  $type: string
}
