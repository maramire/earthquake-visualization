import { useContext } from "react";
import MapContext from "../store/map-context";
import { FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { Stack } from "@mui/system";

function EventsListInfo(props) {
  const mapContext = useContext(MapContext);

  return (
    <>
      <Stack sx={{ 'marginBottom': '2em' }} spacing={4} direction="row">
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
          size="small"
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
          size="small"
        />
      </Stack>
      <Stack spacing={2}>
        <FormControl style={{ width: 220 }}>
          <InputLabel id="filter">Filter By</InputLabel>
          <Select
            labelId="filter"
            id="filter"
            value={mapContext.filter}
            onChange={mapContext.updateFilter}
            label="Filter By"
            size="small"
          >
            <MenuItem value="time">Most Recent</MenuItem>
            <MenuItem value="time-asc">Oldest</MenuItem>
            <MenuItem value="magnitude-asc">Magnitude (Asc)</MenuItem>
            <MenuItem value="magnitude">Magnitude (Desc)</MenuItem>
          </Select>
        </FormControl>
        <Typography >
          # of Events: {props.totalEvents}
        </Typography>
      </Stack>
    </>
  );
}

export default EventsListInfo;
