/* eslint-disable no-const-assign */
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Layout from '../components/Layouts/Layout';

import { getQuestion } from '../utilities/dataStore';
import { getItemFromLocalStorage, setItemToLocalStorage } from '../utilities/localStorage';

const Questions = () => {
  const history = useHistory();
  const [userInfo, setUserInfo] = useState({});
  const [questionBank, setQuestionBank] = useState([]);
  const [answerSheet, setAnswerSheet] = useState([]);
  // Function to get question 
  const getQuestions = () => {
    getQuestion().then((question) => {
      setQuestionBank(question);
    });
  };

  useEffect(() => {
    getQuestions();
    const user = getItemFromLocalStorage('authUserInfo')
      ? getItemFromLocalStorage('authUserInfo')
      : {};
    setUserInfo(user);
  }, []);
  // radio Box Handler
  const radioBoxHandler = (value, item) => {
    const answerSheetNew = [...answerSheet];
    const existItem = answerSheetNew.find((x) => x.questionId === item.questionId);
    if (existItem) {
       answerSheetNew.map((x) => x.questionId === existItem.questionId ? x.answer=value : x);
       setAnswerSheet(answerSheetNew);
       return;
    } 
    setAnswerSheet([...answerSheetNew, { ...item, answer: value }]);
  };

  // Submit Handler
  const submitHandler = (e) => {
    e.preventDefault();
    const answerDB = getItemFromLocalStorage('answerDB') ? getItemFromLocalStorage('answerDB') : [];
    if (answerSheet.length > 0) {
      const currentDate = new Date();
      const newArray = [...answerDB, {userId: userInfo.id, createdAt: currentDate.getTime(), updatedAt: currentDate.getTime(), ...answerSheet}]
      setItemToLocalStorage('answerDB', newArray )
      setAnswerSheet([]);
      e.target.reset();
      if (userInfo.role === 'admin') {
        history.push('/react-quiz-app/admin/answer');
      }
      history.push('/react-quiz-app/user/answer');
    }
  }

  return (
    <Layout>
      <div className='row'>
        <div className='col-12 col-sm-12 col-md-8 mx-auto'>
          <form onSubmit={submitHandler}>
            {questionBank && questionBank.length > 0 ? (
              questionBank.map((item) => {
                return (
                  <div key={item.questionId} className='mb-3'>
                    <label htmlFor='question' className='form-label h5'>
                      {item.question}
                    </label>
                    {item.answers.map((answer, i) => {
                      return (
                        <div key={answer} className='form-check'>
                          <input
                            className='form-check-input'
                            type='radio'
                            name={item.questionId}
                            id={answer}
                            value={answer}
                            onChange={(e) =>
                              radioBoxHandler(e.target.value, item)
                            }
                          />
                          <label className='form-check-label' htmlFor={answer}>{answer}</label>
                        </div>
                      );
                    })}
                  </div>
                );
              })
            ) : (
              <p>Questions not found</p>
            )}
            <button disabled={Object.keys(userInfo).length === 0 && answerSheet.length === 0} className=' btn btn-outline-primary pe-4 ps-4'>
              Submit
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Questions;
