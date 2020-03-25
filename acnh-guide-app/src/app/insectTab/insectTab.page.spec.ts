import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { InsectTabPage } from './insectTab.page';

describe('InsectTabPage', () => {
  let component: InsectTabPage;
  let fixture: ComponentFixture<InsectTabPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InsectTabPage],
      imports: [IonicModule.forRoot(), ExploreContainerComponentModule]
    }).compileComponents();

    fixture = TestBed.createComponent(InsectTabPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
