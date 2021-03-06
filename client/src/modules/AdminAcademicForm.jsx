import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useStore } from "../store";
import InputLabel from "../components/InputLabel";
import FormSelect from "../components/FormSelect";
import Loading from "../components/Loading";
import FormInput from "../components/FormInput";
import FormTextArea from "../components/FormTextArea";
import FormDate from "../components/FormDate";

const AdminAcademicForm = ({ source, activities, levels, statusCategory }) => {
  const { title, activity, level, year, score, status, proof } = source;
  const navigate = useNavigate();
  const params = useParams();

  const isLoading = useStore((state) => state.isLoading);

  const updateAdminAcademic = useStore((state) => state.updateAdminAcademic);

  const [inputs, setInputs] = useState({});
  const [data, setData] = useState([]);
  const [checked, setChecked] = useState({
    activity: true,
    level: true,
    year: true,
    status: true,
    score: true,
    comment: true,
  });

  const activityOptions = activities.map((item) => item.activity);
  const activityMatch = levels.map((item) => item.activity);
  let index;

  const handleChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });

    if (e.target.name === "activity") {
      index = activityMatch.lastIndexOf(e.target.value);
      setData(levels[index].level);
    }
  };

  const handleClick = (e) => {
    setChecked({
      ...checked,
      [e.target.name]: !e.target.checked,
    });
  };

  const levelOptions = data.map((item) => item.name);

  const handleSubmit = (e) => {
    e.preventDefault();
    inputs.id = params.id;
    updateAdminAcademic(inputs, () => navigate("/admin"));
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="mt-5 p-10 card bg-base-200">
      <form className="form-control" onSubmit={handleSubmit}>
        <h1 className="text-center font-extrabold">Formulir Tinjauan</h1>
        <div className="flex flex-col md:flex-row justify-between">
          <div className="flex flex-col">
            <InputLabel label="Title" value={title} />
            <InputLabel label="Activity" value={activity} />
            <InputLabel label="Level" value={level} />
            <InputLabel label="Year" value={year} />
            <InputLabel label="Score" value={score} />
            <InputLabel label="Status" value={status} />
            <InputLabel label="Proof" image={proof} />
          </div>

          <div className="flex flex-col">
            <FormSelect
              name="activity"
              label="Activity"
              onChange={handleChange}
              onClick={handleClick}
              disabled={checked.activity}
              options={activityOptions}
            />

            <FormSelect
              name="level"
              label="Level"
              onChange={handleChange}
              onClick={handleClick}
              disabled={checked.level}
              options={levelOptions}
            />
            <FormDate
              name="year"
              label="Year"
              type="date"
              onChange={handleChange}
              onClick={handleClick}
              disabled={checked.year}
            />
            <FormSelect
              name="status"
              label="Status"
              onChange={handleChange}
              onClick={handleClick}
              disabled={checked.status}
              options={statusCategory}
            />
            <FormInput
              name="score"
              label="Score"
              onChange={handleChange}
              onClick={handleClick}
              disabled={checked.score}
            />
            <FormTextArea
              name="comment"
              label="Comment"
              onChange={handleChange}
              onClick={handleClick}
              disabled={checked.comment}
            />
          </div>
        </div>
        <button className="btn btn-primary mt-4">Submit</button>
      </form>
    </div>
  );
};

export default AdminAcademicForm;
