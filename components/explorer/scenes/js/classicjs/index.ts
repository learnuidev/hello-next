import { exampleGame, javascript } from '../../../mock';
import { createPlayer, addButton } from '../../utils';

export const classicJS = {
    title: 'classic',
    topics: [
        {
            id: 'classic/intro',
            sceneId: 'classic/intro',
            title: 'introduction',
        },
        {
            id: 'classic/this-is-an-object',
            sceneId: 'classic/this-is-an-object',
            title: 'this is an object',
        },
        {
            id: 'classic/data',
            sceneId: 'classic/data',
            title: 'data',
        },
        {
            id: 'classic/code',
            sceneId: 'classic/code',
            title: 'code',
        },
        {
            id: 'classic/three-ways-to-look-at-object',
            sceneId: 'classic/three-ways-to-look-at-object',
            title: 'object: three perspectives',
        },
    ],
    availabeThemes: ['liverpoolfc'],
};

export const initClassicJsScene = ({ kaboomGame }) => {
    kaboomGame.scene('re-classic-js', () => {
        kaboomGame.loadBean().then(() => {
            const player = createPlayer({ kaboomGame });

            // Game ROom ====

            const gamesRoomBtn = addButton(kaboomGame, {
                id: 'button/back-to-lobby',
                text: 'back to lobby',
                pos: kaboomGame.vec2(kaboomGame.center().x + 500, kaboomGame.center().y - 330),
                size: 30,
                onClick: () => {
                    // kaboomGame.debug.log('TODO: Create games room');
                    kaboomGame.go('lobby');
                },
            });

            const gamesTitle = addButton(kaboomGame, {
                id: 'button/react-ecosystem-title',
                text: classicJS.title,
                pos: kaboomGame.vec2(kaboomGame.center().x, kaboomGame.center().y - 330),
                size: 30,
                onClick: () => {
                    // kaboomGame.debug.log('TODO: Create games room');
                    // kaboomGame.go('lobby');
                },
            });

            const btns = classicJS.topics.map((topic, idx) => {
                return addButton(kaboomGame, {
                    id: topic.id,
                    text: topic.title,
                    pos: kaboomGame.vec2(
                        kaboomGame.center().x,
                        kaboomGame.center().y - 180 + (idx === 0 ? 0 : idx * 80),
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
};
export const initScenes = ({ kaboomGame }) => {
    initClassicJsScene({ kaboomGame });

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
                text: classicJS.title,
                pos: kaboomGame.vec2(kaboomGame.center().x, kaboomGame.center().y - 230),
                size: 30,
                onClick: () => {
                    // kaboomGame.debug.log('TODO: Create games room');
                    // kaboomGame.go('lobby');
                },
            });

            const btns = classicJS.topics.map((topic, idx) => {
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
                text: classicJS.title,
                pos: kaboomGame.vec2(kaboomGame.center().x, kaboomGame.center().y - 230),
                size: 30,
                onClick: () => {
                    // kaboomGame.debug.log('TODO: Create games room');
                    // kaboomGame.go('lobby');
                },
            });

            const btns = classicJS.topics.map((topic, idx) => {
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
                text: classicJS.title,
                pos: kaboomGame.vec2(kaboomGame.center().x, kaboomGame.center().y - 230),
                size: 30,
                onClick: () => {
                    // kaboomGame.debug.log('TODO: Create games room');
                    // kaboomGame.go('lobby');
                },
            });

            const btns = classicJS.topics.map((topic, idx) => {
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
                text: classicJS.title,
                pos: kaboomGame.vec2(kaboomGame.center().x, kaboomGame.center().y - 230),
                size: 30,
                onClick: () => {
                    // kaboomGame.debug.log('TODO: Create games room');
                    // kaboomGame.go('lobby');
                },
            });

            const btns = classicJS.topics.map((topic, idx) => {
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
                text: classicJS.title,
                pos: kaboomGame.vec2(kaboomGame.center().x, kaboomGame.center().y - 230),
                size: 30,
                onClick: () => {
                    // kaboomGame.debug.log('TODO: Create games room');
                    // kaboomGame.go('lobby');
                },
            });

            const btns = classicJS.topics.map((topic, idx) => {
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
                text: classicJS.title,
                pos: kaboomGame.vec2(kaboomGame.center().x, kaboomGame.center().y - 230),
                size: 30,
                onClick: () => {
                    // kaboomGame.debug.log('TODO: Create games room');
                    // kaboomGame.go('lobby');
                },
            });

            const btns = classicJS.topics.map((topic, idx) => {
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
                text: classicJS.title,
                pos: kaboomGame.vec2(kaboomGame.center().x, kaboomGame.center().y - 230),
                size: 30,
                onClick: () => {
                    // kaboomGame.debug.log('TODO: Create games room');
                    // kaboomGame.go('lobby');
                },
            });

            const btns = classicJS.topics.map((topic, idx) => {
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

            player.onCollide('button/back-to-lobby', enemy => {
                kaboomGame.go('lobby');
                kaboomGame.debug.log('TODO: Create games room');
            });
        });
    });
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

            player.onCollide('button/back-to-lobby', enemy => {
                kaboomGame.go('lobby');
                kaboomGame.debug.log('TODO: Create games room');
            });
        });
    });

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

            player.onCollide('button/back-to-lobby', enemy => {
                kaboomGame.go('lobby');
                kaboomGame.debug.log('TODO: Create games room');
            });
        });
    });

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

    kaboomGame.go('scene-javascript');
};
