import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SearchexpressPage } from './searchexpress.page';

describe('SearchexpressPage', () => {
  let component: SearchexpressPage;
  let fixture: ComponentFixture<SearchexpressPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchexpressPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SearchexpressPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
