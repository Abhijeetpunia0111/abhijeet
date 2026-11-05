import type { ReactNode } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import headingPostcard from '../assets/projects/heading-postcard.png';
import stamp from '../assets/projects/stamp.png';
import cardTexture from '../assets/projects/card-texture.png';
import statDivider from '../assets/projects/stat-divider.svg';
import unifiLogo from '../assets/projects/unifi-logo.png';
import unifiTvDevice from '../assets/projects/unifi-tv-device.png';
import unifiTabletDevice from '../assets/projects/unifi-tablet-device.png';
import unifiPhoneDevice from '../assets/projects/unifi-phone-device.png';
import finjoyLogo from '../assets/projects/finjoy-logo.png';
import finjoyHero from '../assets/projects/finjoy-hero.png';
import './Projects.css';

type ProjectCardProps = {
  logo: ReactNode;
  headline: ReactNode;
  tags: ReactNode[];
  media: ReactNode;
  statHeadline: ReactNode;
  statSub: string;
};

function ProjectCard({ logo, headline, tags, media, statHeadline, statSub }: ProjectCardProps) {
  const { ref, visible } = useScrollReveal<HTMLElement>();

  return (
    <article
      className={`project-card reveal ${visible ? 'reveal--visible' : ''}`}
      ref={ref}
    >
      <img className="project-card__stamp" src={stamp} alt="" aria-hidden="true" />
      <div className="project-card__surface">
        <img className="project-card__texture" src={cardTexture} alt="" aria-hidden="true" />

        <div className="project-card__info">
          {logo}
          <p className="project-card__headline">{headline}</p>
          <ul className="project-card__tags">
            {tags.map((tag, index) => (
              <li key={index}>{tag}</li>
            ))}
          </ul>
        </div>

        <div className="project-card__media">{media}</div>

        <div className="project-card__stat">
          <div className="project-card__stat-text">
            <p>{statHeadline}</p>
            <img className="project-card__stat-divider" src={statDivider} alt="" aria-hidden="true" />
            <p className="project-card__stat-sub">{statSub}</p>
          </div>
          <div className="project-card__stat-accent" aria-hidden="true" />
        </div>
      </div>
    </article>
  );
}

export default function Projects() {
  const header = useScrollReveal<HTMLDivElement>();

  return (
    <section className="projects" aria-label="Featured projects">
      <div
        className={`projects__header reveal ${header.visible ? 'reveal--visible' : ''}`}
        ref={header.ref}
      >
        <div className="projects__title-row">
          <span className="projects__eyebrow">Featured</span>
          <span className="projects__title">
            EXplore
            <img className="projects__title-icon" src={headingPostcard} alt="" aria-hidden="true" />
            projects
          </span>
        </div>
        <p className="projects__description">
          Blending research, design, and strategy to shape impactful solutions with a touch of interaction
        </p>
      </div>

      <div className="projects__list">
        <ProjectCard
          logo={<img className="project-card__logo project-card__logo--unifi" src={unifiLogo} alt="Unifi TV" />}
          headline="Redefining the Entertainment for Malaysian household with Unifi TV 2.0"
          tags={[
            <strong>Sr. Product Designer</strong>,
            <>
              <strong>0-1</strong> Product design
            </>,
            'OTT',
            'Mobile, web & TV designs',
          ]}
          media={
            <div className="project-card__devices">
              <img
                className="project-card__device project-card__device--tv"
                src={unifiTvDevice}
                alt="Unifi TV interface showing Guardians of the Galaxy"
              />
              <img
                className="project-card__device project-card__device--tablet"
                src={unifiTabletDevice}
                alt="Unifi TV avatar selection on tablet"
              />
              <img
                className="project-card__device project-card__device--phone"
                src={unifiPhoneDevice}
                alt="Unifi TV mobile app"
              />
            </div>
          }
          statHeadline={
            <>
              <strong>Reducing</strong> the time to live content from <strong>12sec to ~2sec</strong>
            </>
          }
          statSub="A 10-Day Sprint to Correct a Mental Model for 3.4 Million Users"
        />

        <ProjectCard
          logo={<img className="project-card__logo project-card__logo--finjoy" src={finjoyLogo} alt="Finjoy" />}
          headline={
            <>
              Unleash your financial potential with <strong>No investment</strong>
            </>
          }
          tags={[
            <strong>UI Designer</strong>,
            <>
              <strong>0-1</strong> Product design
            </>,
            'fintech',
            'Mobile designs',
          ]}
          media={
            <img className="project-card__hero" src={finjoyHero} alt="Finjoy mobile banking app on two phones" />
          }
          statHeadline={
            <>
              <strong>Reducing</strong> the time to live content from <strong>12sec to ~2sec</strong>
            </>
          }
          statSub="A 10-Day Sprint to Correct a Mental Model for 3.4 Million Users"
        />
      </div>
    </section>
  );
}
