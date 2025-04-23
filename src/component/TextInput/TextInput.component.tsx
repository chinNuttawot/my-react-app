import React, { useEffect, useState } from 'react';
import './TextInput.component.css';

const MyTextInput: React.FC = () => {
    const [text, setText] = useState('');
    const [items, setItems] = useState<string[]>([]);
    const [mainItems, setMainItems] = useState<string[][]>([]);
    const [editIndex, setEditIndex] = useState<{ key: number, subKey: number } | null>(null);

    useEffect(() => {
        if (items.length > 0) setMainItems(arr => [...arr, ...[items]])
    }, [items])

    useEffect(() => {
        setItems([])
    }, [mainItems])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value);
    };

    const commitEdit = () => {
        if (editIndex && text.trim() !== '') {
            const updated = [...mainItems];
            updated[editIndex.key][editIndex.subKey] = text.trim();
            setMainItems(updated);
        }
        setEditIndex(null);
        setText('');
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            commitEdit();
        }
    };

    const handleItemClick = (data: { key: number, subKey: number }) => {
        setEditIndex(data);
        setText(mainItems[data.key][data.subKey]);
    };

    const handleRemove = (data: { key: number, subKey: number }) => {
        setMainItems(prev => {
            const updated = [...prev];
            updated[data.key] = updated[data.key].filter((_, idx) => idx !== data.subKey);
            return updated.filter(row => row.length > 0);
        });
        if (editIndex?.key === data.key && editIndex?.subKey === data.subKey) {
            setEditIndex(null);
            setText('');
        }
    };

    const handleNewInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && text.trim() !== '') {
            const newItems = text
                .split(',')
                .map(i => i.trim())
                .filter(i => i !== '');
            setItems(prev => [...prev, ...newItems]);
            setText('');
        }
    };

    const RenderView = () => {
        return <>
            {mainItems.map((v, k) =>
                <ul className="Ui" style={{ listStyle: 'none', paddingLeft: '10px', marginTop: '1rem' }}>
                    {
                        v.map((item, index) => (
                            <li
                                key={index}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                }}
                            >
                                {editIndex?.key === k && editIndex?.subKey === index ? (
                                    <input
                                        value={text}
                                        onChange={handleChange}
                                        onKeyDown={handleKeyDown}
                                        onBlur={commitEdit}
                                        autoFocus
                                        style={{
                                            fontSize: '1rem',
                                            padding: '0.25rem',
                                            flex: 1,
                                        }}
                                    />
                                ) : (
                                    <span
                                        onClick={() => handleItemClick({ key: k, subKey: index })}
                                        style={{
                                            cursor: 'pointer',
                                            padding: '0.25rem 0.5rem',
                                            flex: 1,
                                            border: '1px solid #ccc',
                                            borderRadius: '4px',
                                        }}
                                    >
                                        {item}
                                    </span>
                                )}
                                <button
                                    onClick={() => handleRemove({ key: k, subKey: index })}
                                    style={{
                                        backgroundColor: '#ff000000',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '4px',
                                        cursor: 'pointer',
                                        margin: '0 10px 0 0'
                                    }}
                                >
                                    ❌
                                </button>
                            </li>
                        ))
                    }
                </ul>
            )}
        </>
    }
    return (
        <div style={{ padding: '1rem' }}>
            <input
                value={editIndex ? '' : text}
                onChange={handleChange}
                onKeyDown={handleNewInputKeyDown}
                disabled={editIndex ? true : false}
                placeholder="พิมพ์ใหม่แล้วกด Enter"
                style={{ padding: '0.5rem', fontSize: '1rem', width: '300px' }}
            />
            {RenderView()}
        </div>
    );
};

export default MyTextInput;
