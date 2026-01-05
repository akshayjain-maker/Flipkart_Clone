import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { Product } from 'src/app/interfaces/product.interface';
import { Category } from 'src/app/interfaces/category.interface';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-product-modal',
  templateUrl: './product-modal.component.html',
  styleUrls: ['./product-modal.component.scss']
})
export class ProductModalComponent implements OnInit {

  apiUrl = environment.apiUrl;

  @Input() product: Product | null = null;
  @Input() categories: Category[] = [];

  @Output() close = new EventEmitter<void>();
  @Output() saved = new EventEmitter<FormData>();

  form: any = {
    name: '',
    description: '',
    price: '',
    categoryId: '',
    images: [] as File[]
  };

  existingImages: { url: string, id: number }[] = [];
  imagePreviews: string[] = [];

  // 🔹 sorting state
  sortOrder: 'asc' | 'desc' = 'asc';
  sortedCategories: Category[] = [];

  ngOnInit() {
    this.sortCategories();

    if (this.product) {
      this.form = {
        name: this.product.name,
        description: this.product.description,
        price: this.product.price,
        categoryId: this.product.categoryid,
        images: []
      };

      this.existingImages = (this.product.ProductImages || []).map(img => ({
        url: img.url,
        id: img.id
      }));

      this.imagePreviews = [];
    }
  }

  // 🔹 sorting logic
  sortCategories() {
    this.sortedCategories = [...this.categories].sort((a, b) => {
      return this.sortOrder === 'asc'
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    });
  }

  toggleSort() {
    this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    this.sortCategories();
  }

  onImagesSelect(event: any) {
    const files = Array.from(event.target.files) as File[];
    this.form.images.push(...files);

    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = () => this.imagePreviews.push(reader.result as string);
      reader.readAsDataURL(file);
    });
  }

  removeExistingImage(index: number) {
    this.existingImages.splice(index, 1);
  }

  removeNewImage(index: number) {
    this.form.images.splice(index, 1);
    this.imagePreviews.splice(index, 1);
  }

  submit() {
    const formData = new FormData();

    formData.append('name', this.form.name);
    formData.append('description', this.form.description);
    formData.append('price', this.form.price);
    formData.append('categoryId', this.form.categoryId);

    this.form.images.forEach((img: File) =>
      formData.append('images', img)
    );

    const existingIds = this.existingImages.map(img => img.id);
    formData.append('existingImageIds', JSON.stringify(existingIds));

    this.saved.emit(formData);
  }

  closeModal() {
    this.close.emit();
  }

  getImageUrl(filename: string) {
    return `${this.apiUrl}/uploads/products/${filename}`;
  }
}
