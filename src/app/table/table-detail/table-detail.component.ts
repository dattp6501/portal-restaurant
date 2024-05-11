import { Component, OnInit } from '@angular/core';
import { TAbleService } from '../../service/table.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-table-detail',
  templateUrl: './table-detail.component.html',
  styleUrl: './table-detail.component.css'
})
export class TableDetailComponent implements OnInit{
  tableForm!: FormGroup;
  public isCreate:boolean=true;
  constructor(private router: Router, private route: ActivatedRoute, private spinner: NgxSpinnerService, 
    private tableService: TAbleService, private formBuilder: FormBuilder){
    this.tableForm = this.mapTableToForm(null);
  }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['table_id'];
      if(id=='new'){
        this.tableForm = this.mapTableToForm(null);
      }else if(parseInt(id)){
        this.isCreate = false;
        this.spinner.show();
        this.getTableDetail(id);
      }else{
        this.router.navigate(['/table'], {});
      }
      
    });
  }

  get ft() { return this.tableForm.controls; }
  getTableDetail(table: any){
    this.tableService.getTableDetail(table, (table)=>{
        this.tableForm = this.mapTableToForm(table);
        this.spinner.hide();
    });
  }
  updateTable(){
    this.spinner.show();
    let reqData = this.mapFormToTable(this.tableForm);
    if(this.isCreate){
      this.tableService.createTable(reqData,(respData)=>{
        this.spinner.hide();
        this.router.navigate(['/table'], {});
      });
    }else{
      this.tableService.updateTable(reqData,(respData)=>{
        this.spinner.hide();
        this.ngOnInit();
      });
    }
  }

  mapFormToTable(tableForm: FormGroup){
    let ft = tableForm.controls;
    return {
      "id": ft['id'].value,
      "name": ft['name'].value,
      "image": ft['image'].value,
      "from": ft['from'].value,
      "to": ft['to'].value,
      "state": ft['state'].value,
      "description": ft['description'].value,
      "price": ft['price'].value,
      "amountOfPeople": ft['amountOfPeople'].value
    }
  }

  mapTableToForm(table: any){
    if(table == undefined || table == null){
      return this.formBuilder.group({
        id: [null],
        name: ['', Validators.required],
        image: ['', Validators.required],
        amountOfPeople: [0, Validators.required],
        price: [0, Validators.required],
        from: ['', Validators.required],
        to: ['', Validators.required],
        state: ['INACTIVE', Validators.required],
        description: ['']
      });
    }else{
      return this.formBuilder.group({
        id: [table.id],
        name: [table.name, Validators.required],
        image: [table.image, Validators.required],
        amountOfPeople: [0, Validators.required],
        price: [table.price, Validators.required],
        state: [table.state, Validators.required],
        from: [table.from, Validators.required],
        to: [table.to, Validators.required],
        description: [table.description],
        createAt: [table.createAt],
        updateAt: [table.updateAt]
      });
    }
    
  }
}
