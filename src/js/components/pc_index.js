/**
 * @Date:   2017-12-05T12:38:10+08:00
 * @Email:  rosen_yang@sina.com
 * @Last modified time: 2017-12-05T14:35:39+08:00
 */
import React from 'react';
import PCHeader from './pc_header';
import PCFooter from './pc_footer';
export default class PCIndex extends React.Component {
    render() {
        return (<div>
            <PCHeader></PCHeader>
            <PCFooter></PCFooter>
        </div>);
    }
}
