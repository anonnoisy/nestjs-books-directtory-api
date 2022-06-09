import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): object {
    return {
      "name": "Books Directory API",
      "description": "Books Directory API documentation",
      "version": "1.0"
    };
  }
}
