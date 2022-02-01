import { Box, TextField } from '@skynexui/components';
import { useEffect, useState } from 'react';
import appConfig from '../config.json';
import { useRouter } from 'next/router';
import { createClient } from '@supabase/supabase-js'
import { ChatHeader, MessageList, StickerButton } from '../src/components';

const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || '';
const SUPABASE_URL = process.env.SUPABASE_URL || '';
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

function escutaMensagensEmTempoReal(adicionaMensagem) {
  return supabaseClient
    .from('mensagens')
    .on('INSERT', (respostaLive) => {
      adicionaMensagem(respostaLive.new);
    })
    .subscribe();
}

export default function ChatPage() {
  const roteamento = useRouter();
  const usuarioLogado = roteamento.query.username;
  const [mensagem, setMensagem] = useState('');
  const [listaDeMensagens, setListaDeMensagens] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabaseClient
      .from('mensagens')
      .select('*')
      .order('id', { ascending: false })
      .then(({ data }) => {
        setListaDeMensagens(data);
        setLoading(false);
      });

    const subscription = escutaMensagensEmTempoReal((novaMensagem) => {
      setListaDeMensagens((valorAtualDaLista) => {
        return [
          novaMensagem,
          ...valorAtualDaLista,
        ]
      });
    });

    return () => {
      subscription.unsubscribe();
    }
  }, []);

  function handleNovaMensagem(novaMensagem) {
    const mensagem = {
      de: usuarioLogado || 'Usuário anônimo',
      texto: novaMensagem,
    };

    supabaseClient
      .from('mensagens')
      .insert([
        mensagem
      ])
      .then(({ data }) => {
        console.log('Criando mensagem: ', data);
      });

    setMensagem('');
  }

  function handleDeletarMensagem (idMensagem) {
    setListaDeMensagens(listaDeMensagens.filter(msg => msg.id != idMensagem));

    supabaseClient
    .from('mensagens')
    .delete()
    .match({id: idMensagem})
    .then(({data}) => {
      console.log('Mensagem deletada: ', data);
    });
  }

  return (
    <Box
      styleSheet={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        backgroundColor: appConfig.theme.colors.primary[500],
        backgroundImage: `url(assets/imgs/background.png)`,
        backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
        color: appConfig.theme.colors.neutrals['000']
      }}
    >
      <Box
        styleSheet={{
          display: 'flex',
          border: `1px solid ${appConfig.theme.colors.primary['400']}`,
          flexDirection: 'column',
          flex: 1,
          boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
          borderRadius: '5px',
          backgroundColor: appConfig.theme.colors.neutrals[700],
          height: '100%',
          maxWidth: '90%',
          maxHeight: '90vh',
          padding: '16px 32px 32px 32px'
        }}
      >
        <ChatHeader user={usuarioLogado} />
        <Box
          styleSheet={{
            position: 'relative',
            display: 'flex',
            flex: 1,
            height: '80%',
            backgroundColor: appConfig.theme.colors.neutrals[600],
            flexDirection: 'column',
            borderRadius: '5px',
            padding: '16px 5px 5px 16px',
            border: `1px solid ${appConfig.theme.colors.primary['400']}`,
          }}
        >
          <MessageList loading={loading} deleteHandle={handleDeletarMensagem} mensagens={listaDeMensagens} />

          <Box
            as="form"
            styleSheet={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <TextField
              autocomplete="off"
              value={mensagem}
              onChange={(event) => {
                const valor = event.target.value;
                setMensagem(valor);
              }}
              onKeyPress={(event) => {
                if (event.key === 'Enter') {
                  event.preventDefault();

                  if(!mensagem.length) return;

                  handleNovaMensagem(mensagem);
                }
              }}
              placeholder="Insira sua mensagem aqui..."
              type="text"
              rounded="sm"
              styleSheet={{
                border: `1px solid ${appConfig.theme.colors.primary['400']}`,
                width: '100%',
                resize: 'none',
                padding: '12px 8px',
                backgroundColor: appConfig.theme.colors.neutrals[500],
                marginRight: '12px',
                color: appConfig.theme.colors.neutrals[200],
                hover: {
                  border: `1px solid ${appConfig.theme.colors.primary['400']}`,
                },
                focus: {
                  border: `1px solid ${appConfig.theme.colors.primary['400']}`,
                }
              }}
            />
            <StickerButton
              onStickerClick={(sticker) => {
                handleNovaMensagem(':sticker: ' + sticker);
              }}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  )
}