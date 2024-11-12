import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../product.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent {
  editProductForm: FormGroup;
  productId: any;

  constructor(
    private fb: FormBuilder,
    private api: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    // Initialize the form
    this.editProductForm = this.fb.group({
    
      Name: ['', Validators.required],
      Price: ['', Validators.required],
      Quantity: [''],
      
    
    });
  }

 


  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      this.productId = idParam ? +idParam : null;
  
      if (this.productId) {
        this.api.get(this.productId).subscribe(
          product => {
            
             console.log(product);
             
            this.editProductForm.patchValue({
              Name: product.Name,
              Price: product.Price,
              Quantity: product.Quantity,
            
              
            });
          },
          error => {
            console.error('Error fetching product details:', error);
          }
        );
      }
    });
  }
  

  
  onSubmit(): void {
    if (this.editProductForm.valid) {
      this.api.updateProject(this.productId, this.editProductForm.value).subscribe(
        (response) => {
          this.router.navigate(['/product']); 

          console.log('Product updated successfully:', response);
        },
        (error) => {
          console.error('Error updating product:', error);
        }
      );
    }
  }
}

