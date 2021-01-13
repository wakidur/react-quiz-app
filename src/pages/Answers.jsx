/* eslint-disable no-undef */
/* eslint-disable array-callback-return */
import React, { useEffect, useState } from 'react';
import Layout from '../components/Layouts/Layout';
import { getItemFromLocalStorage, setItemToLocalStorage } from '../utilities/localStorage';
import AlertMessage from '../components/Message/AlertMessage';


const Answers = () => {
  const [answersDB, setAnswersDB] = useState([]);
  const [allAnswerSheets, setAllAnswerSheets] = useState([]);
  const [userInfo, setUserInfo] = useState({});
  const [particularAnswerUpdate, setParticularAnswerUpdate] = useState({});
  const [particularAnswer, setParticularAnswer] = useState('');
  const [successMessage, setSuccessMessage] = useState();

  const processAnswerSheet = (answers, user) =>{
    if (answers.length > 0 && Object.keys(user).length > 0) {
        let element = [];
        answers.map((items) => {
            if (items.userId === user.id) {
                for (const key in items) {
                    if (Object.hasOwnProperty.call(items, key) &&
                        typeof items[key] === 'object') {
                        element = [...element, items[key]];
                    }
                }
            }
        });
        setAllAnswerSheets(element);
    }
}

  useEffect(() => {
    const answers = getItemFromLocalStorage('answerDB') ? getItemFromLocalStorage('answerDB') : []; 
    const user = getItemFromLocalStorage('authUserInfo') ? getItemFromLocalStorage('authUserInfo') : {};
    setAnswersDB(answers);
    setUserInfo(user);
    processAnswerSheet(answers, user);
  }, []);

  const updateHandler = (item) => {
    setParticularAnswerUpdate(item);
    setParticularAnswer(item.answer);
    setSuccessMessage('')
  };

  const updateSubmitHandler = (e) => {
    e.preventDefault();
    const newAnsDB = [...answersDB];
    if (particularAnswer && particularAnswerUpdate) {
        for (let i = 0; i < newAnsDB.length; i++) {
            for (const key in newAnsDB[i]) {
                if (Object.hasOwnProperty.call(newAnsDB[i], key) && typeof newAnsDB[i][key] === 'object') {
                    if(newAnsDB[i][key].questionId === particularAnswerUpdate.questionId) {
                        newAnsDB[i][key].answer = particularAnswer;
                    } 
                }
            } 
        }  
    }
    e.target.reset();
    setParticularAnswerUpdate({});
    setParticularAnswer('');
    setItemToLocalStorage('answerDB', newAnsDB);
    processAnswerSheet(newAnsDB, userInfo);
    setSuccessMessage('Particular Question update successurl');    
  };


  return (
    <Layout>
      <div className='row'>
        <div className='table-responsive'>
          <table className='table'>
            <thead>
              <tr>
                <th scope='col'>ID</th>
                <th scope='col'>Question</th>
                <th scope='col'>My Answer</th>
                <th scope='col'>Correct</th>
                <th scope='col'>Result</th>
                <th scope='col'>Action</th>
              </tr>
            </thead>
            <tbody>
              {allAnswerSheets && allAnswerSheets.length > 0 ? (
                allAnswerSheets.map((item, i) => (
                  <tr key={item.questionId + i}>
                    <td>{item.questionId}</td>
                    <td>{item.question}</td>
                    <td>{item.answer}</td>
                    <td>{item.correct}</td>
                    <td>
                      {item.answer === item.correct ? (
                        <i className='bi bi-check2 text-info fs-4'></i>
                      ) : (
                        <i className='bi bi-x text-danger fs-4'></i>
                      )}
                    </td>
                    <td>
                      <button data-bs-toggle="modal" data-bs-target="#answerEditModal" onClick={() => updateHandler(item)} className='btn'>
                        <i className='bi bi-pencil-square'></i>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6">Data not found </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      {/* Modal  */}
      <div
        className='modal fade'
        id='answerEditModal'
        tabIndex='-1'
        data-bs-backdrop="static" 
        data-bs-keyboard="false" 
        aria-labelledby='answerEditModalLabel'
        aria-hidden='true'
      >
        <div className='modal-dialog modal-dialog-centered modal-dialog-scrollable'>
          <div className='modal-content'>
            <form onSubmit={updateSubmitHandler}>
              <div className='modal-header'>
                <h5 className='modal-title' id='answerEditModalLabel'>
                  Update Answer
                </h5>
                <button
                  type='button'
                  className='btn-close'
                  data-bs-dismiss='modal'
                  aria-label='Close'
                ></button>
              </div>
              <div className='modal-body'>
                  {
                      successMessage && successMessage ? <AlertMessage message={successMessage} alertClassType="alert-success" /> : null
                  }
                {particularAnswerUpdate &&
                Object.keys(particularAnswerUpdate).length > 0 ? (
                  <div className='mb-3'>
                    <label htmlFor='AnswerUpdate' className='form-label h5' >
                      {particularAnswerUpdate.question}
                    </label>
                    {particularAnswerUpdate.answers.map((answer, i) => {
                      return (
                        <div key={answer} className='form-check'>
                          <input
                            className='form-check-input'
                            type='radio'
                            name={particularAnswerUpdate.questionId}
                            id={answer}
                            value={answer}
                            onChange={(e) => setParticularAnswer(e.target.value)}
                          />
                          <label className='form-check-label' htmlFor={answer}>
                            {answer}
                          </label>
                        </div>
                      );
                    })}
                  </div>
                ) : null}
              </div>
              <div className='modal-footer'>
                <button
                  type='button'
                  className='btn btn-secondary'
                  data-bs-dismiss='modal'
                >
                  Close
                </button>
                <button  type='submit' id="updateBtn" className='btn btn-primary'>
                  Save changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Answers;
 

