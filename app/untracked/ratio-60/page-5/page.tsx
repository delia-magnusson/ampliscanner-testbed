import UntrackedGroupNav from "../../../_components/UntrackedGroupNav";

export default function Page() {
  return (
    <>
      <UntrackedGroupNav group="ratio-60" currentPage={5} totalPages={10} />
      <main className="page">
        <h1>Ratio 60 — Page 5</h1>
        <p>
          One of 10 pages in this group; this one is deliberately silent, firing no Amplitude
          tracking of any kind - no autocapture, no custom events.
        </p>
      </main>
    </>
  );
}
