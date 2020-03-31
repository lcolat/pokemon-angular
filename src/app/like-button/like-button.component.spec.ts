import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LikeButtonComponent } from './like-button.component';

describe('LikeButtonComponent', () => {
  let component: LikeButtonComponent;
  let fixture: ComponentFixture<LikeButtonComponent>;
  let view: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LikeButtonComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LikeButtonComponent);
    component = fixture.componentInstance;
    view = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display 0 Like by default', () => {
    expect(view.textContent).toContain('0 Like');
  });

  it('should display 8 Like when nbLikes props at 8', () => {
    component.nbLikes = 8;
    fixture.detectChanges();
    expect(view.textContent).toContain('8 Likes');
  });

  it('Should display 1 Like after clicking on the button', ()=>{
    view.querySelector('button').click();
    fixture.detectChanges();
    expect(view.textContent).toContain('1 Like');
  })

  it('Should display 2 Like after clicking 2 times on the button', ()=>{
    view.querySelector('button').click();
    view.querySelector('button').click();
    fixture.detectChanges();
    expect(view.textContent).toContain('2 Like');
  })

});
