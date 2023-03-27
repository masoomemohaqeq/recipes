import axios from "axios";

import { config } from "@/configurations/config";
import { authHeader } from "@/helpers/authHeader";

export class dataService {
  constructor(apiController) {
    this.controller = apiController;
  }

  async getAll() {
    return await axios.get(`${config.apiUrl}/${this.controller}`, {
      headers: authHeader(),
    });
  }

  async get(id) {
    return await axios.get(`${config.apiUrl}/${this.controller}/${id}`, {
      headers: authHeader(),
    });
  }

  async create(data) {
    return await axios.post(`${config.apiUrl}/${this.controller}`, data, {
      headers: authHeader(),
    });
  }

  async update(id, data) {
    return await axios.put(`${config.apiUrl}/${this.controller}/${id}`, data, {
      headers: authHeader(),
    });
  }

  async delete(id) {
    return await axios.delete(`${config.apiUrl}/${this.controller}/${id}`, {
      headers: authHeader(),
    });
  }
}
