/*import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { AppService } from './app.service';

@Controller('users')
export class AppController {
  constructor(private readonly appService: AppService) {}

  // GET /users
  @Get()
  getUsers() {
    return this.appService.getUsers();
  }

  // GET /users/:id
  @Get(':id')
  getUserById(@Param('id') id: string) {
    return this.appService.getUserById(Number(id));
  }

  // POST /users
  @Post()
  createUser(@Body() body: { name: string; email: string }) {
    return this.appService.createUser(body.name, body.email);
  }

  // PATCH /users/:id
  @Patch(':id')
  updateUser(
    @Param('id') id: string,
    @Body() body: { name?: string; email?: string },
  ) {
    return this.appService.updateUser(
      Number(id),
      body.name,
      body.email,
    );
  }

  // DELETE /users/:id
  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this.appService.deleteUser(Number(id));
  }
}
@Controller ('info')
export class InfoController {
  constructor(private readonly appService: AppService) {}

  // GET /info
  @Get()
  getInfo() {
    return this.appService.getInfo();
  }
}*/