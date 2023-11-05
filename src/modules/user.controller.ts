import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from 'src/schemas/user.schema';
import { UserDto } from 'src/dto/user.dto';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getUsers(): Promise<User[]> {
    return this.userService.getUsers();
  }

  @Post('/signup')
  signup(@Body() user: UserDto): Promise<User> {
    return this.userService.createUser(user);
  }

  @Post('/login')
  login(@Body() user: UserDto): Promise<User> {
    return this.userService.login(user);
  }

  @Delete(':id')
  deleteById(@Param('id') id: string): Promise<User> {
    return this.userService.deleteUserById(id);
  }
}
