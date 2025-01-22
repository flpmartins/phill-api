interface IProfileProps {
  id: string
  description: string
  permissions: string[]
}

export interface IUser {
  id: string
  name: string
  email: string
  avatar: string | null
  phone: string
  cpf: string
  id_profile: string
  password?: string | null
  profile?: IProfileProps
}
