import{M as s,a as b,b as m,k as U}from"./chunk-EJY57LKY.js";import{$ as c,Ba as d,H as f,aa as T,o as p,p as l,ra as k,s as g,t as h,vc as I}from"./chunk-DGVQG36G.js";T();var a=class extends Error{};a.prototype.name="InvalidTokenError";function S(o){return decodeURIComponent(atob(o).replace(/(.)/g,(r,i)=>{let e=i.charCodeAt(0).toString(16).toUpperCase();return e.length<2&&(e="0"+e),"%"+e}))}function $(o){let r=o.replace(/-/g,"+").replace(/_/g,"/");switch(r.length%4){case 0:break;case 2:r+="==";break;case 3:r+="=";break;default:throw new Error("base64 string is not of the correct length")}try{return S(r)}catch{return atob(r)}}function u(o,r){if(typeof o!="string")throw new a("Invalid token specified: must be a string");r||(r={});let i=r.header===!0?0:1,e=o.split(".")[i];if(typeof e!="string")throw new a(`Invalid token specified: missing part #${i+1}`);let t;try{t=$(e)}catch(n){throw new a(`Invalid token specified: invalid base64 for part #${i+1} (${n.message})`)}try{return JSON.parse(t)}catch(n){throw new a(`Invalid token specified: invalid json for part #${i+1} (${n.message})`)}}I();var N=(()=>{let r=class r{constructor(e,t){this.http=e,this.router=t,this.isAuthenticatedSubject=new l(!1),this.isAuthenticated$=this.isAuthenticatedSubject.asObservable(),this.isRefreshingTokenSubject=new l(!1),this.isRefreshingToken$=this.isRefreshingTokenSubject.asObservable(),this.tokenRefreshed=new p,this.userUpdatedSubject=new p,this.userRolesSubject=new l(this.getUserRole()),this.userRoles$=this.userRolesSubject.asObservable()}getToken(){return localStorage.getItem("access_token")}getUserRole(){let e=this.getToken();if(!e)return null;let t=u(e);return console.log("User Roles:",t.roles),t.roles}login(e){return this.http.post(`${s.baseUrl}/user/login`,e).pipe(c(t=>localStorage.setItem("access_token",t.access_token)),c(t=>localStorage.setItem("refresh_token",t.refresh_token)))}getPermissionFromToken(){let e=this.getToken();return e?u(e).permissions:null}updateUserRole(){let e=this.getUserRole();this.userRolesSubject.next(e)}logout(){return this.http.post(`${s.baseUrl}/user/logout`,{}).pipe(c(()=>{localStorage.clear()}))}getUserIdFromToken(){let e=this.getToken();return e?u(e).sub:null}getUserById(e){return this.http.get(`${s.baseUrl}/user/getUserById/${e}`)}getUserImage(e){return this.http.get(`${s.baseUrl}/user/profile-image/${e}`,{responseType:"blob"})}uploadImage(e){let t=new FormData;return t.append("file",e,e.name),this.http.post(`${s.baseUrl}/user/upload`,t)}getOtp(e){return this.http.post(`${s.baseUrl}/user/sendOtp`,{email:e})}resetPassword(e){return this.http.post(`${s.baseUrl}/user/reset-password`,e)}signup(e){return this.http.post(`${s.baseUrl}/user/signup`,e)}getAllUserExceptSuperAdmin(){return this.http.get(`${s.baseUrl}/user/getAllUsers`)}updatePermissionAndRoles(e,t){return this.http.patch(`${s.baseUrl}/user/updateRolesPermissions/${e}`,t,{responseType:"text"})}getUserUpdatedSubject(){return this.userUpdatedSubject.asObservable()}emitUserUpdated(){this.userUpdatedSubject.next()}deleteUserAccount(e){return this.http.delete(`${s.baseUrl}/user/deleteUser/${e}`,{responseType:"text"})}loginWithFaceRecognition(e){return this.http.post(`${s.baseUrl}/user/login-face-recognition`,{userImageUrl:e}).pipe(c(t=>{t&&t.tokens&&t.tokens.access_token&&t.tokens.refresh_token&&(localStorage.setItem("access_token",t.tokens.access_token),localStorage.setItem("refresh_token",t.tokens.refresh_token))}))}refreshToken(){let e=localStorage.getItem("refresh_token");if(!e)return h("No refresh token found.");let t=new b({"Content-Type":"application/json",Authorization:`Bearer ${e}`});return this.http.post(`${s.baseUrl}/user/refresh`,null,{headers:t}).pipe(c(n=>{this.storeTokens(n.access_token,n.refresh_token)}))}storeTokens(e,t){localStorage.setItem("accessToken",e),localStorage.setItem("refreshToken",t)}findByUsername(e){return this.http.get(`${s.baseUrl}/user/find-by-username?username=${e}`).pipe(f(t=>(console.error("Error fetching users:",t),t.status===200&&t.error instanceof ProgressEvent?(console.error("HTML error response detected. Returning empty array."),g([])):h(t))))}geLoggedInUser(){let e=this.getToken();if(e){let n=u(e).sub;return this.getUserById(n)}return null}getUserNameById(e){return this.http.get(`${s.baseUrl}/user/getUserNameById/${e}`)}};r.\u0275fac=function(t){return new(t||r)(d(m),d(U))},r.\u0275prov=k({token:r,factory:r.\u0275fac,providedIn:"root"});let o=r;return o})();export{N as a};