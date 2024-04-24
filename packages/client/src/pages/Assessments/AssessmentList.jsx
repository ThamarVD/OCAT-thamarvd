import { useEffect, useState } from 'react';
import { AssessmentService } from '../../services/AssessmentService';
import { AssessmentTable } from './Components/AssessmentTable';

export const AssessmentList = () => {
  const [ assessments, setAssessments ] = useState([]);

  const fetchAssessments = async () => {
    setAssessments(await AssessmentService.getList());
  };

  const deleteElementById = async (elementId) => {
    await AssessmentService.delete(elementId);
    fetchAssessments();
  };

  // fetch all assessments using the AssessmentService.getList function from OCAT/client/services/AssessmentService.js
  useEffect(() => {
    fetchAssessments();
  }, [ ]);

  return (
    <>
      <AssessmentTable
        catAssessments={assessments}
        deleteElementById={deleteElementById}
      />
    </>
  );
};
