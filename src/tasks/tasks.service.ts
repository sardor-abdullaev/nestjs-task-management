import { Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
// import { v4 as uuid } from 'uuid';
import { createTaskDTO } from './dto/create-task.dto';
import { GetTasksFilterDTO } from './dto/get-tasks-filter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { Repository } from 'typeorm';
import { User } from '../auth/user.entity';

@Injectable()
export class TasksService {
  private logger = new Logger('TasksService', { timestamp: true });

  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>) { }

  async getTasks(filterDto: GetTasksFilterDTO, user: User): Promise<Task[]> {
    const { status, search } = filterDto;

    const query = this.tasksRepository.createQueryBuilder('task');
    query.where({ user });

    if (status) {
      query.andWhere('task.status = :status', { status })
    }

    if (search) {
      query.andWhere('(LOWER(task.title) LIKE LOWER(:search) or LOWER(task.description) LIKE LOWER(:search))', { search: `%${search}%` })
    }
    try {
      const tasks = await query.getMany();
      return tasks;
    } catch (error) {
      this.logger.error(`Failed to get tasks for user '${user.username}'. Filters: ${JSON.stringify(filterDto)}`, error.stack);
      throw new InternalServerErrorException();
    }
  }

  async createTask(createTaskDTO: createTaskDTO, user: User): Promise<Task> {
    const { title, description } = createTaskDTO;
    const task = this.tasksRepository.create({
      title,
      description,
      status: TaskStatus.OPEN,
      user
    })

    await this.tasksRepository.save(task);
    return task;
  }

  async getTaskById(id: string, user: User): Promise<Task> {
    // const found = await this.tasksRepository.findOneBy({ id });
    const found = await this.tasksRepository.findOne({ where: { id, user } });
    // console.log(found);

    if (!found) {
      throw new NotFoundException(`Task with ID ${id} not found.`)
    }
    return found;
  }

  async deleteTask(id: string, user: User): Promise<void> {
    const deleted = await this.tasksRepository.delete({ id, user })
    if (deleted.affected == 0) {
      throw new NotFoundException(`Task with ID ${id} not found.`)
    }
  }

  async updateTaskStatus(id: string, status: TaskStatus, user: User): Promise<Task> {
    const task = await this.getTaskById(id, user);

    task.status = status;
    await this.tasksRepository.save(task);
    return task;
  }
}
