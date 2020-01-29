/*
Copyright HCL Technologies Ltd. 2001, 2020
Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
*/

import { Component, OnInit, OnDestroy } from '@angular/core';
import { ContactsService } from '../contacts.service';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
  contacts: any[];
  query: string = '';
  private sub: any;

  constructor(private service: ContactsService) { }

  ngOnInit() {
    this.refreshContactList();
  }

  refreshContactList() {
    this.query = '';
    this.sub = this.service.getContactList()
      .subscribe((data: any) => {
        this.contacts = data;
      },
      error => console.error(error)
    );
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
