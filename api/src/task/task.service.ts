import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { Task } from 'src/database/entities/task.entity';
import { Repository } from 'typeorm';
import {
  TaskCreateRequestDto,
  TaskResponseDto,
  TaskUpdateRequestDto,
} from './task.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TaskService {
  private logger = new Logger(TaskService.name);
  constructor(
    @InjectRepository(Task)
    private readonly taskRep: Repository<Task>,
  ) {}

  async getTasks() {
    try {
      const result = await this.taskRep.find();
      return result.map((el) => this.mapTaskResponse(el));
    } catch (err) {
      this.logger.error(err);
      throw new InternalServerErrorException();
    }
  }

  async getTaskById(id: number) {
    try {
      const task = await this.taskRep.findOne({ where: { id } });
      // If the record filtered by id does not exist,
      // return 404
      if (!task) {
        throw new NotFoundException();
      }

      return this.mapTaskResponse(task);
    } catch (err) {
      this.logger.error(err);
      throw new InternalServerErrorException();
    }
  }

  async createTask(data: TaskCreateRequestDto) {
    try {
      const body = await this.taskRep.create(data);
      const newTask = await this.taskRep.save(body);

      return this.mapTaskResponse(newTask);
    } catch (err) {
      this.logger.error(err);
      throw new InternalServerErrorException();
    }
  }

  async updateTask({ id, body }: { id: number; body: TaskUpdateRequestDto }) {
    try {
      await this.taskRep
        .createQueryBuilder()
        .update(Task)
        .set(body)
        .where('id = :id', { id })
        .execute();

      return this.getTaskById(id);
    } catch (err) {
      this.logger.error(err);
      throw new InternalServerErrorException();
    }
  }

  async deleteTask(id: number) {
    try {
      return this.taskRep
        .createQueryBuilder()
        .delete()
        .from(Task)
        .where('id = :id', { id })
        .execute();
    } catch (err) {
      this.logger.error(err);
      throw new InternalServerErrorException();
    }
  }

  // TODO: If the response must be customize, defined here
  private mapTaskResponse(task: Task): TaskResponseDto {
    return task;
  }
}
