import { DetailCard } from "../shared/DetailCard";

export function ReviewsCard() {
  return (
    <DetailCard>
      <h2 className="text-sm font-bold text-slate-800 sm:text-base">
        Reviews from Students
      </h2>
      <div className="mt-3 flex items-center gap-2">
        <span className="text-2xl font-bold text-slate-800">4.2</span>
        <span className="text-sm tracking-wide text-orange-400">
          ★★★★<span className="text-slate-200">★</span>
        </span>
        <span className="text-[10px] text-slate-500">(320 Reviews)</span>
      </div>
      <p className="mt-3 text-xs leading-5 text-slate-600">
        The interview process is smooth and the work culture is great.
      </p>
      <p className="mt-2 text-[10px] font-medium text-slate-500">– Anonymous</p>
    </DetailCard>
  );
}
