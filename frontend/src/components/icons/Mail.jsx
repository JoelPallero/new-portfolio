const Mail = ({bgColor = '#0288D1', letterColor = '#ffffff'}) => {
  return (
    <svg height="100" viewBox="0 0 20 20" width="100" xmlns="http://www.w3.org/2000/svg">
      <g fill="none" fillRule="evenodd" stroke={letterColor} strokeLinecap="round" strokeLinejoin="round"
        transform="translate(3.5 4.5)">
        <path
          d="m0 2v8c0 1.1045695.8954305 2 2 2h10c1.1045695 0 2-.8954305 2-2v-8c0-1.1045695-.8954305-2-2-2h-10c-1.1045695 0-2 .8954305-2 2z" />
        <path d="m2 3 5 3 5-3" />
      </g>
    </svg>
  );
}

export default Mail;