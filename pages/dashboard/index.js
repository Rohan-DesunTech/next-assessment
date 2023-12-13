// React Redux Imports

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';

// Reducer 

import {
  selectCategoriesLoading,
  selectCategoriesError,
  setCategories,
  setLoading as setCategoriesLoading,
  setError as setCategoriesError,
} from '@/store/categoriesSlice';
import {
  selectEntries,
  selectLoading,
  selectError,
  setLoading as setEntriesLoading,
  setData as setEntries,
  setError as setEntriesError,
} from '@/store/entriesSlice';

// Component 

import PrivateRoute from "@/components/PrivateRoute";

// Api 

import { fetchCategories, fetchEntries } from "@/services/apiService";

// MUI imports 

import {
  Grid,
  Card,
  CardContent,
  Typography,
  Select,
  MenuItem,
  CardActions,
  Button,
  Box,
  CircularProgress
} from '@mui/material';

const DashboardPage = () => {

  const dispatch = useDispatch();
  const [filter, setFilter] = useState({
    category: '',
    cors: 'all',
  });

  // Categories state
  const categoriesLoading = useSelector(selectCategoriesLoading);
  const categoriesError = useSelector(selectCategoriesError);

  // Entries state
  const entries = useSelector(selectEntries);
  const entriesLoading = useSelector(selectLoading);
  const entriesError = useSelector(selectError);

  const handleCorsChange = (event) => {
    setFilter({ ...filter, cors: event.target.value });
    sessionStorage.setItem('filter', JSON.stringify({ ...filter, cors: event.target.value }));
    fetchEntriesData({ ...filter, cors: event.target.value });
  };

  useEffect(() => {
    // Fetch categories
    const fetchCategoriesData = async () => {
      try {
        dispatch(setCategoriesLoading());
        const categoriesData = await fetchCategories();
        dispatch(setCategories(categoriesData));
      } catch (error) {
        dispatch(setCategoriesError(error.message));
      }
    };

    fetchCategoriesData();

    if (window != undefined) {
      const localFilter = sessionStorage.getItem('filter');
      if (localFilter) {
        // console.log("localFilter=====", JSON.parse(localFilter))
        setFilter(JSON.parse(localFilter));
        fetchEntriesData(JSON.parse(localFilter));
      } else {
        fetchEntriesData(filter);
      }
    }
    else {
      fetchEntriesData(filter);
    }
  }, [dispatch]);

  // Fetch entries
  const fetchEntriesData = async (params) => {
    try {
      console.log("Enter ===", params)
      dispatch(setEntriesLoading());
      const entriesData = await fetchEntries(params);
      dispatch(setEntries(entriesData));
    } catch (error) {
      dispatch(setEntriesError(error.message));
    }
  };

  function removeFilter() {
    fetchEntriesData({
      category: '',
      cors: 'all',
    });
    setFilter({
      category: '',
      cors: 'all',
    });
    sessionStorage.removeItem('filter');
  }

  if (categoriesError || entriesError) {
    return <div>Error: {categoriesError || entriesError}</div>;
  }

  const renderEntryCards = () => {
    return entries?.entries?.length ? entries?.entries?.map((entry) => (
      <Grid item xs={12} sm={6} md={4} lg={3} key={entry.id}>
        <Link href={entry?.Link ?? ''} target="_blank" passHref>
          <Box sx={{ minWidth: 275, maxWidth: 320 }}>
            <Card variant="outlined" sx={{ background: '#dcefde', height: '10rem', cursor: 'pointer' }}>
              <CardContent>
                <Typography sx={{ fontSize: 14, fontWeight: 600 }} color="text.secondary" gutterBottom>
                  {entry.Category ?? ''}
                </Typography>
                <Typography sx={{ fontSize: 20 }} component="div">
                  {entry.API ?? ''}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  CORS - {entry.Cors ?? ''}
                </Typography>
                <Typography variant="body2" >
                  {entry.Description}
                </Typography>
              </CardContent>
            </Card>
          </Box>
        </Link>
      </Grid>
    )) : null
  };

  return (
    <>
      <PrivateRoute setFilter={setFilter} filter={filter} fetchEntriesData={fetchEntriesData} />

      <Grid container spacing={2} sx={{ ml: 1, mr: 1, height: '92vh' }}>
        {/* Entries */}
        <Grid item xs={12}>
          <Grid container alignItems="center">
            <Typography variant="h6" gutterBottom style={{ marginRight: '1rem' }}>
              Entries
            </Typography>
            <Typography variant="body1" style={{ marginRight: '1rem' }}>
              CORS:
            </Typography>
            <Select value={filter.cors} onChange={handleCorsChange} style={{ height: '30px', width: '80px' }}>
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="yes">Yes</MenuItem>
              <MenuItem value="no">No</MenuItem>
            </Select>
            <Typography style={{ fontSize: '12px' }}>
              Search Result: {entries?.count ?? '0'}
            </Typography>

            {(filter.category || filter.cors != 'all') ?
              <CardActions>
                <Button
                  onClick={removeFilter}
                  variant="contained"
                  color="primary"
                  style={{ backgroundColor: '#314b31', color: 'white', textTransform: 'none', height: '20px', fontSize: '12px' }}
                >
                  Remove Filter
                </Button>
              </CardActions> : null
            }
          </Grid>
          <Grid container spacing={2}>
            {entriesLoading ? (
              <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <CircularProgress color="primary" size={20} sx={{ color: 'green' }} />
                <Typography variant="body2" sx={{ marginLeft: '8px' }}>
                  Loading...
                </Typography>
              </Grid>
            ) : (
              renderEntryCards()
            )}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default DashboardPage;