import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../company/company.service';
import { State, process } from '@progress/kendo-data-query';
import { ExcelExportData } from '@progress/kendo-angular-excel-export';
import { ICompany } from '../company/company';

@Component({
  selector: 'app-kendo-grid',
  templateUrl: './kendo-grid.component.html',
  styleUrls: ['./kendo-grid.component.css']
})
export class KendoGridComponent implements OnInit {

  companies: ICompany[] = [];
  errorMessage = '';
  
  public data: any[];
  public pageSize = 8;
  public skip = 0;

  public onPageChange(state: any): void {
      this.pageSize = state.take;
  }

  public state: State = {
    skip: 0,
    take: 5
};

  constructor(private companyService: CompanyService) { 
      this.allData = this.allData.bind(this);
  }

  public allData(): ExcelExportData {
    const result: ExcelExportData =  {
        data: process(this.data, { sort: [{ field: 'Name', dir: 'asc' }] }).data
    };

    return result;
}

  ngOnInit() {
    this.companyService.getCompanies().subscribe(
      companies => {
        this.companies = companies;
        this.data = companies;
      },
      error => this.errorMessage = <any>error
    );
  }

}
