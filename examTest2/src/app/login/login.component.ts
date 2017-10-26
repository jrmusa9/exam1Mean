import { Component, OnInit } from '@angular/core';
import {User} from './../user'
import {PollService} from './../poll.service'
import {Router} from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user = new User();
  


  constructor(
    private pollService: PollService,
    private _router: Router
  ) { }


  createUser(){
    console.log('hello',this.user)
    this.pollService.createUser(this.user)
    .then(data => {
      this.pollService.session = data._id;
      this._router.navigateByUrl(`/dashboard/${data._id}`)
    })
    .catch(err => console.log(err));


  }


  ngOnInit() {
  }

}
