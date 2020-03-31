import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CombatState} from "../logic/Combat";

@Component({
  selector: 'app-play-button',
  templateUrl: './play-button.component.html',
  styleUrls: ['./play-button.component.css'],
})
export class PlayButtonComponent implements OnInit {
  isPlaying!: boolean;
  @Input('combatState') combatState = CombatState.PAUSE;
  @Output() onClick = new EventEmitter<CombatState>();

  ngOnInit(): void {
    this.isPlaying = this.combatState !== CombatState.RUNNING;
  }

  handleClick(): void {
    this.isPlaying = !this.isPlaying;
    this.onClick.emit(this.combatState === CombatState.PAUSE ? CombatState.RUNNING : CombatState.PAUSE);
  }
}
