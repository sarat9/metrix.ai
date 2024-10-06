import React from 'react';
import InputLabel from '@mui/material/InputLabel';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

export default function TableSelector(props) {
    const { tables, selectedTable, handleTableChange } = props;

    return <>
        <div className='table-selector-container'>
            <FormControl sx={{ m: 0, minWidth: '50%', width: '100%' }}>
                <InputLabel id="table-selector-select-label">Table Name</InputLabel>
                <Select
                    labelId="table-selector-select"
                    id="dtable-selector-select"
                    multiple={false}
                    value={selectedTable}
                    label="Table Name"
                    onChange={handleTableChange}
                >
                    {tables.map((table) => (
                        <MenuItem
                            key={table.table_name}
                            value={table.table_name}
                        >
                            {table.table_name}
                        </MenuItem>
                    ))}
                </Select>
                <FormHelperText>Table to apply conditions</FormHelperText>
            </FormControl>
        </div>
    </>
}









