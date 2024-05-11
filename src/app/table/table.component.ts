import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { TAbleService } from '../service/table.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent implements OnInit{
  public TABLE_TABLE_CONFIG: any;
  public dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private router: Router, private spinner: NgxSpinnerService, private tableService: TAbleService){
    this.TABLE_TABLE_CONFIG = {
      header: ['id', 'image', 'name', 'size', 'start-end', 'price', 'state', 'createAt', 'action'],
      pageSizeOptions: [5, 10, 25, 100],
      totalLength: 10
    };
  }
  ngOnInit(): void {
    this.spinner.show();
    this.getListTable(this.TABLE_TABLE_CONFIG.pageSizeOptions[0], 0);
  }

  getListTable(size: any, page: any){
    let reqData = {
      "size": size,
      "page": page
    }
    this.tableService.getListTable(reqData, (dishs)=>{
      this.dataSource = new MatTableDataSource<any>(dishs);
      this.dataSource.paginator = this.paginator;
      this.dataSource.paginator.length = 10;
      this.spinner.hide();
    });
  }
  onPageChange(event: any) {
    this.spinner.show();
    this.getListTable(this.paginator.pageSize, 0);
  }
  getColorState(state: any){
    if(state=='ACTIVE') return '#197003b7';
    else return '#30201bb7';
  }

  editTable(tableId: any){
    this.router.navigate(['/table/'+tableId], {});
  }

  createTable(){
    this.router.navigate(['/table/new'], {});
  }
}
