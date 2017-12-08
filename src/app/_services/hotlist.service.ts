import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { Hotlist } from '../_models/hotlist.model';
import { Truck } from '../_models/truck.model';
import { Member } from '../_models/member.model';
import { HotlistDetail } from '../_models/hotlistdetail.model';

@Injectable()
export class HotlistService {

  private hotlistUrl: string = "http://localhost:8080/hotlist";
  private headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8' });

  private subject = new Subject<any>();

  private session: string;
  private member: Member;

  constructor(private http: Http) {
    this.session = sessionStorage.getItem('member');
  }

  getObservable(): Observable<any> {
    return this.subject.asObservable();
  }

  getHotlistDetail(): Observable<HotlistDetail[]> {
    if(this.session !== null){
      this.member = JSON.parse(this.session);
    }
    var email = this.member.memail;
    var url = `${this.hotlistUrl}/${email}`;
    return this.http.get(url)
      .map(this.extractData)
      ._catch(this.handleError);
  }

  checkFavo(tId:string){
    console.log(tId);
    var id = JSON.parse(sessionStorage.getItem('member')).memail;
    console.log("id = " + id);
    const url = `${this.hotlistUrl}/check/${tId}/${id}`;
    console.log(url)
    return this.http.get(url).subscribe(
      res=>{
        if(res.json().htruck == tId){
          this.subject.next({check:false});
        }
      }
    );
  }

  addHotlist(truck: string) {
    console.log(truck);
    console.log(JSON.parse(sessionStorage.getItem('member')).memail);

    var url = `${this.hotlistUrl}/post`;
    let headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let hotlist = {"hMember": JSON.parse(sessionStorage.getItem('member')).memail, "hTruck": truck };

    return this.http.post(url, JSON.stringify(hotlist), options);
  }

  addHotlist2(tid: string) {
    console.log(tid);
    console.log(JSON.parse(sessionStorage.getItem('member')).memail);

    var url = `${this.hotlistUrl}/post`;
    let headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let hotlist = {"hMember": JSON.parse(sessionStorage.getItem('member')).memail, "hTruck": tid };

    return this.http.post(url, JSON.stringify(hotlist), options).subscribe(res => this.subject.next({ favo: 'ok' }));
  }

  //이미 존재하는 즐찾인지 확인
  checkHotlist(tid:string, email:string) {
    console.log('checkHotlist===='+tid);
    const url = `${this.hotlistUrl}/check/${tid}/${email}`;
    console.log('이미 존재하는 즐찾인지 url::::'+url)
    return this.http.get(url).subscribe(
      res=>{
        console.log('res.text() = '+res.text());
        if(res.text()) {
          console.log('if(res.text()) = '+res.text());
          this.subject.next({ favo: 'ok' });
        }
      }
    );
  }

  // addHotlist(member: string, truck: string): Observable<Hotlist> {
  //   var url = this.hotlistUrl;
  //   let headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
  //   let options = new RequestOptions({ headers: headers });
  //   let hotlist = { "hId": null, "hMember": member, "hTruck": truck };
  //   console.log(' add holist info = ' + JSON.stringify(hotlist));
  //
  //   return this.http.post(url, JSON.stringify(hotlist), options)
  //     .map(this.extractDataForObject)
  //     ._catch(this.handleError);
  // }

//되는 remove
  removeHotlist(hotlistdetail: HotlistDetail): Observable<string> {
    let url = `${this.hotlistUrl}/${hotlistdetail.hid}`;
    console.log('remove url='+url);
    return this.http.delete(url, {headers:this.headers})
    .map(res => {
      let json = res.text();
      // this.subject.next({ json });
      return json || {};
    })
    ._catch(this.handleError);
  }


  private extractDataForObject(res: Response) {
    let json = res.text();
    console.log('hotlist service='+json);
    json = JSON.parse(json);
    return json || {};
  }

  private extractData(res: Response) {
    let json = res.text();
    json = JSON.parse(json);
    return json || [];
  }

  private handleError(res: Response) {
    console.log("Erroe = " + res);
    return Observable.throw(res.json().error || 'Server Down');
  }
}
