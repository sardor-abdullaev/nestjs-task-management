import { IsNotEmpty } from 'class-validator';

export class createTaskDTO {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;  
}
