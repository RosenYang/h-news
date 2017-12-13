/**
 * @Date:   2017-12-05T14:31:37+08:00
 * @Email:  rosen_yang@sina.com
 * @Last modified time: 2017-12-05T14:34:53+08:00
 */
import React from 'react';
import {Row, Col, Menu, Icon} from 'antd';

export default class PCFooter extends React.Component {
    render() {
        return (<footer>
            <Row>
                <Col span={2}></Col>
                <Col span={20} class="footer">
                    &copy;&nbsp;2017 React News. All Rights Reserved.

                </Col>
                <Col span={2}></Col>
            </Row>
        </footer>);
    }
}
