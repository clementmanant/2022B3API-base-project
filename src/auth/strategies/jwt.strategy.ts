import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), 
      secretOrKey: 'SECRET', // TODO: Move to .env
      ignoreExpiration: false
    });
  }

  async validate(payload: {sub, email, role}) {
    return {
      id: payload.sub,
      email: payload.email,
      role: payload.role
    }
  }
}
