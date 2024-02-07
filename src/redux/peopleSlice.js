import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  people: [],
  loading: false,
  error: null,
  count: 0,
};

const peopleSlice = createSlice({
  name: 'people',
  initialState,
  reducers: {
    fetchPeopleStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchPeopleSuccess(state, action) {
      state.people = action.payload.results;
      state.loading = false;
      state.count = action.payload.count;
    },
    fetchPeopleFailure(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { fetchPeopleStart, fetchPeopleSuccess, fetchPeopleFailure } =
  peopleSlice.actions;

export default peopleSlice.reducer;

export const fetchPeople =
  (searchTerm, pageTerm = '') =>
  async (dispatch) => {
    dispatch(fetchPeopleStart());
    try {
      const response = await fetch(
        `https://swapi.dev/api/people/?search=${searchTerm}&page=${pageTerm}`
      );
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      const result = await Promise.all(data.results?.map(async (val) => {
        let item = { ...val };
        await Promise.all(Object.keys(val)?.map(async (key) => {
            if (Array.isArray(val[key])) {
                item[key] = await Promise.all(val[key].map(async (url) => {
                    const response = await fetch(url);
                    if (!response.ok) {
                        throw new Error('Failed to fetch data');
                    }
                    const data = await response.json();
                    return {
                        name:data?.name || data?.title,
                        url:url
                    };
                }));
            }else {
                item[key] = val[key];
            }
        }));
        return item;
    }));
    data.results=result
      dispatch(fetchPeopleSuccess(data));
    } catch (error) {
      dispatch(fetchPeopleFailure(error.message));
    }
  };
