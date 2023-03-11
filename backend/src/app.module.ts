import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoEntity } from '../Todo';

@Module({
  imports: [TypeOrmModule.forRoot(), TypeOrmModule.forFeature([TodoEntity])],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
