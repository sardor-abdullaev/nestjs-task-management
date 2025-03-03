import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TaskStatus } from './task-status.enum';
import { createTaskDTO } from './dto/create-task.dto';
import { GetTasksFilterDTO } from './dto/get-tasks-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { Task } from './task.entity';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) { }

  // @Get()
  // getTasks(@Query() filterDto: GetTasksFilterDTO): Task[] {
  //   // if we have any filters defined, call taskService.getTasksWithFilters
  //   // otherwise, just get all tasks
  //   if (Object.keys(filterDto).length) {
  //     return this.taskService.getTasksWithFilters(filterDto);
  //   } else {
  //     return this.taskService.getAllTasks();
  //   }
  // }

  @Get('/:id')
  getTaskById(@Param('id') id: string): Promise<Task> {
    return this.taskService.getTaskById(id);
  }

  // @Delete('/:id')
  // deleteTask(@Param('id') id: string): void {
  //   return this.taskService.deleteTask(id);
  // }

  // // @Patch('/:id/:field')
  // // updateTask(@Param('id') id:string,@Param('field') field:string):Task {
  // //   const property=@Body(field):string;
  // //   return this.taskService.updateTask(field,property)
  // // }

  // @Patch('/:id/status')
  // updateTaskStatus(
  //   @Param('id') id: string,
  //   @Body() updateTaskStatusDto: UpdateTaskStatusDto,
  // ): Task {
  //   const { status } = updateTaskStatusDto;
  //   return this.taskService.updateTaskStatus(id, status);
  // }

  @Post()
  //   createTask(@Body() body) {
  createTask(
    // @Body('title') title: string,
    // @Body('description') description: string,
    @Body() createTaskDTO: createTaskDTO,
  ): Promise<Task> {
    return this.taskService.createTask(createTaskDTO);
  }
}
