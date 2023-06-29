import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';

const SERVICES = [];

@NgModule({
  imports: [CommonModule],
  providers: [...SERVICES],
})
export class MockDataModule {
  static forRoot(): ModuleWithProviders<MockDataModule> {
    return {
      ngModule: MockDataModule,
      providers: [...SERVICES],
    };
  }
}
