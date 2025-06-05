import { Routes } from '@angular/router';
import { ProductsComponent } from './components/products/products.component';
import { UserComponent } from './components/user/user.component';

export const routes: Routes = [
  { path: '', component: UserComponent },
  { path: 'products', component: ProductsComponent },
];
