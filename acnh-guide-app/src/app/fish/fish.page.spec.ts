import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FishPage } from './fish.page';

describe('FishPage', () => {
  let component: FishPage;
  let fixture: ComponentFixture<FishPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FishPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FishPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
