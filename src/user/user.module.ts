import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './user.entity';

@Module({
    imports: [TypeOrmModule.forFeature([User])], // Associe l'entité à TypeORM
    providers: [UserService],
    controllers: [UserController],
    exports: [UserService], // Rendre UserService accessible
})
export class UserModule {}
