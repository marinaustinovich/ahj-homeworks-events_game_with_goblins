import createPosition from './createPosition';
import cursors from './cursors';
import GamePlay from './GamePlay';

export default class GameController {
  constructor(gamePlay) {
    this.gamePlay = gamePlay;
    this.indexSelect = {};
    this.countSuccessCLick = 0;
    this.countNotSuccessCLick = 0;
    this.onCellClick = this.onCellClick.bind(this);
    this.onCellEnter = this.onCellEnter.bind(this);
    this.onCellLeave = this.onCellLeave.bind(this);
  }

  init() {
    // TODO: add event listeners to gamePlay events
    this.events();
    this.gamePlay.drawUi('prairie');
    this.showCharacter();
  }

  events() {
    this.gamePlay.addCellEnterListener(this.onCellEnter);
    this.gamePlay.addCellLeaveListener(this.onCellLeave);
    this.gamePlay.addCellClickListener(this.onCellClick);
  }

  onCellClick(e) {
    this.gamePlay.setCursor(cursors.hammer);
    this.reactOnClick(e);
  }

  onCellEnter(index) {
    if (document.querySelector('.selected-yellow')) {
      this.gamePlay.deselectCell(this.indexSelect.red);
    }

    this.gamePlay.selectCell(index);
    this.indexSelect.red = index;
    this.gamePlay.setCursor(cursors.pointer);
  }

  onCellLeave(index) {
    this.gamePlay.hideCellTooltip(index);
  }

  showCharacter() {
    const timerId = setInterval(() => {
      let position;
      let isPosition = false;
      do {
        position = createPosition(this.gamePlay.boardSize);
        if (this.gamePlay.positionChar === position) {
          position = createPosition(this.gamePlay.boardSize);
          isPosition = true;
        }
        this.gamePlay.positionChar = position;
      } while (!isPosition);
      this.gamePlay.redrawPositions(position);
    }, 700);
    setTimeout(() => clearInterval(timerId), 500000);
  }

  reactOnClick(e) {
    const boardCells = document.querySelectorAll('.cell');
    const boardCellClick = boardCells[e];
    const isGoblin = boardCellClick.querySelector('.generic');

    if (isGoblin) {
      this.countSuccessCLick += 1;
    } else {
      this.countNotSuccessCLick += 1;
    }

    if (this.countNotSuccessCLick >= 5) {
      GamePlay.showMessage('You lose!', '129335');
      this.reset();
    }

    if (this.countSuccessCLick >= 10) {
      GamePlay.showMessage(`You win! Your points are ${this.countSuccessCLick}`, '127881');
      this.reset();
    }
  }

  reset() {
    this.countNotSuccessCLick = 0;
    this.countSuccessCLick = 0;
  }
}
