import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TodoEntity } from '../../Todo';

@Controller('todo')
export class TodoController {
  constructor(
    @InjectRepository(TodoEntity)
    private readonly todoRepository: Repository<TodoEntity>,
  ) {}

  @Get()
  async findAll(): Promise<TodoEntity[]> {
    return await this.todoRepository.find();
  }

  @Get(':id')
  async findOne(@Param('id') id: any): Promise<TodoEntity> {
    return await this.todoRepository.findOne(id);
  }

  @Post()
  async create(@Body() todo: TodoEntity): Promise<TodoEntity> {
    return await this.todoRepository.save(todo);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() todo: TodoEntity,
  ): Promise<TodoEntity> {
    todo.id = id;
    return await this.todoRepository.save(todo);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    await this.todoRepository.delete(id);
  }
}
