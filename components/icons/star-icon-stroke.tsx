interface Props {
  color?: string;
  width?: string;
  height?: string;
  className?: string;
}

const StarIconStroke = ({ color = '#FFC107', width = '14px', height = '14px', className = '' }: Props) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 16.696 16" className={className}>
      <path
        d="M12.7839 9.59342L12.7839 9.59344L15.869 6.61259L15.8706 6.61108C15.9843 6.50215 16.029 6.33352 15.9808 6.17737C15.9242 6.01618 15.7875 5.90643 15.6329 5.88388L15.6318 5.88372L11.5321 5.2766L11.528 5.27601L11.5281 5.27599C11.0677 5.204 10.6729 4.90799 10.4704 4.48673C10.4702 4.48626 10.47 4.48578 10.4698 4.48531L8.64244 0.727768C8.57832 0.602686 8.46227 0.520546 8.33269 0.5H8.11784L8.07054 0.51988L8.06144 0.523706L8.05219 0.527169L8.02507 0.537328L7.99934 0.566397L7.96498 0.593677L7.9164 0.632242C7.89724 0.653687 7.87892 0.67989 7.86276 0.710737L6.05949 4.48475L6.05739 4.48914L6.05737 4.48913C5.84484 4.92302 5.42823 5.22318 4.9464 5.27798L0.859606 5.88318C0.708863 5.90834 0.57707 6.01786 0.523995 6.17798L0.522702 6.18182C0.470153 6.33614 0.510954 6.50568 0.622955 6.61674C0.622975 6.61676 0.622995 6.61678 0.623015 6.6168C0.623053 6.61683 0.62309 6.61687 0.623127 6.61691L3.60164 9.56391L3.60441 9.56667C3.93233 9.89624 4.08056 10.3648 4.00676 10.8232L4.0055 10.831L4.00544 10.8309L3.27216 14.9689C3.23574 15.2082 3.39083 15.42 3.60108 15.4645C3.69139 15.4778 3.78391 15.4629 3.86748 15.4209L7.51376 13.4708C7.63643 13.403 7.7682 13.3598 7.90063 13.3397L7.93799 13.334H7.97578H8.19933H8.20662L8.2139 13.3342C8.43364 13.3406 8.65106 13.397 8.84848 13.5039L12.5002 15.4481L12.5053 15.4508L12.5053 15.4509C12.6421 15.5258 12.8067 15.5143 12.9313 15.4214L12.9422 15.4133L12.9423 15.4134C13.0694 15.3238 13.1378 15.1628 13.1092 14.9998L12.7839 9.59342ZM12.7839 9.59342L12.7797 9.59756C12.4493 9.92447 12.3005 10.3932 12.3747 10.8499L12.3746 10.8499L12.3759 10.857L13.1091 14.9994L12.7839 9.59342Z"
        fill="none"
        stroke={color}
      />
    </svg>
  );
};

export default StarIconStroke;
