import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Grid2 as Grid, Card, CardContent, Typography, TextField, Button, MenuItem, CircularProgress } from '@mui/material';
import axios from "axios";
import { QueryBuilder, formatQuery } from 'react-querybuilder';
import 'react-querybuilder/dist/query-builder.css';
import TableSelector from '../../components/ConditionBuilder/TableSelector';

export default function MetrixForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [metrixData, setMetrixData] = useState({ frequency: 'monthly', metric_type: 'quantitative', trend_direction: 'Upward' });
  const [tables, setTables] = useState([]);
  const [selectedTable, setSelectedTable] = useState('');
  const [fields, setFields] = useState([]);
  const [query, setQuery] = useState({ combinator: 'and', rules: [] });
  const [formattedQuery, setFormattedQuery] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTables = async () => {
      setLoading(true);
      try {
        const response = await axios.get('/tables');
        setTables(response.data);
      } catch (err) {
        console.error('Error fetching tables:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTables();
  }, []);

  useEffect(() => {
    if (selectedTable) {
      const fetchFields = async () => {
        setLoading(true);
        try {
          const response = await axios.get(`/tables/${selectedTable}/fields`);
          setFields(response.data);
        } catch (err) {
          console.error('Error fetching fields:', err);
        } finally {
          setLoading(false);
        }
      };

      fetchFields();
    }
  }, [selectedTable]);

  useEffect(() => {
    if (id) {
      const fetchMetrix = async () => {
        setLoading(true);
        try {
          const response = await axios.get(`/metric/${id}`);
          setMetrixData(response.data);
          setSelectedTable(response.data.source_table);
          setQuery(response.data.query_conditions);
          setFormattedQuery(response.data.formatted_sql);
        } catch (err) {
          console.error('Error fetching metrix:', err);
        } finally {
          setLoading(false);
        }
      };

      fetchMetrix();
    }
  }, [id]);

  const handleTableChange = (e) => {
    setSelectedTable(e.target.value);
  };

  const handleQueryChange = (newQuery) => {
    setQuery(newQuery);
    const formatted = formatQuery(newQuery, 'sql');
    setFormattedQuery(formatted);
  };

  const handleDynamicInput = (e) => {
    const key = e.target.name;
    const value = e.target.value;
    setMetrixData({ ...metrixData, [key]: value });
  };

  const handleSaveMetrix = async () => {
    try {
      const payload = {
        ...metrixData,
        source_table: selectedTable,
        query_conditions: query,
        formatted_sql: formattedQuery,
        active: metrixData.active !== undefined ? metrixData.active : true,
      };

      if (id) {
        await axios.put(`/metric/${id}`, payload);
        // alert('Metrix updated successfully!');
      } else {
        await axios.post('/metric', payload);
        // alert('Metrix created successfully!');
      }
      navigate('/metrics/');
    } catch (err) {
      console.error('Error saving metrix:', err);
      alert('Failed to save metrix.');
    }
  };

  return (
    <Grid container style={{ padding: '40px', backgroundColor: '#f4f6f8' }} justifyContent="center">
      <Grid item size={{ xs: 12, md: 8 }}>
        <Card elevation={3} style={{ borderRadius: 15 }}>
          <CardContent>
            <Typography variant="h4" component="h1" gutterBottom>
              {id ? 'Edit Metrix' : 'Create Metrix'}
            </Typography>
            {loading ? (
              <CircularProgress />
            ) : (
              <>
                <Grid container spacing={2}>
                  {/* Title and Description */}
                  <Grid item size={{ xs: 12, md: 12 }}>
                    <TextField
                      required
                      fullWidth
                      margin="normal"
                      id="title"
                      name="title"
                      label="Title"
                      variant="outlined"
                      value={metrixData.title || ''}
                      onChange={handleDynamicInput}
                    />
                  </Grid>
                  <Grid item size={{ xs: 12, md: 12 }}>
                    <TextField
                      required
                      fullWidth
                      margin="normal"
                      id="description"
                      name="description"
                      label="Description"
                      variant="outlined"
                      value={metrixData.description || ''}
                      onChange={handleDynamicInput}
                    />
                  </Grid>

                  {/* Collection Type and Frequency */}
                  <Grid item size={{ xs: 12, md: 6 }}>
                    <TextField
                      select
                      fullWidth
                      margin="normal"
                      id="collection_type"
                      name="collection_type"
                      label="Collection Type"
                      value={metrixData.collection_type || 'automated'}
                      onChange={handleDynamicInput}
                    >
                      <MenuItem value="automated">Automated</MenuItem>
                      <MenuItem value="manual">Manual</MenuItem>
                    </TextField>
                  </Grid>

                  <Grid item size={{ xs: 12, md: 6 }}>
                    <TextField
                      select
                      required
                      fullWidth
                      margin="normal"
                      id="frequency"
                      name="frequency"
                      label="Frequency"
                      value={metrixData.frequency || 'monthly'}
                      onChange={handleDynamicInput}
                    >
                      <MenuItem value="weekly">Weekly</MenuItem>
                      <MenuItem value="monthly">Monthly</MenuItem>
                      <MenuItem value="annually">Annually</MenuItem>
                    </TextField>
                  </Grid>

                  {/* Metric Type and Trend Direction */}
                  <Grid item size={{ xs: 12, md: 6 }}>
                    <TextField
                      select
                      fullWidth
                      margin="normal"
                      id="metric_type"
                      name="metric_type"
                      label="Metric Type"
                      value={metrixData.metric_type || 'quantitative'}
                      onChange={handleDynamicInput}
                    >
                      <MenuItem value="quantitative">Quantitative</MenuItem>
                      <MenuItem value="qualitative">Qualitative</MenuItem>
                    </TextField>
                  </Grid>

                  <Grid item size={{ xs: 12, md: 6 }}>
                    <TextField
                      select
                      fullWidth
                      margin="normal"
                      id="trend_direction"
                      name="trend_direction"
                      label="Trend Direction"
                      value={metrixData.trend_direction || 'none'}
                      onChange={handleDynamicInput}
                    >
                      <MenuItem value="none">None</MenuItem>
                      <MenuItem value="upward">Upward</MenuItem>
                      <MenuItem value="downward">Downward</MenuItem>
                      <MenuItem value="stable">Stable</MenuItem>
                    </TextField>
                  </Grid>

                  <Grid item size={{ xs: 12, md: 12, lg: 12 }}>
                    <div style={{width:'75%', margin:'0% 10%', padding: '1px', background: "linear-gradient(45deg, #FF3D00 30%, #FF6F20 90%)"}}></div>
                  </Grid>

                  {/* Table Selector and Query Builder */}
                  <Grid item size={{ xs: 12, md: 12, lg: 12 }}>
                    <TableSelector tables={tables} selectedTable={selectedTable} handleTableChange={handleTableChange} />
                  </Grid>

                  {selectedTable && (
                    <>
                      <Grid item size={{ xs: 12, md: 12 }}>
                        <QueryBuilder query={query} fields={fields} onQueryChange={handleQueryChange} />
                        {formattedQuery && (
                          <Typography variant="body1" style={{ marginTop: '20px' }}>
                            <strong>Formatted SQL:</strong> {formattedQuery}
                          </Typography>
                        )}
                      </Grid>
                    </>
                  )}
                </Grid>

                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSaveMetrix}
                  style={{
                    marginTop: '20px',
                    borderRadius: 8,
                    background: 'linear-gradient(45deg, #FF6F20 30%, #FF3D00 90%)',
                    color: 'white',
                    fontWeight: 'bold',
                    '&:hover': {
                      background: 'linear-gradient(45deg, #FF3D00 30%, #FF6F20 90%)',
                    },
                  }}
                >
                  Save Metrix
                </Button>
              </>
            )}
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
