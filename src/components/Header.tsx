import { Box, TextField, Typography } from '@mui/material';

interface Props {
  query: string;
  setQuery: (value: string) => void;
  disabled: boolean;
}

export const Header = ({ query, setQuery, disabled }: Props) => {
  return (
    <header style={{ width: '100%' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h3" component="h1" sx={{ alignSelf: 'flex-start' }}>
          Smart Contacts Manager
        </Typography>

        <TextField
          placeholder="Query..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          size="small"
          disabled={disabled}
          sx={{
            width: 400
          }}
        />
      </Box>
    </header>
  );
};
