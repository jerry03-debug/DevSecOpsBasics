import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    findAll() {
        return this.userService.findAll();
    }

    @Post()
    create(@Body() createUserDto: CreateUserDto) {
        return this.userService.create(createUserDto);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.userService.findOne(Number(id));
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updateUserDto: Partial<CreateUserDto>) {
        return this.userService.update(Number(id), updateUserDto);
    }

    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.userService.delete(Number(id));
    }
}
