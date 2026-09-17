import PlaceholderPage from "../_components/PlaceholderPage";

export default function Page() {
  return (
    <PlaceholderPage
      title={"No Tracking"}
      description={"This page fires zero Amplitude tracking calls, used to verify the scanner correctly flags fully untracked pages."}
    />
  );
}
