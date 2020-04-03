import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CombatComponent } from './combat.component';
import { PokemonService } from '../pokemon/pokemon.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CustomDatePipe } from '../pipes/custom-date.pipe';
import { LogColorDirective } from './log-color.directive';
import { PokemonLogColorDirective } from './pokemon-log-color.directive';
import { RouterModule } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';
import { By } from '@angular/platform-browser';

describe('CombatComponent', () => {
  let component: CombatComponent;
  let fixture: ComponentFixture<CombatComponent>;
  let view: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterModule.forRoot([])],
      declarations: [
        CombatComponent,
        CustomDatePipe,
        LogColorDirective,
        PokemonLogColorDirective,
      ],
      providers: [PokemonService, { provide: APP_BASE_HREF, useValue: '/' }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CombatComponent);
    component = fixture.componentInstance;
    view = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
