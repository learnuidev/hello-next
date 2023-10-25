import { exampleGame, reactEcoSystem, javascript, } from '../mock'

// helpers
import { createPlayer, addButton } from './utils'

// scenes
import { initClassicJsScene } from './js/classicjs'
import { initModernJsScene } from './js/modernjs'
import { initAdvancedJSScene } from './js/advancedjs'
import { initLobbyScene } from './lobby'

export const initScenes = ({ kaboomGame }: any) => {
  // Lobby
  initLobbyScene({ kaboomGame })

  // Game Room
  kaboomGame.scene('gameRoom', () => {
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
              id: 'button/games-title',
              text: exampleGame.title,
              pos: kaboomGame.vec2(kaboomGame.center().x, kaboomGame.center().y - 230),
              size: 30,
              onClick: () => {
                  // kaboomGame.debug.log('TODO: Create games room');
                  // kaboomGame.go('lobby');
              },
          });

          const btns = exampleGame.subjects.map((subject, idx) => {
              return addButton(kaboomGame, {
                  id: subject.id,
                  text: subject.title,
                  pos: kaboomGame.vec2(
                      kaboomGame.center().x,
                      kaboomGame.center().y - 180 + (idx === 0 ? 0 : idx * 40),
                  ),
                  size: 30,
                  onClick: () => {
                      kaboomGame.go(subject.sceneId);
                  },
              });
          });

          player.onCollide('button/back-to-lobby', (enemy: any) => {
              kaboomGame.go('lobby');
              kaboomGame.debug.log('TODO: Create games room');
          });
      });
  });

  // JS
  initClassicJsScene({ kaboomGame })
  initModernJsScene({ kaboomGame })
  initAdvancedJSScene({ kaboomGame })
  kaboomGame.scene('scene-javascript', () => {
      kaboomGame.loadBean().then(() => {
          const player = createPlayer({ kaboomGame });

          // Game ROom ====

          const gamesRoomBtn = addButton(kaboomGame, {
              id: 'button/back-to-lobby',
              text: 'back to lobby',
              pos: kaboomGame.vec2(kaboomGame.center().x * 2 - 200, kaboomGame.center().y - 330),
              size: 30,
              onClick: () => {
                  // kaboomGame.debug.log('TODO: Create games room');
                  kaboomGame.go('lobby');
              },
          });

          const gamesTitle = addButton(kaboomGame, {
              id: 'button/games-title',
              text: javascript.title,
              pos: kaboomGame.vec2(kaboomGame.center().x, kaboomGame.center().y - 330),
              size: 30,
              onClick: () => {
                  // kaboomGame.debug.log('TODO: Create games room');
                  // kaboomGame.go('lobby');
              },
          });

          const btns = javascript.topics.map((subject, idx) => {
              return addButton(kaboomGame, {
                  id: subject.id,
                  text: subject.title,
                  pos: kaboomGame.vec2(
                      kaboomGame.center().x,
                      kaboomGame.center().y - 180 + (idx === 0 ? 0 : idx * 60),
                  ),
                  size: 30,
                  onClick: () => {
                      kaboomGame.go(subject.sceneId);
                  },
              });
          });

          player.onCollide('button/back-to-lobby',(enemy: any) => {
              kaboomGame.go('lobby');
              kaboomGame.debug.log('TODO: Create games room');
          });
      });
  });
  kaboomGame.scene('re-realworld-js', () => {
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

          player.onCollide('button/back-to-lobby', (enemy: any) => {
              kaboomGame.go('lobby');
              kaboomGame.debug.log('TODO: Create games room');
          });
      });
  });

  // typescript
  kaboomGame.scene('scene-typescript', () => {
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
              id: 'button/games-title',
              text: exampleGame.title,
              pos: kaboomGame.vec2(kaboomGame.center().x, kaboomGame.center().y - 230),
              size: 30,
              onClick: () => {
                  // kaboomGame.debug.log('TODO: Create games room');
                  // kaboomGame.go('lobby');
              },
          });

          const btns = exampleGame.subjects.map((subject, idx) => {
              return addButton(kaboomGame, {
                  id: subject.id,
                  text: subject.title,
                  pos: kaboomGame.vec2(
                      kaboomGame.center().x,
                      kaboomGame.center().y - 180 + (idx === 0 ? 0 : idx * 40),
                  ),
                  size: 30,
                  onClick: () => {
                      kaboomGame.go(subject.sceneId);
                  },
              });
          });

          player.onCollide('button/back-to-lobby', (enemy: any) => {
              kaboomGame.go('lobby');
              kaboomGame.debug.log('TODO: Create games room');
          });
      });
  });

  // ReactJS
  kaboomGame.scene('reactEcosystem', () => {
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

          player.onCollide('button/back-to-lobby', (enemy: any) => {
              kaboomGame.go('lobby');
              kaboomGame.debug.log('TODO: Create games room');
          });
      });
  });
  kaboomGame.scene('re-react', () => {
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

          player.onCollide('button/back-to-lobby', (enemy: any) => {
              kaboomGame.go('lobby');
              kaboomGame.debug.log('TODO: Create games room');
          });
      });
  });
  kaboomGame.scene('re-routing', () => {
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

          player.onCollide('button/back-to-lobby', (enemy: any)=> {
              kaboomGame.go('lobby');
              kaboomGame.debug.log('TODO: Create games room');
          });
      });
  });
  kaboomGame.scene('re-state-management', () => {
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

          player.onCollide('button/back-to-lobby', (enemy: any) => {
              kaboomGame.go('lobby');
              kaboomGame.debug.log('TODO: Create games room');
          });
      });
  });

  kaboomGame.go('scene-javascript');
}
