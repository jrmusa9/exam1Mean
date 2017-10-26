import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http'
import 'rxjs/add/operator/map'

@Injectable()
export class PollService {

  constructor(
    private _http: Http
  ) { }

  session;
  questions;
  oneQuestion;

  //RECEIVES USER FROM LOGIN COMPONENT
  //SENDS REQUEST TO SERVER AND RETURNS DATA TO LOGIN COMPONENT
  createUser(user){
    console.log('at pollService Create User',user)
    return this._http.post('/users', user)
    .map((response: Response) => response.json())
    .toPromise();
  }

  createQuestion(question){
    console.log('at service, question',question)
    return this._http.post('/questions', question)
    .map((response: Response) => response.json())
    .toPromise();
  }


  getQuestions (){
    return this._http.get('/getQuestions')
    .map((response: Response) => response.json())
    .toPromise();
  }

  getOneQuestion(questionId){

    return this._http.get('/getOneQuestion/'+questionId)
    .map((response: Response) => response.json())
    .toPromise();
  }

  getAllUsers(){
    return this._http.get('/getAllUsers')
    .map((response: Response) => response.json())
    .toPromise();
  }

  delete(question){
    return this._http.delete('/delete/'+question._id)
    .map((response: Response) => response.json())
    .toPromise();
  }

  updateVotes(vote){
    console.log('getting votes at service', vote)
    return this._http.post('/update', vote)
    .map((response: Response) => response.json())
    .toPromise();
  }


}
