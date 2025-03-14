import { IsEnum, IsOptional, IsString } from 'class-validator';
import { TaskStatus } from '../task-status.enum';

export class GetTasksFilterDTO {
  @IsOptional()
  @IsEnum(TaskStatus)
  status: TaskStatus;
  // status?: TaskStatus; //optional

  @IsOptional()
  @IsString()
  search: string;
  // search?: string; //optional
}
