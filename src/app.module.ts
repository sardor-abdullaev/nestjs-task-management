import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: [`.env.stage.${process.env.STAGE}`] }), TasksModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        synchronize: true,
        autoLoadEntities: true,
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
      })
    }),
    // TypeOrmModule.forRoot({
    //   type: 'postgres',
    //   host: 'aws-0-ap-south-1.pooler.supabase.com',
    //   port: 5432,
    //   username: 'postgres.tamuyrmnrohhupltfuuu',
    //   password: 'RealMadridN1',
    //   database: 'task-management',
    //   autoLoadEntities: true,
    //   synchronize: true,
    //   // entities: [Task]
    // }),     
    AuthModule],
})
export class AppModule { }


// postgresql://postgres.tamuyrmnrohhupltfuuu:[YOUR-PASSWORD]@aws-0-ap-south-1.pooler.supabase.com:6543/postgres
//  postgresql://postgres:[YOUR-PASSWORD]@db.tamuyrmnrohhupltfuuu.supabase.co:5432/postgres
