import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

const SHARED_MODULES = [
  MatSelectModule,
  MatButtonModule,
  MatFormFieldModule,
  ReactiveFormsModule,
  FormsModule,
];

@NgModule({
  imports: [...SHARED_MODULES],
  exports: [...SHARED_MODULES],
})
export class MaterialModule {}
