import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  images: any[] = [
    {
      "previewImageSrc": "https://wallpaperstock.net/el-artista-wallpapers_32642_1440x900.jpg",
      "thumbnailImageSrc": "https://wallpaperstock.net/el-artista-wallpapers_32642_1440x900.jpg",
      "alt": "Description for Image 3",
      "title": "Title 3"
    },
    {
      "previewImageSrc": "https://images4.alphacoders.com/708/708247.jpg",
      "thumbnailImageSrc": "https://images4.alphacoders.com/708/708247.jpg",
      "alt": "Description for Image 1",
      "title": "Title 1"
    },
    {
      "previewImageSrc": "https://i.pinimg.com/736x/aa/1d/69/aa1d690bbfb6a4584b707c26bf42b346.jpg",
      "thumbnailImageSrc": "https://i.pinimg.com/736x/aa/1d/69/aa1d690bbfb6a4584b707c26bf42b346.jpg",
      "alt": "Description for Image 2",
      "title": "Title 2"
    },
    {
      "previewImageSrc": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBBorm3E6gkdwjLuKnVuSJYr8ORsR3pd5FuHOpopA7tAvzJydyrA6wMFvh2Vjgrunilgo&usqp=CAU",
      "thumbnailImageSrc": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBBorm3E6gkdwjLuKnVuSJYr8ORsR3pd5FuHOpopA7tAvzJydyrA6wMFvh2Vjgrunilgo&usqp=CAU",
      "alt": "Description for Image 4",
      "title": "Title 4"
    }
  ];
  responsiveOptions:any[] = [
    {
        breakpoint: '1024px',
        numVisible: 5
    },
    {
        breakpoint: '768px',
        numVisible: 3
    },
    {
        breakpoint: '560px',
        numVisible: 1
    }
];
  constructor() { }

  ngOnInit(): void {
  }

}
