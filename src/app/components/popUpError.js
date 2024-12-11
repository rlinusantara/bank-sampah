const PopUpError = ({ msgError = "", uniq = false }) => {
  return (
    <section className="fixed top-0 left-0 bottom-0 right-0 bg-white z-10 flex justify-center  items-center">
      <section>
        <p className="text-center text-red-500  font-medium text-lg">
          {msgError}
        </p>
        {uniq ? (
          <p className="text-centerfont-semibold text-lg">
            Refresh untuk menghilangkan pop up
          </p>
        ) : (
          <p className="text-centerfont-semibold text-lg">
            Cobalah untuk merefresh halaman
          </p>
        )}
      </section>
    </section>
  );
};

export default PopUpError;
