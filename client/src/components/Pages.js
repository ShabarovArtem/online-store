import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Pagination} from "react-bootstrap";
import {Context} from "../index";

const Pages = observer(() => {
    const { device } = useContext(Context);

    const pageCount = Math.ceil(device.totalCount / device.limit);
    const pages = [];

    for (let i = 0; i < pageCount; i++) {
        pages.push(i + 1);
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'flex-start', marginTop: '20px', marginBottom: '20px' }}>
            <Pagination>
                {pages.map(page => (
                    <Pagination.Item
                        key={page}
                        active={device.page === page}
                        onClick={() => device.setPage(page)}
                    >
                        {page}
                    </Pagination.Item>
                ))}
            </Pagination>
        </div>
    );
});

export default Pages;