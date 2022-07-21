import { IsNotEmpty } from 'class-validator'

export class CreateUserDto {

  @IsNotEmpty()
  readonly Username: string

  @IsNotEmpty()
  readonly Email: string

  @IsNotEmpty()
  readonly Password: string

  @IsNotEmpty()
  readonly Mobile: string
}
