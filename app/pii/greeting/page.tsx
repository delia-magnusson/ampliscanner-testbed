import PlaceholderPage from "../../_components/PlaceholderPage";

export default function Page() {
  return (
    <PlaceholderPage
      title={"PII — Greeting"}
      description={"A personalised greeting page that will later fire a tracking event containing a user's name as an event property."}
      section={"pii"}
      current={"/pii/greeting"}
    />
  );
}
