import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DetailbalancePage } from './detailbalance.page';

describe('DetailbalancePage', () => {
  let component: DetailbalancePage;
  let fixture: ComponentFixture<DetailbalancePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailbalancePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DetailbalancePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
