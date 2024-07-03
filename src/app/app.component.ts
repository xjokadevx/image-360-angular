import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'image-360-angular';

  imageUrls = [
    './../../src/assets/img/1.png',
    'https://example.com/image2.jpg',
    'https://example.com/image3.jpg',
    // Add more image URLs here
  ];

  currentImageIndex = 0;

  get currentImageUrl() {
    return this.imageUrls[0];
  }

  prevImage() {
    this.currentImageIndex =
      (this.currentImageIndex - 1 + this.imageUrls.length) %
      this.imageUrls.length;
  }

  nextImage() {
    this.currentImageIndex =
      (this.currentImageIndex + 1) % this.imageUrls.length;
  }
}
