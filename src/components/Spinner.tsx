
function Spinner() {
  return (
    <div className="flex justify-center items-center w-full py-4">
      <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-red-600"></div>
      <span className="sr-only">Loading...</span>
    </div>
  );
}

export default Spinner;
