import { SignUpComponent } from './sign-up/sign-up.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: 'login',
		component: LoginComponent,

	},
	{
		path: 'forgot-password',
		component: ForgotPasswordComponent,

	},
	{
		path: 'sign-up',
		component: SignUpComponent,

	},
	{
		path: '',
		redirectTo: 'login',
		pathMatch: 'full'
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }