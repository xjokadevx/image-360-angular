import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-camera',
  standalone: true,
  imports: [],
  templateUrl: './camera.component.html',
  styleUrl: './camera.component.css',
})
export class CameraComponent implements OnInit {
  @ViewChild('video', { static: true }) videoElement!: ElementRef;
  @ViewChild('canvas', { static: true }) canvasElement!: ElementRef;
  photo: string | null = null;

  constructor() {}

  ngOnInit(): void {
    if (this.isInBrowser()) {
      this.startCamera();
    }
  }

  isInBrowser(): boolean {
    return typeof navigator !== 'undefined' && !!navigator.mediaDevices;
  }

  startCamera() {
    const video = this.videoElement.nativeElement;
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          video.srcObject = stream;
          video.play();
        })
        .catch((err) => {
          console.error('Error accessing camera: ', err);
        });
    } else {
      console.error('MediaDevices API not supported.');
    }
  }

  takePhoto() {
    const video = this.videoElement.nativeElement;
    const canvas = this.canvasElement.nativeElement;
    const context = canvas.getContext('2d');

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    if (context) {
      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      // Load the car image and draw it in the center of the canvas
      const carImage = new Image();
      carImage.src = 'assets/car.png';
      carImage.onload = () => {
        const carWidth = 200; // Adjust the size of the car image as needed
        const carHeight = carImage.height * (carWidth / carImage.width);
        const x = (canvas.width - carWidth) / 2;
        const y = (canvas.height - carHeight) / 2;
        context.drawImage(carImage, x, y, carWidth, carHeight);

        // Save the canvas as a photo
        this.photo = canvas.toDataURL('image/png');
      };
    }
  }
}
