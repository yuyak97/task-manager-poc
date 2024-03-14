import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TaskService } from './task.service';
import {
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  TaskCreateRequestDto,
  TaskResponseDto,
  TaskUpdateRequestDto,
} from './task.dto';

@Controller('tasks')
@ApiTags('tasks')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Get()
  @ApiResponse({ type: TaskResponseDto, isArray: true })
  async getTasks() {
    return this.taskService.getTasks();
  }

  @Get('/:id')
  @ApiResponse({ type: TaskResponseDto, isArray: true })
  async getTaskById(@Param('id') id: number) {
    return this.taskService.getTaskById(id);
  }

  @Post()
  @ApiCreatedResponse({
    type: TaskResponseDto,
  })
  async createTask(@Body() body: TaskCreateRequestDto) {
    return this.taskService.createTask(body);
  }

  @Put('/:id')
  @ApiOkResponse({
    type: TaskResponseDto,
  })
  async updateTask(
    @Param('id') id: number,
    @Body() body: TaskUpdateRequestDto,
  ) {
    return this.taskService.updateTask({ id, body });
  }

  @Delete('/:id')
  @ApiNoContentResponse()
  async deleteTask(@Param('id') id: number) {
    return this.taskService.deleteTask(id);
  }
}
