// @flow

import React from "react";
import { useTransition, animated } from "react-spring";

const FROM_STYLE = { opacity: 0 };
const TO_STYLE = { opacity: 1 };

export function FadeIn(props: any) {
  const { children, useChildren, keys } = props;

  const transitions = useTransition(children || [], keys, {
    from: FROM_STYLE,
    enter: TO_STYLE,
    leave: FROM_STYLE,
    config: {
      duration: 1500,
    },
  } as any) as any
  

  return transitions.map(({ item, props, key }: any) =>
    item ? (
      <animated.div style={props} key={key}>
        {useChildren ? children : item}
      </animated.div>
    ) : null
  );
}

FadeIn.defaultProps = {
  duration: 200,
  keys: null,
};
