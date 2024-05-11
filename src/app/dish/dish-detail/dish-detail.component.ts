import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  public isCreate:boolean=true;
  constructor(private router: Router, private route: ActivatedRoute, private spinner: NgxSpinnerService, private dishService: DishService, private formBuilder: FormBuilder){
    this.dishForm = this.mapDishToForm(null);
  }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['dish_id'];
      if(id=='new'){
        this.dishForm = this.mapDishToForm(null);
      }else if(parseInt(id)){
        this.isCreate = false;
        this.spinner.show();
        this.getDishDetail(id);
      }else{
        this.router.navigate(['/dish'], {});
      }
      
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
    if(this.isCreate){
      this.dishService.createDish(dishReq,(respData)=>{
        this.spinner.hide();
        this.router.navigate(['/dish'], {});
      });
    }else{
      this.dishService.updateDish(dishReq,(respData)=>{
        this.spinner.hide();
        this.ngOnInit();
      });
    }
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
    if(dish == undefined || dish == null){
      return this.formBuilder.group({
        id: [-1],
        name: ['', Validators.required],
        image: ['', Validators.required],
        price: [0, Validators.required],
        state: ['INACTIVE', Validators.required],
        description: ['']
      });
    }else{
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

}
