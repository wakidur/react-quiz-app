import React, { useState, useEffect } from 'react';
import Layout from '../components/Layouts/Layout';
import AlertMessage from '../components/Message/AlertMessage';

import { qBank } from '../utilities/dataStore';
import {
  getItemFromLocalStorage,
  setItemToLocalStorage,
} from '../utilities/localStorage';

const Quiz = () => {
  const [userInfo, setUserInfo] = useState({});
  const [questionBank, setQuestionBank] = useState(qBank);
  const [particularQuizUpdate, setParticularQuizUpdate] = useState({});
  const [particularQuiz, setParticularQuiz] = useState({
    question: '',
    answer1: '',
    answer2: '',
    answer3: '',
    answer4: '',
    correct: '',
  });
  const [successMessage, setSuccessMessage] = useState();

  useEffect(() => {
    const user = getItemFromLocalStorage('authUserInfo')
      ? getItemFromLocalStorage('authUserInfo')
      : {};
    setUserInfo(user);
  }, []);

  const updateHandler = (item) => {
    setParticularQuizUpdate(item);
  };

  const deleteHandler = (item) => {};

  const onChangeInputHandler = ({ target }) => {
    setParticularQuiz({
      ...particularQuiz,
      [target.name]: target.value,
    });
  };
  const addQuizSubmitHandler = (e) => {
    e.preventDefault();
    const eachQuiz = {
      question: '',
      answers: [],
      correct: '',
      questionId: Math.floor(Math.random() * 9999 + 1),
    };
    // sort Object
    const ordered = Object.keys(particularQuiz)
      .sort()
      .reduce((obj, key) => {
        obj[key] = particularQuiz[key];
        return obj;
      }, {});
    // set object
    if (Object.values(ordered).length > 0) {
      for (const key in ordered) {
        if (Object.hasOwnProperty.call(ordered, key)) {
          if (
            key === 'answer1' ||
            key === 'answer2' ||
            key === 'answer3' ||
            key === 'answer4'
          ) {
            eachQuiz.answers.push(ordered[key]);
          }
          if (key === 'question') eachQuiz.question = ordered[key];
          if (key === 'correct') eachQuiz.correct = ordered[key];
        }
      }
    }
    setItemToLocalStorage('tempQuiz', [...questionBank, eachQuiz]);
    setParticularQuiz({
      question: '',
      answer1: '',
      answer2: '',
      answer3: '',
      answer4: '',
      correct: '',
    });
    setQuestionBank([...questionBank, eachQuiz]);
    setSuccessMessage('Quiz add successful!');
  };

  const resetMessage = () => {
    setSuccessMessage('');
  };

  const updateQuizSubmitHandler = (e) => {
    e.preventDefault();
  };

  return (
    <Layout>
      <div className='row'>
        <div className=' d-flex justify-content-between mb-3'>
          <h5> Quiz </h5>
          <button
            className='btn btn-primary'
            data-bs-toggle='modal'
            data-bs-target='#addQuizModal'
          >
            Add Quiz
          </button>
        </div>
        <div className='table-responsive'>
          <table className='table table-striped align-middle table-hover'>
            <thead>
              <tr>
                <th scope='col'>QuestionId</th>
                <th scope='col'>Question</th>
                <th scope='col'>Answers</th>
                <th scope='col'>Correct</th>
                <th scope='col'>Action</th>
              </tr>
            </thead>
            <tbody>
              {questionBank && questionBank.length > 0 ? (
                questionBank.map((item, i) => (
                  <tr kay={item.questionId}>
                    <td>{item.questionId}</td>
                    <td>{item.question}</td>
                    <td>
                      {item.answers.map((ans) => (
                        <>{ans}</>
                      ))}
                    </td>
                    <td>{item.correct}</td>
                    <td>
                      <button
                        data-bs-toggle='modal'
                        data-bs-target='#updateModal'
                        onClick={() => updateHandler(item)}
                        className='btn text-warning'
                      >
                        <i className='bi bi-pencil-square'></i>
                      </button>
                      <button
                        onClick={() => deleteHandler(item)}
                        className='btn text-danger'
                      >
                        <i className='bi bi-trash-fill'></i>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan='6'>Data not found </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal  */}
      <div
        className='modal fade'
        id='addQuizModal'
        tabIndex='-1'
        aria-labelledby='addQuizModalLabel'
        aria-hidden='true'
      >
        <div className='modal-dialog modal-dialog-centered modal-dialog-scrollable'>
          <div className='modal-content'>
            <form onSubmit={addQuizSubmitHandler}>
              <div className='modal-header'>
                <h5 className='modal-title' id='addQuizModalLabel'>
                  Quiz
                </h5>
                <button
                  type='button'
                  className='btn-close'
                  data-bs-dismiss='modal'
                  aria-label='Close'
                  onClick={resetMessage}
                ></button>
              </div>
              <div className='modal-body'>
                {successMessage && successMessage ? (
                  <AlertMessage
                    message={successMessage}
                    alertClassType='alert-success'
                  />
                ) : null}
                <div className='mb-3'>
                  <label htmlFor='question' className='form-label'>
                    Question
                  </label>
                  <input
                    type='text'
                    className='form-control'
                    id='question'
                    name='question'
                    placeholder='Question'
                    value={particularQuiz.question}
                    onChange={onChangeInputHandler}
                    required
                  />
                </div>
                <div className='mb-3 row'>
                  <div className='col'>
                    <label htmlFor='question' className='form-label'>
                      Answer 1
                    </label>
                    <input
                      type='text'
                      className='form-control'
                      id='answer2'
                      name='answer1'
                      placeholder='Answer 1'
                      value={particularQuiz.answer1}
                      onChange={onChangeInputHandler}
                      required
                    />
                  </div>
                  <div className='col'>
                    <label htmlFor='question' className='form-label'>
                      Answer 2
                    </label>
                    <input
                      type='text'
                      className='form-control'
                      id='answer2'
                      name='answer2'
                      placeholder='Answer 2'
                      value={particularQuiz.answer2}
                      onChange={onChangeInputHandler}
                      required
                    />
                  </div>
                </div>
                <div className='mb-3 row'>
                  <div className='col'>
                    <label htmlFor='question' className='form-label'>
                      Answer 3
                    </label>
                    <input
                      type='text'
                      className='form-control'
                      id='answer3'
                      name='answer3'
                      placeholder='Answer 3'
                      value={particularQuiz.answer3}
                      onChange={onChangeInputHandler}
                      required
                    />
                  </div>
                  <div className='col'>
                    <label htmlFor='question' className='form-label'>
                      Answer 4
                    </label>
                    <input
                      type='text'
                      className='form-control'
                      id='answer4'
                      name='answer4'
                      placeholder='Answer4'
                      value={particularQuiz.answer4}
                      onChange={onChangeInputHandler}
                      required
                    />
                  </div>
                </div>
                <div className='mb-3'>
                  <label htmlFor='correct' className='form-label'>
                    Correct
                  </label>
                  <input
                    type='text'
                    className='form-control'
                    id='correct'
                    name='correct'
                    placeholder='Correct'
                    value={particularQuiz.correct}
                    onChange={onChangeInputHandler}
                    required
                  />
                </div>
              </div>
              <div className='modal-footer'>
                <button
                  type='button'
                  className='btn btn-secondary'
                  data-bs-dismiss='modal'
                >
                  Close
                </button>
                <button type='submit' className='btn btn-primary'>
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* Update Modal  */}
      <div
        className='modal fade'
        id='updateModal'
        tabIndex='-1'
        aria-labelledby='updateModalLabel'
        aria-hidden='true'
      >
        <div className='modal-dialog modal-dialog-centered modal-dialog-scrollable'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title' id='updateModalLabel'>
                Quiz update
              </h5>
              <button
                type='button'
                className='btn-close'
                data-bs-dismiss='modal'
                aria-label='Close'
              ></button>
            </div>
            <div className='modal-body'>
              {particularQuizUpdate && particularQuizUpdate ? (
                <div className='card'>
                  <div className='card-body'>
                    <h5 className='card-title'>Question: {particularQuizUpdate.question}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">Question Id: {particularQuizUpdate.questionId}</h6>
                    <p className='card-text text-success'>Correct: {particularQuizUpdate.correct}</p>
                  </div>
                  <ul className='list-group list-group-flush'>
                    {particularQuizUpdate.answers && particularQuizUpdate.answers.map((ans, i) => (
                      <li key={i+1} className='list-group-item'>Answer {i} : {ans}</li>
                    ))}
                  </ul>
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
              <button type='button' className='btn btn-primary'>
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Quiz;
