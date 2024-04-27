import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { RotateDirective } from '../directives/rotate.directive';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [NgFor, MatButton, MatIcon, RotateDirective],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss',
})
export class GalleryComponent {
  photos = [
    {
      id: 1,
      title: 'Photo 1',
      src: 'assets/gallery_photo_1.jpg',
    },
    {
      id: 2,
      title: 'Photo 2',
      src: 'assets/gallery_photo_2.jpg',
    },
    {
      id: 3,
      title: 'Photo 3',
      src: 'assets/gallery_photo_3.jpg',
    },
    {
      id: 4,
      title: 'Photo 4',
      src: 'assets/gallery_photo_4.jpg',
    },
    {
      id: 5,
      title: 'Photo 5',
      src: 'assets/gallery_photo_5.jpg',
    },
    {
      id: 6,
      title: 'Photo 6',
      src: 'assets/gallery_photo_6.jpg',
    },
    {
      id: 7,
      title: 'Photo 7',
      src: 'assets/gallery_photo_7.jpg',
    },
    {
      id: 8,
      title: 'Photo 8',
      src: 'assets/gallery_photo_8.jpg',
    },
  ];
  selectedPhoto: any;
  currentPage: number = 0;
  pageSize: number = 3;
  currentSize: number = 50;
  slideshowInterval: any;

  constructor(private snackBar: MatSnackBar) {
    this.selectedPhoto = this.photos[0];
  }

  selectPhoto(photo: any) {
    this.selectedPhoto = photo;
  }

  previousPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
    }
  }

  nextPage() {
    const lastPage = Math.ceil(this.photos.length / this.pageSize) - 1;
    if (this.currentPage < lastPage) {
      this.currentPage++;
    }
  }

  getDisplayedPhotos() {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = Math.min(startIndex + this.pageSize, this.photos.length);
    return this.photos.slice(startIndex, endIndex);
  }

  previousPhoto() {
    const index = this.photos.indexOf(this.selectedPhoto);
    if (index > 0) {
      this.selectedPhoto = this.photos[index - 1];
      if (index % this.pageSize === 0) {
        this.previousPage();
      }
    }
  }

  nextPhoto() {
    const index = this.photos.indexOf(this.selectedPhoto);
    if (index < this.photos.length - 1) {
      this.selectedPhoto = this.photos[index + 1];
      if ((index + 1) % this.pageSize === 0) {
        this.nextPage();
      }
    }
  }

  increaseSize() {
    if (this.currentSize < 100) {
      this.currentSize += 10;
    } else {
      this.snackBar.open('You have reached the maximum size!', 'Close', {
        duration: 3000,
      });
    }
  }

  decreaseSize() {
    if (this.currentSize > 30) {
      this.currentSize -= 10;
    } else {
      this.snackBar.open('You have reached the minimum size!', 'Close', {
        duration: 3000,
      });
    }
  }

  playSlideshow() {
    this.stopSlideshow();
    this.slideshowInterval = setInterval(() => {
      this.nextPhoto();
    }, 2000);
  }

  stopSlideshow() {
    clearInterval(this.slideshowInterval);
  }
}
