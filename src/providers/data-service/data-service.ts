import { Injectable } from '@angular/core';
import { Http,  Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/observable/merge';

import * as socketIo from 'socket.io-client';


/*
  Generated class for the DataServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()



export class DataServiceProvider {

  serverUrl="http://localhost:80";
  private socket;

  constructor(private http: Http) {
    //this.socket = socketIo('http://localhost:80');
  }

  public getTest(): Observable<any> {
      return new Observable<any>(observer => {
          this.socket.on('message', (data) => observer.next(data));
      });
  }


  getTodos(){
    return new Promise((res,rej)=>{
      let todosUrl=this.serverUrl + "/api/todos";

      this.http.get(todosUrl).subscribe(done=>{
            res(done.json());
      },
      err=>{
            rej(err.json());
      })
    })
  }

  getTodosId(id){
    return new Promise((res,rej)=>{
      let todosUrl=this.serverUrl + "/api/todos/" + id;

      this.http.get(todosUrl).subscribe(done=>{
            res(done.json());
      },
      err=>{
            rej(err.json());
      })
    })
  }

  addTodos(data){
    return new Promise((res,rej)=>{
      let todosUrl=this.serverUrl + "/api/todos";

      this.http.post(todosUrl,data).subscribe(done=>{
            res(done.json());
      },
      err=>{
            rej(err.json());
      })
    })
  }

  deleteTodosId(id){
    return new Promise((res,rej)=>{
      let todosUrl=this.serverUrl + "/api/todos/" + id;

      this.http.delete(todosUrl).subscribe(done=>{
            res(done.json());
      },
      err=>{
            rej(err.json());
      })
    })
  }


  editTodos(data, id){
    return new Promise((res,rej)=>{
      let todosUrl=this.serverUrl + "/api/todos/" + id;

      this.http.put(todosUrl,data).subscribe(done=>{
            res(done.json());
      },
      err=>{
            rej(err.json());
      })
    })
  }

}
