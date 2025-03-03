import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
// import { v4 as uuid } from 'uuid';
import { createTaskDTO } from './dto/create-task.dto';
import { GetTasksFilterDTO } from './dto/get-tasks-filter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TasksService {
  // private tasks: Task[] = [];
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>) { }

  // getAllTasks(): Task[] {
  //   return this.tasks;
  // }

  // getTasksWithFilters(filterDto: GetTasksFilterDTO): Task[] {
  //   const { status, search } = filterDto;
  //   // console.log(status, search);

  //   // define a temporary array to hold the result
  //   let tasks = this.getAllTasks();

  //   // do smt with status
  //   if (status) {
  //     tasks = tasks.filter((task) => task.status == status);
  //   }

  //   // do smt with search
  //   if (search) {
  //     tasks = tasks.filter((task) => {
  //       if (task.title.includes(search) || task.description.includes(search)) {
  //         return true;
  //       }
  //       return false;
  //     });
  //   }

  //   // return final result
  //   return tasks;
  // }

  async createTask(createTaskDTO: createTaskDTO): Promise<Task> {
    const { title, description } = createTaskDTO;
    const task = this.tasksRepository.create({
      title,
      description,
      status: TaskStatus.OPEN
    })

    await this.tasksRepository.save(task);
    return task;
  }

  async getTaskById(id: string): Promise<Task> {
    const found = await this.tasksRepository.findOneBy({ id });
    console.log(found);

    if (!found) {
      throw new NotFoundException(`Task with ID ${id} not found.`)
    }
    return found;
  }

  // deleteTask(id: string): void {
  //   const found = this.getTaskById(id);
  //   this.tasks = this.tasks.filter((task) => task.id !== found.id);
  // }

  // // updateTask(field: string, property: string): Task {
  // //   this.tasks[field] = property;
  // //   return this.tasks[field]
  // // }
  // updateTaskStatus(id: string, status: TaskStatus) {
  //   const task = this.getTaskById(id);
  //   task.status = status;
  //   return task;
  // }
}
