import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    findAll(): Promise<User[]> {
        return this.userRepository.find();
    }

    create(user: Partial<User>): Promise<User> {
        const newUser = this.userRepository.create(user);
        return this.userRepository.save(newUser);
    }

    findOne(id: number): Promise<User> {
        return this.userRepository.findOne({ where: { id } });
    }

    async update(id: number, user: Partial<User>): Promise<User> {
        await this.userRepository.update(id, user);
        return this.findOne(id);
    }

    async delete(id: number): Promise<boolean> {
        const result = await this.userRepository.delete(id);
        return result.affected > 0;
    }
}
