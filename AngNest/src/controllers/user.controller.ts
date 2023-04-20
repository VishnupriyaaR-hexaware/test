import {
    Body,
    Controller,
    Delete,
    Get,
    NotFoundException,
    Param,
    Patch,
    Post,
    Put,
  } from "@nestjs/common";
  import { User } from "../entities/user.entity";
  import { UserService } from "../services/user.service";
  

  @Controller("/user")
  export class UserController {
    constructor(private userService: UserService) {}
  
    @Get()
    findAll() {
      return this.userService.findAll();
    }
  
    @Get("/:id")
    async findById(@Param("id") id: string) {
      const user = await this.userService.findById(id);
  
      if (!user) throw new NotFoundException("User not found");
  
      return user;
    }
  
    @Post()
    create(@Body() user: User) {
      return this.userService.create(user);
    }
  
    @Put("/:id")
    async update(@Param("id") id: string, @Body() user: User) {
      const receivedUser = await this.userService.update(id, user);
  
      if (!receivedUser) throw new NotFoundException("User not found");
  
      return receivedUser;
    }
  
    @Delete("/:id")
    async delete(@Param("id") id: string) {
      const receivedUser = await this.userService.delete(id);
  
      if (!receivedUser) throw new NotFoundException("User not found");
  
      return receivedUser;
    }
  }
  