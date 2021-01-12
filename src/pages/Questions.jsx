import React, { useState, useEffect } from 'react';
import Layout from '../components/Layouts/Layout';

import { getQuestion } from '../utilities/dataStore';
import { getItemFromLocalStorage } from '../utilities/localStorage';

const Questions = () => {
  const [userInfo, setUserInfo] = useState({});
  const [questionBank, setQuestionBank] = useState([]);
  const [score, setscore] = useState(0);
  const [responses, setResponses] = useState(0);
  // Function to get question from ./question
  const getQuestions = () => {
    getQuestion().then((question) => {
      setQuestionBank(question);
    });
  };

  useEffect(async () => {
    getQuestions();
    const user = getItemFromLocalStorage('authUserInfo')
      ? getItemFromLocalStorage('authUserInfo')
      : {};
    setUserInfo(user);
  }, []);

  console.log(questionBank);
  console.log(userInfo);

  return (
    <Layout>
      <div className='row'>
        <div className='col-12 col-sm-12 col-md-8 mx-auto'>
          <form action=''>
            {questionBank && questionBank.length > 0 ? (
              questionBank.map(({ question, answers, correct, questionId }) => {
                return (
                  <div key={questionId} className='mb-3'>
                    <label
                      htmlFor='exampleFormControlInput1'
                      className='form-label'
                    >
                      {question}
                    </label>
                    {answers.map((ans, i) => {
                      return (
                        <div key={ans} className='form-check'>
                          <input
                            className='form-check-input'
                            type='radio'
                            name='flexRadioDefault'
                            id={ans}
                          />
                          <label
                            className='form-check-label'
                            htmlFor='flexRadioDefault1'
                          >
                            {ans}
                          </label>
                        </div>
                      );
                    })}
                  </div>
                );
              })
            ) : (
              <p>Questions not found</p>
            )}
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Questions;
