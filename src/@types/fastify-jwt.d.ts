import "@fastify/jwt"

declare module "@fastify/jwt" {
  export interface FastifyJWT {
    user: {
      sub: string
      roles: {
        id: string
        id_profile: string
        permissions: string[]
      }
    }
  }
}
