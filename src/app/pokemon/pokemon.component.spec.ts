import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PokemonComponent } from './pokemon.component';
import { givenPokemon } from '../fight/utils';
import { By } from '@angular/platform-browser';

describe('PokemonComponent', () => {
  let component: PokemonComponent;
  let fixture: ComponentFixture<PokemonComponent>;
  let view: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PokemonComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PokemonComponent);
    component = fixture.componentInstance;
    component.pokemon = givenPokemon();
    view = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('defines a attacker-container when the pokemon is the attacker', () => {
    component.isAttacker = true;
    component.ngOnInit();
    fixture.detectChanges();

    const foundClass = fixture.debugElement.query(
      By.css('.attacker-container'),
    );

    expect(foundClass.classes['attacker-container']).toBeTruthy();
    expect(foundClass.classes['defender-container']).toBeFalsy();
  });

  it('defines a defender-container when the pokemon is the attacker', () => {
    component.isAttacker = false;
    fixture.detectChanges();

    const foundClass = fixture.debugElement.query(
      By.css('.defender-container'),
    );

    expect(foundClass.classes['attacker-container']).toBeFalsy();
    expect(foundClass.classes['defender-container']).toBeTruthy();
  });

  it('display the back sprite of the attacker pokemon', () => {
    const src =
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/28.png';

    component.isAttacker = true;
    component.pokemon = givenPokemon({
      sprites: {
        front: src + '123',
        back: src,
      },
    });

    component.ngOnInit();
    fixture.detectChanges();

    const foundEl = fixture.debugElement.query(By.css('img'));

    expect(foundEl.properties.src).toEqual(src);
    expect(foundEl.classes['attacker-img']).toBeTruthy();
    expect(foundEl.classes['defender-img']).toBeFalsy();
  });

  it('display the front sprite of the defender pokemon', () => {
    const src =
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/28.png';

    component.isAttacker = false;
    component.pokemon = givenPokemon({
      sprites: {
        front: src,
        back: src + '123',
      },
    });

    component.ngOnInit();
    fixture.detectChanges();

    const foundEl = fixture.debugElement.query(By.css('img'));

    expect(foundEl.properties.src).toEqual(src);
    expect(foundEl.classes['attacker-img']).toBeFalsy();
    expect(foundEl.classes['defender-img']).toBeTruthy();
  });

  it('should display pokemon hp in percentage', () => {
    component.pokemon = givenPokemon({
      hp: 107,
    });
    component.ngOnInit();
    component.pokemon.hp = 33;
    fixture.detectChanges();
    const foundEl = fixture.debugElement.query(By.css('.health-bar-text'));
    expect(foundEl.nativeElement.textContent).toEqual('30%');
  });
});
