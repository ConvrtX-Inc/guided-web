interface IBackdrop {
  children: any
}

const backdrop = ({ children }: IBackdrop) => {
  return (
    <div className='backdrop'>
      <div className='backdrop-content'>
        {children}
      </div>
    </div>
  );
};

export default backdrop;