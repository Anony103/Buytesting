import PropTypes from 'prop-types';

function SignOutButton({ onClick, className }) {
  return (
    <div className={`w-full flex justify-center items-center px-4 ${className}`}>
        <button
        onClick={onClick}
        className={`flex justify-center items-center gap-2 bg-[#D60606] text-[#fff] py-3 text-[.8rem] md:text-[1rem] rounded-[5px] ${className}`}
        >
            <i className='bx bx-log-out text-[.8rem] md:text-[1.5rem]'></i>Log Out
        </button>
    </div>
  );
}

SignOutButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
};

SignOutButton.defaultProps = {
  className: '',
};

export default SignOutButton;