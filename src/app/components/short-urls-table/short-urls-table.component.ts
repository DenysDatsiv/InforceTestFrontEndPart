import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {NgTinyUrlService} from 'ng-tiny-url';
import {UrlTablesService} from '../../services/url-tables.service';

interface Link {
  id: number;
  originalUrl: string;
  shortenerUrl: string;
  createdBy: string;
  createdDate: Date;
}

@Component({
  selector: 'app-short-urls-table',
  templateUrl: './short-urls-table.component.html',
  styleUrls: ['./short-urls-table.component.css'],
})
export class ShortUrlsTableComponent implements OnInit {
  listData: Link[] = [];
  urlForm: FormGroup;
  currentId: number = 0;
  userName: string;
  role: string;
  shortenUrl: string = '';
  originalUrlExists: boolean = false;

  constructor(
    private urlTablesService: UrlTablesService,
    private formBuilder: FormBuilder,
    private router: Router,
    private tinyUrl: NgTinyUrlService,
    private activatedRoute: ActivatedRoute
  ) {
    this.urlForm = this.formBuilder.group({
      originalUrl: ['', [Validators.required, Validators.pattern('^https?://.+$')]],
    });
  }

  ngOnInit() {
    this.fetchData();

    this.activatedRoute.paramMap.subscribe(params => {
      this.role = params.get('role');
      this.userName = params.get('username');
    });
  }

  createUrl() {
    if (this.urlForm.valid) {
      const originalUrl = this.urlForm.get('originalUrl')?.value;

      if (this.isOriginalUrlUnique(originalUrl)) {
        const token = localStorage.getItem('jwt');

        if (!token) {
          console.error('JWT token is missing.');
          return;
        }

        this.tinyUrl.shorten(originalUrl).subscribe((data) => {
          this.shortenUrl = data;
          const linkData: Link = {
            id: this.currentId,
            originalUrl: originalUrl,
            shortenerUrl: this.shortenUrl,
            createdBy: this.userName,
            createdDate: new Date()
          };

          this.urlTablesService.createLink(linkData, token).subscribe(
            () => {
              this.fetchData();
              this.urlForm.reset();
              this.originalUrlExists = false;
            },
            (error) => {
              console.error('Error creating URL:', error);
            }
          );
        });
      } else {
        this.originalUrlExists = true;
      }
    }
  }

  isOriginalUrlUnique(originalUrl: string): boolean {
    return !this.listData.some((item: Link) => item.originalUrl === originalUrl);
  }

  viewMore(id: number) {
    this.router.navigate(['/short-url-info', id]);
  }

  logout() {
    localStorage.removeItem('jwt');
    this.router.navigate(['/login']);
  }

  login() {
    this.router.navigate(['/login']);
  }

  fetchData() {
    this.urlTablesService.listLinks().subscribe(
      (data:Link[]) => {
        this.listData = data;
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }

  isUserAuthorized(): boolean {
    const token = localStorage.getItem('jwt');
    return !!token; // Returns true if the token exists, indicating authorization.
  }

  deleteUrlById(id: number) {
    const token = localStorage.getItem('jwt');

    if (!token) {
      console.error('JWT token is missing.');
      return;
    }

    this.urlTablesService.deleteLinkById(id, token).subscribe(
      () => {
        this.fetchData();
      },
      (error) => {
        console.error(`Error deleting URL with ID ${id}:`, error);
      }
    );
  }
}
