import { Component, OnInit } from '@angular/core';
import { DishService } from '../service/dish.service';

@Component({
  selector: 'app-dish',
  templateUrl: './dish.component.html',
  styleUrl: './dish.component.css'
})
export class DishComponent implements OnInit{
  constructor(private dishService: DishService){

  }
  ngOnInit(): void {
    this.getListDish();
  }

  getListDish(){
    this.dishService.getListDish((dish)=>{
      
    });
  }

}
