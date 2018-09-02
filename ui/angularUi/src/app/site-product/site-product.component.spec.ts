import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteProductComponent } from './site-product.component';

describe('SiteProductComponent', () => {
  let component: SiteProductComponent;
  let fixture: ComponentFixture<SiteProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SiteProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
