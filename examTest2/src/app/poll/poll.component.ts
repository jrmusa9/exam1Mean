import { Component, OnInit } from '@angular/core';
import {PollService} from './../poll.service'
import {Router} from '@angular/router'

@Component({
  selector: 'app-poll',
  templateUrl: './poll.component.html',
  styleUrls: ['./poll.component.css']
})
export class PollComponent implements OnInit {

  constructor(
    private _pollService: PollService,
    private _router: Router
  ) { }
  question;

  goBackAndUpdate(){
    console.log("updating options",this.question)
    this._pollService.updateVotes(this.question)
    .then(data => {
      this._router.navigateByUrl('/dashboard/'+this._pollService.session)
    })
    .catch(err => console.log(err));

  }


  

  ngOnInit() {
    console.log('@ poll component', this._pollService.oneQuestion)
    this.question = this._pollService.oneQuestion
    console.log('blabla', this.question)
  }
}
