import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CalificacionPage } from './calificacion.page';

describe('CalificacionPage', () => {
  let component: CalificacionPage;
  let fixture: ComponentFixture<CalificacionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalificacionPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CalificacionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
