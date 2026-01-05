import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { CategoryService } from 'src/app/services/category.service';
import { Product } from 'src/app/interfaces/product.interface';
import { Category } from 'src/app/interfaces/category.interface';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  apiUrl = environment.apiUrl;

  products: Product[] = [];
  categories: Category[] = [];

  showModal = false;
  editingProduct: Product | null = null;

  /** 🔹 SERVER SIDE STATE */
  sortBy: 'id' | 'name' | 'price' | 'category' = 'id';
  sortOrder: 'asc' | 'desc' = 'desc';
  searchText = '';

  currentPage = 1;
  pageSize = 10;
  totalPages = 0;

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService
  ) {}

  ngOnInit() {
    this.loadProducts();
    this.loadCategories();
  }

  /** ✅ LOAD PRODUCTS (SERVER SIDE SEARCH + SORT + PAGINATION) */
  loadProducts() {
    const params: any = {
      page: this.currentPage,
      limit: this.pageSize,
      search: this.searchText,
      sortBy: this.sortBy,
      sortOrder: this.sortOrder
    };

    this.productService.getProducts(params).subscribe({
      next: (res: any) => {
        this.products = res.data;
        this.totalPages = res.pagination.totalPages;
      },
      error: (err) => console.error(err)
    });
  }

  /** 🔍 SEARCH */
  onSearch() {
    this.currentPage = 1;
    this.loadProducts();
  }

  /** ↕ SORT */
  changeSort(field: 'id' | 'name' | 'price' | 'category') {
    if (this.sortBy === field) {
      this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortBy = field;
      this.sortOrder = 'asc';
    }
    this.loadProducts();
  }

  /** 📄 PAGINATION */
  changePage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.loadProducts();
  }

  /** 📂 CATEGORIES */
  loadCategories() {
    this.categoryService.getCategories().subscribe({
      next: (res: any) => {
        this.categories = res.data || [];
      },
      error: (err) => console.error('API error:', err)
    });
  }

  /** ➕ ADD */
  openAddModal() {
    this.showModal = true;
    this.editingProduct = null;
  }

  /** ✏ EDIT */
  editProduct(product: Product) {
    this.showModal = true;
    this.editingProduct = product;
  }

  /** 💾 SAVE */
  saveProduct(formData: FormData) {
    if (this.editingProduct) {
      this.productService
        .updateProduct(this.editingProduct.id, formData)
        .subscribe(() => {
          this.loadProducts();
          this.closeModal();
        });
    } else {
      this.productService
        .createProduct(formData)
        .subscribe(() => {
          this.loadProducts();
          this.closeModal();
        });
    }
  }

  /** ❌ DELETE */
  deleteProduct(id: number) {
    if (confirm('Delete product?')) {
      this.productService.deleteProduct(id).subscribe(() => {
        this.loadProducts();
      });
    }
  }

  closeModal() {
    this.showModal = false;
  }

  /** 🖼 IMAGE URL */
  getImageUrl(filename: string) {
    return `${this.apiUrl}/uploads/products/${filename}`;
  }
}
