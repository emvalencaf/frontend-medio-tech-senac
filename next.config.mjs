/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['localhost'], // Permitir o domínio localhost para carregar imagens
        deviceSizes: [320, 420, 768, 1024, 1200], // Tamanhos de dispositivos permitidos para otimização
        imageSizes: [16, 32, 48, 64, 96], // Tamanhos de imagens para otimização
    },
};

export default nextConfig;
