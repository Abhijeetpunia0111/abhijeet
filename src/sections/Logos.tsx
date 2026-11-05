import type { CSSProperties, ReactNode } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import lineLeft from '../assets/logos/line-left.svg';
import lineRight from '../assets/logos/line-right.svg';
import dot from '../assets/logos/dot.svg';
import quickplayIcon from '../assets/logos/quickplay-icon.svg';
import quickplayWordmark from '../assets/logos/quickplay-wordmark.svg';
import ahaLogo from '../assets/logos/aha-logo.svg';
import televisaUnivisionLogo from '../assets/logos/televisa-univision-logo.svg';
import sonyLivLogo from '../assets/logos/sonyliv-logo.png';
import drdoLogo from '../assets/logos/drdo-logo.png';
import rogersLogo from '../assets/logos/rogers-logo.svg';
import grayLogo from '../assets/logos/gray-logo.png';
import pluciaIcon from '../assets/logos/plucia-icon.svg';
import './Logos.css';

const LOGO_ITEMS: ReactNode[] = [
  <li className="logos__item logos__item--quickplay" key="quickplay">
    <img src={quickplayIcon} alt="Quickplay" />
    <img src={quickplayWordmark} alt="" aria-hidden="true" />
  </li>,
  <li className="logos__item" key="aha">
    <img src={ahaLogo} alt="aha" />
  </li>,
  <li className="logos__item" key="televisa">
    <img src={televisaUnivisionLogo} alt="Televisa Univision" />
  </li>,
  <li className="logos__item logos__item--sonyliv" key="sonyliv">
    <img src={sonyLivLogo} alt="Sony LIV" />
  </li>,
  <li className="logos__item" key="drdo">
    <img src={drdoLogo} alt="Defence Research and Development Organisation" />
  </li>,
  <li className="logos__item" key="rogers">
    <img src={rogersLogo} alt="Rogers" />
  </li>,
  <li className="logos__item" key="gray">
    <img src={grayLogo} alt="Gray" />
  </li>,
  <li className="logos__item logos__item--plucia" key="plucia">
    <img src={pluciaIcon} alt="" aria-hidden="true" />
    <span>Plucia AI</span>
  </li>,
];

export default function Logos() {
  const heading = useScrollReveal<HTMLDivElement>();
  const row = useScrollReveal<HTMLDivElement>();

  return (
    <section className="logos" aria-label="Clients and partners">
      <div
        className={`logos__heading reveal ${heading.visible ? 'reveal--visible' : ''}`}
        ref={heading.ref}
      >
        <img className="logos__line logos__line--left" src={lineLeft} alt="" aria-hidden="true" />
        <p className="logos__heading-text">
          Building for <strong>INDIA</strong>
          <img className="logos__dot" src={dot} alt="" aria-hidden="true" />
          impacting <strong>Billions</strong>
        </p>
        <img className="logos__line logos__line--right" src={lineRight} alt="" aria-hidden="true" />
      </div>

      <div
        className={`logos__marquee reveal ${row.visible ? 'reveal--visible' : ''}`}
        ref={row.ref}
        style={{ '--reveal-delay': '0.12s' } as CSSProperties}
      >
        <div className="logos__track">
          <ul className="logos__row">{LOGO_ITEMS}</ul>
          <ul className="logos__row" aria-hidden="true">
            {LOGO_ITEMS}
          </ul>
        </div>
      </div>
    </section>
  );
}
