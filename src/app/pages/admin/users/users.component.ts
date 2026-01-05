import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  apiUrl = environment.apiUrl;

  users: any[] = [];

  // table state
  searchText = '';
  sortBy: 'id' | 'name' | 'email' = 'id';
  sortOrder: 'asc' | 'desc' = 'asc';

  currentPage = 1;
  totalPages = 1;
  limit = 10;

  loading = false;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  /** 🔹 LOAD USERS (ADMIN API) */
  loadUsers() {
    this.loading = true;

    this.http.get<any>(`${this.apiUrl}/api/admin/users`, {
      params: {
        page: this.currentPage,
        limit: this.limit,
        search: this.searchText,
        sortBy: this.sortBy,
        sortOrder: this.sortOrder
      }
    }).subscribe({
      next: (res) => {
        this.users = res.data.users;
        this.totalPages = res.data.pagination.totalPages;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      }
    });
  }

  /** 🔍 SEARCH */
  onSearch() {
    this.currentPage = 1;
    this.loadUsers();
  }

  /** ↕ SORT */
  changeSort(field: 'id' | 'name' | 'email') {
    if (this.sortBy === field) {
      this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortBy = field;
      this.sortOrder = 'asc';
    }
    this.loadUsers();
  }

  /** 📄 PAGINATION */
  changePage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.loadUsers();
  }

  /** 🔁 ACTIVATE / DEACTIVATE */
  toggleStatus(user: any) {
    if (!confirm('Change user status?')) return;

    this.http.patch(`${this.apiUrl}/api/admin/users/${user.id}/status`, {})
      .subscribe(() => this.loadUsers());
  }

  /** ❌ DELETE */
  deleteUser(id: number) {
    if (!confirm('Delete user permanently?')) return;

    this.http.delete(`${this.apiUrl}/api/admin/users/${id}`)
      .subscribe(() => this.loadUsers());
  }
}
