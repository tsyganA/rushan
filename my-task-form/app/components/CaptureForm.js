'use client';

import { useState, useEffect } from 'react';

export default function CaptureForm() {
    const [token, setToken] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [tags, setTags] = useState('');
    const [budgetFrom, setBudgetFrom] = useState('');
    const [budgetTo, setBudgetTo] = useState('');
    const [deadline, setDeadline] = useState('');
    const [reminds, setReminds] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const savedToken = localStorage.getItem('apiToken');
        if (savedToken) {
            setToken(savedToken);
        }
    }, []);

    const handleSubmit = async e => {
        e.preventDefault();
        setLoading(true);

        if (!token) {
            alert('Ошибка: Введите токен!');
            setLoading(false);
            return;
        }

        localStorage.setItem('apiToken', token);

        const url = `https://deadlinetaskbot.productlove.ru/api/v1/tasks/client/newhardtask?token=${token}&title=${encodeURIComponent(
            title
        )}&description=${encodeURIComponent(description)}&tags=${encodeURIComponent(
            tags
        )}&budget_from=${budgetFrom}&budget_to=${budgetTo}&deadline=${deadline}&reminds=${reminds}&all_auto_responses=false`;

        try {
            const response = await fetch(url, { method: 'GET' });
            const data = await response.json();

            if (response.ok) {
                alert('✅ Задача успешно создана!');
            } else {
                alert(`❌ Ошибка: ${data.detail || 'Неизвестная ошибка'}`);
            }
        } catch (error) {
            alert(`❌ Ошибка сети: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 p-10">
            <form onSubmit={handleSubmit} className="w-full max-w-lg p-10 bg-white shadow-lg rounded-lg space-y-10">
                <h2 className="text-3xl font-bold text-center text-gray-700 mb-6">Создание задачи</h2>

                <div className="space-y-8">
                    <input
                        type="text"
                        placeholder="API Token"
                        value={token}
                        onChange={e => setToken(e.target.value)}
                        className="w-full p-5 border rounded-lg border-red-500"
                        required
                    />
                    <input
                        type="text"
                        placeholder="Название задачи"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        className="w-full p-5 border rounded-lg"
                    />
                    <textarea
                        placeholder="Описание задачи"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        className="w-full p-5 border rounded-lg"
                    />
                    <input
                        type="text"
                        placeholder="Теги (через запятую)"
                        value={tags}
                        onChange={e => setTags(e.target.value)}
                        className="w-full p-5 border rounded-lg"
                    />

                    <div className="grid grid-cols-2 gap-8">
                        <input
                            type="number"
                            placeholder="Бюджет от"
                            value={budgetFrom}
                            onChange={e => setBudgetFrom(e.target.value)}
                            className="p-5 border rounded-lg"
                            required
                        />
                        <input
                            type="number"
                            placeholder="Бюджет до"
                            value={budgetTo}
                            onChange={e => setBudgetTo(e.target.value)}
                            className="p-5 border rounded-lg"
                            required
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-8">
                        <input
                            type="number"
                            placeholder="Дедлайн (дни)"
                            value={deadline}
                            onChange={e => setDeadline(e.target.value)}
                            className="p-5 border rounded-lg"
                            required
                        />
                        <input
                            type="number"
                            placeholder="Напоминания"
                            value={reminds}
                            onChange={e => setReminds(e.target.value)}
                            className="p-5 border rounded-lg"
                            required
                        />
                    </div>
                </div>

                <button type="submit" className="w-full bg-blue-600 text-white p-5 rounded-lg hover:bg-blue-700 transition" disabled={loading}>
                    {loading ? 'Отправка...' : 'Создать задачу'}
                </button>
            </form>
        </div>
    );
}
