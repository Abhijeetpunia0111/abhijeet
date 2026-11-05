import { useEffect, useRef, useState, type RefObject } from 'react';

export type FaceDirection =
  | 'center'
  | 'left'
  | 'leftMid'
  | 'leftTop'
  | 'leftBottom'
  | 'leftBottomMid'
  | 'right'
  | 'rightMid'
  | 'rightTop'
  | 'rightBottom'
  | 'rightBottomMid';

const CENTER_RADIUS = 48; // px from face center treated as "looking at you"
const NEAR_THRESHOLD = 170; // px — inside this ring, use the subtler "mid" turn pose

type BaseBucket = 'left' | 'leftTop' | 'leftBottom' | 'right' | 'rightTop' | 'rightBottom';

const DIRECTIONS: { bucket: BaseBucket; angle: number }[] = [
  { bucket: 'right', angle: 0 },
  { bucket: 'rightBottom', angle: 45 },
  { bucket: 'rightTop', angle: -45 },
  { bucket: 'left', angle: 180 },
  { bucket: 'leftBottom', angle: 135 },
  { bucket: 'leftTop', angle: -135 },
];

function angularDiff(a: number, b: number): number {
  const diff = Math.abs(a - b) % 360;
  return diff > 180 ? 360 - diff : diff;
}

/**
 * Tracks the cursor relative to faceRef and returns which pre-rendered head-turn
 * pose (from assests/faces) best matches it: nearest of 6 compass directions by
 * angle, with a near/far variant picked by distance for the four that have one.
 */
export function useFaceDirection(faceRef: RefObject<HTMLElement | null>): FaceDirection {
  const [direction, setDirection] = useState<FaceDirection>('center');
  const rafScheduledRef = useRef(false);
  const pendingRef = useRef<{ dx: number; dy: number } | null>(null);

  useEffect(() => {
    const flush = () => {
      rafScheduledRef.current = false;
      const pending = pendingRef.current;
      if (!pending) return;
      const { dx, dy } = pending;
      const dist = Math.hypot(dx, dy);

      if (dist < CENTER_RADIUS) {
        setDirection('center');
        return;
      }

      const angleDeg = (Math.atan2(dy, dx) * 180) / Math.PI;
      let best = DIRECTIONS[0];
      let bestDiff = Infinity;
      for (const d of DIRECTIONS) {
        const diff = angularDiff(angleDeg, d.angle);
        if (diff < bestDiff) {
          bestDiff = diff;
          best = d;
        }
      }

      const near = dist < NEAR_THRESHOLD;
      switch (best.bucket) {
        case 'right':
          setDirection(near ? 'rightMid' : 'right');
          break;
        case 'left':
          setDirection(near ? 'leftMid' : 'left');
          break;
        case 'rightBottom':
          setDirection(near ? 'rightBottomMid' : 'rightBottom');
          break;
        case 'leftBottom':
          setDirection(near ? 'leftBottomMid' : 'leftBottom');
          break;
        case 'rightTop':
          setDirection('rightTop'); // no "near" variant rendered for this pose
          break;
        case 'leftTop':
          setDirection('leftTop');
          break;
      }
    };

    const handlePointerMove = (event: PointerEvent) => {
      const face = faceRef.current;
      if (!face) return;
      const rect = face.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      pendingRef.current = { dx: event.clientX - cx, dy: event.clientY - cy };
      if (!rafScheduledRef.current) {
        rafScheduledRef.current = true;
        requestAnimationFrame(flush);
      }
    };

    window.addEventListener('pointermove', handlePointerMove);
    return () => window.removeEventListener('pointermove', handlePointerMove);
  }, [faceRef]);

  return direction;
}
