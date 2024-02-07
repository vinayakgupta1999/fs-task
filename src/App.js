import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  TextField,
  CircularProgress,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Pagination,
  TableSortLabel,
  InputAdornment,
  IconButton,
  Card,
  CardHeader,
  CardContent,
} from '@mui/material';
import { fetchPeople } from './redux/peopleSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUserCircle,
  faQuestionCircle,
  faExclamationCircle,
  faWarning,
  faMobileAndroid
} from '@fortawesome/free-solid-svg-icons';

const App = () => {
  const dispatch = useDispatch();
  const { people, loading, error, count } = useSelector(
    (state) => state.people
  );
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('name');
  const [numeric, setNumeric] = useState(false);
  const [data, setdata] = useState([]);
  // const handleSort = (column) => {
  //   if (sortedColumn === column) {
  //     setSortedDirection(sortedDirection === 'asc' ? 'desc' : 'asc');
  //   } else {
  //     setSortedColumn(column);
  //     setSortedDirection('asc');
  //   }
  // };

  const renderIcon = (species) => {
    if (species.toLowerCase() === 'droid') {
      return <FontAwesomeIcon icon={faMobileAndroid} />;
    } else if (species.toLowerCase() === 'human') {
      return <FontAwesomeIcon icon={faUserCircle} />;
    } else {
      return <FontAwesomeIcon icon={faQuestionCircle} />;
    }
  };

  const handleSearch = () => {
    dispatch(fetchPeople(searchTerm));
  };

  const handlePaginationChange = (event, newPage) => {
    setCurrentPage(newPage);
  };

  useEffect(() => {
    dispatch(fetchPeople(searchTerm, currentPage));
  }, [currentPage,dispatch]); //eslint-disable-line

  const handleRequestSort = (event, property, numeric) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
    setNumeric(numeric);
  };
  const createSortHandler = (property, numeric) => (event) => {
    handleRequestSort(event, property, numeric);
  };
  const headCells = [
    {
      id: 'name',
      numeric: false,
      disablePadding: true,
      label: 'name',
      sorting: true,
    },
    {
      id: 'height',
      numeric: true,
      disablePadding: false,
      label: 'Height',
      sorting: true,
    },
    {
      id: 'mass',
      numeric: true,
      disablePadding: false,
      label: 'Mass',
      sorting: true,
    },
    {
      id: 'hair_color',
      numeric: false,
      disablePadding: false,
      label: 'Hair Color',
      sorting: true,
    },
    {
      id: 'skin_color',
      numeric: false,
      disablePadding: false,
      label: 'Skin Color',
      sorting: true,
    },
    {
      id: 'eye_color',
      numeric: false,
      disablePadding: false,
      label: 'Eye Color',
      sorting: true,
    },
    {
      id: 'birth_year',
      numeric: false,
      disablePadding: false,
      label: 'Birth Year',
      sorting: true,
    },
    {
      id: 'gender',
      numeric: false,
      disablePadding: false,
      label: 'Gender',
      sorting: true,
    },
    {
      id: 'homeworld',
      numeric: false,
      disablePadding: false,
      label: 'HomeWorld',
      sorting: true,
    },
    {
      id: 'films',
      numeric: false,
      disablePadding: false,
      label: 'Films',
      sorting: false,
    },
    {
      id: 'species',
      numeric: true,
      disablePadding: false,
      label: 'Species',
      sorting: false,
    },
    {
      id: 'vehicles',
      numeric: false,
      disablePadding: false,
      label: 'Vehicles',
      sorting: false,
    },
    {
      id: 'starships',
      numeric: false,
      disablePadding: false,
      label: 'Staeships',
      sorting: false,
    },
    {
      id: 'created',
      numeric: false,
      disablePadding: false,
      label: 'Created',
      sorting: true,
    },
    {
      id: 'edited',
      numeric: false,
      disablePadding: false,
      label: 'Edited',
      sorting: true,
    },
  ];

  useEffect(() => {
    if (people.length > 0) {
      const sortedPeople = [...people].sort((a, b) => {
        const valueA = a[orderBy];
        const valueB = b[orderBy];

        if (numeric) {
          if (order === 'asc') {
            return valueA - valueB;
          } else {
            return valueB - valueA;
          }
        } else {
          if (order === 'asc') {
            return valueA.localeCompare(valueB);
          } else {
            return valueB.localeCompare(valueA);
          }
        }
      });
      setdata(sortedPeople);
      // Update the state with the sorted array
    }
  }, [people, order, orderBy,numeric]);
  const handleClear = () => {
    setSearchTerm('');
    dispatch(fetchPeople(''));
  };
  return (
    <Card style={{ margin: '10px', height: 'auto',fontFamily: 'Arial, sans-serif' }}>
      <CardHeader title='People List' style={{background:'#9FA6B2',fontWeight: 'bolder'}} />
      <CardContent>
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
          <div
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'flex-end',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '20px',
                width: '300px',
              }}
            >
              <TextField
                label='Search'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ flex: 1, marginRight: '10px' }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      {searchTerm && (
                        <IconButton onClick={handleClear} edge='end'>
                          X
                        </IconButton>
                      )}
                    </InputAdornment>
                  ),
                }}
              />
              <button
                onClick={handleSearch}
                style={{
                  padding: '5px 10px',
                  fontSize: '14px',
                  backgroundColor: '#007bff',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '4px',
                  height:"40px"
                }}
              >
                Search
              </button>
            </div>
          </div>
          {loading && (
            <CircularProgress
              style={{ margin: 'auto', display: 'block', marginTop: '20px' }}
            />
          )}
          {error && (
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
              <FontAwesomeIcon
                icon={faExclamationCircle}
                size='3x'
                style={{ color: 'red', marginBottom: 10 }}
              />
              <Typography variant='body1'>Error: {error}</Typography>
            </div>
          )}
          {!loading && !error && people.length === 0 && (
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
              <FontAwesomeIcon
                icon={faWarning}
                size='3x'
                style={{ color: 'orange', marginBottom: 10 }}
              />
              <Typography variant='body1'>No results found.</Typography>
            </div>
          )}
          {!loading && !error && people.length > 0 && (
            <>
              <div style={{ width: '100%', overflowX: 'scroll' }}>
                <Table
                  style={{
                    marginTop: '20px',
                    width: '100%',
                    borderCollapse: 'collapse',
                  }}
                >
                  <TableHead>
                    <TableRow style={{ backgroundColor: '#f2f2f2' }}>
                      {headCells.map((headCell) => (
                        <TableCell
                          key={headCell.id}
                          align={headCell.numeric ? 'right' : 'left'}
                          sortDirection={
                            orderBy === headCell.id ? order : false
                          }
                          style={{ padding: '10px', fontWeight: 'bold' }}
                        >
                          {headCell?.sorting ? (
                            <TableSortLabel
                              active={orderBy === headCell.id}
                              direction={
                                orderBy === headCell.id ? order : 'asc'
                              }
                              onClick={createSortHandler(
                                headCell.id,
                                headCell.numeric
                              )}
                            >
                              {headCell.label}
                            </TableSortLabel>
                          ) : (
                            headCell.label
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data?.map((person, index) => (
                      <TableRow
                        key={index}
                        style={{
                          backgroundColor:
                            index % 2 === 0 ? '#ffffff' : '#f2f2f2',
                        }}
                      >
                        <TableCell style={{ padding: '10px' }}>
                          {
                            <a href={person.url} target='_blank' rel="noreferrer">
                              {person.name}
                            </a>
                          }
                        </TableCell>
                        <TableCell style={{ padding: '10px' }}>
                          {person.height}
                        </TableCell>
                        <TableCell style={{ padding: '10px' }}>
                          {person.mass}
                        </TableCell>
                        <TableCell style={{ padding: '10px' }}>
                          {person.hair_color}
                        </TableCell>
                        <TableCell style={{ padding: '10px' }}>
                          {person.skin_color}
                        </TableCell>
                        <TableCell style={{ padding: '10px' }}>
                          {person.eye_color}
                        </TableCell>
                        <TableCell style={{ padding: '10px' }}>
                          {person.birth_year}
                        </TableCell>
                        <TableCell style={{ padding: '10px' }}>
                          {person.gender}
                        </TableCell>
                        <TableCell style={{ padding: '10px' }}>
                          {person.homeworld}
                        </TableCell>
                        <TableCell style={{ padding: '10px', width: '200px' }}>
                          {person.films?.length ? (
                            <div
                              style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '5px',
                                 width:'200px'
                              }}
                            >
                              {person.films?.map((val,filmKey) => {
                                return (
                                  <a href={val.url} target='_blank' rel="noreferrer" key={filmKey}>
                                    {val.name}
                                  </a>
                                );
                              })}
                            </div>
                          ) : (
                            '-'
                          )}
                        </TableCell>
                        <TableCell style={{ padding: '10px' }}>
                          {person.species?.length ? (
                            <div
                              style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '5px',
                              }}
                            >
                              {person.species?.map((val,specieKey) => {
                                return (
                                  <a href={val.url} target='_blank' rel="noreferrer" key={specieKey}>
                                    {renderIcon(val.name)}
                                  </a>
                                );
                              })}
                            </div>
                          ) : (
                            '-'
                          )}
                        </TableCell>
                        <TableCell style={{ padding: '10px' }}>
                          {person.vehicles?.length ? (
                            <div
                              style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '5px',
                                width:'200px'
                              }}
                            >
                              {person.vehicles?.map((val,vehicleKey) => {
                                return (
                                  <a href={val.url} target='_blank' rel="noreferrer" key={vehicleKey}>
                                    {val.name}
                                  </a>
                                );
                              })}
                            </div>
                          ) : (
                            '-'
                          )}
                        </TableCell>
                        <TableCell style={{ padding: '10px' }}>
                          {person.starships?.length ? (
                            <div
                              style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '5px',
                                width:'200px'
                              }}
                            >
                              {person.starships?.map((val,starshipKey) => {
                                return (
                                  <a href={val.url} target='_blank' rel="noreferrer" key={starshipKey}>
                                    {val.name}
                                  </a>
                                );
                              })}
                            </div>
                          ) : (
                            '-'
                          )}
                        </TableCell>
                        <TableCell style={{ padding: '10px' }}>
                          {person.created}
                        </TableCell>
                        <TableCell style={{ padding: '10px' }}>
                          {person.edited}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Pagination
                  count={Math.ceil(count / 10)}
                  page={currentPage}
                  onChange={handlePaginationChange}
                  variant='outlined'
                  shape='rounded'
                  size='large'
                  style={{ marginTop: 20, justifyContent: 'center' }}
                />
              </div>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default App;
