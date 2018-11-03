import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

const baseUrl = 'http://localhost:8090/question';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  delete(id: number) {
    return this.http.delete(`${baseUrl}/delete/${id}`);
  }

  constructor(private http: HttpClient) { }

  getRandom(uuid: string) {
    return this.http.get(`${baseUrl}/random?uuid=${uuid}`);
  }

  getAll(pageNo = 0, pageSize = 20) {
    return this.http.get(`${baseUrl}/all?pageNo=${pageNo}&pageSize=${pageSize}`);
  }
}
