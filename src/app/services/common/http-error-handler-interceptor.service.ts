import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpStatusCode,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import {
  CustomToastrService,
  ToastrMessageType,
  ToastrPosition,
} from '../ui/custom-toastr.service';
import { UserAuthService } from './models/user-auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerComponent, NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from 'src/app/base/base.component';

@Injectable({
  providedIn: 'root',
})
export class HttpErrorHandlerInterceptorService implements HttpInterceptor {
  constructor(
    private toastrService: CustomToastrService,
    private userAuthService: UserAuthService,
    private router: Router,
  private   spinner:NgxSpinnerService
  ) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error) => {
        switch (error.status) {
          case HttpStatusCode.Unauthorized:
            let url = this.router.url;

              this.userAuthService
                .refreshTokenLogin(localStorage.getItem('refreshToken'),(state)=>{
                  if(!state){
                    if (url == '/products') {
                      this.toastrService.message(
                        'Sepete ürün eklemek için giriş yapmanı gerekmektedir',
                        'Oturum Açınız!',
                        {
                          messageType: ToastrMessageType.Error,
                          position: ToastrPosition.TopRight,
                        }
                      );
                    } else {
                      this.toastrService.message(
                        'Bu işlemi yapmaya yetkiniz bulunmamaktadır',
                        'Yetkisiz işlem!',
                        {
                          messageType: ToastrMessageType.Error,
                          position: ToastrPosition.BottomFullWidth,
                        }
                      );
                    }
                  }
                })
                .then((data) => {
                  this.toastrService.message(
                        'Bu işlemi yapmaya yetkiniz bulunmamaktadır',
                        'Yetkisiz işlem!',
                        {
                          messageType: ToastrMessageType.Error,
                          position: ToastrPosition.BottomFullWidth,
                        }
                      );
                });

            break;
          case HttpStatusCode.InternalServerError:
            this.toastrService.message(
              'Sunucuya Erişilmiyor',
              'Sunucu hatası!',
              {
                messageType: ToastrMessageType.Error,
                position: ToastrPosition.BottomFullWidth,
              }
            );
            break;
          case HttpStatusCode.BadRequest:
            this.toastrService.message(
              'Geçersiz istek yapıldı.',
              'Geçersiz istek!',
              {
                messageType: ToastrMessageType.Error,
                position: ToastrPosition.BottomFullWidth,
              }
            );
            break;
          case HttpStatusCode.NotFound:
            this.toastrService.message(
              'Aradığınız bulunamadı',
              'Bulunamadı.!',
              {
                messageType: ToastrMessageType.Error,
                position: ToastrPosition.BottomFullWidth,
              }
            );
            break;

          default:
            this.toastrService.message(
              'Beklenmeyen bir hata gerçekleşti.',
              'Hata!',
              {
                messageType: ToastrMessageType.Error,
                position: ToastrPosition.BottomFullWidth,
              }
            );
            break;
        }
        this.spinner.hide(SpinnerType.BallAtom);
        this.spinner.hide(SpinnerType.BallScaleMultiple);
        this.spinner.hide(SpinnerType.BallSpinClockwiseFadeRotation);
        return of(error);
      })
    );
  }
}
