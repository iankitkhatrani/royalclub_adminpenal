import React, { useState, useEffect } from 'react';

function Checkbox({ type = 'td', onChecked, item, setItem }) {
    const [checked, setChecked] = useState(false);

    useEffect(() => {
        onChecked && onChecked(checked);
    }, [checked]);

    function change(){
        setChecked(!checked)
        setItem(item)
    }

    return (
        React.createElement(
            type,
            { className: 'checkbox-cell' },
            React.createElement('label', { className: 'checkboxs' },
                React.createElement('Input', {
                    type: 'checkbox',
                    checked: checked,
                    className: 'checkbox_animated border border-primary',
                    onChange: () => change()
                }),
                // React.createElement('span', { className: 'check' })
            )
        )
    );
}

export default Checkbox;
