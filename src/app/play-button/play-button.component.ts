import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FightState } from '../fight/fight.service';

@Component({
  selector: 'app-play-button',
  templateUrl: './play-button.component.html',
  styleUrls: ['./play-button.component.css'],
})
export class PlayButtonComponent implements OnInit {
  isPlaying!: boolean;
  @Input('fightState') fightState = FightState.PAUSE;
  @Output() onClick = new EventEmitter<FightState>();

  ngOnInit(): void {
    this.isPlaying = this.fightState !== FightState.RUNNING;
  }

  handleClick(): void {
    this.isPlaying = !this.isPlaying;

    this.onClick.emit(
      this.fightState === FightState.PAUSE
        ? FightState.RUNNING
        : FightState.PAUSE,
    );
  }
}
