import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SchoolPagePage } from './school-page.page';

describe('SchoolPagePage', () => {
  let component: SchoolPagePage;
  let fixture: ComponentFixture<SchoolPagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolPagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SchoolPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
