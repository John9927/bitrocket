import { GuardpaymentGuard } from './guardpayment.guard';
import { PaymentAcceptedComponent } from './components/payment-accepted/payment-accepted.component';
import { ReveiceItemFasterComponent } from './components/reveice-item-faster/reveice-item-faster.component';
import { CartComponent } from './components/cart/cart.component';
import { GuardGuard } from './guard.guard';
import { OrdersComponent } from './components/orders/orders.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Guard2Guard } from './guard2.guard';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'login', component: LoginComponent },
  { path: 'orders', component: OrdersComponent, canActivate: [GuardGuard] },
  { path: 'cart', component: CartComponent, canActivate: [Guard2Guard]},
  { path: 'receive-item-faster', component: ReveiceItemFasterComponent},
  { path: 'payment-accepted', component: PaymentAcceptedComponent, canActivate: [GuardpaymentGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
