const EditRates = () => {
  return (
    <div className="p-4">
      <p className="mb-5">Specify your hourly rates for private lessons, group lessons.</p>

      <div>
        <label htmlFor="private-rate" className="inline-block w-28 text-left">
          Private Rate:
        </label>
        <input type="number" name="private-rate" id="private-rate" className="border border-gray-300 rounded p-1 w-20" /> /hr
      </div>
      <div className="mt-4">
        <label htmlFor="group-rate" className="inline-block w-28 text-left">
          Group Rate:
        </label>
        <input type="number" name="group-rate" id="group-rate" className="border border-gray-300 rounded p-1 w-20" /> /hr
      </div>

      <hr className="mt-8" />

      <div></div>
    </div>
  );
};

export default EditRates;
