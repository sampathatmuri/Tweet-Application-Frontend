import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { HeaderComponent } from './components/header/header.component'
import { NgxUploaderModule } from 'ngx-uploader';
import { TokenInterceptor } from './helper/token-interceptor';
import { ProfileComponent } from './components/profile/profile.component';
import { LogoutComponent } from './components/logout/logout.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PostTweetComponent } from './components/post-tweet/post-tweet.component';
import { MatIconModule } from '@angular/material/icon';
import { TweetListComponent } from './components/tweet-list/tweet-list.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { MatBadgeModule } from '@angular/material/badge';
import { ReplyTweetComponent } from './components/reply-tweet/reply-tweet.component';
import { TagsComponent } from './components/tags/tags.component';
import { DateAgoPipe } from './pipes/date-ago.pipe';
import { AutosizeModule } from 'ngx-autosize';
import { UpdateTweetComponent } from './components/update-tweet/update-tweet.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ForgotPasswordComponent,
    HeaderComponent,
    ProfileComponent,
    LogoutComponent,
    PostTweetComponent,
    TweetListComponent,
    UserListComponent,
    ReplyTweetComponent,
    TagsComponent,
    DateAgoPipe,
    UpdateTweetComponent,
  ],
  imports: [
    BrowserModule, AppRoutingModule, BrowserAnimationsModule,
    ReactiveFormsModule, HttpClientModule, NgxUploaderModule,
    NgbModule, MatIconModule, MatBadgeModule,AutosizeModule,
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,

    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
