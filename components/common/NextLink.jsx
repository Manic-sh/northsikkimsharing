import Link from 'next/link';

const LinkWrapper = ({ href, disabled, ...props }) => {
  if (href === "#" || disabled) {
    return <button disabled {...props}>View</button>;
  }
  return (
    <Link href={href}>
      <button {...props}>View <div className="icon-arrow-top-right ml-15"></div></button>
    </Link>
  );
};
 export default LinkWrapper;