import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from 'src/app.module';
import { Config } from 'src/config/config.interface';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService: ConfigService<Config> = app.get(ConfigService);
  const port = Number.parseInt(configService.get<string>('PORT'));

  await app.listen(port);
}

bootstrap();