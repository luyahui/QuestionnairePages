import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

const baseUrl = 'http://localhost:8090/question';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private http: HttpClient) { }

  getRandom(uuid: string) {
    // let params: HttpParams = new HttpParams();
    // params.set("uuid", uuid);
    return this.http.get(`${baseUrl}/random?uuid=${uuid}`);
  }

  getAll(pageNo = 0, pageSize = 20) {
    let params: HttpParams = new HttpParams();
    params.set("pageNo", pageNo.toString());
    params.set("pageSize", pageSize.toString());
    console.log("pageNo:" + pageNo);
    console.log("pageSize:" + pageSize);
    return this.http.get(`${baseUrl}/all?pageNo=${pageNo}&pageSize=${pageSize}`);
  }
}
