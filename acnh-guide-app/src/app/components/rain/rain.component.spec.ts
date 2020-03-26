import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RainComponent } from './rain.component';

describe('RainComponent', () => {
  let component: RainComponent;
  let fixture: ComponentFixture<RainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RainComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});