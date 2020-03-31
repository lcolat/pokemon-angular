import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayButtonComponent } from './play-button.component';

describe('PlayButtonComponent', () => {
  let component: PlayButtonComponent;
  let fixture: ComponentFixture<PlayButtonComponent>;
  let view: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PlayButtonComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayButtonComponent);
    component = fixture.componentInstance;
    view = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display Pause by default', () => {
    expect(view.textContent).toContain('Pause');
  });

  it('should display Play when isPlaying false', () => {
    component.isPlaying = false;
    fixture.detectChanges();
    expect(view.textContent).toContain('Play');
  });

  it('should display Pause when isPlaying true', () => {
    component.isPlaying = true;
    fixture.detectChanges();
    expect(view.textContent).toContain('Pause');
  });

  it('should display Play when click first time', () => {
    view.querySelector('button').click();
    fixture.detectChanges();
    expect(view.textContent).toContain('Play');
  });
});
