import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { FoodService } from 'src/app/services/food.service';
import { Food } from 'src/app/shared/models/Food';

@Component({
  selector: 'app-food-page',
  templateUrl: './food-page.component.html',
  styleUrls: ['./food-page.component.css']
})
export class FoodPageComponent {
  food!: Food; 

   constructor(activatedRoute:ActivatedRoute,foodService:FoodService,private router: Router,private cartService:CartService,  private cdr: ChangeDetectorRef ){
    activatedRoute.params.subscribe((params) => {
      if (params.id) {
        console.log('food id',params.id)
        // const foundFood = foodService.getFoodById(params.id);
        // this.food = foundFood.length > 0 ? foundFood[0] : undefined; 
        foodService.getFoodById(params.id).subscribe(serverFood=>{
          this.food=serverFood;
          console.log(this.food)
          this.cdr.detectChanges();
        });
      }
    });
   }

   addToCart() {
    if (this.food) { // Check if food is defined
      console.log(`food added to cart!`,this.food);
      this.cartService.addToCart(this.food);
      this.router.navigate(['/cart-page']);
    } else {
      // Handle the case where food is undefined (e.g., show an error message)
      console.error('Food not found in cart!');
    }
  }
  onRatingChange(newRating: number, foodId: string): void {
    if (this.food) {
      this.food.stars = newRating;  // Update the food's rating
    }
  }

}
