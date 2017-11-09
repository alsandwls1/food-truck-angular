import { Component, OnInit, NgZone, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {FormGroup} from '@angular/forms';
import { AgmCoreModule, MapsAPILoader, AgmMap } from '@agm/core';

import { TruckService } from '../_services/truck.service';
import { ReviewService } from '../_services/review.service';
import { HotlistService } from '../_services/hotlist.service';

//modal
import { NgxSmartModalService } from 'ngx-smart-modal';
import { AuthenticationService } from '../_services/authentication.service';

import { Truck } from '../_models/truck.model';
import { Member } from '../_models/member.model';

@Component({
  selector: 'app-truck-info',
  templateUrl: './truck-info.component.html',
  styleUrls: ['./truck-info.component.css']
})
export class TruckInfoComponent implements OnInit {
  // truck: Truck;

  favolist: object[] = [];

  //트럭정보
  timage: string;
  tname: string;
  tcomment: string;
  tavg: string;
  topen: string;
  tclose: string;
  taddress: string;
  tfoodmaterial: string;
  tmember: string;
  tlat: number;
  tlng: number;

  check: boolean = true;

  tid: string;
  sub: any;

  currentFileUpload: File;

  mapTypeId: string = "roadmap";

  session: string;
  member: Member;

  f: FormGroup;
  privew:boolean=false;
  rename: string;
  reimage: string;
  recomment: string;
  reopen: string;
  reclose: string;
  readdress: string;
  refoodmaterial: string;
  relat: number;
  relng: number;

  @ViewChild(AgmMap)
  public agmMap: AgmMap;

  constructor(
    private route: ActivatedRoute,
    private truckService: TruckService,
    private reviewService: ReviewService,
    private ngZone: NgZone,
    private hotlistService: HotlistService,
    //modal
    public ngxSmartModalService: NgxSmartModalService,
    private authenticationService: AuthenticationService,
    private router: Router,
  ) {
    this.session = sessionStorage.getItem('member');
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.tid = params['tid'];
    });

    //트럭정보 초기에 불러오기
    this.getTruckInfo(this.tid);
    this.agmMap.triggerResize();

    this.truckService.getObservable().subscribe(message => {
      console.log(message.check);
      if (message.check === 'true') {
        this.getTruckInfo(this.tid);
        this.agmMap.triggerResize();
      }
    });

    this.hotlistService.checkFavo(this.tid);

    this.hotlistService.getObservable().subscribe(
      message => {
        if (message.check == false) {
          this.check = message.check;
        }
      }
    );

    this.reviewService.getObservable().subscribe(message => {
      console.log(message);
      if (message.result == 'ok') {
        this.getTruckInfo(this.tid);
      }
    });
  }

  getTruckInfo(tid: string) {
    this.truckService.getTruckInfo(tid).subscribe(result => {
      console.log(result)
      this.tname = result.tname;
      this.timage = result.timage;
      this.tavg = result.tavg;
      this.tcomment = result.tcomment;
      this.topen = result.topen;
      this.tclose = result.tclose;
      this.taddress = result.taddress;
      this.tfoodmaterial = result.tfoodmaterial;
      this.tmember = result.tmember;
      this.tlat = parseFloat(result.tlat);
      this.tlng = parseFloat(result.tlng);
    });
  }

  favorite(f) {
    console.log(f);
    this.hotlistService.addHotlist(f).subscribe(
      () => { this.hotlistService.checkFavo(f); }
    );
  }


  //Modal
  selectedFiles: FileList;
  url: string;

  selectFile(event) {
    this.selectedFiles = event.target.files;
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.url = event.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  //업데이트할 때, 데이터 보냄.
  onSubmit(f) {
    console.log(f.value)
    if (this.selectedFiles === undefined) {
      if (this.session !== null) {
        this.member = JSON.parse(this.session);
      }
      // this.truckService.truckRegist(f.value.name, f.value.open, f.value.close, f.value.lat, f.value.lng, f.value.comment, f.value.file);
      this.truckService.truckRegist2(
        this.tid, f.value.tname, f.value.topen,
        f.value.tclose, f.value.tlat, f.value.tlng,
        f.value.tcomment, this.timage, this.member.memail
      );

      this.truckService.getObservable().subscribe(message => {
        if (message.check == 'true') {
          this.authenticationService.checkTruck(this.member.memail);
          // alert('등록되었습니다.');
          console.log('update되었음')
          this.router.navigate(['/truck-info', this.tid]);
        }
      });
    }
    else {
      f.value.file = this.selectedFiles.item(0);
      //3
      if (this.session !== null) {
        this.member = JSON.parse(this.session);
      }

      console.log(f.value);
      // this.truckService.truckRegist(f.value.name, f.value.open, f.value.close, f.value.lat, f.value.lng, f.value.comment, f.value.file);
      this.truckService.truckRegist3(this.tid, f.value.tname, f.value.topen, f.value.tclose,
        f.value.tlat, f.value.tlng, f.value.tcomment, f.value.file, this.member.memail);

      this.truckService.getObservable().subscribe(message => {
        if (message.check == 'true') {
          this.authenticationService.checkTruck(this.member.memail);
          // alert('등록되었습니다.');
          console.log('update되었음')
          this.router.navigate(['/truck-info', this.tid]);
        }
      });
    }
  }

  editTruck(f) {
    console.log(f.value);
    this.rename = f.value.tname;
    this.recomment = f.value.tcomment;
    this.reopen = f.value.topen;
    this.reclose = f.value.tclose;
    this.relat = f.value.tlat;
    this.relng = f.value.tlng;
  }
  clean(){
    this.tname = this.rename;
    this.tcomment = this.recomment ;
    this.topen = this.reopen ;
    this.tclose = this.reclose;
    this.tlat =   this.relat;
    this.tlng = this.relng;
  }

  //위치등록
  private setCurrentPosition() {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition((position) => {
      this.tlat = position.coords.latitude;
      this.tlng = position.coords.longitude;
    });
  }
}

}
