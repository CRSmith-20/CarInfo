import { Alert } from 'react-bootstrap';
import { useState } from 'react';

function ErrorDisplay(props) {
    const [pageTitle] = useState(props.title);

    return (
        <div>
            <h1 style={{ textAlign: 'center' }}>{pageTitle}</h1>
            <Alert key="error" variant={'warning'} style={{ textAlign: 'center' }}>An error has occurred while loading, please refresh and try again.</Alert>
        </div>
    )
}

export default ErrorDisplay