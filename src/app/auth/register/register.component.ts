import { Component, OnInit } from '@angular/core';
import { Form } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  onSubmit(data: any) {
    console.log('Data: ', data);

  }

}
