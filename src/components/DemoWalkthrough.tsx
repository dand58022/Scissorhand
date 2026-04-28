import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import type { DemoWalkthroughStep } from '@/lib/types';

interface DemoWalkthroughProps {
  step: DemoWalkthroughStep;
  stepIndex: number;
  totalSteps: number;
  onBack: () => void;
  onNext: () => void;
  onClose: () => void;
}

interface SpotlightRect {
  top: number;
  left: number;
  width: number;
  height: number;
}

interface CardPosition {
  top?: number;
  left?: number;
  right?: number;
  bottom?: number;
  mode: 'anchored' | 'safe-desktop' | 'safe-mobile';
}

const VIEWPORT_PADDING = 16;
const CARD_GAP = 24;
const AUTOPLAY_DELAY_MS = 5000;
const MOBILE_BREAKPOINT = 720;

export function DemoWalkthrough({ step, stepIndex, totalSteps, onBack, onNext, onClose }: DemoWalkthroughProps) {
  const cardRef = useRef<HTMLElement | null>(null);
  const [spotlightRect, setSpotlightRect] = useState<SpotlightRect | null>(null);
  const [cardPosition, setCardPosition] = useState<CardPosition>({ mode: 'safe-desktop', top: 16, right: 16 });
  const [isAutoplayPaused, setIsAutoplayPaused] = useState(false);
  const isFinalStep = stepIndex === totalSteps - 1;

  useLayoutEffect(() => {
    const target = document.querySelector<HTMLElement>(step.target);
    if (!target) {
      setSpotlightRect(null);
      setCardPosition(getSafePosition(window.innerWidth <= MOBILE_BREAKPOINT));
      return;
    }

    target.setAttribute('data-demo-active', 'true');
    target.scrollIntoView({ block: 'center', inline: 'nearest', behavior: 'smooth' });

    const syncLayout = () => {
      const cardElement = cardRef.current;
      if (!cardElement) {
        return;
      }

      const rect = target.getBoundingClientRect();
      const nextSpotlight = {
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height
      };

      setSpotlightRect(nextSpotlight);
      setCardPosition(getCardPosition({
        cardHeight: cardElement.offsetHeight,
        cardWidth: cardElement.offsetWidth,
        targetRect: nextSpotlight,
        viewportHeight: window.innerHeight,
        viewportWidth: window.innerWidth
      }));
    };

    const rafId = window.requestAnimationFrame(syncLayout);
    window.addEventListener('resize', syncLayout);
    window.addEventListener('scroll', syncLayout, true);

    return () => {
      target.removeAttribute('data-demo-active');
      window.cancelAnimationFrame(rafId);
      window.removeEventListener('resize', syncLayout);
      window.removeEventListener('scroll', syncLayout, true);
    };
  }, [step]);

  useEffect(() => {
    if (isAutoplayPaused || isFinalStep) {
      return;
    }

    const timer = window.setTimeout(() => {
      onNext();
    }, AUTOPLAY_DELAY_MS);

    return () => {
      window.clearTimeout(timer);
    };
  }, [isAutoplayPaused, isFinalStep, onNext, step.id]);

  useEffect(() => {
    if (isFinalStep) {
      setIsAutoplayPaused(true);
    }
  }, [isFinalStep]);

  const cardStyle = {
    top: cardPosition.top === undefined ? undefined : `${cardPosition.top}px`,
    left: cardPosition.left === undefined ? undefined : `${cardPosition.left}px`,
    right: cardPosition.right === undefined ? undefined : `${cardPosition.right}px`,
    bottom: cardPosition.bottom === undefined ? undefined : `${cardPosition.bottom}px`
  };

  function handleBack() {
    setIsAutoplayPaused(false);
    onBack();
  }

  function handleNext() {
    if (!isFinalStep) {
      setIsAutoplayPaused(false);
    }
    onNext();
  }

  function handlePauseToggle() {
    setIsAutoplayPaused((current) => !current);
  }

  return (
    <div className="demo-walkthrough" aria-live="polite">
      <div className="demo-walkthrough__backdrop" onClick={onClose} aria-hidden="true" />
      {spotlightRect && (
        <div
          className="demo-walkthrough__spotlight"
          style={{
            top: `${spotlightRect.top}px`,
            left: `${spotlightRect.left}px`,
            width: `${spotlightRect.width}px`,
            height: `${spotlightRect.height}px`
          }}
        />
      )}
      <aside ref={cardRef} className={`demo-walkthrough__card demo-walkthrough__card--${cardPosition.mode}`} style={cardStyle}>
        <p className="eyebrow">Demo walkthrough</p>
        <h2>{step.title}</h2>
        <p>{step.body}</p>
        <div className="demo-walkthrough__footer">
          <span className="demo-walkthrough__counter">{stepIndex + 1} / {totalSteps}</span>
          <div className="demo-walkthrough__actions">
            <button type="button" className="secondary-action" onClick={handleBack} disabled={stepIndex === 0}>
              Back
            </button>
            {!isFinalStep && (
              <button type="button" className="secondary-action" onClick={handlePauseToggle}>
                {isAutoplayPaused ? 'Resume' : 'Pause'}
              </button>
            )}
            <button type="button" className="secondary-action" onClick={onClose}>
              Close
            </button>
            <button type="button" className="primary-action" onClick={handleNext}>
              {isFinalStep ? 'Finish' : 'Next'}
            </button>
          </div>
        </div>
      </aside>
    </div>
  );
}

function getSafePosition(isMobile: boolean): CardPosition {
  return isMobile
    ? { mode: 'safe-mobile', left: VIEWPORT_PADDING, right: VIEWPORT_PADDING, bottom: VIEWPORT_PADDING }
    : { mode: 'safe-desktop', top: VIEWPORT_PADDING, right: VIEWPORT_PADDING };
}

function getCardPosition({
  cardHeight,
  cardWidth,
  targetRect,
  viewportHeight,
  viewportWidth
}: {
  cardHeight: number;
  cardWidth: number;
  targetRect: SpotlightRect;
  viewportHeight: number;
  viewportWidth: number;
}): CardPosition {
  const isMobile = viewportWidth <= MOBILE_BREAKPOINT;
  if (isMobile) {
    return getSafePosition(true);
  }

  const candidatePositions: Array<Omit<CardPosition, 'mode'> & { fits: boolean }> = [
    {
      top: clamp(targetRect.top + (targetRect.height - cardHeight) / 2, VIEWPORT_PADDING, viewportHeight - cardHeight - VIEWPORT_PADDING),
      left: targetRect.left + targetRect.width + CARD_GAP,
      fits: targetRect.left + targetRect.width + CARD_GAP + cardWidth <= viewportWidth - VIEWPORT_PADDING
    },
    {
      top: clamp(targetRect.top + (targetRect.height - cardHeight) / 2, VIEWPORT_PADDING, viewportHeight - cardHeight - VIEWPORT_PADDING),
      left: targetRect.left - cardWidth - CARD_GAP,
      fits: targetRect.left - CARD_GAP - cardWidth >= VIEWPORT_PADDING
    },
    {
      top: targetRect.top + targetRect.height + CARD_GAP,
      left: clamp(targetRect.left, VIEWPORT_PADDING, viewportWidth - cardWidth - VIEWPORT_PADDING),
      fits: targetRect.top + targetRect.height + CARD_GAP + cardHeight <= viewportHeight - VIEWPORT_PADDING
    },
    {
      top: targetRect.top - cardHeight - CARD_GAP,
      left: clamp(targetRect.left, VIEWPORT_PADDING, viewportWidth - cardWidth - VIEWPORT_PADDING),
      fits: targetRect.top - CARD_GAP - cardHeight >= VIEWPORT_PADDING
    }
  ];

  const chosenPosition = candidatePositions.find((candidate) => candidate.fits);
  if (chosenPosition) {
    return {
      mode: 'anchored',
      top: chosenPosition.top,
      left: clamp(chosenPosition.left ?? VIEWPORT_PADDING, VIEWPORT_PADDING, viewportWidth - cardWidth - VIEWPORT_PADDING)
    };
  }

  const targetArea = targetRect.width * targetRect.height;
  const viewportArea = viewportWidth * viewportHeight;
  const useSafeDesktop = targetArea / viewportArea > 0.2 || (
    targetRect.left < viewportWidth * 0.7 &&
    targetRect.left + targetRect.width > viewportWidth * 0.3 &&
    targetRect.top < viewportHeight * 0.7 &&
    targetRect.top + targetRect.height > viewportHeight * 0.3
  );

  return useSafeDesktop ? getSafePosition(false) : getSafePosition(false);
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}
