import { createPlayer, addButton } from '../../utils'
import { exampleGame, reactEcoSystem, javascript, } from '../../../mock'


export const initModernJsScene = ({ kaboomGame }) => {
  kaboomGame.scene('re-modern-js', () => {
      kaboomGame.loadBean().then(() => {
          const player = createPlayer({ kaboomGame });

          // Game ROom ====

          const gamesRoomBtn = addButton(kaboomGame, {
              id: 'button/back-to-lobby',
              text: 'back to lobby',
              pos: kaboomGame.vec2(kaboomGame.center().x, kaboomGame.center().y - 330),
              size: 30,
              onClick: () => {
                  // kaboomGame.debug.log('TODO: Create games room');
                  kaboomGame.go('lobby');
              },
          });

          const gamesTitle = addButton(kaboomGame, {
              id: 'button/react-ecosystem-title',
              text: reactEcoSystem.title,
              pos: kaboomGame.vec2(kaboomGame.center().x, kaboomGame.center().y - 230),
              size: 30,
              onClick: () => {
                  // kaboomGame.debug.log('TODO: Create games room');
                  // kaboomGame.go('lobby');
              },
          });

          const btns = reactEcoSystem.topics.map((topic, idx) => {
              return addButton(kaboomGame, {
                  id: topic.id,
                  text: topic.title,
                  pos: kaboomGame.vec2(
                      kaboomGame.center().x,
                      kaboomGame.center().y - 180 + (idx === 0 ? 0 : idx * 40),
                  ),
                  size: 30,
                  onClick: () => {
                      kaboomGame.go(topic.sceneId);
                  },
              });
          });

          player.onCollide('button/back-to-lobby', enemy => {
              kaboomGame.go('lobby');
              kaboomGame.debug.log('TODO: Create games room');
          });
      });
  });
}
