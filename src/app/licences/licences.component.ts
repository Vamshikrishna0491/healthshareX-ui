import { Component, OnInit } from '@angular/core';
import { Licence } from '../shared/models/licences';
import { LicencesService } from './licences.service';

@Component({
  selector: 'app-licences',
  templateUrl: './licences.component.html',
  styleUrls: ['./licences.component.css']
})
export class LicencesComponent implements OnInit {
  licenceList: Licence[];
  constructor(private licencesService:LicencesService) { }

  ngOnInit() {

   this.licencesService.getAllLicences().subscribe(response => {
     console.log("RESPONSE");
     this.licenceList = response;
   });


    this.licenceList = [ {
      "licenseId": 1,
      "licenseType": "Basic",
      "description": "Monthly Basic",
      "licenseAmount": 25.00,
      "clinicalUserCount": 1,
      "nonClinicalUserCount": 1,
      "adminUserCount": 1
  },
  {
      "licenseId": 2,
      "licenseType": "Pro",
      "description": "Monthly Pro",
      "licenseAmount": 45.00,
      "clinicalUserCount": 2,
      "nonClinicalUserCount": 1,
      "adminUserCount": 1
  },
  {
      "licenseId": 3,
      "licenseType": "Prime",
      "description": "Yearly Basic",
      "licenseAmount": 45.00,
      "clinicalUserCount": 4,
      "nonClinicalUserCount": 2,
      "adminUserCount": 1
  },
  {
      "licenseId": 4,
      "licenseType": "Premier",
      "description": "Yearly Pro",
      "licenseAmount": 55.00,
      "clinicalUserCount": 4,
      "nonClinicalUserCount": 3,
      "adminUserCount": 2
  }
]
  }

}
