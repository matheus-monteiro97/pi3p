import {
    Controller,
    Post,
    Body,
    Param,
    Get,
    Patch,
    Delete,
    UseGuards,
  } from '@nestjs/common';
  import { UserService } from './user.service';
  import { CreateUserDto } from './dto/user.dto';
  import { UpdateUserDto } from './dto/user.updateDto';
  import { JwtAuthGuard } from 'src/auth/jwt.guards';
  import { RolesGuard } from 'src/guards/roles.guard';
  import { Role } from 'src/decorators/role.decorator';
  
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Controller('users')
  export class UserController {
    constructor(private readonly userService: UserService) {}
  
    @Post()
    @Role('ADMIN')
    async create(@Body() dto: CreateUserDto) {
      return this.userService.create(dto);
    }
  
    @Patch(':id')
    @Role('ADMIN')
    async update(@Param('id') id: string, @Body() dto: UpdateUserDto) {
      return this.userService.update(id, dto);
    }
  
    @Delete(':id')
    @Role('ADMIN')
    async delete(@Param('id') id: string) {
      return this.userService.delete(id);
    }
  
    @Get()
    @Role('ADMIN')
    async getAll() {
      return this.userService.getAll();
    }
  
    @Get(':id')
    @Role('ADMIN')
    async getById(@Param('id') id: string) {
      return this.userService.getById(id);
    }
  }
  