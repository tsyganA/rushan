import '../app/globals.css'; // Добавьте эту строку
export const metadata = {
    title: 'Создать задачу',
    description: 'Форма создания задачи',
};

export default function RootLayout({ children }) {
    return (
        <html lang="ru">
            <body>{children}</body>
        </html>
    );
}
