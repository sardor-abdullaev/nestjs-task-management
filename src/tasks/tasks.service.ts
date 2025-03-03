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

  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>) { }

  async getTasks(filterDto: GetTasksFilterDTO): Promise<Task[]> {
    const { status, search } = filterDto;
    const query = this.tasksRepository.createQueryBuilder('task');

    if (status) {
      query.andWhere('task.status = :status', { status })
    }

    if (search) {
      query.andWhere('LOWER(task.title) LIKE LOWER(:search) or LOWER(task.description) LIKE LOWER(:search)', { search: `%${search}%` })
    }

    const tasks = await query.getMany();
    return tasks;
  }

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
    // console.log(found);

    if (!found) {
      throw new NotFoundException(`Task with ID ${id} not found.`)
    }
    return found;
  }

  async deleteTask(id: string): Promise<void> {
    const deleted = await this.tasksRepository.delete(id)
    if (deleted.affected == 0) {
      throw new NotFoundException(`Task with ID ${id} not found.`)
    }
  }

  async updateTaskStatus(id: string, status: TaskStatus): Promise<Task> {
    const task = await this.getTaskById(id);

    task.status = status;
    await this.tasksRepository.save(task);
    return task;
  }
}
