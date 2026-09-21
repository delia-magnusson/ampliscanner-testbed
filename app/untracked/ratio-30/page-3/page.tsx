import UntrackedGroupNav from "../../../_components/UntrackedGroupNav";

export default function Page() {
  return (
    <>
      <UntrackedGroupNav group="ratio-30" currentPage={3} totalPages={10} />
      <main className="page">
        <h1>Ratio 30 — Page 3</h1>
        <p>
          One of 10 pages in this group; this one is deliberately silent, firing no Amplitude
          tracking of any kind - no autocapture, no custom events.
        </p>
      </main>
    </>
  );
}
