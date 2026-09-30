import { ChevronRight, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";

/**
 * Compact breadcrumb trail for the student detail screens, rendered as
 * `Home > Jobs > Company`.
 *
 * The parent crumb stays clickable so it keeps providing the navigation that
 * the removed "Back to ..." buttons used to offer. `onClick` takes precedence
 * over `to` when a screen needs to restore a more specific history entry
 * (for example, the list the user actually came from).
 */
export function PageBreadcrumb({
  parentLabel,
  to,
  onClick,
  currentLabel,
  homeTo = "/dashboard",
}: {
  parentLabel: string;
  to?: string;
  onClick?: () => void;
  currentLabel: string;
  homeTo?: string;
}) {
  const navigate = useNavigate();

  return (
    <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-sm">
      <button
        type="button"
        onClick={() => navigate(homeTo)}
        className="text-cyan-600 transition hover:text-cyan-700"
        aria-label="Home"
      >
        <Home size={18} />
      </button>
      <ChevronRight size={15} className="text-slate-400" />
      <button
        type="button"
        onClick={() => (onClick ? onClick() : navigate(to ?? "/"))}
        className="font-medium text-slate-500 transition hover:text-cyan-600"
      >
        {parentLabel}
      </button>
      <ChevronRight size={15} className="text-slate-400" />
      <span className="font-bold text-slate-900">{currentLabel}</span>
    </nav>
  );
}