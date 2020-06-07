import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ClasesHomePage } from './clases-home.page';

describe('ClasesHomePage', () => {
  let component: ClasesHomePage;
  let fixture: ComponentFixture<ClasesHomePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClasesHomePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ClasesHomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
