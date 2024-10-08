const ArrowRight = ({letterColor}) => {
  return (
    <svg height="100" viewBox="0 0 21 21" width="100" xmlns="http://www.w3.org/2000/svg">
      <g fill="none" fillRule="evenodd" stroke={letterColor} strokeLinecap="round" strokeLinejoin="round"
        transform="translate(4 3)">
        <path d="m2.5 7.5 4 4.232 4-4.191" />
        <path d="m6.5.5v11" />
        <path d="m.5 14.5h12" />
      </g>
    </svg>
  );
}

export default ArrowRight;


