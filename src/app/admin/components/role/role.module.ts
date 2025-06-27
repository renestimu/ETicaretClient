import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoleComponent } from './role.component';
import { RouterModule } from '@angular/router';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSidenavModule } from '@angular/material/sidenav';
import { CreateComponent } from './create/create.component';
import { ListComponent } from './list/list.component';
import { DeleteDirectiveModule } from 'src/app/directives/admin/delete.directive.module';

@NgModule({
  declarations: [
    RoleComponent,
    CreateComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: RoleComponent }]),
    MatSidenavModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
        DeleteDirectiveModule
  ],
})
export class RoleModule {}
