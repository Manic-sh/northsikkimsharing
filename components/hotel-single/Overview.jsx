const Overview = ({description}) => {
  return (
    <>
      <h3 className="text-22 fw-500">Overview</h3>
      <p className="text-dark-1 text-15 mt-10">
          {description}
      </p>
      <a
        href="#"
        className="d-block text-14 text-blue-1 fw-500 underline mt-10"
      >
        Show More
      </a>
    </>
  );
};

export default Overview;
