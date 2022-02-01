import { Box, Button, Icon, Image, Text } from '@skynexui/components';
import Loading from '../Loading';
import appConfig from '../../../config.json';

export default function MessageList(props) {
    return (
      <Box
        tag="ul"
        styleSheet={{
          wordBreak:'break-all',
          overflow: 'scroll',
          display: 'flex',
          flexDirection: 'column-reverse',
          flex: 1,
          color: appConfig.theme.colors.neutrals["000"],
          marginBottom: '16px',
          overflow: 'auto'
        }}
      >
        {props.loading && (
          <Loading/>
        )}
        {props.mensagens.map((mensagem) => {
          const dataMensagem = new Date(mensagem["created_at"]);
          return (
            <Text
              key={mensagem.id}
              tag="li"
              styleSheet={{
                borderRadius: '5px',
                padding: '6px',
                marginBottom: '12px',
                hover: {
                  backgroundColor: appConfig.theme.colors.neutrals[700],
                },
                marginRight: '5px'
              }}
            >
              <Box
                styleSheet={{
                  marginBottom: '8px',
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <Image
                  styleSheet={{
                    width: '25px',
                    height: '25px',
                    borderRadius: '50%',
                    display: 'inline-block',
                    marginRight: '8px',
                  }}
                  src={`https://github.com/${mensagem.de}.png`}
                  onError={({ currentTarget }) => {
                    currentTarget.onerror = null;
                    currentTarget.src='assets/imgs/qwerty.png';
                  }}
                />
                <Text styleSheet={{ fontSize: '18px', fontWeight: 'bold' }} tag="strong">
                  <a href={`https://github.com/${mensagem.de}`} target="_blank">
                    {mensagem.de}
                  </a>
                </Text>
                <Text
                  styleSheet={{
                    fontSize: '12px',
                    marginLeft: '8px',
                    height: '100%',
                    color: appConfig.theme.colors.neutrals[300],
                  }}
                  tag="span"
                >
                  {(
                    `${dataMensagem.getDate()}/${dataMensagem.getMonth()+1}/${dataMensagem.getFullYear()} - ${dataMensagem.toLocaleTimeString()}`
                  )}
                </Text>
                <Button
                  label={
                    <Icon name="FaTrashAlt" size="14px"/>
                  }
                  styleSheet={{
                    backgroundColor: 'transparent',
                    color: appConfig.theme.colors.neutrals['300'],
                    marginLeft: 'auto',
                    marginRight: '5px',
                    hover: {
                      backgroundColor: 'transparent',
                      color: '#ff2b2b',
                      cursor: 'pointer'
                    },
                    focus: {
                      backgroundColor: 'transparent',
                      color: '#ff2b2b',
                      cursor: 'pointer'
                    }
                  }}
                  onClick={() => props.deleteHandle(mensagem.id) }
                />
              </Box>
              {mensagem.texto.startsWith(':sticker:')
                ? (
                  <Image 
                  styleSheet={{
                    maxWidth: '300px',
                    height: 'auto',
                  }}
                  src={mensagem.texto.replace(':sticker:', '')} />
                )
                : (
                  mensagem.texto
                )}
            </Text>
          );
        })}
      </Box>
    )
}