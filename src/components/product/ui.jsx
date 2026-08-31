import { Link } from 'react-router-dom';

export function Eyebrow({ children }) {
  return (
    <p className="font-mono text-[11px] sm:text-xs tracking-[0.22em] uppercase text-signal">
      {children}
    </p>
  );
}

export function SectionHeading({ eyebrow, title, titleId, children, align = 'left', as: Heading = 'h2' }) {
  const alignment = align === 'center' ? 'text-center mx-auto' : 'text-left';
  return (
    <div className={`max-w-3xl ${alignment} mb-10 md:mb-14`}>
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <Heading
        id={titleId}
        className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-bone mt-3"
      >
        {title}
      </Heading>
      {children ? (
        <p className="mt-4 text-base sm:text-lg text-neutral-400 leading-relaxed">{children}</p>
      ) : null}
    </div>
  );
}

export function PrimaryButton({ to, href, onClick, children, className = '', type = 'button' }) {
  const classes = `inline-flex items-center justify-center min-h-12 px-6 py-3 rounded-sm bg-ember text-white font-semibold tracking-tight hover:bg-orange-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ember ${className}`;
  if (to) {
    return (
      <Link to={to} className={classes}>
        {children}
      </Link>
    );
  }
  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }
  return (
    <button type={type} onClick={onClick} className={classes}>
      {children}
    </button>
  );
}

export function SecondaryButton({ to, href, onClick, children, className = '' }) {
  const classes = `inline-flex items-center justify-center min-h-12 px-6 py-3 rounded-sm border border-line text-bone font-semibold tracking-tight hover:border-signal/60 hover:text-white ${className}`;
  if (to) {
    return (
      <Link to={to} className={classes}>
        {children}
      </Link>
    );
  }
  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }
  return (
    <button type="button" onClick={onClick} className={classes}>
      {children}
    </button>
  );
}

export function Panel({ as: Tag = 'div', className = '', children, ...props }) {
  return (
    <Tag className={`bg-panel/90 border border-line rounded-sm ${className}`} {...props}>
      {children}
    </Tag>
  );
}

export function SectionShell({ id, className = '', children, labelledBy }) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={`relative px-4 sm:px-6 py-20 md:py-28 ${className}`}
    >
      <div className="max-w-6xl mx-auto">{children}</div>
    </section>
  );
}
