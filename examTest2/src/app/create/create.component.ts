import { Component, OnInit } from '@angular/core';
import {Question} from './../question'
import {Router} from '@angular/router'
import {PollService} from './../poll.service'

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  session = this._pollService.session


  question = {
    question:'',
    option1:{text:'',score:0},
    option2:{text:'',score:0},
    option3:{text:'',score:0},
    option4:{text:'',score:0},
    _userID:''
  }

  constructor(
    private _pollService: PollService,
    private _router: Router
  ) { }

  newQuestion(){
    this.question._userID = this.session
    this._pollService.createQuestion(this.question) 
    .then(data => {
      console.log('BACK AT CREATE, and getting question', data)
      // this._pollService.questions = data;
      this._router.navigateByUrl(`dashboard/${this.session}`)
    })
    .catch(err => {
      console.log(err)
    })

    
  }

  goBack(){
    if(this._pollService.session == null){
      this._router.navigateByUrl('/')
    }
    this._router.navigateByUrl(`dashboard/${this.session}`)
  }

  ngOnInit() {
  }
}
