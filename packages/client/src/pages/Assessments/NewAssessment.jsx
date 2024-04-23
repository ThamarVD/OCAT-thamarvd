import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { AssessmentService } from '../../services/AssessmentService';

export const NewAssessment = () => {
  // create a form that utilizes the "onSubmit" function to send data to
  // packages/client/src/services/AssessmentService.js and then onto the packages/api/src/routes/assessment express API
  const parseData = (data) => {
    const newInstrumentType = `Cat Behavioral Instrument`;

    const newScore =
      data.hisses + !data.playsWithDogs + data.prevContact + data.catAltercations + data.ownerAltercations;

    let newRiskLevel;
    if (newScore >= 4) {
      newRiskLevel = `high`;
    } else if (newScore >= 2) {
      newRiskLevel = `medium`;
    } else {
      newRiskLevel = `low`;
    }

    const parsedData = {
      catDateOfBirth: Date.parse(data.catDateOfBirth),
      catName: data.catName,
      instrumentType: newInstrumentType,
      riskLevel: newRiskLevel,
      score: newScore,
    };

    return parsedData;
  };

  const onSubmit = async (data) => {
    await AssessmentService.submit(parseData(data));
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
        <input {...register(`catName`)} />
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
        Had 3 or more physical altercations with other cats:
        <input {...register(`catAltercations`)} type="checkbox" />
      </label>
      <br />
      <label>
        Has had physical altercations with the owner (scratching, biting, etc...):
        <input {...register(`ownerAltercations`)} type="checkbox" />
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
