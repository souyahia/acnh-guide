import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InsectPage } from './insect.page';

describe('InsectPage', () => {
  let component: InsectPage;
  let fixture: ComponentFixture<InsectPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsectPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InsectPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
