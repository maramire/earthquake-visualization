import { useContext, useState } from "react";
import MapContext from "../store/map-context";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { Stack } from "@mui/system";

function EventsListInfo(props) {
  const mapContext = useContext(MapContext);
  const countStyle = {
    'margin-left': '0.2em'
  }
  return (
    <>
      <Stack spacing={2}>
        <TextField
          id="start_date"
          label="Start Date"
          type="date"
          value={mapContext.startDate}
          onChange={mapContext.updateStartDate}
          sx={{ width: 220 }}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          id="end_date"
          label="End Date"
          type="date"
          value={mapContext.endDate}
          onChange={mapContext.updateEndDate}
          sx={{ width: 220 }}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <FormControl style={{width: 220}}>
          <InputLabel id="filter">Filter By</InputLabel>
          <Select
            labelId="filter"
            id="filter"
            value={mapContext.filter}
            onChange={mapContext.updateFilter}
            label="Filter By"
          >
            <MenuItem value="time">Most Recent</MenuItem>
            <MenuItem value="time-asc">Oldest</MenuItem>
            <MenuItem value="magnitude-asc">Magnitude (Asc)</MenuItem>
            <MenuItem value="magnitude">Magnitude (Desc)</MenuItem>
          </Select>
        </FormControl>
        <Typography variant="h6">
          # of Events: 
          <Typography style={countStyle} display="inline" variant="subtitle1">
            {props.totalEvents}
          </Typography>
        </Typography>
      </Stack>
    </>
  );
}

export default EventsListInfo;
