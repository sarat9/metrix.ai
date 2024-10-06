import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Grid2 as Grid, Card, CardActionArea, CardContent, Typography, Button, CircularProgress } from '@mui/material';
import { Link } from 'react-router-dom';

function MetriXCard(props) {
  const { metrix } = props;
  const navigate = useNavigate();
  return <Card key={metrix.id}>
    <CardActionArea onClick={()=>navigate(`/metric/${metrix.id}`)}>
      <CardContent>
        <Typography variant="h6">{metrix.title}</Typography>
        <Typography variant="body2">{metrix.description}</Typography>
      </CardContent>
    </CardActionArea>
  </Card>;
}

export default function MetrixList() {
  const [metrixList, setMetrixList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchMetrix = async () => {
      setLoading(true);
      try {
        const response = await axios.get('/metric');
        setMetrixList(response.data);
      } catch (err) {
        console.error('Error fetching metrix:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMetrix();
  }, []);

  return (<>
    <Typography variant="h4" component="h1" gutterBottom>
      Metrics List
    </Typography>
    <Grid container spacing={5} style={{ padding: '40px' }}>
      {/* <Grid item xs={12} sm={10} md={8}> */}
      {loading ? (
        <CircularProgress />
      ) : (
        metrixList.map(metrix => {
          return <Grid item size={{ xs: 6, md: 4 }}>
            <MetriXCard metrix={metrix} />
          </Grid>
        })
      )}
    </Grid>
  </>
  );
}
