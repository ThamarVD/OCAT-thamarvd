import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { AssessmentService } from '../../services/AssessmentService';

export const NewAssessment = () => {
  // create a form that utilizes the "onSubmit" function to send data to
  // packages/client/src/services/AssessmentService.js and then onto the packages/api/src/routes/assessment express API
  const onSubmit = async (data) => {
    const newScore = data.hisses + !data.playsWithDogs + data.prevContact + data.repeatedAltercation;
    const submissionData = {
      catDateOfBirth: data.catDateOfBirth,
      catName: data.catname,
      score: newScore,
    };
    await AssessmentService.submit(submissionData);
  };

  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm();

  return (
    <form onSubmit={handleSubmit((data) => onSubmit(data))} >
      <label>
        Cat Name:
        <input {...register(`catname`)} />
      </label>
      <br />
      <label>
        Cat Date of Birth:
        <input type="date" {...register(`catDateOfBirth`)} />
      </label>
      <br />
      <label>
        Previous contact with the Cat Judicial System:
        <input {...register(`prevContact`)} type="checkbox" />
      </label>
      <br />
      <label>
        Had 3 or more physical altercations with owner (scratching, biting, etc...):
        <input {...register(`repeatedAltercation`)} type="checkbox" />
      </label>
      <br />
      <label>
        Plays well with dogs:
        <input {...register(`playsWithDogs`)} type="checkbox" />
      </label>
      <br />
      <label>
        Hisses at strangers:
        <input {...register(`hisses`)} type="checkbox" />
      </label>
      <br />
      <Button variant="primary" type="submit">Submit</Button>
    </form>
  );
};
