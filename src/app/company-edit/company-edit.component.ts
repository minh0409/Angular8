import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup,Validators , FormControl} from '@angular/forms';
import { ICompany } from '../company/company';
import { CompanyService } from '../company/company.service';
import { Observable, Subscription, fromEvent, merge } from 'rxjs';

@Component({
  selector: 'app-company-edit',
  templateUrl: './company-edit.component.html',
  styleUrls: ['./company-edit.component.css']
})
export class CompanyEditComponent implements OnInit {

  pageTitle = 'Product Edit';
  private sub: Subscription;

  public listItems: Array<string> = [
    'Researching',
    'Pending Approval',
    'Approved',
    'Declined'
  ];

  public stateItems: Array<string> = [
  'Alabama','Alaska','American Samoa','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','District of Columbia','Federated States of Micronesia','Florida','Georgia','Guam','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Marshall Islands','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Northern Mariana Islands','Ohio','Oklahoma','Oregon','Palau','Pennsylvania','Puerto Rico','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virgin Island','Virginia','Washington','West Virginia','Wisconsin','Wyoming'
  ];

  
  editForm = new FormGroup({
    CompanyName: new FormControl(''),
    FirstName:   new FormControl(''),
    LastName:    new FormControl(''),
    Email:       new FormControl(''),
    PhoneNumber: new FormControl(''),
    Status:      new FormControl(''),
    Profit:      new FormControl(''),
    Orders:      new FormControl(''),
    Street:      new FormControl(''),
    City:        new FormControl(''),
    State:       new FormControl(''),
    ZipCode:     new FormControl(''),
  });  

  errorMessage = '';

    /* initialize object very important */
  company = {
      Name: "",
      Contacts:
      {
        FirstName: "",
        LastName: "",
        Email: "",
        PhoneNumber: "",
      },
      Status: "",
      Financial:
      {
        Profit: 0,
        Orders: 0
      },
      Address:
      {
        Street: "",
        City: "",
        State: "",
        ZipCode: ""
      }
    } as ICompany;

  constructor(private fb: FormBuilder, private route: ActivatedRoute,
    private router: Router,
    private companyService: CompanyService) { }

  ngOnInit() {

    this.editForm = this.fb.group({
      CompanyName: [''],
      FirstName:   [''],
      LastName:    [''],
      Email:       [''],
      PhoneNumber: [''], 
      Status:      [''],
      Profit:      [''],
      Orders:      [''],
      Street:      [''],
      City:        [''],
      State:       [''],
      ZipCode:     [''],
    });

    // Read company Id from the route parameter
    this.sub = this.route.paramMap.subscribe(
      params => {
        const id = +params.get('id');
        this.getCompany(id);
      }
    );
  }
  
  onEdit(): void {

    this.company.Name                 = this.editForm.value.CompanyName;
    this.company.Contacts.FirstName   = this.editForm.value.FirstName;
    this.company.Contacts.LastName    = this.editForm.value.LastName;
    this.company.Contacts.Email       = this.editForm.value.Email;
    this.company.Contacts.PhoneNumber = this.editForm.value.PhoneNumber;
    this.company.Status               = this.editForm.value.Status;
    this.company.Financial.Profit     = this.editForm.value.Profit;
    this.company.Financial.Orders     = this.editForm.value.Orders;
    this.company.Address.Street       = this.editForm.value.Street;
    this.company.Address.City         = this.editForm.value.City;
    this.company.Address.State        = this.editForm.value.State;
    this.company.Address.ZipCode      = this.editForm.value.ZipCode;

    this.companyService.updateCompany(this.company)
    .subscribe(
      () => this.onSaveComplete(),
      (error: any) => this.errorMessage = <any>error
    );
  }

  onSaveComplete(): void {
    // Reset the form to clear the flags
    this.editForm.reset();
    this.router.navigate(['/companyList']);
  }

  getCompany(id: number): void {
    this.companyService.getCompany(id)
      .subscribe(
        (company: ICompany) => this.displayCompany(company),
        (error: any) => this.errorMessage = <any>error
      );
  }

  displayCompany(company: ICompany): void {
    if (this.editForm) {
      this.editForm.reset();
    }
    this.company = company;

    // Update the data on the form
    this.editForm.patchValue({
      CompanyName : this.company.Name,              
      FirstName   : this.company.Contacts.FirstName,  
      LastName    : this.company.Contacts.LastName,  
      Email       : this.company.Contacts.Email,       
      PhoneNumber : this.company.Contacts.PhoneNumber, 
      Status      : this.company.Status,               
      Profit      : this.company.Financial.Profit,     
      Orders      : this.company.Financial.Orders,     
      Street      : this.company.Address.Street,       
      City        : this.company.Address.City,         
      State       : this.company.Address.State,      
      ZipCode     : this.company.Address.ZipCode
    });
    
  }

}
