import { useState } from 'react'

function useInput(initialValue: string) {
    const [value, setValue] = useState(initialValue);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {  
        setValue(e.target.value);
    }

    return [
        value,
        (e: React.ChangeEvent<HTMLInputElement>) => onChange(e),
    ]
}

export default useInput