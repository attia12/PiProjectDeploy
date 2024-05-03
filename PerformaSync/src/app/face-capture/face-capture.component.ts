import {AfterViewInit, Component, ElementRef, OnDestroy, ViewChild} from '@angular/core';
import {WebcamImage, WebcamModule} from "ngx-webcam";
import {Subject} from "rxjs";
import {NgIf} from "@angular/common";
import {UserService} from "../services/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-face-capture',
  standalone: true,
  imports: [
    WebcamModule,
    NgIf
  ],
  templateUrl: './face-capture.component.html',
  styleUrl: './face-capture.component.css'
})
export class FaceCaptureComponent implements AfterViewInit, OnDestroy {

  @ViewChild('video') videoElement!: ElementRef<HTMLVideoElement>;

  public capturedImage: WebcamImage | undefined;
  public triggerObservable: Subject<void> = new Subject<void>();
  private mediaStream: MediaStream | null = null;

  constructor(private userService: UserService,private router:Router) { }

  ngAfterViewInit(): void {
    this.initWebcam();
  }

  ngOnDestroy(): void {
    this.stopMediaTracks();
  }

  triggerSnapshot(): void {
    this.takeSnapshot();
  }

  private initWebcam(): void {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then((stream) => {
        this.mediaStream = stream;
        const videoElement = this.videoElement.nativeElement;
        if (videoElement) {
          videoElement.srcObject = stream;
          videoElement.play();
        }
      })
      .catch((err) => {
        console.error('Error accessing camera:', err);
      });
  }

  private takeSnapshot(): void {
    const videoElement = this.videoElement.nativeElement;
    if (videoElement) {
      const canvas = document.createElement('canvas');
      canvas.width = videoElement.videoWidth;
      canvas.height = videoElement.videoHeight;
      const context = canvas.getContext('2d');
      if (context) {
        context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
        const imageDataUrl = canvas.toDataURL('image/jpeg');

        // Create empty ImageData object
        const emptyImageData = new ImageData(canvas.width, canvas.height);

        // Create WebcamImage object with emptyImageData as the third argument
        const webcamImage = new WebcamImage(imageDataUrl, 'image/jpeg', emptyImageData);
        this.capturedImage = webcamImage;

        console.log("this the image captured ",imageDataUrl)
        this.userService.loginWithFaceRecognition(imageDataUrl).subscribe((res)=>{
          console.log("this is the login with face ",res)
          this.userService.updateUserRole()
          if (res && res.user && res.user.roles) {
            const roles = res.user.roles;
            if (roles.includes('superadmin') || roles.includes('admin')) {
              this.router.navigate(['/back']);
            } else if (roles.includes('company')) {
              this.router.navigate(['/company-dashboard']);
            } else if (roles.includes('employee')) {
              this.router.navigate(['/back']);
            } else {
              console.log("Unknown roles");
              // Navigate to a default page or handle as needed
            }
          }

        },error => {
          console.log(error);
        })
      }
    }
  }

  private stopMediaTracks(): void {
    if (this.mediaStream) {
      this.mediaStream.getTracks().forEach(track => track.stop());
      this.mediaStream = null;
    }
  }
}
