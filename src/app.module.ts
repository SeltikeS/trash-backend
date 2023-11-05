import { Module } from '@nestjs/common';
import { UserModule } from './modules/user.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/trash-backend'),
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
