import PlaceholderPage from "../../_components/PlaceholderPage";

export default function Page() {
  return (
    <PlaceholderPage
      title={"Page Views — Reused Value"}
      description={"A page that will fire a page view event that reuses a stale or incorrect value."}
      section={"pageviews"}
      current={"/pageviews/reused-value"}
    />
  );
}
