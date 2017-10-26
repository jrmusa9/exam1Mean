import { Component, OnInit } from '@angular/core';
import {PollService} from './../poll.service'
import {Router} from '@angular/router'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  
  constructor(
    private _pollService: PollService,
    private _router: Router
  ) { }
  
  session = [this._pollService.session]
  questions;
  allUsers;
  mydata;



  getAllUsers(){
    this._pollService.getAllUsers()
    .then(data => {
      this.allUsers = data
      console.log("finally!",this.allUsers)
    })
    .catch(err => console.log(err));
  }

  destroy(question){
    console.log('sent to destroy', question)
    this._pollService.delete(question)
    .then(data => {
      this.getAllQuestions()
    })
    .catch(err => console.log(err));
  }

  getAllQuestions(){
    this._pollService.getQuestions()
    .then(data => {
      this._pollService.questions = data
      this.questions = this._pollService.questions
    })
    .catch(err => console.log(err));
  }

  getOneQuestion(questionId){

    this._pollService.getOneQuestion(questionId)
    .then(data => {
      this._pollService.oneQuestion = data
      this._router.navigateByUrl('/poll/'+questionId)
    })
    .catch(err => console.log(err));
  }
  
  
  logOut(){
    this._pollService.session = null
    this._router.navigateByUrl('/')
  }
  
  ngOnInit() {
    if(this._pollService.session == null){
      this._router.navigateByUrl('/')
    }
    this.getAllQuestions()
    this.getAllUsers()
  }
}