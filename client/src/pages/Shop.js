import React, {useContext, useEffect} from 'react';
import Container from "react-bootstrap/Container";
import {Col, Row} from "react-bootstrap";
import TypeBar from "../components/TypeBar";
import BrandBar from "../components/BrandBar";
import DeviceList from "../components/DeviceList";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {fetchBrands, fetchDevices, fetchTypes} from "../http/deviceAPI";
import Pages from "../components/Pages";

const Shop = observer(() => {
    const { device } = useContext(Context);

    useEffect(() => {
        fetchTypes().then(data => device.setTypes(data));
        fetchBrands().then(data => device.setBrands(data));
        fetchDevices(null, null, 1, device.limit).then(data => {
            device.setDevices(data.rows);
            device.setTotalCount(data.count);
        });
    }, [device.limit]);

    useEffect(() => {
        const selectedTypeIds = device.selectedTypes.map(type => type.id);
        const selectedBrandIds = device.selectedBrands.map(brand => brand.id);

        fetchDevices(selectedTypeIds, selectedBrandIds, device.page, device.limit).then(data => {
            device.setDevices(data.rows);
            device.setTotalCount(data.count);
        });
    }, [device.page, device.selectedTypes, device.selectedBrands]);

    return (
        <Container>
            <Row>
                <Col md={3}>
                    <TypeBar />
                    <BrandBar />
                </Col>
                <Col md={9}>
                    <DeviceList />
                    <Pages /> {/* Компонент Pages размещен под DeviceList */}
                </Col>
            </Row>
        </Container>
    );
});

export default Shop;