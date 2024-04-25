import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject, catchError, filter, Observable, of, Subject, switchMap, take, tap, throwError} from "rxjs";

import {jwtDecode} from "jwt-decode";
import {Router} from "@angular/router";
import {UserI} from "../back-module/user.interface";
export const ROLES = {
  SUPERADMIN: "ESUPERADMIN",
  ADMIN: "EADMIN",
  INSTRUCTOR: "EINSTRUCTOR",
  STUDENT: "ESTUDENT"
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl="https://piprojectdeploy.onrender.com"
  private userRolesSubject: BehaviorSubject<string[] | null>;
  userRoles$: Observable<string[] | null>;
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();
  private isRefreshingTokenSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isRefreshingToken$: Observable<boolean> = this.isRefreshingTokenSubject.asObservable();
  tokenRefreshed: Subject<void> = new Subject<void>();

  private userUpdatedSubject = new Subject<void>();



  constructor(private http:HttpClient,private router: Router) {
    this.userRolesSubject = new BehaviorSubject<string[] | null>(this.getUserRole());
    this.userRoles$ = this.userRolesSubject.asObservable();
  }
  getToken() {
    return localStorage.getItem('access_token');
  }
  getUserRole(): string[] | null {
    const token = this.getToken();
    if (!token) return null;
    const decodedToken: any = jwtDecode(token);
    console.log("User Roles:", decodedToken.roles);
    return decodedToken.roles;
  }
  login(user:any)
  {
    return this.http.post(`${this.baseUrl}/user/login`,user).pipe(
      tap((res:any)=>localStorage.setItem('access_token',res.access_token)),
      tap((res:any)=>localStorage.setItem('refresh_token',res.refresh_token)),

    )

  }
  getPermissionFromToken()
  {
    const token = this.getToken();
    if (!token) return null;
    const decodedToken: any = jwtDecode(token);
    return decodedToken.permissions;

  }
  updateUserRole() {
    const roles = this.getUserRole();
    this.userRolesSubject.next(roles);
  }
  logout(): Observable<any> {
    return this.http.post(`${this.baseUrl}/user/logout`, {}).pipe(
      tap(() => {
        localStorage.clear();
      })
    );
  }

getUserIdFromToken(){
  const token = this.getToken();
  if (!token) return null;
  const decodedToken: any = jwtDecode(token);
  return decodedToken.sub;

}
getUserById(id:any)
{
  return this.http.get(`${this.baseUrl}/user/getUserById/${id}`);
}
getUserImage(imageName:string)
{
  return this.http.get(`${this.baseUrl}/user/profile-image/${imageName}`, { responseType: 'blob' })

}
uploadImage(file: File):Observable<any>
{
  const formData: FormData = new FormData();
  formData.append('file', file, file.name);

  return this.http.post<any>(`${this.baseUrl}/user/upload`, formData);

}
getOtp(email:any)
{
  return this.http.post(`${this.baseUrl}/user/sendOtp`,{email});
}
resetPassword(body:any)
{
  return this.http.post(`${this.baseUrl}/user/reset-password`,body);
}
signup(user:any)
{
  return this.http.post(`${this.baseUrl}/user/signup`,user);

}
getAllUserExceptSuperAdmin()
{
  return this.http.get(`${this.baseUrl}/user/getAllUsers`);

}
updatePermissionAndRoles(userId:any,body:any)
{
  return this.http.patch(`${this.baseUrl}/user/updateRolesPermissions/${userId}`,body, { responseType: 'text' });

}
  getUserUpdatedSubject() {
    return this.userUpdatedSubject.asObservable();
  }

  emitUserUpdated() {
    this.userUpdatedSubject.next();
  }
  deleteUserAccount(userId:any)
  {
    return this.http.delete(`${this.baseUrl}/user/deleteUser/${userId}`, { responseType: 'text' })
  }
  loginWithFaceRecognition(capturedImage: string): Observable<any> {

    return this.http.post<any>(`${this.baseUrl}/user/login-face-recognition`, { userImageUrl: capturedImage }).pipe(
      tap((res:any)=>{

        if (res && res.tokens && res.tokens.access_token && res.tokens.refresh_token) {
          localStorage.setItem('access_token', res.tokens.access_token);
          localStorage.setItem('refresh_token', res.tokens.refresh_token);
        }

      })
    );
  }
  refreshToken(): Observable<any> {

    // Retrieve the refresh token from local storage
    const refreshToken = localStorage.getItem('refresh_token');
    if (!refreshToken) {
      return throwError('No refresh token found.');
    }

    // Set up the headers to include the refresh token
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${refreshToken}`
    });

    return this.http.post<any>(`${this.baseUrl}/user/refresh`, null, { headers })
      .pipe(
        tap((tokens: { access_token: string, refresh_token: string }) => {
          this.storeTokens(tokens.access_token, tokens.refresh_token);
        })
      );
  }


  storeTokens(accessToken: string, refreshToken: string): void {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
  }

  findByUsername(username: string): Observable<UserI[]> {
    return this.http.get<UserI[]>(`${this.baseUrl}/user/find-by-username?username=${username}`).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error fetching users:', error);
        // Check if the error is due to unexpected HTML response
        if (error.status === 200 && error.error instanceof ProgressEvent) {
          console.error('HTML error response detected. Returning empty array.');
          return of([]); // Return an empty array as fallback
        }
        // For other errors, rethrow the error
        return throwError(error);
      })
    );
  }

  geLoggedInUser(): Observable<UserI> {
    const token = this.getToken();
    if (token) {
      const decodedToken: any = jwtDecode(token);
      const userId = decodedToken.sub; 
      return this.getUserById(userId);
    }
    return null;
  }
 

  








}
