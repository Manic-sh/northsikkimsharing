const BlockGuide = () => {
  const blockContent = [
    {
      id: 1,
      icon: "/img/featureIcons/2/1.svg",
      title: "Find & select Package",
      text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
      delayAnim: "0",
    },
    {
      id: 2,
      icon: "/img/featureIcons/2/2.svg",
      title: "Upload Personal Information",
      text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
      delayAnim: "50",
    },
    {
      id: 3,
      icon: "/img/featureIcons/2/3.svg",
      title: "Book Online",
      text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
      delayAnim: "100",
    },
  ];

  return (
    <>
      {blockContent.map((item) => (
        <div
          className="col-lg-4 col-sm-6 "
          data-aos="fade"
          data-aos-delay={item.delayAnim}
          key={item.id}
        >
          <div className="featureIcon -type-1 -hover-shadow px-50 py-50 lg:px-24 lg:py-15 border gap-10">
            <div className="d-flex justify-center">
              <img src={item.icon} alt="image" className="js-lazy" />
            </div>
            <div className="text-center mt-30">
              <h4 className="text-18 fw-500">{item.title}</h4>
              <p className="text-15 mt-10">{item.text}</p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default BlockGuide;
