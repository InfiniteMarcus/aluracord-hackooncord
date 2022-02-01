import { Box, Button, Image } from '@skynexui/components';
import appConfig from '../config.json';

export default function Error404() {
    return (
        <Box
            styleSheet={{
                display: 'flex', 
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                backgroundColor: appConfig.theme.colors.primary['500'],
                backgroundImage: 'url(assets/imgs/background.png)',
                backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
            }}
        >
            <Image
                alt="Aviso de 404 página não encontrada"
                src={'assets/imgs/404.png'}
                styleSheet={{
                    maxWidth: '950px'
                }}
            />
            <Button
                label="Clique aqui para voltar"
                size="xl"
                href="/"
                styleSheet={{
                    marginTop: '22px',
                    backgroundColor: appConfig.theme.colors.primary['500'],
                    hover: {
                        backgroundColor: appConfig.theme.colors.primary['600']
                    },
                    focus: {
                        backgroundColor: appConfig.theme.colors.primary['600']
                    }
                }}
            />
        </Box>
    );
}