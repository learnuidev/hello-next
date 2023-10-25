// helpers
export function createPlayer ({ kaboomGame }: any) {
    const player = kaboomGame.add([
        kaboomGame.sprite('bean'), // renders as a sprite
        kaboomGame.pos(120, 80), // position in world
        kaboomGame.area(), // has a collider
        // body(), // responds to physics and gravity
    ]);

    kaboomGame.onKeyPress('space', () => {
        // .jump() is provided by the body() component
        // player.jump();
    });

    kaboomGame.onKeyDown('left', () => {
        // .jump() is provided by the body() component
        player.pos.x = player.pos.x - 1 * 5;
    });
    kaboomGame.onKeyDown('right', () => {
        // .jump() is provided by the body() component
        player.pos.x = player.pos.x + 1 * 5;
    });
    kaboomGame.onKeyDown('up', () => {
        // .jump() is provided by the body() component
        player.pos.y = player.pos.y - 1 * 5;
    });
    kaboomGame.onKeyDown('down', () => {
        // .jump() is provided by the body() component
        player.pos.y = player.pos.y + 1 * 5;
    });

    return player;
}

export function addButton (kaboomGame: any, { text, pos, onClick, size, id }: any) {
    const btn = kaboomGame.add([
        kaboomGame.text(text, {
            size,
        }),
        kaboomGame.pos(pos),
        kaboomGame.area({ cursor: 'pointer' }),
        kaboomGame.scale(1),
        // kaboomGame.origin('center'),
        id,
    ]);

    btn.onClick(onClick);

    btn.onUpdate(() => {
        if (btn.isHovering()) {
            const t = kaboomGame.time() * 10;
            // btn.color = rgb(kaboomGame.wave(0, 255, t), kaboomGame.wave(0, 255, t + 2), kaboomGame.wave(0, 255, t + 4));
            btn.scale = kaboomGame.vec2(1.2);
        } else {
            btn.scale = kaboomGame.vec2(1);
            btn.color = kaboomGame.rgb();
        }
    });

    return btn;
}
