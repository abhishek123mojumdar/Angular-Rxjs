import { Injectable } from '@angular/core';

@Injectable()
export class UtilityService {
  constructor() {}

  printData(id, val) {
    let htmlElement = document.getElementById(id);
    let list = document.createElement('li');
    list.innerText = val;
    htmlElement.appendChild(list);
  }
}
