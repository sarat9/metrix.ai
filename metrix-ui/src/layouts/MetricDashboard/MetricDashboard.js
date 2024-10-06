import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Grid2 as Grid, Card, CardContent, Typography, TextField, Button, MenuItem, CircularProgress } from '@mui/material';
import BarChart from '../../components/charts/BarChart/BarChart';
import LineChart from '../../components/charts/LineChart/LineChart';// import MetricGraph from './MetricGraph';
import ActionButtonBar from '../../components/ActionButtonBar/ActionButtonBar';

const MetricGraph = (props) => {
    const {title, metricData}=props;
    const labels = metricData.map(data => new Date(data.created_at).toLocaleDateString());
    const values = metricData.map(data => data.quantitative_value); 

    return (
        <div>
            <LineChart title={title} labels={labels} values={values}/>
        </div>
    );
};



const MetricDashboard = () => {
    const [metrics, setMetrics] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMetrics = async () => {
            try {
                const response = await axios.get('/metric_metric_data');
                setMetrics(response.data);
            } catch (error) {
                console.error('Error fetching metrics:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchMetrics();
    }, []);

    return (
        <div>
            <ActionButtonBar />
            <Typography variant="h4" gutterBottom>
                Metric Dashboard
            </Typography>
            {loading ? (
                <CircularProgress />
            ) : (
                <Grid container spacing={3}>
                    {metrics&&metrics.map(metricObj => {
                        const metric = metricObj.metric;
                        const metricData = metricObj.metric_data;
                        return <Grid item size={{ xs: 6, md: 4 }}>
                            <Card key={metricObj.metric.id} style={{'padding':'3%'}}>
                             <Typography variant="h6">{metric.title}</Typography>
                             <MetricGraph title={metric.title} metricData={metricData} /> 
                            </Card>
                        </Grid>
                        })}

                </Grid>
            )}
        </div>
    );
};

export default MetricDashboard;
