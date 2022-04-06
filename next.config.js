module.exports = {
    swcMinify: true,
    images: {
        formats: ['image/avif', 'image/webp'],
    },
    experimental: { images: { layoutRaw: true } },
}
