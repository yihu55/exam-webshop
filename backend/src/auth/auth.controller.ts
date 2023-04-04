import {
  Controller,
  Request,
  Get,
  Post,
  Body,
  UseGuards,
  Patch,
  NotFoundException,
  Param,
} from '@nestjs/common';
import { CreateUserDTO } from 'src/user/dtos/create-user.dto';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local.guard';
import { JwtAuthGuard } from './guards/jwt.guard';
import { Roles } from './decorators/roles.decorator';
import { Role } from './enums/role.enum';
import { RolesGuard } from './guards/roles.guard';
import { GetCurrentUserById } from 'src/utils/get-user-by-id.decorator';
import { AppService } from '../app.service';
import { User } from 'src/user/schemas/user.schema';
import { GetCurrentUsersId } from 'src/utils/get-user-id.decorator';
import { UpdateUserDTO } from 'src/user/dtos/update-user.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Post('/register')
  async register(@Body() createUserDTO: CreateUserDTO) {
    const user = await this.userService.addUser(createUserDTO);
    return user;
  }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  // @UseGuards(JwtAuthGuard)
  // //, RolesGuard)
  // // @Roles(Role.User)
  // @Get('/profile')
  // getCurrentUserProfile(@GetCurrentUserById() userId: string) {
  //   return userId;
  // }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.User)
  @Get('/profile')
  async getCurrentUserProfile(@GetCurrentUsersId() userId: string) {
    const user = await this.userService.findUserById(userId);
    return user;
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.User)
  @Get('/currentuserid')
  getDashboard(@GetCurrentUsersId() userId: string) {
    return userId;
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/update')
  async updateProfile(
    // @Param('id') _id: string,
    @GetCurrentUsersId() userId: string,
    @Body() updateUserDTO: UpdateUserDTO,
  ) {
    const user = await this.userService.updateUserProfile(
      userId,
      updateUserDTO,
    );

    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Get('/admin')
  getTheDashboard(@Request() req) {
    return req.user;
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Get('/admin/all-users')
  async getAllUsers() {
    const users = await this.userService.getAllUsers();
    return users;
  }
}
