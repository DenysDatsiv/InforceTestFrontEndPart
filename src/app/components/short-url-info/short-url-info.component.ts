import {Component, OnInit} from '@angular/core';
import {ActivatedRoute,} from '@angular/router';
import {ShortUrlInfoService} from "../../services/short-url-info.service";
import {Location} from '@angular/common';
interface Link {
  id: number;
  originalUrl: string;
  shortenerUrl: string;
  createdBy: string;
  createdDate: Date;
}

@Component({
  selector: 'app-short-url-info',
  templateUrl: './short-url-info.component.html',
  styleUrls: ['./short-url-info.component.css'],
})
export class ShortUrlInfoComponent implements OnInit {
  shortUrlInfo: Link;

  constructor(
    private activatedRoute: ActivatedRoute,
    private shortUrlInfoService: ShortUrlInfoService,
    private location: Location
  ) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      const id = +params['id'];

      const token = localStorage.getItem('jwt');

      this.shortUrlInfoService.getShortUrlInfoById(id, token).subscribe(
        (response: Link) => {
          this.shortUrlInfo = response;
        },
        (error) => {
          console.error(`Error fetching Short URL Info for ID ${id}:`, error);
        }
      );
    });
  }

  goBack() {
    this.location.back();
  }
}
