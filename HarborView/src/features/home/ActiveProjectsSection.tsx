import type { WorkspaceProject } from '../../data/types';
import './ActiveProjectsSection.css';

export function ActiveProjectsSection({ projects }: { projects: WorkspaceProject[] }) {
  return (
    <section className="hv-projects" aria-labelledby="hv-projects-heading">
      <div className="hv-panel-heading">
        <div>
          <p className="hv-panel-heading__eyebrow">Work in motion</p>
          <h2 id="hv-projects-heading" className="hv-section-heading hv-section-heading--secondary">Active projects</h2>
        </div>
        <span className="hv-panel-heading__count">{projects.length} active</span>
      </div>
      <div className="hv-projects__grid">
        {projects.map((project) => (
          <article className="hv-project" key={project.id}>
            <div className="hv-project__topline">
              <span className="hv-project__program">{project.program}</span>
              <span className={`hv-project__health hv-project__health--${project.health}`}>{project.statusLabel}</span>
            </div>
            <h3 className="hv-project__title">{project.title}</h3>
            <div className="hv-project__progress-row">
              <div className="hv-project__progress" role="progressbar" aria-label={`${project.title} progress`} aria-valuemin={0} aria-valuemax={100} aria-valuenow={project.progress}>
                <span style={{ width: `${project.progress}%` }} />
              </div>
              <span className="hv-project__percent">{project.progress}%</span>
            </div>
            <p className="hv-project__next"><span>Next:</span> {project.nextAction}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
