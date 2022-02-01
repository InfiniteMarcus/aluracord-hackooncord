import { Box, Image } from '@skynexui/components';

export default function Loading() {
    return (
      <Box
        styleSheet={{
          textAlign: 'center',
          marginBottom: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
        }}
      >
        <Image width="45px" src="assets/gifs/loading.gif"></Image>
      </Box>
    );
}