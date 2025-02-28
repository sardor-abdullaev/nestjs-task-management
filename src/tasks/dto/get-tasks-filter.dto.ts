import { TaskStatus } from '../task.model';

export class GetTasksFilterDTO {
  status?: TaskStatus; //optional
  search?: string; //optional
}
