function Loader() {
  return (
    <div className="loader-wrapper">
      <div className="loader-spinner"></div>
      <p className="loader-text">Generating AI Roadmap...</p>
      <p className="loader-subtext">This may take a few seconds</p>
    </div>
  );
}
export default Loader;