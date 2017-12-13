/**
 * @Date:   2017-12-05T10:01:43+08:00
 * @Email:  rosen_yang@sina.com
 * @Last modified time: 2017-12-05T14:29:35+08:00
 */
import React from 'react';
import ReactDOM from 'react-dom';
import MediaQuery from 'react-responsive';
import {Router, Route, hasHistory} from 'react-router';
import {Button} from 'antd';
import 'antd/dist/antd.css';
import PCIndex from './components/pc_index';
import MobileIndex from './components/mobile_index';
export default class Root extends React.Component {
    render() {
        return (<div>
            <MediaQuery query='(min-device-width:1224px)'>
                <PCIndex/>
            </MediaQuery>
            <MediaQuery query='(max-device-width:1224px)'>
                <MobileIndex/>
            </MediaQuery>
        </div>);
    };
}
ReactDOM.render(<Root/>, document.getElementById('mainContainer'));
