import { useRef } from 'react';
import { useFaceDirection, type FaceDirection } from '../hooks/useFaceDirection';
import { useScrollReveal } from '../hooks/useScrollReveal';
import heroBg from '../assets/hero/hero-bg.png';
import sparkTopLeft from '../assets/hero/spark-top-left.svg';
import sparkRight from '../assets/hero/spark-right.svg';
import faceCenter from '../../assests/faces/center.png';
import faceLeft from '../../assests/faces/left.png';
import faceLeftMid from '../../assests/faces/left-mid.png';
import faceLeftTop from '../../assests/faces/left-top.png';
import faceLeftBottom from '../../assests/faces/left-bottom.png';
import faceLeftBottomMid from '../../assests/faces/left-bottom-mid.png';
import faceRight from '../../assests/faces/right.png';
import faceRightMid from '../../assests/faces/right-mid.png';
import faceRightTop from '../../assests/faces/right-top.png';
import faceRightBottom from '../../assests/faces/right-bottom.png';
import faceRightBottomMid from '../../assests/faces/right-bottom-mid.png';
import './Hero.css';

const FACE_IMAGES: Record<FaceDirection, string> = {
  center: faceCenter,
  left: faceLeft,
  leftMid: faceLeftMid,
  leftTop: faceLeftTop,
  leftBottom: faceLeftBottom,
  leftBottomMid: faceLeftBottomMid,
  right: faceRight,
  rightMid: faceRightMid,
  rightTop: faceRightTop,
  rightBottom: faceRightBottom,
  rightBottomMid: faceRightBottomMid,
};

export default function Hero() {
  const faceRef = useRef<HTMLDivElement>(null);
  const direction = useFaceDirection(faceRef);
  const stage = useScrollReveal<HTMLDivElement>();

  return (
    <section className="hero" id="top" aria-label="Intro">
      <div
        className={`hero__stage reveal ${stage.visible ? 'reveal--visible' : ''}`}
        ref={stage.ref}
      >
        <img className="hero__bg" src={heroBg} alt="Portfolio" />

        <img
          className="hero__spark hero__spark--top-left"
          src={sparkTopLeft}
          alt=""
          aria-hidden="true"
        />
        <img
          className="hero__spark hero__spark--right"
          src={sparkRight}
          alt=""
          aria-hidden="true"
        />

        <div className="hero__face" ref={faceRef}>
          <img
            className="hero__face-img"
            src={FACE_IMAGES[direction]}
            alt="Illustrated character whose gaze follows your cursor"
          />
        </div>

        <p className="hero__meta hero__meta--year">2026</p>
        <p className="hero__meta hero__meta--role">Sr. Product Designer</p>
        <p className="hero__meta hero__meta--exp">4+ yr exp</p>
      </div>
    </section>
  );
}
