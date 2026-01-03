import { Injectable } from '@nestjs/common';
import { HttpAdapter } from '../interfaces/http-adapter.interface';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class AxiosAdapter implements HttpAdapter {
  constructor(private readonly httpService: HttpService) {}

  async get<T>(url: string): Promise<T> {
    try {
      const { data } = await this.httpService.axiosRef.get<T>(url);
      return data;
    } catch (error) {
      console.error('AxiosAdapter GET error:', error);
      throw new Error('Error fetching data');
    }
  }
}
