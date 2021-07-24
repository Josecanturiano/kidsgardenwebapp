import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { StudentsPagePage } from './students-page.page';

describe('StudentsPagePage', () => {
  let component: StudentsPagePage;
  let fixture: ComponentFixture<StudentsPagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentsPagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(StudentsPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
