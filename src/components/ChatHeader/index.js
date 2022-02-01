import { Box, Text, Image, Button } from '@skynexui/components';
import appConfig from '../../../config.json';

export default function ChatHeader(props) {
    return (
      <>
        <Box styleSheet={{ width: '100%', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >
          <Text variant='heading4'>
            # HackaChat
          </Text>
          <Box
            styleSheet={{
              marginLeft: 'auto',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <Image 
              styleSheet={{
                width: '25px',
                height: '25px',
                borderRadius: '50%',
                display: 'inline-block',
                marginRight: '10px'
              }}
              src={props.user ? `https://github.com/${props.user}.png` : 'assets/imgs/qwerty.png'} 
            />
            <Text
              styleSheet={{
                fontSize: '16px',
                fontWeight: 'bold',
                marginRight: '35px'
              }}
            >
              {props.user || "Usuário anônimo"}
            </Text>
            <Button
              styleSheet={{
                backgroundColor: 'transparent',
                color: '#e6e6e6',
                border: `1px solid ${appConfig.theme.colors.primary['400']}`,
                hover: {
                  backgroundColor: appConfig.theme.colors.neutrals[500],
                },
                focus: {
                  backgroundColor: appConfig.theme.colors.neutrals[500],
                }
              }}
              label='Logout'
              href="/"
            />
          </Box>
        </Box>
      </>
    )
  }