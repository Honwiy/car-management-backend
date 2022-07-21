import { IsNotEmpty } from 'class-validator'

export class LoginUserDto {

  @IsNotEmpty()
  readonly Email: string

  @IsNotEmpty()
  readonly Password: string
}
