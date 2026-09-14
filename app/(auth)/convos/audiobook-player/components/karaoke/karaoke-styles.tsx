"use client";

/**
 * Every karaoke animation lives here as plain CSS so the 60fps hot path can be
 * driven by requestAnimationFrame writing two custom properties per syllable —
 * no re-renders, no animation library in the middle.
 */
export const KaraokeStyles = () => (
  <style>{`
  .mn-k-token {
    --p: 0;
    --pop: 0;
    display: inline-block;
    background-image: linear-gradient(
      to right,
      var(--k-sung) calc(var(--p) * 100%),
      var(--k-unsung) 0
    );
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    -webkit-text-fill-color: transparent;
    /* Deliberately barely there: a 2% swell and three quarters of a pixel of
       lift, anchored to the baseline so the syllable grows upwards. Anything
       stronger reads as the text jumping around while you are reading it. */
    transform: translate3d(0, calc(var(--pop) * -0.75px), 0) scale(calc(1 + var(--pop) * 0.02));
    transform-origin: 50% 85%;
    /* The glow rides the sweep front: transparent until a syllable is actually
       being sung, so a resting line costs nothing. */
    text-shadow: 0 0 calc(14px * var(--pop)) rgba(var(--k-glow-rgb), calc(0.3 * var(--pop)));
  }

  .mn-k-line {
    transition:
      opacity 520ms cubic-bezier(0.22, 1, 0.36, 1),
      transform 640ms cubic-bezier(0.22, 1, 0.36, 1);
    border-radius: 20px;
  }

  .mn-k-line-active {
    transition:
      opacity 300ms ease,
      transform 720ms cubic-bezier(0.34, 1.4, 0.5, 1);
  }

  .mn-k-line-flash {
    animation: mn-k-flash 520ms ease-out;
  }

  .mn-k-stage {
    -webkit-mask-image: linear-gradient(
      to bottom,
      transparent 0%,
      #000 15%,
      #000 85%,
      transparent 100%
    );
    mask-image: linear-gradient(
      to bottom,
      transparent 0%,
      #000 15%,
      #000 85%,
      transparent 100%
    );
  }

  .mn-k-scroll {
    scrollbar-width: none;
    -ms-overflow-style: none;
    scroll-behavior: auto;
    /* The follow loop owns the scroll position; the browser's scroll anchoring
       would otherwise fight it whenever the window slides. */
    overflow-anchor: none;
  }

  .mn-k-scroll::-webkit-scrollbar {
    display: none;
    width: 0;
    height: 0;
  }

  .mn-k-kenburns {
    animation: mn-k-kenburns 28s ease-in-out infinite alternate;
  }

  .mn-k-breathe {
    animation: mn-k-breathe 9s ease-in-out infinite;
  }

  .mn-k-beat {
    animation: mn-k-beat 1100ms ease-out forwards;
  }

  @keyframes mn-k-flash {
    0% {
      background-color: var(--k-flash);
    }
    100% {
      background-color: transparent;
    }
  }

  @keyframes mn-k-kenburns {
    from {
      transform: scale(1.18) translate3d(-1.5%, -1.5%, 0);
    }
    to {
      transform: scale(1.4) translate3d(1.5%, 1.5%, 0);
    }
  }

  @keyframes mn-k-breathe {
    0%,
    100% {
      opacity: 0.22;
      transform: scale(1);
    }
    50% {
      opacity: 0.5;
      transform: scale(1.08);
    }
  }

  @keyframes mn-k-beat {
    0% {
      opacity: 0.5;
      transform: scale(0.94);
    }
    100% {
      opacity: 0;
      transform: scale(1.25);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .mn-k-kenburns,
    .mn-k-breathe,
    .mn-k-beat {
      animation: none !important;
    }

    .mn-k-line,
    .mn-k-line-active {
      transition-duration: 120ms !important;
    }
  }
`}</style>
);
