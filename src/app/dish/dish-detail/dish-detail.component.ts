import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DishService } from '../../service/dish.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-dish-detail',
  templateUrl: './dish-detail.component.html',
  styleUrl: './dish-detail.component.css'
})
export class DishDetailComponent implements OnInit{
  dishForm!: FormGroup;
  constructor(private route: ActivatedRoute, private spinner: NgxSpinnerService, private dishService: DishService, private formBuilder: FormBuilder){

  }
  ngOnInit(): void {
    this.spinner.show();
    this.route.params.subscribe(params => {
      const id = params['dish_id'];
      this.getDishDetail(id);
    });
  }

  get fd() { return this.dishForm.controls; }
  getDishDetail(dishId: any){
    this.dishService.getDishDetail(dishId, (dish)=>{
        this.dishForm = this.mapDishToForm(dish);
        this.spinner.hide();
    });
  }
  updateDish(){
    this.spinner.show();
    let dishReq = this.mapFormToDish(this.dishForm);
    this.dishService.updateDish(dishReq,(respData)=>{
      this.spinner.hide();
    })
  }

  mapFormToDish(dishForm: FormGroup){
    let fd = dishForm.controls;
    return {
      "id": fd['id'].value,
      "name": fd['name'].value,
      "image": fd['image'].value,
      "state": fd['state'].value,
      "description": fd['description'].value,
      "price": fd['price'].value
    }
  }

  mapDishToForm(dish: any){
    return this.formBuilder.group({
      id: [dish.id],
      name: [dish.name, Validators.required],
      image: [dish.image, Validators.required],
      price: [dish.price, Validators.required],
      state: [dish.state, Validators.required],
      description: [dish.description],
      createAt: [dish.createAt],
      updateAt: [dish.updateAt]
    });
  }

}
