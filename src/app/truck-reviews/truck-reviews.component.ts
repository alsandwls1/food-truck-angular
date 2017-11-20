import { Component, OnInit, Input } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

//star-rating
import {OnClickEvent, OnRatingChangeEven, OnHoverRatingChangeEvent} from "angular-star-rating/star-rating-struct";

import { ReviewService } from '../_services/review.service';

import { Member } from '../_models/member.model';
import { Review } from '../_models/review.model';

@Component({
  selector: 'app-truck-reviews',
  templateUrl: './truck-reviews.component.html',
  styleUrls: ['./truck-reviews.component.css']
})

//나의리뷰와 같은 리뷰이기 때문에 따로 service를 만들지 않고 같은 reviewService를 사용.
export class TruckReviewsComponent implements OnInit {
  //truck-info에서 tid값 가져오기
  @Input('tid') tid: string;

  member: Member;
  truckReviews: Review[];

  message: string;

  selectedFiles: FileList;
  currentFileUpload: File;
  url: string;

  //pagination
  p: number = 1;

  preview:boolean;
  f: FormGroup;

  constructor(
    private http: Http,
    private router: Router,
    private reviewService: ReviewService,
    private fb: FormBuilder
  ) {
    //로그인한 회원의 정보 구하기
    var session = sessionStorage.getItem('member');
    if (session !== null) {
      this.member = JSON.parse(session) as Member;
    }

    //star-rating
    this.f = fb.group({
      'comment' : [null, Validators.compose([Validators.required, Validators.maxLength(500)])],
      'score' :  new FormControl(''),
    });
  }

  ngOnInit() {
    this.getTruckReview(this.tid);
    this.reviewService.getObservable().subscribe(
      messege => {
        if (messege.result = 'ok') {
          this.reviewService.getTruckReview(this.tid).subscribe(res => {
            console.log(res);
            this.truckReviews = res;
            this.message = null;
          });
        }
      })
  }

  //사진올리기
  selectFile(event) {
    this.preview=true;
    this.selectedFiles = event.target.files;
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.url = event.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);
    }
  }


  onSubmit(f) {
    if (this.selectedFiles === undefined) {
      this.addReview2(f.value.comment, f.value.score, this.member.memail, this.tid);
    } else {
      f.value.image = this.selectedFiles.item(0);
      console.log('????????????????????????'+f.value);
      this.addReview(f.value.comment, f.value.image, f.value.score, this.member.memail, this.tid);
      f.reset();
      console.log(this.selectedFiles+"/////////////////");
      this.preview=false;
    }
  }
  // onSubmit(post) {
  //   if (this.selectedFiles === undefined) {
  //     this.addReview2(post.comment, post.score, this.member.memail, this.tid);
  //   } else {
  //     post.image = this.selectedFiles.item(0);
  //     console.log(post);
  //     this.addReview(post.comment, post.image, post.score, this.member.memail, this.tid);
  //   }
  // }

  // onSubmit(f) {
  //   if (this.selectedFiles === undefined) {
  //     this.addReview2(f.value.comment, f.value.score, this.member.memail, this.tid);
  //   } else {
  //     f.value.image = this.selectedFiles.item(0);
  //     console.log(f.value);
  //     this.addReview(f.value.comment, f.value.image, f.value.score, this.member.memail, this.tid);
  //   }
  // }

  addReview(comment: string, image: File, score: string, email: string, truck: string) {
    this.reviewService.addReview(comment, image, score, email, truck);
    alert('등록완료')
  }

  addReview2(comment: string, score: string, email: string, truck: string) {
    this.reviewService.addReview2(comment, score, email, truck);
    alert('등록완료')
  }

  removeReview(review: Review) {
    this.reviewService.removeReview(review)
      .subscribe(result => {
        // this.message = result;
        alert(result);
        this.getTruckReview(this.tid);
      }
      );
  }


  getTruckReview(tid: string) {
    this.reviewService.getTruckReview(tid)
      .subscribe(result => {
        result as Review[];
        result.map(res => {
          if (res.rerror !== null) {
            this.message = res.rerror;
          } else {
            this.truckReviews = result;
          }
        });
      });
  }

}
