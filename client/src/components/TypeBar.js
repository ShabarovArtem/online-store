import React, { useContext, useState } from 'react';
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { Button, ListGroup } from "react-bootstrap";

const TypeBar = observer(() => {
    const { device } = useContext(Context);
    const [expanded, setExpanded] = useState(false);

    const handleTypeClick = (type) => {
        device.setPage(1);
        if (device.selectedTypes.includes(type)) {
            // Если тип уже выбран, убираем его
            device.setSelectedTypes(device.selectedTypes.filter(t => t.id !== type.id));
        } else {
            // Добавляем тип в выбранные
            device.setSelectedTypes([...device.selectedTypes, type]);
        }
    };

    return (
        <>
            <Button
                variant="secondary"
                className="mt-2 w-100"
                onClick={() => setExpanded(!expanded)}
            >
                {expanded ? "Тип" : "Поиск по типам"}
            </Button>
            {expanded && (
                <ListGroup className="mt-2">
                    {device.types.map(type => (
                        <ListGroup.Item
                            style={{ cursor: 'pointer' }}
                            active={device.selectedTypes.includes(type)}
                            onClick={() => handleTypeClick(type)}
                            key={type.id}
                        >
                            {type.name}
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            )}
        </>
    );
});

export default TypeBar;
