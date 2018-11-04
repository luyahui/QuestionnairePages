import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

const baseUrl = 'http://52.5.89.46:8090';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  delete(id: number) {
    return this.http.delete(`${baseUrl}/question/delete/${id}`);
  }

  constructor(private http: HttpClient) { }

  getRandom(uuid: string) {
    return this.http.get(`${baseUrl}/question/random?uuid=${uuid}`);
  }

  getAll(pageNo = 0, pageSize = 20) {
    return this.http.get(`${baseUrl}/question/all?pageNo=${pageNo}&pageSize=${pageSize}`);
  }

  createNew(question){
    return this.http.post(`${baseUrl}/question/add`, question);
  }


  update(question: any){
    return this.http.put(`${baseUrl}/question/edit/${question.id}`, question);
  }

  answer(qid, record){
    return this.http.post(`${baseUrl}/record/answer/${qid}`, record);
  }
}
