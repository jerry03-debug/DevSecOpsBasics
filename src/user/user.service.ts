import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    findAll(): Promise<User[]> {
        return this.userRepository.find();
    }

    async create(user: Partial<User>): Promise<User> {
        const salt = await bcrypt.genSalt();
        user.password = await bcrypt.hash(user.password, salt);
        const newUser = this.userRepository.create(user);
        return this.userRepository.save(newUser);
    }

    findOne(id: number): Promise<User> {
        return this.userRepository.findOne({ where: { id } });
    }

    async findOneByEmail(email: string): Promise<User | undefined> {
        return this.userRepository.findOne({ where: { email } });
    }

    async update(id: number, user: Partial<User>): Promise<User> {
        // Vérification de l'existence de l'utilisateur
        const existingUser = await this.findOne(id);
        if (!existingUser) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }
    
        // Si le mot de passe est présent dans les données à mettre à jour, on le crypte
        if (user.password) {
            const salt = await bcrypt.genSalt();
            user.password = await bcrypt.hash(user.password, salt);
        }
    
        await this.userRepository.update(id, user);
        return this.findOne(id);
    }
    

    async delete(id: number): Promise<boolean> {
        // Vérification de l'existence de l'utilisateur
        const existingUser = await this.findOne(id);
        if (!existingUser) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }
        const result = await this.userRepository.delete(id);
        return result.affected > 0;
    }
}
