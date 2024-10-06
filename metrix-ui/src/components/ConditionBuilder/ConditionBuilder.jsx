import React, { useState, useEffect } from 'react';
import axios from "axios";
import { QueryBuilder, formatQuery } from 'react-querybuilder';
import 'react-querybuilder/dist/query-builder.css';
import useInputField from '../../hooks/useInputField';
import TableSelector from './TableSelector';

export default function ConditionBuilder(props) {
  const [metricCondition, setMetricCondition] = useState({});
  const [tables, setTables] = useState([]);
  const [selectedTable, setSelectedTable] = useState('');
  const [fields, setFields] = useState([]);
  const [query, setQuery] = useState({
    combinator: 'and',
    rules: [],
  });
  const [formattedQuery, setFormattedQuery] = useState(null);



  useEffect(() => {
    const fetchTables = async () => {
      try {
        const response = await axios.get('/tables');
        setTables(response.data);
      } catch (err) {
        console.error('Error fetching tables:', err);
      }
    };

    fetchTables();
  }, []);

  useEffect(() => {
    if (selectedTable) {
      const fetchFields = async () => {
        try {
          const response = await axios.get(`/tables/${selectedTable}/fields`);
          setFields(response.data);
        } catch (err) {
          console.error('Error fetching fields:', err);
        }
      };

      fetchFields();
    }
  }, [selectedTable]);


  const handleTableChange = (e) => {
    setSelectedTable(e.target.value);
  };


  const handleQueryChange = (newQuery) => {
    console.log("newQuery ", newQuery);
    setQuery(newQuery);
    const formatted = formatQuery(newQuery, 'sql')
    console.log("formatted ", formatted);

    setFormattedQuery(formatted);
  };

  const handleDynamicInput = (e) => {
    e && e.preventDefault();
    const key = e.target.name;
    const value = e.target.value;
    setMetricCondition({ ...metricCondition, [key]: value })
  }

  const handleSaveConditions = async () => {
    try {
      const payload = {
        ...metricCondition,
        tableName: selectedTable,
        query: query,
        formattedSql: formattedQuery,
        active: true
      }
      console.log('metricCondition ', payload);
      await axios.post('/metric_condition', { ...payload });
      alert('Conditions saved successfully!');
    } catch (err) {
      console.error('Error saving conditions:', err);
      alert('Failed to save conditions.');
    }
  };


  return <>
    <div>
      <h1>Condition Builder</h1>

      <label>Condition Name:</label>
      <input name="conditionName" type="text" value={metricCondition.conditionName} onChange={handleDynamicInput} />

      <TableSelector tables={tables} selectedTable={selectedTable} handleTableChange={handleTableChange} />

      <br /><br />

      {selectedTable && (
        <>
          <QueryBuilder query={query} fields={fields} onQueryChange={handleQueryChange} />

          {(formattedQuery && formattedQuery != '(1 = 1)') && <p>{formattedQuery}</p>}

          <br /><br />

          <button onClick={handleSaveConditions}>Save Conditions</button>
        </>
      )}
    </div>
  </>
}









