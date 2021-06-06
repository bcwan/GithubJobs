import axios from 'axios';
import { useReducer, useEffect } from 'react';

const ACTIONS = {
  MAKE_REQUEST: 'make-request',
  GET_DATA: 'get-data',
  ERROR: 'error'
};

const CORS_PROXY_SERVER = 'https://secret-ocean-49799.herokuapp.com/';
const BASE_URL = `${CORS_PROXY_SERVER}https://jobs.github.com/positions.json`;

function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.MAKE_REQUEST:
      return { loading: true, jobs: [] };
    case ACTIONS.GET_DATA:
      return { ...state, loading: false, jobs: action.payload.jobs };
    case ACTIONS.ERROR:
      return { ...state, laoding: false, error: action.payload.error, jobs: [] };
    default:
      return state;
  }
};

export default function useFetchJobs(params, page) {
  const [state, dispatch] = useReducer(reducer, { jobs: [], loading: true });

  useEffect(() => {
    const cancelToken = axios.CancelToken.source();
    dispatch({ type: ACTIONS.MAKE_REQUEST });
    axios.get(BASE_URL, {
      cancelToken: cancelToken.token,
      params: { markdown: true, page: page, ...params } 
    }).then(res => {
      dispatch({ type: ACTIONS.GET_DATA, payload: { jobs: res.data }});
    }).catch(e => {
      if (axios.isCancel(e)) return;
      dispatch({ type: ACTIONS.ERROR, payload: { error: e }});
    });

    return () => {
      cancelToken.cancel();
    }
  }, [params, page]);

  return state;
};