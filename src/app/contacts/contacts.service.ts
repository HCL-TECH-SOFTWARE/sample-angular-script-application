/*
Copyright HCL Technologies Ltd. 2001, 2020
Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
*/


import {of as observableOf,  Observable } from 'rxjs';

import {share, map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';




@Injectable()
export class ContactsService {
  private contacts: any[];
  private requestInProgress: Observable<any>;

  constructor(public http: HttpClient) { }

  getContactList() {
    if(this.contacts) {
      // cached data
      return observableOf(this.contacts); 
    } else if(this.requestInProgress) {
      // request in progress
      return this.requestInProgress;
    } else {
      this.requestInProgress = this.http.get('assets/contacts.json').pipe(
      map((res: any) => {
        // clear progress Observable
        this.requestInProgress = null;
        // return the data

          this.contacts = res;
          return this.contacts;
        
      }),
      share(),);
      return this.requestInProgress;
    }
  }

  getContactByEmail(email: string) {
    return this.getContactList().pipe(
      map((data: any) => {
        return data.find(item => item.email === email)
      }
    ));
  }

}
