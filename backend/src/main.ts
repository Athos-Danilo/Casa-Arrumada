import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { UsersService } from './users/users.service';
import * as bcrypt from 'bcrypt';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  
  // Seed admin
  const usersService = app.get(UsersService);
  const adminExists = await usersService.findOne('admin');
  if (!adminExists) {
    const hash = await bcrypt.hash('admin', 10);
    await usersService.create('admin', hash, 'ADMIN');
    console.log('Admin user created (admin/admin)');
  }
  
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
