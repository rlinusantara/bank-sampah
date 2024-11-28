const ErrorPage = ({ err = "", statusCode = 0 }) => {
  return (
    <section className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center">
      <section className="text-center">
        <p className="text-red-400 font-medium text-xl">{statusCode}</p>
        <p className="text-red-400 font-medium text-xl">{err}</p>
      </section>
    </section>
  );
};

export default ErrorPage;
