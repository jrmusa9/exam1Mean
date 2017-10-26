import { Component, OnInit } from '@angular/core';
import {PollService} from './../poll.service';
import {Router} from '@angular/router'
import {User} from './../user'


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user = new User();

  constructor(
    private _pollService: PollService,
    private _router: Router
  ) { }

  //THE FOLLOWING SENDS USER TO SERVICE, createUser()
  //GETS BACK
  createUser(){
    console.log('from login',this.user)
    this._pollService.createUser(this.user)
    .then(data => {
      console.log(data);
      this._router.navigateByUrl('/dashboard');
    })
    .catch(err => console.log(err));
  }


  ngOnInit() {
  }

}
