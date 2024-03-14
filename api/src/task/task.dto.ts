import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsEnum, IsString } from 'class-validator';
import { Task } from 'src/database/entities/task.entity';
import { ApiSchemaName } from 'src/decorator/schema-name.decorator';
import { TaskStatus } from 'src/enums/task-status.enum';

@ApiSchemaName({ name: 'TaskResponse' })
export class TaskResponseDto implements Task {
  @ApiProperty({
    description: 'The unique identifier of the task',
    type: Number,
  })
  id: number;

  @ApiProperty({ description: 'The title of the task', type: String })
  title: string;

  @ApiProperty({ description: 'The due date of the task', type: Date })
  dueDate: Date;

  @ApiProperty({
    description: 'The status of the task. 10: TO_DO, 20: IN_PROGRESS, 30: DONE',
    enum: TaskStatus,
  })
  status: TaskStatus;

  @ApiProperty({ description: 'The creation date of the task', type: Date })
  createdAt: Date;

  @ApiProperty({ description: 'The update date of the task', type: Date })
  updatedAt: Date;
}

@ApiSchemaName({ name: 'TaskCreateRequest' })
export class TaskCreateRequestDto {
  @ApiProperty({ description: 'title of task', type: String })
  @IsString()
  title: string;

  @ApiProperty({ description: 'due date', type: Date })
  @IsDate()
  dueDate: Date;
}

@ApiSchemaName({ name: 'TaskUpdateRequest' })
export class TaskUpdateRequestDto extends TaskCreateRequestDto {
  @ApiProperty({
    description: "status, 10: TO_DO, 20: IN_PROGRESS, 30: DONE'",
  })
  @IsEnum(TaskStatus)
  status: TaskStatus;
}
