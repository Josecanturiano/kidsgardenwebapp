import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TeachersPagePage } from './teachers-page.page';

describe('TeachersPagePage', () => {
  let component: TeachersPagePage;
  let fixture: ComponentFixture<TeachersPagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeachersPagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TeachersPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
