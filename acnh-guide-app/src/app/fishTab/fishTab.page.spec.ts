import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { FishTabPage } from './fishTab.page';

describe('FishTabPage', () => {
  let component: FishTabPage;
  let fixture: ComponentFixture<FishTabPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FishTabPage],
      imports: [IonicModule.forRoot(), ExploreContainerComponentModule]
    }).compileComponents();

    fixture = TestBed.createComponent(FishTabPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
