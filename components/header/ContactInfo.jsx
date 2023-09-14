const ContactInfo = () => {
  const contactContent = [
    {
      id: 1,
      title: "Toll Free Customer Care",
      action: "tel: +(91) 769 911 2177",
      text: "+(91) 769 911 2177",
    },
    {
      id: 2,
      title: "Need live support?",
      action: "mailto:support@northsikkimsharing.com",
      text: "support@northsikkimsharing.com",
    },
  ];
  return (
    <>
      {contactContent.map((item) => (
        <div className="mb-20" key={item.id}>
          <div className={"text-14"}>{item.title}</div>
          <a href={item.action} className="text-18 fw-500 text-light-1 mt-5">
            {item.text}
          </a>
        </div>
      ))}
    </>
  );
};

export default ContactInfo;
