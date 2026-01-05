import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { NgForm } from '@angular/forms';
import { environment } from 'src/environments/environment';

interface Category {
  id: number;
  name: string;
  description?: string;
  image?: string | null;
  slug?: string;
  createdAt?: string;
}

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  apiUrl = environment.apiUrl;
  categories: Category[] = [];
  showModal = false;
  editingCategory: Category | null = null;

  categoryForm: any = {
    name: '',
    description: '',
    image: null
  };

  imagePreview: string | ArrayBuffer | null = null;

  constructor(private categoryService: CategoryService) {}

  ngOnInit() {
    this.loadCategories();
  }

  loadCategories() {
    this.categoryService.getCategories().subscribe((res: any) => {
      this.categories = res.data;
    });
  }

  openAddModal() {
    this.showModal = true;
    this.editingCategory = null;
    this.categoryForm = { name: '', description: '', image: null };
    this.imagePreview = null;
  }

  editCategory(category: Category) {
    this.showModal = true;
    this.editingCategory = category;
    this.categoryForm = { 
      name: category.name, 
      description: category.description, 
      image: null 
    };
    this.imagePreview = category.image
  ? `${this.apiUrl}/uploads/categories/${category.image}`
  : null;
  }

  deleteCategory(id: number) {
    if (confirm('Are you sure you want to delete this category?')) {
      this.categoryService.deleteCategory(id).subscribe(() => {
        this.categories = this.categories.filter(c => c.id !== id);
      });
    }
  }

  onImageSelect(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.categoryForm.image = file;

      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  saveCategory() {
    const formData = new FormData();
    formData.append('name', this.categoryForm.name);
    formData.append('description', this.categoryForm.description);
    if (this.categoryForm.image) {
      formData.append('image', this.categoryForm.image);
    }

    if (this.editingCategory) {
      this.categoryService.updateCategory(this.editingCategory.id, formData).subscribe((res: any) => {
        this.loadCategories();
        this.closeModal();
      });
    } else {
      this.categoryService.createCategory(formData).subscribe((res: any) => {
        this.loadCategories();
        this.closeModal();
      });
    }
  }

  closeModal() {
    this.showModal = false;
    this.imagePreview = null;
  }

  getImageUrl(image: string | null) {
  if (!image) return 'assets/no-image.png';
  return `${this.apiUrl}/uploads/categories/${image}`;
}
}
