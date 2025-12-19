import { Component } from '@angular/core';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent {

  categories = [
    { id: 1, name: 'Mobiles', description: 'All kinds of smartphones' },
    { id: 2, name: 'Electronics', description: 'Electronic items & gadgets' },
    { id: 3, name: 'Home & Kitchen', description: 'Appliances and home items' },
  ];

  showModal = false;
  editingCategory: any = null;

  categoryForm = {
    name: '',
    description: ''
  };

  openAddModal() {
    this.showModal = true;
    this.editingCategory = null;
    this.categoryForm = { name: '', description: '' };
  }

  editCategory(category: any) {
    this.showModal = true;
    this.editingCategory = category;
    this.categoryForm = {
      name: category.name,
      description: category.description
    };
  }

  deleteCategory(id: number) {
    this.categories = this.categories.filter(c => c.id !== id);
  }

  saveCategory() {
    if (this.editingCategory) {
      this.editingCategory.name = this.categoryForm.name;
      this.editingCategory.description = this.categoryForm.description;
    } else {
      const newId = this.categories.length
        ? Math.max(...this.categories.map(c => c.id)) + 1
        : 1;

      this.categories.push({
        id: newId,
        ...this.categoryForm
      });
    }
    this.closeModal();
  }

  closeModal() {
    this.showModal = false;
  }
}
