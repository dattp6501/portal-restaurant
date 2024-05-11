import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { DishService } from '../service/dish.service';

import {AfterViewInit, ViewChild} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-dish',
  templateUrl: './dish.component.html',
  styleUrl: './dish.component.css',
})
export class DishComponent implements OnInit, AfterViewInit{
  public TABLE_DISH_CONFIG: any;
  public dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private router: Router, private spinner: NgxSpinnerService, private dishService: DishService){
    this.TABLE_DISH_CONFIG = {
      header: ['id', 'image', 'name', 'price', 'state', 'createAt', 'action'],
      pageSizeOptions: [5, 10, 25, 100],
      totalLength: 10
    };
  }
  ngAfterViewInit(): void {
    // this.dataSource.paginator = this.paginator;
  }
  ngOnInit(): void {
    this.spinner.show();
    this.getListDish(this.TABLE_DISH_CONFIG.pageSizeOptions[0], 0);
  }

  getListDish(size: any, page: any){
    let reqData = {
      "size": size,
      "page": page
    }
    this.dishService.getListDish(reqData, (dishs)=>{
      this.dataSource = new MatTableDataSource<any>(dishs);
      this.dataSource.paginator = this.paginator;
      this.dataSource.paginator.length = 10;
      this.spinner.hide();
    });
  }
  onPageChange(event: any) {
    this.spinner.show();
    this.getListDish(this.paginator.pageSize, 0);
  }
  getColorState(state: any){
    if(state=='ACTIVE') return '#197003b7';
    else return '#30201bb7';
  }

  editDish(dishId: any){
    this.router.navigate(['/dish/'+dishId], {});
  }

  createDish(){
    this.router.navigate(['/dish/new'], {});
  }
}