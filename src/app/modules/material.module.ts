import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatStepperModule } from '@angular/material/stepper';

const SHARED_MODULES = [
  MatSelectModule,
  MatButtonModule,
  MatFormFieldModule,
  MatSlideToggleModule,
  MatInputModule,
  MatProgressSpinnerModule,
  MatAutocompleteModule,
  ReactiveFormsModule,
  FormsModule,
  MatStepperModule,
  MatButtonModule,
];

@NgModule({
  imports: [...SHARED_MODULES],
  exports: [...SHARED_MODULES],
})
export class MaterialModule {}
