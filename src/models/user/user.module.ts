import { Module } from '@nestjs/common';
import { UserService } from '@/models/user/user.service';
import { UserController } from '@/models/user/user.controller';
import { PrismaService } from '@/providers/prisma/prisma.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [UserController],
  providers: [UserService, PrismaService]
})
export class UserModule {}
