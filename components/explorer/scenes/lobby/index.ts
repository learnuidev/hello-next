import { exampleGame, reactEcoSystem, javascript, } from '../../mock'
import { createPlayer, addButton } from '../utils'

export const initLobbyScene = ({ kaboomGame }) => {
  kaboomGame.scene('lobby', () => {
      kaboomGame.loadBean().then(() => {
          const player = createPlayer({ kaboomGame });

          // addButton

          const gamesRoomBtn = addButton(kaboomGame, {
              id: 'button/to-game-room',
              text: 'Games',
              pos: kaboomGame.center(),
              size: 30,
              onClick: () => {
                  kaboomGame.go('gameRoom');
                  kaboomGame.debug.log('TODO: Create games room');
              },
          });

          // player.onCollides
          player.onCollide('button/to-game-room', enemy => {
              kaboomGame.go('gameRoom');
              kaboomGame.debug.log('TODO: Create games room');
          });
      });
  });
}
