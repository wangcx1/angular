import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ProductService, Table} from "../shared/product.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ModalDirective} from "ngx-bootstrap";
import {Headers, Http} from "@angular/http";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  tables: Table[];
  table: Table[];
  formModel: FormGroup;
  greets: string;
  @ViewChild(ModalDirective) public lgModal: ModalDirective;
  @ViewChild('greets') todoName: ElementRef;

  constructor(private productservice: ProductService,
              fb: FormBuilder,
              private http: Http) {
    this.formModel = fb.group({
      name: ['', [Validators.required]],
      sex: ['', [Validators.required]],
      phonenumber: ['', this.numberValidators],
      address: ['', [Validators.required]]
    });
  }

  ngOnInit() {
    this.productservice.getTables().subscribe(tables => {
      this.tables = tables;
    });
  }

  onSubmit(id: number) {
    let myHeaders: Headers = new Headers();
    myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');
    if (this.todoName.nativeElement.innerText == '添加内容') {
      // this.tables.push(this.formModel.value);
      // console.log(this.formModel.value);
      this.http.post('/api/tables', JSON.stringify(this.formModel.value), {headers: myHeaders}).map(
        res => res.json()).subscribe(data => {
        this.tables = data;
      });
      this.lgModal.hide();
    }
    if (this.todoName.nativeElement.innerText == '编辑内容') {
      this.formModel.value['id'] = id;
      console.log(this.formModel.value);
      this.http.post('/api/tables/edits/' + id, JSON.stringify(this.formModel.value), {headers: myHeaders}).map(
        res => res.json()).subscribe(data => {
        this.tables = data;
      });
    }
    this.lgModal.hide();
  }

  numberValidators(control: FormControl): any {
    let regs = /^1[0-9]{10}$/;
    if (!control.value) {
      return null;
    }
    let valids = regs.test(control.value);
    return valids ? null : {phonenumber: true};
  }

  addTable() {
    this.todoName.nativeElement.innerText = '添加内容';
    this.table = [{id: null, name: '', phonenumber: '', address: '', sex: '男'}];
    this.lgModal.show();
  }

  editTable(id: number) {
    this.todoName.nativeElement.innerText = '编辑内容';
    this.lgModal.show();
    this.http.get('/api/tables/edit/' + id).map(
      res => res.json()).subscribe(table => {
      this.table = table;
    });
  }

  deleteTable(id: number) {
    this.http.get('/api/tables/delete/' + id).map(
      res => res.json()).subscribe(data => {
      this.tables = data;
    });
  }
}
