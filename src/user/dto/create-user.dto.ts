import { IsString, IsEmail, Length } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @Length(2, 50)
  name: string; // Le nom de l'utilisateur (entre 2 et 50 caractères)

  @IsEmail()
  email: string; // L'e-mail doit être au format valide

  @IsString()
  @Length(8, 20)
  password: string; // Le mot de passe doit être entre 8 et 20 caractères
}
