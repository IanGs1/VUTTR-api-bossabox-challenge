import "@fastify/jwt"

declare module "@fastift/jwt" {
  export interface FastifyJWT {
    user: {
      sub: string,
    }
  }
}