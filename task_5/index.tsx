// Ранее мне не приходилось работать с SWR от Vercel
// Я почитал о том как это работает: можно кэшировать данные и вызывать их там где необходимо
// Для решения задачи я использовал общий ключ на кэш SWR_KEY для обоих компонентов в useSWR(SWR_KEY, fetchOnePost)
// теперь после загрузки ComponentOne, в ComponentTwo для data используется тот же кэш что для ComponentOne по ключу SWR_KEY


// решение в песочнице https://codesandbox.io/p/devbox/gifted-beaver-3ysyf3
// создал /libs/swrKeys.ts для хранения ключей указателей на кэш
// В обоих компоенентах указал ключ SWR_POST_KEY = 'shared_post_key' в useSWR(SWR_POST_KEY, fetchOnePost)


'use client';

import { useState } from 'react';
import useSWR from 'swr';

import styles from './page.module.css';

const SWR_KEY = 'shared_post_key'
import { fetchOnePost } from '@/libs/fetchOnePost';

const ComponentOne = () => {
    const { data } = useSWR(SWR_KEY, fetchOnePost);
    //...some logic

    return data ? (
        <div className={styles.card}>
            <h2>{data.title}</h2>
            <p>{data.body}</p>
            <span>ComponentOne</span>
        </div>
    ) : (
        <div>...Loading ComponentOne</div>
    );
};

const ComponentTwo = () => {
    const { data } = useSWR(SWR_KEY, () => fetchOnePost({ delayMS: 2000 }));
    //...some logic

    return data ? (
        <div className={styles.card}>
            <h2>{data.title}</h2>
            <p>{data.body}</p>
            <span>ComponentTwo</span>
        </div>
    ) : (
        <div>...Loading ComponentTwo</div>
    );
};

export default function Home() {
    const [showComponentTwo, setShowComponentTwo] = useState(false);

    return (
        <main className={styles.main}>
            <div className={styles.description}>
                <ComponentOne />
                {showComponentTwo ? (
                    <ComponentTwo />
                ) : (
                    <button className={styles.btn} onClick={() => setShowComponentTwo(true)}>
                        Show ComponentTwo
                    </button>
                )}
            </div>
        </main>
    );
}
