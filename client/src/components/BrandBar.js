import React, { useContext, useState } from 'react';
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { Button, ListGroup } from "react-bootstrap";

const BrandBar = observer(() => {
    const { device } = useContext(Context);
    const [expanded, setExpanded] = useState(false);

    const handleBrandClick = (brand) => {
        device.setPage(1);
        if (device.selectedBrands.includes(brand)) {
            // Если бренд уже выбран, убираем его
            device.setSelectedBrands(device.selectedBrands.filter(b => b.id !== brand.id));
        } else {
            // Добавляем бренд в выбранные
            device.setSelectedBrands([...device.selectedBrands, brand]);
        }
    };

    return (
        <>
            <Button
                variant="secondary"
                className="mt-3 w-100"
                onClick={() => setExpanded(!expanded)}
            >
                {expanded ? "Бренд" : "Поиск по брендам"}
            </Button>
            {expanded && (
                <ListGroup className="mt-2">
                    {device.brands.map(brand => (
                        <ListGroup.Item
                            style={{ cursor: 'pointer' }}
                            active={device.selectedBrands.includes(brand)}
                            onClick={() => handleBrandClick(brand)}
                            key={brand.id}
                        >
                            {brand.name}
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            )}
        </>
    );
});

export default BrandBar;
