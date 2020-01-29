/*
Copyright HCL Technologies Ltd. 2001, 2020
Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
*/

import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContactsService } from '../contacts.service';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.css']
})
export class ContactDetailsComponent implements OnInit {
  selected: any;
  loading: boolean = false;
  contactFound: boolean = false;
  private sub1: any;
  private sub2: any;

  constructor(private route: ActivatedRoute, private service: ContactsService) { }

  ngOnInit() {
    this.sub1 = this.route.params
      .subscribe(params => {
        this.sub2 = this.service.getContactByEmail(params.email)
          .subscribe((data: any) => {
            if(data) {
              this.contactFound = true;
              this.selected = data;
            } else {
              this.contactFound = false;
            }
            this.selected = data;
          },
          error => console.error(error)
        );
      }
    );
  }

  ngOnDestroy() {
    this.sub1.unsubscribe();
    this.sub2.unsubscribe();
  }

}
