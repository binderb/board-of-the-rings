import React, { useState, useEffect, useContext } from 'react';
import { io } from 'socket.io-client';
import { useQuery } from '@apollo/client';
import { QUERY_QUESTIONS } from './queries';

export const GameSessionContext = React.createContext();
export const useGameSession = () => useContext(GameSessionContext);

// Initialize socket.io client
const socket = io();

// Create our game session provider.
export default function GameSessionProvider({ children }) {
  
  // Global variables for the game session
  const { loading: questionsLoading, data: questionsData } = useQuery(QUERY_QUESTIONS);
  const [gameScreen, setGameScreen] = useState('lobby');
  const [roomId, setRoomId] = useState('');
  const [isHost, setIsHost] = useState(false);
  const [players, setPlayers] = useState([]);
  const [turn, setTurn] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [usedQuestions, setUsedQuestions] = useState([]);
  const [boardCameraPosition, setBoardCameraPosition] = useState([0,2,10]);

  useEffect(() => {
    socket.on('receive_reset_questions', () => {
      setUsedQuestions([]);
      console.log('resetting questions!');
    });

    socket.on('receive_pick_question', (questionIndex) => {
      setUsedQuestions([...usedQuestions, questionIndex]);
      setCurrentQuestion(questionIndex);
      console.log(`picked question: ${questionIndex}`);
    });

    return () => {
      socket.off('receive_reset_questions');
      socket.off('receive_pick_question');
    };
  }, [usedQuestions]);

  useEffect( () => {
    if (players && players[turn]) {
      const turnPlayer = players[turn];
      setBoardCameraPosition([turnPlayer.boardPosition, boardCameraPosition[1], boardCameraPosition[2]]);
    }
  }, [turn, players, boardCameraPosition, setBoardCameraPosition])

  // Methods
  const joinRoom = (id) => {
    setRoomId(id);
  }

  const joinRoomAsHost = (id) => {
    setIsHost(true);
    setRoomId(id);
  }

  const leaveRoom = () => {
    socket.emit('leave_room', roomId);
    setRoomId(null);
  }

  const leaveRoomAsHost = () => {
    socket.emit('leave_room',roomId);
    socket.emit('host_left', roomId);
    setRoomId(null);
    setIsHost(false);
  }

  const advanceTurn = () => {
    if (turn >= players.length-1) setTurn(0);
    else setTurn(turn+1);
  }

  const pickQuestion = () => {
    const questions = questionsData?.questions || [];
    if (questions.length > 0) {
      const reset = (usedQuestions.length >= questions.length);
      const questionsToExclude = reset ? [] : usedQuestions;
      const questionIndices = [];
      for (let i=0; i<questions.length; i++) questionIndices.push(i);
      const remainingQuestionIndices = questionIndices.filter(i => !questionsToExclude.includes(i));
      const pickedQuestion = remainingQuestionIndices[Math.floor(Math.random()*remainingQuestionIndices.length)];
      socket.emit('pick_question', {room: roomId, questionIndex: pickedQuestion, reset: reset});
    } else {
      socket.emit('pick_question', {room: roomId, questionIndex: null, reset: false});
    }
  }

  // The provider component will wrap all other components inside of it that need access to our global state
  return (
    // Dark theme and toggle theme are getting provided to the child components
    <GameSessionContext.Provider value={{
      socket,
      questionsLoading,
      questionsData,
      gameScreen,
      setGameScreen,
      roomId,
      isHost,
      joinRoom,
      joinRoomAsHost,
      leaveRoom,
      leaveRoomAsHost,
      players,
      setPlayers,
      currentQuestion,
      pickQuestion,
      turn,
      advanceTurn,
      boardCameraPosition,
      setBoardCameraPosition
    }}>
      {children}
    </GameSessionContext.Provider>
  );
}
