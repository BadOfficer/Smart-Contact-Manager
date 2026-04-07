export interface AddressType {
  street: string
  suite: string
  city: string
}

export interface UserType {
  id: number
  name: string
  username: string
  email: string
  address: AddressType
}
