import { Component, OnInit } from '@angular/core';
import { ICompany } from './company';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyService } from '../company/company.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})

export class CompanyComponent implements OnInit {

  reactiveForm: FormGroup;
  errorMessage: string;


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
    private companyService: CompanyService)
  {}
  public listItems: Array<string> = [
      'Researching',
      'Pending Approval',
      'Approved',
      'Declined'
  ];

  public stateItems: Array<string> = [
   'Alabama','Alaska','American Samoa','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','District of Columbia','Federated States of Micronesia','Florida','Georgia','Guam','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Marshall Islands','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Northern Mariana Islands','Ohio','Oklahoma','Oregon','Palau','Pennsylvania','Puerto Rico','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virgin Island','Virginia','Washington','West Virginia','Wisconsin','Wyoming'
  ];



  onSubmit(): void {
    
    this.company.Name                 = this.reactiveForm.value.CompanyName;
    this.company.Contacts.FirstName   = this.reactiveForm.value.FirstName;
    this.company.Contacts.LastName    = this.reactiveForm.value.LastName;
    this.company.Contacts.Email       = this.reactiveForm.value.Email;
    this.company.Contacts.PhoneNumber = this.reactiveForm.value.PhoneNumber;
    this.company.Status               = this.reactiveForm.value.Status;
    this.company.Financial.Profit     = this.reactiveForm.value.Profit;
    this.company.Financial.Orders     = this.reactiveForm.value.Orders;
    this.company.Address.Street       = this.reactiveForm.value.Street;
    this.company.Address.City         = this.reactiveForm.value.City;
    this.company.Address.State        = this.reactiveForm.value.State;
    this.company.Address.ZipCode      = this.reactiveForm.value.ZipCode;

    //console.log(myCompany);
    
    this.companyService.createCompany(this.company)
    .subscribe(
      () => this.onSaveComplete(),
      (error: any) => this.errorMessage = <any>error
      )
    
  }

  onSaveComplete(): void {
    // Reset the form to clear the flags
    this.reactiveForm.reset();
    this.router.navigate(['/company']);
  }

  createForm() {
    this.reactiveForm = this.fb.group({
      CompanyName: ['',Validators.required],
      FirstName:   ['', Validators.required],
      LastName:    ['',Validators.required],
      Email:       ['',Validators.required, Validators.minLength(9)],
      PhoneNumber: ['',Validators.required, Validators.minLength(9)], 
      Status:      ['',Validators.required],
      Profit:      ['',Validators.required],
      Orders:      ['',Validators.required],
      Street:      ['',Validators.required],
      City:        ['',Validators.required],
      State:       ['',Validators.required],
      ZipCode:     ['',Validators.required,Validators.minLength(5)],
    });
  }

  ngOnInit() {
    this.createForm();
  }

}
