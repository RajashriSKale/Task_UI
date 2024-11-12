import { Component } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../Product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {

  products: Product[] = [];

  Productedit:any[]=[];
  

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProjects().subscribe((data) => {
      this.products = data;
    });
  }

  deleteProduct(id: number): void {
    this.productService.deleteProject(id).subscribe(() => {
      this.loadProducts();
    });
}

editProduct(id:number){
  debugger
  this.router.navigate(['edit',id]);
  this.productService.get(id).subscribe(
    (response) => {
      console.log('Project created successfully:', response);    
      console.log(response+ "edit");     
      this.Productedit = response;
      console.log(this.Productedit);
      

      // Opti this.projects = response.items;onally, you can reload data or perform other actions after creating the project
     //  this.loadProducts();
    },
    (error) => {
      console.error('Error creating project:', error);
    }
  );
  
}
  addProduct() {

    this.router.navigate(['add']);
  throw new Error('Method not implemented.');
  }
}
