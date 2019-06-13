import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ICompany } from '../company/company';
import { CompanyService } from '../company/company.service';

@Component({
  templateUrl: './company-detail.component.html',
  styleUrls: ['./company-detail.component.css']
})
export class CompanyDetailComponent implements OnInit {
  pageTitle = 'Company Detail';
  errorMessage = '';
  company: ICompany | undefined;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private companyService: CompanyService) {
  }

  ngOnInit() {
   
    const param = this.route.snapshot.paramMap.get('id');
    if (param) {
      const id = +param;
      this.getCompany(id);
    }
  }

  getCompany(id: number) {
    this.companyService.getCompany(id).subscribe(
      company => this.company = company,
      error => this.errorMessage = <any>error);
  }

  onBack(): void {
    
    this.router.navigate(['/company']);
  }

}
