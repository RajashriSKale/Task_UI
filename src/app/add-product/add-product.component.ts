import { Component } from '@angular/core';
import { ProductService } from '../product.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {
  dataList: any;
  productForm: any;
 


  constructor(private fb: FormBuilder, private router: Router, private api: ProductService) {

  }
  ngOnInit(): void {
    this.productForm = this.fb.group({
      Name: ['', Validators.required],
      Price: ['', Validators.required],
      Quantity: ['', Validators.required],

    })



  }


  saveProject(data: any) {
   
    this.productForm.markAllAsTouched();

    this.router.navigate(['']);
    if (this.productForm.valid) {

      const projectData = this.productForm.value;
      console.log(projectData);


      this.api.createProject(projectData).subscribe(
        (response) => {




          console.log('Project created successfully:', response);



          
        },
        (error) => {
          console.error('Error creating project:', error);
        }
      );
    } else {
      console.log(data);

     
      console.error('Form validation failed. Please check the form.');
    }


  }


}
