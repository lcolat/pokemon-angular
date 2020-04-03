import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CombatComponent } from './combat.component';
import { RouterTestingModule } from '@angular/router/testing';
import { appRoutes } from '../app.module';
import { PokemonService } from '../pokemon/pokemon.service';

describe('CombatComponent', () => {
  let component: CombatComponent;
  let fixture: ComponentFixture<CombatComponent>;
  let view: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(appRoutes), PokemonService],
      declarations: [CombatComponent],
      providers: [PokemonService],
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

  it('play button should be hidden by default', () => {
    expect(view.querySelector('startButton').hidden).toBeTruthy();
  });

});
