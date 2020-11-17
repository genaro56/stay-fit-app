import React from 'react';
import moment from 'moment';

// UI

import { makeStyles, Paper, Typography } from '@material-ui/core';
import EmojiEvents from '@material-ui/icons/EmojiEvents'

require('moment/locale/es-mx')

const useStyles = makeStyles((theme) => ({
  rowContainer: {
    padding: 16,
    width: '100%',
    marginBottom: 12
  }
}))

export default function ActivityRow(props) {
  const classes = useStyles()

  return <Paper elevation={3} className={classes.rowContainer}>
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <div style={{ flex: 1 }}>
        <Typography variant="subtitle1">{props.title}</Typography>
        <Typography variant="body2">{moment(props.date).locale('es-mx').format('DD [de] MMMM, YYYY')}</Typography>
      </div>
      {props.type && props.type === "award" && <EmojiEvents />}
    </div>
  </Paper>
}