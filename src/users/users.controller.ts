import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './users.dto';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from './users.service';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UseGuards(AuthGuard())
  async create(@Body() createUserDto: CreateUserDto) {
    // yeild this.authService.signIn(createUserDto);
    return 'This action adds a new cat a ';
  }

  @Get()
  @UseGuards(AuthGuard())
  async findAll(@Query() query) {
    return `This action returns all cats (limit: ${query.limit} items)`;
  }

  @Get(':id')
  @UseGuards(AuthGuard())
  async findOne(@Param('id') id) {
    return `This action returns a #${id} cat`;
  }

  @Put(':id')
  @UseGuards(AuthGuard())
  async update(@Param('id') id, @Body() updateCatDto: UpdateUserDto) {
    return `This action updates a #${id} cat`;
  }

  @Delete(':id')
  @UseGuards(AuthGuard())
  async remove(@Param('id') id) {
    return `This action removes a #${id} cat`;
  }
}
