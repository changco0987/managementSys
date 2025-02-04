import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule],
  template: `<router-outlet></router-outlet>`,
})
export class AppComponent {}











// import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
// import { Component, OnInit } from '@angular/core';
// import { RouterOutlet } from '@angular/router';

// @Component({
//   selector: 'app-root',
//   standalone: true,
//   imports: [RouterOutlet, HttpClientModule],
//   templateUrl: './app.component.html',
//   styleUrl: './app.component.css'
// })
// export class AppComponent implements OnInit{
//   title = 'angular-view';
//   userData: any = {};

//   constructor(private http: HttpClient)
//   {

//   }

//   ngOnInit(): void {
//       this.fetchUser();
//   }

//   public fetchUser()
//   {

//     const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI5ZDk3ZGJjNS0xOGFhLTQ5MjAtYTZmNy1kZGRlOTMwNTljYjMiLCJqdGkiOiIyYWQ2NTcxYzJmNmQ1YTRjZGFlMzc2OTI5NTkwODI5Y2VmOTNkMzk4NWQzZTE4YjU3ZjdhYTM2ZjU4ZDM3NjdhOWVlNjk1ODhhYTk4MDBkZCIsImlhdCI6MTczNzg5ODgyNy41MDAyNDYsIm5iZiI6MTczNzg5ODgyNy41MDAyNTEsImV4cCI6MTc1MzUzNzIyNi4zODMzLCJzdWIiOiIyIiwic2NvcGVzIjpbXX0.j5KdxMYaBYdtcUqrXZr1W5SZxf3Ej0xCcK8WEk8YTPNDTBxUdbo1UY2zb0JmUTQOba6cO1YimCRH0ii8o-_wQ1qPSSuw9udF9FeI5FrR9Gv0b9D38L0YxxzTvJ8cAvHhNUsVe6XPTjvpOEdTRadM_T3onJ7KyQ6jsb2rOU0US4Kfxj7PZDCrAaUfn-UgH6_QiYLi6I33_ApTRCTeR3SfyGgPhcgm_aGkepMu1T6WiCYIzdNLikOP1-tUvCL0cb1bcZXl8aMVMXMbNgwD2tQGpHXzT4I4w6VJD3KoGHBLmAH4g15OxcuYL_BxtaKZZQXiOQ_jX0TDd8mra-_JKhGp3NJ05zQdLOJNMOSA1m2LWHwGePobum2MKj0h5u12nw15aoTJ_Pl_tgU5_39I58QsVp-FR3KM-uHpQjg5nr5ga3huDT6BIJTHclFRMAz2nlkOn6MPZEplrP05JeLy64vc_oZggntTK0t0LiLOZsEBMWs8dFRdCITGqsbocuU69I7vpbxm3Dd6SrGWr92FXyC6juxGw0-FcdeRgboTBp834o41vSdHLaXB0GFXX_9ZEEaiRAaVe3fUz0zYF4WfYRyKqrsQf6M9lu-Ys6lx4Csw0VLaAODQZckCX13vMHxFCCdcsl3nibH4V-EfuOtJ5ZA0zBxDlhJek-qWxMGzCvXhYKE'; // Replace with your actual token
//     const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

//     this.http.get("http://127.0.0.1:8000/api/v1/users/1", {headers}).subscribe(
//       (resp:any) => {
//         console.log(resp);
//         this.userData = resp.data;
//       }
//     );
//   }
// }
