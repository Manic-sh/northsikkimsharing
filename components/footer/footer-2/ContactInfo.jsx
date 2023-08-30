const ContactInfo = () => {
  const contactContent = [
    {
      id: 1,
      title: "Toll Free Customer Care",
      action: "tel: +(91) 769 911 2177",
      text: "tel: +(91) 769 911 2177",
    },
    {
      id: 2,
      title: "Need live support?",
      action: "mailto:northsikkimsharing@gmail.com",
      text: "support@northsikkimsharing.com",
    },
  ];
  return (
    <>
      {contactContent.map((item) => (
        <div className="mt-30" key={item.id}>
          <div className={"text-14 mt-30"}>{item.title}</div>
          <a href={item.action} className="text-18 fw-500 text-white mt-5">
            {item.text}
          </a>
        </div>
      ))}
    </>
  );
};

export default ContactInfo;
