import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { CommonModule } from "@angular/common";
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';
import { AppRoutingModule } from './app-routing.module';


//rating star : npm install angular-star-rating --save
import { StarRatingModule } from 'angular-star-rating';

//pagination : npm install ngx-pagination --save
import { NgxPaginationModule } from 'ngx-pagination';

//icons :  npm install --save font-awesome angular-font-awesome
//기본설정 - angular-cli.json파일에 아래의 것을 추가
 // "styles": [
//   "styles.css",
//   "../node_modules/font-awesome/css/font-awesome.css"
// ],
import { AngularFontAwesomeModule } from 'angular-font-awesome';

// modal : npm i ngx-smart-modal --save
import { NgxSmartModalModule, NgxSmartModalService } from 'ngx-smart-modal';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//timepicker: npm install ngx-bootstrap --save
import { TimepickerModule  } from 'ngx-bootstrap';
import { PopoverModule } from 'ngx-bootstrap';
// import { BsDatepickerModule } from 'ngx-bootstrap';

//focebook: npm i --save ngx-facebook
import { FacebookModule } from 'ngx-facebook';

//component
import { AppComponent } from './app.component';
import { GoogleMapComponent } from './google-map/google-map.component';
import { MainHomeComponent } from './main-home/main-home.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { JoinPageComponent } from './join-page/join-page.component';
import { TopNavComponent } from './top-nav/top-nav.component';
import { TruckListComponent } from './truck-list/truck-list.component';
import { SupportComponent } from './support/support.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { TruckInfoComponent } from './truck-info/truck-info.component';
import { TruckReviewsComponent } from './truck-reviews/truck-reviews.component';
import { MenuListComponent } from './menu-list/menu-list.component';
import { TruckRegistComponent } from './truck-regist/truck-regist.component';
import { SupportDetailComponent } from './support/support-detail/support-detail.component';
import { SupportWriteComponent } from './support/support-write/support-write.component';
import { SupportUpdateComponent } from './support/support-update/support-update.component';
import { CanivalDetailComponent } from './canival/canival-detail/canival-detail.component';
import { CanivalViewComponent } from './canival/canival-view/canival-view.component';
import { CanivalWriteComponent } from './canival/canival-write/canival-write.component';
import { MemberProfileComponent } from './member-profile/member-profile.component';

//service
import { AuthenticationService } from './_services/authentication.service';
import { MemberService } from './_services/member.service';
import { HotlistService } from './_services/hotlist.service';
import { ReviewService } from './_services/review.service';
import { GoogleMapService } from './_services/google-map.service';
import { TruckService } from './_services/truck.service';
import { UploadFileService } from './_services/file-upload.service';
import { FoodService } from './_services/food.service';
import { SupportService } from './_services/support.service';
import { CanivalService } from './_services/canival.service';



@NgModule({
  declarations: [
    AppComponent,
    GoogleMapComponent,
    MainHomeComponent,
    LoginPageComponent,
    JoinPageComponent,
    TopNavComponent,
    TruckListComponent,
    SupportComponent,
    FavoritesComponent,
    ReviewsComponent,
    TruckInfoComponent,
    TruckReviewsComponent,
    MenuListComponent,
    TruckRegistComponent,
    SupportDetailComponent,
    SupportWriteComponent,
    SupportUpdateComponent,
    MemberProfileComponent,
    CanivalDetailComponent,
    CanivalViewComponent,
    CanivalWriteComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule, ReactiveFormsModule,
    CommonModule,
    HttpModule,
    HttpClientModule,
    AppRoutingModule,
    //rating star
    StarRatingModule.forRoot(),
    //pagination
    NgxPaginationModule,
    //icons
    AngularFontAwesomeModule,
    //modal
    NgxSmartModalModule.forRoot(),
    BrowserAnimationsModule,
    //timepicker
    TimepickerModule .forRoot(),
    PopoverModule.forRoot(),
    // BsDatepickerModule.forRoot(),
    //Facebook
    FacebookModule.forRoot(),
    //map
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBFQmGdDApLDMW8Fp3F8VtOv9kwAg1xAUU',
      region: "kr",
      libraries: ["places"],
    })
  ],
  providers: [
    AuthenticationService,
    MemberService,
    HotlistService,
    ReviewService,
    GoogleMapService,
    TruckService,
    UploadFileService,
    FoodService,
    SupportService,
    CanivalService,
    //modal service
    NgxSmartModalService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
