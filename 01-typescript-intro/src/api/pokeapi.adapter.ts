import axios from "axios";
import type { HttpAdapter } from "../adapters/HttpAdapter.interface";

export class PokeapiAdapter implements HttpAdapter {
  private readonly axios = axios;

  async get<T>(url: string): Promise<T> {
    const { data } = await this.axios.get<T>(url);

    return data;
  }

  async post(url: string, data: any) {}

  async put(url: string, data: any) {}

  async delete(url: string) {}

  async patch(url: string, data: any) {}
}
