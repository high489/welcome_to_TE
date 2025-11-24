import { Fragment, memo, useCallback } from 'react';

const MainComponent = () => {
    // я мемоизировал функцию makeLog с помощью useCallback, тк она передеается в ChildComponent как проп,
    // ксли этого не сделать то makeLog будет пересоздаваться при каждом рендере MainComponent и в ChildComponent будет попадать обновленная ссылка на метод
    // для React.memo это означает изменения пропа
    const makeLog = useCallback(() => console.log("hi from MainComponent"), []) // function to make logs from MainComponent

    return (
        <Fragment>
            <ChildComponent makeLog={makeLog} />
        </Fragment>
    );
};

// memoized component
const ChildComponent = memo(({ makeLog }) => (
    <button onClick={makeLog}>say Hi from ChildComponent</button>
));
