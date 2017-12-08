import { Component, OnInit } from '@angular/core';
import { Form } from '@angular/forms';
import { Router } from '@angular/router';

import { MemberService } from '../_services/member.service';

import { Member } from '../_models/member.model';

@Component({
  selector: 'app-member-profile',
  templateUrl: './member-profile.component.html',
  styleUrls: ['./member-profile.component.css']
})
export class MemberProfileComponent implements OnInit {
  private member: Member;

  private email:string;
  private password:string;
  private nickname:string;

  constructor(
    private memberService:MemberService,
    private router:Router
  ) {}

  ngOnInit() {
    if(sessionStorage.getItem('member')) {
      this.member = JSON.parse(sessionStorage.getItem('member'));
    }
    console.log(this.member);
  }

  onSubmit(f) {
    if(f.valid) {
      this.memberService.modifyMember(this.member).subscribe(res => {
          this.member = res;
          sessionStorage.setItem('member', JSON.stringify(this.member));
          console.log(sessionStorage.getItem('member'));
          this.router.navigateByUrl("main-home");
      });
    }
  }

}
