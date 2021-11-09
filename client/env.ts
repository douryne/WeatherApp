declare global {
    interface Window { PORT: Number; }
}

export const PORT = window.PORT