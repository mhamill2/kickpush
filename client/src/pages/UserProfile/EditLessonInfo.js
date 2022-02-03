const EditLessonInfo = () => {
  return (
    <div className="p-4">
      <p className="mb-2">Select where you would like to give lessons</p>

      <div className="flex flex-col items-start pl-4">
        <label htmlFor="instructors-home">
          <input type="checkbox" className="mr-1" name="instructors-home" />
          Your Home
        </label>
        <label htmlFor="studnetsHome">
          <input type="checkbox" className="mr-1" name="instructors-home" />
          Students Home
        </label>
        <label htmlFor="instructors-home">
          <input type="checkbox" className="mr-1" name="instructors-home" />
          Skatepark
        </label>
        <label htmlFor="instructors-home">
          <input type="checkbox" className="mr-1" name="instructors-home" />
          Virtual
        </label>
      </div>

      <hr className="my-8" />

      <p className="mb-2">Select what age groups you teach</p>

      <div className="flex flex-col items-start pl-4">
        <label htmlFor="instructors-home">
          <input type="checkbox" className="mr-1" name="instructors-home" />
          Children
        </label>
        <label htmlFor="instructors-home">
          <input type="checkbox" className="mr-1" name="instructors-home" />
          Teens
        </label>
        <label htmlFor="instructors-home">
          <input type="checkbox" className="mr-1" name="instructors-home" />
          Adults
        </label>
      </div>

      <hr className="my-8" />

      <p className="mb-2">Select what skill levels you teach</p>

      <div className="flex flex-col items-start pl-4">
        <label htmlFor="instructors-home">
          <input type="checkbox" className="mr-1" name="instructors-home" />
          Beginner
        </label>
        <label htmlFor="instructors-home">
          <input type="checkbox" className="mr-1" name="instructors-home" />
          Intermediate
        </label>
        <label htmlFor="instructors-home">
          <input type="checkbox" className="mr-1" name="instructors-home" />
          Advanced
        </label>
      </div>
    </div>
  );
};

export default EditLessonInfo;
