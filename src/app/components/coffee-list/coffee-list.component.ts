import { Component, OnInit } from '@angular/core';
import { CoffeeApiService } from '../../services/coffee-api.service';
import { Coffee } from '../../types/coffee';
import { Observable, map, of, tap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-coffee-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [CoffeeApiService],
  templateUrl: './coffee-list.component.html',
  styleUrls: ['./coffee-list.component.scss'],
})

export class CoffeeListComponent implements OnInit {
  coffees$: Observable<Coffee[]> = of([]);
  coffeeToAdd: Partial<Coffee> = {};

  constructor(public restApi: CoffeeApiService) {}

  ngOnInit() {
    this.coffees$ = this.restApi.getCoffees();
  }

  deleteCoffee(id: number) {
    if (window.confirm('Are you sure, you want to delete?')) {
      this.restApi.deleteCoffee(id).subscribe((data) => {
        // This test API doesn't actually delete the coffee - so we simulate that here.
        this.coffees$ = this.coffees$.pipe(map(coffees => coffees.filter(coffee => coffee.id !== id)));
      });
    }
  }

  addCoffee(coffee: Partial<Coffee>) {
    this.restApi.createCoffee(coffee).subscribe((newCoffee) => {
      this.coffees$ = this.coffees$.pipe(
        map(coffees => coffees.concat(newCoffee)),
        tap(() => this.coffeeToAdd = {})
      ) 
    });
  }

  editCoffee(toUpdate: Partial<Coffee>) {
    this.restApi.updateCoffee(toUpdate).subscribe((updatedCoffee) => {
      this.coffees$ = this.coffees$.pipe(
        map(coffees => coffees.filter(coffee => coffee.id !== toUpdate.id).concat({ ...toUpdate, ...updatedCoffee }))
      ) 
    });
  }
}