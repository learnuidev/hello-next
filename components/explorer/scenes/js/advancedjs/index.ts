import { createPlayer, addButton } from '../../utils';
import { exampleGame, javascript } from '../../../mock';

export const advancedJS = {
    title: 'advanced js',
    topics: [
        {
            id: 'scene/state-management',
            sceneId: 're-state-management',
            title: 'state management',
        },
        {
            id: 'scene/routing',
            sceneId: 're-routing',
            title: 'routing',
        },
        {
            id: 'scene/react',
            sceneId: 're-react',
            title: 'react',
        },
    ],
};

export const initAdvancedJSScene = ({ kaboomGame }: any) => {
    kaboomGame.scene('re-advanced-js', () => {
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
                text: advancedJS.title,
                pos: kaboomGame.vec2(kaboomGame.center().x, kaboomGame.center().y - 230),
                size: 30,
                onClick: () => {
                    // kaboomGame.debug.log('TODO: Create games room');
                    // kaboomGame.go('lobby');
                },
            });

            const btns = advancedJS.topics.map((topic, idx) => {
                return addButton(kaboomGame, {
                    id: topic.id,
                    text: topic.title,
                    pos: kaboomGame.vec2(kaboomGame.center().x, 260 * (idx === 0 ? 1 : idx + 1)),
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
};
