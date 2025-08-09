import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { ProviderModule } from './provider/provider.module';
import { ProviderAuthModule } from './provider/auth/provider-auth.module';
import { SlotsModule } from './provider/slots/slots.module';
import { UserModule } from './user/user.module';
import { UserAuthModule } from './user/user-auth/user-auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(
      `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0.r5a1nwy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`,
    ),
    ProviderModule,
    ProviderAuthModule,
    SlotsModule,
    UserModule,
    UserAuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
