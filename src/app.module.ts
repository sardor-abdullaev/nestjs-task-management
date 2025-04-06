import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: [`.env.stage.${process.env.STAGE}`] }), TasksModule, TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'aws-0-ap-south-1.pooler.supabase.com',
      port: 5432,
      username: 'postgres.tamuyrmnrohhupltfuuu',
      password: 'RealMadridN1',
      database: 'task-management',
      autoLoadEntities: true,
      synchronize: true,
      // entities: [Task]
    }), AuthModule],
})
export class AppModule { }


// postgresql://postgres.tamuyrmnrohhupltfuuu:[YOUR-PASSWORD]@aws-0-ap-south-1.pooler.supabase.com:6543/postgres
//  postgresql://postgres:[YOUR-PASSWORD]@db.tamuyrmnrohhupltfuuu.supabase.co:5432/postgres
