import { Component, OnInit } from '@angular/core';
import { ICompany } from '../company/company';
import { CompanyService } from '../company/company.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-companylist',
  templateUrl: './companylist.component.html',
  styleUrls: ['./companylist.component.css']
})
export class CompanylistComponent implements OnInit {

  companies: ICompany[] = [];
  errorMessage = '';
  
  public selectedName:any;
  
  // highligh the selected row
  highlightRow(company: ICompany): void {
    this.selectedName = company.Name;
  }

  constructor(private companyService: CompanyService,
    private route: ActivatedRoute,
    private router: Router
    ) {

  }

  delete(company: ICompany): void
  {
    this.companies = this.companies.filter(h => h !== company);
    this.companyService.deleteCompany(company.ID).subscribe();
  }

  edit(company: ICompany): void
  {
    //console.log(company.ID);
    
    this.router.navigate(['/company/edit', company.ID]);
  }

  ngOnInit() {
    this.companyService.getCompanies().subscribe(
      companies => {
        this.companies = companies;
        // sort array by ID
        companies.sort((a, b) => (a.ID < b.ID) ? 1 : -1)
      },
      error => this.errorMessage = <any>error
    );
    
   
  }

}
